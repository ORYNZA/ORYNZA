import React, { useState } from 'react';
import { SITE } from '../../config/site';
import { ASSETS } from '../../config/assets';

const PACKAGE_OPTIONS = [
  'Not sure yet',
  'Essential Invite (₹399)',
  'Wedding Plus (₹899)',
  'Wedding Concierge (₹1,799)',
];

const STYLE_OPTIONS = [
  'Not sure yet',
  'Timeless Ivory & Gold',
  'Botanical Sage',
  'Blush Romance',
  'Modern Minimal',
  'Traditional Indian',
  'Evening Reception',
  'Custom Bespoke Commission',
];

const FUNCTIONS_OPTIONS = [
  'Not sure yet',
  '1 Function (Essential)',
  '2 Functions (e.g. Wedding & Reception)',
  '3 Functions (e.g. Sangeet, Muhurtham & Reception)',
  '4 Functions (e.g. Haldi, Sangeet, Wedding & Reception)',
  '5+ Functions (Complete Wedding Week)',
];

export default function ContactSection({ selectedPackage, selectedDesign, onPackageChange, onDesignChange }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    coupleNames: '',
    weddingDate: '',
    functions: '3 Functions (e.g. Sangeet, Muhurtham & Reception)',
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
      errs.phone = 'Please enter a valid phone number (at least 10 digits, e.g. 9876543210).';
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
      `✦ *ORYNZA WEDDING INVITATION ENQUIRY* ✦`,
      `---------------------------------`,
      `*Full Name:* ${formData.name.trim()}`,
      `*Contact Phone:* +91 ${formData.phone.trim()}`,
      formData.coupleNames.trim() ? `*Couple Names:* ${formData.coupleNames.trim()}` : null,
      formData.weddingDate ? `*Wedding Date:* ${formData.weddingDate}` : null,
      `*Chosen Package:* ${selectedPackage || 'Wedding Plus (₹899)'}`,
      `*Chosen Style:* ${selectedDesign || 'Timeless Ivory & Gold'}`,
      formData.functions ? `*Functions:* ${formData.functions}` : null,
      formData.notes.trim() ? `*Special Notes / Requirements:* ${formData.notes.trim()}` : null,
      `---------------------------------`,
      `Hello ORYNZA Atelier Team! Please review my celebration details and let me know the next steps for creating our digital invitation suite.`,
    ].filter(Boolean);

    const fullMessage = lines.join('\n');
    const encodedUrl = `${SITE.whatsappBaseUrl}?text=${encodeURIComponent(fullMessage)}`;

    setSubmitted(true);
    window.open(encodedUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="section contact-section" aria-label="Atelier Consultation and WhatsApp Enquiry">
      {/* Background Decorative Layer */}
      <div
        className="contact-bg-layer"
        style={{ backgroundImage: `url(${ASSETS.backgrounds.contact})` }}
        aria-hidden="true"
      />

      <div className="container contact-container-inner">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="contact-header-badge">
            <span className="badge-gem">✦</span>
            <span>DIRECT STUDIO CONSULTATION</span>
            <span className="badge-gem">✦</span>
          </div>
          <h2 className="section-title">Let’s Craft Your Digital Heirloom</h2>
          <p className="section-subtitle">
            Share a few details about your celebration. We will review your dates, preferred design, and package scope, then connect directly with you on WhatsApp to begin typesetting.
          </p>
        </div>

        {/* Selected Preferences Summary Pill Bar */}
        {(selectedPackage || selectedDesign) && (
          <div className="contact-selection-summary">
            <span className="summary-label">Your Current Selection:</span>
            {selectedPackage && (
              <span className="summary-pill summary-pkg">
                📦 Package: <strong>{selectedPackage}</strong>
              </span>
            )}
            {selectedDesign && (
              <span className="summary-pill summary-style">
                🎨 Style: <strong>{selectedDesign}</strong>
              </span>
            )}
          </div>
        )}

        {/* Consultation Form Card */}
        <div className="contact-card">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {/* Row 1: Name and Phone */}
            <div className="form-group">
              <label htmlFor="contact-name" className="form-label">
                Your Full Name <span className="required-star">*</span>
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
                WhatsApp Phone Number <span className="required-star">*</span>
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

            {/* Row 2: Couple Names & Wedding Date */}
            <div className="form-group">
              <label htmlFor="contact-couple" className="form-label">
                Couple Names <span className="optional-label">(if decided)</span>
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
                Wedding Date <span className="optional-label">(or approximate month)</span>
              </label>
              <input
                id="contact-date"
                type="date"
                className="form-input"
                value={formData.weddingDate}
                onChange={(e) => handleChange('weddingDate', e.target.value)}
              />
            </div>

            {/* Row 3: Package & Style Selectors */}
            <div className="form-group">
              <label htmlFor="contact-package" className="form-label">
                Preferred Suite Package
              </label>
              <select
                id="contact-package"
                className="form-select"
                value={selectedPackage ? (PACKAGE_OPTIONS.find(p => p.includes(selectedPackage)) || selectedPackage) : 'Wedding Plus (₹899)'}
                onChange={(e) => onPackageChange(e.target.value.split(' (')[0])}
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
                Preferred Invitation Collection
              </label>
              <select
                id="contact-style"
                className="form-select"
                value={selectedDesign || 'Timeless Ivory & Gold'}
                onChange={(e) => onDesignChange(e.target.value)}
              >
                {STYLE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 4: Functions & Timeline Scale */}
            <div className="form-group form-col-span-2">
              <label htmlFor="contact-functions" className="form-label">
                Estimated Number of Functions
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

            {/* Row 5: Additional Notes */}
            <div className="form-group form-col-span-2">
              <label htmlFor="contact-notes" className="form-label">
                Additional Requirements or Personal Touches
              </label>
              <textarea
                id="contact-notes"
                className="form-textarea"
                rows="3"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Mention special family wording requirements, language scripts (e.g. Malayalam, Hindi, Tamil), venue locations, or specific aesthetic requests..."
              />
            </div>

            {/* Submit Action Box */}
            <div className="whatsapp-submit-box form-col-span-2">
              <button
                type="submit"
                className="btn btn-primary btn-block btn-wa-submit"
              >
                <span className="wa-btn-icon" aria-hidden="true">💬</span>
                <span>Send Enquiry Directly to Our Team on WhatsApp</span>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </button>

              <p className="whatsapp-note">
                <strong>How it works:</strong> Tapping this button prepares a formatted message with your celebration details in WhatsApp so you can review and send directly to our stationery designer. No account creation or server storage is required.
              </p>

              {submitted && (
                <div className="whatsapp-success-banner" role="status">
                  ✓ WhatsApp chat launched with your details! If your browser blocked the window, <a href={SITE.whatsappBaseUrl} target="_blank" rel="noopener noreferrer">click here to open WhatsApp directly</a>.
                </div>
              )}

              <div className="direct-wa-divider">
                <span>or speak with us directly</span>
              </div>

              <a
                href={SITE.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-block"
              >
                <span>Chat Directly with ORYNZA: {SITE.displayPhone}</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
