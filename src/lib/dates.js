const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

/** Parses 'YYYY-MM-DD' as a local calendar date (avoids timezone drift). */
export function parseISO(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function formatDate(iso, { weekday = true } = {}) {
  if (!iso) return '';
  const d = parseISO(iso);
  const core = `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  return weekday ? `${DAYS[d.getDay()]}, ${core}` : core;
}

export function formatTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}

export function daysUntil(iso) {
  const target = parseISO(iso);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((target - today) / 86400000);
}

const pad = (n) => String(n).padStart(2, '0');
const icsStamp = (iso, hhmm) => `${iso.replace(/-/g, '')}T${hhmm.replace(':', '')}00`;
const icsEscape = (s) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

/** Creates an .ics file (floating local time) and triggers a download. */
export function downloadICS({ title, date, time, endTime, location, description }) {
  const now = new Date();
  const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ORYNZA//Invitation//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${date}-${time}-${Math.random().toString(36).slice(2)}@orynza`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${icsStamp(date, time)}`,
    `DTEND:${icsStamp(date, endTime)}`,
    `SUMMARY:${icsEscape(title)}`,
    `LOCATION:${icsEscape(location)}`,
    `DESCRIPTION:${icsEscape(description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
