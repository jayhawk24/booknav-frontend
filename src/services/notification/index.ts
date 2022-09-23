import requestClient from 'services/requestClient'

export const sendSubscription = (subscription: PushSubscription) => {
  return requestClient.post(
    '/notification/subscribe',
    {
      subscription,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}
