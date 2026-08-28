import { seedSnapshot } from '../data/mock'
import { computeTodayStats } from '../lib/stats'
import type {
  Call,
  DashboardSnapshot,
  Job,
  Message,
  PlingClient,
  Tenant,
  TodayStats,
} from '../types'

type ApiPayload = {
  tenant: Tenant
  calls: Call[]
  messages: Message[]
  jobs: Job[]
  stats?: TodayStats
}

class MockPlingClient implements PlingClient {
  source = 'mock' as const

  async load(): Promise<DashboardSnapshot> {
    return seedSnapshot()
  }

  async markCallHandled(): Promise<void> {
    return
  }

  async markMessageHandled(): Promise<void> {
    return
  }

  async updateTenant(patch: Pick<Tenant, 'name' | 'phone' | 'city'>): Promise<Tenant> {
    return { ...seedSnapshot().tenant, ...patch }
  }
}

class HttpPlingClient implements PlingClient {
  source = 'api' as const

  constructor(private readonly baseUrl: string) {}

  private url(path: string): string {
    return `${this.baseUrl.replace(/\/$/, '')}${path}`
  }

  async load(): Promise<DashboardSnapshot> {
    const res = await fetch(this.url('/v1/dashboard'))
    if (!res.ok) {
      throw new Error(`Pling API responded ${res.status}`)
    }
    const data = (await res.json()) as ApiPayload
    return {
      tenant: data.tenant,
      calls: data.calls,
      messages: data.messages,
      jobs: data.jobs,
      stats: data.stats ?? computeTodayStats(data.calls),
      source: 'api',
    }
  }

  async markCallHandled(id: string): Promise<void> {
    const res = await fetch(this.url(`/v1/calls/${id}/handled`), { method: 'POST' })
    if (!res.ok) throw new Error(`Could not mark call ${id} handled`)
  }

  async markMessageHandled(id: string): Promise<void> {
    const res = await fetch(this.url(`/v1/messages/${id}/handled`), { method: 'POST' })
    if (!res.ok) throw new Error(`Could not mark message ${id} handled`)
  }

  async updateTenant(patch: Pick<Tenant, 'name' | 'phone' | 'city'>): Promise<Tenant> {
    const res = await fetch(this.url('/v1/tenant'), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    })
    if (!res.ok) throw new Error('Could not update tenant')
    return (await res.json()) as Tenant
  }
}

export function createPlingClient(): PlingClient {
  const base = import.meta.env.VITE_PLING_API_URL?.trim()
  if (base) return new HttpPlingClient(base)
  return new MockPlingClient()
}
