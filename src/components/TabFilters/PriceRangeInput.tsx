import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { FC } from 'react'
import Slider from 'rc-slider'
import convertNumbThousand from 'utils/convertNumbThousand'
import useSearchParams from 'hooks/useSearchParams'
import ButtonThird from 'components/shared/Buttons/ButtonThird'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'

export interface PriceRangeInputProps {
  rangePrices: number[]
  setRangePrices: (rangePrices: number[]) => void
  fieldClassName?: string
  renderXClear: () => void
  applyFilter: (type: string, clear?: boolean) => void
}

const PriceRangeInput: FC<PriceRangeInputProps> = ({
  rangePrices,
  setRangePrices,
  renderXClear,
  applyFilter,
}) => {
  const handleChange = (_input: number | number[]) => {
    const input = _input as number[]
    setRangePrices(input)
  }
  const searchParams = useSearchParams()

  const activeFilter =
    'flex items-center w-64 justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none'
  const inActiveFilter =
    'flex items-center w-64 justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none'

  return (
    <Popover className="flex relative [ nc-flex-1 ]">
      {({ close }) => (
        <>
          <Popover.Button
            className={
              searchParams.get('price') ? activeFilter : inActiveFilter
            }
          >
            <span>
              {`₹${convertNumbThousand(
                rangePrices[0],
              )} - ₹${convertNumbThousand(rangePrices[1])}`}
            </span>
            {renderXClear()}
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
            <Popover.Panel className="absolute left-0 lg:right-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
              <div className="relative flex flex-col space-y-8">
                <div className="space-y-5">
                  <span className="font-medium">Range Price</span>
                  <Slider
                    range
                    className="text-red-400"
                    min={500}
                    max={10000}
                    defaultValue={[rangePrices[0], rangePrices[1]]}
                    allowCross={false}
                    step={100}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-between space-x-3">
                  <div>
                    <label
                      htmlFor="minPrice"
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                    >
                      Min price
                    </label>
                    <div className="mt-1 relative rounded-md">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-neutral-500 sm:text-sm">₹</span>
                      </div>
                      <input
                        type="text"
                        disabled
                        name="minPrice"
                        id="minPrice"
                        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                        value={convertNumbThousand(rangePrices[0])}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="maxPrice"
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                    >
                      Max price
                    </label>
                    <div className="mt-1 relative rounded-md">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-neutral-500 sm:text-sm">₹</span>
                      </div>
                      <input
                        disabled
                        type="text"
                        name="maxPrice"
                        id="maxPrice"
                        className="focus:ring-primary-500 focus:border-priring-primary-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                        value={convertNumbThousand(rangePrices[1])}
                      />
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                  <ButtonThird
                    sizeClass="px-4 py-2 sm:px-5"
                    onClick={() => {
                      applyFilter('price', true)
                      close()
                    }}
                  >
                    Clear
                  </ButtonThird>
                  <ButtonPrimary
                    sizeClass="px-4 py-2 sm:px-5"
                    onClick={() => {
                      applyFilter('price')
                      close()
                    }}
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

export default PriceRangeInput
