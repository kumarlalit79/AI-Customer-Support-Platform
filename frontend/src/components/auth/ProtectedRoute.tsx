import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuthStore } from '../../store/auth'
import { getRoleHomePath } from '../../lib/roleRoutes'

interface ProtectedRouteProps {
  allowedRoles?: string[]
}

const isRouteSection = (pathname: string, section: string) => (
  pathname === section || pathname.startsWith(`${section}/`)
)

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { token, user, isAuthenticated, isLoading } = useAuthStore()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-primary"></div>
          <p className="text-sm font-medium text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!token || !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (user?.role === 'customer' && isRouteSection(location.pathname, '/dashboard')) {
    return <Navigate to="/support" replace />
  }

  if (user?.role === 'admin' && isRouteSection(location.pathname, '/support')) {
    return <Navigate to="/dashboard" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user?.role || '')) {
    return <Navigate to={getRoleHomePath(user?.role)} replace />
  }

  return <Outlet />
}
