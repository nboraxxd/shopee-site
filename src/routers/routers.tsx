import { PATH } from '@/constants/path'
import { MainLayout } from '@/layouts/MainLayout'
import { ProductDetail } from '@/pages/ProductDetail'
import { ProductList } from '@/pages/ProductList'
import { authentication } from './authentication'
import { cart } from './cart'
import { user } from './user'

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

  user,

  cart,
]
