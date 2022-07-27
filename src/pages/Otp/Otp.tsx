import React, { FC, FormEvent, useState } from 'react'
import AuthCode from 'react-auth-code-input'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import LoginService, { LoginResponseType } from 'services/login'
import { setToken } from 'utils/tokenHandlers'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router'

export interface PageLoginProps {
  className?: string
}

export const loginUser = (response: LoginResponseType) => {
  setToken(response?.data.accessToken, response?.data.refreshToken)
  window.location.pathname = '/'
}

const Otp: FC<PageLoginProps> = ({ className = '' }: PageLoginProps) => {
  const [otp, setOtp] = useState('')
  const [errors, setErrors] = useState({ otp: '' })
  const [isDisabled, setIsDisabled] = useState(false)

  const { state: locationState } = useLocation<{
    hash: string
    phone: string
  }>()

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (Object.values(errors).join('') !== '') setErrors({ otp: '' })

    setIsDisabled(true)
    const response = await LoginService.sendOtp({
      phone: locationState.phone,
      hash: locationState.hash,
      otp,
    })
      .catch(error => {
        toast.error('Incorrect OTP')
        setErrors(error.response.data)
      })
      .finally(() => setIsDisabled(false))

    if (response?.data?.accessToken) {
      loginUser(response)
    }
  }

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <div className="container h-full">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Verification Code
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
              <AuthCode
                containerClassName="grid grid-cols-6 gap-2 mt-5"
                onChange={code => setOtp(code)}
                inputClassName={`block text-center w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3`}
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
