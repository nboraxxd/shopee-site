import axios, { AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from '@/constants/httpStatusCode.enum'
import { AuthResponse } from '@/types/auth.type'
import { clearAccessToken, getAccessToken, setAccessToken } from './accessToken'

let accessToken = getAccessToken()

export const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.response.use(
  function (response) {
    const { url } = response.config
    if (url === '/register' || url === '/login') {
      accessToken = (response.data as AuthResponse).data.access_token
      setAccessToken(accessToken)
    } else if (url === '/logout') {
      accessToken = ''
      clearAccessToken()
    }

    return response
  },

  function (error: AxiosError) {
    if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
      const data: any | undefined = error.response?.data
      const message = data.message || error.message
      toast.error(message)
    }

    return Promise.reject(error)
  }
)

http.interceptors.request.use(
  function (config) {
    if (accessToken) {
      config.headers['authorization'] = accessToken
    }

    return config
  },

  function (error: AxiosError) {
    return Promise.reject(error)
  }
)
