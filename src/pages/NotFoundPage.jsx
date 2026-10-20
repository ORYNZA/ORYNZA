import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ASSETS } from '../config/assets';

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <Header />
      <main className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container text-center" style={{ maxWidth: '580px', marginInline: 'auto' }}>
          <img
            src={ASSETS.brand.logo}
            alt="ORYNZA"
            style={{ height: '46px', margin: '0 auto 1.5rem' }}
          />
          <span className="eyebrow">Page Not Found</span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>404 — Moment Missing</h1>
          <p style={{ color: 'var(--muted-taupe)', marginBottom: '2rem' }}>
            The page or invitation link you are searching for does not exist or may have been relocated.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary">
              Return to ORYNZA Home
            </Link>
            <Link to="/invite/demo-wedding" className="btn btn-secondary">
              View Sample Invitation
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
