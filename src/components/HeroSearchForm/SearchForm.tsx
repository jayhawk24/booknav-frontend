import React, { useState } from 'react'
import LocationInput from 'components/LocationInput'
import { GhatType } from 'hooks/useGhats'
import GuestsInput from './GuestsInput'

const SearchForm = () => {
  const [locationInputValue, setLocationInputValue] = useState<GhatType>({
    _id: '',
    title: '',
  })
  const [guests, setGuests] = useState(2)

  const renderForm = () => {
    return (
      <form className="w-full relative mt-8 flex flex-col md:flex-row md:items-center rounded-3xl lg:rounded-full shadow-xl dark:shadow-2xl dark:shadow-neutral-800 bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700 md:divide-y-0">
        <div className="flex justify-between">
          <LocationInput
            defaultValue={locationInputValue}
            onChange={e => setLocationInputValue(e)}
          />
          <GuestsInput
            defaultValue={guests}
            buttonSubmitHref={`/search/?ghatId=${
              locationInputValue._id
            }&cityName=${
              locationInputValue.title || 'Varanasi'
            }&guests=${guests}&page=1`}
            onChange={num => setGuests(num)}
          />
        </div>
      </form>
    )
  }

  return renderForm()
}

export default SearchForm
