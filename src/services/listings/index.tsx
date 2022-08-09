import requestClient from 'services/requestClient'
import { Naav, MetaResponseType } from 'services/addBoat'

export default class ListingsService {
  static getListings(): Promise<MetaResponseType<Naav>> {
    return requestClient.get('/naav/')
  }
}
