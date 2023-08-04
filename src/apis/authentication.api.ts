import { AuthResponse } from '@/types/auth.type'
import { http } from '@/utils/http'

type AuthenticationForm = {
  email: string
  password: string
}

export const authenticationApi = {
  register(body: AuthenticationForm) {
    return http.post<AuthResponse>('/register', body)
  },

  login(body: AuthenticationForm) {
    return http.post<AuthResponse>('/login', body)
  },
}