import requestClient from 'services/requestClient'
import { Naav } from 'services/addBoat'

type EditNaavRequest = { data: FormData; naavId: string }

export type GetNaavQuery = {
  isPublished?: boolean | string
  boatTypeId?: string
  ghatId?: string
}

export const getNaav = async (
  id: string,
  query?: GetNaavQuery,
): Promise<Naav> => {
  const queryParams = new URLSearchParams(JSON.stringify(query))
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
