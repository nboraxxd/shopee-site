import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/Footer'
import { RegisterHeader } from '@/components/RegisterHeader'

export default function AuthenticationLayout() {
  return (
    <>
      <RegisterHeader />
      <Outlet />
      <Footer />
    </>
  )
}
