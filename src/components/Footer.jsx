import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const SOCIALS = [
  { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/' },
  { label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/' },
  { label: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/' },
  { label: 'X', icon: 'x', href: 'https://x.com/' }
];

function SocialIcon({ name }) {
  const paths = {
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></>,
    facebook: <path fill="currentColor" stroke="none" d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6H16V3.8c-.3 0-.9-.1-1.8-.1-2.6 0-4.4 1.6-4.4 4.4V10H7v3h2.8v8h3.7Z" />,
    youtube: <path fill="currentColor" stroke="none" d="M21.6 7.2a2.9 2.9 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2A30.4 30.4 0 0 0 2 12a30.4 30.4 0 0 0 .4 4.8 2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2A30.4 30.4 0 0 0 22 12a30.4 30.4 0 0 0-.4-4.8ZM10 15.4V8.6l5.7 3.4-5.7 3.4Z" />,
    x: <path fill="currentColor" stroke="none" d="M18.9 3h3.7l-8.1 9.2L24 21h-7.4l-5.8-5.4L6 21H2.3l8.7-9.9L1.9 3h7.6l5.2 4.9L18.9 3Zm-1.3 16h2L8.4 4.9H6.3L17.6 19Z" />
  };

  return <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

export default function Footer() {
  const { showToast, openCheckoutModal } = useStore();

  function handleNewsletter(e) {
    e.preventDefault();
    showToast("You're subscribed! Welcome to Iron Pulse.");
    e.target.reset();
  }

  return (
    <footer id="contact">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo"><span className="dot"></span>IRON PULSE</Link>
            <p>Chennai's high-performance training studio. Coached programs, real community, measurable results.</p>
            <div className="footer-social">
              {SOCIALS.map(social => <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}><SocialIcon name={social.icon} /></a>)}
            </div>
          </div>

          <div className="footer-col">
            <h5>EXPLORE</h5>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/#about">About Us</Link></li>
              <li><Link to="/programs">Training Programs</Link></li>
              <li><Link to="/trainers">Expert Coaches</Link></li>
              <li><Link to="/membership#schedule">Class Schedule</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>MEMBERSHIP PLANS</h5>
            <ul>
              <li><button onClick={() => openCheckoutModal('MONTHLY')}>Monthly Plan</button></li>
              <li><button onClick={() => openCheckoutModal('QUARTERLY')}>3 Month Plan</button></li>
              <li><button onClick={() => openCheckoutModal('HALF_YEARLY')}>6 Month Plan</button></li>
              <li><button onClick={() => openCheckoutModal('ANNUAL')}>1 Year Plan</button></li>
              <li><Link to="/programs#calculator">Fitness Calculator</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>CONTACT</h5>
            <p><a href="https://www.google.com/maps/search/?api=1&query=42+Anna+Salai+Chennai+Tamil+Nadu+600002" target="_blank" rel="noreferrer">42 Anna Salai, Chennai, TN 600002</a></p>
            <p><a href="tel:+919876543210">+91 98765 43210</a></p>
            <p><a href="mailto:hello@ironpulsefitness.in">hello@ironpulsefitness.in</a></p>
            <form className="news-form" onSubmit={handleNewsletter}>
              <input type="email" placeholder="Your email" aria-label="Email address" required />
              <button type="submit">JOIN</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Iron Pulse Fitness. All rights reserved.</span>
          <div className="footer-legal">
            <button onClick={() => showToast('Privacy Policy: your information is only used to manage your membership.')}>Privacy Policy</button>
            <span>·</span>
            <button onClick={() => showToast('Terms of Service: memberships are subject to gym policies and class availability.')}>Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
