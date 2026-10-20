import React, { useState } from 'react';
import { SITE } from '../../config/site';

const PACKAGE_OPTIONS = [
  'Not sure yet',
  'Essential Invite',
  'Wedding Plus',
  'Wedding Concierge',
];

const STYLE_OPTIONS = [
  'Not sure yet',
  'Timeless Ivory & Gold',
  'Botanical Sage',
  'Blush Romance',
  'Modern Minimal',
  'Traditional Indian',
  'Evening Reception',
];

const FUNCTIONS_OPTIONS = [
  'Not sure yet',
  '1 Function',
  '2 Functions',
  '3 Functions',
  '4 Functions',
  '5+ Functions',
];

export default function ContactSection({ selectedPackage, selectedDesign, onPackageChange, onDesignChange }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    coupleNames: '',
    weddingDate: '',
    functions: 'Not sure yet',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    }

    const cleanPhone = formData.phone.replace(/[\s\-\(\)\+]/g, '');
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide a contact phone number.';
    } else if (cleanPhone.length < 10 || cleanPhone.length > 13 || !/^\d+$/.test(cleanPhone)) {
      errs.phone = 'Please enter a valid 10-digit phone number (e.g., 9876543210).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Assemble structured WhatsApp enquiry message
    const lines = [
      `*ORYNZA Wedding Invitation Enquiry*`,
      `---------------------------------`,
      `*Name:* ${formData.name.trim()}`,
      `*Contact:* ${formData.phone.trim()}`,
      formData.coupleNames.trim() ? `*Couple:* ${formData.coupleNames.trim()}` : null,
      formData.weddingDate ? `*Wedding Date:* ${formData.weddingDate}` : null,
      `*Package:* ${selectedPackage || 'Not sure yet'}`,
      `*Invitation Style:* ${selectedDesign || 'Not sure yet'}`,
      formData.functions !== 'Not sure yet' ? `*Number of Functions:* ${formData.functions}` : null,
      formData.notes.trim() ? `*Additional Notes:* ${formData.notes.trim()}` : null,
      `---------------------------------`,
      `Hi ORYNZA team! Please review my details and share the next steps.`,
    ].filter(Boolean);

    const fullMessage = lines.join('\n');
    const encodedUrl = `${SITE.whatsappBaseUrl}?text=${encodeURIComponent(fullMessage)}`;

    setSubmitted(true);
    window.open(encodedUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="section contact-section" aria-label="Contact and Enquiry">
      <div className="container contact-container">
        <div className="section-header text-center">
          <span className="eyebrow">Studio Consultation</span>
          <h2 className="section-title">Let's Create Something Meaningful</h2>
          <p className="section-subtitle">
            Tell us a little about your celebration, and we'll help you choose an invitation experience that suits your needs.
          </p>
        </div>

        <div className="contact-card">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="contact-name" className="form-label">
                Your Name <span className="required-star">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                className={`form-input ${errors.name ? 'has-error' : ''}`}
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g. Priya Nair"
                aria-required="true"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <span id="name-error" className="form-error-msg" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="contact-phone" className="form-label">
                WhatsApp / Contact Number <span className="required-star">*</span>
              </label>
              <input
                id="contact-phone"
                type="tel"
                className={`form-input ${errors.phone ? 'has-error' : ''}`}
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="e.g. 9876543210"
                aria-required="true"
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <span id="phone-error" className="form-error-msg" role="alert">
                  {errors.phone}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="contact-couple" className="form-label">
                Couple's Names <span style={{ color: 'var(--muted-taupe)', fontWeight: 400 }}>(if known)</span>
              </label>
              <input
                id="contact-couple"
                type="text"
                className="form-input"
                value={formData.coupleNames}
                onChange={(e) => handleChange('coupleNames', e.target.value)}
                placeholder="e.g. Aarav & Meera"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-date" className="form-label">
                Wedding Date <span style={{ color: 'var(--muted-taupe)', fontWeight: 400 }}>(if known)</span>
              </label>
              <input
                id="contact-date"
                type="date"
                className="form-input"
                value={formData.weddingDate}
                onChange={(e) => handleChange('weddingDate', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-package" className="form-label">
                Preferred Package
              </label>
              <select
                id="contact-package"
                className="form-select"
                value={selectedPackage || 'Not sure yet'}
                onChange={(e) => onPackageChange(e.target.value)}
              >
                {PACKAGE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="contact-style" className="form-label">
                Preferred Invitation Style
              </label>
              <select
                id="contact-style"
                className="form-select"
                value={selectedDesign || 'Not sure yet'}
                onChange={(e) => onDesignChange(e.target.value)}
              >
                {STYLE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group form-col-span-2">
              <label htmlFor="contact-functions" className="form-label">
                Number of Functions
              </label>
              <select
                id="contact-functions"
                className="form-select"
                value={formData.functions}
                onChange={(e) => handleChange('functions', e.target.value)}
              >
                {FUNCTIONS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group form-col-span-2">
              <label htmlFor="contact-notes" className="form-label">
                Additional Details or Questions
              </label>
              <textarea
                id="contact-notes"
                className="form-textarea"
                rows="3"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Tell us about your events, special language requirements, or any particular design preferences..."
              />
            </div>

            <div className="whatsapp-submit-box form-col-span-2">
              <button
                type="submit"
                className="btn btn-primary btn-block"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <span>Continue on WhatsApp with My Enquiry</span>
              </button>

              <p className="whatsapp-note">
                Submitting opens WhatsApp with your pre-filled celebration details so you can review and send directly to our team. No account creation or server storage is required.
              </p>

              {submitted && (
                <div style={{ background: '#EAF7ED', border: '1px solid #B8E4C1', padding: '0.85rem', borderRadius: '6px', color: '#1B5E20', fontSize: '0.85rem', textAlign: 'center' }}>
                  ✓ WhatsApp chat opened! If the window did not open automatically, <a href={`${SITE.whatsappBaseUrl}`} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, color: '#1B5E20', textDecoration: 'underline' }}>click here to start chat</a>.
                </div>
              )}

              <div className="direct-wa-divider">or quick question</div>

              <a
                href={SITE.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-block"
              >
                <span>Start a Blank WhatsApp Conversation</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
