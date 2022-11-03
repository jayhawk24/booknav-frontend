import moment from 'moment'
import { useMemo } from 'react'
import { Unavailability } from 'services/naav/types'

export const useUnavailableDates = (
  unavailability: Unavailability[],
): moment.Moment[] => {
  const unavailableDates: moment.Moment[] = []

  return useMemo(() => {
    unavailability.forEach(unavailable => {
      const startDate = moment(unavailable.startTime)
      const endDate = moment(unavailable.endTime)
      const diff = endDate.diff(startDate, 'days')
      for (let i = 0; i <= diff; i++) {
        unavailableDates.push(moment(startDate).add(i, 'days'))
      }
    })

    return unavailableDates
  }, [unavailability])
}

//   unavailability.map(({ startDate, endDate }) => {
//     const start = moment(startDate)
//     const end = moment(endDate)
//     const range = end.diff(start, 'days')
//     unavailableDates.push(
//       ...Array.from({ length: range + 1 }, (_, i) =>
//         moment(start).add(i, 'days'),
//       ),
//     )

//   })

//   return unavailableDates
// }
