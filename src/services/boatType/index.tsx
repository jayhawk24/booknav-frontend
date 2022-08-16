import { BoatType } from 'services/addBoat'
import requestClient from 'services/requestClient'

export default class BoatTypeService {
  static getBoatType(): Promise<BoatType> {
    return requestClient.get('/boat-type')
  }

  static addBoatType(title: string): Promise<BoatType> {
    return requestClient.post('/boat-type', { title })
  }

  static deleteBoatType(_id: string): Promise<BoatType> {
    return requestClient.delete(`/boat-type/${_id}`)
  }

  static getBoatTypeId(_id: string): Promise<{ data: BoatType }> {
    return requestClient.get(`/boat-type/${_id}`)
  }

  static updateBoatType(
    formData: FormData,
    _id: string | undefined,
  ): Promise<BoatType> {
    return requestClient.put(`/boat-type/${_id}/file`, formData)
  }
}
