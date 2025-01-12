import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoutes() {
  const { token } = useSelector((state: RootState) => state.auth)
  return token ? <Outlet /> : <Navigate to="/signin" />
}