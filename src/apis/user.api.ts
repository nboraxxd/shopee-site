import { AuthResponse } from '@/types/auth.type'
import { http } from '@/utils/http'

export const userApi = {
  logout() {
    return http.post<AuthResponse>('/logout')
  },
}
