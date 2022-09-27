import React from 'react'
import useBooking from 'hooks/useBooking'
import BookingCard from 'components/BookingCard/BookingCard'

const Bookings = () => {
  const { data: bookings } = useBooking()
  return (
    <div className={`nc-AccountPage container`}>
      <div className="space-y-6 sm:space-y-8">
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-5"></div>
        <div className="mb-10">
          {bookings?.map(booking => (
            <BookingCard booking={booking} key={booking._id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Bookings
