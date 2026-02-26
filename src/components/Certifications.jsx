import './Certifications.css'

export default function Certifications() {
  const certifications = [
    { name: 'Sentralt Godkjent', icon: '✓' },
    { name: 'Rørentreprenørene Norge', icon: '✓' },
    { name: 'Godkjent Lærebedrift', icon: '✓' },
    { name: 'VVS Fagmann', icon: '✓' },
    { name: 'NHO medlem', icon: '✓' }
  ]

  return (
    <section className="section section-dark">
      <div className="container">
        <div className="section-title">
          <h2 style={{ color: 'white' }}>Sertifiseringer og godkjenninger</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Vi oppfyller høyeste standarder innen bransjen</p>
        </div>

        <div className="certifications-grid">
          {certifications.map((cert, idx) => (
            <div key={idx} className="certification-item">
              <div className="cert-icon">{cert.icon}</div>
              <p>{cert.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
