import React from 'react';
import { Link } from 'react-router-dom';
import { ASSETS } from '../../config/assets';
import { NAV_LINKS, SITE } from '../../config/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, href) => {
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
    <footer className="site-footer">
      {/* Decorative Botanical Hairline */}
      <div className="footer-top-accent" aria-hidden="true">
        <span className="accent-line"></span>
        <span className="accent-gem">✦</span>
        <span className="accent-line"></span>
      </div>

      <div className="container">
        {/* Editorial Statement */}
        <div className="footer-manifesto-banner">
          <p className="footer-manifesto-eyebrow">THE ORYNZA PHILOSOPHY</p>
          <h2 className="footer-manifesto-heading">
            “Your wedding invitation is not merely an announcement — it is the first chapter of a lifetime of shared memories.”
          </h2>
          <div className="footer-manifesto-actions">
            <a href="#contact" className="btn btn-primary" onClick={(e) => handleNavClick(e, '#contact')}>
              Begin Your Custom Atelier Enquiry
            </a>
            <a
              href={SITE.whatsappBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
            >
              Consult with Our Stationery Designer on WhatsApp
            </a>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="footer-top-grid">
          {/* Brand Identity */}
          <div className="footer-brand-col">
            <img
              src={ASSETS.brand.logo}
              alt="ORYNZA Atelier"
              className="footer-logo"
              width="150"
              height="50"
            />
            <p className="footer-tagline">“{SITE.tagline}”</p>
            <p className="footer-desc">
              An independent digital wedding invitation atelier for Indian weddings. Blending tactile stationery craftsmanship, multi-event ceremony suites, and effortless digital guest coordination.
            </p>
            <div className="footer-location-badge">
              <span>✦ Handcrafted with Care in India • Serving Worldwide</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="footer-col-title">Atelier Directory</h3>
            <ul className="footer-links-list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="footer-link"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/invite/demo-wedding" className="footer-link footer-link-highlight">
                  Sample Wedding Suite Demo
                </Link>
              </li>
              <li>
                <Link to="/invite/sunset-shores" className="footer-link">
                  Sunset Shores Goa Wedding Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="footer-col-title">Signature Collections</h3>
            <ul className="footer-links-list">
              <li>
                <a href="#designs" className="footer-link" onClick={(e) => handleNavClick(e, '#designs')}>
                  Royal Lake Palace
                </a>
              </li>
              <li>
                <a href="#designs" className="footer-link" onClick={(e) => handleNavClick(e, '#designs')}>
                  Sunset Shores Coastal &amp; Beach
                </a>
              </li>
              <li>
                <a href="#designs" className="footer-link" onClick={(e) => handleNavClick(e, '#designs')}>
                  Blush Romance &amp; Rose
                </a>
              </li>
              <li>
                <a href="#designs" className="footer-link" onClick={(e) => handleNavClick(e, '#designs')}>
                  Modern Editorial Minimal
                </a>
              </li>
              <li>
                <a href="#designs" className="footer-link" onClick={(e) => handleNavClick(e, '#designs')}>
                  Traditional Indian Heritage
                </a>
              </li>
              <li>
                <a href="#designs" className="footer-link" onClick={(e) => handleNavClick(e, '#designs')}>
                  Evening Reception Velvet
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Studio Contact */}
          <div>
            <h3 className="footer-col-title">Direct Studio Contact</h3>
            <p className="footer-contact-note">
              Speak directly with our stationery design team. We reply on WhatsApp within hours with tailored layout ideas.
            </p>
            <ul className="footer-links-list footer-contact-list">
              <li>
                <a
                  href={SITE.whatsappBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link footer-whatsapp-link"
                >
                  <span className="wa-icon" aria-hidden="true">💬</span>
                  <span>WhatsApp: {SITE.displayPhone}</span>
                </a>
              </li>
              <li>
                <span className="footer-coord-item">
                  <strong>Hours:</strong> Mon – Sat, 9:30 AM – 8:00 PM IST
                </span>
              </li>
              <li>
                <span className="footer-coord-item">
                  <strong>Delivery:</strong> Digital delivery via WhatsApp &amp; secure link
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-row">
          <div className="footer-copyright">
            © {currentYear} {SITE.name} Digital Wedding Invitation Studio. All rights reserved.
          </div>
          <div className="footer-disclaimer-note">
            Demonstration couples, celebration dates, and venue titles displayed are fictional examples for presentation purposes.
          </div>
        </div>
      </div>
    </footer>
  );
}
