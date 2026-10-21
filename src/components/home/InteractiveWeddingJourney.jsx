import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ASSETS } from '../../config/assets';

const EVENTS = [
  {
    id: 'mehendi',
    title: 'Mehendi & Sangeet Soirée',
    tag: 'Pre-Wedding',
    date: 'Sunday, 14 February 2027',
    time: '5:30 PM Onwards',
    venue: 'The Palm Courtyard & Poolside',
    location: 'Kochi, Kerala',
    dressCode: 'Festive Pastel / Indian Traditional',
    description: 'An enchanting evening of intricate henna artistry, live acoustic music, sangeet performances, and celebratory culinary delights.',
  },
  {
    id: 'muhurtham',
    title: 'Wedding Ceremony (Muhurtham)',
    tag: 'Main Ceremony',
    date: 'Monday, 15 February 2027',
    time: '10:15 AM – 12:00 PM',
    venue: 'Grand Heritage Mandapam',
    location: 'Kochi, Kerala',
    dressCode: 'Traditional Festive Silk Attire',
    description: 'Auspicious wedding rituals conducted in the presence of beloved family and elders, followed by a grand celebratory Sadhya feast.',
  },
  {
    id: 'reception',
    title: 'Grand Wedding Reception',
    tag: 'Evening Gala',
    date: 'Monday, 15 February 2027',
    time: '7:00 PM Onwards',
    venue: 'The Grand Ballroom & Lawn',
    location: 'Kochi, Kerala',
    dressCode: 'Formal Black-Tie / Elegant Ethnic',
    description: 'Cocktail toasts, dinner banquet, and an unforgettable evening of dancing and celebration under starlit canopies.',
  },
];

