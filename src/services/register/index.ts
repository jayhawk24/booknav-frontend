import { OtpResponse } from 'services/login'
import requestClient from 'services/requestClient'

export default class RegisterService {
  static register(
    title: string,
    phone: string,
    role: string,
  ): Promise<OtpResponse> {
    return requestClient.post('/users/register/', {
      title,
      phone,
      role,
    })
  }
}
