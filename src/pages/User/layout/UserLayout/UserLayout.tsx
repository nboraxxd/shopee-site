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
      <div className="bg-secondary pb-12 pt-6 text-sm text-gray-600">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <UserSideNav />
            <main className="md:col-span-9 md:ml-6 lg:col-span-10">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
