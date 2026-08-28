import { Link, Navigate, useParams } from 'react-router-dom'
import { ActionRow } from '../components/ActionRow'
import { ScreenHeader } from '../components/ScreenHeader'
import {
  displayName,
  formatDateTime,
  formatDuration,
  outcomeLabel,
} from '../lib/format'
import { usePling } from '../store/PlingProvider'

export function CallDetailPage() {
  const { id } = useParams()
  const { tenant, calls, jobs, markCallHandled } = usePling()
  const call = calls.find((item) => item.id === id)
  if (!call) return <Navigate to="/" replace />
  const job = call.jobId ? jobs.find((item) => item.id === call.jobId) : undefined
  const handled = Boolean(call.handledAt)

  return (
    <div className="page">
      <ScreenHeader kicker={tenant.name} title="Samtale" backTo="/" />

      <section className={`card ${call.urgent ? 'card-lavender' : 'card-black'} detail-hero`}>
        <p className="eyebrow">{formatDateTime(call.startedAt)}</p>
        <h2 className="detail-name">{displayName(call.callerName)}</h2>
        <p>{call.phone}</p>
      </section>

      <div className="bento-row">
        <section className="card card-white stat-card">
          <p className="stat-label">Varighet</p>
          <p className="detail-stat">{formatDuration(call.durationSec)}</p>
        </section>
        <section
          className={`card ${call.outcome === 'booked' ? 'card-lime' : call.urgent ? 'card-black' : 'card-lavender'} stat-card`}
        >
          <p className="stat-label">Utfall</p>
          <p className="detail-stat">{call.urgent ? 'Akutt' : outcomeLabel(call.outcome)}</p>
        </section>
      </div>

      <section className="card card-white">
        <p className="stat-label">Oppsummering</p>
        <p className="body-copy">{call.summary}</p>
        {call.address ? <p className="meta">{call.address}</p> : null}
        {job ? (
          <p className="meta">
            Booket: <Link to={`/oppdrag/${job.id}`}>{job.title}</Link>
          </p>
        ) : null}
      </section>

      <ActionRow phone={call.phone} address={call.address} />

      {handled ? (
        <p className="handled-note">Behandlet</p>
      ) : (
        <button type="button" className="primary-btn" onClick={() => markCallHandled(call.id)}>
          Merk som behandlet
        </button>
      )}
    </div>
  )
}
