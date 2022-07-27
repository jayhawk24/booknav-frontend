import React from 'react'
import SidebarContainer from '../SidebarContainer'
import { SidbarLinkType } from '../SidebarContainer/SidebarContainer'
import useUser from 'hooks/useUser'

export const OwnerSidebar = () => {
  const { data: user } = useUser()

  const links: SidbarLinkType[] = [
    { name: 'Daily View', pathname: '/owner-daily' },
    { name: 'Monthly View', pathname: '/owner-monthly' },
    { name: 'Enquiries', pathname: '/owner-enquiry' },
    { name: 'Pending Bookings', pathname: '/owner-pending-bookings' },
    { name: 'Secured Bookings', pathname: '/owner-bookings' },
    {
      name: 'Cancelled Bookings',
      pathname: '/owner-cancelled-bookings',
    },
    { name: 'Messages', pathname: '/messages' },

    { name: 'New Enquiry', pathname: '/admin-new-enquiry' },
    { name: 'New Block', pathname: '/admin-new-block' },

    { name: 'Listings', pathname: '/listings' },

    { name: 'Profile', pathname: '/account/profile' },
  ]

  return <SidebarContainer title={user?.title} links={links} />
}
