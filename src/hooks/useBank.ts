import { BankInfo } from './../services/bank/index'
import { useQuery } from 'react-query'

import requestClient from 'services/requestClient'

const getBank = async (): Promise<BankInfo[]> => {
  const { data } = await requestClient.get('/bank')
  return data
}

export default function useBank() {
  const { data, error, isLoading, isFetched, isSuccess } = useQuery(
    'getBank',
    getBank,
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
