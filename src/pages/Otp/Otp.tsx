import React, { FC, FormEvent, useState } from 'react'

import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'

import LoginService, { LoginResponseType } from 'services/login'
import { setToken } from 'utils/tokenHandlers'
import toast from 'react-hot-toast'
import InputWithHelper from 'components/shared/InputWithHelper'
import { useLocation } from 'react-router'

export interface PageLoginProps {
  className?: string
}

export const loginUser = (response: LoginResponseType) => {
  setToken(response?.data.access, response?.data.refresh)
  window.location.pathname = '/'
}

const Otp: FC<PageLoginProps> = ({ className = '' }: PageLoginProps) => {
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState({ phone: '' })
  const [isDisabled, setIsDisabled] = useState(false)

  const { state: locationState } = useLocation<{ hash: string }>()

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (Object.values(errors).join('') !== '') setErrors({ phone: '' })

    setIsDisabled(true)
    const response = await LoginService.sendOtp(phone, locationState.hash)
      .catch(error => {
        if (error.response.status === 500) {
          toast.error('Incorrect OTP')
        }
        setErrors(error.response.data)
      })
      .finally(() => setIsDisabled(false))

    if (response?.data?.access) {
      loginUser(response)
    }
  }

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Enter OTP
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <form
            className="grid grid-cols-1 gap-6"
            action="#"
            method="post"
            onSubmit={handleLogin}
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                OTP
              </span>
              <InputWithHelper
                type="number"
                placeholder="1234567890"
                className="mt-1"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPhone(event.target.value)
                }
                helperText={errors.phone}
              />
            </label>
            <ButtonPrimary type="submit" disabled={isDisabled}>
              Continue
            </ButtonPrimary>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Otp
