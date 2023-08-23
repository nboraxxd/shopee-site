import { AuthResponse, RefreshTokenResponse } from '@/types/auth.type'
import { http } from '@/utils/http'

export const API_LOGIN_URL = '/login'
export const API_REGISTER_URL = '/register'
export const API_LOOUT_URL = '/logout'
export const API_REFRESH_TOKEN_URL = '/refresh-access-token'

type AuthenticationForm = {
  email: string
  password: string
}

const authenticationApi = {
  register(body: AuthenticationForm) {
    return http.post<AuthResponse>(API_REGISTER_URL, body)
  },

  login(body: AuthenticationForm) {
    return http.post<AuthResponse>(API_LOGIN_URL, body)
  },

  refreshToken(body: { refresh_token: string }) {
    return http.post<RefreshTokenResponse>(API_REFRESH_TOKEN_URL, body)
  },
}

export default authenticationApi
