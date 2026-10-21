import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import BrandIntro from '../components/home/BrandIntro';
import InvitationGallery from '../components/home/InvitationGallery';
import InvitationPreviewStudio from '../components/home/InvitationPreviewStudio';
import CelebrationMoods from '../components/home/CelebrationMoods';
import InteractiveWeddingJourney from '../components/home/InteractiveWeddingJourney';
import HowItWorksSection from '../components/home/HowItWorksSection';
import PricingSection from '../components/home/PricingSection';
import ServicesSection from '../components/home/ServicesSection';
import WhyOrynzaSection from '../components/home/WhyOrynzaSection';
import StyleQuiz from '../components/home/StyleQuiz';
import FaqSection from '../components/home/FaqSection';
import ContactSection from '../components/home/ContactSection';
import { SITE } from '../config/site';

export default function HomePage() {
  const [selectedPackage, setSelectedPackage] = useState('Wedding Plus');
  const [selectedDesign, setSelectedDesign] = useState('Timeless Ivory & Gold');
  const [studioActiveId, setStudioActiveId] = useState('timeless-ivory-gold');

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

  const scrollToPreviewStudio = (designId) => {
    if (designId) setStudioActiveId(designId);
    const studioEl = document.getElementById('preview-studio');
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: 'smooth' });
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

  const handleQuizRecommendation = (designName, packageName) => {
    setSelectedDesign(designName);
    setSelectedPackage(packageName);
    scrollToContact();
  };

  return (
    <div className="home-page">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* 1. Distinctive Editorial Navigation */}
      <Header />

      <main id="main-content">
        {/* 2. Immersive, Colourful Asymmetrical Hero */}
        <Hero
          onExploreDesigns={scrollToDesigns}
          onCreateInvitation={scrollToContact}
        />

        {/* 3. Short Emotional Brand Statement & Manifesto */}
        <BrandIntro />

        {/* 4. The Wedding Worlds Collection Explorer */}
        <InvitationGallery
          onSelectDesign={handleSelectDesign}
          onPreviewInStudio={scrollToPreviewStudio}
        />

        {/* 5. Immersive Invitation Preview Studio */}
        <InvitationPreviewStudio
          activeDesignId={studioActiveId}
          onSelectDesign={handleSelectDesign}
        />

        {/* 6. Colour-Rich Experience Showcase (5 Celebration Moods) */}
        <CelebrationMoods onSelectMoodDesign={handleSelectDesign} />

        {/* 7. Interactive Wedding Guest Experience Suite */}
        <InteractiveWeddingJourney />

        {/* 8. The Studio Journey — How It Works */}
        <HowItWorksSection />

        {/* 9. Pricing as a Premium Editorial Feature */}
        <PricingSection onSelectPackage={handleSelectPackage} />

        {/* 10. Studio Capabilities & Standards */}
        <ServicesSection />
        <WhyOrynzaSection />

        {/* 11. Interactive Style Discovery Quiz */}
        <StyleQuiz onSelectRecommendation={handleQuizRecommendation} />

        {/* 12. Common Questions Accordion */}
        <FaqSection />

        {/* 13. Consultation & WhatsApp Enquiry Form */}
        <ContactSection
          selectedPackage={selectedPackage}
          selectedDesign={selectedDesign}
          onPackageChange={setSelectedPackage}
          onDesignChange={setSelectedDesign}
        />
      </main>

      {/* 14. Atelier Closing Statement & Footer */}
      <Footer />

      {/* Floating WhatsApp Action Pill with Live Availability Indicator */}
      <a
        href={SITE.whatsappBaseUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Chat directly with ORYNZA stationery designer on WhatsApp"
      >
        <span className="wa-icon-pulse" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.053-.948-.035-.371-.104-.848-.283-1.467-.549-2.584-1.114-4.275-3.708-4.405-3.88-.13-.172-1.047-1.393-1.047-2.656 0-1.263.661-1.884.896-2.143.235-.259.512-.324.683-.324.17 0 .341.002.49.01.159.008.373-.061.583.444.215.516.732 1.785.796 1.915.064.13.107.281.021.453-.086.172-.128.28-.255.431-.127.151-.27.337-.385.452-.128.13-.262.271-.113.528.15.258.665 1.096 1.424 1.773.978.871 1.802 1.141 2.06 1.27.257.129.407.108.558-.065.15-.172.643-.75.814-1.008.172-.258.343-.215.578-.129.235.086 1.493.703 1.75.832.257.129.429.194.492.301.064.108.064.624-.08 1.029zM12 2C6.477 2 2 6.477 2 12c0 1.891.526 3.662 1.439 5.178L2 22l4.981-1.306C8.423 21.52 10.153 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"></path>
          </svg>
        </span>
        <span className="wa-text-label">Studio WhatsApp</span>
      </a>
    </div>
  );
}
