import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarPlus, Check, Navigation, Send, Share2, X } from 'lucide-react';
import { useMeta } from '../lib/useMeta';
import { Lotus } from '../components/Invitation';
import { DEMO } from '../config/site';
import { daysUntil, downloadICS, formatDate, formatTime } from '../lib/dates';

const WEDDING = DEMO.events.find((e) => e.id === 'wedding');
const venueLine = `${DEMO.venueName}, ${DEMO.venueCity}`;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(DEMO.mapQuery)}`;

function RsvpDialog({ dialogRef }) {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('1');
  const [msg, setMsg] = useState('');
  const [attend, setAttend] = useState({});
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const nameRef = useRef(null);

  const reset = () => { setName(''); setGuests('1'); setMsg(''); setAttend({}); setError(''); setDone(false); };
  const close = () => dialogRef.current?.close();

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) { setError('Please enter your name.'); nameRef.current?.focus(); return; }
    setError('');
    setDone(true);
  };

  const chosen = DEMO.events.filter((ev) => attend[ev.id]);

  return (
    <dialog ref={dialogRef} className="rsvp" aria-labelledby="rsvp-title" onClose={reset} onClick={(e) => e.target === dialogRef.current && close()}>
      <div className="rsvp-in">
        <button type="button" className="rsvp-x" onClick={close} aria-label="Close RSVP form"><X size={20} aria-hidden="true" /></button>
        <p className="demo-flag">Demo only. Nothing you enter here is saved or sent.</p>
        <h2 id="rsvp-title">{done ? 'This is how your reply would look' : 'RSVP'}</h2>
        {!done ? (
          <form onSubmit={submit} noValidate>
            <div className={`field ${error ? 'has-error' : ''}`}>
              <label htmlFor="rsvp-name">Your name <span className="req">(required)</span></label>
              <input id="rsvp-name" ref={nameRef} value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" aria-invalid={error ? 'true' : undefined} aria-describedby={error ? 'rsvp-name-err' : undefined} />
              {error && <small className="err" id="rsvp-name-err" role="alert">{error}</small>}
            </div>
            <fieldset className="checks">
              <legend>Which functions will you attend?</legend>
              {DEMO.events.map((ev) => (
                <label key={ev.id}>
                  <input type="checkbox" checked={!!attend[ev.id]} onChange={(e) => setAttend({ ...attend, [ev.id]: e.target.checked })} />
                  <span>{ev.title}<small>{formatDate(ev.date)}</small></span>
                </label>
              ))}
            </fieldset>
            <div className="field">
              <label htmlFor="rsvp-guests">Number of guests, including you</label>
              <select id="rsvp-guests" value={guests} onChange={(e) => setGuests(e.target.value)}>
                {[1, 2, 3, 4, 5, 6].map((n) => (<option key={n} value={n}>{n}</option>))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="rsvp-msg">A message for the couple <span className="opt">(optional)</span></label>
              <textarea id="rsvp-msg" rows={3} value={msg} onChange={(e) => setMsg(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-sage"><Send size={16} aria-hidden="true" />Send demo reply</button>
          </form>
        ) : (
          <div className="rsvp-done">
            <p><strong>{name.trim()}</strong>, {guests} {guests === '1' ? 'guest' : 'guests'}</p>
            <ul>
              {chosen.length ? chosen.map((ev) => (<li key={ev.id}><Check size={16} aria-hidden="true" />{ev.title}, {formatDate(ev.date)}</li>)) : <li>Not attending any function</li>}
            </ul>
            {msg.trim() && <blockquote>{msg.trim()}</blockquote>}
            <p className="fine">With a real ORYNZA invitation, replies like this go to the couple's response summary. This demo has recorded nothing.</p>
            <button type="button" className="btn btn-outline" onClick={close}>Close</button>
          </div>
        )}
      </div>
    </dialog>
  );
}

export default function DemoInvite() {
  useMeta('Sample wedding invitation', 'A sample ORYNZA digital wedding invitation with fictional names, dates and venue. Nothing here is real.');
  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const [stage, setStage] = useState(reduced ? 'open' : 'sealed');
  const dialogRef = useRef(null);
  const days = daysUntil(WEDDING.date);

  useEffect(() => {
    document.body.classList.add('is-invite');
    return () => document.body.classList.remove('is-invite');
  }, []);

  const openEnvelope = () => {
    setStage('opening');
    setTimeout(() => setStage('open'), 1400);
  };

  const shareHref = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = `You are invited to the wedding of ${DEMO.a} & ${DEMO.b} (a sample invitation from ORYNZA).${url ? ` View it here: ${url}` : ''}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="demo">
      <div className="demo-bar">
        <span><strong>Sample invitation.</strong> All names, dates and the venue are illustrative.</span>
        <Link to="/">Back to ORYNZA</Link>
      </div>

      {stage !== 'open' ? (
        <section className={`envelope-scene ${stage === 'opening' ? 'is-opening' : ''}`} aria-label="Sealed invitation">
          <div className="envelope" aria-hidden="true">
            <div className="env-card"><span>{DEMO.a} &amp; {DEMO.b}</span></div>
            <div className="env-back" />
            <div className="env-front" />
            <div className="env-flap" />
            <div className="env-seal"><Lotus /></div>
          </div>
          <p className="env-title">You are invited</p>
          <button type="button" className="btn btn-gold" onClick={openEnvelope} disabled={stage === 'opening'}>Open invitation</button>
        </section>
      ) : (
        <article className="invite">
          <header className="invite-hero">
            <Lotus className="invite-orn" />
            <p className="inv-k">Together with their families</p>
            <h1><span>{DEMO.a}</span><i>&amp;</i><span>{DEMO.b}</span></h1>
            <p className="inv-k">invite you to celebrate their wedding</p>
            <p className="invite-date">{formatDate(WEDDING.date)}</p>
            <p className="invite-venue">{DEMO.venueName}<br />{DEMO.venueCity}</p>
            {days > 0 && <p className="countdown"><strong>{days}</strong> {days === 1 ? 'day' : 'days'} to go</p>}
          </header>

          <section className="invite-sec invite-msg">
            <p>We would be honoured to have you with us as we begin this next chapter. Your presence, your blessings and your smiles will make our days complete.</p>
          </section>

          <section className="invite-sec" aria-labelledby="events-h">
            <h2 id="events-h">The celebrations</h2>
            <div className="events">
              {DEMO.events.map((ev) => (
                <article key={ev.id} className="event">
                  <h3>{ev.title}</h3>
                  <p className="event-when">{formatDate(ev.date)}<br />{formatTime(ev.time)} to {formatTime(ev.endTime)}</p>
                  <p>{ev.note}</p>
                  <p className="fine">{ev.dress}</p>
                  <button
                    type="button"
                    className="btn btn-outline btn-block"
                    onClick={() => downloadICS({ title: `Sample: ${ev.title}, ${DEMO.a} & ${DEMO.b}`, date: ev.date, time: ev.time, endTime: ev.endTime, location: venueLine, description: 'Sample event from an ORYNZA demo invitation. Not a real celebration.' })}
                  >
                    <CalendarPlus size={16} aria-hidden="true" />Add to calendar
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="invite-sec venue" aria-labelledby="venue-h">
            <h2 id="venue-h">Venue</h2>
            <p className="venue-name">{DEMO.venueName}</p>
            <p>{DEMO.venueCity}</p>
            <p className="fine">Demo location. This venue is fictional.</p>
            <a className="btn btn-sage" href={mapsUrl} target="_blank" rel="noopener noreferrer"><Navigation size={16} aria-hidden="true" />Get directions (demo location)</a>
          </section>

          <section className="invite-sec" aria-labelledby="rsvp-h">
            <h2 id="rsvp-h">Will you join us?</h2>
            <p>Kindly reply by 20 January 2027 (sample date).</p>
            <div className="invite-actions">
              <button type="button" className="btn btn-gold" onClick={() => dialogRef.current?.showModal()}>RSVP</button>
              <a className="btn btn-outline" href={shareHref()} target="_blank" rel="noopener noreferrer"><Share2 size={16} aria-hidden="true" />Share on WhatsApp</a>
            </div>
          </section>

          <footer className="invite-foot">
            <p>This is a sample invitation made with ORYNZA. Names, dates and venue are fictional.</p>
            <p><Link to="/pricing">See packages</Link> <span aria-hidden="true">·</span> <Link to="/">Return to ORYNZA</Link></p>
          </footer>
        </article>
      )}
      <RsvpDialog dialogRef={dialogRef} />
    </div>
  );
}
