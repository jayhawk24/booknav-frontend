import requestClient from 'services/requestClient'

type OtpResponse = {
  data: {
    hash: string
  }
}

export type LoginResponseType = {
  data: {
    access: string
    refresh: string
  }
}

export default class LoginService {
  static login(phone: string): Promise<OtpResponse> {
    return requestClient.post('/users/otp/', {
      phone,
    })
  }
  static sendOtp(otp: string, hash: string): Promise<LoginResponseType> {
    return requestClient.post('/users/verify/', {
      otp,
      hash,
    })
  }
}
