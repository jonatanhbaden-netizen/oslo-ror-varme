import { Link } from 'react-router-dom'
import { ActionRow } from '../components/ActionRow'
import { EmptyState } from '../components/EmptyState'
import { ScreenHeader } from '../components/ScreenHeader'
import { formatDateTime, formatRelativeUntil, jobStatusLabel } from '../lib/format'
import { usePling } from '../store/PlingProvider'
import type { Job } from '../types'

export function JobsPage() {
  const { tenant, jobs, demoDismissed, dismissDemo } = usePling()
  const sorted = [...jobs].sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  )
  const [next, ...rest] = sorted

  return (
    <div className="page">
      <ScreenHeader
        kicker={tenant.name}
        title="Kommende oppdrag"
        demoVisible={!demoDismissed}
        onDismissDemo={dismissDemo}
      />

      {next ? (
        <section className="card card-black featured-job">
          <p className="eyebrow">Neste oppdrag · {formatRelativeUntil(next.startsAt)}</p>
          <div className="card card-lime nested-card">
            <JobBody job={next} featured />
          </div>
        </section>
      ) : (
        <EmptyState title="Ingen kommende oppdrag" body="Når Pling booker en time, vises den her." />
      )}

      {rest.length > 0 ? (
        <>
          <p className="kicker section-kicker">Deretter</p>
          <div className="stack">
            {rest.map((job) => (
              <article key={job.id} className="card card-white list-card">
                <JobBody job={job} />
              </article>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}

function JobBody({ job, featured = false }: { job: Job; featured?: boolean }) {
  return (
    <>
      <div className="list-card-head">
        <div>
          <p className="meta">{formatDateTime(job.startsAt)}</p>
          <h2>{job.customerName}</h2>
          <p className="meta">{job.address}</p>
        </div>
        <span className={`chip${job.status === 'confirmed' ? ' chip-ok' : ''}`}>
          {jobStatusLabel(job.status)}
        </span>
      </div>
      <p className="body-copy">{featured ? job.notes : job.title}</p>
      {featured ? <p className="summary">{job.title}</p> : null}
      <div className="list-card-foot">
        <Link className="text-link" to={`/oppdrag/${job.id}`}>
          Vis detaljer
        </Link>
        <ActionRow phone={job.phone} address={job.address} />
      </div>
    </>
  )
}
