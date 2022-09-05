import { DateRange } from 'components/DatesRangeInput/DatesRangeInput'

const converSelectedDateToString = ({ startDate, endDate }: DateRange) => {
  const startDateString = startDate?.format('MMM DD')
  const endDateString =
    endDate?.get('month') !== startDate?.get('month')
      ? endDate?.format('MMM DD')
      : endDate?.format('DD')
  const dateSelectedString =
    startDateString && endDateString
      ? `${startDateString} - ${endDateString}`
      : `${startDateString || endDateString || ''}`
  return dateSelectedString
}

export default converSelectedDateToString
