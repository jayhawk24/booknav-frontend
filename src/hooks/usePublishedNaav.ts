import { useQuery } from 'react-query'
import { Naav } from 'services/addBoat'
import requestClient from 'services/requestClient'

const getPublishedNaav = async (): Promise<Naav[]> => {
  const { data } = await requestClient.get('/naav')
  return data
}

export default function usePublishedNaav() {
  const { data, error, isLoading, isFetched, isSuccess } = useQuery(
    'getPublishedNaav',
    getPublishedNaav,
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
