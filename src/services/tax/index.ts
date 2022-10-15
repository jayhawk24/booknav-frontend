import requestClient from 'services/requestClient'

export type Tax = {
  _id: string
  serviceChargePercent: number
  tax: number
}

export const getTax = async (): Promise<Tax[]> => {
  const { data } = await requestClient.get('/tax')
  return data
}
