import React from 'react';
import { PACKAGES, PRICING_DISCLAIMER } from '../../data/packages';

export default function PricingSection({ onSelectPackage }) {
  return (
    <section id="pricing" className="section pricing-section" aria-label="Pricing and Packages">
      <div className="container">
        <div className="section-header text-center">
          <span className="eyebrow">Transparent Pricing</span>
          <h2 className="section-title">Thoughtful Design. Clear Pricing.</h2>
          <p className="section-subtitle">
            Choose the invitation experience that feels right for your celebration.
          </p>
        </div>

        <div className="pricing-grid">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`pricing-card ${pkg.recommended ? 'is-recommended' : ''}`}
            >
              {pkg.recommended && (
                <div className="recommended-pill">{pkg.badge}</div>
              )}

              <div className="pricing-header">
                <h3 className="pricing-plan-name">{pkg.name}</h3>
                <p className="pricing-plan-desc">{pkg.description}</p>
                <div className="pricing-amount-row">
                  <span className="pricing-amount">{pkg.priceDisplay}</span>
                  <span className="pricing-cadence">/ one-time</span>
                </div>
              </div>

              <ul className="pricing-inclusions-list">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="pricing-inclusion-item">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>

              <div className="pricing-card-footer">
                <button
                  type="button"
                  className={`btn btn-block ${pkg.recommended ? 'btn-gold' : 'btn-secondary'}`}
                  onClick={() => onSelectPackage(pkg.name)}
                >
                  {pkg.ctaText}
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="pricing-footnote">
          {PRICING_DISCLAIMER}
        </p>
      </div>
    </section>
  );
}
