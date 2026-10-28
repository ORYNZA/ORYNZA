import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { INVITATION_DESIGNS } from '../../data/designs';
import { ASSETS } from '../../config/assets';

export default function InvitationPreviewStudio({ activeDesignId, onSelectDesign }) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (activeDesignId) {
      const idx = INVITATION_DESIGNS.findIndex(d => d.id === activeDesignId);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  useEffect(() => {
    if (activeDesignId) {
      const idx = INVITATION_DESIGNS.findIndex(d => d.id === activeDesignId);
      if (idx >= 0) setCurrentIndex(idx);
    }
  }, [activeDesignId]);

  const currentDesign = INVITATION_DESIGNS[currentIndex] || INVITATION_DESIGNS[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? INVITATION_DESIGNS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === INVITATION_DESIGNS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="preview-studio" className="section preview-studio-section" aria-label="Interactive Invitation Preview Studio">
      <div className="container">
        {/* Studio Header */}
        <div className="section-header text-center">
          <div className="studio-badge">
            <span className="badge-gem">✦</span>
            <span>INTERACTIVE ATELIER SHOWROOM</span>
            <span className="badge-gem">✦</span>
          </div>
          <h2 className="section-title">The Digital Stationery Studio</h2>
          <p className="section-subtitle">
            See how your wedding invitation looks on your guests' smartphones. Seamlessly switch between styles, examine typography, and experience true mobile elegance.
          </p>
        </div>

        {/* Studio Main Workspace */}
        <div className="studio-workspace">
          {/* Left Column: Device Simulator */}
          <div className="studio-device-column">
            <div className="studio-phone-bezel">
              {/* Phone Speaker & Camera Notch */}
              <div className="phone-notch" aria-hidden="true">
                <span className="notch-speaker"></span>
                <span className="notch-camera"></span>
              </div>

              {/* Phone Screen Viewport */}
              <div className="phone-screen" key={currentDesign.id}>
                {/* Mockup Artwork Presentation */}
                <div className="phone-artwork-wrap">
                  <img
                    src={currentDesign.image}
                    alt={currentDesign.alt}
                    className="phone-artwork-img"
                    loading="eager"
                  />
                  {/* Subtle stationery shadow overlay */}
                  <div className="phone-sheen" aria-hidden="true"></div>
                </div>

                {/* Simulated Floating Guest Action Bar */}
                <div className="phone-guest-bar" aria-label="Simulated invitation actions">
                  <Link
                    to={`/invite/${currentDesign.demoSlug || 'demo-wedding'}#rsvp`}
                    className="guest-bar-btn"
                    title="View sample RSVP"
                  >
                    RSVP
                  </Link>
                  <Link
                    to={`/invite/${currentDesign.demoSlug || 'demo-wedding'}#venue`}
                    className="guest-bar-btn"
                    title="View sample venue & directions"
                  >
                    Directions
                  </Link>
                  <Link
                    to={`/invite/${currentDesign.demoSlug || 'demo-wedding'}#itinerary`}
                    className="guest-bar-btn"
                    title="View sample schedule"
                  >
                    Schedule
                  </Link>
                </div>
              </div>

              {/* Device Home Indicator */}
              <div className="phone-home-indicator" aria-hidden="true"></div>
            </div>

            {/* Device Slider Controls */}
            <div className="studio-slider-controls">
              <button
                type="button"
                className="studio-nav-arrow"
                onClick={handlePrev}
                aria-label="Previous invitation style"
              >
                ← Prev Style
              </button>
              <span className="studio-nav-counter">
                {currentIndex + 1} of {INVITATION_DESIGNS.length}
              </span>
              <button
                type="button"
                className="studio-nav-arrow"
                onClick={handleNext}
                aria-label="Next invitation style"
              >
                Next Style →
              </button>
            </div>
          </div>

          {/* Right Column: Style Blueprint & Actions */}
          <div className="studio-details-column">
            <div className="studio-details-card">
              <div className="studio-card-top">
                <span className="studio-badge-pill">{currentDesign.categoryLabel}</span>
                <span className="studio-badge-rank">Style 0{currentIndex + 1}</span>
              </div>

              <h3 className="studio-design-name">{currentDesign.name}</h3>
              <p className="studio-design-tagline">“{currentDesign.tagline}”</p>
              
              <div className="studio-divider" aria-hidden="true"></div>

              <p className="studio-design-desc">{currentDesign.description}</p>

              {/* Color Harmonies */}
              <div className="studio-palette-section">
                <h4 className="studio-subheading">Atelier Color Harmony</h4>
                <div className="studio-palette-row">
                  {currentDesign.palette && currentDesign.palette.map((color, i) => (
                    <div key={i} className="palette-chip-item">
                      <span className="palette-swatch" style={{ backgroundColor: color }} />
                      <span className="palette-name">{currentDesign.paletteNames ? currentDesign.paletteNames[i] : color}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suited Celebrations */}
              <div className="studio-ceremonies-section">
                <h4 className="studio-subheading">Curated For</h4>
                <div className="studio-ceremony-chips">
                  {currentDesign.ceremonies && currentDesign.ceremonies.map((c, i) => (
                    <span key={i} className="studio-ceremony-pill">✦ {c}</span>
                  ))}
                </div>
              </div>

              {/* Thumbnail Selector Strip */}
              <div className="studio-thumbs-section">
                <h4 className="studio-subheading">Switch Between Styles</h4>
                <div className="studio-thumbs-grid" role="tablist" aria-label="Select invitation style to preview">
                  {INVITATION_DESIGNS.map((d, idx) => (
                    <button
                      key={d.id}
                      type="button"
                      role="tab"
                      aria-selected={idx === currentIndex}
                      className={`studio-thumb-btn ${idx === currentIndex ? 'is-selected' : ''}`}
                      onClick={() => setCurrentIndex(idx)}
                      title={d.name}
                    >
                      <img src={d.image} alt={d.name} className="studio-thumb-img" loading="eager" />
                      <span className="studio-thumb-label">{d.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Atelier Actions */}
              <div className="studio-actions-group">
                <button
                  type="button"
                  className="btn btn-primary studio-choose-btn"
                  onClick={() => onSelectDesign(currentDesign.name)}
                >
                  <span>Choose “{currentDesign.name}” for My Wedding</span>
                  <span aria-hidden="true">→</span>
                </button>

                <Link
                  to={`/invite/${currentDesign.demoSlug || 'demo-wedding'}`}
                  className="btn btn-secondary studio-demo-btn"
                >
                  <span>Open Fullscreen Guest Experience</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
