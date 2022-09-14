import React, { FC } from 'react'
import Avatar from 'components/shared/Avatar'
// import Badge from 'components/shared/Badge'
// import TurncateTooltip from 'components/shared/TurncateTooltip'
// import useUser from 'hooks/useUser'
// import useWindowSize from 'hooks/useWindowResize'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Booking } from 'services/booking'
import ButtonSecondary from 'components/shared/Buttons/ButtonSecondary'
import useUser from 'hooks/useUser'

export interface CommentListingProps {
  className?: string
  hasListingTitle?: boolean
  booking?: Booking
  viewAsCustomer?: boolean
  isHourly?: boolean
}

// const dateFormat = (date?: string) => {
//   if (!date) {
//     return ''
//   }
//   return moment(date).format('MMMM Do, YYYY')
// }

const BookingCard: FC<CommentListingProps> = ({
  className = '',
  booking,
  isHourly = true,
}) => {
  const { data: user } = useUser()
  const renderMobileCard = () => (
    <div
      className={`nc-CommentListing flex space-x-4 ${className}  border border-secondary-300 dark:border-secondary-900 mb-2 rounded-xl p-5`}
      data-nc-id="CommentListing"
    >
      <div className="pt-0.5">
        <Avatar
          sizeClass="h-10 w-10 text-lg text-primary-700 dark:text-primary-500"
          radius="rounded-full"
          userName={booking?.user?.title}
          imgUrl={booking?.user?.picture || ''}
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between space-x-3">
          <div className="flex flex-col">
            <div className="text-sm font-semibold">
              <span>{booking?.user?.title}</span>
            </div>
            <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              {moment(booking?.startTime).format('hh:mm A - Do MMMM')}
            </span>
          </div>
          <div className="flex flex-col">
            {(user?.role === 'admin' || user?.role === 'naavik') && (
              <ButtonSecondary className="mb-1">Accept</ButtonSecondary>
            )}
            <ButtonSecondary>Decline</ButtonSecondary>
          </div>
        </div>
        <span className="flex mt-3 text-neutral-6000 dark:text-neutral-300">
          <Link
            className="flex mr-2 space-x-10 justify-between p-3 bg-secondary-100 dark:bg-secondary-900 rounded-lg font-semibold"
            to={`/yacht/${booking?.naav._id}/`}
          >
            {booking?.naav.title}
          </Link>
          <span className="flex items-center justify-center px-3 py-2 leading-none text-base font-medium text-secondary-500">
            {/* rupee sign */}₹{((booking?.amount || 0) / 100).toFixed(2)}
          </span>
        </span>
      </div>
    </div>
  )

  //   const renderBadges = () => {
  //     return (
  //       <div className="flex space-x-4 ml-5 mb-5 flex-wrap space-y-2">
  //         <Badge
  //           className="flex items-center"
  //           color="red"
  //           name={'#' + booking?.naav.title}
  //         />
  //         <Badge
  //           color="blue"
  //           name={'Booking Status: ' + booking?.status}
  //           //   bookingStatusId={booking?.booking_status.id || 1}
  //         />
  //         <Badge
  //           color="yellow"
  //           name={'Booking Date: ' + dateFormat(booking?.startTime) || ''}
  //         />
  //         <Badge
  //           color="yellow"
  //           name={
  //             (isHourly &&
  //               'Start Time: ' + booking?.startTime?.substring(0, 5)) ||
  //             ''
  //           }
  //         />
  //         <Badge
  //           color="yellow"
  //           name={
  //             (isHourly && 'End Time: ' + booking?.endTime?.substring(0, 5)) || ''
  //           }
  //         />
  //       </div>
  //     )
  //   }

  return (
    <Link to={`/booking/${booking?._id}/?type=${isHourly ? 'hourly' : 'days'}`}>
      {renderMobileCard()}
    </Link>
  )
}

export default BookingCard
