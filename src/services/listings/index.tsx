import requestClient from 'services/requestClient'
import { PagedResponseType, Yacht } from 'services/addBoat'

export default class ListingsService {
  static getListings(): Promise<PagedResponseType<Yacht>> {
    return requestClient.get('/api/yacht-management/yachts/')
  }
}
