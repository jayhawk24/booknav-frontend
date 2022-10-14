import requestClient from 'services/requestClient'
import { Naav } from 'services/addBoat'

export async function getListings(): Promise<Naav[]> {
  const { data } = await requestClient.get('/naav/listings')
  return data
}
