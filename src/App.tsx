import React, { Suspense } from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'

import routes from 'routes'
import Header from 'components/Header'

function App() {
  const noAuthRoutes = []

  const nonProtectedRoutes = routes
    .filter(r => !r.isProtected)
    .map((route, idx) => {
      noAuthRoutes.push(route.path)
      return (
        <Route key={idx} path={route.path} exact={route.exact}>
          <Suspense fallback={<div>Loading...</div>}>
            <route.component />
          </Suspense>
        </Route>
      )
    })

  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <BrowserRouter>
        <Header />
        <Switch>{nonProtectedRoutes}</Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
