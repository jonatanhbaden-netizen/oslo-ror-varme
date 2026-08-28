import { NavLink } from 'react-router-dom'
import { usePling } from '../store/PlingProvider'
import { IconBriefcase, IconChat, IconHome } from './Icons'

const TABS = [
  { to: '/', label: 'I dag', icon: IconHome, end: true },
  { to: '/beskjeder', label: 'Beskjeder', icon: IconChat, end: false },
  { to: '/oppdrag', label: 'Oppdrag', icon: IconBriefcase, end: false },
] as const

export function BottomNav() {
  const { unhandledMessages } = usePling()
  const unread = unhandledMessages.length

  return (
    <nav className="bottom-nav" aria-label="Hovedmeny">
      {TABS.map((tab) => {
        const Icon = tab.icon
        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) => `nav-item${isActive ? ' is-active' : ''}`}
          >
            {({ isActive }) => (
              <>
                <span className={`nav-icon${isActive ? ' is-active' : ''}`}>
                  <Icon size={20} />
                  {tab.to === '/beskjeder' && unread > 0 ? (
                    <span className="nav-badge">{unread > 9 ? '9+' : unread}</span>
                  ) : null}
                </span>
                <span className="nav-label">{tab.label}</span>
              </>
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}
