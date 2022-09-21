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
  static async getBank(): Promise<BankInfo[]> {
    const { data } = await requestClient.get('/bank')
    return data
  }

  static addBank(data: BankInfo): Promise<BankInfo> {
    return requestClient.post('/bank', data)
  }

  static async getBankId(_id: string): Promise<BankInfo[]> {
    const { data } = await requestClient.get(`/bank/${_id}`)
    return [data]
  }

  static deleteBank(_id: string): Promise<BankInfo> {
    return requestClient.delete(`/bank/${_id}`)
  }

  static updateBank(
    data: BankInfo,
    _id: string | undefined,
  ): Promise<BankInfo> {
    return requestClient.put(`/bank/${_id}`, data)
  }
}
