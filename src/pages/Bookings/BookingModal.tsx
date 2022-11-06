import { PhoneIcon } from '@heroicons/react/solid'
import BookingCard from 'components/BookingCard/BookingCard'
import Badge from 'components/shared/Badge'
import NcImage from 'components/shared/NcImage'
import StarRating from 'components/StarRating'
import useUser from 'hooks/useUser'
import moment from 'moment'
import React from 'react'
import { Booking } from 'services/booking'
import averageRating from 'utils/averageRating'

type Props = {
  booking?: Booking
  closeModal?: () => void
}

const BookingModal = ({ booking, closeModal }: Props) => {
  const { data: user } = useUser()

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-2 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="font-semibold text-2xl">
          {booking?.naav.boatType?.title}
        </h2>
        <div>
          <Badge name={booking?.status || ''} className="text-center" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <NcImage src={booking?.naav?.pictures?.[0] || ''} />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-2 mx-2">
            <div>
              {/* <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                Naav in {booking?.naav.ghat?.title}
              </span> */}
              <span className="text-base font-medium mt-1 block">
                {booking?.naav?.title}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
                <div className="flex w-full justify-around">
                  {user?.role === 'naavik' ? (
                    <>
                      <span>{booking?.user.title}</span>
                      <a className="flex" href={`tel:${booking?.user.phone}`}>
                        <PhoneIcon className="h-5 w-5 ml-3" />
                        {booking?.user.phone}
                      </a>
                    </>
                  ) : (
                    <>
                      {booking?.naav?.user?.title}
                      <a
                        className="flex"
                        href={`tel:${booking?.naav?.user?.phone}`}
                      >
                        <PhoneIcon className="h-5 w-5 ml-3" />
                        {booking?.naav?.user?.phone}
                      </a>
                    </>
                  )}
                </div>
              </span>

              <StarRating
                point={averageRating(booking?.naav.reviews)}
                reviewCount={booking?.naav.reviews?.length}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
          <div className="flex-1 p-5 flex space-x-4">
            <svg
              className="w-8 h-8 text-neutral-300 dark:text-neutral-6000"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.33333 8.16667V3.5M18.6667 8.16667V3.5M8.16667 12.8333H19.8333M5.83333 24.5H22.1667C23.4553 24.5 24.5 23.4553 24.5 22.1667V8.16667C24.5 6.878 23.4553 5.83333 22.1667 5.83333H5.83333C4.54467 5.83333 3.5 6.878 3.5 8.16667V22.1667C3.5 23.4553 4.54467 24.5 5.83333 24.5Z"
                stroke="#D1D5DB"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="flex flex-col">
              <span className="text-sm text-neutral-400">Date</span>
              <span className="mt-1.5 text-lg font-semibold">
                {moment(booking?.startTime).format('DD, MMM hh:mm a')}
              </span>
            </div>
          </div>
        </div>
        <div className="ml-2">
          <BookingCard
            booking={booking}
            minimal={true}
            className="relative"
            closeModal={closeModal}
          />
        </div>
      </div>
    </div>
  )
}

export default BookingModal
