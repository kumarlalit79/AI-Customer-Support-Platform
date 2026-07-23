import { Settings } from 'lucide-react'
import { ProfileCard } from '../../../components/settings/ProfileCard'
import { AccountCard } from '../../../components/settings/AccountCard'
import { AppearanceCard } from '../../../components/settings/AppearanceCard'
import { AboutCard } from '../../../components/settings/AboutCard'
import { useAuthStore } from '../../../store/auth'

export default function SettingsPage() {
  const { user } = useAuthStore()

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-md shadow-purple-500/20">
          <Settings className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Settings
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Manage your profile, preferences, and account
          </p>
        </div>
      </div>

      <ProfileCard user={user} />
      <AccountCard />
      <AppearanceCard />
      <AboutCard />
    </div>
  )
}
