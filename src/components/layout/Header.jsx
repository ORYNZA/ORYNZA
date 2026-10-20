import React, { useState, useEffect } from 'react';
import { ASSETS } from '../../config/assets';
import { NAV_LINKS, SITE } from '../../config/site';

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

  const handleNavClick = (e, href) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If on another route, navigate to home with hash
        const base = import.meta.env.BASE_URL || '/';
        const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
        window.location.href = `${cleanBase}/${href}`;
      }
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#hero" className="brand-link" onClick={(e) => handleNavClick(e, '#hero')} aria-label="ORYNZA — Home">
          <img
            src={ASSETS.brand.logo}
            alt="ORYNZA Logo"
            className="brand-logo-img"
            width="140"
            height="46"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-desktop" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-desktop-link"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="header-cta-group">
          <a
            href="#contact"
            className="btn btn-primary btn-sm"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Create Your Invitation
          </a>
        </div>

        {/* Mobile Menu Button */}
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

      {/* Mobile Drawer */}
      <div
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'is-open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />
      <div
        id="mobile-nav-drawer"
        className={`mobile-nav-menu ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-label="Mobile Navigation Menu"
      >
        <ul className="mobile-nav-list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="mobile-nav-link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-cta-wrapper">
          <a
            href="#contact"
            className="btn btn-primary btn-block"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Create Your Invitation
          </a>
        </div>
      </div>
    </header>
  );
}
