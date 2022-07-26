import { GenericResponseType } from 'services/account'
import requestClient from 'services/requestClient'

export default class forgotPassService {
  static forgotPass(email: string): Promise<GenericResponseType> {
    return requestClient.post('/api/system-users/request-password-reset/', {
      email,
    })
  }
  static resetPass(
    token: string,
    password: string,
  ): Promise<GenericResponseType> {
    return requestClient.post(
      `/api/system-users/reset-password/?token=${token}`,
      {
        password,
      },
    )
  }
}
