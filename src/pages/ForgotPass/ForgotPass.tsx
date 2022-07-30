import React, { FC, FormEvent, useState } from 'react'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { KeyIcon } from '@heroicons/react/solid'
import forgotPassService from 'services/forgotPass'
import InputWithHelper from 'components/shared/InputWithHelper'

export interface PageSignUpProps {
  className?: string
}

const ForgotPass: FC<PageSignUpProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState({
    email: '',
  })
  const [disabled, setDisabled] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (error.email) setError({ email: '' })
    setDisabled(true)
    const register = forgotPassService.forgotPass(email)
    toast
      .promise(register, {
        loading: 'Working on it...',
        success: response => response.data.message,
        error: error => error.response.data.email,
      })
      .then(() => setDisabled(false))
      .catch(error => {
        const data = error.response.data
        //Todo add types
        setError(data)
        setDisabled(false)
        throw error
      })
  }

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-10 flex flex-col items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          <KeyIcon className="h-10 w-10 text-primary-800 " />
          Forgot Password
        </h2>
        <div className="max-w-md mx-auto space-y-14 ">
          <span className="block text-center text-neutral-700 dark:text-neutral-300 text-sm ">
            No worries, we&apos;ll send you reset instructions.
          </span>
          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-6"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>

              <InputWithHelper
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                value={email}
                onChange={e => setEmail(e.target.value)}
                helperText={error.email}
              />
            </label>

            <ButtonPrimary type="submit" disabled={disabled}>
              Continue
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Want to login? <Link to="/login">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ForgotPass
