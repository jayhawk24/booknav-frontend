import requestClient from 'services/requestClient'
import { Naav } from 'services/addBoat'

type EditNaavRequest = { data: FormData; naavId: string }

export const getNaav = async (id: string): Promise<Naav> => {
  const { data } = await requestClient.get(`/naav/${id}`)
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
