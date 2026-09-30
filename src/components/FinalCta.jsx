import React from 'react';
import { useStore } from '../context/StoreContext';

export default function FinalCta() {
  const { openCheckoutModal } = useStore();
  return (
    <section className="final-cta" id="join">
      <div className="wrap reveal">
        <h2>YOUR STRONGEST VERSION IS WAITING.</h2>
        <button onClick={() => openCheckoutModal('MONTHLY')} className="btn btn-primary" style={{ padding: '20px 44px', fontSize: '15px' }}>
          JOIN IRON PULSE NOW
        </button>
      </div>
    </section>
  );
}
