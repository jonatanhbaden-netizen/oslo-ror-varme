import { Link } from 'react-router-dom'
import { LiveDemo } from '../LiveDemo'
import { usePageMeta } from '../usePageMeta'

export function SiteHomePage() {
  usePageMeta(
    'Pling – tar telefonen for rørleggere og elektrikere',
    'Pling er stemmereceptsjonisten for norske håndverksbedrifter. Kunden får svar. Du får samtalen, beskjeden og jobben i appen.',
  )

  return (
    <div className="site-page">
      <section className="site-hero">
        <p className="kicker">Stemmereceptsjonist</p>
        <h1>Pling tar telefonen. Du tar jobben.</h1>
        <p className="lead">
          Når en kunde ringer mens du er under vasken, svarer Pling på norsk. Du åpner appen etterpå:
          hva som ble sagt, hva som haster, og neste oppdrag.
        </p>
        <div className="hero-actions">
          <Link className="primary-btn site-btn" to="/site/kontakt">
            Book en demo
          </Link>
          <a className="ghost-btn site-btn" href="#demo">
            Prøv samtalen
          </a>
        </div>
      </section>

      <div id="demo">
        <LiveDemo />
      </div>

      <section className="site-section">
        <p className="kicker">Slik fungerer det</p>
        <h2>Tre steg. Ingen dashbord-teater.</h2>
        <div className="site-bento">
          <article className="card card-black">
            <p className="huge-number huge-number-sm">1</p>
            <h3>Kunden ringer deg</h3>
            <p>Samme nummer som i dag. Pling tar imot når du er opptatt eller etter stengetid.</p>
          </article>
          <article className="card card-lime">
            <p className="huge-number huge-number-sm">2</p>
            <h3>Pling svarer på norsk</h3>
            <p>Akutt lekkasje skilles fra pris på sikringsskap. Navn, nummer og adresse kommer med.</p>
          </article>
          <article className="card card-lavender">
            <p className="huge-number huge-number-sm">3</p>
            <h3>Du ser det i appen</h3>
            <p>I dag, beskjeder og kommende oppdrag. Ring, SMS og vis vei når du er klar.</p>
          </article>
        </div>
        <Link className="text-link" to="/site/slik-fungerer-det">
          Les mer om flyten
        </Link>
      </section>

      <section className="site-section">
        <p className="kicker">Hvem det er for</p>
        <h2>Bygget for folk som har hendene fulle.</h2>
        <div className="site-split">
          <Link className="card card-lime site-trade-card" to="/site/for-rorleggere">
            <h3>Rørleggere</h3>
            <p>Lekkasje, tett avløp, bereder og varme. Akutt i dag, eller time neste uke.</p>
          </Link>
          <Link className="card card-lavender site-trade-card" to="/site/for-elektrikere">
            <h3>Elektrikere</h3>
            <p>Sikringsskap, død kurs, jordfeil. Pling tar prisforespørselen uten å love tall.</p>
          </Link>
        </div>
      </section>

      <section className="card card-black site-cta-band">
        <h2>Vil du høre Pling på ditt nummer?</h2>
        <p>Ingen prisliste her. Vi tar en prat og kjører en demo mot din hverdag.</p>
        <Link className="circle-btn circle-btn-light site-cta-btn" to="/site/kontakt">
          Snakk med oss
        </Link>
      </section>
    </div>
  )
}
