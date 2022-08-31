import requestClient from 'services/requestClient'
import { Naav, MetaResponseType } from 'services/addBoat'
import { GetNaavQuery } from 'services/naav'

export function getListings(
  queries?: GetNaavQuery,
): Promise<MetaResponseType<Naav>> {
  const query = new URLSearchParams(JSON.stringify(queries))

  return requestClient.get(`/naav/${query}`)
}
