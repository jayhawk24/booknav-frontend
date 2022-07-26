/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from '@greatsumini/react-facebook-login'
import toast from 'react-hot-toast'

import googleSvg from 'images/Google.svg'
import facebookSvg from 'images/FaceBook.svg'

import googleService from 'services/login/googleService'
import { loginUser } from 'pages/Login/Login'
import facebookService from 'services/login/facebookService'

const SocialLogin = () => {
  const googleLogin = (response: any) => {
    // Google doesnt give me type :(
    if (response?.tokenId) {
      toast
        .promise(googleService.login(response.tokenId), {
          loading: 'Loading...',
          success: 'Logged In',
          error: 'Something went wrong!',
        })
        .then(response => {
          loginUser(response)
        })
    }
  }

  const facebookLogin = (response: any) => {
    // facebook doesnt give me type :(
    if (response?.accessToken) {
      toast
        .promise(facebookService.login(response.accessToken), {
          loading: 'Loading...',
          success: 'Logged In',
          error: 'Something went wrong!',
        })
        .then(response => {
          loginUser(response)
        })
    }
  }

  return (
    <div className="grid gap-3">
      {/* {loginSocials.map((item, index) => ( */}
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID || ''}
        buttonText="Login"
        onSuccess={googleLogin}
        onFailure={googleLogin}
        // isSignedIn={true}
        cookiePolicy={'single_host_origin'}
        render={renderProps => (
          <a
            onClick={renderProps.onClick}
            className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px] cursor-pointer"
          >
            <img src={googleSvg} alt="google icon" />
            <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
              Continue with Google
            </h3>
          </a>
        )}
      />

      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
        onSuccess={response => {
          facebookLogin(response)
        }}
        onFail={error => {
          toast.error(error.status)
          console.error(error)
        }}
        onProfileSuccess={response => {
          facebookLogin(response)
        }}
        render={({ onClick }) => (
          <a
            onClick={onClick}
            className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px] cursor-pointer"
          >
            <img src={facebookSvg} alt="facebook icon" />
            <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
              Continue with Facebook
            </h3>
          </a>
        )}
      />
    </div>
  )
}

export default SocialLogin
