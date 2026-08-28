import { saveLead, validateLead } from '../server/leads.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Kun POST.' })
    return
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const error = validateLead(body)
    if (error) {
      res.status(400).json({ ok: false, error })
      return
    }
    const record = saveLead(body)
    res.status(200).json({ ok: true, id: record.id, receivedAt: record.receivedAt })
  } catch {
    res.status(500).json({ ok: false, error: 'Kunne ikke lagre henvendelsen.' })
  }
}
