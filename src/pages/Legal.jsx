import { Link } from 'react-router-dom';
import { useMeta } from '../lib/useMeta';
import { PageHeader } from '../components/ui';
import { POLICIES, SITE } from '../config/site';

export function Privacy() {
  useMeta('Privacy notice', 'How ORYNZA handles the details you share when enquiring about or ordering a digital invitation.');
  return (
    <>
      <PageHeader title="Privacy notice" lead="A plain-language summary of how your details are handled." />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap narrow prose">
          <h2>What you share with us</h2>
          <p>When you contact ORYNZA on WhatsApp, or use the enquiry form (which opens WhatsApp with your details filled in), you share information such as your name, contact number, event details and preferences. That information is shared with ORYNZA only so we can handle your enquiry and, if you go ahead, your order.</p>
          <h2>What this website stores</h2>
          <p>The enquiry form does not save anything on a server. Your details reach us only when you press send in WhatsApp. WhatsApp is a separate service with its own terms and privacy practices. This website also loads its fonts from Google Fonts, so your browser contacts Google's font servers when a page loads.</p>
          <h2>Guest RSVP information</h2>
          <p>For packages that include RSVP, guest information should be collected only when it is needed for the celebration and shared only with authorised people, such as the hosts and the ORYNZA team working on your order.</p>
          <h2>Sample content</h2>
          <p>The couples, dates and venues shown on this website, including the sample invitation, are illustrative. The sample RSVP form does not record anything.</p>
          <h2>Questions or corrections</h2>
          <p>To ask us to correct or delete details you have sent, message us on WhatsApp at {SITE.displayPhone}.</p>
          <p className="fine">This is an initial notice written for the site owner to review and amend. It is not legal advice and does not claim compliance with any specific law.</p>
        </div>
      </section>
    </>
  );
}

export function Terms() {
  useMeta('Terms & service policy', 'ORYNZA initial service policy: how orders, revisions, delivery and payments work.');
  return (
    <>
      <PageHeader title="Terms & service policy" lead="How working with ORYNZA runs, in plain terms." />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap narrow prose">
          <h2>Our initial service policy</h2>
          <ul className="policy">
            {POLICIES.map((p) => (<li key={p}>{p}</li>))}
          </ul>
          <h2>What is included</h2>
          <p>The exact scope depends on the package you choose. See the <Link to="/pricing">pricing page</Link> for what each package includes. Printing, payment processing and unlimited edits are not included unless agreed with you in writing.</p>
          <h2>Prices</h2>
          <p>Package prices are introductory and in Indian rupees. Final scope, delivery timeline and any third-party charges are confirmed with you before work begins.</p>
          <p className="fine">This is an initial policy written for the site owner to review and amend. It is not a legally binding contract and not legal advice.</p>
        </div>
      </section>
    </>
  );
}
