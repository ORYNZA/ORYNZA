import React, { useState } from 'react';
import { INVITATION_DESIGNS } from '../../data/designs';

const CATEGORIES = [
  { id: 'all', label: 'All Collections' },
  { id: 'classic', label: 'Classic & Timeless' },
  { id: 'botanical', label: 'Botanical & Foliage' },
  { id: 'romantic', label: 'Romantic & Floral' },
  { id: 'minimal', label: 'Modern & Minimal' },
  { id: 'traditional', label: 'Traditional & Festive' },
  { id: 'evening', label: 'Formal & Evening' },
];

export default function InvitationGallery({ onSelectDesign }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredDesigns = activeCategory === 'all'
    ? INVITATION_DESIGNS
    : INVITATION_DESIGNS.filter((d) => d.category === activeCategory);

  return (
    <section id="designs" className="section gallery-section" aria-label="Invitation Design Gallery">
      <div className="container">
        <div className="section-header text-center">
          <span className="eyebrow">Curated Collections</span>
          <h2 className="section-title">Find Your Invitation Style</h2>
          <p className="section-subtitle">
            Explore invitation designs thoughtfully created for different celebrations, preferences and personalities.
          </p>
        </div>

        {/* Category Filters */}
        <div className="gallery-filter-bar" role="tablist" aria-label="Filter invitation styles">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`filter-tab-btn ${activeCategory === cat.id ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredDesigns.map((design) => (
            <article key={design.id} className="gallery-card">
              <div className="gallery-image-wrapper">
                <img
                  src={design.image}
                  alt={design.alt}
                  className="gallery-mockup-img"
                  loading="lazy"
                  width="360"
                  height="450"
                />
                <span className="gallery-card-badge">{design.categoryLabel}</span>
              </div>
              <div className="gallery-card-body">
                <h3 className="gallery-card-title">{design.name}</h3>
                <p className="gallery-card-desc">{design.description}</p>
                <div className="gallery-card-action">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm btn-block"
                    onClick={() => onSelectDesign(design.name)}
                  >
                    Choose This Style
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
