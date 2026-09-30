import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';

export default function TrainerModal() {
  const { modal, closeModal, bookConsultation } = useStore();
  const open = modal.type === 'trainer';
  const t = modal.data;

  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('09:00 AM');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (open) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow.toISOString().split('T')[0]);
      setSlot('09:00 AM');
      setNote('');
    }
  }, [open, t]);

  if (!t) return null;

  function handleSubmit(e) {
    e.preventDefault();
    bookConsultation(t, date, slot);
    closeModal();
  }

  return (
    <div className={'modal-backdrop' + (open ? ' open' : '')}>
      <div className="modal-card">
        <button className="modal-close" onClick={closeModal}>✕</button>
        <div className="modal-subtitle">{t.spec.toUpperCase()} COACH</div>
        <h3 className="modal-title">{t.name}</h3>
        <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>{t.bio} ({t.cert})</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="field">
            <label htmlFor="consultDate">Select Preferred Date</label>
            <input type="date" id="consultDate" value={date} onChange={e => setDate(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="consultSlot">Select Time Slot</label>
            <select id="consultSlot" value={slot} onChange={e => setSlot(e.target.value)} required>
              <option value="09:00 AM">09:00 AM - 10:00 AM</option>
              <option value="11:00 AM">11:00 AM - 12:00 PM</option>
              <option value="04:00 PM">04:00 PM - 05:00 PM</option>
              <option value="06:00 PM">06:00 PM - 07:00 PM</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="consultNote">Goal / Notes for Coach</label>
            <textarea id="consultNote" rows="2" placeholder="e.g. Form check on deadlifts, nutrition advice..." value={note} onChange={e => setNote(e.target.value)}></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Confirm 1-on-1 Booking</button>
        </form>
      </div>
    </div>
  );
}
