import React, { FC, useMemo } from 'react'
import BgGlassmorphism from 'components/BgGlassmorphism/BgGlassmorphism'
import SectionGridFilterCard from 'components/SectionGridFilterCard'
import useSearchParams from 'hooks/useSearchParams'
import usePublishedNaav from 'hooks/usePublishedNaav'
import useBoatTypes from 'hooks/useBoatTypes'

interface SearchPageProps {
  className?: string
}

const Search: FC<SearchPageProps> = ({ className = '' }) => {
  const searchParams = useSearchParams()

  const queries = {
    ghatId: searchParams.get('ghatId') || '',
    boatTypeId: searchParams.getAll('boatTypeId') || [],
    search: searchParams.get('search') || '',
    isPublished: searchParams.get('isPublished') || true,
    minPrice: searchParams.get('minPrice') || '0',
    maxPrice: searchParams.get('maxPrice') || '10000',
    guests: searchParams.get('guests') || '2',
  }

  const { data: boats, isLoading } = usePublishedNaav(queries)
  const { data: boatTypes } = useBoatTypes()

  const searchedType = useMemo(
    () =>
      queries.boatTypeId?.length === 1
        ? boatTypes?.find(type => type._id == queries?.boatTypeId?.[0])?.title +
          's'
        : 'Naavs',
    [boatTypes, queries],
  )

  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden ${className}`}
      data-nc-id="ListingStayPage"
    >
      <BgGlassmorphism />

      <div className="container relative overflow-hidden">
        <SectionGridFilterCard
          className="pb-24 lg:pb-32"
          data={boats?.data || []}
          heading={`${searchedType} ${
            queries.search ? 'as' : 'in'
          } ${searchParams.get('cityName')}`}
          count={boats?.data.length || 0}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default Search
