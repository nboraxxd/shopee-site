import { PATH } from '@/constants/path'
import { PrivateRouter } from '@/components/Routers'
import { UserLayout } from '@/pages/User/layout/UserLayout'
import { Profile } from '@/pages/User/pages/Profile'
import { ChangePassword } from '@/pages/User/pages/ChangePassword'
import { HistoryPurchases } from '@/pages/User/pages/HistoryPurchases'

export const profile = {
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
          paht: PATH.user.purchase,
          element: <HistoryPurchases />,
        },
      ],
    },
  ],
}
