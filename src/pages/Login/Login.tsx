import React, { FC, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'

import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import SocialLogin from 'components/shared/SocialLogin'

import LoginService, { LoginResponseType } from 'services/login'
import { setToken } from 'utils/tokenHandlers'
import toast from 'react-hot-toast'
import InputWithHelper from 'components/shared/InputWithHelper'

export interface PageLoginProps {
  className?: string
}

export const loginUser = (response: LoginResponseType) => {
  setToken(response?.data.access, response?.data.refresh)
  window.location.pathname = '/'
  // reload page
  // localStorage.setItem('role', response.data.roles)
  // api update not getting roles from server
}

const PageLogin: FC<PageLoginProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [isDisabled, setIsDisabled] = useState(false)

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (Object.values(errors).join('') !== '')
      setErrors({ email: '', password: '' })

    setIsDisabled(true)
    const response = await LoginService.login(email, password).catch(error => {
      if (error.response.status === 500) {
        // OAUTH user login error
        toast.error('No active account found with the given credentials')
      }
      setErrors(error.response.data)
      setIsDisabled(false)
    })

    if (response?.data?.access) {
      setIsDisabled(false)
      loginUser(response)
    }
  }

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <SocialLogin />
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-6"
            action="#"
            method="post"
            onSubmit={handleLogin}
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <InputWithHelper
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(event.target.value)
                }
                helperText={errors.email}
              />
            </label>
            <div className="grid">
              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Password
                </span>
                <InputWithHelper
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(event.target.value)
                  }
                  type="password"
                  className="mt-1"
                  helperText={errors.password}
                />
              </label>
              <Link to="/forgot-pass" className="text-sm text-right mt-2">
                Forgot password?
              </Link>
            </div>

            <ButtonPrimary type="submit" disabled={isDisabled}>
              Continue
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link to="/register">Create an account</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default PageLogin
