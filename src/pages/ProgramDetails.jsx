import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { programs } from '../data/programs';
import { useStore } from '../context/StoreContext';
import { useReveal } from '../hooks/useReveal';

export default function ProgramDetails() {
  const { programId } = useParams();
  const { openCheckoutModal } = useStore();
  const program = programs.find((p) => p.id === programId);
  useReveal([programId]);

  if (!program) {
    return (
      <main className="program-detail-page">
        <div className="wrap section-pad">
          <div className="detail-empty">
            <h2>Program not found</h2>
            <p>The program you opened is no longer available.</p>
            <Link to="/programs" className="btn btn-primary">Back to Programs</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="program-detail-page">
      <section className="detail-hero">
        <div className="wrap detail-hero-inner">
          <div className="detail-hero-copy reveal">
            <span className="eyebrow-free-label">{program.level.toUpperCase()} PROGRAM</span>
            <h1>{program.title}</h1>
            <p>{program.desc}</p>
            <div className="detail-meta-row">
              <span>{program.duration}</span>
              <span>{program.freq}</span>
              <span>{program.cat}</span>
            </div>
            <div className="detail-actions">
              <button className="btn btn-primary" onClick={() => openCheckoutModal('MONTHLY')}>Enroll in Program</button>
              <Link to="/programs" className="btn btn-ghost">Back to Programs</Link>
            </div>
          </div>
          <div className="detail-hero-media reveal">
            <img src={program.img} alt={program.title} />
          </div>
        </div>
      </section>

      <section className="wrap detail-content">
        <div className="detail-panel reveal">
          <h3>Why this works</h3>
          <p>
            This track is built to help you stay consistent, improve performance, and create measurable progress with a realistic weekly structure.
          </p>
          <ul className="detail-points">
            <li>Structured progression with clear weekly focus</li>
            <li>Goal-specific training designed around your level</li>
            <li>Coach-guided accountability and performance tracking</li>
          </ul>
        </div>

        <div className="detail-panel reveal">
          <h3>Sample Weekly Split</h3>
          <div className="split-list">
            {program.split.map((item, index) => (
              <div className="split-row" key={`${item.day}-${index}`}>
                <div className="split-day">{item.day}</div>
                <div className="split-body">
                  <strong>{item.focus}</strong>
                  <span>{item.ex}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
