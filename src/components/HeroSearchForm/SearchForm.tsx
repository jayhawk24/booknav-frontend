import React, { useState } from 'react'
import LocationInput from 'components/LocationInput'
import ButtonSubmit from './ButtonSubmit'
import { GhatType } from 'hooks/useGhats'

const SearchForm = () => {
  // const [dateValue, setdateValue] = useState<moment.Moment | null>(moment())
  const [locationInputValue, setLocationInputValue] = useState<GhatType>({
    _id: '',
    title: '',
  })

  // const [dateFocused, setDateFocused] = useState<boolean>(false)
  // const defaultDate = moment()

  const renderForm = () => {
    return (
      <form className="w-full relative mt-8 flex flex-col md:flex-row md:items-center rounded-3xl lg:rounded-full shadow-xl dark:shadow-2xl dark:shadow-neutral-800 bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-700 md:divide-y-0">
        <LocationInput
          defaultValue={locationInputValue}
          onChange={e => setLocationInputValue(e)}
          // onInputDone={() => setDateFocused(true)}
        />
        {/* 
        <DateSingleInput
          defaultValue={dateValue}
          onChange={date => setdateValue(date)}
          defaultFocus={dateFocused}
          onFocusChange={(focus: boolean) => {
            setDateFocused(focus)
          }}
          label="Select Date"
        /> */}
        <div className="px-4 py-4 lg:py-0">
          <ButtonSubmit
            isDisabled={locationInputValue._id === ''}
            link={`/search/?ghatId=${locationInputValue._id}&cityName=${locationInputValue.title}&page=1`}
          />
        </div>
      </form>
    )
  }

  return renderForm()
}

export default SearchForm
