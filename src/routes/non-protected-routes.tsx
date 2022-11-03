import { lazy } from 'react'

const Login = lazy(() => import('pages/Login'))
const Register = lazy(() => import('pages/Register'))
const Logout = lazy(() => import('pages/Logout'))
const Otp = lazy(() => import('pages/Otp'))
const CancelRefundPolicy = lazy(
  () => import('pages/CancelRefundPolicy/CancelRefundPolicy'),
)
const PrivacyPolicy = lazy(() => import('pages/PrivacyPolicy/PrivacyPolicy'))

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
    path: '/otp',
    component: Otp,
    exact: true,
  },
  {
    path: '/cancel_and_refund_policy',
    component: CancelRefundPolicy,
    exact: true,
  },
  {
    path: '/privacy_policy',
    component: PrivacyPolicy,
    exact: true,
  },
]
