import { useQuery } from 'react-query'
import requestClient from 'services/requestClient'

export type GhatType = {
  name: string
  description?: string
  image?: string
}

const getGhats = async (): Promise<GhatType> => {
  const { data } = await requestClient.get('/ghat')
  return data
}

export default function useGhats() {
  const { data, error, isLoading, isFetched, isSuccess } = useQuery(
    'getGhats',
    getGhats,
    { staleTime: 60 * 60 * 1000 },
  )
  const isLoggedIn = isSuccess && isFetched
  return {
    data,
    error,
    isLoading,
    isSuccess,
    isLoggedIn,
    isFetched,
  }
}
