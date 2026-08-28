import { MessageCard } from '../components/Cards'
import { EmptyState } from '../components/EmptyState'
import { ScreenHeader } from '../components/ScreenHeader'
import { usePling } from '../store/PlingProvider'

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
            <MessageCard
              key={message.id}
              message={message}
              detailTo={`/beskjeder/${message.id}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
