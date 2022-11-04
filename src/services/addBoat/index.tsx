import { BoatType } from 'hooks/useBoatTypes'
import { UserType } from 'hooks/useUser'
import requestClient from 'services/requestClient'
export type PagedResponseType<T> = {
  data: {
    count: number
    next: string | null
    previous: string | null
    results: T[]
  }
}

export type MetaResponseType<T> = {
  data: T[]
}
export type AddMetaResponseType<T> = {
  message: string
  data: T
}
export type Location = {
  lat: number
  lng: number
}
export type Ghat = {
  _id: string
  title: string
  location: Location
}

export type Price = {
  ghatToGhat?: number
  crossRiver?: number
}

export type Naav = {
  _id: string
  boatType?: BoatType
  ghat?: Ghat
  title?: string
  description?: string
  pictures?: [string]
  price?: Price
  capacity?: number
  isPublished?: boolean
  reviews?: Review[]
  user?: UserType
  startTime?: string
  endTime?: string
}

export type Review = {
  _id: string
  rating: number
  comment: string
  createdAt?: string
  user?: UserType
}

export default class AddBoatService {
  static addBoat(formData: FormData): Promise<Naav> {
    return requestClient.post('/naav/file/', formData)
  }
}
