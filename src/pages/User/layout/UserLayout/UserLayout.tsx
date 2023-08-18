import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { PATH } from '@/constants/path'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { UserSideNav } from '@/pages/User/components/UserSideNav'

export default function UserLayout() {
  const location = useLocation()
  const { pathname } = location
  if (pathname === `${PATH.user.index}/` || pathname === PATH.user.index) {
    return <Navigate to={PATH.user.profile} />
  }

  return (
    <>
      <Header />
      <div className="flex">
        <UserSideNav />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  )
}
