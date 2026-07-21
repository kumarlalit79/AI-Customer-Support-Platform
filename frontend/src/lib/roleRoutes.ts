import type { UserRole } from '../types/auth'

export const getRoleHomePath = (role?: UserRole | null) => {
  if (role === 'customer') {
    return '/support'
  }

  return '/dashboard'
}
