import React from 'react';
import { WHY_ORYNZA_VALUES } from '../../data/whyOrynza';
import { ASSETS } from '../../config/assets';

export default function WhyOrynzaSection() {
  return (
    <section className="section why-orynza-section" aria-label="Why Choose ORYNZA Atelier">
      <div className="container">
        <div className="section-header text-center">
          <div className="why-header-badge">
            <span className="badge-gem">✦</span>
            <span>THE ATELIER STANDARD</span>
            <span className="badge-gem">✦</span>
          </div>
          <h2 className="section-title">Designed Around What Genuinely Matters</h2>
          <p className="section-subtitle">
            We honor the sanctity of Indian wedding hospitality while giving modern families the digital ease they need to coordinate guests seamlessly.
          </p>
        </div>

        <div className="why-orynza-grid">
          {WHY_ORYNZA_VALUES.map((val, i) => (
            <article key={i} className="why-card">
              <div className="why-card-top">
                <span className="why-card-gem">✦</span>
                <span className="why-card-num">0{i + 1}</span>
              </div>
              <h3 className="why-card-title">{val.title}</h3>
              <p className="why-card-desc">{val.description}</p>
            </article>
          ))}
        </div>

        {/* Supporting Trust Banner */}
        <div className="why-trust-banner">
          <div className="trust-banner-badge">
            <img
              src={ASSETS.brand.faviconMark}
              alt=""
              aria-hidden="true"
              className="trust-banner-mark"
            />
          </div>
          <div className="trust-banner-text">
            <h4 className="trust-banner-heading">Private, Respectful &amp; Ad-Free</h4>
            <p className="trust-banner-desc">
              Your celebration is sacred. ORYNZA invitations are 100% private with no external advertisements, sponsored pop-ups, or third-party marketing tracking. Only you and your invited guests can view your wedding page.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
