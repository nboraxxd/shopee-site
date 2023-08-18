import { User } from '@/types/user.type'

const ACCESS_TOKEN = 'access_token'
const USER = 'user'

export const setAccessToken = (access_token: string) => {
  localStorage.setItem(ACCESS_TOKEN, access_token)
}

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN) || ''
}

export const clearAuthLocalStorage = () => {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(USER)

  const clearLocalStorageEvent = new Event('clearLocalStorage')
  localStorageEventTarget.dispatchEvent(clearLocalStorageEvent)
}

export const setUser = (user: User) => {
  localStorage.setItem(USER, JSON.stringify(user))
}

export const getUser = () => {
  const result = localStorage.getItem(USER)
  return result ? JSON.parse(result) : null
}

export const localStorageEventTarget = new EventTarget()
