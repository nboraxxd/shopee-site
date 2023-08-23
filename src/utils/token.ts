import { User } from '@/types/user.type'

const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'
const USER = 'user'

export const setAccessToken = (access_token: string) => {
  localStorage.setItem(ACCESS_TOKEN, access_token)
}

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN) || ''
}

export const setRefreshToken = (refresh_token: string) => {
  localStorage.setItem(REFRESH_TOKEN, refresh_token)
}

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN) || ''
}

export const setUser = (user: User) => {
  localStorage.setItem(USER, JSON.stringify(user))
}

export const getUser = () => {
  const result = localStorage.getItem(USER)
  return result ? JSON.parse(result) : null
}

export const clearAuthLocalStorage = () => {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(REFRESH_TOKEN)
  localStorage.removeItem(USER)

  const clearLocalStorageEvent = new Event('clearLocalStorage')
  localStorageEventTarget.dispatchEvent(clearLocalStorageEvent)
}

export const localStorageEventTarget = new EventTarget()
