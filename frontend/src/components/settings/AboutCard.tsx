import { useEffect, useState } from 'react'
import { Info, Server, Monitor, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Separator } from '../ui/separator'
import apiClient from '../../lib/axios'

const APP_VERSION = '1.0.0'
const FRONTEND_VERSION = '1.0.0'

type BackendStatus = 'checking' | 'online' | 'offline'

interface InfoRowProps {
  icon: React.ElementType
  label: string
  value: React.ReactNode
}

function InfoRow({ icon: Icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
          <Icon className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
        </div>
        <span className="text-sm text-zinc-600 dark:text-zinc-400">{label}</span>
      </div>
      <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
        {value}
      </span>
    </div>
  )
}

function BackendStatusBadge({ status }: { status: BackendStatus }) {
  if (status === 'checking') {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400">
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        Checking…
      </span>
    )
  }
  if (status === 'online') {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
        <CheckCircle2 className="w-4 h-4" />
        Online
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-500 dark:text-red-400">
      <XCircle className="w-4 h-4" />
      Offline
    </span>
  )
}

export function AboutCard() {
  const [backendStatus, setBackendStatus] = useState<BackendStatus>('checking')

  useEffect(() => {
    let cancelled = false
    const check = async () => {
      try {
        // A lightweight health-check — if the backend responds with anything, it's online
        await apiClient.get('/health', { timeout: 5000 })
        if (!cancelled) setBackendStatus('online')
      } catch {
        if (!cancelled) setBackendStatus('offline')
      }
    }
    check()
    return () => { cancelled = true }
  }, [])

  return (
    <Card className="border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-900 shadow-sm rounded-2xl overflow-hidden">
      <CardHeader className="pt-6 px-6 pb-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <Info className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              About
            </h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Platform information and status
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <Separator className="my-4" />

        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          <InfoRow
            icon={Info}
            label="App Version"
            value={`v${APP_VERSION}`}
          />
          <InfoRow
            icon={Monitor}
            label="Frontend Version"
            value={`v${FRONTEND_VERSION}`}
          />
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                <Server className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
              </div>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Backend Status
              </span>
            </div>
            <BackendStatusBadge status={backendStatus} />
          </div>
        </div>

        <p className="mt-5 text-xs text-zinc-400 dark:text-zinc-600 leading-relaxed">
          AI Customer Support Platform — built with React, FastAPI, and RAG-powered knowledge retrieval.
        </p>
      </CardContent>
    </Card>
  )
}
