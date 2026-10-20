import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ASSETS } from '../../config/assets';

export default function FeaturedInvitation() {
  const [showRsvpDemo, setShowRsvpDemo] = useState(false);
  const [showMapDemo, setShowMapDemo] = useState(false);

  return (
    <section className="section featured-demo-section" aria-label="Demonstration Wedding Invitation">
      <div className="container">
        <div className="demo-preview-card">
          <div className="demo-content-side">
            <div className="demo-disclaimer-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>DEMONSTRATION INVITATION — FICTIONAL DETAILS</span>
            </div>

            <h3 className="demo-couple-names">Aarav &amp; Meera</h3>
            <p className="demo-invitation-wording">
              Together with their families, joyfully invite you to celebrate their wedding union.
            </p>

            <div className="demo-schedule-list">
              <div className="demo-schedule-item">
                <h4>Wedding Ceremony (Muhurtham)</h4>
                <p>Monday, 15 February 2027 • 10:15 AM</p>
                <p>Sample Wedding Venue, Kerala</p>
              </div>
              <div className="demo-schedule-item">
                <h4>Reception &amp; Dinner</h4>
                <p>Monday, 15 February 2027 • 7:00 PM onwards</p>
                <p>The Grand Ballroom &amp; Lawn</p>
              </div>
            </div>

            <div className="demo-actions-row">
              <Link
                to="/invite/demo-wedding"
                className="btn btn-primary btn-sm"
              >
                Preview Full Invitation
              </Link>

              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setShowRsvpDemo(true)}
              >
                Sample RSVP (Demo)
              </button>

              <button
                type="button"
                className="btn btn-outline-gold btn-sm"
                onClick={() => setShowMapDemo(true)}
              >
                Sample Map Link (Demo)
              </button>
            </div>
          </div>

          <div className="demo-visual-side">
            <div className="demo-monogram-frame-wrap">
              <img
                src={ASSETS.mockups.timelessIvoryGold}
                alt="Aarav and Meera sample digital wedding invitation preview"
                className="demo-monogram-img"
                loading="lazy"
                width="340"
                height="425"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Demo RSVP Modal */}
      {showRsvpDemo && (
        <div className="modal-overlay" onClick={() => setShowRsvpDemo(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="demo-rsvp-title">
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setShowRsvpDemo(false)}
              aria-label="Close dialog"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="demo-disclaimer-pill" style={{ marginBottom: '0.75rem' }}>
              Demonstration Workflow
            </div>
            <h3 id="demo-rsvp-title" style={{ marginBottom: '0.5rem' }}>Sample Guest RSVP</h3>
            <p style={{ fontSize: '0.925rem', color: 'var(--muted-taupe)', marginBottom: '1.25rem' }}>
              In a live ORYNZA wedding page, this button links to your configured Google Form or dedicated RSVP system where responses are securely aggregated into a private family spreadsheet.
            </p>
            <div style={{ background: 'var(--warm-ivory)', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.5rem', border: '1px solid var(--subtle-border)' }}>
              <strong>Notice:</strong> This is a local frontend demonstration. No guest data is collected or stored on this server.
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => setShowRsvpDemo(false)}
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

      {/* Demo Map Modal */}
      {showMapDemo && (
        <div className="modal-overlay" onClick={() => setShowMapDemo(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="demo-map-title">
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setShowMapDemo(false)}
              aria-label="Close dialog"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="demo-disclaimer-pill" style={{ marginBottom: '0.75rem' }}>
              Demonstration Map Link
            </div>
            <h3 id="demo-map-title" style={{ marginBottom: '0.5rem' }}>Sample Venue Navigation</h3>
            <p style={{ fontSize: '0.925rem', color: 'var(--muted-taupe)', marginBottom: '1.25rem' }}>
              The venue "Sample Wedding Venue, Kerala" is fictional for demonstration purposes. In a live customer invitation, this button links directly to your venue on Google Maps with one-tap turn-by-turn driving directions.
            </p>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => setShowMapDemo(false)}
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
