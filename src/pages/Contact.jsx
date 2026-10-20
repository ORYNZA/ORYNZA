import { useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useMeta } from '../lib/useMeta';
import { PageHeader, WhatsAppLink } from '../components/ui';
import { FORM_OPTIONS, SITE } from '../config/site';
import { WA_BASE, buildEnquiryMessage, normalisePhone, openWhatsApp, waLink } from '../lib/whatsapp';

const EMPTY = { name: '', phone: '', celebration: '', package: '', date: '', functions: '', style: '', language: '', venue: '', notes: '' };

function validate(f) {
  const e = {};
  if (!f.name.trim()) e.name = 'Please enter your name.';
  if (f.phone.trim() && !normalisePhone(f.phone)) e.phone = 'Enter a 10-digit Indian mobile number, or leave this blank.';
  if (!f.celebration) e.celebration = 'Please choose a celebration type.';
  if (!f.package) e.package = 'Please choose a package, or "Help me choose".';
  return e;
}

export default function Contact() {
  useMeta('Contact & enquiry', 'Start an enquiry for a digital wedding invitation with ORYNZA. Your details open in WhatsApp, ready to send.');
  const [f, setF] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'opened' | 'blocked'
  const [copied, setCopied] = useState(false);
  const [sentMessage, setSentMessage] = useState('');
  const formRef = useRef(null);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus(null);
      formRef.current?.elements[Object.keys(errs)[0]]?.focus();
      return;
    }
    const msg = buildEnquiryMessage(f);
    setSentMessage(msg);
    setCopied(false);
    setStatus(openWhatsApp(msg) ? 'opened' : 'blocked');
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(sentMessage);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const field = (name, label, control, { required = false, hint } = {}) => (
    <div className={`field ${errors[name] ? 'has-error' : ''}`}>
      <label htmlFor={name}>{label}{required ? <span className="req"> (required)</span> : <span className="opt"> (optional)</span>}</label>
      {control}
      {hint && <small id={`${name}-hint`}>{hint}</small>}
      {errors[name] && <small className="err" id={`${name}-err`} role="alert">{errors[name]}</small>}
    </div>
  );
  const aria = (name) => ({ id: name, name, 'aria-invalid': errors[name] ? 'true' : undefined, 'aria-describedby': errors[name] ? `${name}-err` : undefined });
  const select = (name, opts, placeholder) => (
    <select {...aria(name)} value={f[name]} onChange={set(name)}>
      <option value="">{placeholder}</option>
      {opts.map((o) => (<option key={o} value={o}>{o}</option>))}
    </select>
  );

  return (
    <>
      <PageHeader title="Your moment starts here." lead="Tell us a little about your celebration. We will help you find an invitation that feels like you." />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap contact-grid">
          <aside className="contact-card">
            <h2>{SITE.name}</h2>
            <p className="serif-it">{SITE.tagline}</p>
            <dl>
              <dt>WhatsApp</dt>
              <dd><a href={waLink()} target="_blank" rel="noopener noreferrer">{SITE.displayPhone}</a></dd>
              <dt>Availability</dt>
              <dd>India-wide digital service</dd>
            </dl>
            <WhatsAppLink className="btn btn-sage btn-block">Chat on WhatsApp</WhatsAppLink>
            <p className="fine">No payment is taken on this website. We confirm scope, timeline and payment terms with you directly.</p>
          </aside>

          <form className="enquiry" onSubmit={onSubmit} noValidate ref={formRef}>
            <h2>Start an enquiry</h2>
            <div className="grid-2">
              {field('name', 'Your name', <input {...aria('name')} value={f.name} onChange={set('name')} autoComplete="name" />, { required: true })}
              {field('phone', 'Contact number', <input {...aria('phone')} type="tel" inputMode="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" placeholder="98765 43210" />)}
              {field('celebration', 'Celebration type', select('celebration', FORM_OPTIONS.celebration, 'Select…'), { required: true })}
              {field('package', 'Preferred package', select('package', FORM_OPTIONS.package, 'Select…'), { required: true })}
              {field('date', 'Event date', <input {...aria('date')} type="date" value={f.date} onChange={set('date')} />)}
              {field('functions', 'Number of functions', select('functions', FORM_OPTIONS.functions, 'Select…'))}
              {field('style', 'Preferred invitation style', select('style', FORM_OPTIONS.style, 'Select…'))}
              {field('language', 'Preferred language', select('language', FORM_OPTIONS.language, 'Select…'))}
            </div>
            {field('venue', 'Venue or city', <input {...aria('venue')} value={f.venue} onChange={set('venue')} autoComplete="off" />)}
            {field('notes', 'Additional requirements', <textarea {...aria('notes')} rows={4} value={f.notes} onChange={set('notes')} />)}
            <button type="submit" className="btn btn-sage">Continue on WhatsApp</button>
            <p className="fine">This form does not save your details. It opens WhatsApp with a message ready to send; your details reach us only when you press send there.</p>

            <div role="status" aria-live="polite">
              {status === 'opened' && (
                <div className="notice notice-ok">
                  <Check size={18} aria-hidden="true" />
                  <p>WhatsApp should now be open with your details ready to send. Press send there to reach us. If nothing opened, use the buttons below.</p>
                </div>
              )}
              {status === 'blocked' && (
                <div className="notice notice-warn">
                  <p>Your browser blocked the WhatsApp window. Use the link below, or copy your message and paste it into WhatsApp.</p>
                </div>
              )}
            </div>
            {status && (
              <div className="fallback">
                <a className="btn btn-outline" href={waLink(sentMessage)} target="_blank" rel="noopener noreferrer">Open WhatsApp with my details</a>
                <button type="button" className="btn btn-outline" onClick={copy}><Copy size={16} aria-hidden="true" />{copied ? 'Copied' : 'Copy my message'}</button>
              </div>
            )}
          </form>
        </div>
        <div className="wrap">
          <p className="note-line">Prefer to message directly? <a href={WA_BASE} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a> at {SITE.displayPhone}.</p>
        </div>
      </section>
    </>
  );
}
