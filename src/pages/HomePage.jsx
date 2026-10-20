import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import BrandIntro from '../components/home/BrandIntro';
import InvitationGallery from '../components/home/InvitationGallery';
import ServicesSection from '../components/home/ServicesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import PricingSection from '../components/home/PricingSection';
import FeaturedInvitation from '../components/home/FeaturedInvitation';
import WhyOrynzaSection from '../components/home/WhyOrynzaSection';
import FaqSection from '../components/home/FaqSection';
import ContactSection from '../components/home/ContactSection';
import { SITE } from '../config/site';

export default function HomePage() {
  const [selectedPackage, setSelectedPackage] = useState('Wedding Plus');
  const [selectedDesign, setSelectedDesign] = useState('Timeless Ivory & Gold');

  const scrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDesigns = () => {
    const designsEl = document.getElementById('designs');
    if (designsEl) {
      designsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectDesign = (designName) => {
    setSelectedDesign(designName);
    scrollToContact();
  };

  const handleSelectPackage = (packageName) => {
    setSelectedPackage(packageName);
    scrollToContact();
  };

  return (
    <div className="home-page">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* 1. Navigation */}
      <Header />

      <main id="main-content">
        {/* 2. Hero */}
        <Hero
          onExploreDesigns={scrollToDesigns}
          onCreateInvitation={scrollToContact}
        />

        {/* 3. Brand Introduction */}
        <BrandIntro />

        {/* 4. Invitation Design Gallery */}
        <InvitationGallery onSelectDesign={handleSelectDesign} />

        {/* 5. Services */}
        <ServicesSection />

        {/* 6. How It Works */}
        <HowItWorksSection />

        {/* 7. Pricing */}
        <PricingSection onSelectPackage={handleSelectPackage} />

        {/* 8. Featured Invitation Preview */}
        <FeaturedInvitation />

        {/* 9. Why ORYNZA */}
        <WhyOrynzaSection />

        {/* 10. Frequently Asked Questions */}
        <FaqSection />

        {/* 11. Contact and WhatsApp Enquiry */}
        <ContactSection
          selectedPackage={selectedPackage}
          selectedDesign={selectedDesign}
          onPackageChange={setSelectedPackage}
          onDesignChange={setSelectedDesign}
        />
      </main>

      {/* 12. Footer */}
      <Footer />

      {/* Floating WhatsApp Action Pill */}
      <a
        href={SITE.whatsappBaseUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Chat directly with ORYNZA on WhatsApp"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.053-.948-.035-.371-.104-.848-.283-1.467-.549-2.584-1.114-4.275-3.708-4.405-3.88-.13-.172-1.047-1.393-1.047-2.656 0-1.263.661-1.884.896-2.143.235-.259.512-.324.683-.324.17 0 .341.002.49.01.159.008.373-.061.583.444.215.516.732 1.785.796 1.915.064.13.107.281.021.453-.086.172-.128.28-.255.431-.127.151-.27.337-.385.452-.128.13-.262.271-.113.528.15.258.665 1.096 1.424 1.773.978.871 1.802 1.141 2.06 1.27.257.129.407.108.558-.065.15-.172.643-.75.814-1.008.172-.258.343-.215.578-.129.235.086 1.493.703 1.75.832.257.129.429.194.492.301.064.108.064.624-.08 1.029zM12 2C6.477 2 2 6.477 2 12c0 1.891.526 3.662 1.439 5.178L2 22l4.981-1.306C8.423 21.52 10.153 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"></path>
        </svg>
        <span>Chat on WhatsApp</span>
      </a>
    </div>
  );
}
