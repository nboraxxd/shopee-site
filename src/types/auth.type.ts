import { User } from '@/types/user.type'
import { ResponseApi } from '@/types/utils.type'

export type AuthResponse = ResponseApi<{
  access_token: string
  expires: number
  refresh_token: string
  expires_refresh_token: number
  user: User
}>
