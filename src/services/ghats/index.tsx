import { GhatType } from 'hooks/useGhats'
import requestClient from 'services/requestClient'

type GhatRequestType = {
  title: string
  phone: string
  role: string
}

export default class GhatService {
  static getGhat(): Promise<GhatType> {
    return requestClient.get('/ghat')
  }

  static addGhat(data: GhatRequestType): Promise<GhatType> {
    return requestClient.post('/ghat', data)
  }
}
