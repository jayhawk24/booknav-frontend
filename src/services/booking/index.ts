import { UserType } from 'hooks/useUser'
import { Naav, Price } from 'services/addBoat'
import requestClient from 'services/requestClient'

type BookingPayload = {
  naav: string
  rideType: keyof Price
  guests: number
  startTime: string
}

export interface Booking {
  _id: string
  user: UserType
  naav: Naav
  rideType: string
  guests: number
  amount: number
  startTime: string
  endTime: string
  __v: number
}

export const addBooking = async (payload: BookingPayload) => {
  const { data } = await requestClient.post('/booking/', payload)
  return data
}

export const getBookings = async (query?: {
  startTime?: string
}): Promise<Booking[]> => {
  const queryParams = new URLSearchParams(query)
  const { data } = await requestClient.get(`/booking/?${queryParams}`)
  return data
}
