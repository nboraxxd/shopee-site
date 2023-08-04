import { MainLayout } from '@/layouts/MainLayout'
import { ProductList } from '@/pages/ProductList'
import { authentication } from './authentication'
import { profile } from './profile'

export const routers = [
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ProductList />,
      },
    ],
  },

  authentication,

  profile,
]
