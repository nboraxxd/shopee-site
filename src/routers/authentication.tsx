import { PATH } from '@/config/path'
import { AuthRouter } from '@/components/Routers'
import { AuthenticationLayout } from '@/layouts/AuthenticationLayout'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'

export const authentication = {
  element: <AuthRouter />,
  children: [
    {
      element: <AuthenticationLayout />,
      children: [
        {
          path: PATH.login,
          element: <Login />,
        },
        {
          path: PATH.signup,
          element: <Register />,
        },
      ],
    },
  ],
}
