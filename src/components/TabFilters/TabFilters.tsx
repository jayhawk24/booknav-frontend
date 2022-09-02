import React, { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import Checkbox from 'components/shared/Checkbox/Checkbox'
import { useHistory, useLocation } from 'react-router-dom'
import useSearchParams from 'hooks/useSearchParams'
import { GhatType } from 'hooks/useGhats'
import useBoatTypes from 'hooks/useBoatTypes'
import ButtonThird from 'components/shared/Buttons/ButtonThird'
import PriceRangeInput from './PriceRangeInput'

const activeFilter =
  'flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none'
const inActiveFilter =
  'flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none'

const TabFilters = () => {
  const [price, setPrice] = useState<number[] | null>([500, 10000])

  const [ghat, setGhat] = useState<GhatType>({ _id: '', title: '' })
  const [checkedBoatTypes, setCheckedBoatTypes] = useState<
    { _id: string; title?: string; value: boolean }[]
  >([])

  const { data: boatTypes } = useBoatTypes()
  const location = useLocation()
  const history = useHistory()
  const searchParams = useSearchParams()

  useEffect(() => {
    searchParams.get('minPrice') &&
      setPrice([
        parseInt(searchParams.get('minPrice') || '0'),
        parseInt(searchParams.get('minPrice') || '10000'),
      ])
    searchParams.get('boatTypeId') &&
      setCheckedBoatTypes(
        searchParams.getAll('boatTypeId').map(item => {
          return { _id: item, value: true }
        }) || [],
      )
    searchParams.get('ghatId') &&
      setGhat({
        _id: searchParams.get('ghatId') || '',
        title: '',
      })
  }, [])

  const applyFilter = (type: string, clear?: boolean) => {
    if (type === 'boatType') {
      searchParams.delete('boatTypeId')
      checkedBoatTypes.map(boatTypeId => {
        if (boatTypeId.value)
          searchParams.append('boatTypeId', boatTypeId._id.toString())
      })
      if (clear) searchParams.delete('boatTypeId')
    }
    if (type === 'price') {
      searchParams.set('minPrice', price?.[0]?.toString() || '')
      searchParams.set('maxPrice', price?.[1]?.toString() || '')
      if (clear) {
        searchParams.delete('minPrice')
        searchParams.delete('maxPrice')
        setPrice(null)
      }
      if (price === [500, 10000]) {
        searchParams.delete('minPrice')
        searchParams.delete('maxPrice')
      }
    }
    history.push(`${location.pathname}?${searchParams.toString()}`)
  }

  const applyAllFilters = (clear?: boolean) => {
    if (clear) {
      searchParams.delete('minPrice')
      searchParams.delete('maxPrice')
      searchParams.delete('boatTypeId')
      searchParams.delete('ghatId')
      setGhat({ _id: '', title: '' })
      history.push(`${location.pathname}?${searchParams.toString()}`)
      setPrice(null)
      return
    }
    searchParams.set('minPrice', price?.[0]?.toString() || '')
    searchParams.set('maxPrice', price?.[1]?.toString() || '')
    searchParams.delete('boatTypeId')
    checkedBoatTypes.map(boatTypeId => {
      if (boatTypeId.value)
        searchParams.append('boatTypeId', boatTypeId._id.toString())
    })
    searchParams.set('ghatId', ghat._id)
    history.push(`${location.pathname}?${searchParams.toString()}`)
  }

  const renderXClear = () => {
    return (
      <span
        onClick={e => {
          e.stopPropagation()
          applyAllFilters(true)
        }}
        className="w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    )
  }

  const renderTabsTypeOfYacht = () => {
    return (
      <Popover className="relative">
        {({ close }) => (
          <>
            <Popover.Button
              className={
                searchParams.get('boatTypeId') !== null
                  ? activeFilter
                  : inActiveFilter
              }
            >
              <span>Type of Boat</span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-secondary-300 dark:border-secondary-900">
                  <div className="relative grid grid-cols-2 px-5 py-6 gap-5 ">
                    {boatTypes?.map(item => (
                      <div key={item.title} className="">
                        <Checkbox
                          name={item.title}
                          label={item.title}
                          checked={checkedBoatTypes.some(type => {
                            if (type._id === item._id) {
                              return type.value
                            }
                          })}
                          onChange={checked => {
                            const temp = [...checkedBoatTypes]
                            let found = false
                            for (let i = 0; i < temp.length; i++) {
                              if (temp[i]._id === item._id) {
                                temp[i].value = checked
                                temp[i].title = item.title
                                found = true
                                break
                              }
                            }
                            !found &&
                              temp.push({
                                _id: item._id,
                                value: checked,
                              })
                            setCheckedBoatTypes(temp)
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        setCheckedBoatTypes([])
                        applyFilter('boatType', true)
                        close()
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        applyFilter('boatType')
                        close()
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    )
  }

  return (
    <div className="flex lg:space-x-4">
      <div className="flex space-x-4">
        {renderTabsTypeOfYacht()}
        <PriceRangeInput
          rangePrices={price || [500, 10000]}
          setRangePrices={setPrice}
          renderXClear={renderXClear}
          applyFilter={applyFilter}
        />
      </div>
    </div>
  )
}

export default TabFilters
