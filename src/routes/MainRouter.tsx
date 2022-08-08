import React, { Suspense } from 'react'
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom'

import routes from 'routes'
import Header from 'components/Header'
import Page404 from 'pages/Page404/Page404'
import useUser from 'hooks/useUser'
import FallbackComponent from 'components/FallbackComponent'

function MainRouter() {
  const noAuthRoutes: string[] = []

  const { isLoggedIn: isLogin, isFetched } = useUser()

  const nonProtectedRoutes = routes
    .filter(r => !r.isProtected)
    .map((route, idx) => {
      noAuthRoutes.push(route.path)
      return (
        <Route key={idx} path={route.path} exact={route.exact}>
          <Suspense fallback={<FallbackComponent />}>
            <route.component />
          </Suspense>
        </Route>
      )
    })

  const protectedRoutes: JSX.Element[] = routes
    .filter(r => r.isProtected)
    .map((route, idx) => (
      <Route key={idx} path={route.path} exact={route.exact}>
        <Suspense fallback={<FallbackComponent />}>
          <route.component />
        </Suspense>
      </Route>
    ))

  const redirects = noAuthRoutes.map((route, idx) => (
    <Redirect exact key={idx} from={route} to="/" />
  ))

  if (!isFetched) {
    return <FallbackComponent />
  }
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <Switch>
          {isLogin && protectedRoutes}
          {isLogin && redirects}
          {!isLogin && nonProtectedRoutes}
          {!isLogin && <Redirect exact from="/" to="/login" />}
          <Route key={0} component={Page404} />
        </Switch>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default MainRouter
