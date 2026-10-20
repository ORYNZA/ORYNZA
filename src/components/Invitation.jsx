import { formatDate } from '../lib/dates';

/** Original line-art lotus used on invitation previews (not the ORYNZA logo). */
export function Lotus({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 120 60" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
        <path d="M60 56C48 40 48 20 60 4c12 16 12 36 0 52Z" />
        <path d="M60 56C40 48 26 34 24 16c18 4 30 18 36 40Z" />
        <path d="M60 56c20-8 34-22 36-40-18 4-30 18-36 40Z" />
        <path d="M60 56C34 54 14 46 4 34c22-2 42 6 56 22Z" />
        <path d="M60 56c26-2 46-10 56-22-22-2-42 6-56 22Z" />
      </g>
    </svg>
  );
}

function Sprig({ className = '' }) {
  const leaf = 'M0 0C8-4 16-12 18-24 10-20 2-10 0 0Z';
  return (
    <svg className={className} viewBox="0 0 100 140" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M8 138C28 104 44 66 84 8" />
        <g transform="translate(20 116) rotate(8)"><path d={leaf} /></g>
        <g transform="translate(28 100) scale(-1 1) rotate(8)"><path d={leaf} /></g>
        <g transform="translate(38 82) rotate(14)"><path d={leaf} /></g>
        <g transform="translate(47 66) scale(-1 1) rotate(14)"><path d={leaf} /></g>
        <g transform="translate(59 46) rotate(20)"><path d={leaf} /></g>
        <g transform="translate(68 30) scale(-1 1) rotate(22)"><path d={leaf} /></g>
      </g>
    </svg>
  );
}

export const THEMES = {
  ivory: { label: 'Timeless Ivory & Gold', kicker: 'Together with their families', after: 'joyfully invite you to celebrate their wedding' },
  sage: { label: 'Botanical Sage', kicker: 'With joy in our hearts', after: 'invite you to join them as they begin their forever' },
  blush: { label: 'Blush Romance', kicker: 'Please join us for the wedding of', after: '' },
  minimal: { label: 'Modern Minimal', kicker: 'The wedding of', after: '' },
  traditional: { label: 'Traditional Indian Celebration', kicker: 'Shubh Vivah', after: 'with the blessings of their elders, invite you to their wedding' },
  evening: { label: 'Elegant Evening Reception', kicker: 'An evening reception for', after: 'Dinner, music and dancing' },
};

/** A CSS-drawn invitation preview. Scales with its container (container query units). */
export function InvitationCard({ theme = 'ivory', a, b, date, venue, city, className = '' }) {
  const t = THEMES[theme];
  const label = `Sample ${t.label} invitation preview for ${a} and ${b}, ${formatDate(date)}, ${venue}, ${city}`;
  return (
    <div className={`inv inv-${theme} ${className}`} role="img" aria-label={label}>
      {theme === 'sage' && (<><Sprig className="inv-sprig inv-sprig-a" /><Sprig className="inv-sprig inv-sprig-b" /></>)}
      <div className="inv-in" aria-hidden="true">
        {(theme === 'ivory' || theme === 'blush' || theme === 'traditional') && <Lotus className="inv-orn" />}
        {theme === 'evening' && <span className="inv-rule" />}
        <p className="inv-kicker">{t.kicker}</p>
        <p className="inv-names"><span>{a}</span><i>&amp;</i><span>{b}</span></p>
        {t.after && <p className="inv-after">{t.after}</p>}
        <p className="inv-date">{formatDate(date)}</p>
        <p className="inv-venue"><span>{venue}</span><span>{city}</span></p>
      </div>
    </div>
  );
}
