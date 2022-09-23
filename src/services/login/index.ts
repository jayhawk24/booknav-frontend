import requestClient from 'services/requestClient'

export type OtpResponse = {
  data: {
    phone: string
    hash: string
    otp?: string
  }
}

export type LoginResponseType = {
  data: {
    accessToken: string
    refreshToken: string
  }
}

type SendOtpBody = {
  otp: string
  hash: string
  phone: string
}

export default class LoginService {
  static login(phone: string): Promise<OtpResponse> {
    return requestClient.post('/users/otp/', {
      phone,
    })
  }
  static sendOtp(data: SendOtpBody): Promise<LoginResponseType> {
    return requestClient.post('/users/verify/', data)
  }
}
