import { Navigate, Outlet } from 'react-router-dom'

export default function AuthRouter() {
  const isAuthenticated = false

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />
}
