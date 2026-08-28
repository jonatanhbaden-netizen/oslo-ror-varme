import type { Call, TodayStats } from '../types'

export function computeTodayStats(calls: Call[]): TodayStats {
  const booked = calls.filter((c) => c.outcome === 'booked').length
  const needsAction = calls.filter((c) => c.outcome === 'needs_action' && !c.handledAt).length
  const totalDuration = calls.reduce((sum, c) => sum + c.durationSec, 0)
  return {
    calls: calls.length,
    booked,
    needsAction,
    avgDurationSec: calls.length === 0 ? 0 : Math.round(totalDuration / calls.length),
  }
}

export function isUnhandledCall(call: Call): boolean {
  return call.outcome === 'needs_action' && !call.handledAt
}

export type TodayFilter = 'all' | 'needs_action' | 'urgent'

export function filterCalls(calls: Call[], filter: TodayFilter): Call[] {
  if (filter === 'needs_action') return calls.filter(isUnhandledCall)
  if (filter === 'urgent') return calls.filter((c) => c.urgent)
  return calls
}
