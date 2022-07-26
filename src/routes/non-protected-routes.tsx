import { lazy } from 'react'

const Login = lazy(() => import('pages/Login'))
const Register = lazy(() => import('pages/Register'))

const ForgotPass = lazy(() => import('pages/ForgotPass'))
const Logout = lazy(() => import('pages/Logout'))
const ResetPassword = lazy(() => import('pages/ResetPassword/ResetPassword'))
const VerifyEmail = lazy(() => import('pages/VerifyEmail'))

export const nonProtectedRoutes = [
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/logout',
    component: Logout,
    exact: true,
  },
  {
    path: '/register',
    component: Register,
    exact: true,
  },
  {
    path: '/verify-email',
    component: VerifyEmail,
    exact: true,
  },
  {
    path: '/forgot-pass',
    component: ForgotPass,
    exact: true,
  },
  {
    path: '/reset-password',
    component: ResetPassword,
    exact: true,
  },
]
