import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'

import Label from 'components/shared/Label/Label'
import Avatar from 'components/shared/Avatar'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import Input from 'components/shared/Input/Input'
import CommonLayout from 'components/CommonLayout/CommonLayout'

import useUser from 'hooks/useUser'
import accountService from 'services/account'
import PhoneSelect from 'components/shared/PhoneSelect/PhoneSelect'
import FormError from 'components/shared/FormError'

export interface AccountPageProps {
  className?: string
}

const Account: FC<AccountPageProps> = ({ className = '' }) => {
  const { data: user } = useUser()
  const queryClient = useQueryClient()

  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.mobile_number?.national_number || '')
  const [phoneCode, setPhoneCode] = useState(
    user?.mobile_number?.country_code || '971',
  )
  const [password, setPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({
    current_password: '',
    new_password: '',
  })

  const [isDisabled, setIsDisabled] = useState({
    email: false,
    phone: false,
    password: false,
  })

  useEffect(() => {
    setEmail(user?.email || '')
    setPhoneCode(user?.mobile_number?.country_code || '')
    setPhone(user?.mobile_number?.national_number || '')
  }, [user])

  const handleUpdateEmail = () => {
    if (email === user?.email) {
      return
    }

    setIsDisabled({ ...isDisabled, email: true })

    toast
      .promise(accountService.updateEmail(email), {
        loading: 'Sending mail...',
        success: response => response.data.msg,
        error: error => error.response.data.email,
      })
      .then(() => {
        queryClient.invalidateQueries('getUser')
        setIsDisabled({ ...isDisabled, email: false })
      })
      .catch(() => setIsDisabled({ ...isDisabled, email: false }))
  }

  const handleUpdatePhone = () => {
    if (
      user?.mobile_number &&
      phone === user?.mobile_number.national_number &&
      phoneCode === user?.mobile_number.country_code
    )
      return

    const mobile_number = phoneCode + ' ' + phone
    setIsDisabled({ ...isDisabled, phone: true })

    toast
      .promise(accountService.updatePhone(mobile_number), {
        loading: 'Updating...',
        success: response => response.data.msg,
        error: error =>
          error.response.data.mobile_number || error.response.data.detail,
      })
      .then(() => {
        setIsDisabled({ ...isDisabled, phone: false })
        queryClient.invalidateQueries('getUser')
      })
      .catch(() => setIsDisabled({ ...isDisabled, phone: false }))
  }

  const handleUpdatePassword = () => {
    if (password === '') return
    if (password !== confirmPassword) return

    setErrors({ new_password: '', current_password: '' })

    setIsDisabled({ ...isDisabled, password: true })

    toast
      .promise(accountService.updatePassword(password, oldPassword), {
        loading: 'Updating...',
        success: response => response.data.msg,
        error: error => error.response.data.error,
      })
      .then(() => {
        setIsDisabled({ ...isDisabled, password: false })
        queryClient.invalidateQueries('getUser')
      })
      .catch(error => {
        setErrors(error.response.data)
        setIsDisabled({ ...isDisabled, password: false })
      })
  }

  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <CommonLayout isCustomer={true}>
        <div className="space-y-6 sm:space-y-8">
          {/* HEADING */}
          <h2 className="text-3xl font-semibold">Account infomation</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 flex items-start">
              <div className="relative rounded-full overflow-hidden flex">
                <Avatar sizeClass="w-32 h-32" />
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5 ">
                <div className="col-span-2">
                  <Label>E-mail</Label>
                  <Input
                    className="mt-1.5"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex justify-center items-end">
                  <ButtonPrimary
                    className="max-h-12"
                    onClick={handleUpdateEmail}
                    disabled={isDisabled.email}
                  >
                    Update
                  </ButtonPrimary>
                </div>
              </div>
              {/* ---- */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
                <div className="col-span-2">
                  <Label>Phone number</Label>
                  <div className="flex">
                    <PhoneSelect
                      id="phone"
                      name="phone"
                      className="mt-1.5 flex-1 mr-2"
                      value={phoneCode}
                      onChange={e => setPhoneCode(e.target.value)}
                    />
                    <Input
                      className="mt-1.5 w-6/12"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="Phone Number"
                    />
                  </div>
                </div>

                <div className="flex justify-center items-end">
                  <ButtonPrimary
                    className="max-h-12"
                    onClick={handleUpdatePhone}
                    disabled={isDisabled.phone}
                  >
                    Update
                  </ButtonPrimary>
                </div>
              </div>

              {/* ---- */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5 ">
                <div className="col-span-2">
                  <Label>Change Password</Label>
                  <Input
                    className="mt-1.5"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    placeholder="Enter your current password"
                    type="password"
                  />
                  <Input
                    className="mt-1.5"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your new password"
                    type="password"
                  />
                  <Input
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    type="password"
                    className={
                      password
                        ? password === confirmPassword
                          ? 'mt-1.5 border-2 border-green-600 dark:border-green-600'
                          : 'mt-1.5 border-2 border-red-600 dark:border-red-600'
                        : 'mt-1.5'
                    }
                  />
                  <FormError text={errors.current_password} />
                  <FormError text={errors.new_password} />
                </div>

                <div className="flex justify-center items-end">
                  <ButtonPrimary
                    className="max-h-12"
                    onClick={handleUpdatePassword}
                    disabled={isDisabled.password}
                  >
                    Update
                  </ButtonPrimary>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  )
}

export default Account
