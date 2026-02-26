import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>Din rørlegger i Oslo og omegn</h1>
        <p className="hero-subtitle">
          Kompetent, pålitelig og rask service for alle dine rørlegger-behov
        </p>
        <div className="hero-buttons">
          <a href="#contact" className="btn btn-primary">Gratis befaring</a>
          <a href="#contact" className="btn btn-outline">Kontakt oss</a>
        </div>
      </div>
      <div className="hero-background"></div>
    </section>
  )
}
