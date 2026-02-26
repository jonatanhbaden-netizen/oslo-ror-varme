import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, you would send this to a backend
    console.log('Form submitted:', formData)
    alert('Takk for din henvendelse! Vi kontakter deg snart.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <section className="section section-light" id="contact">
      <div className="container">
        <div className="contact-wrapper">
          <div className="contact-info">
            <h2>Kontakt oss</h2>
            <p>Vi svarer raskt på alle henvendelser. Ta kontakt for en uforpliktende og gratis befaring.</p>
            
            <div className="contact-details">
              <div className="contact-item">
                <h4>Telefon</h4>
                <a href="tel:+4741584000">+47 415 84 000</a>
              </div>
              <div className="contact-item">
                <h4>E-post</h4>
                <a href="mailto:post@oslororogvarme.no">post@oslororogvarme.no</a>
              </div>
              <div className="contact-item">
                <h4>Adresse</h4>
                <p>Enebakkveien 119<br />0680 Oslo</p>
              </div>
              <div className="contact-item">
                <h4>Åpningstider</h4>
                <p>Mandag - Fredag: 07:00 - 16:00<br />Lørdag - Søndag: Stengt</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Navn</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-post</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefon</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Melding</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">Send melding</button>
          </form>
        </div>
      </div>
    </section>
  )
}
