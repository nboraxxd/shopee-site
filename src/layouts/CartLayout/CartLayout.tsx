import { Footer } from '@/components/Footer'
import { CartHeader } from '@/pages/Cart/components/CartHeader'
import { Outlet } from 'react-router-dom'

export default function CartLayout() {
  return (
    <>
      <CartHeader />
      <Outlet />
      <Footer />
    </>
  )
}
