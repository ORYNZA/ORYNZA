import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InvitationPage from './pages/InvitationPage';
import NotFoundPage from './pages/NotFoundPage';
import RoyalLakePalaceTemplate from './templates/categories/WED/WED-001/index';

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
        el.scrollIntoView({ behavior: 'auto' });
      }
    } else if (pathname === '/') {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <Routes>
      {/* Primary Homepage with all 12 sections */}
      <Route path="/" element={<HomePage />} />

      {/* ORYNZA Template 1 — Royal Lake Palace */}
      <Route path="/template/1" element={<RoyalLakePalaceTemplate />} />
      <Route path="/templates/1" element={<Navigate to="/template/1" replace />} />
      <Route path="/templates/WED-001" element={<RoyalLakePalaceTemplate />} />
      <Route path="/invite/royal-lake-palace" element={<RoyalLakePalaceTemplate />} />

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
