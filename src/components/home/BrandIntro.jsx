import React from 'react';
import { ASSETS } from '../../config/assets';

export default function BrandIntro() {
  return (
    <section className="section brand-intro-section" aria-label="Brand Manifesto & Philosophy">
      <div className="container">
        <div className="editorial-split">
          {/* Editorial Visual Composition with Floral Detail & Layered Sprig */}
          <div className="editorial-image-box">
            <img
              src={ASSETS.decorative.botanicalOverlay}
              alt=""
              aria-hidden="true"
              className="editorial-corner-decor"
            />
            
            <div className="editorial-image-frame">
              <img
                src={ASSETS.supporting.detailFloral}
                alt="Tactile wedding stationery paper detail with champagne-gold botanical artwork, jasmine floral accents, and subtle deckle texture"
                className="editorial-image"
                loading="lazy"
                width="480"
                height="600"
              />
              <div className="editorial-image-caption">
                <span>Tactile Paper Textures • Delicate Gold Linework</span>
              </div>
            </div>

            <img
              src={ASSETS.decorative.sageBotanical}
              alt=""
              aria-hidden="true"
              className="editorial-sage-sprig"
            />
          </div>

          {/* Editorial Storytelling Content */}
          <div className="editorial-content">
            <div className="editorial-eyebrow">
              <span className="eyebrow-accent">✦</span>
              <span>THE ATELIER MANIFESTO</span>
            </div>

            <h2 className="section-title editorial-main-title">
              Not Just an Invitation.<br />
              <span className="title-serif-italic">The Beginning of a Memory.</span>
            </h2>

            <p className="editorial-lead">
              “In Indian wedding traditions, the invitation is the first sacred threshold of your celebration. It carries the blessing of elders, the warmth of hospitality, and the promise of joyous togetherness.”
            </p>

            <div className="editorial-body-prose">
              <p>
                At ORYNZA, we believe digital invitations should never feel cold, generic, or rushed. We treat every couple’s invitation as a bespoke digital heirloom — individually typeset with graceful serif typography, harmonious celebratory palettes, and intuitive guest-first navigation.
              </p>
              <p>
                From intimate Anand Karaj ceremonies and garden Mehendis to multi-day temple Muhurthams and grand evening receptions, our invitations bring all your celebration details, venue maps, and attendance tracking into one seamless, elegant experience.
              </p>
            </div>

            <div className="editorial-pullquote">
              <span className="pullquote-mark">“</span>
              <p>A wedding invitation should be breathtaking to receive, effortless to understand, and a joy to cherish forever.</p>
            </div>

            {/* Atelier Craft Pillars */}
            <div className="editorial-pillars">
              <div className="pillar-item">
                <span className="pillar-num">01</span>
                <div>
                  <h3 className="pillar-title">Individually Typeset</h3>
                  <p className="pillar-desc">Every line of family wording, ceremony timing, and venue location is hand-balanced by our stationery designers.</p>
                </div>
              </div>
              <div className="pillar-item">
                <span className="pillar-num">02</span>
                <div>
                  <h3 className="pillar-title">Multi-Event Suites</h3>
                  <p className="pillar-desc">Organize Haldi, Sangeet, Muhurtham, and Reception with distinct dress codes and clickable venue directions.</p>
                </div>
              </div>
              <div className="pillar-item">
                <span className="pillar-num">03</span>
                <div>
                  <h3 className="pillar-title">Effortless Sharing</h3>
                  <p className="pillar-desc">Delivered as a dedicated couple web link and formatted WhatsApp message ready to send to family and friends worldwide.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
