import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ASSETS } from '../config/assets';
import { DEMO_INVITATIONS } from '../data/invitations';
import { downloadICS } from '../lib/dates';

export default function InvitationPage() {
  const { slug } = useParams();
  const invite = DEMO_INVITATIONS[slug];
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedEventForMap, setSelectedEventForMap] = useState(null);
  const [copiedShare, setCopiedShare] = useState(false);

  // Live countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    if (!invite || !invite.date) return;

    const targetDate = new Date(`${invite.date}T10:00:00`).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, isPast: false });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [invite]);

  if (!invite) {
    return (
      <div className="invitation-page invitation-not-found">
        <div className="invitation-card-editorial not-found-card">
          <img
            src={ASSETS.brand.logo}
            alt="ORYNZA"
            className="not-found-logo"
            width="140"
            height="46"
          />
          <span className="eyebrow">Invitation Link Not Found</span>
          <h2 className="not-found-title">Looking for an Invitation?</h2>
          <p className="not-found-desc">
            We could not find an invitation record for “{slug}”. Please verify the couple’s link or explore our demonstration invitations.
          </p>
          <div className="not-found-actions">
            <Link to="/invite/demo-wedding" className="btn btn-primary">
              View Sample Wedding Invitation (Aarav &amp; Meera)
            </Link>
            <Link to="/invite/example-couple" className="btn btn-secondary">
              View Botanical Invitation (Rohan &amp; Ananya)
            </Link>
            <Link to="/" className="btn btn-outline-gold">
              Return to ORYNZA Studio Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    const url = window.location.href;
    const shareText = `You are warmly invited to celebrate the wedding of ${invite.couple.partnerA} & ${invite.couple.partnerB}. View invitation: ${url}`;
    
    if (navigator.share) {
      navigator.share({
        title: `${invite.couple.partnerA} & ${invite.couple.partnerB}'s Wedding Invitation`,
        text: shareText,
        url: url,
      }).catch(() => {});
    } else {
      // Fallback copy to clipboard
      navigator.clipboard.writeText(url).then(() => {
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2500);
      });
    }
  };

  const handleAddToCalendar = (event) => {
    downloadICS({
      title: `${invite.couple.partnerA} & ${invite.couple.partnerB}'s Wedding: ${event.title}`,
      date: invite.date,
      time: '10:00',
      endTime: '14:00',
      location: `${event.venue}, ${invite.venue.city}`,
      description: `${event.note} Dress code: ${event.dressCode}`,
    });
  };

  return (
    <div className={`invitation-page theme-${invite.theme || 'ivory'}`}>
      {/* Demonstration Banner */}
      {invite.isDemonstration && (
        <div className="invitation-demo-banner" role="alert">
          <span className="banner-sparkle">✦</span>
          <span>{invite.disclaimer}</span>
          <span className="banner-sparkle">✦</span>
        </div>
      )}

      {/* Invitation Header Bar */}
      <header className="invitation-top-header">
        <Link to="/" className="invitation-brand-link" title="Return to ORYNZA Studio">
          <img src={ASSETS.brand.logo} alt="ORYNZA" className="invitation-header-logo" width="120" height="40" />
        </Link>
        <div className="invitation-header-actions">
          <button
            type="button"
            className="btn btn-secondary btn-sm invite-share-btn"
            onClick={handleShare}
          >
            {copiedShare ? '✓ Link Copied!' : '📤 Share Invite'}
          </button>
          <Link to="/" className="btn btn-outline-gold btn-sm invite-back-btn">
            ← Atelier Home
          </Link>
        </div>
      </header>

      <main className="invitation-container" id="invitation-main">
        {/* Cover Stationery Card */}
        <div className="invitation-card-editorial">
          {/* Couple Monogram Frame Seal */}
          <div className="invitation-monogram-badge">
            <img
              src={ASSETS.decorative.monogramFrame}
              alt=""
              aria-hidden="true"
              className="invitation-seal-wreath"
            />
            <span className="invitation-seal-text">{invite.couple.monogram}</span>
          </div>

          {/* Parents' Blessing / Family Wording */}
          <p className="invitation-parents-wording">
            {invite.couple.parentsWording}
          </p>

          {/* Couple Names */}
          <h1 className="invitation-couple-title">
            <span className="partner-name">{invite.couple.partnerA}</span>
            <span className="partner-amp">&amp;</span>
            <span className="partner-name">{invite.couple.partnerB}</span>
          </h1>

          {/* Formal Invitation Text */}
          <p className="invitation-wording-text">
            {invite.couple.invitationText}
          </p>

          {/* Date & Primary Venue Box */}
          <div className="invitation-date-box">
            <p className="invitation-date-text">
              {invite.dateDisplay}
            </p>
            <p className="invitation-venue-subtitle">
              {invite.venue.name} • {invite.venue.city}
            </p>
          </div>

          {/* Live Countdown Clock */}
          {!timeLeft.isPast && (
            <div className="invitation-countdown-block">
              <span className="invitation-countdown-label">COUNTDOWN TO OUR DAY</span>
              <div className="invitation-timer-row">
                <div className="invite-timer-unit">
                  <span className="invite-timer-val">{timeLeft.days}</span>
                  <span className="invite-timer-lbl">Days</span>
                </div>
                <span className="invite-timer-sep">:</span>
                <div className="invite-timer-unit">
                  <span className="invite-timer-val">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="invite-timer-lbl">Hours</span>
                </div>
                <span className="invite-timer-sep">:</span>
                <div className="invite-timer-unit">
                  <span className="invite-timer-val">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="invite-timer-lbl">Mins</span>
                </div>
                <span className="invite-timer-sep">:</span>
                <div className="invite-timer-unit">
                  <span className="invite-timer-val invite-pulse">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="invite-timer-lbl">Secs</span>
                </div>
              </div>
            </div>
          )}

          {/* Cover Action Buttons */}
          <div className="invitation-cover-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowRsvpModal(true)}
            >
              ✉ RSVP for Attendance
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSelectedEventForMap(invite.events[0]);
                setShowMapModal(true);
              }}
            >
              📍 Venue &amp; Driving Directions
            </button>
          </div>
        </div>

        {/* Multi-Function Ceremony Schedule Section */}
        <section className="invitation-events-section" aria-label="Wedding Functions Schedule">
          <div className="invitation-section-header text-center">
            <span className="invitation-section-eyebrow">CELEBRATION ITINERARY</span>
            <h2 className="invitation-section-heading">Ceremony Functions</h2>
            <p className="invitation-section-sub">
              Please join us for each sacred milestone and joyous celebration.
            </p>
          </div>

          <div className="invitation-events-grid">
            {invite.events.map((ev, index) => (
              <article key={ev.id} className="invitation-event-card">
                <div className="event-card-top-bar">
                  <span className="event-sequence-pill">Event 0{index + 1}</span>
                  <button
                    type="button"
                    className="event-cal-btn"
                    onClick={() => handleAddToCalendar(ev)}
                    title="Add to Google Calendar / iCal"
                  >
                    📅 Add to Calendar
                  </button>
                </div>

                <h3 className="invitation-event-title">{ev.title}</h3>
                
                <div className="invitation-event-meta-row">
                  <span className="event-meta-item">🗓 {ev.date}</span>
                  <span className="event-meta-divider">•</span>
                  <span className="event-meta-item">⏰ {ev.time}</span>
                </div>

                <p className="invitation-event-venue">
                  <strong>Location:</strong> {ev.venue}
                </p>

                <p className="invitation-event-note">{ev.note}</p>

                <div className="invitation-event-bottom">
                  <span className="invitation-event-dress">
                    <strong>Dress Code:</strong> {ev.dressCode}
                  </span>
                  <button
                    type="button"
                    className="event-map-link-btn"
                    onClick={() => {
                      setSelectedEventForMap(ev);
                      setShowMapModal(true);
                    }}
                  >
                    📍 Maps
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* RSVP Callout Box */}
        <section className="invitation-rsvp-box" aria-label="RSVP Response">
          <div className="rsvp-box-inner">
            <span className="rsvp-eyebrow">YOUR PRESENCE IS OUR GREATEST GIFT</span>
            <h3 className="rsvp-heading">
              Kindly Confirm Attendance by {invite.rsvpConfig.deadline}
            </h3>
            <p className="rsvp-desc">
              To assist our families with seating, catering, and event arrangements, please let us know if you can join our celebration.
            </p>
            <div className="rsvp-actions-wrap">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowRsvpModal(true)}
              >
                Submit Guest Response (Demo)
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleShare}
              >
                {copiedShare ? '✓ Link Copied to Clipboard!' : 'Forward to Family on WhatsApp'}
              </button>
            </div>
          </div>
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
              ✕
            </button>
            <div className="demo-disclaimer-pill">
              Sample RSVP Workflow
            </div>
            <h3 id="invitation-rsvp-title" className="modal-title">RSVP for {invite.couple.partnerA} &amp; {invite.couple.partnerB}</h3>
            <p className="modal-desc">
              In a live couple invitation, this opens your customized Google Form or dedicated attendance portal where guests confirm headcount and dietary preferences.
            </p>
            <div className="modal-demo-box">
              <p><strong>Demonstration Notice:</strong> Fictional couple celebration for presentation purposes. No real attendance entries are stored.</p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                Contact for assistance: <strong>{invite.rsvpConfig.contactPhone}</strong>
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => setShowRsvpModal(false)}
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      {/* Map Directions Modal */}
      {showMapModal && (
        <div className="modal-overlay" onClick={() => setShowMapModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="invitation-map-title">
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setShowMapModal(false)}
              aria-label="Close dialog"
            >
              ✕
            </button>
            <div className="demo-disclaimer-pill">
              Venue Directions
            </div>
            <h3 id="invitation-map-title" className="modal-title">
              {selectedEventForMap ? selectedEventForMap.venue : invite.venue.name}
            </h3>
            <p className="modal-desc">
              {invite.venue.address}
            </p>
            <div className="modal-demo-box">
              <p>
                In a live couple invitation, this button launches turn-by-turn Google Maps GPS driving directions directly on the guest's mobile phone.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => setShowMapModal(false)}
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* Reusable Invitation Footer */}
      <footer className="invitation-footer">
        <Link to="/" style={{ display: 'inline-block', marginBottom: '0.75rem' }}>
          <img src={ASSETS.brand.logo} alt="ORYNZA" style={{ height: '32px', margin: '0 auto' }} />
        </Link>
        <p>Crafted by ORYNZA Digital Wedding Invitation Atelier</p>
        <p className="invitation-footer-tagline">“Made for Moments That Matter.”</p>
        <div style={{ marginTop: '1rem' }}>
          <Link to="/" className="btn btn-secondary btn-sm">
            Create an Invitation for Your Own Wedding →
          </Link>
        </div>
      </footer>
    </div>
  );
}
