import React, { FC, ReactNode } from 'react'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import HeaderFilter from './HeaderFilter'
import useSearchParams from 'hooks/useSearchParams'
import { useHistory } from 'react-router-dom'
import useGhats, { GhatType } from 'hooks/useGhats'
import { GetNaavQuery } from 'services/naav'
import usePublishedNaav from 'hooks/usePublishedNaav'
import { Naav } from 'services/addBoat'
import ListingsCard from 'components/ListingsCard'

export interface SectionGridFeaturePlacesProps {
  gridClass?: string
  heading?: ReactNode
  subHeading?: ReactNode
  headingIsCenter?: boolean
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  gridClass = '',
  heading = 'Suggestions For Discovery',
  subHeading = 'Our favorite destinations for you',
}) => {
  const searchParams = useSearchParams()

  const queries: GetNaavQuery = {
    ghatId: searchParams.get('ghatId') || undefined,
    isPublished: searchParams.get('isPublished') || true,
  }

  const history = useHistory()
  const { data: ghats } = useGhats()
  const { data: publishedBoats } = usePublishedNaav(queries)

  const cityId = searchParams.get('cityId') || '1'
  const cityName = searchParams.get('cityName') || ghats?.[0]?.title

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <HeaderFilter
        tabActive={ghats?.[0]}
        subHeading={subHeading}
        tabs={ghats?.slice(0, 3) || []}
        heading={heading}
        onClickTab={(tab: GhatType) => {
          searchParams.set('ghatId', tab._id.toString())
          searchParams.set('cityName', tab?.title)
          history.push(`?${searchParams.toString()}`)
        }}
      />
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {publishedBoats?.data.map((listing: Naav) => (
          <ListingsCard key={listing._id} boat={listing} hideButtons={true} />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary href={`/search/?cityId=${cityId}&cityName=${cityName}`}>
          Show me more
        </ButtonPrimary>
      </div>
    </div>
  )
}

export default SectionGridFeaturePlaces
