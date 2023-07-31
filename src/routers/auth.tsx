import { PATH } from '@/config/path'
import { RegisterLayout } from '@/layouts/RegisterLayout'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'

export const auth = {
  element: <RegisterLayout />,
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
}
