import React, { useState } from 'react';
import { FAQS } from '../../data/faqs';
import { SITE } from '../../config/site';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0); // open first question by default

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="section faq-section" aria-label="Frequently Asked Questions">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="faq-header-badge">
            <span className="badge-gem">✦</span>
            <span>ATELIER KNOWLEDGE &amp; CLARITY</span>
            <span className="badge-gem">✦</span>
          </div>
          <h2 className="section-title">Common Questions &amp; Answers</h2>
          <p className="section-subtitle">
            Clear, honest details about our digital wedding invitations, customization process, revision rounds, and RSVP coordination.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-accordion-wrap">
          <div className="faq-accordion">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;
              const headerId = `faq-header-${index}`;

              return (
                <div
                  key={index}
                  className={`faq-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    id={headerId}
                    className="faq-trigger-btn"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="faq-question-text">{faq.question}</span>
                    <span className="faq-chevron-wrap" aria-hidden="true">
                      <svg
                        className="faq-icon-chevron"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={headerId}
                      className="faq-panel"
                    >
                      <div className="faq-panel-inner">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Direct Support Card */}
          <div className="faq-support-card">
            <h3 className="faq-support-title">Have a specific question about your wedding?</h3>
            <p className="faq-support-desc">
              Whether you need special regional language wording (Hindi, Tamil, Malayalam, Telugu, Gujarati, Bengali, Punjabi), custom event sequences, or unique RSVP options — our designers are happy to help directly.
            </p>
            <a
              href={SITE.whatsappBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold btn-sm"
            >
              Ask Our Team on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
