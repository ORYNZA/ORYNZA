import React from 'react';
import { SERVICES } from '../../data/services';

export default function ServicesSection() {
  return (
    <section id="services" className="section services-section" aria-label="Our Studio Services">
      <div className="container">
        <div className="section-header text-center">
          <span className="eyebrow">Studio Capabilities</span>
          <h2 className="section-title">Every Detail, Thoughtfully Designed</h2>
          <p className="section-subtitle">
            From single-event digital stationery to coordinated multi-function wedding pages with RSVP response handling.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((srv) => (
            <article key={srv.id} className="service-card">
              <span className="service-card-number">{srv.stepNumber}</span>
              <h3 className="service-card-title">{srv.title}</h3>
              <p className="service-card-desc">{srv.description}</p>
              <ul className="service-feature-list">
                {srv.features.map((feature, idx) => (
                  <li key={idx} className="service-feature-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
