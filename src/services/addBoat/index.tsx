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

export type HarbourType = {
  id: string
  name: string
}
export type CityType = {
  id: string
  name: string
}
export type CharterType = {
  id: string
  name: string
}
export type YachtType = {
  id: string
  name: string
}
export type ManufacturerType = {
  id: string
  name: string
}
export type ModelType = {
  id: string
  name: string
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

export type Naav = {
  _id: string
  boatType?: BoatType
  ghat?: Ghat
  title?: string
  description?: string
  pictures?: [string]
  price?: number
  capacity?: number
  isPublished?: boolean
  reviews?: Review[]
  user?: UserType
}

export type Review = {
  _id: string
  rating: number
  comment: string
  createdAt?: string
  user?: UserType
}

export default class AddBoatService {
  static getYachtTypes(page?: number): Promise<PagedResponseType<YachtType>> {
    if (page)
      return requestClient.get(
        `/api/yacht-management/yacht-types?page=${page}/`,
      )
    return requestClient.get('/api/yacht-management/yacht/types')
  }

  static getCharterTypes(
    page?: number,
  ): Promise<PagedResponseType<CharterType>> {
    if (page)
      return requestClient.get(
        `/api/yacht-management/charter-types?page=${page}/`,
      )
    return requestClient.get('/api/yacht-management/charter-types')
  }

  static getCities(): Promise<MetaResponseType<CityType>> {
    return requestClient.get('/api/yacht-management/city')
  }
  static addCity(name: string): Promise<AddMetaResponseType<CityType>> {
    return requestClient.post('/api/yacht-management/city/', { name })
  }

  static getHarbours(city: string): Promise<MetaResponseType<HarbourType>> {
    return requestClient.get(`/api/yacht-management/city/${city}/harbours/`)
  }
  static addHarbour({
    cityId,
    name,
  }: {
    cityId: string
    name: string
  }): Promise<AddMetaResponseType<HarbourType>> {
    return requestClient.post(
      `/api/yacht-management/city/${cityId}/harbours/`,
      {
        name,
      },
    )
  }

  static getManufacturers(): Promise<MetaResponseType<ManufacturerType>> {
    return requestClient.get('/api/yacht-management/manufacturer')
  }
  static addManufacturer(
    name: string,
  ): Promise<AddMetaResponseType<ManufacturerType>> {
    return requestClient.post('/api/yacht-management/manufacturer/', { name })
  }

  static getModels(
    manufacturerId: string,
  ): Promise<MetaResponseType<ModelType>> {
    return requestClient.get(
      `/api/yacht-management/manufacturer/${manufacturerId}/models`,
    )
  }
  static addModel({
    manufacturerId,
    name,
  }: {
    manufacturerId: string
    name: string
  }): Promise<AddMetaResponseType<ModelType>> {
    return requestClient.post(
      `/api/yacht-management/manufacturer/${manufacturerId}/models/`,
      {
        name,
      },
    )
  }

  static addBoat(formData: FormData): Promise<Naav> {
    return requestClient.post('/naav/file/', formData)
  }
}
