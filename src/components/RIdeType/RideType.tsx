import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import React, { Fragment } from 'react'
import { Price } from 'services/addBoat'

type Props = {
  priceType: keyof Price
  setPriceType: (priceType: keyof Price) => void
}

const RideType = ({ priceType, setPriceType }: Props) => {
  const priceTypes = ['ghatToGhat', 'crossRiver']

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`
${open ? '' : ''}
px-4 py-4 inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
            onClick={() => document.querySelector('html')?.click()}
          >
            <span className="text-neutral-400 font-normal">Ride Type</span>
            <span className="font-semibold text-base ml-2">
              {`${priceType === 'ghatToGhat' ? 'Ghat To Ghat' : 'Cross River'}`}
            </span>
            <ChevronDownIcon
              className={`${
                open ? '' : 'text-opacity-70'
              } ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
              aria-hidden="true"
            />
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
            <Popover.Panel className="absolute z-10 w-screen max-w-[200px] sm:max-w-[220px] px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 ">
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 ">
                <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7 ">
                  {priceTypes?.map(item => (
                    <div
                      key={item}
                      onClick={e => {
                        e.preventDefault()
                        setPriceType(item as keyof Price)
                        close()
                      }}
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <p className="text-sm font-medium ">
                        {item === 'ghatToGhat' ? 'Ghat to Ghat' : 'Cross River'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default RideType
