import React, { useEffect } from 'react'
import { logoutUser } from 'hooks/useUser'
import requestClient from 'services/requestClient'
import { useHistory } from 'react-router-dom'

function Logout() {
  const history = useHistory()
  useEffect(() => {
    requestClient.get('/users/logout').finally(() => {
      logoutUser()
      history.push('/login')
      history.go(0)
    })
  }, [])

  return <div>You are Logged out</div>
}

export default Logout
