import React, { FC } from 'react'
import 'react-dates/initialize'
import SearchForm from './SearchForm'

export type SearchTab = 'Stays' | 'Experiences' | 'Cars' | 'Flights'

export interface HeroSearchFormProps {
  className?: string
  currentTab?: SearchTab
  currentPage?: 'Stays' | 'Experiences' | 'Cars' | 'Flights'
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({ className = '' }) => {
  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
      data-nc-id="HeroSearchForm"
    >
      <SearchForm />
    </div>
  )
}

export default HeroSearchForm
