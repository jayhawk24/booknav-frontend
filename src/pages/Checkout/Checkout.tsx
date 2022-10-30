import React, { FC, ReactNode, useState } from 'react'
import { PencilAltIcon } from '@heroicons/react/outline'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import NcImage from 'components/shared/NcImage'
import StartRating from 'components/StarRating/StarRating'
import moment, { Moment } from 'moment'
import GuestsInput from 'components/HeroSearchForm/GuestsInput'
import { useHistory, useParams } from 'react-router-dom'
import useNaav from 'hooks/useNaav'
import averageRating from 'utils/averageRating'
import { Price } from 'services/addBoat'
import toast from 'react-hot-toast'
import {
  addBooking,
  Order,
  RazorpayResponse,
  verifyPayment,
} from 'services/booking'
import useUser from 'hooks/useUser'
import { useQuery, useQueryClient } from 'react-query'
import { getTax } from 'services/tax'
import RideType from 'components/RIdeType/RideType'

export interface CheckOutPageProps {
  className?: string
  renderModalSelectDate?: (
    renderProp: (p: {
      defaultValue?: moment.Moment | null
      openModal: () => void
    }) => React.ReactNode,
  ) => JSX.Element
  date?: Moment | null
  time?: number
  selctedPriceType?: keyof Price
}

const CheckOutPage: FC<CheckOutPageProps> = ({
  className = '',
  renderModalSelectDate,
  date,
  time,
  selctedPriceType = 'ghatToGhat',
}) => {
  const [guests, setGuests] = useState(2)
  const [priceType, setPriceType] = useState(selctedPriceType)

  const { data: user } = useUser()
  const { naavId } = useParams<{ naavId: string }>()
  const { data: naav } = useNaav({ naavId })
  const { data: tax } = useQuery('getTax', getTax)
  const serviceCharge =
    ((naav?.price?.[priceType] || 0) * (tax?.[0].serviceChargePercent || 0)) /
    100
  const [isLoading, setIsLoading] = useState(false)

  const queryClient = useQueryClient()
  const history = useHistory()

  const initPayment = (data: Order) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: 'INR',
      name: naav?.title,
      description: `Booking on ${naav?.ghat?.title}`,
      image: 'https://app.booknaav.com/icon-192x192.png',
      order_id: data.id,
      handler: function (response: RazorpayResponse) {
        toast
          .promise(
            verifyPayment({
              ...response,
              naav: naavId,
              rideType: priceType,
              startTime:
                moment(date).startOf('day').add(time, 'hours').format() || '',
              guests,
              amount: data.amount,
            }),
            {
              loading: 'Verifying Payment',
              success: 'Booking completed',
              error: 'Payment Failed',
            },
          )
          .then(response => {
            queryClient.invalidateQueries('bookings')
            history.push(`/booking/${response.booking._id}`)
          })
      },
      theme: {
        color: '#3730a3',
      },
      prefill: {
        name: user?.title,
        contact: user?.phone,
      },
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rzp1 = new (window as any).Razorpay(options)
    rzp1.open()
  }

  const handleBook = () => {
    setIsLoading(true)
    toast
      .promise(
        addBooking({
          naav: naavId,
          rideType: priceType,
          startTime:
            moment(date).startOf('day').add(time, 'hours').format() || '',
          guests,
        }),
        {
          loading: 'Booking...',
          success: 'Redirecting...',
          error: error => error.response.data.message,
        },
      )
      .then(response => initPayment(response))
      .finally(() => setIsLoading(false))
  }

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-6 p-2 xl:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center ">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <NcImage src={naav?.pictures?.[0]} />
            </div>
          </div>
          <div className=" hidden py-5 sm:px-5 space-y-3">
            <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                {naav?.title}
              </span>
              <span className="text-base font-medium mt-1 block">
                {naav?.boatType?.title}
              </span>
            </div>
            <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
              {naav?.ghat?.title} · {guests} guests
            </span>
            <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
            <StartRating
              reviewCount={naav?.reviews?.length}
              point={averageRating(naav?.reviews)}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-semibold">Price detail</h3>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>₹{naav?.price?.[priceType]} x 1 ride</span>
            <span>₹{naav?.price?.[priceType]}</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Service charge ({tax?.[0].serviceChargePercent}%)</span>
            <span>₹ {serviceCharge}</span>
          </div>
          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{(naav?.price?.[priceType] || 0) + serviceCharge}</span>
          </div>
        </div>
      </div>
    )
  }

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-4 px-0 sm:p-6 xl:p-8 dark:text-neutral-200">
        <h2 className="text-2xl font-semibold">Confirm and Payment</h2>
        <div>
          {renderSidebar()}
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
            {renderModalSelectDate &&
              renderModalSelectDate(({ openModal }) => (
                <button
                  onClick={openModal}
                  className="text-left flex-1 p-5 flex justify-between space-x-5 "
                  type="button"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">Date</span>
                    <span className="mt-1.5 text-lg font-semibold">
                      {moment(date).format('MMM DD, YYYY')}
                      <span>
                        {' '}
                        {moment()
                          .startOf('day')
                          .add(time, 'hours')
                          .format('LT')}
                      </span>
                    </span>
                  </div>
                  <PencilAltIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </button>
              ))}
            <div className="flex justify-between py-2 divide-x-2">
              <GuestsInput
                className="nc-ListingStayDetailPage__guestsInput flex-1"
                defaultValue={guests}
                onChange={setGuests}
                hasButtonSubmit={false}
                maxGuests={naav?.capacity}
              />
              {/* <div className="mr-1 my-1 sm:mr-4 border border-neutral-200 dark:border-neutral-700 rounded-xl flex items-center"> */}
              <RideType priceType={priceType} setPriceType={setPriceType} />
              {/* </div> */}
            </div>
          </div>
        </div>

        <ButtonPrimary loading={isLoading} onClick={handleBook}>
          Confirm and Pay
        </ButtonPrimary>
      </div>
    )
  }

  return (
    <div className={`nc-CheckOutPage ${className}`} data-nc-id="CheckOutPage">
      <main className="container mt-2 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        {/* <div className="hidden lg:block flex-grow">{renderSidebar()}</div> */}
      </main>
    </div>
  )
}

export default CheckOutPage
