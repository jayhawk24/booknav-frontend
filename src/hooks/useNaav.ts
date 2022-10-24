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
  )
  return {
    data,
    error,
    isLoading,
    isSuccess,
    isFetched,
  }
}