export default function InteractiveWeddingJourney() {
  const [activeEventIndex, setActiveEventIndex] = useState(1); // default to Muhurtham
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Live Real-Time Countdown to Demo Wedding Date (15 Feb 2027)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2027-02-15T10:15:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeEvent = EVENTS[activeEventIndex];

  return (
    <section id="journey" className="section journey-section" aria-label="Interactive Wedding Guest Experience">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="journey-header-badge">
            <span className="badge-gem">✦</span>
            <span>THE GUEST EXPERIENCE</span>
            <span className="badge-gem">✦</span>
          </div>
          <h2 className="section-title">Everything Your Guests Need, In One Place</h2>
          <p className="section-subtitle">
            Experience the real interactive invitation your guests receive. From live event countdowns to ceremony timelines, GPS navigation, and private RSVP coordination.
          </p>
        </div>

        {/* Interactive Demonstration Showcase */}
        <div className="journey-interactive-stage">
          {/* Demonstration Notice Pill */}
          <div className="demo-live-badge-bar">
            <span className="demo-live-dot" aria-hidden="true"></span>
            <span>Interactive Demonstration Suite • Fictional Couple Details</span>
          </div>

          <div className="journey-stage-grid">
            {/* Left: Interactive Invitation Suite Preview */}
            <div className="journey-invitation-view">
              {/* Couple Header Card */}
              <div className="journey-couple-card">
                <div className="journey-seal-mini" aria-hidden="true">
                  <img
                    src={ASSETS.decorative.monogramFrame}
                    alt=""
                    className="journey-monogram-img"
                  />
                  <span className="journey-seal-letters">A &amp; M</span>
                </div>
                <p className="journey-parents-wording">Together with their families</p>
                <h3 className="journey-couple-title">Aarav &amp; Meera</h3>
                <p className="journey-invitation-wording">
                  Joyfully invite you to celebrate their sacred wedding union and festivities.
                </p>

                {/* Live Countdown Display */}
                <div className="journey-countdown-box">
                  <span className="countdown-eyebrow">✦ COUNTDOWN TO THE CELEBRATION ✦</span>
                  <div className="countdown-timer-row">
                    <div className="timer-cell">
                      <span className="timer-number">{timeLeft.days}</span>
                      <span className="timer-unit">Days</span>
                    </div>
                    <span className="timer-sep">:</span>
                    <div className="timer-cell">
                      <span className="timer-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                      <span className="timer-unit">Hours</span>
                    </div>
                    <span className="timer-sep">:</span>
                    <div className="timer-cell">
                      <span className="timer-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                      <span className="timer-unit">Mins</span>
                    </div>
                    <span className="timer-sep">:</span>
                    <div className="timer-cell">
                      <span className="timer-number timer-pulse">{String(timeLeft.seconds).padStart(2, '0')}</span>
                      <span className="timer-unit">Secs</span>
                    </div>
                  </div>
                </div>

                {/* Event Schedule Tabs */}
                <div className="journey-events-tab-container">
                  <div className="journey-tab-nav" role="tablist" aria-label="Ceremony Functions">
                    {EVENTS.map((ev, idx) => (
                      <button
                        key={ev.id}
                        type="button"
                        role="tab"
                        aria-selected={activeEventIndex === idx}
                        className={`journey-event-tab ${activeEventIndex === idx ? 'is-active' : ''}`}
                        onClick={() => setActiveEventIndex(idx)}
                      >
                        <span className="tab-pill-label">{ev.tag}</span>
                        <span className="tab-title-text">{ev.title.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>

                  {/* Active Event Card */}
                  <div className="journey-event-detail-box" key={activeEvent.id}>
                    <div className="event-detail-header">
                      <span className="event-detail-badge">{activeEvent.tag}</span>
                      <h4 className="event-detail-title">{activeEvent.title}</h4>
                      <p className="event-detail-time">
                        📅 {activeEvent.date} • ⏰ {activeEvent.time}
                      </p>
                    </div>

                    <p className="event-detail-venue">
                      <strong>Location:</strong> {activeEvent.venue}, {activeEvent.location}
                    </p>
                    <p className="event-detail-desc">{activeEvent.description}</p>
                    <p className="event-detail-dress">
                      <strong>Dress Code:</strong> {activeEvent.dressCode}
                    </p>

                    {/* Guest Quick Actions */}
                    <div className="event-guest-actions">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => setShowMapModal(true)}
                      >
                        <span>📍 View GPS Directions</span>
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => setShowRsvpModal(true)}
                      >
                        <span>✉ RSVP for this Event</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Row */}
                <div className="journey-full-actions">
                  <Link
                    to="/invite/demo-wedding"
                    className="btn btn-primary btn-block"
                  >
                    <span>Open Fullscreen Couple Invitation Page</span>
                    <span aria-hidden="true">↗</span>
                  </Link>

                  <div className="journey-secondary-actions">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => setShowShareModal(true)}
                    >
                      <span>Preview WhatsApp Share Card</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-gold btn-sm"
                      onClick={() => setShowRsvpModal(true)}
                    >
                      <span>Test RSVP Modal</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Feature Highlights & Supporting Art */}
            <div className="journey-features-column">
              <div className="journey-feature-card">
                <span className="feature-step-num">01</span>
                <h4 className="feature-title">Live Wedding Countdown</h4>
                <p className="feature-desc">
                  Generates excitement leading up to the sacred day with an elegant real-time countdown clock displayed prominently on your wedding page.
                </p>
              </div>

              <div className="journey-feature-card">
                <span className="feature-step-num">02</span>
                <h4 className="feature-title">Multi-Event Ceremony Suite</h4>
                <p className="feature-desc">
                  Organize Mehendi, Sangeet, Muhurtham, and Reception with distinct dates, times, venues, and dress codes in an intuitive tabbed timeline.
                </p>
              </div>

              <div className="journey-feature-card">
                <span className="feature-step-num">03</span>
                <h4 className="feature-title">One-Touch GPS Navigation</h4>
                <p className="feature-desc">
                  Guests tap a single button to open Google Maps on iOS and Android with exact GPS turn-by-turn driving directions directly to your venue.
                </p>
              </div>

              <div className="journey-feature-card">
                <span className="feature-step-num">04</span>
                <h4 className="feature-title">Private RSVP &amp; Attendance</h4>
                <p className="feature-desc">
                  Seamlessly gather guest headcounts, dietary requirements, and function attendance directly into an organized Google Sheet for stress-free catering.
                </p>
              </div>

              {/* Supporting Artwork Preview Card */}
              <div className="journey-card-promo">
                <img
                  src={ASSETS.supporting.whatsappCard}
                  alt="ORYNZA WhatsApp invitation sharing preview card"
                  className="journey-promo-img"
                  loading="lazy"
                />
                <div className="journey-promo-caption">
                  <span>Beautifully Formatted for WhatsApp &amp; Social Forwarding</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {showRsvpModal && (
        <div className="modal-overlay" onClick={() => setShowRsvpModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="journey-rsvp-title">
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setShowRsvpModal(false)}
              aria-label="Close dialog"
            >
              ✕
            </button>
            <div className="modal-badge-pill">Demonstration Workflow</div>
            <h3 id="journey-rsvp-title" className="modal-title">Sample Guest RSVP Confirmation</h3>
            <p className="modal-desc">
              In a live couple wedding suite, this action opens your private custom Google Form or agreed attendance portal.
            </p>
            <div className="modal-demo-box">
              <p><strong>Demonstration Notice:</strong> This is a frontend demo for <em>Aarav &amp; Meera</em>. No guest attendance data is recorded to any external server.</p>
              <ul className="modal-features-list">
                <li>✓ Function-by-function headcount (Haldi, Muhurtham, Reception)</li>
                <li>✓ Dietary preferences &amp; family member names</li>
                <li>✓ Automatically compiles into a private Google Sheet</li>
              </ul>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => setShowRsvpModal(false)}
            >
              Close Demonstration
            </button>
          </div>
        </div>
      )}

      {/* Map Directions Modal */}
      {showMapModal && (
        <div className="modal-overlay" onClick={() => setShowMapModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="journey-map-title">
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setShowMapModal(false)}
              aria-label="Close dialog"
            >
              ✕
            </button>
            <div className="modal-badge-pill">Venue Directions Demo</div>
            <h3 id="journey-map-title" className="modal-title">{activeEvent.venue}</h3>
            <p className="modal-desc">
              {activeEvent.location} • Ceremony: {activeEvent.title}
            </p>
            <div className="modal-demo-box">
              <p>
                In a live ORYNZA customer invitation, tapping this button opens your precise Google Maps coordinates with instant one-tap GPS navigation for guests driving to the venue.
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

      {/* WhatsApp Share Card Modal */}
      {showShareModal && (
        <div className="modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="journey-share-title">
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setShowShareModal(false)}
              aria-label="Close dialog"
            >
              ✕
            </button>
            <div className="modal-badge-pill">WhatsApp Sharing Preview</div>
            <h3 id="journey-share-title" className="modal-title">Forwarding to Family &amp; Friends</h3>
            <p className="modal-desc">
              Your invitation link generates an eye-catching visual preview card with wedding date, couple names, and tailored invitation text when shared on WhatsApp.
            </p>
            <div className="share-card-visual-frame">
              <img
                src={ASSETS.supporting.whatsappCard}
                alt="ORYNZA WhatsApp invitation sharing preview"
                className="share-card-modal-img"
              />
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => setShowShareModal(false)}
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
