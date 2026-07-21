export type UserRole = 'admin' | 'customer' | string

export interface User {
  id: number;
  full_name: string | null;
  email: string;
  is_active: boolean;
  role: UserRole;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface UserResponse extends User {}
