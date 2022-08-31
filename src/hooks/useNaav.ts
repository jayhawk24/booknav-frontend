import { useQuery } from 'react-query'
import { getNaav, GetNaavQuery } from 'services/naav'

type useNaavParams = {
  naavId: string
  query?: GetNaavQuery
}

export default function useNaav({ naavId, query }: useNaavParams) {
  const { data, error, isLoading, isFetched, isSuccess } = useQuery(
    ['getNaav', naavId, query],
    () => getNaav(naavId),
    { staleTime: 60 * 60 * 1000 * 24 },
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
