import { http } from '@/utils/http'
import { AuthResponse } from '@/types/auth.type'
import { SuccessResponse } from '@/types/utils.type'
import { User } from '@/types/user.type'
import { API_LOGOUT_URL } from '@/apis/authentication.api'

export interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  new_password?: string
}

const USER_URL = '/user'
const ME_URL = '/me'

const userApi = {
  logout() {
    return http.post<AuthResponse>(API_LOGOUT_URL)
  },

  getProfile() {
    return http.get<SuccessResponse<User>>(ME_URL)
  },

  updateProfile(body: BodyUpdateProfile) {
    return http.put<SuccessResponse<User>>(USER_URL, body)
  },

  updateAvatar(body: FormData) {
    return http.post<SuccessResponse<string>>(`${USER_URL}/upload-avatar`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

export default userApi
