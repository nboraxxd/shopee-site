import { PATH } from '@/constants/path'
import { delay, renderWithRouter } from '@/utils/__test__/testUtils'
import { describe, expect, it } from 'vitest'

describe('ProductDetail', () => {
  it('Render UI ProductDetail', async () => {
    renderWithRouter({
      route: `${PATH.products}/Điện-thoại-Apple-Iphone-12-64GB--Hàng-chính-hãng-VNA-id60afb1c56ef5b902180aacb8`,
    })
    await delay(2000)
    expect(document.body).toMatchSnapshot()
  })
})
