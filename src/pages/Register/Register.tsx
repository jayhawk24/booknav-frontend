import React, { FC, FormEvent, useState } from 'react'
// import facebookSvg from 'images/Facebook.svg'
// import googleSvg from 'images/Google.svg'
import Input from 'components/shared/Input/Input'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import { Link, useHistory } from 'react-router-dom'
import Label from 'components/shared/Label/Label'
import RegisterService from 'services/register'
import toast from 'react-hot-toast'
import SocialLogin from 'components/shared/SocialLogin'
import PhoneSelect from 'components/shared/PhoneSelect/PhoneSelect'
import InputWithHelper from 'components/shared/InputWithHelper'
import FormError from 'components/shared/FormError'

export interface PageSignUpProps {
  className?: string
}

const Register: FC<PageSignUpProps> = ({ className = '' }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneCode, setPhoneCode] = useState('971')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState({
    name: '',
    mobile_number: '',
    email: '',
    password: '',
  })
  const [disabled, setDisabled] = useState(false)

  const history = useHistory()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (password !== confirmPassword) return
    const phoneNumber = phoneCode + ' ' + phone

    setDisabled(true)
    const register = RegisterService.register(
      name,
      phoneNumber,
      email,
      password,
    )

    toast
      .promise(register, {
        loading: 'Registering...',
        success: response => response.data.msg,
        error: "Couldn't register, please try again",
      })
      .then(() => {
        history.push('/verify-email/?email=' + email)
      })
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
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Register
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
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
            onSubmit={handleSubmit}
          >
            <div>
              <Label>Name</Label>
              <InputWithHelper
                className="mt-1.5"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                helperText={error.name}
              />
            </div>

            {/* ---- */}

            <div>
              <Label>Phone number</Label>
              <div className="flex">
                <PhoneSelect
                  id="phone"
                  name="phone"
                  className="mt-1.5 flex-1 mr-2"
                  value={phoneCode}
                  onChange={e => setPhoneCode(e.target.value)}
                />
                <Input
                  className="mt-1.5 w-6/12"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
              <FormError text={error.mobile_number} />
            </div>

            <div>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Email address
                </span>
              </label>

              <InputWithHelper
                type="email"
                placeholder="example@example.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                helperText={error.email}
              />
            </div>

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
            <div>
              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Confirm Password
                </span>
              </label>
              <InputWithHelper
                type="password"
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
                className={
                  password
                    ? password === confirmPassword
                      ? 'mt-1 border-2 border-green-600 dark:border-green-600'
                      : 'mt-1 border-2 border-red-600 dark:border-red-600'
                    : 'mt-1'
                }
                helperText={error.password}
              />
            </div>
            <ButtonPrimary type="submit" disabled={disabled}>
              Continue
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link to="/login">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Register
