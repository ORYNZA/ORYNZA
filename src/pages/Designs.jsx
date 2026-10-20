import { useState } from 'react';
import { useMeta } from '../lib/useMeta';
import { InvitationCard } from '../components/Invitation';
import { CtaBand, PageHeader, SectionHead, WhatsAppLink } from '../components/ui';
import { DESIGNS, designMessage } from '../config/site';
import { formatDate } from '../lib/dates';

const SAMPLES = {
  ivory: { a: 'Aarav', b: 'Anaya', date: '2027-02-14', venue: 'The Garden Pavilion', city: 'Kochi, Kerala' },
  sage: { a: 'Mira', b: 'Adrian', date: '2027-03-06', venue: 'Lakeside Courtyard', city: 'Munnar, Kerala' },
  blush: { a: 'Isha', b: 'Rohan', date: '2027-04-18', venue: 'Rosewood Hall', city: 'Bengaluru' },
  minimal: { a: 'Kabir', b: 'Meera', date: '2027-05-09', venue: 'The Glass House', city: 'Chennai' },
  traditional: { a: 'Devika', b: 'Arjun', date: '2027-06-12', venue: 'Maharani Mandapam', city: 'Coimbatore' },
  evening: { a: 'Nila', b: 'Samir', date: '2027-11-20', venue: 'The Terrace Ballroom', city: 'Hyderabad' },
};

function Studio() {
  const [theme, setTheme] = useState('ivory');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [date, setDate] = useState('2027-02-14');
  const design = DESIGNS.find((d) => d.theme === theme);
  const na = a.trim() || 'Aarav';
  const nb = b.trim() || 'Anaya';
  const typed = a.trim() && b.trim();
  const extra = typed ? ` The names would be ${na} & ${nb}${date ? `, with the celebration on ${formatDate(date, { weekday: false })}` : ''}.` : '';

  return (
    <div className="studio" id="studio">
      <div className="studio-controls">
        <h2>Try your names in any style</h2>
        <p className="muted">Pick a style and type your names to see a live preview. Venue shown is a sample.</p>
        <fieldset className="choice">
          <legend>Style</legend>
          <div>
            {DESIGNS.map((d) => (
              <label key={d.id} className={theme === d.theme ? 'is-on' : ''}>
                <input type="radio" name="studio-style" value={d.theme} checked={theme === d.theme} onChange={() => setTheme(d.theme)} />
                <span>{d.name}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="studio-fields">
          <label><span>First name</span><input value={a} onChange={(e) => setA(e.target.value)} maxLength={16} placeholder="Aarav" autoComplete="off" /></label>
          <label><span>Second name</span><input value={b} onChange={(e) => setB(e.target.value)} maxLength={16} placeholder="Anaya" autoComplete="off" /></label>
          <label><span>Event date</span><input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
        </div>
        <WhatsAppLink message={designMessage(design, extra)}>Request this style</WhatsAppLink>
      </div>
      <div className="studio-preview">
        <InvitationCard theme={theme} a={na} b={nb} date={date || '2027-02-14'} venue="The Garden Pavilion" city="Kochi, Kerala" />
        <p className="stage-label">Live preview. {design.name}.</p>
      </div>
    </div>
  );
}

export default function Designs() {
  useMeta('Invitation designs', 'Browse six ORYNZA digital invitation styles, from Timeless Ivory & Gold to Elegant Evening Reception, and request the one you love.');
  return (
    <>
      <PageHeader title="Invitation designs" lead="Six starting points, from quiet and classic to rich and festive. Try your own names below." />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap"><Studio /></div>
      </section>

      <section className="section section-tint">
        <div className="wrap">
          <SectionHead title="The collection" lead="All couples, dates and venues shown are fictional previews." />
          <div className="gallery">
            {DESIGNS.map((d) => (
              <article key={d.id} className="gal-card">
                <InvitationCard theme={d.theme} {...SAMPLES[d.theme]} />
                <h3>{d.name}</h3>
                <p>{d.blurb}</p>
                <WhatsAppLink className="btn btn-outline btn-block" message={designMessage(d)}>Request This Style</WhatsAppLink>
              </article>
            ))}
          </div>
          <p className="note-line">Every design is a starting point. Your final invitation will be customised with your event details.</p>
        </div>
      </section>

      <CtaBand title="Have your own idea?" text="Share a reference you love and we will shape it into a custom design." message="Hi ORYNZA! I would like a custom invitation design. Please share the next steps." />
    </>
  );
}
