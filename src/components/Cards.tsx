import { Link } from 'react-router-dom'
import { ActionRow } from './ActionRow'
import {
  displayName,
  formatClock,
  formatDateTime,
  formatDuration,
  formatRelativeUntil,
  jobStatusLabel,
  outcomeLabel,
  priorityLabel,
} from '../lib/format'
import { callTone } from '../lib/stats'
import type { Call, Job, Message, Priority } from '../types'

export function CallCard({
  call,
  detailTo,
}: {
  call: Call
  detailTo?: string
}) {
  const tone = callTone(call)
  return (
    <article className={`card card-${tone} list-card`}>
      <div className="list-card-head">
        <div>
          <h2>{displayName(call.callerName)}</h2>
          <p className="meta">
            {call.phone} · {formatClock(call.startedAt)}
          </p>
        </div>
        <span className={`chip${call.urgent ? ' chip-critical' : ''}`}>
          {call.urgent ? 'Akutt' : outcomeLabel(call.outcome)}
        </span>
      </div>
      <p className="summary">
        {call.topic} · {formatDuration(call.durationSec)}
      </p>
      <p className="body-copy">{call.summary}</p>
      {detailTo ? (
        <div className="list-card-foot">
          <Link className="text-link" to={detailTo}>
            Vis detaljer
          </Link>
        </div>
      ) : null}
    </article>
  )
}

function chipClass(priority: Priority): string {
  if (priority === 'critical') return 'chip chip-critical'
  if (priority === 'urgent') return 'chip chip-urgent'
  return 'chip'
}

export function MessageCard({
  message,
  detailTo,
}: {
  message: Message
  detailTo?: string
}) {
  return (
    <article className="card card-white list-card message-card">
      {message.priority === 'critical' ? <span className="critical-pip" aria-hidden="true" /> : null}
      <div className="list-card-head">
        <div>
          <h2>{displayName(message.senderName)}</h2>
          <p className="meta">
            {message.phone} · {formatDateTime(message.sentAt)}
          </p>
        </div>
        <span className={chipClass(message.priority)}>{priorityLabel(message.priority)}</span>
      </div>
      <p className="body-copy">{message.text}</p>
      <div className="list-card-foot">
        {detailTo ? (
          <Link className="text-link" to={detailTo}>
            Vis detaljer
          </Link>
        ) : null}
        <ActionRow phone={message.phone} address={message.address} />
      </div>
    </article>
  )
}

export function JobCard({
  job,
  featured = false,
  detailTo,
}: {
  job: Job
  featured?: boolean
  detailTo?: string
}) {
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
        {detailTo ? (
          <Link className="text-link" to={detailTo}>
            Vis detaljer
          </Link>
        ) : (
          <span className="text-link" aria-hidden="true">
            {formatRelativeUntil(job.startsAt)}
          </span>
        )}
        <ActionRow phone={job.phone} address={job.address} />
      </div>
    </>
  )
}
