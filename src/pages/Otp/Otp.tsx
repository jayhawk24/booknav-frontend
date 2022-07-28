import React, { FC, FormEvent, useCallback, useEffect, useState } from 'react'
import AuthCode from 'react-auth-code-input'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import LoginService, { LoginResponseType } from 'services/login'
import { setToken } from 'utils/tokenHandlers'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router'
import { ReactComponent as OtpSvg } from '../../images/undraw_forgot_password_re_hxwm.svg'

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
  const [isDisabled, setIsDisabled] = useState({
    request: false,
    otp: false,
  })
  const [timer, setTimer] = useState(60)
  const timeOutCallback = useCallback(
    () => setTimer(currTimer => currTimer - 1),
    [],
  )

  const { state: locationState } = useLocation<{
    hash: string
    phone: string
  }>()

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    if (timer > 0) timeout = setInterval(timeOutCallback, 1000)

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [])

  const resetTimer = () => {
    if (!timer) return
    setTimer(60)
  }

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (Object.values(errors).join('') !== '') setErrors({ otp: '' })

    setIsDisabled({ ...isDisabled, otp: true })
    const response = await LoginService.sendOtp({
      phone: locationState.phone,
      hash: locationState.hash,
      otp,
    })
      .catch(error => {
        toast.error('Incorrect OTP')
        setErrors(error.response.data)
      })
      .finally(() => setIsDisabled({ ...isDisabled, otp: false }))

    if (response?.data?.accessToken) {
      loginUser(response)
    }
  }

  const handleRequest = () => {
    setIsDisabled({ ...isDisabled, request: true })
    resetTimer()
    toast
      .promise(LoginService.login(locationState.phone), {
        loading: 'Resending OTP...',
        success: 'OTP sent successfully',
        error: 'Error sending OTP',
      })
      .then(response => {
        locationState.hash = response.data.hash
      })
      .finally(() => setIsDisabled({ ...isDisabled, request: false }))
  }

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <div className="container h-full">
        <h2 className="my-10 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Verify Phone
        </h2>
        <div className="max-w-md mx-auto space-y-6 flex flex-col items-center">
          <span className="text-neutral-500 text-sm">
            Code is sent to {locationState.phone}
          </span>
          <OtpSvg height="100px" width="100%" />
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
                autoFocus={true}
                containerClassName="grid grid-cols-6 gap-2 mt-1"
                onChange={code => setOtp(code)}
                inputClassName={`block text-center w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3`}
              />
            </label>
            <p className="text-neutral-500 text-sm">
              Didn&apos;t recieve code ?{' '}
              <button
                type="button"
                disabled={timer > 0 || isDisabled.request}
                onClick={handleRequest}
              >
                {timer > 0 ? `Resend in ${timer}s` : 'Request again'}
              </button>
            </p>
            <ButtonPrimary type="submit" disabled={isDisabled.otp}>
              Continue
            </ButtonPrimary>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Otp
