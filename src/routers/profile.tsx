import { PATH } from '@/config/path'
import { PrivateRouter } from '@/components/Routers'
import { MainLayout } from '@/layouts/MainLayout'
import { Profile } from '@/pages/Profile'

export const profile = {
  element: <PrivateRouter />,
  children: [
    {
      element: <MainLayout />,
      children: [
        {
          path: PATH.profile,
          element: <Profile />,
        },
      ],
    },
  ],
}
