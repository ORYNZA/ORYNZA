import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ASSETS } from '../../config/assets';
import { SITE } from '../../config/site';

export default function Hero({ onExploreDesigns, onCreateInvitation }) {
  const [partnerA, setPartnerA] = useState('');
  const [partnerB, setPartnerB] = useState('');

  const displayA = partnerA.trim() || 'Aarav';
  const displayB = partnerB.trim() || 'Meera';
  const monogramA = displayA.charAt(0).toUpperCase() || 'A';
  const monogramB = displayB.charAt(0).toUpperCase() || 'M';
  const monogramText = `${monogramA} & ${monogramB}`;

  const handleResetNames = () => {
    setPartnerA('');
    setPartnerB('');
  };

  return (
    <section id="hero" className="hero-section" aria-label="Welcome to ORYNZA Digital Wedding Atelier">
      {/* Background Layer with Subtle Paper Wash */}
      <div
        className="hero-bg-art"
        aria-hidden="true"
        style={{ backgroundImage: `url(${ASSETS.backgrounds.hero})` }}
      />
      <div className="hero-bg-overlay" aria-hidden="true" />

      <div className="container hero-grid">
        {/* Left Column: Editorial Headline & Actions */}
        <div className="hero-content">
          <div className="hero-eyebrow-badge">
            <span className="badge-sparkle">✦</span>
            <span>BOUTIQUE DIGITAL WEDDING ATELIER</span>
            <span className="badge-sparkle">✦</span>
          </div>

          <h1 className="hero-headline">
            <span className="headline-line-1">Where Love Finds Its</span>
            <span className="headline-line-2">
              <em>First Expression.</em>
            </span>
          </h1>

          <p className="hero-supporting-text">
            Individually handcrafted digital wedding invitations, multi-event ceremony suites, and effortless guest RSVP coordination for Indian celebrations — honoring sacred family traditions with contemporary digital grace.
          </p>

          {/* Streamlined Primary & Secondary Action Group */}
          <div className="hero-cta-group">
            <button
              type="button"
              className="btn btn-primary hero-btn-main"
              onClick={onCreateInvitation}
            >
              <span>Begin Atelier Consultation</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary hero-btn-sub"
              onClick={onExploreDesigns}
            >
              <span>Explore Collections</span>
            </button>
          </div>

          {/* Dedicated Editorial Demonstration Link Pill */}
          <div className="hero-demo-pill-wrap">
            <Link
              to="/invite/demo-wedding"
              className="hero-demo-pill"
              title="Open full interactive wedding invitation page demonstration"
            >
              <span className="pulse-indicator" aria-hidden="true"></span>
              <span className="pill-text">Experience a Complete Wedding Suite: <strong>View Live Guest Demo →</strong></span>
            </Link>
          </div>

          {/* Trust Value Badges */}
          <div className="hero-trust-bar">
            <div className="hero-trust-item">
              <span className="trust-icon" aria-hidden="true">✍</span>
              <span>Individually Hand-Typeset</span>
            </div>
            <div className="hero-trust-divider" aria-hidden="true">•</div>
            <div className="hero-trust-item">
              <span className="trust-icon" aria-hidden="true">🕊</span>
              <span>Multi-Event Timelines</span>
            </div>
            <div className="hero-trust-divider" aria-hidden="true">•</div>
            <div className="hero-trust-item">
              <span className="trust-icon" aria-hidden="true">📱</span>
              <span>WhatsApp &amp; Direct Web Link</span>
            </div>
          </div>

          <p className="hero-tagline-note">
            “{SITE.tagline}”
          </p>
        </div>

        {/* Right Column: Art-Directed Layered Stage */}
        <div className="hero-invitation-stage">
          {/* Transparent Botanical Overlay Floating Accent */}
          <img
            src={ASSETS.decorative.botanicalOverlay}
            alt=""
            aria-hidden="true"
            className="hero-floating-botanical"
          />

          {/* Secondary Overlapping Background Card */}
          <div className="hero-companion-card" aria-hidden="true">
            <img
              src={ASSETS.mockups.traditionalIndian}
              alt=""
              className="companion-card-img"
              loading="eager"
            />
          </div>

          {/* Primary Hero Invitation Showcase Frame */}
          <div className="hero-mockup-frame">
            <div className="hero-mockup-inner">
              <img
                src={ASSETS.mockups.heroMockup}
                alt="ORYNZA signature digital wedding invitation mockup in warm ivory with gold detailing"
                className="hero-mockup-img"
                width="380"
                height="475"
                fetchPriority="high"
              />

              {/* Dynamic Live Personalization Overlay Seal */}
              <div className="hero-live-seal" aria-live="polite">
                <div className="seal-frame-wrap">
                  <img
                    src={ASSETS.decorative.monogramFrame}
                    alt=""
                    aria-hidden="true"
                    className="seal-wreath-img"
                  />
                  <span className="seal-monogram-initials">
                    {monogramText}
                  </span>
                </div>
                <div className="seal-names-tag">
                  {displayA} &amp; {displayB}
                </div>
              </div>
            </div>

            {/* Editorial Badge Ribbon */}
            <div className="hero-botanical-badge">
              <span className="gold-gem" aria-hidden="true">✦</span>
              <span>Stationery Craftsmanship • Digital Ease</span>
            </div>
          </div>

          {/* Interactive Live Name Personalization Widget */}
          <div className="hero-personalize-box">
            <div className="personalize-header">
              <div className="personalize-title-group">
                <span className="personalize-title">✦ Personalise with Your Names</span>
                <span className="personalize-hint">Updates live on card above</span>
              </div>
              {(partnerA || partnerB) && (
                <button
                  type="button"
                  className="personalize-reset-btn"
                  onClick={handleResetNames}
                  title="Reset to default sample names"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="personalize-inputs">
              <div className="personalize-field-wrap">
                <label htmlFor="hero-partner-a" className="sr-only">Partner One Name</label>
                <input
                  id="hero-partner-a"
                  type="text"
                  className="personalize-field"
                  placeholder="Partner One (e.g. Aarav)"
                  value={partnerA}
                  onChange={(e) => setPartnerA(e.target.value)}
                  maxLength={24}
                  autoComplete="off"
                />
              </div>

              <span className="personalize-amp" aria-hidden="true">&amp;</span>

              <div className="personalize-field-wrap">
                <label htmlFor="hero-partner-b" className="sr-only">Partner Two Name</label>
                <input
                  id="hero-partner-b"
                  type="text"
                  className="personalize-field"
                  placeholder="Partner Two (e.g. Meera)"
                  value={partnerB}
                  onChange={(e) => setPartnerB(e.target.value)}
                  maxLength={24}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
