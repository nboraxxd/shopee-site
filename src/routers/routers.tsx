import { PATH } from '@/constants/path'
import { authentication } from './authentication'
import { profile } from './profile'
import { MainLayout } from '@/layouts/MainLayout'
import { ProductList } from '@/pages/ProductList'
import { ProductDetail } from '@/pages/ProductDetail'

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
      {
        path: PATH.productDetail,
        element: <ProductDetail />,
      },
    ],
  },

  authentication,

  profile,
]
