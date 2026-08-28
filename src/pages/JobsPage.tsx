import { JobCard } from '../components/Cards'
import { EmptyState } from '../components/EmptyState'
import { ScreenHeader } from '../components/ScreenHeader'
import { formatRelativeUntil } from '../lib/format'
import { usePling } from '../store/PlingProvider'

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
            <JobCard job={next} featured detailTo={`/oppdrag/${next.id}`} />
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
                <JobCard job={job} detailTo={`/oppdrag/${job.id}`} />
              </article>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
