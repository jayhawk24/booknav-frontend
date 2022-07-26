import { GenericResponseType } from 'services/account'
import requestClient from 'services/requestClient'

type DescriptionUpdateRequestType = {
  yachtId: string
  data: {
    cabins: number
    berths: number
    authorised_capacity: number
    recommended_capacity: number
    bathrooms: number
    speed: number
    renovated: number
    fuel: number
    year_of_construction: number
    length: number
  }
}

export default class DescriptionService {
  static updateDescription({
    yachtId,
    data,
  }: DescriptionUpdateRequestType): Promise<GenericResponseType> {
    return requestClient.put(
      `/api/yacht-management/yacht/${yachtId}/technical-details/`,
      data,
    )
  }
}
