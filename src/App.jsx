import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InvitationPage from './pages/InvitationPage';
import NotFoundPage from './pages/NotFoundPage';

function SectionRedirect({ targetSection }) {
  useEffect(() => {
    const base = import.meta.env.BASE_URL || '/';
    const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
    window.location.replace(`${cleanBase}/#${targetSection}`);
  }, [targetSection]);
  return null;
}

export default function App() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    } else if (pathname === '/') {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <Routes>
      {/* Primary Homepage with all 12 sections */}
      <Route path="/" element={<HomePage />} />

      {/* Reusable Couple Wedding Invitation Routes */}
      <Route path="/invite/:slug" element={<InvitationPage />} />
      <Route path="/invite/demo-couple" element={<Navigate to="/invite/demo-wedding" replace />} />

      {/* Section link redirects for standalone URLs */}
      <Route path="/designs" element={<SectionRedirect targetSection="designs" />} />
      <Route path="/services" element={<SectionRedirect targetSection="services" />} />
      <Route path="/how-it-works" element={<SectionRedirect targetSection="how-it-works" />} />
      <Route path="/pricing" element={<SectionRedirect targetSection="pricing" />} />
      <Route path="/faq" element={<SectionRedirect targetSection="faqs" />} />
      <Route path="/faqs" element={<SectionRedirect targetSection="faqs" />} />
      <Route path="/contact" element={<SectionRedirect targetSection="contact" />} />

      {/* 404 Catch-All */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
