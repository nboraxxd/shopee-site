import { AppContext } from '@/contexts/app.context'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRouter() {
  const { isAuthenticated } = useContext(AppContext)

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
