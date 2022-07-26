import React, { useEffect } from 'react'
import { logoutUser } from 'hooks/useUser'

function Logout() {
  useEffect(() => {
    logoutUser()
    window.location.pathname = '/login'
  }, [])

  return <div>You are Logged out</div>
}

export default Logout
