import type { AxiosInstance } from 'axios'
import { beforeEach, describe, expect, it } from 'vitest'
import { http } from '@/utils/http'
import HttpStatusCode from '@/constants/httpStatusCode.enum'
import { setAccessToken, setRefreshToken } from '@/utils/token'

describe('http axios', () => {
  let _http: AxiosInstance

  beforeEach(() => {
    localStorage.clear
    _http = http
  })

  const access_token_1s =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2NjZGQzM2JlNTc2ZGQ1M2QyOWYwNSIsImVtYWlsIjoia2l4aUBtYWlsaW5hdG9yLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDgtMjVUMTQ6MzI6MTkuMjE2WiIsImlhdCI6MTY5Mjk3MzkzOSwiZXhwIjoxNjkyOTczOTQwfQ.nqMc5UfXKxROTxiezHOAXCmuG-t5eLN0eemt19xOYg4'

  const refresh_token_1000days =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2NjZGQzM2JlNTc2ZGQ1M2QyOWYwNSIsImVtYWlsIjoia2l4aUBtYWlsaW5hdG9yLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDgtMjVUMTQ6MzI6MTkuMjE2WiIsImlhdCI6MTY5Mjk3MzkzOSwiZXhwIjoxNzc5MzczOTM5fQ.q1dFmQJrrEgAOh-vrVnuSwS7e0A6vay93138UQmIS-k'

  it('Call API', async () => {
    const response = await _http.get('/products')
    expect(response.status).toBe(HttpStatusCode.Ok)
  })

  it('Auth request', async () => {
    await http.post('/login', {
      email: 'kixi@mailinator.com',
      password: 'Pa$$w0rd!',
    })
    const response = await _http.get('/me')
    expect(response.status).toBe(HttpStatusCode.Ok)
  })

  it('Refresh Token', async () => {
    setAccessToken(access_token_1s)
    setRefreshToken(refresh_token_1000days)
    const response = await _http.get('/me')
    expect(response.status).toBe(HttpStatusCode.Ok)
  })
})
