import { useEffect, useMemo, useRef, useState } from 'react'
import { CallCard, JobCard, MessageCard } from '../components/Cards'
import { EmptyState } from '../components/EmptyState'
import { IconBriefcase, IconChat, IconHome } from '../components/Icons'
import { formatDuration } from '../lib/format'
import { computeTodayStats } from '../lib/stats'
import { DEMO_SCENARIOS, type DemoScenario, type Trade } from './demoScenarios'

type Phase = 'idle' | 'ringing' | 'talking' | 'done'
type DemoTab = 'today' | 'messages' | 'jobs'

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function LiveDemo() {
  const [trade, setTrade] = useState<Trade>('ror')
  const [scenarioId, setScenarioId] = useState('ror-lekkasje')
  const [phase, setPhase] = useState<Phase>('idle')
  const [lineIndex, setLineIndex] = useState(0)
  const [tab, setTab] = useState<DemoTab>('today')
  const [populated, setPopulated] = useState(false)
  const timers = useRef<number[]>([])

  const scenario =
    DEMO_SCENARIOS.find((item) => item.id === scenarioId) ?? DEMO_SCENARIOS[0]
  const tradeScenarios = DEMO_SCENARIOS.filter((item) => item.trade === trade)

  const stats = useMemo(
    () => (populated ? computeTodayStats([scenario.call]) : { calls: 0, booked: 0, needsAction: 0, avgDurationSec: 0 }),
    [populated, scenario],
  )

  function clearTimers() {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
  }

  function later(ms: number, fn: () => void) {
    const id = window.setTimeout(fn, ms)
    timers.current.push(id)
  }

  function play(next: DemoScenario) {
    clearTimers()
    setScenarioId(next.id)
    setTab('today')
    setLineIndex(0)
    setPopulated(false)
    if (prefersReducedMotion()) {
      setPhase('done')
      setLineIndex(next.lines.length)
      setPopulated(true)
      return
    }
    setPhase('ringing')
    later(900, () => {
      setPhase('talking')
      setLineIndex(1)
    })
  }

  useEffect(() => {
    if (phase !== 'talking') return
    if (lineIndex >= scenario.lines.length) {
      const id = window.setTimeout(() => {
        setPopulated(true)
        setPhase('done')
      }, 500)
      return () => window.clearTimeout(id)
    }
    const spoken = scenario.lines[lineIndex - 1]
    const delay = spoken?.speaker === 'kunde' ? 1400 : 1100
    const id = window.setTimeout(() => setLineIndex((i) => i + 1), delay)
    return () => window.clearTimeout(id)
  }, [phase, lineIndex, scenario])

  useEffect(() => () => clearTimers(), [])

  const visibleLines = scenario.lines.slice(0, lineIndex)

  return (
    <section className="live-demo" aria-label="Interaktiv Pling-demo">
      <div className="demo-controls">
        <p className="kicker">Prøv samtalen</p>
        <div className="filter-track demo-trade">
          <button
            type="button"
            className={`filter-pill${trade === 'ror' ? ' is-active' : ''}`}
            onClick={() => {
              setTrade('ror')
              const first = DEMO_SCENARIOS.find((item) => item.trade === 'ror')
              if (first) play(first)
            }}
          >
            Rør
          </button>
          <button
            type="button"
            className={`filter-pill${trade === 'elektro' ? ' is-active' : ''}`}
            onClick={() => {
              setTrade('elektro')
              const first = DEMO_SCENARIOS.find((item) => item.trade === 'elektro')
              if (first) play(first)
            }}
          >
            Elektro
          </button>
        </div>
        <div className="scenario-row">
          {tradeScenarios.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`scenario-chip${item.id === scenario.id ? ' is-active' : ''}`}
              onClick={() => play(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="meta">{scenario.exampleNote}</p>
      </div>

      <div className="demo-stage">
        <div className="demo-phone">
          <div className="demo-phone-bar">
            <span>{scenario.tenantName}</span>
            <span className="demo-phase">
              {phase === 'idle' && 'Klar'}
              {phase === 'ringing' && 'Innkommende'}
              {phase === 'talking' && 'Pling svarer'}
              {phase === 'done' && 'I appen'}
            </span>
          </div>

          {phase === 'idle' ? (
            <div className="demo-idle">
              <p className="screen-title">Hør samtalen</p>
              <p className="body-copy">
                En kunde ringer. Pling svarer på norsk. Deretter fylles eierappen.
              </p>
              <button type="button" className="primary-btn" onClick={() => play(scenario)}>
                Start demo
              </button>
            </div>
          ) : null}

          {phase === 'ringing' ? (
            <div className="demo-ring card card-black">
              <p className="eyebrow">Innkommende anrop</p>
              <p className="huge-number huge-number-sm">…</p>
              <p>Pling tar den.</p>
            </div>
          ) : null}

          {phase === 'talking' || (phase === 'done' && !populated) ? (
            <ol className="demo-transcript">
              {visibleLines.map((line, index) => (
                <li key={`${line.text}-${index}`} className={`demo-line demo-line-${line.speaker}`}>
                  <span className="kicker">{line.speaker === 'pling' ? 'Pling' : 'Kunde'}</span>
                  <p>{line.text}</p>
                </li>
              ))}
            </ol>
          ) : null}

          {phase === 'done' && populated ? (
            <DemoDashboard scenario={scenario} stats={stats} tab={tab} onTab={setTab} />
          ) : null}

          <div className="demo-actions">
            {phase !== 'idle' ? (
              <button type="button" className="ghost-btn" onClick={() => play(scenario)}>
                Spill av igjen
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

function DemoDashboard({
  scenario,
  stats,
  tab,
  onTab,
}: {
  scenario: DemoScenario
  stats: ReturnType<typeof computeTodayStats>
  tab: DemoTab
  onTab: (tab: DemoTab) => void
}) {
  return (
    <div className="demo-app">
      <p className="kicker">{scenario.tenantName}</p>
      {tab === 'today' ? (
        <div className="stack">
          <section className="card card-black hero-card demo-hero">
            <p>Pling har svart for deg</p>
            <p className="huge-number huge-number-sm">{stats.calls}</p>
            <p className="hero-sub">samtaler · snitt {formatDuration(stats.avgDurationSec)}</p>
          </section>
          <div className="bento-row">
            <section className="card card-lime stat-card">
              <p className="stat-label">Booket</p>
              <p className="huge-number huge-number-sm">{stats.booked}</p>
            </section>
            <section className="card card-lavender stat-card">
              <p className="stat-label">Krever noe</p>
              <p className="huge-number huge-number-sm">{stats.needsAction}</p>
            </section>
          </div>
          <CallCard call={scenario.call} />
        </div>
      ) : null}
      {tab === 'messages' ? (
        <div className="stack">
          <h2 className="demo-app-title">Ubehandlede beskjeder</h2>
          <MessageCard message={scenario.message} />
        </div>
      ) : null}
      {tab === 'jobs' ? (
        <div className="stack">
          <h2 className="demo-app-title">Kommende oppdrag</h2>
          {scenario.job ? (
            <section className="card card-black featured-job">
              <p className="eyebrow">Neste oppdrag</p>
              <div className="card card-lime nested-card">
                <JobCard job={scenario.job} featured />
              </div>
            </section>
          ) : (
            <EmptyState title="Ingen oppdrag" body="Ingen time booket i dette scenarioet." />
          )}
        </div>
      ) : null}

      <nav className="demo-tabs" aria-label="Demo-faner">
        <button type="button" className={tab === 'today' ? 'is-active' : ''} onClick={() => onTab('today')}>
          <span className={`nav-icon${tab === 'today' ? ' is-active' : ''}`}>
            <IconHome size={18} />
          </span>
          I dag
        </button>
        <button
          type="button"
          className={tab === 'messages' ? 'is-active' : ''}
          onClick={() => onTab('messages')}
        >
          <span className={`nav-icon${tab === 'messages' ? ' is-active' : ''}`}>
            <IconChat size={18} />
          </span>
          Beskjeder
        </button>
        <button type="button" className={tab === 'jobs' ? 'is-active' : ''} onClick={() => onTab('jobs')}>
          <span className={`nav-icon${tab === 'jobs' ? ' is-active' : ''}`}>
            <IconBriefcase size={18} />
          </span>
          Oppdrag
        </button>
      </nav>
    </div>
  )
}
