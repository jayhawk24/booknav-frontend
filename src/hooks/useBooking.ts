import { useQuery } from 'react-query'
import { getBookings } from 'services/booking'

export default function useBooking(query?: { startTime?: string }) {
  const { data, ...rest } = useQuery(
    ['getNaav', query],
    () => getBookings(query),
    { staleTime: 60 * 60 * 1000 * 24 },
  )
  return {
    data,
    ...rest,
  }
}
