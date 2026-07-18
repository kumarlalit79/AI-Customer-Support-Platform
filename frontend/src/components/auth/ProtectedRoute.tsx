import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuthStore } from '../../store/auth'

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore()
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

  if (!isAuthenticated) {
    // Redirect to login page and store the attempted path
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
