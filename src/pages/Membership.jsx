import React, { useMemo, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useReveal } from '../hooks/useReveal';
import { scheduleData } from '../data/schedule';
import Testimonials from '../components/Testimonials';
import FinalCta from '../components/FinalCta';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TYPES = ['all', 'Strength', 'HIIT', 'Yoga', 'CrossFit'];
const MEMBERSHIP_PLANS = [
  { id: 'MONTHLY', title: 'Monthly Plan', price: '1,999', duration: '1 month access', desc: 'Flexible access for members who want to train month by month.', features: ['Full gym floor access', 'Group classes access', 'Fitness assessment', 'Pause or renew anytime'] },
  { id: 'QUARTERLY', title: '3 Month Plan', price: '5,499', duration: '3 months access', desc: 'Build consistency with a focused three-month routine.', features: ['Full gym floor access', 'Unlimited group classes', 'Monthly progress tracking', 'Save ₹498 vs monthly'] },
  { id: 'HALF_YEARLY', title: '6 Month Plan', price: '9,999', duration: '6 months access', desc: 'The sweet spot for visible, sustained gym progress.', features: ['Full gym floor access', 'Unlimited group classes', 'Bi-monthly progress review', 'Save ₹1,995 vs monthly'], popular: true },
  { id: 'ANNUAL', title: '1 Year Plan', price: '17,999', duration: '12 months access', desc: 'Commit to your strongest year and get the best value.', features: ['Full gym floor access', 'Unlimited group classes', 'Quarterly body assessment', 'Save ₹5,989 vs monthly'] }
];

export default function Membership() {
  const { openCheckoutModal, bookings, toggleBookClass } = useStore();
  useReveal([]);
  const [day, setDay] = useState('Mon');
  const [type, setType] = useState('all');
  const dayClasses = scheduleData[day] || [];
  const filtered = useMemo(() => dayClasses.filter(c => type === 'all' || c.type === type), [dayClasses, type]);

  return (
    <>
      <main>
        <section className="membership section-pad" id="membership">
          <div className="wrap">
            <div className="section-head reveal" style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
              <span className="eyebrow-free-label">Gym Membership</span>
              <h2>Choose your training duration.</h2>
              <p>Simple gym plans with better value when you commit for longer.</p>
            </div>
            <div className="pricing-grid duration-pricing-grid">
              {MEMBERSHIP_PLANS.map(item => (
                <div className={'price-card reveal' + (item.popular ? ' popular' : '')} key={item.id}>
                  {item.popular && <span className="popular-tag">BEST VALUE</span>}
                  <h3>{item.title.toUpperCase()}</h3>
                  <div className="price-amt"><b>₹<span className="price-num">{item.price}</span></b></div>
                  <span className="plan-duration">{item.duration}</span>
                  <p className="desc">{item.desc}</p>
                  <ul className="price-list">{item.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
                  <button onClick={() => openCheckoutModal(item.id)} className={'btn btn-block ' + (item.popular ? 'btn-primary' : 'btn-ghost')}>CHOOSE PLAN</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad" id="schedule">
          <div className="wrap">
            <div className="section-head reveal"><span className="eyebrow-free-label">Class Schedule &amp; Booking</span><h2>This week on the floor.</h2><p>Filter by day and category. Reserve your spot in real time.</p></div>
            <div className="section-toolbar reveal">
              <div className="filter-pills">{DAYS.map(d => <button key={d} className={'filter-pill' + (day === d ? ' active' : '')} onClick={() => setDay(d)}>{d}</button>)}</div>
              <div className="filter-pills">{TYPES.map(t => <button key={t} className={'filter-pill' + (type === t ? ' active' : '')} onClick={() => setType(t)}>{t === 'all' ? 'All Types' : t}</button>)}</div>
            </div>
            <div className="reveal" style={{ overflowX: 'auto' }}>
              <table className="sched-table">
                <thead><tr><th>Time</th><th>Class</th><th>Trainer</th><th>Category</th><th>Availability</th><th>Action</th></tr></thead>
                <tbody>
                  {filtered.length === 0 && <tr><td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: 'var(--muted)' }}>No classes scheduled for this filter.</td></tr>}
                  {filtered.map((c, i) => {
                    const bookingKey = day + '_' + c.time + '_' + c.name;
                    const isBooked = bookings.some(b => b.key === bookingKey);
                    return <tr key={i}><td className="time">{c.time}</td><td><strong>{c.name}</strong></td><td>{c.trainer}</td><td><span className="tag-pill">{c.type}</span></td><td><span className="seats-left">{c.seats} spots left</span></td><td><button className={'book-btn' + (isBooked ? ' booked' : '')} onClick={() => toggleBookClass(day, c.time, c.name, c.trainer, c.type)}>{isBooked ? 'Booked ✓' : 'Book Spot'}</button></td></tr>;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Testimonials />
      <FinalCta />
    </>
  );
}
