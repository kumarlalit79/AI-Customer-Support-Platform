import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthInit } from './components/auth/AuthInit'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { PublicRoute } from './components/auth/PublicRoute'
import { ThemeProvider } from './components/common/ThemeProvider'
import LoginPage from './app/auth/login/page'
import RegisterPage from './app/auth/register/page'
import DashboardLayout from './components/dashboard/DashboardLayout'
import DashboardPage from './app/dashboard/dashboard/page'
import KnowledgePage from './app/dashboard/knowledge/page'
import ChatPage from './app/dashboard/chat/page'
import ConversationsPage from './app/dashboard/conversations/page'
import SettingsPage from './app/dashboard/settings/page'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthInit>
          <BrowserRouter>
            <Routes>
              {/* Public routes (only accessible when logged out) */}
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/auth/login" element={<Navigate to="/login" replace />} />
                <Route path="/auth/register" element={<Navigate to="/register" replace />} />
              </Route>

              {/* Protected routes (only accessible when logged in) */}
              <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/dashboard/chat" element={<ChatPage />} />
                  <Route path="/dashboard/conversations" element={<ConversationsPage />} />
                  <Route path="/dashboard/knowledge" element={<KnowledgePage />} />
                  <Route path="/dashboard/settings" element={<SettingsPage />} />
                </Route>
              </Route>

              {/* Catch-all redirects */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthInit>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
