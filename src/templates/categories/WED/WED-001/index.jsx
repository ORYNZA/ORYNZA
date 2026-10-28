import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Sparkles,
  Navigation,
  Send,
  AlertCircle,
  Menu,
  X,
  ArrowDown,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  RotateCcw,
  Compass,
  Building2,
  Car,
} from 'lucide-react';
import { ROYAL_LAKE_PALACE_CONFIG } from './config';
import { CountdownTimer, CalendarDownloadButton } from '../../../components';
import './royalLakePalace.css';

// Official ORYNZA Brand Logo (Verified 2172 x 724 RGBA)
import orynzaLogo from './assets/orynza-logo.png';

// Verified Primary Assets
import heroImage from './assets/royal-palace-hero.png';
import portraitImage from './assets/royal-couple-portrait.png';
import panelsImage from './assets/royal-celebration-panels.png';
import floralFrameImage from './assets/royal-floral-frame.png';
import finaleImage from './assets/royal-lake-finale.png';

// Verified Additional Photographic Assets
import venueDetailImage from './assets/royal-venue-detail.png';
import ceremonyMandapImage from './assets/royal-ceremony-mandap.png';

export default function RoyalLakePalaceTemplate({ customConfig = null }) {
  const config = customConfig || ROYAL_LAKE_PALACE_CONFIG;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // RSVP Form State
  const [rsvpState, setRsvpState] = useState({
    guestName: '',
    attendance: 'attending', // 'attending' | 'not-attending'
    guestCount: 2,
    dietary: [],
    message: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleDietaryToggle = (option) => {
    setRsvpState((prev) => {
      const exists = prev.dietary.includes(option);
      return {
        ...prev,
        dietary: exists
          ? prev.dietary.filter((item) => item !== option)
          : [...prev.dietary, option],
      };
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!rsvpState.guestName.trim()) {
      errors.guestName = 'Please share your full name so the hosts can welcome you.';
    }
    if (rsvpState.attendance === 'attending') {
      const count = Number(rsvpState.guestCount);
      if (!count || count < 1 || count > config.rsvp.maxGuests) {
        errors.guestCount = `Please enter a guest count between 1 and ${config.rsvp.maxGuests}.`;
      }
    }
    return errors;
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    // Simulate network submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({
        ...rsvpState,
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }, 900);
  };

  const handleResetRsvp = () => {
    setSubmittedData(null);
    setRsvpState({
      guestName: '',
      attendance: 'attending',
      guestCount: 2,
      dietary: [],
      message: '',
    });
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="royal-palace-experience" data-template="WED-001">
      {/* Accessibility Skip Link */}
      <a href="#royal-main" className="royal-palace-skip-link">
        Skip to wedding invitation content
      </a>

      {/* Demonstration Banner */}
      <aside className="royal-demo-banner" aria-label="Template Demonstration Notice">
        <span className="royal-demo-badge">Template 1 Demo</span>
        <span>{config.demoDisclaimer}</span>
      </aside>

      {/* Sticky Navigation Bar with Official ORYNZA Brand Logo */}
      <nav className="royal-nav" aria-label="Wedding Invitation Navigation">
        <div className="royal-nav-container">
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, 'hero')}
            className="royal-nav-brand-lockup"
            aria-label="ORYNZA Atelier Home"
          >
            <img
              src={orynzaLogo}
              alt="ORYNZA Atelier"
              className="royal-nav-brand-logo"
              width="132"
              height="44"
            />
            <span className="royal-nav-divider" aria-hidden="true" />
            <span className="royal-nav-monogram-tag" aria-hidden="true">
              {config.couple.monogram}
            </span>
          </a>

          <button
            type="button"
            className="royal-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <ul className={`royal-nav-links ${mobileMenuOpen ? 'is-open' : ''}`}>
            <li>
              <a
                href="#story"
                onClick={(e) => scrollToSection(e, 'story')}
                className="royal-nav-link"
              >
                Our Story
              </a>
            </li>
            <li>
              <a
                href="#celebrations"
                onClick={(e) => scrollToSection(e, 'celebrations')}
                className="royal-nav-link"
              >
                Celebrations
              </a>
            </li>
            <li>
              <a
                href="#venue"
                onClick={(e) => scrollToSection(e, 'venue')}
                className="royal-nav-link"
              >
                The Palace
              </a>
            </li>
            <li>
              <a
                href="#rsvp"
                onClick={(e) => scrollToSection(e, 'rsvp')}
                className="royal-nav-link royal-nav-rsvp-btn"
              >
                Kindly Respond
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main id="royal-main">
        {/* ==================================================================
            SECTION A — HERO INVITATION
            ================================================================== */}
        <header id="hero" className="royal-hero-section">
          {/* Scenic Hero Background */}
          <div className="royal-hero-bg">
            <img
              src={heroImage}
              alt="The Leela Palace Udaipur on Lake Pichola illuminated at golden hour"
              loading="eager"
            />
          </div>

          {/* Contrast & Tint Overlays */}
          <div className="royal-hero-overlay" />

          {/* Decorative Floral Framing Asset */}
          <img
            src={floralFrameImage}
            alt=""
            aria-hidden="true"
            className="royal-hero-floral-frame"
          />

          {/* Hero Editorial Card */}
          <div className="royal-hero-card">
            <div className="royal-hero-inner-border">
              <span className="royal-section-eyebrow">
                Royal Destination Wedding
              </span>

              <p className="royal-hero-parents">{config.couple.parentsWording}</p>

              <h1 className="royal-hero-names">
                {config.couple.partnerA}
                <span className="ampersand">&amp;</span>
                {config.couple.partnerB}
              </h1>

              <div className="royal-flourish" aria-hidden="true">
                <span className="royal-flourish-line" />
                <Sparkles size={16} />
                <span className="royal-flourish-line" />
              </div>

              <p className="royal-hero-subtitle">
                {config.couple.invitationCopy}
              </p>

              {/* Event Metadata Highlights */}
              <div className="royal-hero-meta">
                <div className="royal-hero-meta-item">
                  <Calendar size={18} aria-hidden="true" />
                  <span>{config.event.dateDisplay}</span>
                </div>
                <div className="royal-hero-meta-item">
                  <MapPin size={18} aria-hidden="true" />
                  <span>{config.venue.name}, {config.venue.city}</span>
                </div>
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="royal-hero-actions">
                <a
                  href="#celebrations"
                  onClick={(e) => scrollToSection(e, 'celebrations')}
                  className="royal-btn-primary"
                >
                  <span>Celebration Schedule</span>
                  <ArrowDown size={16} aria-hidden="true" />
                </a>
                <a
                  href="#rsvp"
                  onClick={(e) => scrollToSection(e, 'rsvp')}
                  className="royal-btn-secondary"
                >
                  <span>Kindly Respond</span>
                </a>
              </div>

              {/* Reusable Countdown Component */}
              <CountdownTimer
                targetDate={config.event.countdownTarget}
                className="royal-countdown"
              />
            </div>
          </div>
        </header>

        {/* ==================================================================
            SECTION B — A NEW CHAPTER (STORY & PORTRAIT)
            ================================================================== */}
        <section id="story" className="royal-section royal-story-section" aria-labelledby="story-heading">
          <div className="royal-container">
            <div className="royal-story-grid">
              {/* Couple Portrait Area */}
              <div className="royal-portrait-frame">
                <div className="royal-portrait-shadow-box" aria-hidden="true" />
                <div className="royal-portrait-inner">
                  <img
                    src={portraitImage}
                    alt={`${config.couple.partnerA} and ${config.couple.partnerB} dressed in royal wedding attire`}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Story & Introduction Text */}
              <div className="royal-story-content">
                <span className="royal-section-eyebrow">{config.intro.eyebrow}</span>
                <h2 id="story-heading" className="royal-section-title">
                  {config.intro.title}
                </h2>

                <div className="royal-flourish" style={{ justifyContent: 'flex-start', margin: '0 0 1.5rem 0' }} aria-hidden="true">
                  <span className="royal-flourish-line" style={{ width: '40px' }} />
                  <Heart size={14} />
                  <span className="royal-flourish-line" style={{ width: '40px' }} />
                </div>

                <p className="royal-story-body">{config.intro.paragraph1}</p>
                <p className="royal-story-body">{config.intro.paragraph2}</p>

                <blockquote className="royal-story-quote">
                  {config.intro.quote}
                </blockquote>

                <div className="royal-story-signatures">
                  <span className="royal-sig-name">{config.couple.partnerA}</span>
                  <span className="royal-sig-heart">✦</span>
                  <span className="royal-sig-name">{config.couple.partnerB}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION C — MOMENTS TO MAKE MEMORIES (CELEBRATIONS)
            ================================================================== */}
        <section
          id="celebrations"
          className="royal-section royal-celebrations-section"
          aria-labelledby="celebrations-heading"
        >
          <div className="royal-container">
            <span className="royal-section-eyebrow">The Itinerary</span>
            <h2 id="celebrations-heading" className="royal-section-title">
              Moments to Make Memories
            </h2>
            <div className="royal-flourish" aria-hidden="true">
              <span className="royal-flourish-line" />
              <Sparkles size={16} />
              <span className="royal-flourish-line" />
            </div>
            <p className="royal-section-desc">
              Four curated celebrations honoring timeless Indian traditions, music, sacred rites, and joyous lakeside feasts.
            </p>

            <div className="royal-events-grid">
              {config.celebrations.map((event) => (
                <article key={event.id} className="royal-event-card">
                  {/* Verified Independent Panel Crop */}
                  <div
                    className="royal-panel-crop-wrapper"
                    data-panel={event.panelIndex}
                  >
                    <img
                      src={panelsImage}
                      alt={event.panelAlt}
                      loading="lazy"
                    />
                  </div>

                  <div className="royal-event-card-body">
                    <span className="royal-event-eyebrow">Celebration {event.panelIndex + 1}</span>
                    <h3 className="royal-event-title">{event.title}</h3>

                    <ul className="royal-event-meta-list">
                      <li className="royal-event-meta-item">
                        <Calendar size={15} aria-hidden="true" />
                        <span>{event.date}</span>
                      </li>
                      <li className="royal-event-meta-item">
                        <Clock size={15} aria-hidden="true" />
                        <span>{event.timeDisplay}</span>
                      </li>
                      <li className="royal-event-meta-item">
                        <MapPin size={15} aria-hidden="true" />
                        <span>{event.venue}</span>
                      </li>
                    </ul>

                    <p className="royal-event-desc">{event.description}</p>

                    <div className="royal-dress-code-badge">
                      <Sparkles size={13} aria-hidden="true" />
                      <span><strong>Dress Code:</strong> {event.dressCode}</span>
                    </div>

                    {/* Reusable Calendar Download Component */}
                    <CalendarDownloadButton
                      event={{
                        title: `${config.couple.partnerA} & ${config.couple.partnerB}'s Wedding: ${event.title}`,
                        dateISO: event.dateISO,
                        startTime: event.startTime,
                        endTime: event.endTime,
                        venue: event.venue,
                        city: `${config.venue.name}, ${config.venue.city}`,
                        description: `${event.description} | Dress Code: ${event.dressCode}`,
                      }}
                      className="royal-cal-btn"
                    />
                  </div>
                </article>
              ))}
            </div>

            {/* Sacred Ceremony Mandap Spotlight (Incorporated Feature) */}
            <div className="royal-ceremony-spotlight">
              <div className="royal-mandap-media">
                <img
                  src={ceremonyMandapImage}
                  alt={config.ceremonyMandap.alt}
                  loading="lazy"
                />
              </div>
              <div className="royal-mandap-content">
                <span className="royal-mandap-eyebrow">{config.ceremonyMandap.eyebrow}</span>
                <h3 className="royal-mandap-title">{config.ceremonyMandap.title}</h3>
                <p className="royal-mandap-desc">{config.ceremonyMandap.description}</p>
                <div className="royal-dress-code-badge" style={{ display: 'inline-flex' }}>
                  <Sparkles size={13} aria-hidden="true" />
                  <span>Sunset Vedic Vows overlooking Lake Pichola</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION D — A CELEBRATION BY THE LAKE (VENUE)
            ================================================================== */}
        <section id="venue" className="royal-section royal-venue-section" aria-labelledby="venue-heading">
          <div className="royal-container">
            <span className="royal-section-eyebrow">The Destination</span>
            <h2 id="venue-heading" className="royal-section-title">
              A Celebration by the Lake
            </h2>
            <div className="royal-flourish" aria-hidden="true">
              <span className="royal-flourish-line" />
              <Sparkles size={16} />
              <span className="royal-flourish-line" />
            </div>

            <div className="royal-venue-card">
              {/* Dedicated Architectural Venue Detail Photography */}
              <div className="royal-venue-banner">
                <img
                  src={venueDetailImage}
                  alt={config.venue.alt}
                  loading="lazy"
                />
                <div className="royal-venue-banner-overlay">
                  <span className="royal-venue-banner-eyebrow">Palace Grounds &amp; Lake Pichola</span>
                  <h3 className="royal-venue-banner-title">{config.venue.name}</h3>
                  <div className="royal-venue-banner-city">
                    <MapPin size={18} aria-hidden="true" />
                    <span>{config.venue.address}</span>
                  </div>
                </div>
              </div>

              <div className="royal-venue-content">
                <p className="royal-venue-description">
                  {config.venue.description}
                </p>

                <div className="royal-venue-actions">
                  <a
                    href={config.venue.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="royal-btn-primary"
                  >
                    <Navigation size={16} aria-hidden="true" />
                    <span>Open in Google Maps</span>
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </div>

                {/* Practical Guest Information */}
                <div className="royal-guidance-grid">
                  <div className="royal-guidance-card">
                    <div className="royal-guidance-icon">
                      <Compass size={20} aria-hidden="true" />
                    </div>
                    <h4 className="royal-guidance-title">{config.guestGuidance.airport.title}</h4>
                    <p className="royal-guidance-text">{config.guestGuidance.airport.detail}</p>
                  </div>

                  <div className="royal-guidance-card">
                    <div className="royal-guidance-icon">
                      <Building2 size={20} aria-hidden="true" />
                    </div>
                    <h4 className="royal-guidance-title">{config.guestGuidance.accommodation.title}</h4>
                    <p className="royal-guidance-text">{config.guestGuidance.accommodation.detail}</p>
                  </div>

                  <div className="royal-guidance-card">
                    <div className="royal-guidance-icon">
                      <Car size={20} aria-hidden="true" />
                    </div>
                    <h4 className="royal-guidance-title">{config.guestGuidance.parking.title}</h4>
                    <p className="royal-guidance-text">{config.guestGuidance.parking.detail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION E — KINDLY RESPOND (RSVP)
            ================================================================== */}
        <section id="rsvp" className="royal-section royal-rsvp-section" aria-labelledby="rsvp-heading">
          {/* Decorative Floral Framing Overlays */}
          <img
            src={floralFrameImage}
            alt=""
            aria-hidden="true"
            className="royal-rsvp-floral-decor"
          />
          <img
            src={floralFrameImage}
            alt=""
            aria-hidden="true"
            className="royal-rsvp-floral-decor-left"
          />

          <div className="royal-container">
            <div className="royal-rsvp-card">
              <header className="royal-rsvp-header">
                <span className="royal-section-eyebrow">Your Presence Awaited</span>
                <h2 id="rsvp-heading" className="royal-section-title">
                  Kindly Respond
                </h2>
                <div className="royal-flourish" aria-hidden="true">
                  <span className="royal-flourish-line" />
                  <Heart size={16} />
                  <span className="royal-flourish-line" />
                </div>
                <p className="royal-section-desc" style={{ marginBottom: '1rem' }}>
                  Please let us know if you can join us for this royal celebration in Udaipur.
                </p>
                <div className="royal-rsvp-deadline-notice">
                  Kindly reply by {config.rsvp.deadlineDisplay}
                </div>
              </header>

              {submittedData ? (
                /* Honest Success / Response State */
                <div className="royal-rsvp-success-card" role="region" aria-live="polite">
                  <div className="royal-success-icon">
                    <CheckCircle2 size={36} aria-hidden="true" />
                  </div>
                  <h3 className="royal-success-title">
                    Thank You, {submittedData.guestName}!
                  </h3>
                  <p style={{ color: 'var(--rlp-brown)', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
                    {submittedData.attendance === 'attending'
                      ? 'We are delighted that you will celebrate with us in Udaipur!'
                      : 'We will truly miss you in Udaipur, but hold your warm blessings close to heart.'}
                  </p>

                  <div className="royal-success-summary">
                    <div className="royal-summary-row">
                      <span className="royal-summary-label">Guest Name:</span>
                      <span className="royal-summary-val">{submittedData.guestName}</span>
                    </div>
                    <div className="royal-summary-row">
                      <span className="royal-summary-label">Attendance:</span>
                      <span className="royal-summary-val">
                        {submittedData.attendance === 'attending' ? 'Joyfully Attending' : 'Regretfully Declining'}
                      </span>
                    </div>
                    {submittedData.attendance === 'attending' && (
                      <div className="royal-summary-row">
                        <span className="royal-summary-label">Party Size:</span>
                        <span className="royal-summary-val">{submittedData.guestCount} {submittedData.guestCount === 1 ? 'Guest' : 'Guests'}</span>
                      </div>
                    )}
                    {submittedData.dietary.length > 0 && (
                      <div className="royal-summary-row">
                        <span className="royal-summary-label">Dietary:</span>
                        <span className="royal-summary-val">{submittedData.dietary.join(', ')}</span>
                      </div>
                    )}
                    {submittedData.message && (
                      <div className="royal-summary-row">
                        <span className="royal-summary-label">Wishes:</span>
                        <span className="royal-summary-val">“{submittedData.message}”</span>
                      </div>
                    )}
                  </div>

                  {/* Transparent Persistence Architecture Disclosure */}
                  <div className="royal-rsvp-honest-notice" style={{ maxWidth: '520px', margin: '1.5rem auto' }}>
                    <ShieldAlert size={20} aria-hidden="true" />
                    <div style={{ textAlign: 'left' }}>
                      <strong>Demonstration RSVP Simulation:</strong> Responses in this demo are processed in-browser. In production, ORYNZA connects to a secure backend RSVP database, email confirmation service, and dedicated WhatsApp concierge.
                    </div>
                  </div>

                  <button
                    type="button"
                    className="royal-btn-secondary"
                    onClick={handleResetRsvp}
                    style={{ marginTop: '1.5rem' }}
                  >
                    <RotateCcw size={16} aria-hidden="true" />
                    <span>Submit Another Response / Edit</span>
                  </button>
                </div>
              ) : (
                /* Complete Accessible Form */
                <form onSubmit={handleRsvpSubmit} noValidate>
                  {/* Guest Name */}
                  <div className="royal-form-group">
                    <label htmlFor="rsvp-name" className="royal-form-label">
                      Your Full Name <span className="required" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="rsvp-name"
                      type="text"
                      className={`royal-form-input ${formErrors.guestName ? 'is-error' : ''}`}
                      placeholder="e.g. Priyanshu & Ananya Sharma"
                      value={rsvpState.guestName}
                      onChange={(e) => setRsvpState({ ...rsvpState, guestName: e.target.value })}
                      aria-required="true"
                      aria-invalid={!!formErrors.guestName}
                      aria-describedby={formErrors.guestName ? 'rsvp-name-error' : undefined}
                    />
                    {formErrors.guestName && (
                      <p id="rsvp-name-error" className="royal-form-error" role="alert">
                        <AlertCircle size={14} aria-hidden="true" />
                        <span>{formErrors.guestName}</span>
                      </p>
                    )}
                  </div>

                  {/* Attendance Choice */}
                  <div className="royal-form-group">
                    <span className="royal-form-label">
                      Will You Be Attending? <span className="required" aria-hidden="true">*</span>
                    </span>
                    <div className="royal-attendance-options">
                      <label
                        className={`royal-attendance-label ${
                          rsvpState.attendance === 'attending' ? 'is-selected' : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value="attending"
                          checked={rsvpState.attendance === 'attending'}
                          onChange={() => setRsvpState({ ...rsvpState, attendance: 'attending' })}
                        />
                        <span className="royal-attendance-text">Joyfully Accepts</span>
                      </label>

                      <label
                        className={`royal-attendance-label ${
                          rsvpState.attendance === 'not-attending' ? 'is-selected' : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value="not-attending"
                          checked={rsvpState.attendance === 'not-attending'}
                          onChange={() => setRsvpState({ ...rsvpState, attendance: 'not-attending' })}
                        />
                        <span className="royal-attendance-text">Regretfully Declines</span>
                      </label>
                    </div>
                  </div>

                  {/* Guest Count (Only visible & required when attending) */}
                  {rsvpState.attendance === 'attending' && (
                    <div className="royal-form-group">
                      <label htmlFor="rsvp-guests" className="royal-form-label">
                        Total Number of Attending Guests <span className="required" aria-hidden="true">*</span>
                      </label>
                      <select
                        id="rsvp-guests"
                        className={`royal-form-select ${formErrors.guestCount ? 'is-error' : ''}`}
                        value={rsvpState.guestCount}
                        onChange={(e) => setRsvpState({ ...rsvpState, guestCount: Number(e.target.value) })}
                        aria-required="true"
                        aria-invalid={!!formErrors.guestCount}
                        aria-describedby={formErrors.guestCount ? 'rsvp-count-error' : undefined}
                      >
                        {Array.from({ length: config.rsvp.maxGuests }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                      {formErrors.guestCount && (
                        <p id="rsvp-count-error" className="royal-form-error" role="alert">
                          <AlertCircle size={14} aria-hidden="true" />
                          <span>{formErrors.guestCount}</span>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Dietary Requirements */}
                  {rsvpState.attendance === 'attending' && (
                    <div className="royal-form-group">
                      <span className="royal-form-label">
                        Dietary Preferences (Optional)
                      </span>
                      <div className="royal-dietary-grid">
                        {config.rsvp.dietaryOptions.map((option) => (
                          <label key={option} className="royal-checkbox-label">
                            <input
                              type="checkbox"
                              checked={rsvpState.dietary.includes(option)}
                              onChange={() => handleDietaryToggle(option)}
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Message for Couple */}
                  <div className="royal-form-group">
                    <label htmlFor="rsvp-message" className="royal-form-label">
                      Warm Wishes or Note for the Couple (Optional)
                    </label>
                    <textarea
                      id="rsvp-message"
                      rows={3}
                      className="royal-form-textarea"
                      placeholder="Share a memory, blessing, or song recommendation..."
                      value={rsvpState.message}
                      onChange={(e) => setRsvpState({ ...rsvpState, message: e.target.value })}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="royal-btn-primary"
                    disabled={isSubmitting}
                    style={{ width: '100%', marginTop: '0.75rem' }}
                  >
                    {isSubmitting ? (
                      <span>Recording Your Response...</span>
                    ) : (
                      <>
                        <Send size={16} aria-hidden="true" />
                        <span>Confirm RSVP</span>
                      </>
                    )}
                  </button>

                  {/* Honest Architecture Disclosure Note */}
                  <div className="royal-rsvp-honest-notice">
                    <ShieldAlert size={18} aria-hidden="true" />
                    <span>
                      <strong>Demonstration Mode:</strong> Submitting this form tests frontend validation and feedback. In production, ORYNZA connects to an active backend database and notification webhook.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION F — CLOSING EXPERIENCE
            ================================================================== */}
        <section className="royal-closing-section" aria-labelledby="closing-heading">
          {/* Scenic Sunset Finale Visual */}
          <div className="royal-closing-bg">
            <img
              src={finaleImage}
              alt="Sunset glow over Lake Pichola and the palace silhouette in Udaipur"
              loading="lazy"
            />
          </div>

          {/* Restrained Floral Frame Overlay */}
          <img
            src={floralFrameImage}
            alt=""
            aria-hidden="true"
            className="royal-closing-floral-frame"
          />

          <div className="royal-closing-content">
            <div className="royal-closing-monogram" aria-hidden="true">
              {config.couple.monogram}
            </div>

            <h2 id="closing-heading" className="royal-closing-title">
              {config.closing.gratitudeTitle}
            </h2>

            <div className="royal-flourish" style={{ color: 'var(--rlp-peach)' }} aria-hidden="true">
              <span className="royal-flourish-line" style={{ background: 'var(--rlp-peach)' }} />
              <Heart size={16} />
              <span className="royal-flourish-line" style={{ background: 'var(--rlp-peach)' }} />
            </div>

            <p className="royal-closing-message">
              {config.closing.gratitudeMessage}
            </p>

            <div className="royal-closing-names">
              {config.couple.partnerAFull} &amp; {config.couple.partnerBFull}
            </div>

            <div className="royal-closing-date">
              {config.event.dateDisplay} • {config.event.destination}
            </div>
          </div>
        </section>
      </main>

      {/* Invitation Footer */}
      <footer className="royal-footer">
        <div className="royal-footer-inner">
          <div className="royal-footer-brand">
            <span className="royal-footer-logo">ORYNZA</span>
            <span>Boutique Digital Wedding Invitations • Template 1 (Royal Lake Palace)</span>
          </div>

          <div className="royal-footer-links">
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, 'hero')}
              className="royal-footer-link"
            >
              Back to Top ↑
            </a>
            <span aria-hidden="true">•</span>
            <a href="https://orynza.github.io/ORYNZA/" className="royal-footer-link">
              Explore All ORYNZA Collections
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
