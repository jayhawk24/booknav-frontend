import { UserType } from 'hooks/useUser'
import requestClient from 'services/requestClient'

export interface BankInfo extends BankData {
  _id: string
  user?: UserType
}

export type BankData = {
  accountName: string
  accountNumber: number
  bankName: string
  ifscCode: string
}
export default class BankService {
  static async getBank(): Promise<BankInfo[]> {
    const { data } = await requestClient.get('/bank')
    return data
  }

  static addBank(data: BankData): Promise<BankData> {
    return requestClient.post('/bank', data)
  }

  static async getBankId(_id: string): Promise<BankInfo[]> {
    const { data } = await requestClient.get(`/bank/${_id}`)
    return [data]
  }

  static async deleteBank(_id: string): Promise<BankInfo> {
    const { data } = await requestClient.delete(`/bank/${_id}`)
    return data
  }

  static updateBank(data: BankData, _id: string): Promise<BankData> {
    return requestClient.put(`/bank/${_id}`, data)
  }
}
