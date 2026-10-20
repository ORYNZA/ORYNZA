import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, MessageCircle, X } from 'lucide-react';
import { FOOTER_NAV, NAV, SITE } from '../config/site';
import { waLink } from '../lib/whatsapp';
import { WhatsAppLink } from './ui';

export function Logo({ className = '', big = false }) {
  return (
    <img
      className={`logo ${big ? 'logo-big' : ''} ${className}`}
      src="/orynza-logo.webp"
      width="1100"
      height="387"
      alt="ORYNZA — Made for Moments That Matter"
    />
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onResize = () => window.innerWidth >= 960 && setOpen(false);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('menu-open');
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className={`site-head ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="wrap head-row">
        <Link to="/" className="brand" aria-label="ORYNZA — home"><Logo /></Link>
        <nav id="primary-nav" className={`nav ${open ? 'is-open' : ''}`} aria-label="Primary">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}>
              {n.label}
            </NavLink>
          ))}
          <WhatsAppLink className="btn btn-sage nav-cta" message={SITE.orderMessage}>Place an Order</WhatsAppLink>
        </nav>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <Logo big />
          <p>{SITE.tagline}</p>
          <p className="foot-small">India-wide digital service</p>
        </div>
        <nav aria-label="Footer">
          <h2>Explore</h2>
          <ul>
            {FOOTER_NAV.map((n) => (<li key={n.to}><Link to={n.to}>{n.label}</Link></li>))}
          </ul>
        </nav>
        <div>
          <h2>Talk to us</h2>
          <p>
            <a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp: {SITE.displayPhone}</a>
          </p>
          <ul>
            <li><Link to="/privacy">Privacy notice</Link></li>
            <li><Link to="/terms">Terms &amp; service policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap foot-base">
        <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
        <span>Example couples, dates and venues on this site are illustrative.</span>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname, hash } = useLocation();
  const mainRef = useRef(null);
  const first = useRef(true);

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
    if (!first.current) mainRef.current?.focus({ preventScroll: true });
    first.current = false;
  }, [pathname, hash]);

  return (
    <>
      <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); mainRef.current?.focus(); mainRef.current?.scrollIntoView(); }}>
        Skip to content
      </a>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      {pathname !== '/contact' && (
        <a className="float-chat" href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with ORYNZA on WhatsApp">
          <MessageCircle size={22} aria-hidden="true" />
          <span>Chat on WhatsApp</span>
        </a>
      )}
    </>
  );
}
