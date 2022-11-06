import React, { FC, useRef, useState } from 'react'
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
import NcModal from 'components/shared/NcModal/NcModal'

export interface CommentListingProps {
  className?: string
  booking?: Booking
  minimal?: boolean
  closeModal?: () => void
}

const BookingCard: FC<CommentListingProps> = ({
  className = '',
  booking,
  minimal = false,
  closeModal,
}) => {
  const { data: user } = useUser()
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const status = useRef<Booking['status']>('Reserved')

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
        closeModal && closeModal()
        setShowModal(false)
      })
      .finally(() => setLoading(false))
  }

  const isAdmin = user?.role === 'admin'
  const isNaavik = user?.role === 'naavik'

  const isCustomer = user?.role === 'user'

  const renderModal = (status: Booking['status']) => {
    return (
      <div className="flex items-center justify-between">
        <h3>Are you sure?</h3>
        <div>
          <ButtonSecondary
            className="mr-3"
            onClick={e => handleUpdateStatus(e, status)}
            loading={loading}
          >
            Yes
          </ButtonSecondary>
          <ButtonSecondary
            onClick={() => {
              setShowModal(false)
              closeModal && closeModal()
            }}
          >
            No
          </ButtonSecondary>
        </div>
      </div>
    )
  }

  const statusUpdate = (bookingStatus: Booking['status']) => {
    setShowModal(true)
    status.current = bookingStatus
  }

  const renderButtons = () => (
    <div>
      <NcModal
        onCloseModal={() => setShowModal(false)}
        isOpenProp={showModal}
        modalTitle={'Booking Status'}
        renderContent={() => renderModal(status.current)}
        renderTrigger={() => <></>}
      />

      <div className={`flex flex-col mt-4 ${className}`}>
        {(isAdmin || isNaavik) && booking?.status === 'Reserved' && (
          <ButtonSecondary
            loading={loading}
            className="mb-1 px-2 text-xs"
            onClick={() => statusUpdate('Confirmed')}
          >
            Accept
          </ButtonSecondary>
        )}
        {isAdmin &&
          (booking?.status === 'Cancelled' ? (
            <ButtonSecondary
              loading={loading}
              className="mb-1 px-2 text-xs"
              onClick={() => statusUpdate('PartiallyRefunded')}
            >
              Partial Refund
            </ButtonSecondary>
          ) : (
            booking?.status === 'Declined' && (
              <ButtonSecondary
                loading={loading}
                className="mb-1 px-2 text-xs"
                onClick={() => statusUpdate('Refunded')}
              >
                Refund
              </ButtonSecondary>
            )
          ))}
        {(isAdmin || isCustomer) && booking?.status === 'Confirmed' && (
          <ButtonSecondary
            loading={loading}
            className="mb-1 px-2 text-xs"
            onClick={() => statusUpdate('Completed')}
          >
            Complete
          </ButtonSecondary>
        )}
        {booking?.status === 'Reserved' && (
          <ButtonSecondary
            loading={loading}
            onClick={() => statusUpdate(isNaavik ? 'Declined' : 'Cancelled')}
          >
            {isNaavik ? 'Decline' : 'Cancel'}
          </ButtonSecondary>
        )}
      </div>
    </div>
  )

  const renderMobileCard = () => (
    <div
      className={`nc-CommentListing  ${className}  border border-secondary-300 dark:border-secondary-900 mb-2 rounded-xl p-2 relative`}
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
              className="flex mr-2 space-x-10 justify-between p-2 bg-secondary-100 dark:bg-secondary-900 rounded-lg font-semibold"
              to={`/naav/${booking?.naav._id}/`}
            >
              {booking?.naav.title}
            </Link>
            <span className="flex items-center justify-center px-3 py-2 leading-none text-base font-medium text-secondary-500">
              ₹{((booking?.amount || 0) / 100).toFixed(2)}
            </span>
          </span>
        </div>
      </Link>

      {renderButtons()}
    </div>
  )

  return minimal ? renderButtons() : renderMobileCard()
}

export default BookingCard
