import './About.css'

export default function About() {
  return (
    <section className="section section-blue" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>Om Oslo Rør og Varme</h2>
            <p>
              Oslo Rør og Varme AS ble opprettet i 2019 som en søsterbedrift av Oslo Bad & Renovering AS. 
              Med fokus på privatmarkedet sikrer vi våre kunder god oppfølging og kvalitet i alle ledd.
            </p>
            <p>
              Vi er en kompakt og effektiv rørleggerbedrift med 6 ansatte. Vår brede tverrfaglig kunnskap 
              sikrer den beste løsningen for våre kunder til en konkurransedyktig pris.
            </p>
            <p>
              Vi opererer med rask service og god kvalitet. Så langt det lar seg gjøre gir vi en totalpris 
              (fastpris) på oppdraget før vi setter igang. Dette gir mer trygghet til kunden.
            </p>
            <div className="about-highlights">
              <div className="highlight">
                <h4>6 ansatte</h4>
                <p>Erfarne og dyktige fagfolk</p>
              </div>
              <div className="highlight">
                <h4>Siden 2019</h4>
                <p>Etablert og pålitelig</p>
              </div>
              <div className="highlight">
                <h4>Fastpris</h4>
                <p>Trygghet for kunden</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
