import { lazy } from 'react'

const Login = lazy(() => import('pages/Login'))
const Register = lazy(() => import('pages/Register'))
const Logout = lazy(() => import('pages/Logout'))
const Otp = lazy(() => import('pages/Otp'))

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
]
