import React, { useState, useEffect } from 'react';
import { useStore, planPrices } from '../../context/StoreContext';

export default function CheckoutModal() {
  const { modal, closeModal, checkoutPlan, completeCheckout } = useStore();
  const open = modal.type === 'checkout';
  const [step, setStep] = useState('details');
  const [plan, setPlan] = useState('MONTHLY');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (open) {
      setPlan(planPrices[checkoutPlan] ? checkoutPlan : 'MONTHLY');
      setStep('details');
    }
  }, [open, checkoutPlan]);

  const planInfo = planPrices[plan];

  function openPayment(e) {
    e.preventDefault();
    setStep('scan');
  }

  function viewGymPass() {
    completeCheckout(name, planInfo.label);
    setName('');
    setEmail('');
  }

  return (
    <div className={'modal-backdrop' + (open ? ' open' : '')}>
      <div className="modal-card checkout-card">
        <button className="modal-close" onClick={closeModal} aria-label="Close checkout">✕</button>
        <div className="checkout-progress">
          <span className={step === 'details' ? 'active' : 'done'}>1</span><i />
          <span className={step === 'scan' ? 'active' : step === 'success' ? 'done' : ''}>2</span><i />
          <span className={step === 'success' ? 'active' : ''}>3</span>
        </div>

        {step === 'details' && (
          <>
            <div className="modal-subtitle">MEMBERSHIP CHECKOUT</div>
            <h3 className="modal-title">Choose your membership.</h3>
            <p className="checkout-intro">Pick a gym duration that works for you, then pay using any UPI app.</p>
            <form onSubmit={openPayment} className="checkout-form">
              <div className="field">
                <label htmlFor="coPlan">Membership Duration</label>
                <select id="coPlan" value={plan} onChange={e => setPlan(e.target.value)}>
                  {Object.entries(planPrices).map(([key, item]) => <option key={key} value={key}>{item.label} — ₹{item.price.toLocaleString('en-IN')}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="coName">Full Name</label>
                <input type="text" id="coName" placeholder="e.g. Rahul Sharma" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="field">
                <label htmlFor="coEmail">Email Address</label>
                <input type="email" id="coEmail" placeholder="rahul@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <PaymentSummary planInfo={planInfo} />
              <button type="submit" className="btn btn-primary checkout-pay-button">Pay Now <span>→</span></button>
              <p className="checkout-safe">Demo payment flow · No real transaction is processed</p>
            </form>
          </>
        )}

        {step === 'scan' && (
          <div className="payment-step">
            <div className="modal-subtitle">UPI PAYMENT</div>
            <h3 className="modal-title">Scan to pay ₹{planInfo.price.toLocaleString('en-IN')}</h3>
            <p className="checkout-intro">{planInfo.label} · Valid for {planInfo.duration}</p>
            <div className="qr-payment-box">
              <div className="qr-code" aria-label="Demo QR code"><span /></div>
              <div><strong>Iron Pulse Fitness</strong><span>ironpulse@upi</span><small>UPI ID</small></div>
            </div>
            <PaymentSummary planInfo={planInfo} compact />
            <button className="btn btn-primary checkout-pay-button" onClick={() => setStep('success')}>I've Completed Payment</button>
            <button className="checkout-back" onClick={() => setStep('details')}>← Edit membership details</button>
          </div>
        )}

        {step === 'success' && (
          <div className="payment-success">
            <div className="success-mark">✓</div>
            <div className="modal-subtitle">PAYMENT SUCCESSFUL</div>
            <h3 className="modal-title">You're in, {name.split(' ')[0] || 'Member'}!</h3>
            <p>Your ₹{planInfo.price.toLocaleString('en-IN')} demo payment for the {planInfo.label} has been confirmed.</p>
            <div className="success-reference"><span>Membership validity</span><strong>{planInfo.duration}</strong></div>
            <button className="btn btn-primary checkout-pay-button" onClick={viewGymPass}>View My Gym Pass</button>
          </div>
        )}
      </div>
    </div>
  );
}

function PaymentSummary({ planInfo }) {
  return <div className="payment-summary"><div><span>Membership plan</span><strong>{planInfo.duration}</strong></div><div className="payment-total"><span>Payable today</span><strong>₹{planInfo.price.toLocaleString('en-IN')}</strong></div></div>;
}
