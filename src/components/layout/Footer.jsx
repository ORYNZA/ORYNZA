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
      <div className="container">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <img
              src={ASSETS.brand.logo}
              alt="ORYNZA Logo"
              className="footer-logo"
              width="140"
              height="46"
            />
            <p className="footer-tagline">“{SITE.tagline}”</p>
            <p className="footer-desc">
              A boutique digital wedding invitation studio creating elegant, personalised invitation experiences for Indian couples and families.
            </p>
          </div>

          <div>
            <h3 className="footer-col-title">Navigation</h3>
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
                <Link to="/invite/demo-wedding" className="footer-link">
                  Sample Demonstration Page
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-col-title">Direct Studio Contact</h3>
            <ul className="footer-links-list">
              <li>
                <a
                  href={SITE.whatsappBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  WhatsApp: {SITE.displayPhone}
                </a>
              </li>
              <li>
                <span className="footer-link" style={{ cursor: 'default' }}>
                  India-Wide Digital Service
                </span>
              </li>
            </ul>
            <div style={{ marginTop: '1.25rem' }}>
              <a
                href={SITE.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-sm"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-row">
          <span>© {currentYear} {SITE.name}. All rights reserved.</span>
          <span>
            Demonstration couples, dates, and venue titles shown on this website are fictional.
          </span>
        </div>
      </div>
    </footer>
  );
}
