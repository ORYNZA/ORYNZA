import React from 'react';
import { PACKAGES, PRICING_DISCLAIMER } from '../../data/packages';
import { ASSETS } from '../../config/assets';

export default function PricingSection({ onSelectPackage }) {
  return (
    <section id="pricing" className="section pricing-section" aria-label="Transparent Atelier Pricing">
      {/* Background Decorative Layer */}
      <div
        className="pricing-bg-layer"
        style={{ backgroundImage: `url(${ASSETS.backgrounds.pricing})` }}
        aria-hidden="true"
      />
      
      <div className="container pricing-container-inner">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="pricing-header-badge">
            <span className="badge-gem">✦</span>
            <span>TRANSPARENT ATELIER INVESTMENT</span>
            <span className="badge-gem">✦</span>
          </div>
          <h2 className="section-title">Honest Pricing. Exquisite Craft.</h2>
          <p className="section-subtitle">
            No hidden fees or unexpected charges. Select the invitation suite that matches the scale and intimacy of your celebration.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          {PACKAGES.map((pkg) => {
            const isRec = pkg.recommended;
            return (
              <div
                key={pkg.id}
                className={`pricing-card ${isRec ? 'is-recommended' : ''}`}
              >
                {/* Recommendation Ribbon */}
                {isRec && (
                  <div className="recommended-pill">
                    <span className="pill-gem">✦</span>
                    <span>Most Popular Wedding Suite</span>
                  </div>
                )}

                <div className="pricing-card-header">
                  <span className="pricing-suite-tag">
                    {pkg.id === 'essential' ? 'Essential Suite' : pkg.id === 'wedding-plus' ? 'Ceremony Suite' : 'Concierge Heirloom'}
                  </span>
                  <h3 className="pricing-plan-name">{pkg.name}</h3>
                  <p className="pricing-plan-desc">{pkg.description}</p>
                  
                  <div className="pricing-amount-row">
                    <span className="pricing-currency">₹</span>
                    <span className="pricing-amount">{pkg.price}</span>
                    <span className="pricing-cadence">/ complete suite</span>
                  </div>
                </div>

                <div className="pricing-divider" aria-hidden="true"></div>

                {/* Inclusions List */}
                <div className="pricing-inclusions-wrapper">
                  <span className="inclusions-heading">What is included:</span>
                  <ul className="pricing-inclusions-list">
                    {pkg.inclusions.map((inc, i) => (
                      <li key={i} className="pricing-inclusion-item">
                        <span className="inclusion-check-icon" aria-hidden="true">✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Action */}
                <div className="pricing-card-footer">
                  <button
                    type="button"
                    className={`btn btn-block ${isRec ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => onSelectPackage(pkg.name)}
                  >
                    <span>{pkg.ctaText}</span>
                    <span aria-hidden="true">→</span>
                  </button>
                  <p className="pricing-card-micro-guarantee">
                    {pkg.id === 'essential'
                      ? '1 tailored revision included'
                      : pkg.id === 'wedding-plus'
                      ? 'Up to 2 revisions & venue link included'
                      : 'Up to 3 revisions + post-delivery support'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Footnote & Honest Disclosure */}
        <div className="pricing-footnote-box">
          <p className="pricing-footnote-text">
            <strong>Atelier Policy:</strong> {PRICING_DISCLAIMER}
          </p>
        </div>
      </div>
    </section>
  );
}
