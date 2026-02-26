import './Services.css'

export default function Services() {
  const services = [
    {
      id: 1,
      title: 'Rørleggertjenester',
      description: 'Fra små serviceoppdrag til komplette systemer for bad og kjøkken. Rask og pålitelig service med fokus på kvalitet.',
      icon: '🔧'
    },
    {
      id: 2,
      title: 'Vannbåren varme',
      description: 'Installasjon og vedlikehold av vannbårne varmesystemer. Energieffektive løsninger for ditt hjem.',
      icon: '🌡️'
    },
    {
      id: 3,
      title: 'Oppussing bad',
      description: 'Komplette baderomsrenovasjoner med sterk håndverkskompetanse og profesjonell gjennomføring.',
      icon: '🚿'
    },
    {
      id: 4,
      title: 'Lekkasjereparasjon',
      description: 'Rask utbedring av lekkasjer og vannproblemer. Vi finner problemet og løser det effektivt.',
      icon: '💧'
    }
  ]

  return (
    <section className="section section-light" id="services">
      <div className="container">
        <div className="section-title">
          <h2>Våre tjenester</h2>
          <p>Vi tilbyr et bredt spekter av profesjonelle rørlegger-tjenester for privatmarkedet</p>
        </div>

        <div className="grid grid-2">
          {services.map(service => (
            <div key={service.id} className="service-card card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#contact" className="service-link">Les mer →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
