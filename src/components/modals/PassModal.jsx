import React from 'react';
import { useStore } from '../../context/StoreContext';

export default function PassModal() {
  const { modal, closeModal, membership } = useStore();
  const open = modal.type === 'pass';
  if (!membership) return null;

  return (
    <div className={'modal-backdrop' + (open ? ' open' : '')}>
      <div className="modal-card" style={{ maxWidth: '480px', background: 'transparent', border: 'none', padding: 0 }}>
        <button className="modal-close" onClick={closeModal} style={{ zIndex: 10, top: '10px', right: '10px' }}>✕</button>
        <div className="pass-card">
          <div className="pass-header">
            <div className="logo"><span className="dot"></span>IRON PULSE</div>
            <span className="save-badge">{membership.plan} MEMBER</span>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '1px', display: 'block' }}>MEMBER NAME</span>
            <h3 style={{ fontSize: '22px' }}>{membership.name}</h3>
          </div>
          <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>MEMBER ID</span>
              <strong style={{ color: 'var(--lime)', fontFamily: 'monospace', fontSize: '14px' }}>{membership.id}</strong>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>VALID UNTIL</span>
              <strong style={{ fontSize: '14px' }}>Aug 2027</strong>
            </div>
          </div>
          <div className="barcode-mock"></div>
          <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--muted)', marginTop: '10px' }}>Scan barcode at studio entrance gate.</p>
        </div>
      </div>
    </div>
  );
}
