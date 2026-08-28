import { Navigate, useParams } from 'react-router-dom'
import { ActionRow } from '../components/ActionRow'
import { ScreenHeader } from '../components/ScreenHeader'
import { displayName, formatDateTime, priorityLabel } from '../lib/format'
import { usePling } from '../store/PlingProvider'

export function MessageDetailPage() {
  const { id } = useParams()
  const { tenant, messages, markMessageHandled } = usePling()
  const message = messages.find((item) => item.id === id)
  if (!message) return <Navigate to="/beskjeder" replace />
  const handled = Boolean(message.handledAt)

  return (
    <div className="page">
      <ScreenHeader kicker={tenant.name} title="Beskjed" backTo="/beskjeder" />

      <section
        className={`card ${message.priority === 'critical' ? 'card-lavender' : 'card-black'} detail-hero`}
      >
        <p className="eyebrow">{formatDateTime(message.sentAt)}</p>
        <h2 className="detail-name">{displayName(message.senderName)}</h2>
        <p>{message.phone}</p>
        <span className={`chip ${message.priority === 'critical' ? 'chip-critical' : 'chip-on-dark'}`}>
          {priorityLabel(message.priority)}
        </span>
      </section>

      <section className="card card-white">
        <p className="stat-label">Melding</p>
        <p className="body-copy">{message.text}</p>
        {message.address ? <p className="meta">{message.address}</p> : null}
      </section>

      <ActionRow phone={message.phone} address={message.address} />

      {handled ? (
        <p className="handled-note">Behandlet. Den er borte fra listen.</p>
      ) : (
        <button type="button" className="primary-btn" onClick={() => markMessageHandled(message.id)}>
          Merk som behandlet
        </button>
      )}
    </div>
  )
}
