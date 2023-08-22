import { lazy } from 'react'
import { PATH } from '@/constants/path'
import { authentication } from './authentication'
import { cart } from './cart'
import { user } from './user'

const MainLayout = lazy(() => import('@/layouts/MainLayout/MainLayout'))
const ProductList = lazy(() => import('@/pages/ProductList/components/ProductList/ProductList'))
const ProductDetail = lazy(() => import('@/pages/ProductDetail/components/ProductDetail/ProductDetail'))
const NotFound = lazy(() => import('@/pages/NotFound/NotFound'))

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

  {
    path: PATH.notFound,
    element: <NotFound />,
  },
]
