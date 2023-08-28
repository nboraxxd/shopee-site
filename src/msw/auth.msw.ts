import { rest } from 'msw'
import HttpStatusCode from '@/constants/httpStatusCode.enum'

export const access_token_1s =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2NjZGQzM2JlNTc2ZGQ1M2QyOWYwNSIsImVtYWlsIjoia2l4aUBtYWlsaW5hdG9yLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDgtMjVUMTQ6MzI6MTkuMjE2WiIsImlhdCI6MTY5Mjk3MzkzOSwiZXhwIjoxNjkyOTczOTQwfQ.nqMc5UfXKxROTxiezHOAXCmuG-t5eLN0eemt19xOYg4'

export const refresh_token_1000days =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2NjZGQzM2JlNTc2ZGQ1M2QyOWYwNSIsImVtYWlsIjoia2l4aUBtYWlsaW5hdG9yLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDgtMjVUMTQ6MzI6MTkuMjE2WiIsImlhdCI6MTY5Mjk3MzkzOSwiZXhwIjoxNzc5MzczOTM5fQ.q1dFmQJrrEgAOh-vrVnuSwS7e0A6vay93138UQmIS-k'

export const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2NjZGQzM2JlNTc2ZGQ1M2QyOWYwNSIsImVtYWlsIjoia2l4aUBtYWlsaW5hdG9yLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDgtMjhUMDY6MzY6NTEuNjQ4WiIsImlhdCI6MTY5MzIwNDYxMSwiZXhwIjoxNzAzMjA0NjEwfQ.spVwfj_ZZndusqV7FmM55uiPntDCf_UubdWHVl3Qixo'

const loginResponse = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2NjZGQzM2JlNTc2ZGQ1M2QyOWYwNSIsImVtYWlsIjoia2l4aUBtYWlsaW5hdG9yLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDgtMjhUMDM6NDg6MDUuNDg2WiIsImlhdCI6MTY5MzE5NDQ4NSwiZXhwIjoxNjk0MTk0NDg0fQ.InWzNtx5bDTV8vbcMcrPRyCrbpXhG_mUVB6q_rmPHtg',
    expires: 999999,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2NjZGQzM2JlNTc2ZGQ1M2QyOWYwNSIsImVtYWlsIjoia2l4aUBtYWlsaW5hdG9yLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDgtMjhUMDM6NDg6MDUuNDg2WiIsImlhdCI6MTY5MzE5NDQ4NSwiZXhwIjoxNzc5NTk0NDg1fQ.dNwHf-gIu-pKPfEg3fAZQmG7gVxsjFwXAJfLbcub2YU',
    expires_refresh_token: 86400000,
    user: {
      _id: '64cccdd33be576dd53d29f05',
      roles: ['User'],
      email: 'kixi@mailinator.com',
      createdAt: '2023-08-04T10:07:15.934Z',
      updatedAt: '2023-08-23T02:57:20.910Z',
      __v: 0,
      address: 'Viet Nam',
      date_of_birth: '2000-02-15T00:00:00.000Z',
      name: 'hello',
      phone: '0987654321',
      avatar: 'ed8fb6e9-e95a-4361-b086-a40418ad40b1.jpg',
    },
  },
}

const refreshTokenResponse = {
  message: 'Refresh Token thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2NjZGQzM2JlNTc2ZGQ1M2QyOWYwNSIsImVtYWlsIjoia2l4aUBtYWlsaW5hdG9yLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDgtMjhUMDU6NDM6NDEuMTY5WiIsImlhdCI6MTY5MzIwMTQyMSwiZXhwIjoxNjkzODA2MjIxfQ.jQ7Q5KSc-DRMtIGxNWxh4O-REwoHE7R3vzlyAD_R9dM',
  },
}

const loginRequest = rest.post(`${import.meta.env.VITE_SERVER_URL}/login`, (_, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginResponse))
})

const refreshToken = rest.post(`${import.meta.env.VITE_SERVER_URL}/refresh-access-token`, (_, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(refreshTokenResponse))
})

const authRequests = [loginRequest, refreshToken]

export default authRequests
