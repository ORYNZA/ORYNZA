import { MessageCircle, Sparkles, Heart, CalendarRange, ClipboardCheck, Users, MapPin, Share2 } from 'lucide-react';
import { waLink } from '../lib/whatsapp';

export const ICONS = { Sparkles, Heart, CalendarRange, ClipboardCheck, Users, MapPin, Share2 };

/** An <a> that opens WhatsApp with a pre-filled, URL-encoded message. */
export function WhatsAppLink({ message, children, className = 'btn btn-sage', icon = true, ...rest }) {
  return (
    <a className={className} href={waLink(message)} target="_blank" rel="noopener noreferrer" {...rest}>
      {icon && <MessageCircle size={18} aria-hidden="true" />}
      {children}
    </a>
  );
}

export function PageHeader({ title, lead, children }) {
  return (
    <section className="page-head">
      <div className="wrap">
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

export function SectionHead({ title, lead, center = false, id }) {
  return (
    <div className={`sec-head ${center ? 'is-center' : ''}`}>
      <h2 id={id}>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}

export function CtaBand({ title, text, message, label = 'Chat on WhatsApp' }) {
  return (
    <section className="cta-band">
      <div className="wrap cta-inner">
        <div>
          <h2>{title}</h2>
          {text && <p>{text}</p>}
        </div>
        <WhatsAppLink className="btn btn-gold" message={message}>{label}</WhatsAppLink>
      </div>
    </section>
  );
}
