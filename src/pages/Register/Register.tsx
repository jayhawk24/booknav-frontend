import React, { FC, FormEvent, useState } from 'react'
// import facebookSvg from 'images/Facebook.svg'
// import googleSvg from 'images/Google.svg'
import Input from 'components/shared/Input/Input'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Label from 'components/shared/Label/Label'
import RegisterService from 'services/register'
import toast from 'react-hot-toast'
import PhoneSelect from 'components/shared/PhoneSelect/PhoneSelect'
import InputWithHelper from 'components/shared/InputWithHelper'
import FormError from 'components/shared/FormError'
import Checkbox from 'components/shared/Checkbox'

export interface PageSignUpProps {
  className?: string
}

const Register: FC<PageSignUpProps> = ({ className = '' }) => {
  const { state: locationState } = useLocation<{
    phone?: string
  }>()

  const [name, setName] = useState('')
  const [phoneCode, setPhoneCode] = useState('91')
  const [phone, setPhone] = useState(locationState?.phone || '')
  const [isNaavik, setIsNaavik] = useState(false)
  const [error, setError] = useState({
    name: '',
    mobile_number: '',
    email: '',
  })
  const [disabled, setDisabled] = useState(false)
  const history = useHistory()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const phoneNumber = '+' + phoneCode + phone

    setDisabled(true)
    const register = RegisterService.register(
      name,
      phoneNumber,
      isNaavik ? 'naavik' : 'user',
    )

    toast
      .promise(register, {
        loading: 'Sending OTP...',
        success: 'OTP sent successfully.',
        error: "Couldn't register, please try again",
      })
      .then(response => {
        history.push('/otp', { phone: phoneNumber, hash: response.data.hash })
      })
      .catch(error => {
        const data = error.response.data
        setError(data)
        setDisabled(false)
        throw error
      })
  }

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Register
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          <form
            className="grid grid-cols-1 gap-6"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <div>
              <Label>Name</Label>
              <InputWithHelper
                className="mt-1.5"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                helperText={error.name}
              />
            </div>

            {/* ---- */}

            <div>
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
                />
              </div>
              <FormError text={error.mobile_number} />
            </div>
            <div className="flex">
              <Checkbox
                checked={isNaavik}
                onChange={checked => setIsNaavik(checked)}
                className="mr-5"
              />
              <Label>Register as Naavik</Label>
            </div>
            <ButtonPrimary type="submit" disabled={disabled}>
              Continue
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link to="/login">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Register
