import requestClient from 'services/requestClient'

export type GenericResponseType = {
  data: {
    message: string
  }
}

export default class accountService {
  static updatePhone(mobile_number: string): Promise<GenericResponseType> {
    return requestClient.put('/users/change-mobile-number/', {
      mobile_number,
    })
  }
  static updateGeneralInfo(formData: FormData): Promise<GenericResponseType> {
    return requestClient.post('/users/update/', formData)
  }
}
