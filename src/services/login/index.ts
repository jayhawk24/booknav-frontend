import requestClient from 'services/requestClient'

export type LoginResponseType = {
  data: {
    access: string
    refresh: string
  }
}

export default class LoginService {
  static login(email: string, password: string): Promise<LoginResponseType> {
    return requestClient.post('/api/system-users/token/login/', {
      email,
      password,
    })
  }
}
