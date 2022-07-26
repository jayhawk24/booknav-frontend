import { GenericResponseType } from 'services/account'
import requestClient from 'services/requestClient'

export default class RegisterService {
  static register(
    name: string,
    mobile_number: string,
    email: string,
    password: string,
  ): Promise<GenericResponseType> {
    return requestClient.post('/api/system-users/register/', {
      name,
      mobile_number,
      email,
      password,
    })
  }
}
