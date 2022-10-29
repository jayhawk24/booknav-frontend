import React, { FC, useState } from 'react'
import Avatar from 'components/shared/Avatar'
// import Badge from 'components/shared/Badge'
// import TurncateTooltip from 'components/shared/TurncateTooltip'
// import useUser from 'hooks/useUser'
// import useWindowSize from 'hooks/useWindowResize'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Booking, updateBookingStatus } from 'services/booking'
import ButtonSecondary from 'components/shared/Buttons/ButtonSecondary'
import useUser from 'hooks/useUser'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'

export interface CommentListingProps {
  className?: string
  hasListingTitle?: boolean
  booking?: Booking
  viewAsCustomer?: boolean
}

const BookingCard: FC<CommentListingProps> = ({ className = '', booking }) => {
  const { data: user } = useUser()
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleUpdateStatus = (
    e:
      | React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
      | undefined,
    status: Booking['status'],
  ) => {
    e?.stopPropagation()
    setLoading(true)

    toast
      .promise(updateBookingStatus({ bookingId: booking?._id || '', status }), {
        loading: 'Updating',
        success: 'Updated',
        error: 'Failed to update',
      })
      .then(() => {
        queryClient.invalidateQueries('bookings')
      })
      .finally(() => setLoading(false))
  }

  const isAdmin = user?.role === 'admin'
  const isNaavik = user?.role === 'naavik'
  const isCustomer = user?.role === 'user'

  const renderMobileCard = () => (
    <div
      className={`nc-CommentListing  ${className}  border border-secondary-300 dark:border-secondary-900 mb-2 rounded-xl p-5 relative`}
      data-nc-id="CommentListing"
    >
      <Link to={`/booking/${booking?._id}`} className="flex space-x-4">
        <div className="pt-0.5">
          <Avatar
            sizeClass="h-10 w-10 text-lg text-primary-700 dark:text-primary-500"
            radius="rounded-full"
            userName={
              isNaavik ? booking?.user.title : booking?.naav.user?.title
            }
            imgUrl={
              isNaavik ? booking?.user.picture : booking?.naav.user?.picture
            }
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between space-x-3">
            <div className="flex flex-col">
              <div className="text-sm font-semibold">
                <span>
                  {isNaavik ? booking?.user.title : booking?.naav.user?.title}
                </span>
              </div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                {moment(booking?.startTime).format('hh:mm A - Do MMMM')}
              </span>
            </div>
          </div>
          <span className="flex mt-3 text-neutral-6000 dark:text-neutral-300">
            <Link
              className="flex mr-2 space-x-10 justify-between p-3 bg-secondary-100 dark:bg-secondary-900 rounded-lg font-semibold"
              to={`/naav/${booking?.naav._id}/`}
            >
              {booking?.naav.title}
            </Link>
            <span className="flex items-center justify-center px-3 py-2 leading-none text-base font-medium text-secondary-500">
              {/* rupee sign */}₹{((booking?.amount || 0) / 100).toFixed(2)}
            </span>
          </span>
        </div>
      </Link>
      <div className="flex flex-col absolute z-10 right-5 top-5">
        {(isAdmin || isNaavik) && booking?.status === 'Reserved' && (
          <ButtonSecondary
            loading={loading}
            className="mb-1"
            onClick={e => handleUpdateStatus(e, 'Confirmed')}
          >
            Accept
          </ButtonSecondary>
        )}
        {isAdmin &&
          (booking?.status === 'Cancelled' ? (
            <ButtonSecondary
              loading={loading}
              className="mb-1"
              onClick={e => handleUpdateStatus(e, 'PartiallyRefunded')}
            >
              Partial Refund
            </ButtonSecondary>
          ) : (
            booking?.status === 'Declined' && (
              <ButtonSecondary
                loading={loading}
                className="mb-1"
                onClick={e => handleUpdateStatus(e, 'Refunded')}
              >
                Refund
              </ButtonSecondary>
            )
          ))}
        {(isAdmin || isCustomer) && booking?.status === 'Confirmed' && (
          <ButtonSecondary
            loading={loading}
            className="mb-1"
            onClick={e => handleUpdateStatus(e, 'Completed')}
          >
            Complete
          </ButtonSecondary>
        )}
        {booking?.status === 'Reserved' && (
          <ButtonSecondary
            loading={loading}
            onClick={e =>
              handleUpdateStatus(e, isNaavik ? 'Declined' : 'Cancelled')
            }
          >
            {isNaavik ? 'Decline' : 'Cancel'}
          </ButtonSecondary>
        )}
      </div>
    </div>
  )

  return renderMobileCard()
}

export default BookingCard
