import { MailIcon } from '@heroicons/react/outline'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useHistory } from 'react-router-dom'
import requestClient from 'services/requestClient'
import VerifyEmailService from 'services/verifyEmail'

const VerifyEmail = () => {
  const [apiMessage, setApiMessage] = useState(null)
  const [errorMessage, setErrorMsg] = useState(null)
  const history = useHistory()

  const query = new URLSearchParams(window.location.search)
  const token = query.get('token')
  const email = query.get('email')

  useEffect(() => {
    if (token) {
      requestClient
        .post(`/api/system-users/verify-email/?token=${token}`)
        .then(function (response) {
          const message = response.data.message || response.data.error
          setApiMessage(message)
          toast.success(message)
          navigateToLogin()
        })
        .catch(function (error) {
          if (error?.response?.data.error) {
            setErrorMsg(error?.response?.data.error)
          } else {
            if (error?.response?.data.token) {
              setErrorMsg(error?.response?.data.token)
            }
          }
        })
    }
  }, [])

  const navigateToLogin = () => {
    localStorage.clear()
    history.push('/login')
  }

  let disabledLink = false

  const handleResendMail = () => {
    if (disabledLink) return
    disabledLink = true
    if (email) {
      toast.promise(VerifyEmailService.verify(email), {
        loading: 'Resending mail',
        success: response => {
          disabledLink = false
          return response.data.msg
        },
        error: error => {
          disabledLink = false
          return error.response.data.error
        },
      })
    }
  }

  return (
    <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32 min-h-full">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Verify your account
        </h2>
        {!token && (
          <div className="max-w-md mx-auto space-y-6">
            Account activation link has been sent to the e-mail address you
            provided.
            <br />
            <p className="text-purple-500 flex">
              Didn&apos;t get the mail?
              <div className="cursor-pointer ml-2" onClick={handleResendMail}>
                Send it again
              </div>
            </p>
            <MailIcon />
          </div>
        )}

        <div className="max-w-md mx-auto space-y-16 ">
          {apiMessage ? (
            <span className="text-center">
              <span className="text-center mt-3">{apiMessage}</span>
              <br></br>
            </span>
          ) : (
            ''
          )}
          {errorMessage ? (
            <span>
              <span className="text-center text-red-600 mt-3">
                {errorMessage}
              </span>
              <br></br>
            </span>
          ) : (
            ''
          )}

          <ButtonPrimary onClick={navigateToLogin} className="mt-2 w-full">
            Login
          </ButtonPrimary>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail
