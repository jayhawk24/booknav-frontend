import React, { FC, FormEvent, useState } from 'react'

import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import { ReactComponent as LoginSvg } from '../../images/undraw_mobile_login_re_9ntv.svg'
import LoginService from 'services/login'
import toast from 'react-hot-toast'
import InputWithHelper from 'components/shared/InputWithHelper'
import { useHistory } from 'react-router'

export interface PageLoginProps {
  className?: string
}

const PageLogin: FC<PageLoginProps> = ({ className = '' }) => {
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState({ phone: '' })
  const [isDisabled, setIsDisabled] = useState(false)

  const history = useHistory()

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (Object.values(errors).join('') !== '') setErrors({ phone: '' })

    setIsDisabled(true)
    toast
      .promise(LoginService.login('+91' + phone), {
        loading: 'Sending OTP...',
        success: response =>
          response.data.otp ? response.data.otp : 'OTP sent successfully.',
        error: error => error.response.data.message,
      })
      .then(response =>
        history.push('/otp', {
          hash: response.data.hash,
          phone: '+91' + phone,
        }),
      )
      .catch(error => {
        if (error?.response?.status === 406) {
          return history.push('/register', {
            phone,
          })
        }
        setErrors(error.response.data)
      })
      .finally(() => setIsDisabled(false))
  }

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-10 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <LoginSvg height="200px" width="100%" />
          <form
            className="grid grid-cols-1 gap-6"
            action="#"
            method="post"
            onSubmit={handleLogin}
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Phone
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

export default PageLogin
