import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ASSETS } from '../../config/assets';
import { NAV_LINKS, SITE } from '../../config/site';

const DESKTOP_NAV = [
  { href: '#designs', label: 'Collections' },
  { href: '#preview-studio', label: 'Preview Studio' },
  { href: '#experience', label: 'Celebration Moods', isSecondary: true },
  { href: '#how-it-works', label: 'How It Works', isSecondary: true },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faqs', label: 'FAQs' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 980) {
        setMobileMenuOpen(false);
        document.body.classList.remove('menu-open');
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (e, href) => {
    setMobileMenuOpen(false);
    if (href === '#hero' || href === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        const base = import.meta.env.BASE_URL || '/';
        const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
        window.location.href = `${cleanBase}/${href}`;
      }
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        {/* Left: Dedicated Atelier Brand Identity */}
        <div className="header-brand-wrap">
          <a
            href="#hero"
            className="brand-link"
            onClick={(e) => handleNavClick(e, '#hero')}
            aria-label="ORYNZA Atelier — Return to Home"
          >
            <img
              src={ASSETS.brand.logo}
              alt="ORYNZA — Boutique Digital Wedding Invitations"
              className="brand-logo-img"
              width="155"
              height="52"
              loading="eager"
            />
          </a>
          <div className="brand-editorial-tagline" aria-hidden="true">
            <span className="tagline-eyebrow">DIGITAL WEDDING ATELIER</span>
            <span className="tagline-phrase">{SITE.tagline}</span>
          </div>
        </div>

        {/* Centre: Main Curated Navigation */}
        <nav className="nav-desktop" aria-label="Main Atelier Navigation">
          {DESKTOP_NAV.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-desktop-link ${link.isSecondary ? 'nav-link-secondary' : ''}`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: High-Intent Actions */}
        <div className="header-cta-group">
          <Link
            to="/invite/demo-wedding"
            className="header-demo-link"
            title="Experience a sample wedding invitation page"
          >
            <span className="live-dot" aria-hidden="true"></span>
            <span>Live Guest Demo</span>
          </Link>
          <a
            href="#contact"
            className="btn btn-primary btn-sm header-consult-btn"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Create My Invitation
          </a>
        </div>

        {/* Mobile Navigation Toggle Button */}
        <button
          type="button"
          className="menu-toggle-btn"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-drawer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Overlay — strictly conditionally rendered */}
      {mobileMenuOpen && (
        <div
          className="mobile-nav-overlay is-open"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Mobile Navigation Drawer — strictly rendered only when open */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="mobile-nav-menu is-open"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
        >
          <div className="mobile-nav-top">
            <div className="mobile-brand-head">
              <img
                src={ASSETS.brand.logo}
                alt="ORYNZA"
                className="mobile-menu-logo"
                width="145"
                height="48"
              />
              <span className="mobile-monogram-mark" aria-hidden="true">
                <img src={ASSETS.brand.faviconMark} alt="" className="mobile-mark-img" />
              </span>
            </div>
            <p className="mobile-nav-quote">“{SITE.tagline}”</p>
            <span className="mobile-nav-sub">Boutique Digital Wedding Invitations</span>
          </div>

          <ul className="mobile-nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  <span>{link.label}</span>
                  <span className="mobile-link-arrow" aria-hidden="true">→</span>
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/invite/demo-wedding"
                className="mobile-nav-link mobile-nav-highlight"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>✦ View Live Demo Invitation</span>
                <span className="mobile-link-arrow" aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>

          <div className="mobile-cta-wrapper">
            <a
              href="#contact"
              className="btn btn-primary btn-block"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              Create My Invitation
            </a>
            <a
              href={SITE.whatsappBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-block mobile-wa-direct-btn"
            >
              <span>💬 Chat on WhatsApp: {SITE.displayPhone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
