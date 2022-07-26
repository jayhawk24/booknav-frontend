import { nonProtectedRoutes } from './non-protected-routes'
// import { protectedRoutes } from './protected-routes'

export const routes = [
  //   ...protectedRoutes.map(route: routes  => ({ ...route, isProtected: true })),
  ...nonProtectedRoutes.map(route => ({ ...route, isProtected: false })),
]

export default routes
