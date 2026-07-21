import { useState } from 'react'
import { LogOut, Shield } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { ConfirmationDialog } from '../common/ConfirmationDialog'
import { useAuthStore } from '../../store/auth'

export function AccountCard() {
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    // Small delay for UX feedback
    await new Promise((r) => setTimeout(r, 400))
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <>
      <Card className="border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-900 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="pt-6 px-6 pb-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <Shield className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Account
              </h2>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                Manage your session and account access
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          <Separator className="my-4" />

          {/* Account info row */}
          <div className="flex items-center justify-between py-2 mb-4">
            <div>
              <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-0.5">
                Signed in as
              </p>
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 truncate max-w-[200px]">
                {user?.email || '—'}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50">
              Active session
            </span>
          </div>

          {/* Danger zone */}
          <div className="rounded-xl border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 p-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 mb-0.5">
                  Sign out
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  You will be redirected to the login page.
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setLogoutDialogOpen(true)}
                className="gap-2 cursor-pointer shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ConfirmationDialog
        open={logoutDialogOpen}
        title="Sign out"
        description="Are you sure you want to sign out? Your session will end and you'll need to log in again to access the dashboard."
        confirmLabel="Sign out"
        cancelLabel="Stay signed in"
        variant="destructive"
        isPending={isLoggingOut}
        onConfirm={handleLogout}
        onClose={() => setLogoutDialogOpen(false)}
      />
    </>
  )
}
