import { lazy } from 'react'

// Authorization Components
const Login = lazy(() => import('pages/Login'))

export const nonProtectedRoutes = [
  {
    path: '/login',
    component: Login,
    exact: true,
  },
]
