import React from 'react'

import Alert from 'components/Alert'
import MainRouter from 'routes/MainRouter'

function App() {
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <Alert />
      <MainRouter />
    </div>
  )
}

export default App
