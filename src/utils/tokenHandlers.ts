import requestClient from 'services/requestClient'

const refreshToken = (rToken = ''): string => {
  if (rToken) {
    localStorage.setItem('refresh', rToken)
    return rToken
  }
  const refreshToken = localStorage.getItem('refresh')
  return refreshToken ? refreshToken : ''
}

const token = (token = ''): string => {
  if (token) {
    requestClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    localStorage.setItem('access', `Bearer ${token}`)
    return token
  }
  const accessToken = localStorage.getItem('access')
  return accessToken ? accessToken : ''
}

export const setToken = (_token?: string, rToken?: string) => {
  if (_token) token(_token)
  if (rToken) refreshToken(rToken)
}

export const getToken = (type: 'access' | 'refresh'): string => {
  if (type === 'access') {
    return token()
  }
  return refreshToken()
}

export const clearAllTokens = () => {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  requestClient.defaults.headers.common['Authorization'] = ''
  requestClient.interceptors.response.use(undefined, undefined)
}
