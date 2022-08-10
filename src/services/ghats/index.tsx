import { GhatType } from 'hooks/useGhats'
import requestClient from 'services/requestClient'

export default class GhatService {
  static getGhat(): Promise<GhatType> {
    return requestClient.get('/ghat')
  }

  static addGhat(data: FormData): Promise<GhatType> {
    return requestClient.post('/ghat/file', data)
  }

  static getGhatId(_id: string): Promise<{ data: GhatType }> {
    return requestClient.get(`/ghat/${_id}`)
  }

  static updateGhatInfo(
    formData: FormData,
    _id: string | undefined,
  ): Promise<GhatType> {
    return requestClient.put(`/ghat/${_id}/file`, formData)
  }
}
