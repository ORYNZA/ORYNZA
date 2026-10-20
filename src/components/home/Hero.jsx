import React from 'react';
import { ASSETS } from '../../config/assets';

export default function Hero({ onExploreDesigns, onCreateInvitation }) {
  return (
    <section id="hero" className="hero-section" aria-label="Welcome to ORYNZA">
      <div className="container hero-grid">
        <div className="hero-content">
          <span className="eyebrow">Boutique Digital Wedding Invitations</span>
          <h1 className="hero-headline">
            <span>Beautiful Invitations.</span>
            <span>Unforgettable Beginnings.</span>
          </h1>
          <p className="hero-supporting-text">
            “Thoughtfully designed digital wedding invitations that bring your celebration, your people and every special moment together.”
          </p>
          <div className="hero-cta-group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onCreateInvitation}
            >
              Create Your Invitation
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onExploreDesigns}
            >
              Explore Designs
            </button>
          </div>
          <p className="hero-tagline-note">
            “Made for Moments That Matter.”
          </p>
        </div>

        <div className="hero-invitation-container">
          <div className="hero-mockup-frame">
            <img
              src={ASSETS.mockups.heroMockup}
              alt="Art-directed ORYNZA portrait wedding invitation card preview"
              className="hero-mockup-img"
              width="380"
              height="475"
              fetchpriority="high"
            />
            <div className="hero-botanical-badge">
              Stationery Craft &amp; Digital Ease
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
