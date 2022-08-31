import { useQuery } from 'react-query'
import requestClient from 'services/requestClient'

export type BoatType = {
  _id: string
  title: string
  image: string
}

const getBoatTypes = async (): Promise<BoatType[]> => {
  const { data } = await requestClient.get('/boat-type')
  return data
}

export default function useBoatTypes() {
  const { data, error, isLoading, isFetched, isSuccess } = useQuery(
    'getBoatTypes',
    getBoatTypes,
    { staleTime: 24 * 60 * 60 * 1000 },
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
