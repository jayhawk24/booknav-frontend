import requestClient from 'services/requestClient'
import { Naav, MetaResponseType } from 'services/addBoat'
import { GetNaavQuery } from 'services/naav'

export function getListings(
  queries?: GetNaavQuery,
): Promise<MetaResponseType<Naav>> {
  const query = new URLSearchParams({
    isPublished: queries?.isPublished ? 'true' : 'false',
  })

  if (queries?.ghatId) query.set('ghatId', queries?.ghatId)
  if (queries?.boatTypeId?.length)
    queries.boatTypeId.map(type => query.append('boatTypeId', type))

  return requestClient.get(`/naav/?${query}`)
}
