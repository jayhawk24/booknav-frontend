import { GenericResponseType } from 'services/account'
import { Naav } from 'services/addBoat'
import requestClient from 'services/requestClient'

type YachtResponse = {
  data: Naav
}
export default class UpdateBoatService {
  static updateBoat = (
    yachtId: string,
    formData: FormData,
  ): Promise<GenericResponseType> => {
    return requestClient.put(
      `/api/yacht-management/yachts/${yachtId}/general-info/`,
      formData,
    )
  }
  static getBoat = (yachtId: string): Promise<YachtResponse> => {
    return requestClient.get(`/api/yacht-management/yacht/${yachtId}/retrieve`)
  }
}
