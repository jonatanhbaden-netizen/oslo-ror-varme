const WEEKDAYS = ['søn.', 'man.', 'tir.', 'ons.', 'tor.', 'fre.', 'lør.']
const MONTHS = [
  'jan.',
  'feb.',
  'mar.',
  'apr.',
  'mai',
  'jun.',
  'jul.',
  'aug.',
  'sep.',
  'okt.',
  'nov.',
  'des.',
]

export function unknownName(): string {
  return 'Oppga ikke navn'
}

export function displayName(name: string | null): string {
  return name?.trim() || unknownName()
}

export function pad(n: number): string {
  return String(n).padStart(2, '0')
}

export function formatClock(iso: string): string {
  const d = new Date(iso)
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso)
  return `${WEEKDAYS[d.getDay()]} ${d.getDate()}. ${MONTHS[d.getMonth()]}, ${formatClock(iso)}`
}

export function formatDuration(totalSec: number): string {
  const minutes = Math.floor(totalSec / 60)
  const seconds = totalSec % 60
  if (minutes === 0) return `${seconds} sek`
  return `${minutes} min ${pad(seconds)} sek`
}

export function formatRelativeUntil(iso: string, now = new Date()): string {
  const diffMs = new Date(iso).getTime() - now.getTime()
  if (diffMs <= 0) return 'nå'
  const hours = Math.round(diffMs / (1000 * 60 * 60))
  if (hours < 1) {
    const minutes = Math.max(1, Math.round(diffMs / (1000 * 60)))
    return `om ${minutes} min`
  }
  if (hours < 48) return `om ${hours} timer`
  const days = Math.round(hours / 24)
  return `om ${days} dager`
}

export function digitsOnly(phone: string): string {
  return phone.replace(/\D/g, '')
}

export function toTelHref(phone: string): string {
  const digits = digitsOnly(phone)
  if (digits.startsWith('47') && digits.length >= 10) return `tel:+${digits}`
  if (digits.startsWith('0')) return `tel:+47${digits.slice(1)}`
  return `tel:+47${digits}`
}

export function toSmsHref(phone: string): string {
  return toTelHref(phone).replace('tel:', 'sms:')
}

export function toMapsHref(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
}

export function outcomeLabel(outcome: 'booked' | 'needs_action' | 'info'): string {
  if (outcome === 'booked') return 'Booket'
  if (outcome === 'needs_action') return 'Krever noe'
  return 'Info'
}

export function priorityLabel(priority: 'critical' | 'urgent' | 'normal'): string {
  if (priority === 'critical') return 'Kritisk'
  if (priority === 'urgent') return 'Haster'
  return 'Vanlig'
}

export function jobStatusLabel(status: 'confirmed' | 'scheduled' | 'unconfirmed'): string {
  if (status === 'confirmed') return 'Bekreftet'
  if (status === 'scheduled') return 'Avtalt'
  return 'Ubekreftet'
}
