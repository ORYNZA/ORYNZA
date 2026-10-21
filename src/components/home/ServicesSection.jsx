import React from 'react';
import { SERVICES } from '../../data/services';
import { ASSETS } from '../../config/assets';

export default function ServicesSection() {
  return (
    <section id="services" className="section services-section" aria-label="Studio Capabilities">
      {/* Background Subtle Paper */}
      <div
        className="services-bg-layer"
        style={{ backgroundImage: `url(${ASSETS.backgrounds.site})` }}
        aria-hidden="true"
      />

      <div className="container services-container-inner">
        <div className="section-header text-center">
          <div className="services-header-badge">
            <span className="badge-gem">✦</span>
            <span>ATELIER CAPABILITIES</span>
            <span className="badge-gem">✦</span>
          </div>
          <h2 className="section-title">Every Detail, Handcrafted for Your Day</h2>
          <p className="section-subtitle">
            From single-event digital announcements to multi-ceremony wedding suites with venue GPS directions and attendance tracking.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((srv) => (
            <article key={srv.id} className="service-card">
              <div className="service-card-header">
                <span className="service-card-number">{srv.stepNumber}</span>
                <span className="service-card-gem">✦</span>
              </div>
              <h3 className="service-card-title">{srv.title}</h3>
              <p className="service-card-desc">{srv.description}</p>
              
              <div className="service-divider" aria-hidden="true"></div>

              <ul className="service-feature-list">
                {srv.features.map((feature, idx) => (
                  <li key={idx} className="service-feature-item">
                    <span className="service-feature-bullet" aria-hidden="true">✦</span>
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
