import { lazy } from 'react'

const Logout = lazy(() => import('pages/Logout'))
const Account = lazy(() => import('pages/Account'))
const EditListingGeneral = lazy(
  () => import('pages/EditListing/EditListingGeneral'),
)
const Home = lazy(() => import('pages/Home'))
const EditListingPhotos = lazy(
  () => import('pages/EditListing/EditListingPhotos'),
)
const EditListingPrice = lazy(
  () => import('pages/EditListing/EditListingPrice'),
)
const EditListingEquipments = lazy(
  () => import('pages/EditListing/EditListingEquipments'),
)
const EditTechnicalDetails = lazy(
  () => import('pages/EditListing/EditTechnicalDetails'),
)
const Listings = lazy(() => import('pages/Listings/Listings'))
const AddListing = lazy(() => import('pages/AddListing'))

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
    name: 'yacht-edit-general',
    path: '/yacht/:yachtId/general',
    component: EditListingGeneral,
    exact: true,
  },
  {
    name: 'yacht-edit-photos',
    path: '/yacht/:yachtId/photos',
    component: EditListingPhotos,
    exact: true,
  },
  {
    name: 'yacht-edit-price',
    path: '/yacht/:yachtId/price',
    component: EditListingPrice,
    exact: true,
  },
  {
    name: 'yacht-edit-equipment',
    path: '/yacht/:yachtId/equipment',
    component: EditListingEquipments,
    exact: true,
  },
  {
    name: 'yacht-edit-description',
    path: '/yacht/:yachtId/technical',
    component: EditTechnicalDetails,
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
]
