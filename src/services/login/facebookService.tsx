import requestClient from 'services/requestClient'
import { LoginResponseType } from '.'

export default class facebookService {
  static login(authToken: string): Promise<LoginResponseType> {
    return requestClient.post('/api/system-users/facebook_auth/', {
      auth_token: authToken,
    })
  }
}
