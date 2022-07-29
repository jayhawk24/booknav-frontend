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
  static updateGeneralInfo(formData: FormData): Promise<GenericResponseType> {
    return requestClient.put('/users/me/', formData)
  }
}
