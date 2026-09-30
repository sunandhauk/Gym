import React, { useRef } from 'react';

const TESTIMONIALS = [
  { text: "Six months in and I've hit strength numbers I didn't think were possible. The coaching here is genuinely different.", name: 'Sanjay Kumar', since: 'Member since 2023', img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=100&q=80' },
  { text: "The BMI calculator and live class booking engine on the site sold me before I even walked in. It's seamless.", name: 'Meera Iyer', since: 'Member since 2022', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80' },
  { text: 'Best gym community in the city, full stop. My trainer knows my schedule better than I do.', name: 'Farhan Sheikh', since: 'Member since 2024', img: 'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?auto=format&fit=crop&w=100&q=80' },
  { text: "I've joined three gyms in this city. Iron Pulse is the only one where I actually kept coming back.", name: 'Divya Krishnan', since: 'Member since 2021', img: 'https://images.unsplash.com/photo-1611432579699-484f7990b127?auto=format&fit=crop&w=100&q=80' }
];

export default function Testimonials() {
  const trackRef = useRef(null);
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cardWidth = 362;

  function scrollBy(delta) {
    trackRef.current?.scrollBy({ left: delta, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  return (
    <section className="section-pad testimonials-section" style={{ background: 'var(--surface)' }} id="testimonials">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow-free-label">Testimonials</span>
          <h2>What our members say.</h2>
        </div>
        <div className="testi-track reveal" ref={trackRef}>
          {TESTIMONIALS.map((t, i) => (
            <div className="testi-card" key={i}>
              <div className="testi-stars">★★★★★</div>
              <p>"{t.text}"</p>
              <div className="testi-person">
                <img src={t.img} alt="" />
                <div><b>{t.name}</b><span>{t.since}</span></div>
              </div>
            </div>
          ))}
        </div>
        <div className="testi-nav reveal">
          <button aria-label="Previous testimonial" onClick={() => scrollBy(-cardWidth)}>←</button>
          <button aria-label="Next testimonial" onClick={() => scrollBy(cardWidth)}>→</button>
        </div>
      </div>
    </section>
  );
}
