import React, { FC } from 'react'
import ButtonSecondary from 'components/shared/Buttons/ButtonSecondary'
import ListingsCard from 'components/ListingsCard'
import OwnerDashboardLayout from 'components/OwnerDashboardLayout'
import { useQuery } from 'react-query'
import { Naav } from 'services/addBoat'
import { getListings } from 'services/listings'

const Listings: FC = () => {
  const { data: listings } = useQuery('getListings', getListings)

  return (
    <OwnerDashboardLayout>
      <div className="listingSection__wrap">
        <div className="flex justify-end">
          <ButtonSecondary href="/naav/add">New Boat</ButtonSecondary>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          {listings?.length === 0 && (
            <div className="text-center w-full">
              <h1 className="text-2xl font-bold text-neutral-700">
                You have no naavs listed
              </h1>
              <p className="text-lg text-neutral-500">
                You can add a naav by clicking the button above.
              </p>
            </div>
          )}
          <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
            {listings?.map((listing: Naav) => (
              <ListingsCard key={listing._id} boat={listing} />
            ))}
          </div>
          <div className="flex mt-11 justify-center items-center"></div>
        </div>
      </div>
    </OwnerDashboardLayout>
  )
}

export default Listings
