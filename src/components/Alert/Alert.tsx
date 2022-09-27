import React, { useEffect } from 'react'
import requestClient from 'services/requestClient'
import { AxiosError, AxiosResponse } from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const validRequestTypes = ['post', 'patch', 'put', 'delete']
let prevMsg = ''
export default function AlertDialog() {
  const _enqueueSnackbar = (
    msg: string,
    variant: 'success' | 'error' = 'success',
  ) => {
    if (prevMsg !== msg)
      if (variant === 'success') toast.success(msg)
      else toast.error(msg)
    prevMsg = msg
  }

  useEffect(() => {
    const onSuccessResponse = (response: AxiosResponse) => {
      const { config } = response

      if (response.status !== 200) return response
      if (config.method && !validRequestTypes.includes(config.method))
        return response
      if (!response.data.message) return response
      // _enqueueSnackbar(response.data.message)
      return response
    }
    const onErroredResponse = (err: AxiosError) => {
      const { response, config } = err
      const status = response?.status
      const data = response?.data

      if (config.method && !validRequestTypes.includes(config.method)) throw err
      if (!data) throw err

      if (status === 406) {
        if (data.error) {
          _enqueueSnackbar(data.error, 'error')
          throw err
        }
      }

      if (status && [401, 404, 403].includes(status)) {
        if (data.detail && typeof data.detail === 'string') {
          _enqueueSnackbar(data.detail, 'error')
          throw err
        }
      }

      if (status === 400) {
        // hanling validation error messages
        if (data.non_field_errors) {
          let debugMessage = ''

          for (const field in data) {
            debugMessage +=
              '\n' +
              data[field].reduce((acc: string, value: string) => {
                acc += `${field.toUpperCase()} \t - ${value}`
                return acc
              }, '')
          }

          _enqueueSnackbar(debugMessage, 'error')
        }
        // we don't need this
        else if (data.error) {
          if (typeof data.error === 'string') {
            _enqueueSnackbar(data.error, 'error')
            throw err
          }
          throw err
        }
      }
      throw err
    }

    requestClient.interceptors.request.use(config => {
      prevMsg = ''
      return config
    })
    requestClient.interceptors.response.use(
      onSuccessResponse,
      onErroredResponse,
    )
  }, [])

  return <Toaster position="bottom-right" />
}
