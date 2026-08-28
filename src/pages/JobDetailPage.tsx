import { Navigate, useParams } from 'react-router-dom'
import { ActionRow } from '../components/ActionRow'
import { ScreenHeader } from '../components/ScreenHeader'
import { formatDateTime, formatRelativeUntil, jobStatusLabel } from '../lib/format'
import { usePling } from '../store/PlingProvider'

export function JobDetailPage() {
  const { id } = useParams()
  const { tenant, jobs } = usePling()
  const job = jobs.find((item) => item.id === id)
  if (!job) return <Navigate to="/oppdrag" replace />

  return (
    <div className="page">
      <ScreenHeader kicker={tenant.name} title="Oppdrag" backTo="/oppdrag" />

      <section className="card card-lime detail-hero">
        <p className="eyebrow">{formatRelativeUntil(job.startsAt)}</p>
        <h2 className="detail-name">{job.title}</h2>
        <p>{formatDateTime(job.startsAt)}</p>
        <span className="chip chip-ok">{jobStatusLabel(job.status)}</span>
      </section>

      <section className="card card-white">
        <p className="stat-label">Kunde</p>
        <p className="body-copy">{job.customerName}</p>
        <p className="meta">{job.phone}</p>
      </section>

      <section className="card card-lavender">
        <p className="stat-label">Adresse</p>
        <p className="body-copy">{job.address}</p>
      </section>

      <section className="card card-white">
        <p className="stat-label">Notater</p>
        <p className="body-copy">{job.notes}</p>
      </section>

      <ActionRow phone={job.phone} address={job.address} />
    </div>
  )
}
