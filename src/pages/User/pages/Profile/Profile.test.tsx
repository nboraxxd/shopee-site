import { PATH } from '@/constants/path'
import { access_token } from '@/msw/auth.msw'
import { renderWithRouter } from '@/utils/__test__/testUtils'
import { setAccessToken } from '@/utils/token'
import { waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('Profile', () => {
  it('Hiển thị trang profile', async () => {
    setAccessToken(access_token)
    const { container } = renderWithRouter({ route: PATH.user.profile })
    await waitFor(() => {
      expect((container.querySelector('form input[placeholder="Bruce Wayne"]') as HTMLInputElement).value).toBe('hello')
    })
  })
})
