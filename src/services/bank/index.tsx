import { BankInfo } from 'components/BankForm/BankForm'
import requestClient from 'services/requestClient'

export default class BankService {
  static getBank(): Promise<BankInfo> {
    return requestClient.get('/bank')
  }

  static addBank(data: BankInfo): Promise<BankInfo> {
    return requestClient.post('/bank', data)
  }

  static deleteBank(_id: string): Promise<BankInfo> {
    return requestClient.delete(`/bank/${_id}`)
  }
}
