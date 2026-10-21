import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { INVITATION_DESIGNS, DESIGN_CATEGORIES } from '../../data/designs';

export default function InvitationGallery({ onSelectDesign, onPreviewInStudio }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredDesigns = activeCategory === 'all'
    ? INVITATION_DESIGNS
    : INVITATION_DESIGNS.filter((d) => d.category === activeCategory);

  return (
    <section id="designs" className="section gallery-section" aria-label="Wedding Worlds Invitation Collection">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="gallery-header-badge">
            <span className="badge-sparkle">✦</span>
            <span>CURATED WEDDING WORLDS</span>
            <span className="badge-sparkle">✦</span>
          </div>
          <h2 className="section-title">Explore Our Signature Collections</h2>
          <p className="section-subtitle">
            Six distinct visual languages, each designed to evoke the spirit, sacredness, and joy of Indian celebrations. Find the world that reflects your love story.
          </p>
        </div>

        {/* Dynamic Category Filter Bar */}
        <div className="gallery-filter-bar" role="tablist" aria-label="Filter invitation collections">
          {DESIGN_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const count = cat.id === 'all'
              ? INVITATION_DESIGNS.length
              : INVITATION_DESIGNS.filter((d) => d.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`filter-tab-btn ${isSelected ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="filter-count-chip">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        {filteredDesigns.length > 0 ? (
          <div className="gallery-grid">
            {filteredDesigns.map((design, index) => (
              <article
                key={design.id}
                className={`gallery-card ${index === 0 || index === 4 ? 'gallery-card-featured' : ''}`}
              >
                {/* Artwork Preview Frame */}
                <div className="gallery-image-wrapper">
                  <img
                    src={design.image}
                    alt={design.alt}
                    className="gallery-mockup-img"
                    loading="lazy"
                    width="360"
                    height="450"
                  />
                  <div className="gallery-card-overlay">
                    <button
                      type="button"
                      className="btn btn-gold btn-sm gallery-quick-preview-btn"
                      onClick={() => onPreviewInStudio && onPreviewInStudio(design.id)}
                    >
                      <span>Preview in Studio</span>
                      <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                  <span className="gallery-card-badge">{design.badge || design.categoryLabel}</span>
                </div>

                {/* Card Body */}
                <div className="gallery-card-body">
                  <div className="gallery-card-meta">
                    <span className="gallery-category-tag">{design.categoryLabel}</span>
                    {/* Color Palette Chips */}
                    <div className="gallery-palette-chips" title={design.paletteNames ? design.paletteNames.join(', ') : ''}>
                      {design.palette && design.palette.map((color, i) => (
                        <span
                          key={i}
                          className="palette-dot"
                          style={{ backgroundColor: color }}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="gallery-card-title">{design.name}</h3>
                  <p className="gallery-card-tagline">“{design.tagline}”</p>
                  <p className="gallery-card-desc">{design.description}</p>

                  {/* Ceremony suggestions */}
                  {design.ceremonies && (
                    <div className="gallery-ceremonies-tags">
                      <span className="ceremony-tag-label">Suits:</span>
                      {design.ceremonies.map((c, i) => (
                        <span key={i} className="ceremony-pill">{c}</span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="gallery-card-action-row">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm gallery-select-btn"
                      onClick={() => onSelectDesign(design.name)}
                    >
                      <span>Choose This Style</span>
                      <span aria-hidden="true">→</span>
                    </button>

                    {design.demoSlug && (
                      <Link
                        to={`/invite/${design.demoSlug}`}
                        className="btn btn-secondary btn-sm gallery-demo-btn"
                        title={`Experience live demonstration for ${design.name}`}
                      >
                        Live Demo
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State Fallback */
          <div className="gallery-empty-state">
            <p className="empty-title">No designs found in this category.</p>
            <p className="empty-desc">We are continuously expanding our atelier catalog. You can also commission a bespoke design.</p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setActiveCategory('all')}
            >
              View All Collections
            </button>
          </div>
        )}

        {/* Scalability Future Release Note */}
        <div className="gallery-atelier-footer-note">
          <span className="atelier-note-icon">✦</span>
          <span>
            <strong>Bespoke Commissions Welcome:</strong> Need custom South Indian, Punjabi, Marwari, Bengali, or destination wedding motifs? Our studio crafts bespoke palettes, crests, and multi-lingual scripts upon enquiry.
          </span>
        </div>
      </div>
    </section>
  );
}
