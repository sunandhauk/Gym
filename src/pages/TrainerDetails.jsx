import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { trainers } from '../data/trainers';
import { useStore } from '../context/StoreContext';

const SLOTS = ['09:00 AM - 10:00 AM', '11:00 AM - 12:00 PM', '04:00 PM - 05:00 PM', '06:00 PM - 07:00 PM'];

export default function TrainerDetails() {
  const { trainerId } = useParams();
  const navigate = useNavigate();
  const { bookConsultation } = useStore();
  const trainer = trainers.find((item) => item.id === trainerId);
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState(SLOTS[0]);
  const [note, setNote] = useState('');

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split('T')[0]);
  }, [trainerId]);

  if (!trainer) {
    return <main className="trainer-detail-page"><div className="wrap section-pad detail-empty"><h2>Trainer not found.</h2><Link to="/trainers" className="btn btn-primary">Back to Trainers</Link></div></main>;
  }

  function handleBooking(e) {
    e.preventDefault();
    bookConsultation(trainer, date, slot);
    navigate('/trainers');
  }

  return (
    <main className="trainer-detail-page">
      <section className="wrap section-pad trainer-detail-section">
        <Link className="details-back" to="/trainers">← All Trainers</Link>
        <div className="trainer-detail-intro">
          <span className="eyebrow-free-label">Meet your coach</span>
          <p>Learn about {trainer.name.split(' ')[0]} and reserve a personal consultation.</p>
        </div>
        <div className="trainer-detail-layout">
          <div className="trainer-detail-image"><img src={trainer.img} alt={trainer.name} /></div>
          <div className="trainer-detail-info">
            <span className="eyebrow-free-label">{trainer.spec} Specialist</span>
            <h1>{trainer.name}</h1>
            <p className="trainer-cert">{trainer.cert}</p>
            <p className="trainer-bio">{trainer.bio}</p>
            <div className="trainer-highlights"><span>1-on-1 coaching</span><span>Goal-based sessions</span><span>Progress support</span></div>
          </div>
          <form className="trainer-booking" onSubmit={handleBooking}>
            <div className="modal-subtitle">BOOK A CONSULTATION</div>
            <h2>Train with {trainer.name.split(' ')[0]}.</h2>
            <div className="field"><label htmlFor="trainerDate">Preferred Date</label><input id="trainerDate" type="date" value={date} min={date} onChange={(e) => setDate(e.target.value)} required /></div>
            <div className="field"><label htmlFor="trainerSlot">Time Slot</label><select id="trainerSlot" value={slot} onChange={(e) => setSlot(e.target.value)}>{SLOTS.map((item) => <option key={item}>{item}</option>)}</select></div>
            <div className="field"><label htmlFor="trainerNote">Your Goal (optional)</label><textarea id="trainerNote" rows="3" placeholder="Tell your coach what you want to work on..." value={note} onChange={(e) => setNote(e.target.value)} /></div>
            <button className="btn btn-primary btn-block" type="submit">Confirm 1-on-1 Booking</button>
          </form>
        </div>
      </section>
    </main>
  );
}
