import React from 'react';
import { ASSETS } from '../../config/assets';

export default function BrandIntro() {
  return (
    <section className="section brand-intro-section" aria-label="Brand Introduction">
      <div className="container">
        <div className="editorial-split">
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
                alt="Tactile wedding stationery paper detail with champagne-gold botanical artwork and jasmine floral accents"
                className="editorial-image"
                loading="lazy"
                width="480"
                height="600"
              />
            </div>
          </div>

          <div className="editorial-content">
            <span className="eyebrow">Our Philosophy</span>
            <h2 className="section-title">More Than an Invitation</h2>
            <p className="editorial-lead">
              “Your wedding invitation is the beginning of your celebration.”
            </p>
            <p className="editorial-copy">
              ORYNZA brings together thoughtful design, essential event information and a more convenient way to share your special moments with the people who matter most.
            </p>
            <p className="editorial-copy">
              Rooted in Indian hospitality traditions yet designed for modern mobile convenience, our digital stationery ensures every guest feels personally welcomed from the very first message.
            </p>
            <div className="editorial-quote">
              “A wedding invitation should be beautiful to receive, simple to understand and effortless to share.”
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
