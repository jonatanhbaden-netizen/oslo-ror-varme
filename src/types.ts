export type Priority = 'critical' | 'urgent' | 'normal'

export type CallOutcome = 'booked' | 'needs_action' | 'info'

export type JobStatus = 'confirmed' | 'scheduled' | 'unconfirmed'

export type DataSource = 'mock' | 'api'

export type Tenant = {
  id: string
  name: string
  phone: string
  city: string
}

export type Call = {
  id: string
  callerName: string | null
  phone: string
  startedAt: string
  durationSec: number
  summary: string
  topic: string
  urgent: boolean
  outcome: CallOutcome
  handledAt: string | null
  address?: string
  jobId?: string
}

export type Message = {
  id: string
  senderName: string | null
  phone: string
  sentAt: string
  text: string
  priority: Priority
  handledAt: string | null
  address?: string
}

export type Job = {
  id: string
  customerName: string
  phone: string
  startsAt: string
  address: string
  title: string
  notes: string
  status: JobStatus
}

export type TodayStats = {
  calls: number
  booked: number
  needsAction: number
  avgDurationSec: number
}

export type DashboardSnapshot = {
  tenant: Tenant
  calls: Call[]
  messages: Message[]
  jobs: Job[]
  stats: TodayStats
  source: DataSource
}

export type PlingClient = {
  source: DataSource
  load(): Promise<DashboardSnapshot>
  markCallHandled(id: string): Promise<void>
  markMessageHandled(id: string): Promise<void>
  updateTenant(patch: Pick<Tenant, 'name' | 'phone' | 'city'>): Promise<Tenant>
}
