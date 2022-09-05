import React, { useEffect, useState } from 'react'
import {
  AnchorDirectionShape,
  DateRangePicker,
  FocusedInputShape,
  isSameDay,
} from 'react-dates'
import { FC } from 'react'
import ClearDataButton from './ClearDataButton'
import useWindowSize from 'hooks/useWindowResize'

type Fields = 'checkIn' | 'checkOut'
export interface DateRange {
  startDate: moment.Moment | null
  endDate: moment.Moment | null
}
export interface DatesRangeInputProps {
  defaultValue: DateRange
  defaultFocus?: FocusedInputShape | null
  onChange?: (data: DateRange) => void
  onFocusChange?: (focus: FocusedInputShape | null) => void
  fieldClassName?: string
  wrapClassName?: string
  numberOfMonths?: number
  anchorDirection?: AnchorDirectionShape
  disableDates?: moment.Moment[]
  compact?: boolean
}

const DatesRangeInput: FC<DatesRangeInputProps> = ({
  defaultValue,
  onChange,
  defaultFocus = null,
  onFocusChange,
  fieldClassName = '[ nc-hero-field-padding ]',
  wrapClassName = 'divide-y divide-neutral-200 dark:divide-neutral-700 lg:divide-y-0 md:border-l md:border-r border-neutral-200 lg:border-none',
  numberOfMonths,
  anchorDirection,
  disableDates,
  compact = false,
}) => {
  const [focusedInput, setFocusedInput] = useState(defaultFocus)
  const [stateDate, setStateDate] = useState(defaultValue)

  const windowSize = useWindowSize()

  useEffect(() => {
    setStateDate(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    setFocusedInput(defaultFocus)
  }, [defaultFocus])

  useEffect(() => {
    if (onChange) {
      onChange(stateDate)
    }
  }, [stateDate])

  const handleClearData = (field: Fields) => {
    switch (field) {
      case 'checkIn': {
        return setStateDate(date => ({ ...date, startDate: null }))
      }
      case 'checkOut': {
        return setStateDate(date => ({ ...date, endDate: null }))
      }

      default:
        break
    }
  }

  const handleDateFocusChange = (focus: FocusedInputShape | null) => {
    setFocusedInput(focus)
    onFocusChange && onFocusChange(focus)
  }

  const renderInputCheckInDate = () => {
    const focused = focusedInput === 'startDate'
    return (
      <div
        className={`relative flex flex-1 ${fieldClassName} flex-shrink-0 items-center space-x-3 cursor-pointer ${
          focused ? 'shadow-2xl rounded-full dark:bg-neutral-800' : ' '
        }`}
        onClick={() => handleDateFocusChange('startDate')}
      >
        {!compact && (
          <div className="text-neutral-300 dark:text-neutral-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="nc-icon-field"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        <div className="flex-grow">
          <span
            className={`block xl:text-lg font-semibold ${
              compact && 'whitespace-nowrap'
            }`}
          >
            {stateDate.startDate
              ? stateDate.startDate.format('DD MMM')
              : 'Start Date'}
          </span>
          <span
            className={`block mt-1 text-neutral-400 whitespace-nowrap leading-none font-light ${
              !compact ? ' text-sm' : ' text-xs'
            }`}
          >
            {stateDate.startDate ? 'Start Date' : `Add date`}
          </span>
          {stateDate.startDate && (focused || compact) && (
            <ClearDataButton onClick={() => handleClearData('checkIn')} />
          )}
        </div>
      </div>
    )
  }

  const renderInputCheckOutDate = () => {
    const focused = focusedInput === 'endDate'
    return (
      <div
        className={`relative flex flex-1 ${fieldClassName} flex-shrink-0 items-center space-x-3 cursor-pointer ${
          focused ? 'shadow-2xl rounded-full dark:bg-neutral-800' : ' '
        }`}
        onClick={() => handleDateFocusChange('endDate')}
      >
        {!compact && (
          <div className="text-neutral-300 dark:text-neutral-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="nc-icon-field"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        <div className="flex-grow">
          <span className="block xl:text-lg font-semibold">
            {stateDate.endDate
              ? stateDate.endDate.format('DD MMM')
              : 'End Date'}
          </span>
          <span
            className={`block mt-1 text-sm text-neutral-400 leading-none font-light whitespace-nowrap
            ${!compact ? ' text-sm' : ' text-xs'}`}
          >
            {stateDate.endDate ? 'End Date' : `Add date`}
          </span>
          {stateDate.endDate && (focused || compact) && (
            <ClearDataButton onClick={() => handleClearData('checkOut')} />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex-shrink-0 flex z-10 [ lg:nc-flex-2 ] ">
      <div className="absolute inset-x-0 bottom-0">
        <div className="nc-SetYourAvailabilityData">
          <DateRangePicker
            startDate={stateDate.startDate}
            endDate={stateDate.endDate}
            focusedInput={focusedInput}
            onDatesChange={date => setStateDate(date)}
            onFocusChange={handleDateFocusChange}
            numberOfMonths={
              numberOfMonths || (windowSize.width <= 1024 ? 1 : undefined)
            }
            startDateId={'nc-hero-stay-startDateId'}
            endDateId={'nc-hero-stay-endDateId'}
            daySize={windowSize.width > 500 ? 56 : undefined}
            orientation={'horizontal'}
            showClearDates
            noBorder
            keepOpenOnDateSelect
            hideKeyboardShortcutsPanel
            anchorDirection={anchorDirection}
            isDayBlocked={day1 =>
              disableDates
                ? disableDates?.some(day2 => isSameDay(day1, day2))
                : false
            }
          />
        </div>
      </div>

      <div
        className={`flex flex-col lg:flex-row lg:items-center w-full flex-shrink-0 relative  ${wrapClassName}`}
      >
        {renderInputCheckInDate()}

        {renderInputCheckOutDate()}
      </div>
    </div>
  )
}

export default DatesRangeInput
