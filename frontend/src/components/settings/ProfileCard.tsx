import { User, Mail, Camera } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Separator } from '../ui/separator'
import type { User as UserType } from '../../types/auth'

interface ProfileCardProps {
  user: UserType | null
}

function Avatar({ name }: { name: string | null }) {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?'

  return (
    <div className="relative inline-flex">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-purple-500/25 select-none">
        {initials}
      </div>
      {/* Avatar overlay hint */}
      <div className="absolute inset-0 rounded-2xl bg-black/0 hover:bg-black/30 flex items-center justify-center transition-all duration-200 cursor-not-allowed opacity-0 hover:opacity-100">
        <Camera className="w-5 h-5 text-white" />
      </div>
    </div>
  )
}

function ProfileField({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string | null | undefined
}) {
  return (
    <div className="flex items-start gap-3.5 py-3.5">
      <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 truncate">
          {value || <span className="text-zinc-400 dark:text-zinc-600 font-normal italic">Not set</span>}
        </p>
      </div>
    </div>
  )
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card className="border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-900 shadow-sm rounded-2xl overflow-hidden">
      <CardHeader className="pb-0 pt-6 px-6">
        <div className="flex items-start gap-5">
          <Avatar name={user?.full_name ?? null} />
          <div className="flex-1 min-w-0 pt-1">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight truncate">
              {user?.full_name || 'Agent'}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
              {user?.email || 'No email on record'}
            </p>
            <span
              className={`inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                user?.is_active
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  user?.is_active ? 'bg-emerald-500' : 'bg-zinc-400'
                }`}
              />
              {user?.is_active ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <Separator className="my-4" />

        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          <ProfileField icon={User} label="Full name" value={user?.full_name} />
          <ProfileField icon={Mail} label="Email address" value={user?.email} />
        </div>

        <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-600 italic">
          To update your profile information, please contact your administrator.
        </p>
      </CardContent>
    </Card>
  )
}
