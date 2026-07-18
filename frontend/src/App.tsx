import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthInit } from './components/auth/AuthInit'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { PublicRoute } from './components/auth/PublicRoute'
import LoginPage from './app/auth/login/page'
import RegisterPage from './app/auth/register/page'
import DashboardLayout from './components/dashboard/DashboardLayout'
import DashboardPage from './app/dashboard/dashboard/page'
import KnowledgePage from './app/dashboard/knowledge/page'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

// Quick coming-soon placeholders for non-dashboard panels wrapped in DashboardLayout
const ComingSoonPlaceholder = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">{title} Page</h2>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm">
        This section is currently under development and will be released in the subsequent phases.
      </p>
    </div>
  )
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthInit>
        <BrowserRouter>
          <Routes>
            {/* Public routes (only accessible when logged out) */}
            <Route element={<PublicRoute />}>
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
            </Route>

            {/* Protected routes (only accessible when logged in) */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/dashboard/chat" element={<ComingSoonPlaceholder title="AI Chat Agent" />} />
                <Route path="/dashboard/conversations" element={<ComingSoonPlaceholder title="Conversations List" />} />
                <Route path="/dashboard/knowledge" element={<KnowledgePage />} />
                <Route path="/dashboard/settings" element={<ComingSoonPlaceholder title="Console Settings" />} />
              </Route>
            </Route>

            {/* Catch-all redirects */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthInit>
    </QueryClientProvider>
  )
}

export default App