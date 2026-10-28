import React, { useState, useEffect, useRef } from 'react';
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

        const lfo = audioCtxRef.current.createOscillator();
        lfo.frequency.value = 0.12;
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
              width="106"
              height="34"
            />
            <span className="ss-logo-divider" aria-hidden="true" />
            <span className="ss-logo-monogram">{config.couple.monogram}</span>
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
                  Itinerary
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
                  RSVP
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
            SECTION A — Editorial Split-Screen Hero
            ================================================================= */}
        <section id="hero" className="ss-hero" aria-label="Wedding Invitation Opening">
          <div className="ss-container">
            <div className="ss-hero-split-grid">
              {/* Left Column: Typographic Masthead */}
              <div className="ss-hero-text-col">
                <div className="ss-hero-kicker-row">
                  <span className="ss-hero-badge">
                    <Sun size={14} aria-hidden="true" />
                    <span>Coastal Destination Suite • Goa</span>
                  </span>
                </div>

                <p className="ss-hero-parents">{config.couple.parentsWording}</p>

                <h1 className="ss-hero-title-names">
                  {config.couple.partnerA}
                  <span className="ss-amp">&amp;</span>
                  {config.couple.partnerB}
                </h1>

                <p className="ss-hero-tagline">{config.event.tagline}</p>

                <p className="ss-hero-copy">
                  {config.couple.invitationCopy}
                </p>

                {/* Meta Bar */}
                <div className="ss-hero-meta-bar">
                  <span className="ss-meta-chip">
                    <Calendar size={15} className="ss-chip-icon" aria-hidden="true" />
                    <span>{config.event.dateDisplay}</span>
                  </span>
                  <span className="ss-meta-chip">
                    <MapPin size={15} className="ss-chip-icon" aria-hidden="true" />
                    <span>{config.venue.name}</span>
                  </span>
                  <span className="ss-meta-chip">
                    <Compass size={15} className="ss-chip-icon" aria-hidden="true" />
                    <span>{config.event.destination}</span>
                  </span>
                </div>

                {/* Countdown Tile */}
                <div className="ss-countdown-strip" aria-label="Wedding Countdown">
                  <span className="ss-countdown-eyebrow">Countdown to the Sunset Vows</span>
                  <div className="ss-countdown-grid">
                    <div className="ss-countdown-tile">
                      <span className="ss-countdown-digit">{timeLeft.days}</span>
                      <span className="ss-countdown-unit">Days</span>
                    </div>
                    <div className="ss-countdown-tile">
                      <span className="ss-countdown-digit">{timeLeft.hours}</span>
                      <span className="ss-countdown-unit">Hours</span>
                    </div>
                    <div className="ss-countdown-tile">
                      <span className="ss-countdown-digit">{timeLeft.minutes}</span>
                      <span className="ss-countdown-unit">Mins</span>
                    </div>
                    <div className="ss-countdown-tile">
                      <span className="ss-countdown-digit">{timeLeft.seconds}</span>
                      <span className="ss-countdown-unit">Secs</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="ss-hero-actions">
                  <a href="#celebrations" className="ss-btn ss-btn-primary">
                    <span>Explore Itinerary</span>
                    <ChevronRight size={16} aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    className="ss-btn ss-btn-secondary"
                    onClick={handleDownloadCalendar}
                  >
                    <Download size={16} aria-hidden="true" />
                    <span>Save Date (.ics)</span>
                  </button>
                  <a href="#rsvp" className="ss-btn ss-btn-terracotta">
                    <span>Kindly Respond</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Sculptural Arched Visual */}
              <div className="ss-hero-visual-col">
                <div className="ss-sculptural-arch">
                  <img
                    src={heroImage}
                    alt="Panoramic coastal sunset over the Arabian Sea in Goa"
                    className="ss-hero-visual-img"
                    loading="eager"
                  />
                  <div className="ss-floating-seal" aria-hidden="true">
                    {config.couple.monogram}
                  </div>
                  <div className="ss-floating-resort-pill">
                    <span className="ss-resort-pill-title">{config.venue.name}</span>
                    <span className="ss-resort-pill-loc">Benaulim Beach • South Goa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION B — Magazine Editorial Story Spread
            ================================================================= */}
        <section id="story" className="ss-section ss-story-section" aria-label="The Couple Story">
          <div className="ss-container">
            <div className="ss-magazine-grid">
              {/* Offset Polaroid Portrait */}
              <div className="ss-portrait-polaroid-wrap">
                <img
                  src={portraitImage}
                  alt={`${config.couple.partnerA} and ${config.couple.partnerB} on the shores of Goa`}
                  className="ss-portrait-polaroid-img"
                  loading="lazy"
                />
                <div className="ss-polaroid-caption">
                  {config.couple.partnerA} &amp; {config.couple.partnerB}
                </div>
              </div>

              {/* Story Narrative */}
              <div>
                <span className="ss-story-lead-kicker">{config.intro.eyebrow}</span>
                <h2 className="ss-story-heading">{config.intro.title}</h2>
                <blockquote className="ss-editorial-quote">
                  {config.intro.quote}
                </blockquote>
                <p className="ss-story-paragraph">{config.intro.paragraph1}</p>
                <p className="ss-story-paragraph">{config.intro.paragraph2}</p>

                <div className="ss-story-family-badge">
                  <span className="ss-family-monogram" aria-hidden="true">
                    {config.couple.monogram}
                  </span>
                  <div>
                    <span className="ss-family-text">
                      {config.couple.partnerAFull} &amp; {config.couple.partnerBFull}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION C — Alternating Coastal Event Chapters
            ================================================================= */}
        <section id="celebrations" className="ss-section" aria-label="Celebrations Schedule">
          <div className="ss-container">
            <div className="ss-itinerary-header">
              <span className="ss-itinerary-eyebrow">The Gathering</span>
              <h2 className="ss-itinerary-title">Celebrations by the Sea</h2>
              <p className="ss-itinerary-lead">
                Four curated chapters honoring tropical sunshine, coastal music, sacred vows, and starlit banquets.
              </p>
            </div>

            {/* Alternating Event Chapters */}
            <div className="ss-chapters-stack">
              {config.celebrations.map((event, idx) => (
                <article
                  key={event.id}
                  className={`ss-chapter-card ${idx % 2 === 1 ? 'reverse' : ''}`}
                >
                  {/* Cropped Panel Visual */}
                  <div className="ss-chapter-visual" data-panel={event.panelIndex}>
                    <img
                      src={panelsImage}
                      alt={event.panelAlt}
                      loading="lazy"
                    />
                  </div>

                  {/* Editorial Details */}
                  <div className="ss-chapter-body">
                    <span className="ss-chapter-num-badge">
                      <Sun size={14} aria-hidden="true" />
                      <span>Chapter 0{event.panelIndex + 1}</span>
                    </span>

                    <h3 className="ss-chapter-title">{event.title}</h3>

                    <div className="ss-chapter-meta-row">
                      <span className="ss-chapter-meta-item">
                        <Calendar size={15} style={{ color: 'var(--ss-terracotta)' }} aria-hidden="true" />
                        <span>{event.date}</span>
                      </span>
                      <span className="ss-chapter-meta-item">
                        <Clock size={15} style={{ color: 'var(--ss-terracotta)' }} aria-hidden="true" />
                        <span>{event.timeDisplay}</span>
                      </span>
                      <span className="ss-chapter-meta-item">
                        <MapPin size={15} style={{ color: 'var(--ss-terracotta)' }} aria-hidden="true" />
                        <span>{event.venue}</span>
                      </span>
                    </div>

                    <p className="ss-chapter-desc">{event.description}</p>

                    <div className="ss-chapter-attire-pill">
                      <span><strong>Attire:</strong> {event.dressCode}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Mandap Feature Banner */}
            <div className="ss-mandap-banner">
              <div className="ss-mandap-img-wrap">
                <img
                  src={mandapImage}
                  alt={config.ceremonyMandap.alt}
                  className="ss-mandap-img"
                  loading="lazy"
                />
              </div>
              <div className="ss-mandap-content">
                <span className="ss-itinerary-eyebrow">{config.ceremonyMandap.eyebrow}</span>
                <h3>{config.ceremonyMandap.title}</h3>
                <p>{config.ceremonyMandap.description}</p>
                <a href="#rsvp" className="ss-btn ss-btn-primary">
                  <span>RSVP for Sunset Vows</span>
                  <ChevronRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION D — The Resort & Travel Guide
            ================================================================= */}
        <section id="venue" className="ss-section" aria-label="Venue Information">
          <div className="ss-container">
            <div className="ss-itinerary-header">
              <span className="ss-itinerary-eyebrow">The Resort</span>
              <h2 className="ss-itinerary-title">{config.venue.name}</h2>
              <p className="ss-itinerary-lead">
                A serene Mediterranean-style coastal sanctuary tucked along the silver sands of Benaulim Beach in South Goa.
              </p>
            </div>

            {/* Main Resort Presentation */}
            <div className="ss-resort-banner">
              <div className="ss-resort-visual-side">
                <img
                  src={venueImage}
                  alt={config.venue.alt}
                  className="ss-resort-visual-img"
                  loading="lazy"
                />
              </div>
              <div className="ss-resort-info-side">
                <span className="ss-resort-subheading">{config.venue.palaceSubtitle}</span>
                <h3 className="ss-resort-heading">{config.venue.name}</h3>
                <p className="ss-resort-desc">{config.venue.description}</p>
                <p style={{ fontSize: '14px', color: 'var(--ss-text-muted)', marginBottom: '24px' }}>
                  <MapPin size={16} style={{ color: 'var(--ss-terracotta)', display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px' }} />
                  {config.venue.address}
                </p>

                <div>
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

            {/* Travel Tiles */}
            <div className="ss-travel-cards-row">
              <div className="ss-travel-tile">
                <span className="ss-travel-tile-icon" aria-hidden="true">✈️</span>
                <h4 className="ss-travel-tile-title">{config.guestGuidance.airport.title}</h4>
                <p className="ss-travel-tile-desc">{config.guestGuidance.airport.detail}</p>
              </div>

              <div className="ss-travel-tile">
                <span className="ss-travel-tile-icon" aria-hidden="true">🏨</span>
                <h4 className="ss-travel-tile-title">{config.guestGuidance.accommodation.title}</h4>
                <p className="ss-travel-tile-desc">{config.guestGuidance.accommodation.detail}</p>
              </div>

              <div className="ss-travel-tile">
                <span className="ss-travel-tile-icon" aria-hidden="true">🌴</span>
                <h4 className="ss-travel-tile-title">{config.guestGuidance.climate.title}</h4>
                <p className="ss-travel-tile-desc">{config.guestGuidance.climate.detail}</p>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            SECTION E — Modern Minimalist RSVP
            ================================================================= */}
        <section id="rsvp" className="ss-section ss-rsvp-section" aria-label="Guest RSVP Form">
          <div className="ss-container">
            <div className="ss-itinerary-header">
              <span className="ss-itinerary-eyebrow">Response</span>
              <h2 className="ss-itinerary-title">Kindly Respond</h2>
              <p className="ss-itinerary-lead">
                Please confirm your attendance by <strong>{config.rsvp.deadlineDisplay}</strong> so we can ensure your stay is seamless.
              </p>
            </div>

            <div className="ss-rsvp-editorial-card">
              <form onSubmit={handleRsvpSubmit} noValidate>
                <div className="ss-form-grid">
                  {/* Attendance Radio Pills */}
                  <div className="ss-form-group ss-form-full">
                    <label className="ss-form-label">
                      Will you be joining our celebration in Goa? <span className="required">*</span>
                    </label>
                    <div className="ss-radio-pills">
                      <label
                        className={`ss-radio-box ${rsvpData.attendance === 'joyfully-accepts' ? 'selected' : ''}`}
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
                        className={`ss-radio-box ${rsvpData.attendance === 'regretfully-declines' ? 'selected' : ''}`}
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

                  {/* Full Name */}
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
                      <span className="ss-error-msg" role="alert">{rsvpErrors.name}</span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="ss-form-group">
                    <label htmlFor="ss-guest-phone" className="ss-form-label">
                      WhatsApp / Mobile Contact
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

                  {/* Guest Count */}
                  <div className="ss-form-group">
                    <label htmlFor="ss-guest-count" className="ss-form-label">
                      Number of Guests
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

                  {/* Dietary */}
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
                    <div className="ss-checkbox-grid">
                      {config.celebrations.map((ev) => (
                        <label key={ev.id} className="ss-checkbox-item">
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

                  {/* Blessings */}
                  <div className="ss-form-group ss-form-full">
                    <label htmlFor="ss-message" className="ss-form-label">
                      Warm Wishes &amp; Blessings
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
                  <div className="ss-form-group ss-form-full">
                    <button type="submit" className="ss-btn ss-btn-primary" style={{ width: '100%' }}>
                      <Send size={16} aria-hidden="true" />
                      <span>Submit RSVP Response</span>
                    </button>
                    <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--ss-text-muted)', marginTop: '14px' }}>
                      Questions? Reach our concierge at <strong>{config.rsvp.contactPhone}</strong> or <strong>{config.rsvp.contactEmail}</strong>.
                    </p>
                  </div>
                </div>
              </form>

              {/* Confirmation Banner */}
              {rsvpSubmitted && (
                <div className="ss-rsvp-success" role="status">
                  <p>
                    ✓ <strong>Thank you, {rsvpData.name}!</strong> Your RSVP has been confirmed.
                  </p>
                  <p style={{ fontSize: '13px', marginTop: '6px' }}>
                    {rsvpData.attendance === 'joyfully-accepts'
                      ? 'We look forward to welcoming you to the sunlit shores of Goa!'
                      : 'We will miss your company and warmly appreciate your blessings.'}
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
            SECTION F — Letterpress Beach Finale
            ================================================================= */}
        <section className="ss-closing-hero" aria-label="Closing Farewell">
          <div className="ss-closing-bg-box" aria-hidden="true">
            <img
              src={finaleImage}
              alt="Golden evening sunset waves washing over Goa beach sands"
              className="ss-closing-bg-img"
              loading="lazy"
            />
            <div className="ss-closing-gradient" />
          </div>

          <div className="ss-closing-inner">
            <span className="ss-closing-eyebrow">With Gratitude</span>
            <h2 className="ss-closing-heading">{config.closing.gratitudeTitle}</h2>
            <p className="ss-closing-text">{config.closing.gratitudeMessage}</p>
            <div className="ss-closing-names">
              {config.couple.partnerA} &amp; {config.couple.partnerB}
            </div>
            <div className="ss-closing-date">{config.event.dateDisplay}</div>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.75)', fontStyle: 'italic' }}>
              {config.closing.familySignoff}
            </p>
          </div>
        </section>
      </main>

      {/* Floating Bottom Dock */}
      <aside className="ss-floating-dock" aria-label="Quick actions">
        <a href="#celebrations" className="ss-dock-btn" title="View itinerary">
          <Clock size={16} aria-hidden="true" />
          <span className="label">Itinerary</span>
        </a>
        <a href="#venue" className="ss-dock-btn" title="View resort">
          <MapPin size={16} aria-hidden="true" />
          <span className="label">Resort</span>
        </a>
        <button
          type="button"
          className="ss-dock-btn"
          onClick={handleDownloadCalendar}
          title="Save date (.ics)"
        >
          <Calendar size={16} aria-hidden="true" />
          <span className="label">Calendar</span>
        </button>
        <button
          type="button"
          className="ss-dock-btn"
          onClick={() => setShareModalOpen(true)}
          title="Share invitation"
        >
          <Share2 size={16} aria-hidden="true" />
          <span className="label">Share</span>
        </button>
        <a href="#rsvp" className="ss-dock-btn ss-dock-cta" title="RSVP now">
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
            className="ss-footer-brand-logo"
            width="90"
            height="30"
          />
          <p>© {new Date().getFullYear()} ORYNZA Digital Wedding Invitation Atelier. All rights reserved.</p>
          <p style={{ opacity: 0.7, marginTop: '4px' }}>
            Template 2: Sunset Shores (WED-002) • Replaceable couple &amp; venue details.
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
          <div className="ss-modal-box">
            <button
              type="button"
              className="ss-modal-close-btn"
              onClick={() => setShareModalOpen(false)}
              aria-label="Close share dialog"
            >
              <X size={20} />
            </button>
            <h3 style={{ fontFamily: 'var(--ss-font-serif)', fontSize: '26px', color: 'var(--ss-teal)', marginBottom: '8px' }}>
              Share This Invitation
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--ss-text-muted)', marginBottom: '24px' }}>
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
