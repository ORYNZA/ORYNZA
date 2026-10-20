import React, { useState } from 'react';
import { FAQS } from '../../data/faqs';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="section faq-section" aria-label="Frequently Asked Questions">
      <div className="container">
        <div className="section-header text-center">
          <span className="eyebrow">Common Questions</span>
          <h2 className="section-title">A Few Things You May Be Wondering</h2>
          <p className="section-subtitle">
            Clear, honest answers about our stationery packages, design workflows, and RSVP capabilities.
          </p>
        </div>

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
                  <span>{faq.question}</span>
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
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headerId}
                    className="faq-panel"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
