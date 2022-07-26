import requestClient from 'services/requestClient'

export type OtpResponse = {
  data: {
    phone: string
    hash: string
  }
}

export type LoginResponseType = {
  data: {
    accessToken: string
    refreshToken: string
  }
}

export default class LoginService {
  static login(phone: string): Promise<OtpResponse> {
    return requestClient.post('/users/otp/', {
      phone,
    })
  }
  static sendOtp({
    otp,
    hash,
    phone,
  }: {
    otp: string
    hash: string
    phone: string
  }): Promise<LoginResponseType> {
    return requestClient.post('/users/verify/', {
      otp,
      phone,
      hash,
    })
  }
}
