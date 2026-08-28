import { Link } from 'react-router-dom'
import { usePageMeta } from '../usePageMeta'

export function ForElectriciansPage() {
  usePageMeta(
    'Pling for elektrikere',
    'Pling tar imot anrop om sikringsskap, død kurs og jordfeil, og legger det i eierappen.',
  )

  return (
    <div className="site-page">
      <p className="kicker">Elektro</p>
      <h1>For elektrikere</h1>
      <p className="lead">
        En død kurs og en pris på nytt skap er to forskjellige samtaler. Pling tar begge, uten å love
        det du ikke har sagt.
      </p>
      <div className="site-bento">
        <article className="card card-lavender">
          <h2>Haster</h2>
          <p>Ingen strøm, brent lukt, utløst jordfeil. Du får navn, nummer og hva som er i veien.</p>
        </article>
        <article className="card card-lime">
          <h2>Befaring</h2>
          <p>Sikringsskap og anlegg. Pling tar inn ønsket tid, du bekrefter når det passer.</p>
        </article>
        <article className="card card-white">
          <h2>Tilbud</h2>
          <p>Prisforespørsel blir en beskjed. Du ringer tilbake. Ingen oppdiktet prisliste her.</p>
        </article>
      </div>
      <Link className="primary-btn site-btn" to="/site/kontakt">
        Snakk med oss
      </Link>
    </div>
  )
}
