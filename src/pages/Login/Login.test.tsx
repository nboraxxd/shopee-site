import { PATH } from '@/constants/path'
import { logScreen, renderWithRouter } from '@/utils/__test__/testUtils'
import { screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('Login', () => {
  it('Hiển thị lỗi required khi không nhập gì', async () => {
    const { user } = renderWithRouter({ route: PATH.login })
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee clone')
    })
    const submitButton = document.querySelector('form button[type="submit"]') as Element
    user.click(submitButton)
    expect(await screen.findByText('Vui lòng nhập email')).toBeTruthy()
    expect(await screen.findByText('Vui lòng nhập password')).toBeTruthy()
    await logScreen()
  })
})
