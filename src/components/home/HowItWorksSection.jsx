import React from 'react';
import { ASSETS } from '../../config/assets';
import { HOW_IT_WORKS_NOTE, HOW_IT_WORKS_STEPS } from '../../data/howItWorks';

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section how-it-works-section" aria-label="How ORYNZA Works">
      <div className="container">
        <div className="section-header text-center">
          <span className="eyebrow">The Studio Process</span>
          <h2 className="section-title">Simple to Begin. Special to Share.</h2>
          <p className="section-subtitle">
            A collaborative stationery design workflow with personal care at every step.
          </p>
        </div>

        <div className="how-it-works-layout">
          <div className="steps-list">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <div key={step.number} className="step-card">
                <div className="step-badge" aria-hidden="true">
                  {step.number}
                </div>
                <div>
                  <h3 className="step-title">
                    {step.stepLabel} — {step.title}
                  </h3>
                  <p className="step-desc">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

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
            </div>
            <div className="process-note-card">
              <p>
                <strong>Studio Note:</strong> {HOW_IT_WORKS_NOTE}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
