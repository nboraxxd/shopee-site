import { PATH } from '@/constants/path'
import { logScreen, renderWithRouter } from '@/utils/__test__/testUtils'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'

describe('Login', () => {
  let emailInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let submitButton: HTMLButtonElement

  beforeAll(async () => {
    renderWithRouter({ route: PATH.login })

    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee clone')
    })

    emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
    submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement
  })

  it('Hiển thị lỗi required khi không nhập gì', async () => {
    fireEvent.submit(submitButton)
    await waitFor(() => {
      expect(screen.queryByText('Vui lòng nhập email')).toBeTruthy()
      expect(screen.queryByText('Vui lòng nhập password')).toBeTruthy()
    })
  })

  it('Hiển thị lỗi khi nhập value input không đúng định dạng', async () => {
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
    // Những trường hợp chứng minh rằng tìm không ra text hay là element
    // Thì nên dùng query hơn là find hay get
    fireEvent.submit(submitButton)
    await waitFor(() => {
      expect(screen.findAllByText('Email chưa đúng định dạng')).toBeTruthy()
      expect(screen.findAllByText('Password phải có tối thiểu 6 ký tự')).toBeTruthy()
    })
  })

  it('Xoá lỗi khi nhập lại value input đúng', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'test@gmail.com',
      },
    })

    fireEvent.change(passwordInput, {
      target: {
        value: 'Abc12345',
      },
    })

    await waitFor(() => {
      expect(screen.queryByText('Email chưa đúng định dạng')).toBeFalsy()
      expect(screen.queryByText('Password phải có tối thiểu 6 ký tự')).toBeFalsy()
    })

    fireEvent.submit(submitButton)
    await logScreen()
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee clone')
    })
  })
})
