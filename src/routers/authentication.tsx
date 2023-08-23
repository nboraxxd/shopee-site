import { lazy } from 'react'
import { PATH } from '@/constants/path'
import { AuthRouter } from '@/components/Routers'

const AuthenticationLayout = lazy(() => import('@/layouts/AuthenticationLayout/AuthenticationLayout'))
const Login = lazy(() => import('@/pages/Login/Login'))
const Register = lazy(() => import('@/pages/Register/Register'))

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
          path: PATH.register,
          element: <Register />,
        },
      ],
    },
  ],
}
