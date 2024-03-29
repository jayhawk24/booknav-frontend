import { Dialog, Transition } from '@headlessui/react'
import moment from 'moment'
import React, { FC, Fragment, RefObject, useState } from 'react'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import { XIcon } from '@heroicons/react/solid'
import DateSingleInput from 'components/shared/DateSingleInput/DateSingleInput'
import TimePicker from 'components/TimePicker'
import { useQuery } from 'react-query'
import { getBookings } from 'services/booking'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import RideType from 'components/RIdeType/RideType'
import { Price } from 'services/addBoat'
import { useUnavailableDates } from 'hooks/useUnavailableDates'
import { useParams } from 'react-router-dom'
import { getUnavailability } from 'services/naav'

interface ModalSelectDateProps {
  onClose?: () => void
  defaultValue: moment.Moment | null
  renderChildren?: (p: {
    defaultValue?: moment.Moment | null
    openModal: () => void
  }) => React.ReactNode
  dateFocused: boolean
  setDateFocused: (focused: boolean) => void
  dateValue: moment.Moment | null
  setDateValue: (date: moment.Moment | null) => void
  time: number
  setTime: (time: number) => void
  priceType: keyof Price
  setPriceType: (priceType: keyof Price) => void
}

const ModalSelectDate: FC<ModalSelectDateProps> = ({
  defaultValue,
  dateValue,
  setDateValue,
  dateFocused,
  setDateFocused,
  renderChildren,
  time,
  setTime,
  priceType,
  setPriceType,
}) => {
  const [showModal, setShowModal] = useState(false)
  // FOR RESET ALL DATA WHEN CLICK CLEAR BUTTON
  //

  const [animateRef] = useAutoAnimate()

  const { data: bookings } = useQuery(
    ['getBookings', dateValue],
    () => getBookings({ startTime: dateValue?.startOf('day').toISOString() }),
    { staleTime: 24 * 60 * 60 * 1000 },
  )
  const { naavId } = useParams<{ naavId: string }>()
  const { data: unavailability } = useQuery(['unavailability', naavId], () =>
    getUnavailability(naavId),
  )
  const disabledDates = useUnavailableDates(unavailability || [])

  function closeModal() {
    setShowModal(false)
  }
  function openModal() {
    setShowModal(true)
  }
  const renderButtonOpenModal = () => {
    return renderChildren ? (
      renderChildren({ defaultValue, openModal })
    ) : (
      <button onClick={openModal}>Select Date</button>
    )
  }

  const renderCalendarInfo = () => {
    if (!bookings || bookings?.length === 0) return null
    return (
      <div className="px-4 pb-4">
        <div className="w-full flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-6 p-2">
          <h3 className="text-sm font-semibold">
            Booked slots for {dateValue?.format('DD MMMM YYYY')}
          </h3>
          <div className="flex flex-col space-y-2">
            {bookings?.map(booking => (
              <div className="flex flex-row" key={booking._id}>
                <span className="text-sm">
                  {moment(booking.startTime).format('hh:mm A')}
                </span>
                -
                <span className="text-sm">
                  {moment(booking.endTime).format('hh:mm A')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {renderButtonOpenModal()}
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="HeroSearchFormMobile__Dialog relative z-50"
          onClose={closeModal}
        >
          <div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
            <div className="flex h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out transition-transform duration-200"
                enterFrom="opacity-0 translate-y-52"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in transition-transform duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-52"
              >
                <Dialog.Panel className="relative h-full overflow-hidden flex-1 flex flex-col justify-between ">
                  <>
                    <div className="absolute left-4 top-4">
                      <button
                        className="focus:outline-none focus:ring-0"
                        onClick={closeModal}
                      >
                        <XIcon className="w-5 h-5 text-black dark:text-white" />
                      </button>
                    </div>
                    <div
                      ref={animateRef as RefObject<HTMLDivElement>}
                      className="pt-12 p-1 flex flex-col dark:text-neutral-200"
                    >
                      <div className="p-5 ">
                        <span className="block font-semibold text-xl sm:text-2xl">
                          When&apos;s your trip?
                        </span>
                      </div>
                      <DateSingleInput
                        defaultValue={dateValue}
                        onChange={(date: moment.Moment | null) =>
                          setDateValue(date)
                        }
                        defaultFocus={dateFocused}
                        onFocusChange={(focus: boolean) => {
                          setDateFocused(focus)
                        }}
                        renderCalendarInfo={renderCalendarInfo}
                        disableDates={disabledDates}
                      />
                      <TimePicker time={time} setTime={setTime} />
                      <RideType
                        priceType={priceType}
                        setPriceType={setPriceType}
                      />
                    </div>

                    <div className="px-4 py-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 flex justify-between dark:text-neutral-200">
                      <button
                        type="button"
                        className="underline font-semibold flex-shrink-0"
                        onClick={() => setDateValue(moment().add(1, 'days'))}
                      >
                        Clear dates
                      </button>
                      <ButtonPrimary
                        sizeClass="px-6 py-3 !rounded-xl"
                        onClick={() => {
                          closeModal()
                        }}
                      >
                        Save
                      </ButtonPrimary>
                    </div>
                  </>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ModalSelectDate
