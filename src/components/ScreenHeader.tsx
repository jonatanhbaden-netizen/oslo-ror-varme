import { Link } from 'react-router-dom'
import { IconBack, IconClose, IconGear } from './Icons'

type Props = {
  kicker: string
  title: string
  backTo?: string
  demoVisible?: boolean
  onDismissDemo?: () => void
}

export function ScreenHeader({ kicker, title, backTo, demoVisible, onDismissDemo }: Props) {
  return (
    <header className="screen-header">
      <div className="header-row">
        {backTo ? (
          <Link className="circle-btn" to={backTo} aria-label="Tilbake">
            <IconBack />
          </Link>
        ) : (
          <p className="kicker">{kicker}</p>
        )}
        <div className="header-actions">
          {demoVisible ? (
            <button type="button" className="demo-pill" onClick={onDismissDemo}>
              Demo
              <IconClose size={14} />
            </button>
          ) : null}
          <Link className="circle-btn circle-btn-dark" to="/innstillinger" aria-label="Innstillinger">
            <IconGear />
          </Link>
        </div>
      </div>
      <h1 className="screen-title">{title}</h1>
    </header>
  )
}
