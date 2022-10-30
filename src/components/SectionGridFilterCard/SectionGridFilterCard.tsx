import React, { FC } from 'react'
import Heading2 from 'components/shared/Heading/Heading2'
import { Loader } from 'components/FallbackComponent/FallbackComponent'
import ListingsCard from 'components/ListingsCard'
import { Naav } from 'services/addBoat'
import TabFilters from 'components/TabFilters'

export interface SectionGridFilterCardProps {
  className?: string
  data: Naav[]
  heading?: string
  count: number
  isLoading?: boolean
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = '',
  data,
  heading,
  count,
  isLoading,
}) => {
  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2 heading={heading} subHeading={`${count} boats`} />
      <div className="mb-8">
        <TabFilters />
      </div>
      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.length > 0 ? (
            data.map(naav => (
              <ListingsCard key={naav._id} boat={naav} hideButtons={true} />
            ))
          ) : (
            <div className="text-md ml-4 flex mt-5 h-screen">
              No results found
            </div>
          )}
        </div>
      )}

      <div className="flex mt-16 justify-center items-center">
        {/* <Pagination count={count} /> */}
      </div>
    </div>
  )
}

export default SectionGridFilterCard
