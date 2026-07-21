import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'
import { authService } from '../../../services/auth'
import { useAuthStore } from '../../../store/auth'
import { getRoleHomePath } from '../../../lib/roleRoutes'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must not exceed 100 characters'),
    email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

type ApiError = {
  response?: {
    data?: {
      detail?: string
    }
  }
}

const RegisterPage = () => {
  const navigate = useNavigate()
  const { login: setAuthData } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [backendError, setBackendError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      // 1. Call registration endpoint (requires full_name)
      await authService.register({
        full_name: data.name,
        email: data.email,
        password: data.password,
      })

      // 2. Perform automatic login to fetch access token
      const tokenData = await authService.login({
        email: data.email,
        password: data.password,
      })

      // Temporary token storage to allow GET /auth/me request to succeed in interceptor
      useAuthStore.getState().setToken(tokenData.access_token)

      // 3. Retrieve user profile info
      const userData = await authService.getCurrentUser()

      return { tokenData, userData }
    },
    onSuccess: ({ tokenData, userData }) => {
      setAuthData(tokenData.access_token, userData)
      navigate(getRoleHomePath(userData.role), { replace: true })
    },
    onError: (error: unknown) => {
      // Clean up token in case of partial error
      useAuthStore.getState().setToken(null)
      const message =
        (error as ApiError).response?.data?.detail || 'Registration failed. Email might already exist.'
      setBackendError(message)
    },
  })

  const onSubmit = (data: RegisterFormData) => {
    setBackendError(null)
    registerMutation.mutate(data)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-radial from-zinc-50 to-zinc-200 dark:from-zinc-900 dark:to-zinc-950 px-4 py-12">
      {/* Decorative ambient light leaks */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-8 shadow-2xl transition-all duration-300">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 mb-4 transition-transform hover:scale-105 duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-white"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 m-0">
              Create an account
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm">
              Sign up to set up your customer support space
            </p>
          </div>

          {backendError && (
            <div className="mb-6 flex items-start gap-3 bg-destructive/10 dark:bg-destructive/15 border border-destructive/20 dark:border-destructive/30 text-destructive text-sm rounded-lg p-3.5">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{backendError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Lalit Kumar"
                {...register('name')}
                className={`bg-zinc-50/50 dark:bg-zinc-950/30 border ${
                  errors.name ? 'border-destructive focus-visible:ring-destructive' : 'border-zinc-200 dark:border-zinc-800'
                } h-11 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-purple-600 transition-all`}
              />
              {errors.name && (
                <p className="text-destructive text-xs font-medium mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                className={`bg-zinc-50/50 dark:bg-zinc-950/30 border ${
                  errors.email ? 'border-destructive focus-visible:ring-destructive' : 'border-zinc-200 dark:border-zinc-800'
                } h-11 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-purple-600 transition-all`}
              />
              {errors.email && (
                <p className="text-destructive text-xs font-medium mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  className={`bg-zinc-50/50 dark:bg-zinc-950/30 border ${
                    errors.password ? 'border-destructive focus-visible:ring-destructive' : 'border-zinc-200 dark:border-zinc-800'
                  } h-11 pr-10 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-purple-600 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-destructive text-xs font-medium mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('confirmPassword')}
                  className={`bg-zinc-50/50 dark:bg-zinc-950/30 border ${
                    errors.confirmPassword ? 'border-destructive focus-visible:ring-destructive' : 'border-zinc-200 dark:border-zinc-800'
                  } h-11 pr-10 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-purple-600 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-destructive text-xs font-medium mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full h-11 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md shadow-purple-500/10 hover:shadow-lg hover:shadow-purple-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {registerMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-150 dark:border-zinc-800/80 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
