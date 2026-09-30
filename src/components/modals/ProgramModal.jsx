import React from 'react';
import { useStore } from '../../context/StoreContext';

export default function ProgramModal() {
  const { modal, closeModal, openCheckoutModal } = useStore();
  const open = modal.type === 'program';
  const p = modal.data;
  if (!p) return null;

  return (
    <div className={'modal-backdrop' + (open ? ' open' : '')}>
      <div className="modal-card">
        <button className="modal-close" onClick={closeModal}>✕</button>
        <div className="modal-subtitle">{p.level.toUpperCase()} PROGRAM</div>
        <h3 className="modal-title">{p.title}</h3>
        <p style={{ color: 'var(--muted)', fontSize: '14.5px', lineHeight: 1.6, marginBottom: '20px' }}>{p.desc}</p>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', background: 'var(--bg)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }}>
          <div><span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>DURATION</span><strong>{p.duration}</strong></div>
          <div><span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>FREQUENCY</span><strong>{p.freq}</strong></div>
          <div><span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>TARGET</span><strong>{p.cat}</strong></div>
        </div>

        <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Sample Weekly Workout Split</h4>
        <table className="modal-split-table">
          <thead><tr><th>Day</th><th>Focus</th><th>Key Exercises</th></tr></thead>
          <tbody>
            {p.split.map((s, i) => (
              <tr key={i}>
                <td><strong>{s.day}</strong></td>
                <td>{s.focus}</td>
                <td style={{ color: 'var(--muted)' }}>{s.ex}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
          <button className="btn btn-primary btn-block" onClick={() => { closeModal(); openCheckoutModal('MONTHLY'); }}>
            Enroll In Program
          </button>
        </div>
      </div>
    </div>
  );
}
