import { Footer } from '@/components/Footer'
import { RegisterHeader } from '@/components/RegisterHeader'
import { Outlet } from 'react-router-dom'

export default function RegisterLayout() {
  return (
    <div>
      <RegisterHeader />
      <Outlet />
      <Footer />
    </div>
  )
}
