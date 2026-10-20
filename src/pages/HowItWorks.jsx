import { Check } from 'lucide-react';
import { useMeta } from '../lib/useMeta';
import { CtaBand, PageHeader, SectionHead } from '../components/ui';
import { NEEDED_FROM_YOU, STEPS, STEPS_NOTE } from '../config/site';

export default function HowItWorks() {
  useMeta('How it works', 'Four simple steps from your first WhatsApp message to a shareable ORYNZA digital invitation.');
  return (
    <>
      <PageHeader title="How it works" lead="Four steps from your first message to a link your family can open." />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <ol className="timeline">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="step-num" aria-hidden="true">{i + 1}</span>
                <div>
                  <h2>{s.title}</h2>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="note-line">{STEPS_NOTE}</p>
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap split">
          <SectionHead title="What helps us start quickly" lead="Having these ready means fewer back-and-forth messages and a faster first proof." />
          <ul className="checklist">
            {NEEDED_FROM_YOU.map((t) => (
              <li key={t}><Check size={18} aria-hidden="true" /><span>{t}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Ready to begin?" text="Send us a message and we will take it from there." />
    </>
  );
}
