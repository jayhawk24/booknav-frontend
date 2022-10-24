import { AxiosResponse } from 'axios'
import requestClient from 'services/requestClient'
import { MetaResponseType, Naav } from 'services/addBoat'

type EditNaavRequest = { data: FormData; naavId: string }

export type GetNaavQuery = {
  isPublished?: boolean | string
  boatTypeId?: string[]
  ghatId?: string
  minPrice?: string
  maxPrice?: string
}

type NaavReview = { rating: number; comment: string }

export function getNaavs(
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

export const getNaav = async (
  id: string,
  query?: GetNaavQuery,
): Promise<Naav | undefined> => {
  const queryParams = new URLSearchParams(JSON.stringify(query))
  if (!id) return
  const { data } = await requestClient.get(`/naav/${id}/?${queryParams}`)
  return data
}

export const editNaav = async ({
  data,
  naavId,
}: EditNaavRequest): Promise<Naav> => {
  const { data: newData } = await requestClient.put(
    `/naav/${naavId}/file`,
    data,
  )
  return newData
}

export const deleteNaav = async (id: string): Promise<void> => {
  await requestClient.delete(`/naav/${id}`)
}

export const publishNaav = async ({
  id,
  isPublished,
}: {
  id: string
  isPublished: boolean
}): Promise<Naav> => {
  const { data } = await requestClient.put(`/naav/${id}/status`, {
    isPublished,
  })
  return data
}

export const reviewNaav = async (
  data: NaavReview,
  naavId: string,
): Promise<AxiosResponse> =>
  await requestClient.put(`naav/${naavId}/review`, data)

export const deleteNaavImage = ({
  naavId,
  imageId,
}: {
  naavId: string
  imageId: string
}): Promise<AxiosResponse> => {
  return requestClient.delete(`naav/${naavId}/image/${imageId}/`)
}
