import { FormEvent, useState } from 'react'
import { usePageMeta } from '../usePageMeta'

type Status = 'idle' | 'sending' | 'ok' | 'error'

export function ContactPage() {
  usePageMeta(
    'Kontakt Pling',
    'Book en demo eller send en melding. Vi tar en prat — ingen prisliste på nettsiden.',
  )
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [id, setId] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const payload = (await res.json()) as { ok?: boolean; id?: string; error?: string }
      if (!res.ok || !payload.ok) {
        throw new Error(payload.error || 'Kunne ikke lagre henvendelsen.')
      }
      setId(payload.id ?? '')
      setStatus('ok')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Noe gikk galt.')
    }
  }

  return (
    <div className="site-page">
      <p className="kicker">Kontakt</p>
      <h1>Book en demo</h1>
      <p className="lead">
        Fortell hvem du er og hvordan telefonen ringer i dag. Vi svarer. Ingen kr-beløp på denne
        siden.
      </p>

      <form className="card card-white settings-form site-form" onSubmit={onSubmit}>
        <label>
          Navn
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          Bedrift
          <input name="company" required autoComplete="organization" />
        </label>
        <label>
          Telefon
          <input name="phone" required autoComplete="tel" />
        </label>
        <label>
          E-post
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label>
          Fag
          <select name="trade" required defaultValue="ror">
            <option value="ror">Rør</option>
            <option value="elektro">Elektro</option>
            <option value="annet">Annet</option>
          </select>
        </label>
        <label>
          Melding
          <textarea name="message" rows={5} required />
        </label>
        <button type="submit" className="primary-btn" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sender…' : 'Send'}
        </button>
        {status === 'ok' ? (
          <p className="handled-note">Mottatt. Referanse {id}. Vi tar kontakt.</p>
        ) : null}
        {status === 'error' ? <p className="form-error">{error}</p> : null}
      </form>
    </div>
  )
}
