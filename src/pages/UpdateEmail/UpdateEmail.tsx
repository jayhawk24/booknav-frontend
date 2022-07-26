import React, { FC, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useHistory } from 'react-router-dom'
import accountService from 'services/account'

export interface PageSignUpProps {
  className?: string
}

const UpdateEmail: FC<PageSignUpProps> = ({ className = '' }) => {
  const history = useHistory()

  const query = new URLSearchParams(window.location.search)
  const token = query.get('token')

  useEffect(() => {
    if (token) {
      toast
        .promise(accountService.verifyUpdateEmail(token), {
          loading: 'Verifying email',
          success: response => response.data.msg,
          error: error => error.response.data.error,
        })
        .then(() => history.push('/account/profile'))
    }
  }, [])

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <div className="container mb-24 lg:mb-32">
        <div className="max-w-md mx-auto space-y-14 ">
          <span
            className="block text-center text-neutral-700 dark:text-neutral-300 "
            style={{ height: '50vh' }}
          >
            Please wait while we verify your email
          </span>
        </div>
      </div>
    </div>
  )
}

export default UpdateEmail
