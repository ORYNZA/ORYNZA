import { Check } from 'lucide-react';
import { PACKAGES, packageMessage } from '../config/site';
import { WhatsAppLink } from './ui';

export default function PackageCards() {
  return (
    <div className="packages">
      {PACKAGES.map((p) => (
        <article key={p.id} className={`pkg ${p.featured ? 'pkg-featured' : ''}`} aria-labelledby={`pkg-${p.id}`}>
          {p.label && <span className="pkg-tag">{p.label}</span>}
          <h3 id={`pkg-${p.id}`}>{p.name}</h3>
          <p className="pkg-desc">{p.description}</p>
          <p className="pkg-price"><strong>{p.priceLabel}</strong><span>{p.cadence}</span></p>
          <WhatsAppLink message={packageMessage(p)} className={`btn btn-block ${p.featured ? 'btn-gold' : 'btn-outline'}`}>{p.cta}</WhatsAppLink>
          <ul>
            {p.includes.map((f) => (
              <li key={f}><Check size={16} aria-hidden="true" /><span>{f}</span></li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
