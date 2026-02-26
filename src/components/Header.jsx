import { useState } from 'react'
import './Header.css'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">
          <h1>Oslo Rør & Varme</h1>
        </div>
        
        <button 
          className="menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>

        <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <a href="#home">Hjem</a>
          <a href="#services">Tjenester</a>
          <a href="#about">Om oss</a>
          <a href="#testimonials">Omtaler</a>
          <a href="#contact">Kontakt</a>
        </nav>

        <div className="header-contact">
          <a href="tel:+4741584000" className="phone">+47 415 84 000</a>
        </div>
      </div>
    </header>
  )
}
