import { describe, expect, it } from 'vitest'
import {
  clearAuthLocalStorage,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  setUser,
  getUser,
} from '@/utils/token'
import { User } from '@/types/user.type'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2NjZGQzM2JlNTc2ZGQ1M2QyOWYwNSIsImVtYWlsIjoia2l4aUBtYWlsaW5hdG9yLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDgtMjVUMDY6NDQ6MTIuNjIzWiIsImlhdCI6MTY5Mjk0NTg1MiwiZXhwIjoxNjkzMDMyMjUyfQ.-2oiRKYItq5MAZx5y3VNY3yhhg20lWhmzy5iRdGiOVw'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2NjZGQzM2JlNTc2ZGQ1M2QyOWYwNSIsImVtYWlsIjoia2l4aUBtYWlsaW5hdG9yLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDgtMjVUMDY6NDQ6MTIuNjIzWiIsImlhdCI6MTY5Mjk0NTg1MiwiZXhwIjoxNzA2NzY5ODUyfQ.65pAEMuyJrcc_oLUwDf54heY67-fSHdFUPqHlZm6ODI'

const user: User = {
  _id: '64cccdd33be576dd53d29f05',
  roles: ['User'],
  email: 'kixi@mailinator.com',
  createdAt: '2023-08-04T10:07:15.934Z',
  updatedAt: '2023-08-23T02:57:20.910Z',
  address: 'Viet Nam',
  date_of_birth: '2000-02-15T00:00:00.000Z',
  name: 'hello',
  phone: '0987654321',
  avatar: 'ed8fb6e9-e95a-4361-b086-a40418ad40b1.jpg',
}

describe('setAccessToken', () => {
  it('set và get access_token localStorage', () => {
    setAccessToken(access_token)
    expect(getAccessToken()).toBe(access_token)
  })
})

describe('getRefreshToken', () => {
  it('set và get refresh_token localStorage', () => {
    setRefreshToken(refresh_token)
    expect(getRefreshToken()).toBe(refresh_token)
  })
})

describe('getUser', () => {
  it('set và get user localStorage', () => {
    setUser(user)
    expect(getUser()).toEqual(user)
  })
})

describe('clearAuthLocalStorage', () => {
  it('Xoá access_token, refresh_token, profile', () => {
    setAccessToken(access_token)
    setRefreshToken(refresh_token)
    setUser(user)
    clearAuthLocalStorage()
    expect(getAccessToken()).toBe('')
    expect(getRefreshToken()).toBe('')
    expect(getUser()).toEqual(null)
  })
})
