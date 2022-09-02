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
  if (queries?.minPrice) query.set('minPrice', queries?.minPrice)
  if (queries?.maxPrice) query.set('maxPrice', queries?.maxPrice)

  return requestClient.get(`/naav/?${query}`)
}
