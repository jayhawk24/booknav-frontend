import React, { Fragment, useEffect, useState } from 'react'
import useBooking from 'hooks/useBooking'
import BookingCard from 'components/BookingCard/BookingCard'
import { Tab } from '@headlessui/react'
import moment from 'moment'
import NcModal from 'components/shared/NcModal/NcModal'
import { Booking } from 'services/booking'
import BookingModal from './BookingModal'
import { Loader } from 'components/FallbackComponent/FallbackComponent'

const Bookings = () => {
  const [query, setQuery] = useState<{ startTime?: string; endTime?: string }>({
    startTime: moment().format('YYYY/MM/DD'),
  })
  const { data: bookings, isLoading } = useBooking(query)
  const [openModal, setOpenModal] = useState(false)
  const [modalBooking, setModalBooking] = useState<Booking | undefined>(
    undefined,
  )

  useEffect(() => {
    if (
      bookings?.some(booking => {
        if (booking.status === 'Reserved') {
          setModalBooking(booking)
          return true
        }
        return false
      })
    ) {
      setOpenModal(true)
    }
  }, [bookings])

  return (
    <div className={`nc-AccountPage container`}>
      <div className="space-y-6 sm:space-y-8">
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-5"></div>
        <div className="mb-10">
          <Tab.Group>
            <Tab.List className="flex">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${
                      selected
                        ? 'bg-neutral-800 text-white'
                        : 'text-neutral-6000 dark:text-neutral-400'
                    }`}
                    onClick={() =>
                      setQuery({
                        startTime: moment().format('YYYY/MM/DD'),
                      })
                    }
                  >
                    Upcoming
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                      selected
                        ? 'bg-neutral-800 text-white'
                        : ' text-neutral-6000 dark:text-neutral-400'
                    }`}
                    onClick={() =>
                      setQuery({
                        endTime: moment().format('YYYY/MM/DD'),
                      })
                    }
                  >
                    <span className="mr-2.5">Past</span>
                  </button>
                )}
              </Tab>
            </Tab.List>
            <div className="w-14 border-b border-neutral-200 my-5"></div>
            {isLoading && (
              <div className="h-80 flex justify-center items-center">
                <Loader />
              </div>
            )}
            <Tab.Panels>
              <Tab.Panel className="space-y-5">
                {bookings?.map(booking => (
                  <BookingCard booking={booking} key={booking._id} />
                ))}
              </Tab.Panel>
              <Tab.Panel className="space-y-5">
                {bookings?.map(booking => (
                  <BookingCard booking={booking} key={booking._id} />
                ))}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          {bookings?.length === 0 && (
            <div className="flex flex-col h-full justify-center text-center">
              <h1 className="text-2xl font-semibold">No bookings yet</h1>
              <p className="text-neutral-500 dark:text-neutral-400 mt-2">
                You have no bookings yet. When you do, they will show up here.
              </p>
            </div>
          )}
        </div>

        <NcModal
          modalTitle="New Booking"
          isOpenProp={openModal}
          onCloseModal={() => setOpenModal(false)}
          renderTrigger={() => <></>}
          renderContent={() => (
            <BookingModal
              booking={modalBooking}
              closeModal={() => setOpenModal(false)}
            />
          )}
        />
      </div>
    </div>
  )
}

export default Bookings
