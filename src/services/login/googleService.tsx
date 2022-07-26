import requestClient from 'services/requestClient'
import { LoginResponseType } from '.'

export default class googleService {
  static login(authToken: string): Promise<LoginResponseType> {
    return requestClient.post('/api/system-users/google-auth/', {
      auth_token: authToken,
    })
  }
}
