import React from 'react';
import { ASSETS } from '../../config/assets';

const MOODS = [
  {
    id: 'heritage-festive',
    title: 'Heritage Splendour',
    tagline: 'Auspicious Saffron, Marigold & Antique Gold',
    description: 'Brimming with celebratory warmth and ornamental mandap motifs, this mood honors sacred rituals — perfect for Haldi, Pheras, Kalyanam, and Anand Karaj ceremonies.',
    colorTheme: 'marigold',
    accentColor: '#D97706',
    bgColor: '#FFFBEB',
    textColor: '#78350F',
    image: ASSETS.mockups.traditionalIndian,
    alt: 'Traditional Indian wedding invitation style preview with celebratory motifs',
    ceremonies: ['Haldi & Mehendi', 'Muhurtham Rituals', 'Anand Karaj', 'Sadhya Feast'],
    designName: 'Traditional Indian',
  },
  {
    id: 'botanical-lawn',
    title: 'Botanical Romance',
    tagline: 'Muted Sage, Olive Fronds & Garden Whispers',
    description: 'An organic, fresh aesthetic reflecting open lawn ceremonies, floral canopies, and serene backwaters. Soft foliage gracefully frames every event detail.',
    colorTheme: 'sage',
    accentColor: '#35463A',
    bgColor: '#F2F7F3',
    textColor: '#1E2E23',
    image: ASSETS.mockups.botanicalSage,
    alt: 'Botanical Sage wedding invitation preview with olive foliage',
    ceremonies: ['Garden Vows', 'Outdoor Reception', 'Sundowner Party'],
    designName: 'Botanical Sage',
  },
  {
    id: 'royal-ivory',
    title: 'Timeless Ivory & Gold',
    tagline: 'Heirloom Linen, Delicate Gold & Grand Traditions',
    description: 'The definitive royal stationery aesthetic. Understated double gold borders, classical serifs, and quiet elegance fit for palace celebrations and sacred heritage halls.',
    colorTheme: 'gold',
    accentColor: '#A7874E',
    bgColor: '#FAF6EE',
    textColor: '#292820',
    image: ASSETS.mockups.timelessIvoryGold,
    alt: 'Timeless Ivory and Gold invitation mockup with refined borders',
    ceremonies: ['Temple Ceremony', 'Grand Ballroom Reception', 'Engagement'],
    designName: 'Timeless Ivory & Gold',
  },
  {
    id: 'contemporary-minimal',
    title: 'Modern Editorial',
    tagline: 'Sapphire Slate, High-Fashion Spacing & Pure Serif',
    description: 'Inspired by luxury editorial publications and architectural minimalism. Balanced whitespace and high-contrast typography make an effortless modern statement.',
    colorTheme: 'sapphire',
    accentColor: '#1E3A5F',
    bgColor: '#F0F4F8',
    textColor: '#0F1E33',
    image: ASSETS.mockups.modernMinimal,
    alt: 'Modern Minimalist digital wedding invitation preview',
    ceremonies: ['Intimate Nuptials', 'Contemporary Reception', 'Cocktail Soirée'],
    designName: 'Modern Minimal',
  },
  {
    id: 'velvet-nocturne',
    title: 'Evening Nocturne',
    tagline: 'Midnight Charcoal, Plum Wine & Luminous Champagne',
    description: 'Dramatic and opulent. Rich dark surfaces illuminated by champagne-gold rules create an unforgettable atmosphere for black-tie sangeets and twilight celebrations.',
    colorTheme: 'charcoal',
    accentColor: '#D4AF37',
    bgColor: '#1E1D19',
    textColor: '#F8F5EF',
    image: ASSETS.mockups.eveningReception,
    alt: 'Evening Reception black-tie wedding invitation preview',
    ceremonies: ['Sangeet Gala', 'Black-Tie Dinner', 'Cocktail & Dance'],
    designName: 'Evening Reception',
  },
];

export default function CelebrationMoods({ onSelectMoodDesign }) {
  return (
    <section id="experience" className="section moods-section" aria-label="Celebration Moods Showcase">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="moods-header-badge">
            <span className="badge-gem">✦</span>
            <span>CELEBRATION PALETTES</span>
            <span className="badge-gem">✦</span>
          </div>
          <h2 className="section-title">Every Wedding Has Its Own Atmosphere</h2>
          <p className="section-subtitle">
            From the auspicious warmth of saffron to the serene grace of garden sage and the nocturnal opulence of black-tie galas — explore the visual palettes of Indian weddings.
          </p>
        </div>

        {/* Moods Staggered Grid */}
        <div className="moods-grid">
          {MOODS.map((mood, idx) => (
            <article
              key={mood.id}
              className={`mood-card mood-theme-${mood.colorTheme}`}
              style={{
                '--mood-accent': mood.accentColor,
                '--mood-bg': mood.bgColor,
                '--mood-text': mood.textColor,
              }}
            >
              <div className="mood-card-inner">
                {/* Visual Image Side */}
                <div className="mood-visual-box">
                  <div className="mood-image-frame">
                    <img
                      src={mood.image}
                      alt={mood.alt}
                      className="mood-mockup-img"
                      loading="lazy"
                      width="340"
                      height="425"
                    />
                  </div>
                  <span className="mood-number-badge">Mood 0{idx + 1}</span>
                </div>

                {/* Editorial Content Side */}
                <div className="mood-content-box">
                  <span className="mood-tagline-chip">{mood.tagline}</span>
                  <h3 className="mood-title">{mood.title}</h3>
                  <p className="mood-desc">{mood.description}</p>

                  <div className="mood-ceremonies-wrap">
                    <span className="mood-ceremonies-label">Celebration Pairing:</span>
                    <div className="mood-ceremonies-list">
                      {mood.ceremonies.map((c, i) => (
                        <span key={i} className="mood-ceremony-pill">{c}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mood-action-row">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm mood-select-btn"
                      onClick={() => onSelectMoodDesign && onSelectMoodDesign(mood.designName)}
                    >
                      <span>Choose “{mood.designName}”</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
