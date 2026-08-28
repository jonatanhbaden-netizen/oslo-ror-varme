import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const LINKS = [
  { to: '/site', label: 'Hjem', end: true },
  { to: '/site/slik-fungerer-det', label: 'Slik fungerer det', end: false },
  { to: '/site/for-rorleggere', label: 'Rørleggere', end: false },
  { to: '/site/for-elektrikere', label: 'Elektrikere', end: false },
  { to: '/site/kontakt', label: 'Kontakt', end: false },
]

export function SiteLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="site">
      <header className="site-nav">
        <Link className="site-logo" to="/site" onClick={() => setOpen(false)}>
          Pling
        </Link>
        <button
          type="button"
          className="site-menu-btn"
          aria-expanded={open}
          aria-label="Meny"
          onClick={() => setOpen((v) => !v)}
        >
          Meny
        </button>
        <nav className={`site-links${open ? ' is-open' : ''}`}>
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'is-active' : undefined)}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link className="site-cta" to="/site/kontakt" onClick={() => setOpen(false)}>
            Book en demo
          </Link>
        </nav>
      </header>
      <Outlet />
      <footer className="site-footer">
        <p>Pling er stemmereceptsjonisten for norske håndverksbedrifter. Uavhengig av pling.care.</p>
        <p>
          <Link to="/site/kontakt">Snakk med oss</Link>
          {' · '}
          <Link to="/">Åpne eierappen</Link>
        </p>
      </footer>
    </div>
  )
}
