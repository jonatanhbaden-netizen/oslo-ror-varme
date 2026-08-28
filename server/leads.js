import fs from 'node:fs'
import path from 'node:path'

const REQUIRED = ['name', 'company', 'phone', 'email', 'trade', 'message']

export function validateLead(body) {
  if (!body || typeof body !== 'object') return 'Mangler data.'
  for (const key of REQUIRED) {
    const value = String(body[key] ?? '').trim()
    if (!value) return `Feltet ${key} mangler.`
  }
  return null
}

export function saveLead(body) {
  const record = {
    id: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    receivedAt: new Date().toISOString(),
    name: String(body.name).trim(),
    company: String(body.company).trim(),
    phone: String(body.phone).trim(),
    email: String(body.email).trim(),
    trade: String(body.trade).trim(),
    message: String(body.message).trim(),
  }
  const dir = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), 'data')
  fs.mkdirSync(dir, { recursive: true })
  const file = path.join(dir, 'leads.jsonl')
  fs.appendFileSync(file, `${JSON.stringify(record)}\n`, 'utf8')
  return record
}
