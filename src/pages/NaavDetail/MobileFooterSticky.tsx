import { DateRange } from 'components/DatesRangeInput/DatesRangeInput'
import { GuestsObject } from 'components/GuestsInput/GuestsInput'
import ModalSelectDate from 'components/ModalSelectDate/ModalSelectDate'
import moment from 'moment'
import React, { FC, useState } from 'react'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import ModalReserveMobile from './ModalReserveMobile'
import { useHistory, useParams } from 'react-router-dom'
import useNaav from 'hooks/useNaav'
import { Price } from 'services/addBoat'
import useUser from 'hooks/useUser'

type Props = {
  selectedDate?: DateRange
  selectedGuests?: GuestsObject
  buttonOnly?: boolean
}

const MobileFooterSticky: FC<Props> = ({ buttonOnly }) => {
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(
    moment().add(1, 'days'),
  )
  const history = useHistory()
  const { naavId } = useParams<{ naavId: string }>()
  const { data: naav } = useNaav({ naavId })
  const { data: user } = useUser()

  const [dateFocused, setDateFocused] = useState<boolean>(false)
  const [time, setTime] = useState(
    moment().hour() + 1 < 5 ? 5 : moment().hour() + 1,
  )
  const [priceType, setPriceType] = useState<keyof Price>('ghatToGhat')

  const [guestsState, setGuestsState] = useState<GuestsObject>({
    guestAdults: 0,
    guestChildren: 0,
    guestInfants: 0,
  })

  const handleBook = (openModal: () => void) => {
    if (!user) {
      history.push('/login')
    } else openModal()
  }

  const renderModalSelectDate = (
    renderProp: (p: {
      defaultValue?: moment.Moment | null
      openModal: () => void
    }) => React.ReactNode,
  ) => (
    <ModalSelectDate
      defaultValue={selectedDate}
      dateFocused={dateFocused}
      setDateValue={setSelectedDate}
      setDateFocused={setDateFocused}
      dateValue={selectedDate}
      time={time}
      setTime={setTime}
      renderChildren={renderProp}
      priceType={priceType}
      setPriceType={setPriceType}
    />
  )

  if (buttonOnly) {
    return (
      <ModalReserveMobile
        defaultGuests={guestsState}
        defaultDate={selectedDate}
        onChangeDate={setSelectedDate}
        onChangeGuests={setGuestsState}
        time={time}
        renderModalSelectDate={renderModalSelectDate}
        renderChildren={({ openModal }) => (
          <ButtonPrimary
            sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
            onClick={() => handleBook(openModal)}
          >
            Book
          </ButtonPrimary>
        )}
      />
    )
  }

  return (
    <div className="block fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-20">
      <div className="container flex items-center justify-between">
        <div>
          <span className="block text-xl font-semibold">
            {naav?.price?.ghatToGhat}
            <span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
              /ride
            </span>
          </span>
          {renderModalSelectDate(({ openModal }) => (
            <span
              onClick={openModal}
              className="block text-sm underline font-medium cursor-pointer text-right"
            >
              {moment(selectedDate).format('MMM DD')}
              <span>
                {' '}
                {moment().startOf('day').add(time, 'hours').format('LT')}
              </span>
            </span>
          ))}
        </div>
        <ModalReserveMobile
          defaultGuests={guestsState}
          defaultDate={selectedDate}
          onChangeDate={setSelectedDate}
          onChangeGuests={setGuestsState}
          time={time}
          renderModalSelectDate={renderModalSelectDate}
          selectedPriceType={priceType}
          renderChildren={({ openModal }) => (
            <ButtonPrimary
              sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
              onClick={() => handleBook(openModal)}
            >
              Book
            </ButtonPrimary>
          )}
        />
      </div>
    </div>
  )
}

export default MobileFooterSticky
