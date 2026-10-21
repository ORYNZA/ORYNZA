import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ASSETS } from '../config/assets';

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <Header />
      <main className="section not-found-main">
        <div className="container text-center not-found-container">
          <img
            src={ASSETS.brand.logo}
            alt="ORYNZA Atelier"
            className="not-found-logo"
            width="145"
            height="48"
          />
          <span className="eyebrow">404 Error</span>
          <h1 className="not-found-heading">A Moment Awaiting Discovery</h1>
          <p className="not-found-copy">
            The page or invitation link you are searching for does not exist or may have been relocated.
          </p>
          <div className="not-found-action-group">
            <Link to="/" className="btn btn-primary">
              Return to ORYNZA Home
            </Link>
            <Link to="/invite/demo-wedding" className="btn btn-secondary">
              View Sample Wedding Suite Demo
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
