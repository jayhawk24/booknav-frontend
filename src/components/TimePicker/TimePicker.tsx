import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { FC } from 'react'
import Slider from 'rc-slider'
import moment from 'moment'

export interface TimePicker {
  fieldClassName?: string
  time: number
  setTime: (time: number) => void
  startLabel?: string
  endLabel?: string
  min?: number
  max?: number
}

const TimePicker: FC<TimePicker> = ({
  fieldClassName = '[ nc-hero-field-padding ]',
  time,
  setTime,
  startLabel = 'Start time',
  min = 5,
  max = 23,
  children,
}) => {
  const parseTime = (num: number) => {
    return (
      ('0' + (Math.floor(num) % 24)).slice(-2) +
      ':' +
      ((num % 1) * 60 + '0').slice(0, 2)
    )
  }

  const handleChange = (_input: number | number[]) => {
    const input = _input as number
    setTime(input)
  }

  return (
    <Popover className="flex relative [ nc-flex-1 ]">
      {({ open }) => (
        <>
          <Popover.Button
            className={`flex text-left w-full flex-shrink-0 items-center ${fieldClassName} space-x-3 focus:outline-none cursor-pointer ${
              open ? 'shadow-2xl rounded-full dark:bg-neutral-800' : ''
            }`}
          >
            <div className="text-neutral-300 dark:text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex-grow">
              <span className="block xl:text-lg font-semibold truncate">
                {moment(new Date())
                  .startOf('day')
                  .add(parseTime(time), 'hours')
                  .format('LT')}
              </span>
              <span className="block mt-1 text-sm text-neutral-400 leading-none font-light ">
                Select time
              </span>
            </div>
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
            <Popover.Panel className="absolute left-10 lg:right-0 z-10 w-4/5 sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
              <div className="relative flex flex-col space-y-8">
                <div className="space-y-5">
                  <span className="font-medium">Time</span>
                  <Slider
                    className="text-red-400"
                    min={min}
                    max={max}
                    defaultValue={time}
                    allowCross={false}
                    step={1}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-between space-x-3">
                  <div>
                    <label
                      htmlFor="minHour"
                      className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                    >
                      {startLabel}
                    </label>
                    <div className="mt-1 relative rounded-md">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                      <input
                        type="text"
                        disabled
                        name="minHour"
                        id="minHour"
                        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                        value={moment(new Date())
                          .startOf('day')
                          .add(parseTime(time), 'hours')
                          .format('LT')}
                      />
                    </div>
                  </div>
                  {/* show booked time slots  */}
                </div>
                {children}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default TimePicker
