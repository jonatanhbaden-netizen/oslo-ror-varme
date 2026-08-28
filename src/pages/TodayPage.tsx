import { Link, useSearchParams } from 'react-router-dom'
import { CallCard } from '../components/Cards'
import { EmptyState } from '../components/EmptyState'
import { FilterPills } from '../components/FilterPills'
import { IconArrowUpRight } from '../components/Icons'
import { ScreenHeader } from '../components/ScreenHeader'
import { formatDuration } from '../lib/format'
import { filterCalls, type TodayFilter } from '../lib/stats'
import { usePling } from '../store/PlingProvider'

function isTodayFilter(value: string | null): value is TodayFilter {
  return value === 'all' || value === 'needs_action' || value === 'urgent'
}

export function TodayPage() {
  const { tenant, calls, stats, demoDismissed, dismissDemo } = usePling()
  const [params, setParams] = useSearchParams()
  const rawFilter = params.get('filter')
  const filter: TodayFilter = isTodayFilter(rawFilter) ? rawFilter : 'all'
  const visible = filterCalls(calls, filter)
  const handled = calls.filter((c) => c.handledAt || c.outcome !== 'needs_action').length
  const progress = calls.length === 0 ? 0 : Math.round((handled / calls.length) * 100)

  return (
    <div className="page">
      <ScreenHeader
        kicker={tenant.name}
        title="I dag"
        demoVisible={!demoDismissed}
        onDismissDemo={dismissDemo}
      />

      <section className="card card-black hero-card">
        <div className="hero-top">
          <p>Pling har svart for deg</p>
          <Link className="circle-btn circle-btn-light" to="/beskjeder" aria-label="Gå til beskjeder">
            <IconArrowUpRight />
          </Link>
        </div>
        <p className="huge-number">{stats.calls}</p>
        <p className="hero-sub">samtaler · snitt {formatDuration(stats.avgDurationSec)}</p>
      </section>

      <div className="bento-row">
        <section className="card card-lime stat-card">
          <p className="stat-label">Booket</p>
          <p className="huge-number huge-number-sm">{stats.booked}</p>
          <p className="stat-hint">klare oppdrag</p>
        </section>
        <section className="card card-lavender stat-card">
          <p className="stat-label">Krever noe</p>
          <p className="huge-number huge-number-sm">{stats.needsAction}</p>
          <p className="stat-hint">venter på deg</p>
        </section>
      </div>

      <section className="card card-white progress-card">
        <div className="progress-copy">
          <p className="stat-label">Behandlet i dag</p>
          <p className="progress-value">
            {handled}/{calls.length}
          </p>
        </div>
        <div className="progress-track" aria-hidden="true">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </section>

      <FilterPills
        label="Vis"
        value={filter}
        onChange={(next) => setParams(next === 'all' ? {} : { filter: next })}
        options={[
          { id: 'all', label: 'Alle', count: calls.length },
          { id: 'needs_action', label: 'Krever noe', count: stats.needsAction },
          { id: 'urgent', label: 'Akutt', count: calls.filter((c) => c.urgent).length },
        ]}
      />

      {visible.length === 0 ? (
        <EmptyState
          title="Ingen samtaler her"
          body="Bytt filter, eller vent til Pling tar neste anrop."
        />
      ) : (
        <div className="stack">
          {visible.map((call) => (
            <CallCard key={call.id} call={call} detailTo={`/samtaler/${call.id}`} />
          ))}
        </div>
      )}
    </div>
  )
}
