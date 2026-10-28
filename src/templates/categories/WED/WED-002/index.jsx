import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Share2,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle,
  Download,
  Compass,
  Sun,
  Waves,
  X,
  Send,
  ExternalLink,
  ChevronRight,
  Music,
  Menu,
} from 'lucide-react';

import { SUNSET_SHORES_CONFIG } from './config';
import './sunsetShores.css';

// Local template assets
import heroImage from './assets/goa-sunset-hero.png';
import portraitImage from './assets/goa-couple-portrait.png';
import panelsImage from './assets/goa-celebration-panels.png';
import frameImage from './assets/goa-floral-frame.png';
import finaleImage from './assets/goa-beach-finale.png';
import venueImage from './assets/goa-venue-detail.png';
import mandapImage from './assets/goa-ceremony-mandap.png';
import logoImage from './assets/orynza-logo.png';

export default function SunsetShoresTemplate() {
  const config = SUNSET_SHORES_CONFIG;

  // --- States ---
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // RSVP Form State
  const [rsvpData, setRsvpData] = useState({
    name: '',
    phone: '',
    attendance: 'joyfully-accepts',
    guests: '2',
    events: ['mehendi', 'sangeet', 'wedding', 'reception'],
    dietary: 'No Dietary Restrictions',
    message: '',
  });
  const [rsvpErrors, setRsvpErrors] = useState({});
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Web Audio Synth for ambient coastal ocean wave / chime
  const audioCtxRef = useRef(null);
  const oscNodesRef = useRef([]);

  // --- Countdown Calculation ---
  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(config.event.countdownTarget).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [config.event.countdownTarget]);

  // --- Scroll Spy for Active Navigation ---
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'story', 'celebrations', 'venue', 'rsvp'];
      const scrollY = window.scrollY;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Ambient Ocean Sound Synthesizer ---
  const toggleAmbientSound = () => {
    if (isMuted) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContext();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        // Create pink/brown noise filter for ocean surf
        const bufferSize = audioCtxRef.current.sampleRate * 2;
        const noiseBuffer = audioCtxRef.current.createBuffer(1, bufferSize, audioCtxRef.current.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99 * b0 + white * 0.05;
          b1 = 0.95 * b1 + white * 0.1;
          b2 = 0.85 * b2 + white * 0.2;
          output[i] = (b0 + b1 + b2) * 0.12;
        }

        const whiteNoise = audioCtxRef.current.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = audioCtxRef.current.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 450;

        const gainNode = audioCtxRef.current.createGain();
        gainNode.gain.setValueAtTime(0.01, audioCtxRef.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.18, audioCtxRef.current.currentTime + 2);

        // LFO for surf wave rhythm
        const lfo = audioCtxRef.current.createOscillator();
        lfo.frequency.value = 0.12; // 8-second wave swells
        const lfoGain = audioCtxRef.current.createGain();
        lfoGain.gain.value = 250;
        lfo.connect(filter.frequency);
        lfo.start();

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtxRef.current.destination);
        whiteNoise.start();

        oscNodesRef.current = [whiteNoise, lfo, gainNode];
        setIsMuted(false);
      } catch (err) {
        console.warn('Audio synthesis not supported:', err);
        setIsMuted(false);
      }
    } else {
      if (oscNodesRef.current.length) {
        try {
          const [noise, lfo, gain] = oscNodesRef.current;
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 1);
          setTimeout(() => {
            noise.stop();
            lfo.stop();
          }, 1000);
        } catch (_) {}
      }
      setIsMuted(true);
    }
  };

  // --- Calendar .ics File Generator ---
  const handleDownloadCalendar = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ORYNZA Atelier//Sunset Shores Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:sunset-shores-wedding-20270412@orynza.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      'DTSTART:20270412T110000Z',
      'DTEND:20270412T183000Z',
      `SUMMARY:${config.couple.partnerA} & ${config.couple.partnerB} — Wedding Celebration in Goa`,
      `DESCRIPTION:Join us for the wedding of ${config.couple.partnerA} & ${config.couple.partnerB} at ${config.venue.name}. More info: ${window.location.href}`,
      `LOCATION:${config.venue.name}, ${config.venue.address}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${config.couple.partnerA}_${config.couple.partnerB}_Wedding_Goa.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- RSVP Handlers ---
  const handleEventToggle = (eventId) => {
    setRsvpData((prev) => {
      const exists = prev.events.includes(eventId);
      const updated = exists ? prev.events.filter((e) => e !== eventId) : [...prev.events, eventId];
      return { ...prev, events: updated };
    });
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!rsvpData.name.trim()) errors.name = 'Please provide your full name.';
    if (!rsvpData.attendance) errors.attendance = 'Please select your attendance status.';

    if (Object.keys(errors).length > 0) {
      setRsvpErrors(errors);
      return;
    }

    setRsvpErrors({});
    setRsvpSubmitted(true);
  };

  // --- Copy Link ---
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <article
      data-template-id="WED-002"
      className="sunset-shores-template"
      aria-label={`${config.couple.partnerA} and ${config.couple.partnerB} Wedding Invitation`}
    >
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: `${config.couple.partnerA} & ${config.couple.partnerB}'s Wedding Celebration`,
            startDate: `${config.event.dateISO}T16:30:00+05:30`,
            endDate: `${config.event.dateISO}T23:59:00+05:30`,
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            location: {
              '@type': 'Place',
              name: config.venue.name,
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Calwaddo, Benaulim Beach',
                addressLocality: 'Salcete, Goa',
                postalCode: '403716',
                addressCountry: 'IN',
              },
            },
            description: config.event.celebrationSubtitle,
          }),
        }}
      />

      {/* Accessible Skip Link */}
      <a href="#main-invitation" className="ss-skip-link">
        Skip to wedding invitation content
      </a>

      {/* Demonstration Banner */}
      <div className="ss-demo-banner" role="complementary" aria-label="Template Demonstration Notice">
        <span>✦ {config.demoDisclaimer} ✦</span>
      </div>

      {/* Navigation Header */}
      <header className={`ss-header ${mobileMenuOpen ? 'ss-mobile-menu-open' : ''}`} role="banner">
        <div className="ss-container ss-header-inner">
          {/* Brand Logo Lockup */}
          <a href="#hero" className="ss-logo-lockup" aria-label="ORYNZA Atelier Home">
            <img
              src={logoImage}
              alt="ORYNZA Atelier"
              className="ss-logo-img"
              width="114"
              height="38"
            />
            <span className="ss-logo-divider" aria-hidden="true" />
            <span className="ss-logo-text">{config.couple.monogram}</span>
          </a>

          {/* Navigation Links */}
          <nav className="ss-nav" role="navigation" aria-label="Wedding sections">
            <ul className="ss-nav-menu">
              <li>
                <a
                  href="#story"
                  className={`ss-nav-link ${activeSection === 'story' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#celebrations"
                  className={`ss-nav-link ${activeSection === 'celebrations' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Celebrations
                </a>
              </li>
              <li>
                <a
                  href="#venue"
                  className={`ss-nav-link ${activeSection === 'venue' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  The Resort
                </a>
              </li>
              <li>
                <a
                  href="#rsvp"
                  className={`ss-nav-link ${activeSection === 'rsvp' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Kindly Respond
                </a>
              </li>
            </ul>
          </nav>

          {/* Header Action Buttons */}
          <div className="ss-header-actions">
            <button
              type="button"
              className="ss-icon-btn"
              onClick={toggleAmbientSound}
              aria-label={isMuted ? 'Play ambient coastal surf sound' : 'Mute ambient sound'}
              title={isMuted ? 'Play ocean surf audio' : 'Mute audio'}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            <button
              type="button"
              className="ss-icon-btn"
              onClick={() => setShareModalOpen(true)}
              aria-label="Share this wedding invitation"
              title="Share Invitation"
            >
              <Share2 size={18} />
            </button>

            <button
              type="button"
              className="ss-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="main-invitation" role="main">
        {/* =================================================================
            SECTION A — A Love Story by the Sea (Hero)
            ================================================================= */}
        <section id="hero" className="ss-hero" aria-label="Wedding Invitation Header">
          <div className="ss-hero-bg-container" aria-hidden="true">
            <img
              src={heroImage}
              alt="Panoramic tropical sunset over the Arabian Sea in Goa"
              className="ss-hero-bg-img"
              loading="eager"
            />
            <div className="ss-hero-gradient-overlay" />
            <img
              src={frameImage}
              alt=""
              className="ss-hero-floral-frame"
              aria-hidden="true"
            />
          </div>

          <div className="ss-container">
            <div className="ss-hero-content">
              <span className="ss-hero-badge">
                <Sun size={14} aria-hidden="true" />
                <span>Coastal Destination Wedding</span>
                <Waves size={14} aria-hidden="true" />
              </span>

              <p className="ss-hero-parents">{config.couple.parentsWording}</p>

              <h1 className="ss-hero-names">
                {config.couple.partnerA}
                <span className="ss-amp">&amp;</span>
                {config.couple.partnerB}
              </h1>

              <div className="ss-divider-flourish" aria-hidden="true">
                <span className="ss-flourish-line" />
                <Sparkles size={16} />
                <span className="ss-flourish-line" />
              </div>

              <p className="ss-hero-subtitle">
                {config.couple.invitationCopy}
              </p>

              {/* Meta Pill */}
              <div className="ss-hero-meta-pill">
                <span className="ss-meta-item">
                  <Calendar size={16} className="ss-meta-icon" aria-hidden="true" />
                  <span>{config.event.dateDisplay}</span>
                </span>
                <span className="ss-meta-dot" aria-hidden="true">✦</span>
                <span className="ss-meta-item">
                  <MapPin size={16} className="ss-meta-icon" aria-hidden="true" />
                  <span>{config.venue.name}</span>
                </span>
                <span className="ss-meta-dot" aria-hidden="true">✦</span>
                <span className="ss-meta-item">
                  <Compass size={16} className="ss-meta-icon" aria-hidden="true" />
                  <span>{config.event.destination}</span>
                </span>
              </div>

              {/* Live Countdown Clock */}
              <div className="ss-countdown-box" aria-label="Celebration Countdown Timer">
                <span className="ss-countdown-label">Counting Down to the Sunset Vows</span>
                <div className="ss-countdown-grid">
                  <div className="ss-countdown-unit">
                    <span className="ss-countdown-num">{timeLeft.days}</span>
                    <span className="ss-countdown-sub">Days</span>
                  </div>
                  <div className="ss-countdown-unit">
                    <span className="ss-countdown-num">{timeLeft.hours}</span>
                    <span className="ss-countdown-sub">Hours</span>
                  </div>
                  <div className="ss-countdown-unit">
                    <span className="ss-countdown-num">{timeLeft.minutes}</span>
                    <span className="ss-countdown-sub">Mins</span>
                  </div>
                  <div className="ss-countdown-unit">
                    <span className="ss-countdown-num">{timeLeft.seconds}</span>
                    <span className="ss-countdown-sub">Secs</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="ss-btn-group">
                <a href="#celebrations" className="ss-btn ss-btn-primary">
                  <span>Explore Celebrations</span>
                  <ChevronRight size={16} aria-hidden="true" />
                </a>
                <button
                  type="button"
                  className="ss-btn ss-btn-secondary"
                  onClick={handleDownloadCalendar}
                >
                  <Download size={16} aria-hidden="true" />
                  <span>Add to Calendar (.ics)</span>
                </button>
                <a href="#rsvp" className="ss-btn ss-btn-gold">
                  <span>Kindly Respond</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION B — Two Souls, One Beautiful Journey (Our Story & Welcome)
            ================================================================= */}
        <section id="story" className="ss-section ss-story-section" aria-label="Couple Story and Introduction">
          <div className="ss-container">
            <div className="ss-story-grid">
              {/* Couple Portrait Frame */}
              <div className="ss-portrait-wrapper">
                <div className="ss-portrait-frame">
                  <img
                    src={portraitImage}
                    alt={`${config.couple.partnerA} and ${config.couple.partnerB} smiling together on the coastal shores of Goa`}
                    className="ss-portrait-img"
                    loading="lazy"
                  />
                  <div className="ss-portrait-badge">
                    <span>{config.couple.partnerA} &amp; {config.couple.partnerB} • Goa</span>
                  </div>
                </div>
              </div>

              {/* Narrative Content */}
              <div className="ss-story-content">
                <span className="ss-section-eyebrow">{config.intro.eyebrow}</span>
                <h2 className="ss-section-title">{config.intro.title}</h2>
                <blockquote className="ss-story-quote">
                  {config.intro.quote}
                </blockquote>
                <p className="ss-story-p">{config.intro.paragraph1}</p>
                <p className="ss-story-p">{config.intro.paragraph2}</p>

                <div className="ss-story-signoff">
                  <span className="ss-signoff-monogram" aria-hidden="true">
                    {config.couple.monogram}
                  </span>
                  <div>
                    <span className="ss-signoff-text">
                      {config.couple.partnerAFull} &amp; {config.couple.partnerBFull}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION C — Celebrations by the Sea (4 Events Grid)
            ================================================================= */}
        <section id="celebrations" className="ss-section ss-events-section" aria-label="Wedding Celebrations Schedule">
          <div className="ss-container">
            <div className="ss-section-header">
              <span className="ss-section-eyebrow">Itinerary</span>
              <h2 className="ss-section-title">Celebrations by the Sea</h2>
              <div className="ss-divider-flourish" aria-hidden="true">
                <span className="ss-flourish-line" />
                <Sparkles size={16} />
                <span className="ss-flourish-line" />
              </div>
              <p className="ss-section-lead">
                Four curated gatherings honoring coastal sunsets, celebratory music, sacred Vedic vows, and joyful starlit feasts.
              </p>
            </div>

            {/* 4 Cards Grid with Independent Panel Crop */}
            <div className="ss-events-grid">
              {config.celebrations.map((event) => (
                <article key={event.id} className="ss-event-card">
                  {/* Independent Crop via CSS data-panel */}
                  <div className="ss-panel-crop-wrapper" data-panel={event.panelIndex}>
                    <img
                      src={panelsImage}
                      alt={event.panelAlt}
                      loading="lazy"
                    />
                  </div>

                  <div className="ss-event-card-body">
                    <span className="ss-event-number-tag">Event 0{event.panelIndex + 1}</span>
                    <h3 className="ss-event-title">{event.title}</h3>

                    <ul className="ss-event-meta-list">
                      <li className="ss-event-meta-item">
                        <Calendar size={14} className="ss-event-meta-icon" aria-hidden="true" />
                        <span>{event.date}</span>
                      </li>
                      <li className="ss-event-meta-item">
                        <Clock size={14} className="ss-event-meta-icon" aria-hidden="true" />
                        <span>{event.timeDisplay}</span>
                      </li>
                      <li className="ss-event-meta-item">
                        <MapPin size={14} className="ss-event-meta-icon" aria-hidden="true" />
                        <span>{event.venue}</span>
                      </li>
                    </ul>

                    <p className="ss-event-desc">{event.description}</p>

                    <div className="ss-event-dresscode">
                      <span><strong>Attire:</strong> {event.dressCode}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Mandap Feature Spotlight */}
            <div className="ss-mandap-spotlight">
              <div className="ss-mandap-visual-box">
                <img
                  src={mandapImage}
                  alt={config.ceremonyMandap.alt}
                  className="ss-mandap-img"
                  loading="lazy"
                />
              </div>
              <div className="ss-mandap-content">
                <span className="ss-section-eyebrow">{config.ceremonyMandap.eyebrow}</span>
                <h3>{config.ceremonyMandap.title}</h3>
                <p>{config.ceremonyMandap.description}</p>
                <a href="#rsvp" className="ss-btn ss-btn-primary">
                  <span>Join Our Sacred Sunset</span>
                  <ChevronRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION D — Our Venue (Taj Exotica Resort & Spa, Goa)
            ================================================================= */}
        <section id="venue" className="ss-section ss-venue-section" aria-label="Wedding Venue and Guest Guidance">
          <div className="ss-container">
            <div className="ss-section-header">
              <span className="ss-section-eyebrow">The Destination</span>
              <h2 className="ss-section-title">Taj Exotica Resort &amp; Spa, Goa</h2>
              <div className="ss-divider-flourish" aria-hidden="true">
                <span className="ss-flourish-line" />
                <Sparkles size={16} />
                <span className="ss-flourish-line" />
              </div>
              <p className="ss-section-lead">
                An idyllic sanctuary on the southwest coast of Goa, where Mediterranean architecture meets the serene sands of Benaulim Beach.
              </p>
            </div>

            {/* Main Venue Presentation Card */}
            <div className="ss-venue-box">
              <div className="ss-venue-img-wrap">
                <img
                  src={venueImage}
                  alt={config.venue.alt}
                  className="ss-venue-img"
                  loading="lazy"
                />
                <span className="ss-venue-badge">Demonstration Venue</span>
              </div>

              <div className="ss-venue-info">
                <h3 className="ss-venue-name">{config.venue.name}</h3>
                <span className="ss-venue-subtitle">{config.venue.palaceSubtitle}</span>
                <p className="ss-venue-desc">{config.venue.description}</p>

                <div className="ss-venue-address">
                  <MapPin size={18} className="ss-meta-icon" aria-hidden="true" />
                  <span>{config.venue.address}</span>
                </div>

                <div className="ss-btn-group" style={{ justifyContent: 'flex-start' }}>
                  <a
                    href={config.venue.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ss-btn ss-btn-primary"
                  >
                    <ExternalLink size={16} aria-hidden="true" />
                    <span>View on Google Maps</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Guest Guidance Grid */}
            <div className="ss-travel-grid">
              <div className="ss-travel-card">
                <span className="ss-travel-icon" aria-hidden="true">✈️</span>
                <h4 className="ss-travel-title">{config.guestGuidance.airport.title}</h4>
                <p className="ss-travel-desc">{config.guestGuidance.airport.detail}</p>
              </div>

              <div className="ss-travel-card">
                <span className="ss-travel-icon" aria-hidden="true">🏨</span>
                <h4 className="ss-travel-title">{config.guestGuidance.accommodation.title}</h4>
                <p className="ss-travel-desc">{config.guestGuidance.accommodation.detail}</p>
              </div>

              <div className="ss-travel-card">
                <span className="ss-travel-icon" aria-hidden="true">🌴</span>
                <h4 className="ss-travel-title">{config.guestGuidance.climate.title}</h4>
                <p className="ss-travel-desc">{config.guestGuidance.climate.detail}</p>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION E — Kindly Respond (RSVP)
            ================================================================= */}
        <section id="rsvp" className="ss-section ss-rsvp-section" aria-label="RSVP and Guest Attendance">
          <div className="ss-container">
            <div className="ss-section-header">
              <span className="ss-section-eyebrow">Response</span>
              <h2 className="ss-section-title">Kindly Respond</h2>
              <div className="ss-divider-flourish" aria-hidden="true">
                <span className="ss-flourish-line" />
                <Sparkles size={16} />
                <span className="ss-flourish-line" />
              </div>
              <p className="ss-section-lead">
                Please let us know if you can join our seaside celebration by{' '}
                <strong>{config.rsvp.deadlineDisplay}</strong>.
              </p>
            </div>

            <div className="ss-rsvp-card">
              <form onSubmit={handleRsvpSubmit} noValidate>
                <div className="ss-form-grid">
                  {/* Attendance Choice */}
                  <div className="ss-form-group ss-form-full">
                    <label className="ss-form-label">
                      Will you be joining us in Goa? <span className="required">*</span>
                    </label>
                    <div className="ss-radio-group">
                      <label
                        className={`ss-radio-pill ${rsvpData.attendance === 'joyfully-accepts' ? 'selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value="joyfully-accepts"
                          checked={rsvpData.attendance === 'joyfully-accepts'}
                          onChange={(e) => setRsvpData({ ...rsvpData, attendance: e.target.value })}
                        />
                        <span>Joyfully Accepts</span>
                      </label>
                      <label
                        className={`ss-radio-pill ${rsvpData.attendance === 'regretfully-declines' ? 'selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value="regretfully-declines"
                          checked={rsvpData.attendance === 'regretfully-declines'}
                          onChange={(e) => setRsvpData({ ...rsvpData, attendance: e.target.value })}
                        />
                        <span>Regretfully Declines</span>
                      </label>
                    </div>
                  </div>

                  {/* Guest Full Name */}
                  <div className="ss-form-group">
                    <label htmlFor="ss-guest-name" className="ss-form-label">
                      Your Full Name <span className="required">*</span>
                    </label>
                    <input
                      id="ss-guest-name"
                      type="text"
                      className={`ss-form-input ${rsvpErrors.name ? 'has-error' : ''}`}
                      placeholder="e.g. Rahul & Sneha Kapoor"
                      value={rsvpData.name}
                      onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                      aria-required="true"
                    />
                    {rsvpErrors.name && (
                      <span className="ss-error-msg" role="alert">
                        {rsvpErrors.name}
                      </span>
                    )}
                  </div>

                  {/* Contact Phone */}
                  <div className="ss-form-group">
                    <label htmlFor="ss-guest-phone" className="ss-form-label">
                      Contact WhatsApp / Phone
                    </label>
                    <input
                      id="ss-guest-phone"
                      type="tel"
                      className="ss-form-input"
                      placeholder="e.g. +91 98765 43210"
                      value={rsvpData.phone}
                      onChange={(e) => setRsvpData({ ...rsvpData, phone: e.target.value })}
                    />
                  </div>

                  {/* Number of Guests */}
                  <div className="ss-form-group">
                    <label htmlFor="ss-guest-count" className="ss-form-label">
                      Number of Guests Attending
                    </label>
                    <select
                      id="ss-guest-count"
                      className="ss-form-select"
                      value={rsvpData.guests}
                      onChange={(e) => setRsvpData({ ...rsvpData, guests: e.target.value })}
                    >
                      <option value="1">1 Guest (Solo)</option>
                      <option value="2">2 Guests (Couple)</option>
                      <option value="3">3 Guests (Family)</option>
                      <option value="4">4 Guests (Family Suite)</option>
                    </select>
                  </div>

                  {/* Dietary Requirements */}
                  <div className="ss-form-group">
                    <label htmlFor="ss-dietary" className="ss-form-label">
                      Dietary Preferences
                    </label>
                    <select
                      id="ss-dietary"
                      className="ss-form-select"
                      value={rsvpData.dietary}
                      onChange={(e) => setRsvpData({ ...rsvpData, dietary: e.target.value })}
                    >
                      {config.rsvp.dietaryOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Events Attending Checkboxes */}
                  <div className="ss-form-group ss-form-full">
                    <label className="ss-form-label">Events You Will Attend</label>
                    <div className="ss-checkbox-group">
                      {config.celebrations.map((ev) => (
                        <label key={ev.id} className="ss-checkbox-label">
                          <input
                            type="checkbox"
                            checked={rsvpData.events.includes(ev.id)}
                            onChange={() => handleEventToggle(ev.id)}
                          />
                          <span>{ev.title}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Blessings & Personal Message */}
                  <div className="ss-form-group ss-form-full">
                    <label htmlFor="ss-message" className="ss-form-label">
                      Warm Wishes &amp; Blessings for the Couple
                    </label>
                    <textarea
                      id="ss-message"
                      rows="3"
                      className="ss-form-textarea"
                      placeholder="Share a message or blessing for Arjun & Kiara..."
                      value={rsvpData.message}
                      onChange={(e) => setRsvpData({ ...rsvpData, message: e.target.value })}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="ss-form-group ss-form-full" style={{ marginTop: '12px' }}>
                    <button type="submit" className="ss-btn ss-btn-primary" style={{ width: '100%' }}>
                      <Send size={16} aria-hidden="true" />
                      <span>Submit Your RSVP Response</span>
                    </button>
                    <p className="ss-rsvp-deadline-note">
                      Kindly confirm by {config.rsvp.deadlineDisplay}. For questions, contact{' '}
                      <strong>{config.rsvp.contactPhone}</strong> or email{' '}
                      <strong>{config.rsvp.contactEmail}</strong>.
                    </p>
                  </div>
                </div>
              </form>

              {/* Submission Feedback Confirmation */}
              {rsvpSubmitted && (
                <div className="ss-rsvp-success-banner" role="status">
                  <p>
                    ✓ <strong>Thank you, {rsvpData.name}!</strong> Your response has been recorded.
                  </p>
                  <p style={{ fontSize: '13px', marginTop: '6px' }}>
                    {rsvpData.attendance === 'joyfully-accepts'
                      ? 'We are delighted to celebrate with you on the golden shores of Goa!'
                      : 'We will miss your presence by the sea and treasure your warm blessings.'}
                  </p>
                  <p style={{ fontSize: '11px', marginTop: '6px', opacity: 0.8 }}>
                    (Demonstration RSVP: No server credentials required; formatted for local and preview testing.)
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION F — With Love and Gratitude (Closing)
            ================================================================= */}
        <section className="ss-closing-section" aria-label="Closing Gratitude and Blessings">
          <div className="ss-closing-bg-container" aria-hidden="true">
            <img
              src={finaleImage}
              alt="Golden evening sunset waves gently washing over Goa beach sands"
              className="ss-closing-bg-img"
              loading="lazy"
            />
            <div className="ss-closing-overlay" />
          </div>

          <div className="ss-closing-content">
            <h2 className="ss-closing-title">{config.closing.gratitudeTitle}</h2>
            <p className="ss-closing-message">{config.closing.gratitudeMessage}</p>
            <div className="ss-closing-couple">
              {config.couple.partnerA} &amp; {config.couple.partnerB}
            </div>
            <div className="ss-closing-date">{config.event.dateDisplay}</div>
            <p className="ss-closing-signoff">{config.closing.familySignoff}</p>
          </div>
        </section>
      </main>

      {/* Floating Guest Quick-Action Bar */}
      <aside className="ss-floating-bar" aria-label="Quick invitation actions">
        <a href="#celebrations" className="ss-floating-link" title="View event schedule">
          <Clock size={16} aria-hidden="true" />
          <span className="btn-text">Schedule</span>
        </a>
        <a href="#venue" className="ss-floating-link" title="View resort & directions">
          <MapPin size={16} aria-hidden="true" />
          <span className="btn-text">Resort</span>
        </a>
        <button
          type="button"
          className="ss-floating-link"
          onClick={handleDownloadCalendar}
          title="Save wedding date to your calendar"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <Calendar size={16} aria-hidden="true" />
          <span className="btn-text">Calendar</span>
        </button>
        <button
          type="button"
          className="ss-floating-link"
          onClick={() => setShareModalOpen(true)}
          title="Share this invitation"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <Share2 size={16} aria-hidden="true" />
          <span className="btn-text">Share</span>
        </button>
        <a href="#rsvp" className="ss-floating-link ss-floating-cta" title="RSVP now">
          <Heart size={16} aria-hidden="true" />
          <span>RSVP</span>
        </a>
      </aside>

      {/* Footer Lockup */}
      <footer className="ss-template-footer" role="contentinfo">
        <div className="ss-container">
          <img
            src={logoImage}
            alt="ORYNZA Atelier"
            className="ss-footer-logo"
            width="100"
            height="33"
          />
          <p>© {new Date().getFullYear()} ORYNZA Digital Wedding Invitation Atelier. All rights reserved.</p>
          <p style={{ opacity: 0.7, marginTop: '4px' }}>
            Demonstration template: Sunset Shores (WED-002) • Replaceable couple &amp; venue details.
          </p>
        </div>
      </footer>

      {/* Share Modal Dialog */}
      {shareModalOpen && (
        <div
          className="ss-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Share Wedding Invitation"
        >
          <div className="ss-modal-card">
            <button
              type="button"
              className="ss-modal-close"
              onClick={() => setShareModalOpen(false)}
              aria-label="Close share dialog"
            >
              <X size={20} />
            </button>
            <h3 style={{ fontFamily: 'var(--ss-font-serif)', fontSize: '26px', color: 'var(--ss-green)', marginBottom: '8px' }}>
              Share This Invitation
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--ss-muted)', marginBottom: '24px' }}>
              Invite loved ones to celebrate Arjun &amp; Kiara’s wedding in Goa.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `✦ You are cordially invited to celebrate the wedding of Arjun & Kiara in Goa!\n\nView the digital invitation suite:\n${window.location.href}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ss-btn ss-btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Share via WhatsApp</span>
              </a>

              <button
                type="button"
                className="ss-btn ss-btn-secondary"
                onClick={handleCopyLink}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {copiedLink ? <span>✓ Link Copied to Clipboard!</span> : <span>Copy Invitation Link</span>}
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
