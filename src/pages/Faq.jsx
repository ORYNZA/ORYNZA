import { useMeta } from '../lib/useMeta';
import Accordion from '../components/Accordion';
import { CtaBand, PageHeader } from '../components/ui';
import { FAQS } from '../config/site';

export default function Faq() {
  useMeta('FAQs', 'Answers about ordering, delivery time, revisions, RSVP, languages, printing and payments for ORYNZA digital invitations.');
  return (
    <>
      <PageHeader title="Frequently asked questions" lead="The things couples and families ask us most." />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap narrow">
          <Accordion items={FAQS} />
        </div>
      </section>
      <CtaBand title="Still have a question?" text="Ask us on WhatsApp. We usually know the answer, and if we don't we'll find it." message="Hi ORYNZA! I have a question about your invitation service." />
    </>
  );
}
