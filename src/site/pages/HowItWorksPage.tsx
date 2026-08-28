import { Link } from 'react-router-dom'
import { usePageMeta } from '../usePageMeta'

export function HowItWorksPage() {
  usePageMeta(
    'Slik fungerer Pling',
    'Kunden ringer, Pling svarer, du får samtalen og jobben i eierappen. Slik flyten faktisk er.',
  )

  return (
    <div className="site-page">
      <p className="kicker">Flyten</p>
      <h1>Slik fungerer det</h1>
      <p className="lead">
        Pling er ikke et nytt sentralbord. Det er en stemme som tar imot, og en app du åpner når du
        har to minutter.
      </p>

      <ol className="site-steps">
        <li className="card card-white">
          <h2>1. Anropet lander hos deg</h2>
          <p>
            Bedriftens eget nummer. Hvis du ikke tar, eller det er utenfor åpningstid, svarer Pling.
            Kunden hører at de har kommet til rørleggeren eller elektrikeren — ikke et callcenter.
          </p>
        </li>
        <li className="card card-lime">
          <h2>2. Pling snakker og noterer</h2>
          <p>
            Hva er i veien, er det akutt, når kan dere komme, navn, telefon, adresse. Pling booker
            når det gir mening, og merker det som krever at du ringer tilbake.
          </p>
        </li>
        <li className="card card-lavender">
          <h2>3. Du ser det i eierappen</h2>
          <p>
            I dag: samtaler og hva som venter. Beskjeder: det som ikke er ferdig. Oppdrag: neste
            stopp, med vis vei. Ring og SMS fra kortet.
          </p>
        </li>
        <li className="card card-black">
          <h2>4. API kommer etter appen</h2>
          <p>
            Eierappen kjører på eksempeldata til Pling-serveren har et API. Når det er klart, peker
            samme app mot live samtaler uten at du bytter produkt.
          </p>
        </li>
      </ol>

      <Link className="primary-btn site-btn" to="/site/kontakt">
        Book en demo
      </Link>
    </div>
  )
}
