import requestClient from 'services/requestClient'

export type LoginResponseType = {
  data: {
    access: string
    refresh: string
  }
}

export default class LoginService {
  static login(phone: string): Promise<LoginResponseType> {
    return requestClient.post('/users/otp/', {
      phone,
    })
  }
}
