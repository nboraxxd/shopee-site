import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRouter() {
  const isAuthenticated = false

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
