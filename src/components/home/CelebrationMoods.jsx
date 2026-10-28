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
    id: 'sunset-shores',
    title: 'Sunset Shores',
    tagline: 'Terracotta Sunset, Ocean Teal & Warm Sand',
    description: 'A breezy, sun-kissed coastal aesthetic celebrating sandy shores, tropical palms, and sunset vows overlooking the Arabian Sea in Goa.',
    colorTheme: 'terracotta',
    accentColor: '#E79B7B',
    bgColor: '#FDF6F0',
    textColor: '#1C2A28',
    image: ASSETS.mockups.sunsetShores,
    alt: 'Sunset Shores coastal wedding invitation preview with Goa sunset tones',
    ceremonies: ['Sundowner Mehendi', 'Beachside Sangeet', 'Sunset Pheras', 'Ocean Pavilion Dinner'],
    designName: 'Sunset Shores',
  },
  {
    id: 'enchanted-gardens',
    title: 'Enchanted Gardens',
    tagline: 'Sage Green, Soft Blush & Warm Bronze',
    description: 'An intimate botanical garden aesthetic beneath Bengaluru’s tamarind canopy, celebrating living floral mandaps, fresh greens, and delicate rose accents.',
    colorTheme: 'botanical',
    accentColor: '#587F5B',
    bgColor: '#F6EFE7',
    textColor: '#2E3F2F',
    image: ASSETS.mockups.enchantedGardens,
    alt: 'Enchanted Gardens botanical wedding invitation preview with lush foliage and bronze detailing',
    ceremonies: ['Garden Mehendi', 'Sangeet Under Stars', 'Canopy Pheras', 'Starlit Reception'],
    designName: 'Enchanted Gardens',
  },
  {
    id: 'royal-lake-palace',
    title: 'Royal Lake Palace',
    tagline: 'Udaipur Luxury Wedding & Heritage Splendour',
    description: 'Inspired by Udaipur’s heritage palaces, lakeside scenery, champagne-gold detailing, blush florals, and refined ceremonial styling for luxury celebrations.',
    colorTheme: 'gold',
    accentColor: '#8F2637',
    bgColor: '#FAF6EE',
    textColor: '#292820',
    image: ASSETS.mockups.royalLakePalace,
    alt: 'Royal Lake Palace wedding invitation preview with Udaipur palace architecture and refined borders',
    ceremonies: ['Wedding Ceremony', 'Destination Wedding', 'Grand Reception'],
    designName: 'Royal Lake Palace',
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
            From the auspicious warmth of saffron to the serene grace of garden sage, poetic blush pastels, and the nocturnal opulence of black-tie galas — explore the visual palettes of Indian weddings.
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
