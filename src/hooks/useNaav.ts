import { useQuery } from 'react-query'
import { getNaav } from 'services/naav'
import { GetNaavQuery } from 'services/naav/types'

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
