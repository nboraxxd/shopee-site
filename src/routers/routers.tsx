import { PATH } from '@/constants/path'
import { authentication } from './authentication'
import { profile } from './profile'
import { MainLayout } from '@/layouts/MainLayout'
import { ProductList } from '@/pages/ProductList'
import { ProductDetail } from '@/pages/ProductDetail'
import { PrivateRouter } from '@/components/Routers'
import { Cart } from '@/pages/Cart'

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

  {
    element: <PrivateRouter />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: PATH.cart,
            element: <Cart />,
          },
        ],
      },
    ],
  },
]
