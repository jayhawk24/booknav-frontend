import { lazy } from 'react'

const Login = lazy(() => import('pages/Login'))
const Register = lazy(() => import('pages/Register'))
const Logout = lazy(() => import('pages/Logout'))
const Otp = lazy(() => import('pages/Otp'))
const CancelRefundPolicy = lazy(
  () => import('pages/CancelRefundPolicy/CancelRefundPolicy'),
)
const PrivacyPolicy = lazy(() => import('pages/PrivacyPolicy/PrivacyPolicy'))
const TermsConditions = lazy(
  () => import('pages/TermsConditions/TermsConditions'),
)
const Home = lazy(() => import('pages/Home'))
const NaavDetail = lazy(() => import('pages/NaavDetail'))
const Search = lazy(() => import('pages/Search'))
const DeleteData = lazy(() => import('pages/DeleteData/DeleteData'))

export const nonProtectedRoutes = [
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    name: 'search',
    path: '/search',
    component: Search,
  },
  {
    name: 'naav-sigle',
    path: '/naav/:naavId',
    component: NaavDetail,
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
  {
    path: '/terms_and_conditions',
    component: TermsConditions,
    exact: true,
  },
  {
    path: "/delete_data",
    component: DeleteData,
    exact: true
  }
]
