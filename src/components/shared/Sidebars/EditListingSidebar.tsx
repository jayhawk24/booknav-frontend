import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import UpdateBoatService from 'services/updateBoat'
import SidebarContainer from '../SidebarContainer'
import { SidbarLinkType } from '../SidebarContainer/SidebarContainer'

export const EditListingSidebar = () => {
  const { yachtId } = useParams<{ yachtId: string }>()

  const { data: boat } = useQuery(
    'getBoat',
    async () => {
      const { data } = await UpdateBoatService.getBoat(yachtId)
      return data
    },
    { staleTime: 24 * 60 * 60 * 1000 },
  )

  const title = boat?.name

  const links: SidbarLinkType[] = [
    {
      name: 'General',
      pathname: `/yacht/${yachtId}/general`,
    },
    {
      name: 'Photos',
      pathname: `/yacht/${yachtId}/photos`,
    },
    {
      name: 'Price',
      pathname: `/yacht/${yachtId}/price`,
    },
    {
      name: 'Booking',
      pathname: `/yacht/${yachtId}/booking`,
    },
    {
      name: 'Technical',
      pathname: `/yacht/${yachtId}/technical`,
    },
    {
      name: 'Insurance',
      pathname: `/yacht/${yachtId}/insurance`,
    },
    {
      name: 'Availability',
      pathname: `/yacht/${yachtId}/availability`,
    },
    {
      name: 'Equipment',
      pathname: `/yacht/${yachtId}/equipment`,
    },
    {
      name: 'Discounts',
      pathname: `/yacht/${yachtId}/discounts`,
    },
  ]

  return (
    <SidebarContainer title={title} links={links} imageUrl={boat?.yacht_icon} />
  )
}
