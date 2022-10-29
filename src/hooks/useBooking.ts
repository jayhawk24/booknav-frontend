import { useQuery } from 'react-query'
import { getBookings } from 'services/booking'

export default function useBooking(query?: { startTime?: string }) {
  const { data, ...rest } = useQuery(
    ['bookings', query],
    () => getBookings(query),
    // {
    //   staleTime: Infinity,
    // }
  )
  return {
    data,
    ...rest,
  }
}
