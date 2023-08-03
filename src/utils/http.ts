import HttpStatusCode from '@/constants/httpStatusCode.enum'
import axios, { AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'

export const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.response.use(
  function (response) {
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
