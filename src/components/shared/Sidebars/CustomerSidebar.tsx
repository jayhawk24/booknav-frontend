import React from 'react'
import SidebarContainer from '../SidebarContainer'
import { SidbarLinkType } from '../SidebarContainer/SidebarContainer'
import useUser from 'hooks/useUser'

export const CustomerSidebar = () => {
  const { data: user } = useUser()

  const links: SidbarLinkType[] = [
    {
      name: 'Account',
      pathname: '/account',
    },
    {
      name: 'Messages',
      pathname: '/messages',
    },
    {
      name: 'Bookings',
      pathname: '/bookings',
    },

    {
      name: 'Favourites',
      pathname: '/favourites',
    },
    {
      name: 'Profile',
      pathname: '/account',
    },
    {
      name: 'Logout',
      pathname: '/logout',
    },
  ]

  return <SidebarContainer title={user?.title} links={links} />
}
