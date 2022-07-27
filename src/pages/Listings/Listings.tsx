import React, { FC, Fragment, useState } from 'react'
import ButtonSecondary from 'components/shared/Buttons/ButtonSecondary'
import { Tab } from '@headlessui/react'
import ListingsCard from 'components/ListingsCard'
import OwnerDashboardLayout from 'components/OwnerDashboardLayout'
import { useQuery } from 'react-query'
import ListingsService from 'services/listings'
import { Yacht } from 'services/addBoat'
import useUser from 'hooks/useUser'

const Listings: FC = () => {
  const [categories] = useState(['Inactive', 'Active'])

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
          <ButtonSecondary href="/add-listing/1">New Boat</ButtonSecondary>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <Tab.Group>
            <Tab.List className=" flex space-x-1 overflow-x-auto">
              {categories.map(item => (
                <Tab key={item} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                        selected
                          ? 'bg-secondary-900 text-secondary-50 '
                          : 'text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      } `}
                    >
                      {item}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="">
                <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                  {listings?.results.map((listing: Yacht) => (
                    <ListingsCard key={listing.id} boat={listing} />
                  ))}
                </div>
                <div className="flex mt-11 justify-center items-center"></div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </OwnerDashboardLayout>
  )
}

export default Listings
