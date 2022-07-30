import React, { FormEvent, useState } from 'react'
import { KeyIcon } from '@heroicons/react/outline'
import toast from 'react-hot-toast'

import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import Input from 'components/shared/Input/Input'
import { PageSignUpProps } from 'pages/ForgotPass/ForgotPass'
import { Link, useHistory } from 'react-router-dom'
import forgotPassService from 'services/forgotPass'
import InputWithHelper from 'components/shared/InputWithHelper'

const ResetPassword = ({ className }: PageSignUpProps) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState({ password: '' })
  const [disabled, setDisabled] = useState(false)

  const history = useHistory()
  const query = new URLSearchParams(window.location.search)
  const token = query.get('token')

  const handleResetPass = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!token) return
    if (error.password) setError({ password: '' })
    if (password !== confirmPassword) {
      setError({ password: 'Passwords do not match' })
      return
    }
    setDisabled(true)

    toast
      .promise(forgotPassService.resetPass(token, password), {
        loading: 'Resetting password...',
        success: response => response.data.message,
        error: 'Error resetting password',
      })
      .then(() => {
        setDisabled(false)
        history.push('/login')
      })
      .catch(error => {
        setDisabled(false)
        setError(error.response.data)
      })
  }

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-10 flex flex-col items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          <KeyIcon className="h-10 w-10 text-primary-800 " />
          Reset Password
        </h2>
        <div className="max-w-md mx-auto space-y-14 ">
          <span className="block text-center text-neutral-700 dark:text-neutral-300 text-sm ">
            Please set your new password
          </span>
          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-6"
            action="#"
            method="post"
            onSubmit={handleResetPass}
          >
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                type="password"
                className="mt-1"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Confirm Password
              </span>

              <InputWithHelper
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className={
                  password
                    ? password === confirmPassword
                      ? 'mt-1 border-2 border-green-600 dark:border-green-600'
                      : 'mt-1 border-2 border-red-600 dark:border-red-600'
                    : 'mt-1'
                }
                helperText={error.password}
              />
            </label>

            <ButtonPrimary type="submit" disabled={disabled}>
              Continue
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Proceed to login? <Link to="/login">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
