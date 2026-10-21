import React from 'react';
import { ASSETS } from '../../config/assets';
import { HOW_IT_WORKS_STEPS, HOW_IT_WORKS_NOTE } from '../../data/howItWorks';

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section how-it-works-section" aria-label="The Studio Process">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="process-header-badge">
            <span className="badge-gem">✦</span>
            <span>THE ATELIER PROCESS</span>
            <span className="badge-gem">✦</span>
          </div>
          <h2 className="section-title">From First Vision to Finished Heirloom</h2>
          <p className="section-subtitle">
            A collaborative stationery design workflow with personal care, manual typesetting, and bespoke craftsmanship at every milestone.
          </p>
        </div>

        {/* Process Layout */}
        <div className="how-it-works-layout">
          {/* Steps Sequence Column */}
          <div className="steps-list">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <div key={step.number} className="step-card">
                <div className="step-badge" aria-hidden="true">
                  <span className="step-num-text">{step.number}</span>
                </div>
                <div className="step-content">
                  <span className="step-sub-tag">Stage 0{idx + 1}</span>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Process Visual & Studio Craftsmanship Column */}
          <div className="how-it-works-visual">
            <div className="process-image-frame">
              <img
                src={ASSETS.supporting.processDetails}
                alt="Editorial stationery flat lay showing ivory invitation cards, gold pen, coordinated swatches and botanical details"
                className="process-image"
                loading="lazy"
                width="600"
                height="400"
              />
              <div className="process-image-badge">
                <span>✦ Individually Handcrafted Typography</span>
              </div>
            </div>

            {/* Studio Process Note */}
            <div className="process-note-card">
              <div className="process-note-header">
                <span className="note-gem">✦</span>
                <span className="note-label">Studio Guarantee</span>
              </div>
              <p className="process-note-text">
                {HOW_IT_WORKS_NOTE}
              </p>
              <div className="process-note-checklist">
                <span>✓ Spellings &amp; Muhurtham timings verified with family</span>
                <span>✓ Tested across iOS, Android, tablets &amp; desktop</span>
                <span>✓ Dedicated WhatsApp channel for immediate feedback</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
