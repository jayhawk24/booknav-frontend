import { useQuery } from 'react-query'
import requestClient from 'services/requestClient'
import { clearAllTokens } from 'utils/tokenHandlers'

export type UserType = {
  id: number
  phone: string
  email?: string
  title: string
  picture?: string
}

const getUser = async (): Promise<UserType> => {
  const { data } = await requestClient.get('/users/me/')
  return data
}

export default function useUser() {
  const { data, error, isLoading, isFetched, isSuccess } = useQuery(
    'getUser',
    getUser,
    { staleTime: 60 * 60 * 1000 },
  )
  const isLoggedIn = isSuccess && isFetched
  return {
    data,
    error,
    isLoading,
    isSuccess,
    isLoggedIn,
    logoutUser,
    isFetched,
  }
}

export const logoutUser = () => {
  clearAllTokens()
}
