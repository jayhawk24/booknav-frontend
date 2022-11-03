import 'react-dates/initialize'
import { DayPickerSingleDateController, isSameDay } from 'react-dates'
import useWindowSize from 'hooks/useWindowResize'
import moment from 'moment'
import { Unavailability } from 'services/naav/types'
import { useUnavailableDates } from 'hooks/useUnavailableDates'

interface Props {
  unavailability?: Unavailability[]
}

const AvailableDates = ({ unavailability }: Props) => {
  const selectedDays = useUnavailableDates(unavailability || [])
  const windowSize = useWindowSize()

  const getDaySize = () => {
    if (windowSize.width <= 375) {
      return 34
    }
    if (windowSize.width <= 500) {
      return undefined
    }
    if (windowSize.width <= 1280) {
      return 56
    }
    return 48
  }

  return (
    <div className="nc-SetYourAvailabilityData">
      <DayPickerSingleDateController
        initialVisibleMonth={() => moment()}
        onDateChange={console.log}
        focused={true}
        onFocusChange={console.log}
        date={null}
        isDayHighlighted={day1 =>
          selectedDays.some(day2 => isSameDay(day1, day2))
        }
        daySize={getDaySize()}
        numberOfMonths={windowSize.width < 1280 ? 1 : 2}
        keepOpenOnDateSelect
        hideKeyboardShortcutsPanel
      />
    </div>
  )
}
export default AvailableDates
