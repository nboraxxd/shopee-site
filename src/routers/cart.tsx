import { PATH } from '@/constants/path'
import { PrivateRouter } from '@/components/Routers'
import { CartLayout } from '@/layouts/CartLayout'
import { Cart } from '@/pages/Cart'

export const cart = {
  element: <PrivateRouter />,
  children: [
    {
      element: <CartLayout />,
      children: [
        {
          path: PATH.cart,
          element: <Cart />,
        },
      ],
    },
  ],
}
