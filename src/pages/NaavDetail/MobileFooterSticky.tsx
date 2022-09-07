import { DateRange } from 'components/DatesRangeInput/DatesRangeInput'
import { GuestsObject } from 'components/GuestsInput/GuestsInput'
import ModalSelectDate from 'components/ModalSelectDate/ModalSelectDate'
import moment from 'moment'
import React, { FC, useState } from 'react'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import ModalReserveMobile from './ModalReserveMobile'
import { useParams } from 'react-router-dom'
import useNaav from 'hooks/useNaav'

type Props = {
  selectedDate?: DateRange
  selectedGuests?: GuestsObject
}

const MobileFooterSticky: FC<Props> = () => {
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(
    moment().add(1, 'days'),
  )
  const { naavId } = useParams<{ naavId: string }>()
  const { data: naav } = useNaav({ naavId })
  const [dateFocused, setDateFocused] = useState<boolean>(true)

  const [guestsState, setGuestsState] = useState<GuestsObject>({
    guestAdults: 0,
    guestChildren: 0,
    guestInfants: 0,
  })

  return (
    <div className="block lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-20">
      <div className="container flex items-center justify-between">
        <div className="">
          <span className="block text-xl font-semibold">
            {naav?.price?.ghatToGhat}
            <span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
              /ride
            </span>
          </span>
          <ModalSelectDate
            defaultValue={selectedDate}
            dateFocused={dateFocused}
            setDateValue={setSelectedDate}
            setDateFocused={setDateFocused}
            dateValue={selectedDate}
            renderChildren={({ openModal }) => (
              <span
                onClick={openModal}
                className="block text-sm underline font-medium cursor-pointer text-right"
              >
                {moment(selectedDate).format('MMM DD')}
              </span>
            )}
          />
        </div>
        <ModalReserveMobile
          defaultGuests={guestsState}
          defaultDate={selectedDate}
          onChangeDate={setSelectedDate}
          onChangeGuests={setGuestsState}
          renderChildren={({ openModal }) => (
            <ButtonPrimary
              sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
              onClick={openModal}
            >
              Reserve
            </ButtonPrimary>
          )}
        />
      </div>
    </div>
  )
}

export default MobileFooterSticky
