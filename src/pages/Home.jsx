import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarRange, ClipboardCheck, Sparkles } from 'lucide-react';
import { useMeta } from '../lib/useMeta';
import { InvitationCard, Lotus } from '../components/Invitation';
import PackageCards from '../components/PackageCards';
import { CtaBand, SectionHead } from '../components/ui';
import { PRICING_NOTE, STEPS } from '../config/site';

const BENEFITS = [
  { Icon: Sparkles, title: 'Designed around you', text: 'A polished invitation shaped around your names, celebration, and personal style.' },
  { Icon: CalendarRange, title: 'Every event, together', text: 'Present your event schedule, timings, venue details, and directions in one easy place.' },
  { Icon: ClipboardCheck, title: 'Guest responses, organised', text: 'Collect RSVPs and view responses in a clear summary when your selected package includes RSVP setup.' },
];

export default function Home() {
  useMeta(null);
  const [a, setA] = useState('');
  const [b, setB] = useState('');

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">DIGITAL WEDDING INVITATIONS</p>
            <h1>Some moments deserve to be kept.</h1>
            <p className="lead">Beautifully designed digital invitations, thoughtful details, and an easier way to bring everyone together.</p>
            <div className="hero-actions">
              <Link className="btn btn-sage" to="/pricing">Find Your Invitation</Link>
              <Link className="btn btn-outline" to="/designs">Explore Our Designs</Link>
            </div>
            <p className="hero-note">Made with care, for your once-in-a-lifetime moments.</p>
          </div>

          <div className="hero-stage">
            <div className="stack stack-a" aria-hidden="true" />
            <div className="stack stack-b" aria-hidden="true" />
            <InvitationCard theme="ivory" a={a.trim() || 'Aarav'} b={b.trim() || 'Anaya'} date="2027-02-14" venue="The Garden Pavilion" city="Kochi, Kerala" className="hero-card" />
            <p className="stage-label">Design preview. Sample names, date and venue.</p>
            <fieldset className="try">
              <legend>Try your own names</legend>
              <label>
                <span>First name</span>
                <input value={a} onChange={(e) => setA(e.target.value)} maxLength={16} placeholder="Aarav" autoComplete="off" />
              </label>
              <label>
                <span>Second name</span>
                <input value={b} onChange={(e) => setB(e.target.value)} maxLength={16} placeholder="Anaya" autoComplete="off" />
              </label>
            </fieldset>
          </div>
        </div>
      </section>

      <section className="strip" aria-label="Our approach">
        <div className="wrap strip-row">
          <span>Designed with intention</span>
          <Lotus className="strip-orn" />
          <span>Shared with love</span>
          <Lotus className="strip-orn" />
          <span>Made for moments that matter</span>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead title="Less organising. More celebrating." lead="Wedding planning has enough moving parts. ORYNZA helps you share your invitation beautifully and collect guest responses without chasing every detail." />
          <div className="benefits">
            {BENEFITS.map(({ Icon, title, text }) => (
              <article key={title} className="benefit">
                <Icon size={26} strokeWidth={1.4} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap">
          <SectionHead title="Six starting points for your invitation" lead="Every design is a starting point. Your final invitation is customised with your details." />
          <div className="mini-row">
            <InvitationCard theme="ivory" a="Aarav" b="Anaya" date="2027-02-14" venue="The Garden Pavilion" city="Kochi, Kerala" />
            <InvitationCard theme="sage" a="Mira" b="Adrian" date="2027-03-06" venue="Lakeside Courtyard" city="Munnar, Kerala" />
            <InvitationCard theme="blush" a="Isha" b="Rohan" date="2027-04-18" venue="Rosewood Hall" city="Bengaluru" />
          </div>
          <p className="center-action"><Link className="btn btn-outline" to="/designs">See all six designs</Link></p>
        </div>
      </section>

      <section className="section demo-teaser">
        <div className="wrap demo-teaser-grid">
          <div>
            <h2>See what your guests will see.</h2>
            <p>Open our sample invitation: event cards, directions, add-to-calendar, an RSVP form and WhatsApp sharing, all laid out for a phone.</p>
            <p className="fine">The sample uses fictional names, dates and a fictional venue.</p>
            <Link className="btn btn-gold" to="/invite/demo-couple">Open the sample invitation</Link>
          </div>
          <div className="phone" aria-hidden="true">
            <div className="phone-screen">
              <InvitationCard theme="sage" a="Aarav" b="Anaya" date="2027-02-14" venue="Kaveri Lake Pavilion" city="Alappuzha, Kerala" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead center title="Simple packages, clear prices" lead="Pick the one that fits your celebration. We confirm everything with you before work begins." />
          <PackageCards />
          <p className="note-line">{PRICING_NOTE}</p>
          <p className="center-action"><Link className="btn btn-outline" to="/pricing">Compare packages in detail</Link></p>
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap">
          <SectionHead title="From first message to shared link" lead="Four steps. No instant promises: we start once we have your details and the agreed advance." />
          <ol className="steps-row">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="step-num" aria-hidden="true">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title="Your moment starts here." text="Tell us a little about your celebration. We will help you find an invitation that feels like you." />
    </>
  );
}
