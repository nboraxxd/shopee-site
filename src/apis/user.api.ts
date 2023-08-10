import { AuthResponse } from '@/types/auth.type'
import { http } from '@/utils/http'

const userApi = {
  logout() {
    return http.post<AuthResponse>('/logout')
  },
}

export default userApi
