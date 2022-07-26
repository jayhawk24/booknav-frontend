import requestClient from 'services/requestClient'

export type GenericResponseType = {
  data: {
    msg: string
  }
}

export default class accountService {
  static updatePhone(mobile_number: string): Promise<GenericResponseType> {
    return requestClient.put('/api/system-users/change-mobile-number/', {
      mobile_number,
    })
  }
  static updatePassword(
    new_password: string,
    current_password: string,
  ): Promise<GenericResponseType> {
    return requestClient.put('/api/system-users/change-password/', {
      new_password,
      current_password,
    })
  }
  static updateEmail(email: string): Promise<GenericResponseType> {
    return requestClient.post('/api/system-users/request-email-change/', {
      email,
    })
  }
  static updateGeneralInfo(formData: FormData): Promise<GenericResponseType> {
    return requestClient.post(
      '/api/system-users/update-basic-profile/',
      formData,
    )
  }
  static verifyUpdateEmail(token: string): Promise<GenericResponseType> {
    return requestClient.put(
      `/api/system-users/verify-update-email?token=${token}`,
    )
  }
}
