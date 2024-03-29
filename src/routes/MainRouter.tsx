import React, { Suspense } from 'react'
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom'

import routes from 'routes'
import Header from 'components/Header'
import Page404 from 'pages/Page404/Page404'
import useUser from 'hooks/useUser'
import FallbackComponent from 'components/FallbackComponent'
import Footer from 'components/shared/Footer/Footer'
import ScrollToTop from 'components/shared/ScrollToTop/ScrollToTop'
import FooterNav from 'components/FooterNav'

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
        <ScrollToTop />
        <Switch>
          {isLogin && protectedRoutes}
          {isLogin && redirects}
          {!isLogin && nonProtectedRoutes}
          {!isLogin && <Redirect exact from="/" to="/login" />}
          <Route key={0} component={Page404} />
        </Switch>
        <FooterNav />
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default MainRouter
