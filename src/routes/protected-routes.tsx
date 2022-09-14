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
const BoatTypeList = lazy(
  () => import('../../src/pages/BoatTypeList/BoatTypeList'),
)
const AddBoatType = lazy(() => import('components/AddBoatType'))
const EditBoatType = lazy(() => import('pages/EditBoatType'))
const NaavDetail = lazy(() => import('pages/NaavDetail'))
const Search = lazy(() => import('pages/Search'))
const Bookings = lazy(() => import('pages/Bookings'))

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
    path: '/naav/:naavId/edit',
    component: EditNaav,
    exact: true,
  },
  {
    name: 'boat-type-list',
    path: '/boat_types',
    component: BoatTypeList,
    exact: true,
  },
  {
    name: 'add-boat-type',
    path: '/boat_types/add',
    component: AddBoatType,
    exact: true,
  },
  {
    name: 'edit-boat-type',
    path: '/boat_types/:boatTypeId',
    component: EditBoatType,
    exact: true,
  },
  {
    name: 'naav-sigle',
    path: '/naav/:naavId',
    component: NaavDetail,
    exact: true,
  },
  {
    name: 'search',
    path: '/search',
    component: Search,
  },
  {
    name: 'bookings',
    path: '/bookings',
    component: Bookings,
  },
]
