import { MainLayout } from '@/layouts/MainLayout'
import { ProductList } from '@/pages/ProductList'
import { authentication } from './authentication'
import { profile } from './profile'
import { PATH } from '@/constants/path'

export const routers = [
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ProductList />,
      },
      {
        path: PATH.products,
        element: <ProductList />,
      },
    ],
  },

  authentication,

  profile,
]
