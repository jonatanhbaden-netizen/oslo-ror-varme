import type { Tenant } from '../types'

export const STORAGE_KEY = 'pling.owner-app.v1'

export type PersistedState = {
  v: 1
  tenant?: Pick<Tenant, 'name' | 'phone' | 'city'>
  handledCallIds: string[]
  handledMessageIds: string[]
  demoDismissed: boolean
}

const EMPTY: PersistedState = {
  v: 1,
  handledCallIds: [],
  handledMessageIds: [],
  demoDismissed: false,
}

export function loadPersisted(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...EMPTY }
    const parsed = JSON.parse(raw) as Partial<PersistedState>
    if (parsed.v !== 1) return { ...EMPTY }
    return {
      v: 1,
      tenant: parsed.tenant,
      handledCallIds: Array.isArray(parsed.handledCallIds) ? parsed.handledCallIds : [],
      handledMessageIds: Array.isArray(parsed.handledMessageIds)
        ? parsed.handledMessageIds
        : [],
      demoDismissed: Boolean(parsed.demoDismissed),
    }
  } catch {
    return { ...EMPTY }
  }
}

export function savePersisted(state: PersistedState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function clearPersisted(): void {
  localStorage.removeItem(STORAGE_KEY)
}
