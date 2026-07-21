import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '../../store/auth'
import { getRoleHomePath } from '../../lib/roleRoutes'

export const PublicRoute = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore()

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

  if (isAuthenticated) {
    return <Navigate to={getRoleHomePath(user?.role)} replace />
  }

  return <Outlet />
}
