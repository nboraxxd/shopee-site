import axios, { AxiosError, InternalAxiosRequestConfig, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from '@/constants/httpStatusCode.enum'
import { AuthResponse } from '@/types/auth.type'
import {
  clearAuthLocalStorage,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  setUser,
} from '@/utils/token'
import authenticationApi, {
  API_LOGIN_URL,
  API_LOGOUT_URL,
  API_REFRESH_TOKEN_URL,
  API_REGISTER_URL,
} from '@/apis/authentication.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from '@/utils/utils'
import { ErrorResponse } from '@/types/utils.type'

let accessToken = getAccessToken()
let refreshToken = getRefreshToken()
let refreshTokenRequest: Promise<string> | null

export const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'expire-access-token': 60 * 60 * 24, // 1 ngày
    'expire-refresh-token': 60 * 60 * 24 * 160, // 160 ngày
  },
})

http.interceptors.response.use(
  function (response) {
    const { url } = response.config
    if (url === API_LOGIN_URL || url === API_REGISTER_URL) {
      accessToken = (response.data as AuthResponse).data.access_token
      refreshToken = (response.data as AuthResponse).data.refresh_token

      setAccessToken(accessToken)
      setRefreshToken(refreshToken)

      const user = (response.data as AuthResponse).data.user
      setUser(user)
    } else if (url === API_LOGOUT_URL) {
      accessToken = ''
      refreshToken = ''

      clearAuthLocalStorage()
    }

    return response
  },

  async function (error: AxiosError) {
    // Chỉ show error toast khi lỗi không phải là 401 và 422
    if (![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)) {
      const data: any | undefined = error.response?.data
      const message = data?.message || error.message
      toast.error(message)
    }

    if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
      const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
      const { url } = config

      if (
        isAxiosExpiredTokenError<ErrorResponse<{ name: string; message: string }>>(error) &&
        url !== API_REFRESH_TOKEN_URL
      ) {
        refreshTokenRequest = refreshTokenRequest
          ? refreshTokenRequest
          : handleRefreshToken().finally(() => {
              // Giữ refreshTokenRequest trong 5s cho những request tiếp theo nếu có 401 thì dùng
              setTimeout(() => {
                refreshTokenRequest = null
              }, 5000)
            })

        return refreshTokenRequest
          .then((access_token) => {
            return http({ ...config, headers: { ...config.headers, authorization: access_token } })
          })
          .catch((error) => {
            throw error
          })
      }

      // Những trường hợp như token không đúng, không truyền được token, token hết hạn nhưng gọi refresh token bị fail thì tiến hành như sau
      accessToken = ''
      refreshToken = ''
      clearAuthLocalStorage()
      toast.error(error.response?.data.data?.message || error.response?.data.message)
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

async function handleRefreshToken() {
  try {
    const response = await authenticationApi.refreshToken({ refresh_token: refreshToken })
    accessToken = response.data.data.access_token
    setAccessToken(response.data.data.access_token)

    return response.data.data.access_token
  } catch (error) {
    accessToken = ''
    refreshToken = ''

    clearAuthLocalStorage()
    throw error
  }
}
