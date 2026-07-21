import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types/auth'

const AUTH_STORAGE_KEY = 'auth-storage'

const removeStoredToken = () => {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  setToken: (token: string | null) => void
  setUser: (user: User | null) => void
  login: (token: string, user: User) => void
  logout: () => void
  setError: (error: string | null) => void
  setIsLoading: (isLoading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      setToken: (token) => {
        set((state) => ({
          token,
          user: token ? state.user : null,
          isAuthenticated: token ? state.isAuthenticated : false,
          error: token ? state.error : null,
        }))
        if (!token) {
          removeStoredToken()
        }
      },
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: (token, user) =>
        set({
          token,
          user,
          isAuthenticated: true,
          error: null,
        }),
      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          error: null,
        })
        removeStoredToken()
      },
      setError: (error) => set({ error }),
      setIsLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'auth-storage',
      // Only persist the token, user info will be re-fetched on refresh if token exists
      partialize: (state) => ({ token: state.token }),
    }
  )
)
