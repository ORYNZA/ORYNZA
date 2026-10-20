import React from 'react';
import { WHY_ORYNZA_VALUES } from '../../data/whyOrynza';

export default function WhyOrynzaSection() {
  return (
    <section className="section why-orynza-section" aria-label="Why ORYNZA">
      <div className="container">
        <div className="section-header text-center">
          <span className="eyebrow">The Studio Difference</span>
          <h2 className="section-title">Designed Around What Matters</h2>
          <p className="section-subtitle">
            Crafting invitations that celebrate Indian wedding hospitality with contemporary digital ease.
          </p>
        </div>

        <div className="why-orynza-grid">
          {WHY_ORYNZA_VALUES.map((val, i) => (
            <article key={i} className="why-card">
              <div className="why-card-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <h3 className="why-card-title">{val.title}</h3>
              <p className="why-card-desc">{val.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
