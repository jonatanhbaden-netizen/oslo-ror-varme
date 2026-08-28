import { Link } from 'react-router-dom'
import { ActionRow } from '../components/ActionRow'
import { EmptyState } from '../components/EmptyState'
import { ScreenHeader } from '../components/ScreenHeader'
import { displayName, formatDateTime, priorityLabel } from '../lib/format'
import { usePling } from '../store/PlingProvider'
import type { Message, Priority } from '../types'

function chipClass(priority: Priority): string {
  if (priority === 'critical') return 'chip chip-critical'
  if (priority === 'urgent') return 'chip chip-urgent'
  return 'chip'
}

export function MessagesPage() {
  const { tenant, unhandledMessages, messages, demoDismissed, dismissDemo } = usePling()
  const critical = unhandledMessages.filter((m) => m.priority === 'critical').length
  const urgent = unhandledMessages.filter((m) => m.priority === 'urgent').length
  const normal = unhandledMessages.filter((m) => m.priority === 'normal').length

  return (
    <div className="page">
      <ScreenHeader
        kicker={tenant.name}
        title="Ubehandlede beskjeder"
        demoVisible={!demoDismissed}
        onDismissDemo={dismissDemo}
      />

      <div className="chip-row">
        <span className="count-chip count-chip-black">{critical} kritisk</span>
        <span className="count-chip count-chip-lavender">{urgent} haster</span>
        <span className="count-chip count-chip-lime">{normal} vanlig</span>
        <span className="count-chip count-chip-white">{messages.length} totalt</span>
      </div>

      {unhandledMessages.length === 0 ? (
        <EmptyState
          title="Ingen ubehandlede beskjeder"
          body="Bra jobba. Nye meldinger fra Pling lander her."
        />
      ) : (
        <div className="stack">
          {unhandledMessages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div>
      )}
    </div>
  )
}

function MessageCard({ message }: { message: Message }) {
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
        <Link className="text-link" to={`/beskjeder/${message.id}`}>
          Vis detaljer
        </Link>
        <ActionRow phone={message.phone} address={message.address} />
      </div>
    </article>
  )
}
