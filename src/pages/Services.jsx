import { useMeta } from '../lib/useMeta';
import { CtaBand, ICONS, PageHeader, SectionHead } from '../components/ui';
import { SCOPE_NOTE, SERVICES } from '../config/site';

const SAMPLE = [
  { name: 'Engagement', yes: 48, no: 6, wait: 12 },
  { name: 'Wedding ceremony', yes: 132, no: 9, wait: 21 },
  { name: 'Reception', yes: 96, no: 14, wait: 30 },
];

function ResponseSummary() {
  return (
    <figure className="summary">
      <figcaption>
        <strong>Sample guest response summary</strong>
        <span>Illustrative numbers only. These are not real guests or a real wedding.</span>
      </figcaption>
      <table>
        <thead>
          <tr><th scope="col">Function</th><th scope="col">Attending</th><th scope="col">Not attending</th><th scope="col">Awaiting reply</th><th scope="col"><span className="sr">Proportion</span></th></tr>
        </thead>
        <tbody>
          {SAMPLE.map((r) => {
            const total = r.yes + r.no + r.wait;
            return (
              <tr key={r.name}>
                <th scope="row">{r.name}</th>
                <td>{r.yes}</td>
                <td>{r.no}</td>
                <td>{r.wait}</td>
                <td aria-hidden="true">
                  <span className="bar">
                    <i className="bar-yes" style={{ width: `${(r.yes / total) * 100}%` }} />
                    <i className="bar-no" style={{ width: `${(r.no / total) * 100}%` }} />
                    <i className="bar-wait" style={{ width: `${(r.wait / total) * 100}%` }} />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </figure>
  );
}

export default function Services() {
  useMeta('Services', 'Digital wedding and engagement invitations, multi-event pages, RSVP setup, guest response summaries and WhatsApp-ready sharing from ORYNZA.');
  return (
    <>
      <PageHeader title="Services" lead="Everything you need to invite your guests beautifully and hear back from them, without the chasing." />
      <section className="section">
        <div className="wrap">
          <ul className="services">
            {SERVICES.map((s) => {
              const Icon = ICONS[s.icon];
              return (
                <li key={s.title}>
                  <Icon size={26} strokeWidth={1.4} aria-hidden="true" />
                  <div>
                    <h2>{s.title}</h2>
                    <p>{s.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="scope-note">{SCOPE_NOTE}</p>
        </div>
      </section>
      <section className="section section-tint">
        <div className="wrap split">
          <SectionHead title="Responses in one clear view" lead="With RSVP setup, you see who is coming to which function and how many guests to plan for. Here is how a summary can look." />
          <ResponseSummary />
        </div>
      </section>
      <CtaBand title="Not sure which services you need?" text="Tell us about your celebration and we will suggest a sensible scope." message="Hi ORYNZA! I would like help choosing the right services for my celebration." />
    </>
  );
}
