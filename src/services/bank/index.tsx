import requestClient from 'services/requestClient'

export interface BankInfo {
  user?: string
  accountName: string
  accountNumber: number
  bankName: string
  ifscCode: string
  _id?: string
}
export default class BankService {
  static getBank(): Promise<BankInfo[]> {
    return requestClient.get('/bank')
  }

  static addBank(data: BankInfo): Promise<BankInfo> {
    return requestClient.post('/bank', data)
  }

  static updateBank(_id: string): Promise<BankInfo> {
    return requestClient.put(`/bank/${_id}`)
  }
}
