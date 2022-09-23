import { UserType } from 'hooks/useUser'
import { GenericResponseType } from 'services/account'
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
  status: string
  createdAt: string
  __v: number
}

export interface Order {
  id: string
  entity: string
  amount: number
  amount_paid: number
  amount_due: number
  currency: string
  receipt: string
  status: string
  attempts: number
  notes?: null[] | null
  created_at: number
}

export interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

export interface RazorpayBody extends RazorpayResponse {
  naav: string
  rideType: keyof Price
  guests: number
  startTime: string
  amount: number
}

export const addBooking = async (payload: BookingPayload): Promise<Order> => {
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

export const verifyPayment = async (
  payload: RazorpayBody,
): Promise<GenericResponseType> => {
  return requestClient.post('/booking/verify', payload)
}

export const getBooking = async (bookingId: string): Promise<Booking> => {
  const { data } = await requestClient.get(`/booking/${bookingId}`)
  return data
}
