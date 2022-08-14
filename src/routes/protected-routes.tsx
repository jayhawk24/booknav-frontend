import { lazy } from 'react'
const Logout = lazy(() => import('pages/Logout'))
const Account = lazy(() => import('pages/Account'))
const Home = lazy(() => import('pages/Home'))
const Listings = lazy(() => import('pages/Listings/Listings'))
const AddListing = lazy(() => import('pages/AddListing'))
const GhatList = lazy(() => import('pages/GhatsList/GhatList'))
const AddGhatForm = lazy(() => import('components/GhatForm/GhatForm'))
const EditGhat = lazy(() => import('pages/EditGhat/EditGhat'))
const EditNaav = lazy(() => import('pages/EditNaav'))

const GhatList = lazy(() => import('pages/GhatsList/GhatList'))

const AddGhatForm = lazy(() => import('components/AddGhatForm/AddGhatForm'))

const EditGhat = lazy(() => import('pages/EditGhat/EditGhat'))

export const protectedRoutes = [
  {
    path: '/', // this is temporary component
    component: Home,
    exact: true,
  },
  {
    name: 'account',
    path: '/account',
    component: Account,
    exact: true,
  },
  {
    name: 'Naavs',
    path: '/naavs',
    component: Listings,
  },
  {
    name: 'Add naav',
    path: '/naav/add',
    component: AddListing,
  },
  {
    path: '/logout',
    component: Logout,
    exact: true,
  },
  {
    name: 'ghats-list',
    path: '/ghats',
    component: GhatList,
    exact: true,
  },
  {
    name: 'ghat-form',
    path: '/ghats/add',
    component: AddGhatForm,
    exact: true,
  },
  {
    name: 'edit-ghat',
    path: '/ghats/:ghatId',
    component: EditGhat,
    exact: true,
  },
  {
    name: 'edit-naav',
    path: '/naav/:naavId',
    component: EditNaav,
    exact: true,
  },
  {
    name: 'ghats-list',
    path: '/ghats',
    component: GhatList,
    exact: true,
  },
  {
    name: 'ghat-form',
    path: '/ghats/add',
    component: AddGhatForm,
    exact: true,
  },
  {
    name: 'edit-ghat',
    path: '/ghats/:ghatId',
    component: EditGhat,
    exact: true,
  },
]
