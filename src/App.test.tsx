import { describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'

describe('App', () => {
  it('App render và chuyển trang', async () => {
    render(<App />, {
      wrapper: BrowserRouter,
    })
    const user = userEvent.setup()
    /**
     * waitFor sẽ run callback 1 vài lần
     * cho đến khi hết timeout
     * số lần run phụ thuộc vào timeout và interval
     * mặc định: timeout = 1000ms và interval = 50ms
     */

    // Verify vào đúng trang chủ
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee clone')
    })

    // Verify chuyển sang trang login
    await user.click(screen.getByText(/Đăng Nhập/i))
    // await waitFor(() => {})

    screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })
})
