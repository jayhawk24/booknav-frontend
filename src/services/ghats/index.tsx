import { GhatType } from 'hooks/useGhats'
import requestClient from 'services/requestClient'

export default class GhatService {
  static getGhat(): Promise<GhatType> {
    return requestClient.get('/ghat')
  }

  static addGhat(data: FormData): Promise<GhatType> {
    return requestClient.post('/ghat', data)
  }

  static getGhatId(_id: string): Promise<GhatType> {
    return requestClient.get(`/ghat/${_id}`)
  }
}
