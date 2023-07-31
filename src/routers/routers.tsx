import { ProductList } from '@/pages/ProductList'
import { auth } from './auth'

export const routers = [
  {
    index: true,
    element: <ProductList />,
  },

  auth,
]
