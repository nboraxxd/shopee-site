import { lazy } from 'react'
import { PATH } from '@/constants/path'
import { PrivateRouter } from '@/components/Routers'

const UserLayout = lazy(() => import('@/pages/User/layout/UserLayout/UserLayout'))
const Profile = lazy(() => import('@/pages/User/pages/Profile/Profile'))
const ChangePassword = lazy(() => import('@/pages/User/pages/ChangePassword/ChangePassword'))
const PurchasesHistory = lazy(() => import('@/pages/User/pages/PurchasesHistory/PurchasesHistory'))

export const user = {
  element: <PrivateRouter />,
  children: [
    {
      path: PATH.user.index,
      element: <UserLayout />,
      children: [
        {
          path: PATH.user.profile,
          element: <Profile />,
        },
        {
          path: PATH.user.password,
          element: <ChangePassword />,
        },
        {
          path: PATH.user.purchase,
          element: <PurchasesHistory />,
        },
      ],
    },
  ],
}
