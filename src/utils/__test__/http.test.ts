import type { AxiosInstance } from 'axios'
import { beforeEach, describe, expect, it } from 'vitest'
import { http } from '@/utils/http'
import HttpStatusCode from '@/constants/httpStatusCode.enum'
import { setAccessToken, setRefreshToken } from '@/utils/token'
import { access_token_1s, refresh_token_1000days } from '@/msw/auth.msw'

describe('http axios', () => {
  let _http: AxiosInstance

  beforeEach(() => {
    localStorage.clear
    _http = http
  })

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
