import React from 'react'
import useUser from 'hooks/useUser'
import { NavLink } from 'react-router-dom'

const Home = () => {
  const { data: user } = useUser()
  return (
    <div className="container mb-24 lg:mb-32" style={{ height: '60vh' }}>
      <div className="w-full text-center">
        {user ? (
          <div>
            <p>You are logged in</p>
            <br />
            <NavLink to="/account" className={'text-purple-500'}>
              Click to view profile
            </NavLink>
          </div>
        ) : (
          'You are not logged in'
        )}
      </div>
    </div>
  )
}

export default Home
