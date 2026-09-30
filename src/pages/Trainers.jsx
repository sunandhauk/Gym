import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { trainers } from '../data/trainers';
import Testimonials from '../components/Testimonials';
import FinalCta from '../components/FinalCta';

const SPECS = ['all', 'Strength', 'Nutrition', 'CrossFit'];

export default function Trainers() {
  useReveal([]);
  const [spec, setSpec] = useState('all');

  const filtered = useMemo(
    () => trainers.filter(t => spec === 'all' || t.spec === spec),
    [spec]
  );

  return (
    <>
      <main>
        <section className="section-pad" id="trainers" style={{ background: 'var(--surface)' }}>
          <div className="wrap">
            <div className="section-head reveal">
              <span className="eyebrow-free-label">Trainers</span>
              <h2>Coaches who show up for you.</h2>
              <p>Click any coach card to view bio, certifications & book 1-on-1 coaching.</p>
            </div>

            <div className="section-toolbar reveal">
              <div className="filter-pills">
                {SPECS.map(s => (
                  <button key={s} className={'filter-pill' + (spec === s ? ' active' : '')} onClick={() => setSpec(s)}>
                    {s === 'all' ? 'All Specialties' : s}
                  </button>
                ))}
              </div>
            </div>

            <div className="trainer-grid">
              {filtered.map(t => (
                <Link className="trainer-card" key={t.id} to={`/trainers/${t.id}`} aria-label={`View ${t.name}'s profile`}>
                  <img src={t.img} alt={t.name} />
                  <div className="trainer-overlay">
                    <h4>{t.name}</h4>
                    <div className="spec">{t.spec} Specialist</div>
                    <div className="trainer-detail">
                      <p>{t.cert}</p>
                      <div className="consult-btn">Book 1-on-1 Consultation</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Testimonials />
      <FinalCta />
    </>
  );
}
