import { useQuery } from 'react-query'
import { GetNaavQuery, getNaavs } from 'services/naav'

export default function usePublishedNaav(query: GetNaavQuery) {
  const { data, error, isLoading, isFetched, isSuccess } = useQuery(
    ['getPublishedNaavs', query],
    () => getNaavs(query),
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
