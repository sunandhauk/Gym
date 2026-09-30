import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const LINKS = [
  { to: '/', label: 'Home', page: '/', section: 'home' },
  { to: '/#about', label: 'About', page: '/', section: 'about' },
  { to: '/programs', label: 'Programs', page: '/programs' },
  { to: '/trainers', label: 'Trainers', page: '/trainers' },
  { to: '/membership', label: 'Membership', page: '/membership', section: 'membership' },
  { to: '/membership#schedule', label: 'Schedule', page: '/membership', section: 'schedule' }
];

export default function Navbar() {
  const { openCheckoutModal } = useStore();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function onScroll() {
      setSolid(window.scrollY > 60);
      let cur = null;
      document.querySelectorAll('main section[id], header[id]').forEach(sec => {
        const top = sec.offsetTop - 100;
        if (window.scrollY >= top) cur = sec.id;
      });
      setCurrent(cur);
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  // Handle in-page hash scrolling / cross-page hash navigation
  function handleLinkClick(e, link) {
    setMenuOpen(false);
    const [path, hash] = link.to.split('#');
    if (path === location.pathname || (path === '/' && location.pathname === '/')) {
      if (hash) {
        e.preventDefault();
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else navigate(link.to);
      }
    }
  }

  return (
    <>
      <nav className={'nav' + (solid ? ' solid' : '')} id="nav">
        <div className="wrap">
          <Link to="/" className="logo"><span className="dot"></span>IRON PULSE</Link>
          <div className="nav-links">
            {LINKS.map(link => {
              const active = link.page === location.pathname && (!link.section || link.section === current);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={'nav-link' + (active ? ' active' : '')}
                  onClick={(e) => handleLinkClick(e, link)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="nav-right">
            <a className="nav-whatsapp" href="https://wa.me/919962227547?text=Hi%20Iron%20Pulse%2C%20I%20would%20like%20to%20know%20more%20about%20your%20gym%20plans." target="_blank" rel="noreferrer" aria-label="Chat with Iron Pulse on WhatsApp">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.7 11.7 0 0 0 12.1 0C5.7 0 .5 5.2.5 11.6c0 2 .5 3.9 1.5 5.6L.4 23.5l6.5-1.7a11.6 11.6 0 0 0 5.2 1.2h.1c6.4 0 11.6-5.2 11.6-11.6 0-3.1-1.2-6-3.3-8Zm-8.4 17.6a9.4 9.4 0 0 1-4.8-1.3l-.4-.2-3.9 1 1-3.8-.3-.4a9.5 9.5 0 1 1 8.4 4.7Zm5.2-7.1c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-.9 1.2-.3.3-.6.1a7.8 7.8 0 0 1-2.3-1.4 8.7 8.7 0 0 1-1.6-2c-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5s0-.4 0-.5l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.5 1 2.9 1.2 3.1 2.1 3.3 5.2 4.6c.7.3 1.3.5 1.8.6.8.3 1.5.2 2 .1.6-.1 1.8-.7 2.1-1.4s.3-1.3.2-1.4-.3-.2-.6-.4Z" /></svg>
              <span>WhatsApp</span>
            </a>
            <button className="btn btn-primary btn-sm" onClick={() => openCheckoutModal('MONTHLY')}>JOIN NOW</button>
            <button
              className="burger"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(o => !o)}
            >
              <span style={{ transform: menuOpen ? 'translateY(7px) rotate(45deg)' : '' }}></span>
              <span style={{ opacity: menuOpen ? 0 : 1 }}></span>
              <span style={{ transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : '' }}></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={'mobile-menu' + (menuOpen ? ' open' : '')}>
        {LINKS.map(link => (
          <Link key={link.to} to={link.to} onClick={(e) => handleLinkClick(e, link)}>{link.label}</Link>
        ))}
      </div>
    </>
  );
}
