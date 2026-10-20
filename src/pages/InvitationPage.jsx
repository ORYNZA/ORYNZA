import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ASSETS } from '../config/assets';
import { DEMO_INVITATIONS } from '../data/invitations';

export default function InvitationPage() {
  const { slug } = useParams();
  const invite = DEMO_INVITATIONS[slug];
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (!invite) {
    return (
      <div className="invitation-page" style={{ alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem', textAlign: 'center' }}>
        <div className="invitation-card-editorial" style={{ maxWidth: '500px' }}>
          <img
            src={ASSETS.brand.logo}
            alt="ORYNZA"
            style={{ height: '40px', margin: '0 auto 1.5rem' }}
          />
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>Invitation Not Found</h2>
          <p style={{ color: 'var(--muted-taupe)', marginBottom: '1.75rem' }}>
            We could not find an invitation link for “{slug}”. Please check your link or explore our demonstration invitations.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/invite/demo-wedding" className="btn btn-primary">
              View Sample Wedding Invitation
            </Link>
            <Link to="/" className="btn btn-secondary">
              Return to ORYNZA Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="invitation-page">
      {/* Demonstration Banner */}
      {invite.isDemonstration && (
        <div className="invitation-banner">
          {invite.disclaimer}
        </div>
      )}

      <header style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-line)', background: 'var(--white-ivory)' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <img src={ASSETS.brand.logo} alt="ORYNZA" style={{ height: '30px' }} />
        </Link>
        <Link to="/" className="btn btn-secondary btn-sm" style={{ minHeight: '34px', padding: '0.35rem 0.9rem', fontSize: '0.8rem' }}>
          ← Back to Studio
        </Link>
      </header>

      <main className="invitation-container">
        {/* Cover Stationery Card */}
        <div className="invitation-card-editorial">
          <div className="invitation-monogram-badge">
            <img
              src={ASSETS.decorative.monogramFrame}
              alt=""
              aria-hidden="true"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>

          <p className="invitation-parents-wording">
            {invite.couple.parentsWording}
          </p>

          <h1 className="invitation-couple-title">
            {invite.couple.partnerA} &amp; {invite.couple.partnerB}
          </h1>

          <p className="invitation-wording-text">
            {invite.couple.invitationText}
          </p>

          <div className="invitation-date-box">
            <p className="invitation-date-text">
              {invite.dateDisplay}
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--muted-taupe)', marginTop: '0.25rem' }}>
              {invite.venue.name}, {invite.venue.city}
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setShowRsvpModal(true)}
            >
              RSVP for this Celebration
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setShowMapModal(true)}
            >
              Venue &amp; Map Directions
            </button>
          </div>
        </div>

        {/* Function Timeline Section */}
        <section className="invitation-events-section" aria-label="Wedding Functions">
          <h2 className="invitation-section-heading">Celebration Schedule</h2>
          {invite.events.map((ev) => (
            <article key={ev.id} className="invitation-event-card">
              <h3 className="invitation-event-title">{ev.title}</h3>
              <p className="invitation-event-meta">{ev.date} • {ev.time}</p>
              <p className="invitation-event-venue"><strong>Location:</strong> {ev.venue}</p>
              <p className="invitation-event-note">{ev.note}</p>
              <p className="invitation-event-dress">Dress Code: {ev.dressCode}</p>
            </article>
          ))}
        </section>

        {/* RSVP Card */}
        <section className="invitation-rsvp-box" aria-label="RSVP Response">
          <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: 'var(--deep-charcoal)' }}>
            Kindly Respond by {invite.rsvpConfig.deadline}
          </h3>
          <p style={{ color: 'var(--muted-taupe)', fontSize: '0.925rem', marginBottom: '1.25rem' }}>
            Your presence will make our celebration truly complete.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowRsvpModal(true)}
          >
            Submit Guest Attendance (Demo)
          </button>
        </section>
      </main>

      {/* RSVP Modal */}
      {showRsvpModal && (
        <div className="modal-overlay" onClick={() => setShowRsvpModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="invitation-rsvp-title">
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setShowRsvpModal(false)}
              aria-label="Close dialog"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="demo-disclaimer-pill" style={{ marginBottom: '0.75rem' }}>
              Sample Invitation Flow
            </div>
            <h3 id="invitation-rsvp-title" style={{ marginBottom: '0.75rem' }}>RSVP Confirmation</h3>
            <p style={{ color: 'var(--muted-taupe)', fontSize: '0.925rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              In a live couple invitation, this form opens your dedicated Google Form or customized guest attendance sheet.
            </p>
            <div style={{ background: 'var(--warm-ivory)', border: '1px solid var(--subtle-border)', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              <strong>Demonstration State:</strong> This invitation is configured with fictional data for <em>{invite.couple.partnerA} &amp; {invite.couple.partnerB}</em>. No live responses are being tracked.
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => setShowRsvpModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Map Modal */}
      {showMapModal && (
        <div className="modal-overlay" onClick={() => setShowMapModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="invitation-map-title">
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setShowMapModal(false)}
              aria-label="Close dialog"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="demo-disclaimer-pill" style={{ marginBottom: '0.75rem' }}>
              Demonstration Map
            </div>
            <h3 id="invitation-map-title" style={{ marginBottom: '0.5rem' }}>Venue Directions</h3>
            <p style={{ color: 'var(--deep-charcoal)', fontWeight: 500, marginBottom: '0.25rem' }}>
              {invite.venue.name}
            </p>
            <p style={{ color: 'var(--muted-taupe)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              {invite.venue.address}
            </p>
            <p style={{ color: 'var(--muted-taupe)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              This is a sample wedding venue located in Kerala. On production customer invitations, this button provides direct one-touch Google Maps GPS navigation.
            </p>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => setShowMapModal(false)}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      <footer style={{ padding: '2rem 1.5rem', textAlign: 'center', borderTop: '1px solid var(--border-line)', fontSize: '0.825rem', color: 'var(--muted-taupe)', background: 'var(--white-ivory)' }}>
        <p>Created with ORYNZA Digital Invitation Studio</p>
        <p style={{ marginTop: '0.25rem' }}>“Made for Moments That Matter.”</p>
      </footer>
    </div>
  );
}
