import { Price } from 'services/addBoat'
import requestClient from 'services/requestClient'

type BookingPayload = {
  naav: string
  rideType: keyof Price
  guests: number
  startTime: string
}

export const addBooking = async (payload: BookingPayload) => {
  const { data } = await requestClient.post('/booking/', payload)
  return data
}
