import { Navigate } from 'react-router-dom'
import { getAuthUser } from './auth'

function ProtectedRoute({ children }) {
  const authUser = getAuthUser()
  return authUser ? children : <Navigate to="/" replace />
}

export default ProtectedRoute
