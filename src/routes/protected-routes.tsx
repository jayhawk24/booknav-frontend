import { lazy } from 'react'

const Logout = lazy(() => import('pages/Logout'))
const UpdateEmail = lazy(() => import('pages/UpdateEmail'))
const Account = lazy(() => import('pages/Account'))
const AccountProfile = lazy(() => import('pages/AccountProfile'))
const EditListingGeneral = lazy(
  () => import('pages/EditListing/EditListingGeneral'),
)
const AddListing1 = lazy(() => import('pages/AddListing'))
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

export const protectedRoutes = [
  {
    path: '/', // this is temporary component
    component: Home,
    exact: true,
  },
  {
    name: 'account-basic',
    path: '/account/general',
    component: Account,
    exact: true,
    // roles: [ROLES.CUSTOMER,ROLES.OWNER]
  },
  {
    name: 'account-profile',
    path: '/account/profile',
    component: AccountProfile,
    exact: true,
    // // roles: [ROLES.CUSTOMER,ROLES.OWNER]
  },
  {
    name: 'update-email',
    path: '/update-email',
    component: UpdateEmail,
    exact: true,
    // // roles: [ROLES.CUSTOMER,ROLES.OWNER]
  },
  {
    name: 'add-listing-1',
    path: '/add-listing/1',
    component: AddListing1,
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
    name: 'listings',
    path: '/listings',
    component: Listings,
  },
  {
    path: '/logout',
    component: Logout,
    exact: true,
  },
]