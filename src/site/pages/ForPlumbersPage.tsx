import { Link } from 'react-router-dom'
import { usePageMeta } from '../usePageMeta'

export function ForPlumbersPage() {
  usePageMeta(
    'Pling for rørleggere',
    'Pling tar telefonen når du er på oppdrag. Lekkasje, tett avløp og timebestilling lander i appen.',
  )

  return (
    <div className="site-page">
      <p className="kicker">Rør</p>
      <h1>For rørleggere</h1>
      <p className="lead">
        Vann venter ikke. Kunden ringer mens du står i en annen kjeller. Pling tar samtalen, skiller
        akutt lekkasje fra «kan dere komme neste uke», og legger det i appen.
      </p>
      <div className="site-bento">
        <article className="card card-lavender">
          <h2>Akutt</h2>
          <p>Lekkasje, stengt kran, vann på gulvet. Merkes kritisk. Du ringer når du kan løfte hodet.</p>
        </article>
        <article className="card card-lime">
          <h2>Time</h2>
          <p>Bereder, varme, avløp. Pling avtaler et vindu og du ser neste oppdrag med adresse.</p>
        </article>
        <article className="card card-white">
          <h2>Pris</h2>
          <p>Ingen kr-beløp fra Pling. Forespørselen lander som beskjed, du gir tallet selv.</p>
        </article>
      </div>
      <Link className="primary-btn site-btn" to="/site/kontakt">
        Snakk med oss
      </Link>
    </div>
  )
}
