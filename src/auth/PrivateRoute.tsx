import { Navigate } from "react-router-dom"
import { ReactNode } from "react"
import { jwtDecode } from "jwt-decode"

interface PrivateRouteProps {
  children: ReactNode
}

interface JwtPayload {
  exp: number
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/login" replace />
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token)
    const isExpired = decoded.exp * 1000 < Date.now()

    if (isExpired) {
      localStorage.removeItem("token")
      return <Navigate to="/login" replace />
    }

    return children
  } catch {
    localStorage.removeItem("token")
    return <Navigate to="/login" replace />
  }
}