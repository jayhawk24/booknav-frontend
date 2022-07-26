import { useQuery } from 'react-query'
import requestClient from 'services/requestClient'
import { clearAllTokens } from 'utils/tokenHandlers'

export type UserType = {
  id: number
  last_login: string | null
  created_at: string
  modified_at: string
  name: string
  email: string
  mobile_number: MobileType | null
  is_mobile_number_verified: boolean
  is_email_verified: boolean
  is_active: boolean
  groups: string[]
  picture: string | null
  country: string | null
  city: string | null
}

type MobileType = {
  national_number: string
  country_code: string
}

const getUser = async (): Promise<UserType> => {
  const { data } = await requestClient.get('/api/system-users/view-profile/')
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
