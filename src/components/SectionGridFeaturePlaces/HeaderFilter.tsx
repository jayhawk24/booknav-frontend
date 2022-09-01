import React, { FC, useEffect, useState } from 'react'
import Heading from 'components/shared/Heading'
import Nav from 'components/shared/Nav'
import NavItem from 'components/shared/NavItem/NavItem'
import ButtonSecondary from 'components/shared/Buttons/ButtonSecondary'
import { ReactNode } from 'react'
import useSearchParams from 'hooks/useSearchParams'
import { GhatType } from 'hooks/useGhats'

export interface HeaderFilterProps {
  tabActive: GhatType | undefined
  tabs: GhatType[]
  heading: ReactNode
  subHeading?: ReactNode
  onClickTab: (item: GhatType) => void
}

const HeaderFilter: FC<HeaderFilterProps> = ({
  tabActive,
  tabs,
  subHeading = '',
  heading = '🎈 Latest Articles',
  onClickTab,
}) => {
  const [tabActiveState, setTabActiveState] = useState(tabActive)
  const searchParams = useSearchParams()

  // useEffect(() => {
  //   setTabActiveState(tabActive)
  // }, [tabActive])

  useEffect(() => {
    const ghatId = searchParams.get('ghatId') || tabs[0]?._id
    setTabActiveState(tabs.find(item => item._id === ghatId))
  }, [searchParams, tabs])

  const handleClickTab = (item: GhatType) => {
    onClickTab && onClickTab(item)
    setTabActiveState(item)
  }

  return (
    <div className="flex flex-col mb-8 relative">
      <Heading desc={subHeading}>{heading}</Heading>
      <div className="flex items-center justify-between">
        <Nav
          className="sm:space-x-2"
          containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar"
        >
          {tabs.map((item, index) => (
            <NavItem
              key={index}
              isActive={tabActiveState === item}
              onClick={() => handleClickTab(item)}
            >
              {item.title.split(' ')[0].replace(/[^a-zA-Z ]/g, '')}
            </NavItem>
          ))}
        </Nav>
        <span className="hidden sm:block flex-shrink-0">
          <ButtonSecondary
            className="!leading-none"
            href={`/search?cityName=the World`}
          >
            <span>View All</span>
            <i className="ml-3 las la-arrow-right text-xl"></i>
          </ButtonSecondary>
        </span>
      </div>
    </div>
  )
}

export default HeaderFilter
