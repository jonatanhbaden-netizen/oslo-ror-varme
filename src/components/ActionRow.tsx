import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { toMapsHref, toSmsHref, toTelHref } from '../lib/format'
import { IconPhone, IconPin, IconSms } from './Icons'

type Props = {
  phone: string
  address?: string
}

export function ActionRow({ phone, address }: Props) {
  return (
    <div className="action-row">
      <a className="action-btn" href={toTelHref(phone)}>
        <IconPhone size={18} />
        Ring
      </a>
      <a className="action-btn" href={toSmsHref(phone)}>
        <IconSms size={18} />
        SMS
      </a>
      {address ? (
        <a className="action-btn" href={toMapsHref(address)} target="_blank" rel="noreferrer">
          <IconPin size={18} />
          Vis vei
        </a>
      ) : null}
    </div>
  )
}

export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link className="text-link" to={to}>
      {children}
    </Link>
  )
}
