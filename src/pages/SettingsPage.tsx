import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenHeader } from '../components/ScreenHeader'
import { usePling } from '../store/PlingProvider'

export function SettingsPage() {
  const { tenant, source, updateTenant, resetDemo } = usePling()
  const navigate = useNavigate()
  const [name, setName] = useState(tenant.name)
  const [phone, setPhone] = useState(tenant.phone)
  const [city, setCity] = useState(tenant.city)
  const [saved, setSaved] = useState(false)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    updateTenant({ name: name.trim(), phone: phone.trim(), city: city.trim() })
    setSaved(true)
  }

  function onReset() {
    resetDemo()
    navigate('/')
  }

  return (
    <div className="page">
      <ScreenHeader kicker={tenant.name} title="Innstillinger" backTo="/" />

      <section className="card card-white">
        <p className="stat-label">Bedrift</p>
        <form className="settings-form" onSubmit={onSubmit}>
          <label>
            Navn
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Telefon
            <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </label>
          <label>
            By
            <input value={city} onChange={(e) => setCity(e.target.value)} required />
          </label>
          <button type="submit" className="primary-btn">
            Lagre
          </button>
          {saved ? <p className="handled-note">Lagret på denne enheten.</p> : null}
        </form>
      </section>

      <section className="card card-lavender">
        <p className="stat-label">Pling-API</p>
        <p className="body-copy">
          Live Pling-API og koblinger kommer. Inntil videre kjører appen på eksempeldata
          {source === 'api' ? ' via API.' : '.'} Sett <code>VITE_PLING_API_URL</code> når endepunktet
          er klart.
        </p>
      </section>

      <section className="card card-white">
        <p className="stat-label">Demo</p>
        <p className="body-copy">
          Nullstill fjerner behandlet-status og bedriftsendringer lagret i nettleseren.
        </p>
        <button type="button" className="ghost-btn" onClick={onReset}>
          Nullstill demo
        </button>
      </section>
    </div>
  )
}
