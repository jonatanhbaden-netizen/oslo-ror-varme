import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const serviceAreas = [
    'Ryen', 'Manglerud', 'Ekeberg', 'Gamlebyen', 'Bryn',
    'Lamberseter', 'Bøler', 'Oppsal', 'Ensjø'
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Om oss</h4>
            <p>Oslo Rør og Varme AS er en profesjonell rørleggerbedrift med fokus på kvalitet og kundetilfredshet.</p>
          </div>

          <div className="footer-section">
            <h4>Tjenester</h4>
            <ul>
              <li><a href="#services">Rørleggertjenester</a></li>
              <li><a href="#services">Vannbåren varme</a></li>
              <li><a href="#services">Oppussing bad</a></li>
              <li><a href="#services">Lekkasjereparasjon</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Servicesteder</h4>
            <ul className="service-areas">
              {serviceAreas.map((area, idx) => (
                <li key={idx}>{area}</li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Kontakt</h4>
            <ul>
              <li><a href="tel:+4741584000">+47 415 84 000</a></li>
              <li><a href="mailto:post@oslororogvarme.no">post@oslororogvarme.no</a></li>
              <li>Enebakkveien 119<br />0680 Oslo</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Oslo Rør og Varme AS. Alle rettigheter reservert.</p>
        </div>
      </div>
    </footer>
  )
}
