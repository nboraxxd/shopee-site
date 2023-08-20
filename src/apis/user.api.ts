import { http } from '@/utils/http'
import { AuthResponse } from '@/types/auth.type'
import { SuccessResponse } from '@/types/utils.type'
import { User } from '@/types/user.type'

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  new_password?: string
}

const USER_URL = '/user'

const userApi = {
  logout() {
    return http.post<AuthResponse>('/logout')
  },

  getProfile() {
    return http.get<SuccessResponse<User>>('/me')
  },

  updateProfile(body: BodyUpdateProfile) {
    return http.put<SuccessResponse<User>>('/user', body)
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
