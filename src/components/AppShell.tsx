import { Outlet, useLocation } from 'react-router-dom'
import { usePling } from '../store/PlingProvider'
import { BottomNav } from './BottomNav'

const HIDE_NAV = ['/innstillinger']

export function AppShell() {
  const { ready } = usePling()
  const location = useLocation()
  const hideNav =
    HIDE_NAV.includes(location.pathname) ||
    location.pathname.startsWith('/samtaler/') ||
    location.pathname.startsWith('/beskjeder/') ||
    location.pathname.startsWith('/oppdrag/')

  return (
    <div className="phone-frame">
      <div className="app-shell">
        <main className={`app-main${hideNav ? ' is-detail' : ''}`}>
          {ready ? <Outlet /> : <div className="loading">Laster…</div>}
        </main>
        {hideNav ? null : <BottomNav />}
      </div>
    </div>
  )
}
