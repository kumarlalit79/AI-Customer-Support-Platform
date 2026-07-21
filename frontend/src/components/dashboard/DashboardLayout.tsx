import { useState } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router'
import {
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  MessageCircle,
  Settings,
  LogOut,
  Menu,
  X,
  User,
} from 'lucide-react'
import { Button } from '../ui/button'
import { useAuthStore } from '../../store/auth'

export const DashboardLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuthStore()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Chat Agent', path: '/dashboard/chat', icon: <MessageCircle className="w-5 h-5" /> },
    { label: 'Conversations', path: '/dashboard/conversations', icon: <MessageSquare className="w-5 h-5" /> },
    { label: 'Knowledge Base', path: '/dashboard/knowledge', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'Settings', path: '/dashboard/settings', icon: <Settings className="w-5 h-5" /> },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-zinc-900 text-zinc-300 border-r border-zinc-850 w-64 select-none">
      <div className="p-6 flex items-center gap-3 border-b border-zinc-800">
        <div className="w-9 h-9 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="w-5 h-5 text-white"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <div className="text-left min-w-0">
          <span className="font-extrabold text-zinc-50 block tracking-tight truncate">Support AI</span>
          <span className="text-xs text-zinc-500 font-medium block">Console Panel</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-250 cursor-pointer ${
                isActive
                  ? 'bg-purple-600 text-zinc-50 shadow-md shadow-purple-900/30'
                  : 'hover:bg-zinc-800/60 hover:text-zinc-100 text-zinc-400'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800 bg-zinc-950/40">
        <div className="flex items-center gap-3 px-2 py-3 rounded-lg min-w-0">
          <div className="w-9 h-9 bg-zinc-800 rounded-full flex items-center justify-center shrink-0 border border-zinc-700 text-zinc-400">
            <User className="w-5 h-5" />
          </div>
          <div className="text-left min-w-0 flex-1">
            <p className="text-sm font-bold text-zinc-200 truncate">{user?.full_name || 'Agent'}</p>
            <p className="text-xs text-zinc-500 truncate mt-0.5">{user?.email || 'admin@support.com'}</p>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-3 h-11 px-4 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-850 font-semibold cursor-pointer mt-2"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 relative">
      <div className="hidden lg:block shrink-0 h-screen sticky top-0">
        <SidebarContent />
      </div>

      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="w-4 h-4 text-white"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span className="font-extrabold text-zinc-50 tracking-tight text-sm">Support AI</span>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="text-zinc-300 hover:text-white p-2 focus:outline-none"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={toggleMobileMenu}
          />
          <div className="relative z-50 flex flex-col h-full">
            <SidebarContent />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 pt-16 lg:pt-0">
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
export default DashboardLayout
