import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/auth'
import { authService } from '../../services/auth'

export const AuthInit = ({ children }: { children: React.ReactNode }) => {
  const { token, setUser, logout, setIsLoading } = useAuthStore()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        setIsLoading(true)
        try {
          const user = await authService.getCurrentUser()
          setUser(user)
        } catch (error) {
          console.error('Failed to fetch user during session initialization:', error)
          logout() // Clears token & user on failure (e.g. 401, expired token)
        } finally {
          setIsLoading(false)
        }
      }
      setIsInitialized(true)
    }

    initializeAuth()
  }, [token, setUser, logout, setIsLoading])

  if (!isInitialized) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-primary"></div>
          <p className="text-sm font-medium text-muted-foreground">Initializing session...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
