export type AddUnavailabilityBody = {
  startDate: string
  endDate: string
  naavId: string
}

export type GetNaavQuery = {
  isPublished?: boolean | string
  boatTypeId?: string[]
  ghatId?: string
  minPrice?: string
  maxPrice?: string
}

export type Unavailability = {
  _id: string
  startTime: string
  endTime: string
  naavId: string
}

export type DeleteUnavailabilityBody = {
  naavId: string
  unavailabilityId: string
}
