import { PATH } from '@/constants/path'
import { logScreen, renderWithRouter } from '@/utils/__test__/testUtils'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'

describe('Login', () => {
  beforeAll(async () => {
    renderWithRouter({ route: PATH.login })

    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee clone')
    })
  })

  it('Hiển thị lỗi required khi không nhập gì', async () => {
    const submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement
    fireEvent.submit(submitButton)
    expect(await screen.findByText('Vui lòng nhập email')).toBeTruthy()
    expect(await screen.findByText('Vui lòng nhập password')).toBeTruthy()
    await logScreen()
  })

  it('Hiển thị lỗi khi nhập không đúng định dạng', async () => {
    const emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    const passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
    const submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement

    fireEvent.change(emailInput, {
      target: {
        value: 'test@',
      },
    })

    fireEvent.change(passwordInput, {
      target: {
        value: 'test',
      },
    })

    fireEvent.submit(submitButton)
    expect(await screen.findAllByText('Email chưa đúng định dạng')).toBeTruthy()
    expect(await screen.findAllByText('Password phải có tối thiểu 6 ký tự')).toBeTruthy()
  })
})
