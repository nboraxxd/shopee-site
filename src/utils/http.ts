import axios, { AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from '@/constants/httpStatusCode.enum'
import { AuthResponse } from '@/types/auth.type'
import { clearAuthLocalStorage, getAccessToken, setAccessToken, setUser } from '@/utils/token'
import { PATH } from '@/constants/path'

let accessToken = getAccessToken()

export const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.response.use(
  function (response) {
    const { url } = response.config
    if (url === PATH.signup || url === PATH.login) {
      accessToken = (response.data as AuthResponse).data.access_token
      const user = (response.data as AuthResponse).data.user
      setAccessToken(accessToken)
      setUser(user)
    } else if (url === PATH.logout) {
      accessToken = ''
      clearAuthLocalStorage()
    }

    return response
  },

  function (error: AxiosError) {
    if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
      const data: any | undefined = error.response?.data
      console.log(data, error)
      const message = data?.message || error.message
      toast.error(message)
    }

    if (error.response?.status === HttpStatusCode.Unauthorized) {
      accessToken = ''
      clearAuthLocalStorage()
      // window.location.reload()
    }

    return Promise.reject(error)
  }
)

http.interceptors.request.use(
  function (config) {
    if (accessToken && config.headers) {
      config.headers['authorization'] = accessToken
    }

    return config
  },

  function (error: AxiosError) {
    return Promise.reject(error)
  }
)
