import { SITE } from '../config/site';
import { formatDate } from './dates';

export const WA_BASE = `https://wa.me/${SITE.whatsappNumber}`;

/** Builds a correctly URL-encoded WhatsApp link. */
export const waLink = (message = SITE.defaultMessage) =>
  `${WA_BASE}?text=${encodeURIComponent(message)}`;

/** Accepts 10-digit Indian mobiles, with or without +91 / 0 / spaces / dashes. */
export function normalisePhone(value) {
  const digits = value.replace(/[\s\-()]/g, '').replace(/^\+?91/, '').replace(/^0/, '');
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

export function buildEnquiryMessage(f) {
  const lines = [
    'Hi ORYNZA! I would like to enquire about a digital invitation.',
    '',
    `Name: ${f.name.trim()}`,
  ];
  const phone = f.phone.trim() && normalisePhone(f.phone);
  if (phone) lines.push(`Contact number: +91 ${phone}`);
  lines.push(`Celebration: ${f.celebration}`);
  lines.push(`Package: ${f.package}`);
  if (f.date) lines.push(`Event date: ${formatDate(f.date, { weekday: false })}`);
  if (f.functions) lines.push(`Number of functions: ${f.functions}`);
  if (f.style) lines.push(`Preferred style: ${f.style}`);
  if (f.language) lines.push(`Preferred language: ${f.language}`);
  if (f.venue.trim()) lines.push(`Venue / city: ${f.venue.trim()}`);
  if (f.notes.trim()) lines.push('', `Additional requirements: ${f.notes.trim()}`);
  return lines.join('\n');
}

/** Opens WhatsApp in a new tab. Returns false if the browser blocked the pop-up. */
export function openWhatsApp(message) {
  const w = window.open(waLink(message), '_blank');
  if (!w) return false;
  w.opener = null;
  return true;
}
