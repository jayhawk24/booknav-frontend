import { GenericResponseType } from 'services/account'
import requestClient from 'services/requestClient'

export default class VerifyEmailService {
  static verify(email: string): Promise<GenericResponseType> {
    return requestClient.post(
      '/api/system-users/resend-verification-mail/?email=' + email,
    )
  }
}
