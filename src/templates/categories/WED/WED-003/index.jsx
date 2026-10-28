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
  Flower2,
  Leaf,
  X,
  Send,
  ExternalLink,
  ChevronRight,
  Menu,
} from 'lucide-react';

import { ENCHANTED_GARDENS_CONFIG } from './config';
import './enchantedGardens.css';

// Local template assets
import heroImage from './assets/garden-hero.png';
import portraitImage from './assets/garden-couple-portrait.png';
import panelsImage from './assets/garden-celebration-panels.png';
import overlayImage from './assets/garden-botanical-overlay.png';
import dividerSvg from './assets/garden-botanical-divider.svg';
import finaleImage from './assets/garden-finale.png';
import venueImage from './assets/garden-venue-detail.png';
import mandapImage from './assets/garden-ceremony-installation.png';
import logoImage from './assets/orynza-logo.png';

export default function EnchantedGardensTemplate() {
  const config = ENCHANTED_GARDENS_CONFIG;

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

  // Web Audio Synth for ambient garden breeze & chimes
  const audioCtxRef = useRef(null);
  const chimeNodesRef = useRef([]);

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
      const sections = ['hero', 'story', 'celebrations', 'mandap', 'venue', 'rsvp'];
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

  // --- Ambient Garden Chime & Breeze Synthesizer ---
  const toggleAmbientSound = () => {
    if (isMuted) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        // Soft pink noise for gentle garden breeze
        const bufferSize = audioCtxRef.current.sampleRate * 2;
        const noiseBuffer = audioCtxRef.current.createBuffer(1, bufferSize, audioCtxRef.current.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99 * b0 + white * 0.04;
          b1 = 0.95 * b1 + white * 0.08;
          b2 = 0.85 * b2 + white * 0.15;
          output[i] = (b0 + b1 + b2) * 0.08;
        }

        const breeze = audioCtxRef.current.createBufferSource();
        breeze.buffer = noiseBuffer;
        breeze.loop = true;

        const filter = audioCtxRef.current.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 350;

        const gainNode = audioCtxRef.current.createGain();
        gainNode.gain.setValueAtTime(0.01, audioCtxRef.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.12, audioCtxRef.current.currentTime + 2);

        breeze.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtxRef.current.destination);
        breeze.start();

        chimeNodesRef.current = [breeze, gainNode];
        setIsMuted(false);
      } catch (err) {
        console.warn('Audio synthesis not supported:', err);
        setIsMuted(false);
      }
    } else {
      if (chimeNodesRef.current.length) {
        try {
          const [breeze, gain] = chimeNodesRef.current;
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 1);
          setTimeout(() => {
            breeze.stop();
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
      'PRODID:-//ORYNZA Atelier//Enchanted Gardens Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:enchanted-gardens-wedding-20271124@orynza.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      'DTSTART:20271124T103000Z',
      'DTEND:20271124T183000Z',
      `SUMMARY:${config.couple.partnerA} & ${config.couple.partnerB} — Wedding Celebration in Bengaluru`,
      `DESCRIPTION:Join us for the wedding of ${config.couple.partnerA} & ${config.couple.partnerB} at ${config.venue.name}. More info: ${window.location.href}`,
      `LOCATION:${config.venue.name}, ${config.venue.address}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${config.couple.partnerA}_${config.couple.partnerB}_Wedding_Bengaluru.ics`);
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
    if (!rsvpData.phone.trim()) errors.phone = 'Please provide a valid contact number.';

    if (Object.keys(errors).length > 0) {
      setRsvpErrors(errors);
      return;
    }

    setRsvpErrors({});
    setRsvpSubmitted(true);
  };

  // --- Share Modal Handlers ---
  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${config.couple.partnerA} & ${config.couple.partnerB} — Wedding Invitation`,
          text: `You're cordially invited to celebrate the wedding of ${config.couple.partnerA} & ${config.couple.partnerB} in Bengaluru.`,
          url: window.location.href,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          setShareModalOpen(true);
        }
      }
    } else {
      setShareModalOpen(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="enchanted-gardens-template" data-template-id="WED-003">
      {/* Keyboard Skip Navigation */}
      <a href="#main-content" className="eg-skip-link">
        Skip to wedding invitation content
      </a>

      {/* Demonstration Top Banner */}
      <div className="eg-demo-bar" role="banner">
        {config.demoDisclaimer}
      </div>

      {/* Navigation Header */}
      <header className="eg-nav-header">
        <div className="eg-nav-container">
          <a href="#" className="eg-nav-brand" aria-label="ORYNZA Atelier Home">
            <img src={logoImage} alt="ORYNZA Atelier" className="eg-brand-logo" />
            <span className="eg-brand-tag">Botanical Suite</span>
          </a>

          <nav aria-label="Invitation Navigation">
            <ul className="eg-nav-links">
              <li>
                <a
                  href="#hero"
                  className={`eg-nav-link ${activeSection === 'hero' ? 'active' : ''}`}
                >
                  Invitation
                </a>
              </li>
              <li>
                <a
                  href="#story"
                  className={`eg-nav-link ${activeSection === 'story' ? 'active' : ''}`}
                >
                  Our Narrative
                </a>
              </li>
              <li>
                <a
                  href="#celebrations"
                  className={`eg-nav-link ${activeSection === 'celebrations' ? 'active' : ''}`}
                >
                  Celebrations
                </a>
              </li>
              <li>
                <a
                  href="#mandap"
                  className={`eg-nav-link ${activeSection === 'mandap' ? 'active' : ''}`}
                >
                  The Mandap
                </a>
              </li>
              <li>
                <a
                  href="#venue"
                  className={`eg-nav-link ${activeSection === 'venue' ? 'active' : ''}`}
                >
                  The Estate
                </a>
              </li>
              <li>
                <a
                  href="#rsvp"
                  className={`eg-nav-link ${activeSection === 'rsvp' ? 'active' : ''}`}
                >
                  RSVP
                </a>
              </li>
            </ul>
          </nav>

          <div className="eg-nav-actions">
            <button
              onClick={toggleAmbientSound}
              className="eg-icon-btn"
              title={isMuted ? 'Listen to ambient garden breeze' : 'Mute garden sound'}
              aria-label={isMuted ? 'Listen to ambient garden breeze' : 'Mute garden sound'}
              aria-pressed={!isMuted}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            <button
              onClick={handleShareClick}
              className="eg-icon-btn"
              title="Share invitation"
              aria-label="Share invitation"
            >
              <Share2 size={18} />
            </button>

            <a href="#rsvp" className="eg-btn-primary">
              RSVP Now
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="eg-mobile-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`eg-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <a href="#hero" onClick={() => setMobileMenuOpen(false)}>Invitation</a>
            </li>
            <li>
              <a href="#story" onClick={() => setMobileMenuOpen(false)}>Our Narrative</a>
            </li>
            <li>
              <a href="#celebrations" onClick={() => setMobileMenuOpen(false)}>Celebrations</a>
            </li>
            <li>
              <a href="#mandap" onClick={() => setMobileMenuOpen(false)}>The Mandap</a>
            </li>
            <li>
              <a href="#venue" onClick={() => setMobileMenuOpen(false)}>The Estate</a>
            </li>
            <li>
              <a href="#rsvp" onClick={() => setMobileMenuOpen(false)}>RSVP</a>
            </li>
          </ul>
          <a
            href="#rsvp"
            onClick={() => setMobileMenuOpen(false)}
            className="eg-btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            RSVP Now
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="main-content">
        {/* --- Section A: Editorial Asymmetrical Hero --- */}
        <section id="hero" className="eg-hero-section" aria-labelledby="hero-kicker">
          <div className="eg-hero-grid">
            {/* Left Column: Typographic Masthead */}
            <div className="eg-hero-editorial">
              <div id="hero-kicker" className="eg-hero-kicker">
                <Leaf size={16} color="var(--eg-sage)" />
                <span>Wedding Invitation</span>
              </div>

              <h1 className="eg-hero-names">
                <span>{config.couple.partnerA}</span>
                <span className="eg-ampersand">&amp;</span>
                <span>{config.couple.partnerB}</span>
              </h1>

              <div className="eg-hero-tagline">{config.event.tagline}</div>

              <img
                src={dividerSvg}
                alt=""
                className="eg-botanical-divider"
                aria-hidden="true"
              />

              <p className="eg-hero-invitation-copy">
                {config.couple.parentsWording} {config.couple.invitationCopy}
              </p>

              <div className="eg-hero-meta-bar">
                <div className="eg-meta-block">
                  <span className="eg-meta-label">Date</span>
                  <span className="eg-meta-val">{config.event.dateDisplay}</span>
                </div>
                <div className="eg-meta-block">
                  <span className="eg-meta-label">Venue</span>
                  <span className="eg-meta-val">{config.venue.name}</span>
                </div>
                <div className="eg-meta-block">
                  <span className="eg-meta-label">Destination</span>
                  <span className="eg-meta-val">{config.event.destination}</span>
                </div>
              </div>

              <div className="eg-hero-actions">
                <a href="#rsvp" className="eg-btn-primary">
                  Attend the Celebration
                </a>
                <button onClick={handleDownloadCalendar} className="eg-btn-secondary">
                  <Download size={16} />
                  <span>Add to Calendar</span>
                </button>
              </div>
            </div>

            {/* Right Column: Photography Showcase */}
            <div className="eg-hero-visual">
              <div className="eg-monogram-seal">
                <span className="eg-seal-letters">{config.couple.monogram}</span>
                <span className="eg-seal-sub">BENGALURU</span>
              </div>

              <div className="eg-portrait-frame">
                <img
                  src={portraitImage}
                  alt={`${config.couple.partnerA} & ${config.couple.partnerB} in the lush garden canopy`}
                  className="eg-portrait-img"
                />
                <div className="eg-portrait-caption-strip">
                  <div className="eg-caption-title">Under the Tamarind Canopy</div>
                  <div className="eg-caption-sub">
                    {config.couple.partnerA} &amp; {config.couple.partnerB} • 24.11.2027
                  </div>
                </div>
              </div>

              <img
                src={overlayImage}
                alt=""
                className="eg-overlay-foliage"
                aria-hidden="true"
              />
            </div>
          </div>
        </section>

        {/* Live Countdown Bar */}
        <div className="eg-countdown-wrapper" aria-label="Wedding Countdown">
          <div className="eg-countdown-card">
            <div className="eg-countdown-header">
              <Clock size={28} color="var(--eg-sage)" />
              <div>
                <div className="eg-countdown-title">Counting Down to the Canopy Vows</div>
                <div className="eg-countdown-sub">
                  {config.event.dateDisplay} • {config.venue.name}
                </div>
              </div>
            </div>

            <div className="eg-timer-units">
              <div className="eg-timer-unit">
                <div className="eg-timer-num">{timeLeft.days}</div>
                <div className="eg-timer-lbl">Days</div>
              </div>
              <div className="eg-timer-unit">
                <div className="eg-timer-num">{timeLeft.hours}</div>
                <div className="eg-timer-lbl">Hours</div>
              </div>
              <div className="eg-timer-unit">
                <div className="eg-timer-num">{timeLeft.minutes}</div>
                <div className="eg-timer-lbl">Mins</div>
              </div>
              <div className="eg-timer-unit">
                <div className="eg-timer-num">{timeLeft.seconds}</div>
                <div className="eg-timer-lbl">Secs</div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Section B: Editorial Narrative & Story --- */}
        <section id="story" className="eg-narrative-section" aria-labelledby="story-title">
          <div className="eg-narrative-container">
            <div className="eg-narrative-media">
              <img
                src={venueImage}
                alt="Sunlit pathways and lush botanical foliage of The Tamarind Grove"
                className="eg-narrative-img"
              />
              <div className="eg-narrative-quote-card">
                <p className="eg-narrative-quote-text">{config.intro.quote}</p>
              </div>
            </div>

            <div className="eg-narrative-copy-block">
              <div className="eg-section-kicker">{config.intro.eyebrow}</div>
              <h2 id="story-title" className="eg-section-title">
                {config.intro.title}
              </h2>
              <p className="eg-narrative-p">{config.intro.paragraph1}</p>
              <p className="eg-narrative-p">{config.intro.paragraph2}</p>
            </div>
          </div>
        </section>

        {/* --- Section C: Celebrations (4 Events via 4-Panel Crop) --- */}
        <section
          id="celebrations"
          className="eg-celebrations-section"
          aria-labelledby="celebrations-title"
        >
          <div className="eg-section-header-center">
            <div className="eg-section-kicker">Itinerary of Celebrations</div>
            <h2 id="celebrations-title" className="eg-section-title">
              Moments of Joy &amp; Union
            </h2>
            <p className="eg-narrative-p">
              Four curated gatherings celebrating music, sacred vows, and togetherness amidst the
              natural serenity of the botanical estate.
            </p>
          </div>

          <div className="eg-celebrations-grid">
            {config.celebrations.map((event) => (
              <article key={event.id} className="eg-celebration-card">
                <div className="eg-panel-crop-window">
                  <img
                    src={panelsImage}
                    alt={event.panelAlt}
                    className="eg-panel-crop-img"
                    data-panel={event.panelIndex}
                  />
                  <span className="eg-card-badge">{event.date}</span>
                </div>

                <div className="eg-card-content">
                  <div>
                    <h3 className="eg-card-title">{event.title}</h3>
                    <div className="eg-card-timings">
                      <div className="eg-card-timing-item">
                        <Clock size={15} />
                        <span>{event.timeDisplay}</span>
                      </div>
                      <div className="eg-card-timing-item">
                        <MapPin size={15} />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                    <p className="eg-card-desc">{event.description}</p>
                  </div>

                  <div className="eg-card-footer">
                    <div>
                      <div className="eg-card-attire-label">Suggested Attire</div>
                      <div className="eg-card-attire-val">{event.dressCode}</div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* --- Section D: Sacred Mandap Feature --- */}
        <section id="mandap" className="eg-mandap-section" aria-labelledby="mandap-title">
          <div className="eg-mandap-container">
            <div className="eg-mandap-img-frame">
              <img
                src={mandapImage}
                alt={config.ceremonyMandap.alt}
                className="eg-mandap-img"
              />
            </div>

            <div className="eg-mandap-text-block">
              <div className="eg-section-kicker">{config.ceremonyMandap.eyebrow}</div>
              <h2 id="mandap-title" className="eg-section-title">
                {config.ceremonyMandap.title}
              </h2>
              <p className="eg-mandap-desc">{config.ceremonyMandap.description}</p>

              <div className="eg-mandap-highlights">
                <div className="eg-mandap-pill">
                  <Leaf size={16} color="var(--eg-sage)" />
                  <span>Living Floral Canopies</span>
                </div>
                <div className="eg-mandap-pill">
                  <Flower2 size={16} color="var(--eg-rose)" />
                  <span>Fragrant Rajnigandha</span>
                </div>
                <div className="eg-mandap-pill">
                  <Sparkles size={16} color="var(--eg-bronze)" />
                  <span>Open-Sky Amphitheatre</span>
                </div>
                <div className="eg-mandap-pill">
                  <Heart size={16} color="var(--eg-sage)" />
                  <span>Sacred Vedic Pheras</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section E: Venue & Estate Information --- */}
        <section id="venue" className="eg-venue-section" aria-labelledby="venue-title">
          <div className="eg-venue-grid">
            <div className="eg-venue-details">
              <div className="eg-section-kicker">The Destination Setting</div>
              <h2 id="venue-title" className="eg-venue-name">
                {config.venue.name}
              </h2>
              <div className="eg-venue-sub">{config.venue.subtitle}</div>
              <p className="eg-venue-desc">{config.venue.description}</p>

              <div className="eg-venue-info-row">
                <MapPin size={20} color="var(--eg-sage)" style={{ flexShrink: 0 }} />
                <span>{config.venue.address}</span>
              </div>

              <div className="eg-venue-actions">
                <a
                  href={config.venue.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eg-btn-secondary"
                >
                  <ExternalLink size={16} />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            <div className="eg-venue-visual">
              <img
                src={heroImage}
                alt={config.venue.alt}
                className="eg-venue-img"
              />
            </div>
          </div>

          {/* Guest Experience Cards */}
          <div className="eg-guest-grid">
            <div className="eg-guest-card">
              <div className="eg-guest-icon">
                <MapPin size={22} />
              </div>
              <h3 className="eg-guest-title">{config.guestGuidance.airport.title}</h3>
              <p className="eg-guest-detail">{config.guestGuidance.airport.detail}</p>
            </div>

            <div className="eg-guest-card">
              <div className="eg-guest-icon">
                <Heart size={22} />
              </div>
              <h3 className="eg-guest-title">{config.guestGuidance.accommodation.title}</h3>
              <p className="eg-guest-detail">{config.guestGuidance.accommodation.detail}</p>
            </div>

            <div className="eg-guest-card">
              <div className="eg-guest-icon">
                <Leaf size={22} />
              </div>
              <h3 className="eg-guest-title">{config.guestGuidance.climate.title}</h3>
              <p className="eg-guest-detail">{config.guestGuidance.climate.detail}</p>
            </div>
          </div>
        </section>

        {/* --- Section F: Accessible RSVP Form --- */}
        <section id="rsvp" className="eg-rsvp-section" aria-labelledby="rsvp-title">
          <div className="eg-rsvp-box">
            <div className="eg-rsvp-header">
              <div className="eg-section-kicker">Reserve Your Presence</div>
              <h2 id="rsvp-title" className="eg-section-title">
                Kindly Respond
              </h2>
              <span className="eg-rsvp-deadline">
                RSVP Requested by {config.rsvp.deadlineDisplay}
              </span>
            </div>

            {rsvpSubmitted ? (
              <div className="eg-rsvp-success" role="status" aria-live="polite">
                <div className="eg-success-icon">
                  <CheckCircle size={36} />
                </div>
                <h3 className="eg-success-title">Thank You, {rsvpData.name}!</h3>
                <p className="eg-success-msg">
                  {rsvpData.attendance === 'joyfully-accepts'
                    ? 'Your RSVP has been joyfully received. We eagerly look forward to celebrating with you beneath the tamarind canopies in Bengaluru!'
                    : 'We have received your regrets with heartfelt warmth. Your blessings are treasured as we begin our new journey together.'}
                </p>
                <button
                  type="button"
                  onClick={() => setRsvpSubmitted(false)}
                  className="eg-btn-secondary"
                >
                  Edit Response
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} noValidate>
                <div className="eg-form-group">
                  <label htmlFor="guest-name" className="eg-form-label">
                    Full Name *
                  </label>
                  <input
                    id="guest-name"
                    type="text"
                    required
                    className="eg-form-input"
                    value={rsvpData.name}
                    onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                    placeholder="e.g. Dr. Siddharth Verma"
                    aria-describedby={rsvpErrors.name ? 'name-error' : undefined}
                  />
                  {rsvpErrors.name && (
                    <div id="name-error" className="eg-form-error" role="alert">
                      {rsvpErrors.name}
                    </div>
                  )}
                </div>

                <div className="eg-form-group">
                  <label htmlFor="guest-phone" className="eg-form-label">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    id="guest-phone"
                    type="tel"
                    required
                    className="eg-form-input"
                    value={rsvpData.phone}
                    onChange={(e) => setRsvpData({ ...rsvpData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    aria-describedby={rsvpErrors.phone ? 'phone-error' : undefined}
                  />
                  {rsvpErrors.phone && (
                    <div id="phone-error" className="eg-form-error" role="alert">
                      {rsvpErrors.phone}
                    </div>
                  )}
                </div>

                <div className="eg-form-group">
                  <label className="eg-form-label">Attendance *</label>
                  <div className="eg-radio-group">
                    <label className="eg-radio-label">
                      <input
                        type="radio"
                        name="attendance"
                        value="joyfully-accepts"
                        checked={rsvpData.attendance === 'joyfully-accepts'}
                        onChange={(e) =>
                          setRsvpData({ ...rsvpData, attendance: e.target.value })
                        }
                      />
                      <span>Joyfully Accepts</span>
                    </label>

                    <label className="eg-radio-label">
                      <input
                        type="radio"
                        name="attendance"
                        value="regretfully-declines"
                        checked={rsvpData.attendance === 'regretfully-declines'}
                        onChange={(e) =>
                          setRsvpData({ ...rsvpData, attendance: e.target.value })
                        }
                      />
                      <span>Regretfully Declines</span>
                    </label>
                  </div>
                </div>

                {rsvpData.attendance === 'joyfully-accepts' && (
                  <>
                    <div className="eg-form-group">
                      <label htmlFor="guest-count" className="eg-form-label">
                        Total Number of Attending Guests
                      </label>
                      <select
                        id="guest-count"
                        className="eg-form-select"
                        value={rsvpData.guests}
                        onChange={(e) => setRsvpData({ ...rsvpData, guests: e.target.value })}
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                      </select>
                    </div>

                    <div className="eg-form-group">
                      <label className="eg-form-label">Events You Will Attend</label>
                      <div className="eg-events-checkbox-grid">
                        {config.celebrations.map((ev) => (
                          <label key={ev.id} className="eg-checkbox-pill">
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

                    <div className="eg-form-group">
                      <label htmlFor="dietary-pref" className="eg-form-label">
                        Dietary Preferences
                      </label>
                      <select
                        id="dietary-pref"
                        className="eg-form-select"
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
                  </>
                )}

                <div className="eg-form-group">
                  <label htmlFor="guest-message" className="eg-form-label">
                    Warm Wishes &amp; Notes for the Couple
                  </label>
                  <textarea
                    id="guest-message"
                    rows={3}
                    className="eg-form-textarea"
                    value={rsvpData.message}
                    onChange={(e) => setRsvpData({ ...rsvpData, message: e.target.value })}
                    placeholder="Share your congratulations, travel questions, or blessing..."
                  />
                </div>

                <button type="submit" className="eg-submit-btn">
                  <Send size={16} />
                  <span>Send Confirmation</span>
                </button>
              </form>
            )}
          </div>
        </section>

        {/* --- Section G: Finale & Gratitude --- */}
        <section className="eg-finale-section" aria-labelledby="finale-title">
          <img
            src={finaleImage}
            alt=""
            className="eg-finale-bg-img"
            aria-hidden="true"
          />
          <div className="eg-finale-content">
            <div className="eg-finale-monogram">{config.couple.monogram}</div>
            <h2 id="finale-title" className="eg-finale-title">
              {config.closing.gratitudeTitle}
            </h2>
            <p className="eg-finale-message">{config.closing.gratitudeMessage}</p>
            <div className="eg-finale-signoff">{config.closing.familySignoff}</div>
          </div>
        </section>
      </main>

      {/* Atelier Footer */}
      <footer className="eg-atelier-footer">
        <p>
          Bespoke Digital Invitation crafted by{' '}
          <a href="https://orynza.github.io/ORYNZA/" target="_blank" rel="noopener noreferrer">
            ORYNZA Luxury Atelier
          </a>
          . All Rights Reserved © 2027.
        </p>
      </footer>

      {/* Floating Action Dock */}
      <aside className="eg-floating-dock" aria-label="Quick Actions">
        <button onClick={handleDownloadCalendar} className="eg-dock-btn" title="Add to Calendar">
          <Calendar size={15} />
          <span>Calendar</span>
        </button>
        <button onClick={handleShareClick} className="eg-dock-btn" title="Share Invitation">
          <Share2 size={15} />
          <span>Share</span>
        </button>
        <a href="#rsvp" className="eg-dock-btn primary" title="Respond to Invitation">
          <Heart size={15} />
          <span>RSVP</span>
        </a>
      </aside>

      {/* Share Modal Dialog */}
      {shareModalOpen && (
        <div
          className="eg-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-title"
          onClick={() => setShareModalOpen(false)}
        >
          <div className="eg-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShareModalOpen(false)}
              className="eg-modal-close"
              aria-label="Close share dialog"
            >
              <X size={20} />
            </button>
            <h3 id="share-title" className="eg-card-title">
              Share Invitation
            </h3>
            <p className="eg-card-desc">
              Share the wedding invitation of {config.couple.partnerA} &amp; {config.couple.partnerB} with family and friends.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <input
                type="text"
                readOnly
                value={window.location.href}
                className="eg-form-input"
                style={{ flex: 1 }}
              />
              <button onClick={handleCopyLink} className="eg-btn-primary">
                {copiedLink ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
