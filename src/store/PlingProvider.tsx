import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { createPlingClient } from '../api/client'
import { computeTodayStats } from '../lib/stats'
import { clearPersisted, loadPersisted, savePersisted, type PersistedState } from '../lib/storage'
import type { Call, DataSource, Job, Message, Tenant, TodayStats } from '../types'

type PlingContextValue = {
  ready: boolean
  source: DataSource
  tenant: Tenant
  calls: Call[]
  messages: Message[]
  jobs: Job[]
  stats: TodayStats
  unhandledMessages: Message[]
  demoDismissed: boolean
  markCallHandled: (id: string) => void
  markMessageHandled: (id: string) => void
  updateTenant: (patch: Pick<Tenant, 'name' | 'phone' | 'city'>) => void
  dismissDemo: () => void
  resetDemo: () => void
}

const PlingContext = createContext<PlingContextValue | null>(null)

function applyPersistence(
  calls: Call[],
  messages: Message[],
  tenant: Tenant,
  persisted: PersistedState,
): { calls: Call[]; messages: Message[]; tenant: Tenant } {
  const handledCalls = new Set(persisted.handledCallIds)
  const handledMessages = new Set(persisted.handledMessageIds)
  const now = new Date().toISOString()
  return {
    tenant: persisted.tenant ? { ...tenant, ...persisted.tenant } : tenant,
    calls: calls.map((call) =>
      handledCalls.has(call.id) && !call.handledAt ? { ...call, handledAt: now } : call,
    ),
    messages: messages.map((message) =>
      handledMessages.has(message.id) && !message.handledAt
        ? { ...message, handledAt: now }
        : message,
    ),
  }
}

export function PlingProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => createPlingClient(), [])
  const [ready, setReady] = useState(false)
  const [source, setSource] = useState<DataSource>(client.source)
  const [tenant, setTenant] = useState<Tenant>({
    id: 'oslo-ror-varme',
    name: 'Oslo Rør & Varme',
    phone: '415 84 000',
    city: 'Oslo',
  })
  const [calls, setCalls] = useState<Call[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [demoDismissed, setDemoDismissed] = useState(false)
  const [persisted, setPersisted] = useState<PersistedState>(loadPersisted)

  useEffect(() => {
    const stored = loadPersisted()
    let cancelled = false
    client
      .load()
      .then((snapshot) => {
        if (cancelled) return
        const next = applyPersistence(snapshot.calls, snapshot.messages, snapshot.tenant, stored)
        setSource(snapshot.source)
        setTenant(next.tenant)
        setCalls(next.calls)
        setMessages(next.messages)
        setJobs(snapshot.jobs)
        setDemoDismissed(stored.demoDismissed)
        setReady(true)
      })
      .catch(() => {
        if (cancelled) return
        setReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [client])

  const write = useCallback((next: PersistedState) => {
    setPersisted(next)
    savePersisted(next)
  }, [])

  const markCallHandled = useCallback(
    (id: string) => {
      const now = new Date().toISOString()
      setCalls((prev) => prev.map((call) => (call.id === id ? { ...call, handledAt: now } : call)))
      write({
        ...persisted,
        handledCallIds: persisted.handledCallIds.includes(id)
          ? persisted.handledCallIds
          : [...persisted.handledCallIds, id],
      })
      void client.markCallHandled(id)
    },
    [client, persisted, write],
  )

  const markMessageHandled = useCallback(
    (id: string) => {
      const now = new Date().toISOString()
      setMessages((prev) =>
        prev.map((message) => (message.id === id ? { ...message, handledAt: now } : message)),
      )
      write({
        ...persisted,
        handledMessageIds: persisted.handledMessageIds.includes(id)
          ? persisted.handledMessageIds
          : [...persisted.handledMessageIds, id],
      })
      void client.markMessageHandled(id)
    },
    [client, persisted, write],
  )

  const updateTenant = useCallback(
    (patch: Pick<Tenant, 'name' | 'phone' | 'city'>) => {
      setTenant((prev) => ({ ...prev, ...patch }))
      write({ ...persisted, tenant: patch })
      void client.updateTenant(patch)
    },
    [client, persisted, write],
  )

  const dismissDemo = useCallback(() => {
    setDemoDismissed(true)
    write({ ...persisted, demoDismissed: true })
  }, [persisted, write])

  const resetDemo = useCallback(() => {
    clearPersisted()
    const empty: PersistedState = {
      v: 1,
      handledCallIds: [],
      handledMessageIds: [],
      demoDismissed: false,
    }
    setPersisted(empty)
    void client.load().then((snapshot) => {
      setSource(snapshot.source)
      setTenant(snapshot.tenant)
      setCalls(snapshot.calls)
      setMessages(snapshot.messages)
      setJobs(snapshot.jobs)
      setDemoDismissed(false)
    })
  }, [client])

  const stats = useMemo(() => computeTodayStats(calls), [calls])
  const unhandledMessages = useMemo(
    () => messages.filter((message) => !message.handledAt),
    [messages],
  )

  const value = useMemo<PlingContextValue>(
    () => ({
      ready,
      source,
      tenant,
      calls,
      messages,
      jobs,
      stats,
      unhandledMessages,
      demoDismissed,
      markCallHandled,
      markMessageHandled,
      updateTenant,
      dismissDemo,
      resetDemo,
    }),
    [
      ready,
      source,
      tenant,
      calls,
      messages,
      jobs,
      stats,
      unhandledMessages,
      demoDismissed,
      markCallHandled,
      markMessageHandled,
      updateTenant,
      dismissDemo,
      resetDemo,
    ],
  )

  return <PlingContext.Provider value={value}>{children}</PlingContext.Provider>
}

// Hook lives next to the provider; split files would only satisfy the refresh lint.
// eslint-disable-next-line react-refresh/only-export-components
export function usePling(): PlingContextValue {
  const ctx = useContext(PlingContext)
  if (!ctx) throw new Error('usePling must be used within PlingProvider')
  return ctx
}
