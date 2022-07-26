import { GenericResponseType } from 'services/account'
import requestClient from 'services/requestClient'

export default class EditPhotosService {
  static uploadPhoto({
    yachtId,
    image,
  }: {
    yachtId: string
    image: FormData
  }): Promise<GenericResponseType> {
    return requestClient.post(
      `/api/yacht-management/yacht/${yachtId}/images/`,
      image,
    )
  }
}
