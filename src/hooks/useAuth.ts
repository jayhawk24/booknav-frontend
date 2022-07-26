import { useEffect, useState } from 'react'
import axios from 'axios'

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')

  useEffect(() => {
    const getUserProfile = async () => {
      const response = await axios.get('/user/profile')
      if (response?.data) {
        return setUser(response.data)
      }
      setIsLoggedIn(false)
    }
    getUserProfile()

    if (accessToken !== undefined || refreshToken !== undefined) {
      setIsLoggedIn(true)
    }
  }, [])

  return {
    isLoggedIn,
    user,
    accessToken,
    refreshToken,
  }
}

export default useAuth
