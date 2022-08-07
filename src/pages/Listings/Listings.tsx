import React, { FC } from 'react'
import ButtonSecondary from 'components/shared/Buttons/ButtonSecondary'
import ListingsCard from 'components/ListingsCard'
import OwnerDashboardLayout from 'components/OwnerDashboardLayout'
import { useQuery } from 'react-query'
import ListingsService from 'services/listings'
import { Naav } from 'services/addBoat'
import useUser from 'hooks/useUser'

const Listings: FC = () => {
  const { data: listings } = useQuery('getListings', async () => {
    const { data } = await ListingsService.getListings()
    return data
  })

  const { data: user } = useUser()

  return (
    <OwnerDashboardLayout>
      <div className="listingSection__wrap">
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-semibold">
              {user?.title.split(' ')[0]}&apos;s listings
            </h2>
            <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
              {user?.title.split(' ')[0]}&apos;s listings are very rich.
            </span>
          </div>
          <ButtonSecondary href="/add-naav/">New Boat</ButtonSecondary>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
            {listings?.map((listing: Naav) => (
              <ListingsCard key={listing.id} boat={listing} />
            ))}
          </div>
          <div className="flex mt-11 justify-center items-center"></div>
        </div>
      </div>
    </OwnerDashboardLayout>
  )
}

export default Listings
