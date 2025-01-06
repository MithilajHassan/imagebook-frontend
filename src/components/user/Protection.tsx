import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoutes() {
  const { userInfo } = useSelector((state: RootState) => state.auth)
  return userInfo ? <Outlet /> : <Navigate to="/signin" />
}