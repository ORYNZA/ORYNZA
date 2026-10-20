import { useMemo, useState } from 'react';
import { useMeta } from '../lib/useMeta';
import PackageCards from '../components/PackageCards';
import { CtaBand, PageHeader, SectionHead, WhatsAppLink } from '../components/ui';
import { PACKAGES, POLICIES, PRICING_EXTRAS, PRICING_NOTE, packageMessage } from '../config/site';

const FN = [
  { v: '1', l: 'One' },
  { v: '2-3', l: 'Two or three' },
  { v: '4-5', l: 'Four or five' },
  { v: '6+', l: 'More than five' },
];
const RSVP = [
  { v: 'yes', l: 'Yes' },
  { v: 'no', l: 'No' },
  { v: 'unsure', l: 'Not sure yet' },
];

function Finder() {
  const [fn, setFn] = useState('');
  const [rsvp, setRsvp] = useState('');

  const result = useMemo(() => {
    if (!fn || !rsvp) return null;
    if (fn === '6+') return { custom: true, reason: 'More than five functions is a custom package. Tell us what you need and we will agree a scope and price.' };
    if (fn === '1' && rsvp === 'no') return { pkg: PACKAGES[0], reason: 'One function and no RSVP is exactly what Essential covers.' };
    if (fn === '4-5') return { pkg: PACKAGES[2], reason: 'Concierge covers up to five functions, with separate RSVP forms where required.' };
    return { pkg: PACKAGES[1], reason: fn === '1' ? 'RSVP setup starts from Signature, which also covers up to three functions.' : 'Signature covers up to three functions and includes RSVP setup.' };
  }, [fn, rsvp]);

  const group = (legend, name, options, value, set) => (
    <fieldset className="choice">
      <legend>{legend}</legend>
      <div>
        {options.map((o) => (
          <label key={o.v} className={value === o.v ? 'is-on' : ''}>
            <input type="radio" name={name} value={o.v} checked={value === o.v} onChange={() => set(o.v)} />
            <span>{o.l}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );

  return (
    <div className="finder">
      <div className="finder-q">
        {group('How many event functions?', 'fn', FN, fn, setFn)}
        {group('Do you want guests to RSVP online?', 'rsvp', RSVP, rsvp, setRsvp)}
      </div>
      <div className="finder-a" aria-live="polite">
        {!result && <p className="muted">Answer both questions and we will suggest a package.</p>}
        {result && (
          <>
            <p className="finder-pick">{result.custom ? 'A custom package' : `${result.pkg.name}, ${result.pkg.priceLabel}`}</p>
            <p>{result.reason}</p>
            {result.custom ? (
              <WhatsAppLink className="btn btn-sage" message="Hi ORYNZA! I need a custom package for more than five functions. Please share the next steps.">Discuss a custom package</WhatsAppLink>
            ) : (
              <WhatsAppLink className="btn btn-sage" message={packageMessage(result.pkg)}>{result.pkg.cta}</WhatsAppLink>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function Pricing() {
  useMeta('Pricing', 'ORYNZA digital invitation packages: Essential ₹499, Signature ₹999 and Concierge ₹1,999. One-time prices, scope confirmed before work begins.');
  return (
    <>
      <PageHeader title="Pricing" lead="Three clear packages in Indian rupees. Each price is one-time, with no hidden charges." />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <PackageCards />
          <p className="note-line">{PRICING_NOTE}</p>
          <p className="note-line">{PRICING_EXTRAS}</p>
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap split">
          <SectionHead title="Not sure which one?" lead="Two quick questions and we will point you to the package that fits. You can always talk to us first." />
          <Finder />
        </div>
      </section>

      <section className="section" id="policy">
        <div className="wrap split">
          <SectionHead title="Order and payment policy" lead="An initial service policy, written plainly. The owner may review and amend it." />
          <ul className="policy">
            {POLICIES.map((p) => (<li key={p}>{p}</li>))}
          </ul>
        </div>
      </section>

      <CtaBand title="Want something outside these packages?" text="Extra functions, custom animation or a rush date can be quoted after we discuss the scope." message="Hi ORYNZA! I would like a custom quote for my invitation. Please share the next steps." />
    </>
  );
}
