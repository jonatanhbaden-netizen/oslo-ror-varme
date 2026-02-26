import './Testimonials.css'

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Jarle Skullerud',
      rating: 5,
      text: 'Hyggelig og dyktige fagfolk. Lett å forholde seg til. Rørlegger forklarte hvilke muligheter som fantes, og gav meg valg. Til å stole på. Et firma jeg helt sikkert vil bruke igjen.'
    },
    {
      id: 2,
      name: 'Siv Roland',
      rating: 5,
      text: 'Strålende jobb, god kommunikasjon og til å stole på. Veldig hyggelig og profesjonelt. Anbefales!'
    },
    {
      id: 3,
      name: 'Helge Irgens',
      rating: 5,
      text: 'Møtte opp etter avtale, god pris, god kommunikasjon og god service. Anbefales.'
    }
  ]

  const renderStars = (rating) => {
    return '★'.repeat(rating)
  }

  return (
    <section className="section section-light" id="testimonials">
      <div className="container">
        <div className="section-title">
          <h2>Hva våre kunder sier</h2>
          <p>Vi er stolte av tilbakemeldingene fra våre fornøyde kunder</p>
        </div>

        <div className="grid grid-3">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card card">
              <div className="testimonial-rating">
                {renderStars(testimonial.rating)}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <p className="testimonial-author">— {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
