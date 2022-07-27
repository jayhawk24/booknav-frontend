import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'

import Label from 'components/shared/Label/Label'
import Avatar from 'components/shared/Avatar'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import Input from 'components/shared/Input/Input'

import useUser from 'hooks/useUser'
import accountService from 'services/account'

export interface AccountPageProps {
  className?: string
}

const Account: FC<AccountPageProps> = ({ className = '' }) => {
  const { data: user } = useUser()
  const queryClient = useQueryClient()

  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.phone || '')

  const [isDisabled, setIsDisabled] = useState({
    email: false,
    phone: false,
  })

  useEffect(() => {
    setEmail(user?.email || '')
    setPhone(user?.phone || '')
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
    if (user?.phone && phone === user?.phone) return

    setIsDisabled({ ...isDisabled, phone: true })

    toast
      .promise(accountService.updatePhone(phone), {
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
  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
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
        </div>
      </div>
    </div>
  )
}

export default Account
