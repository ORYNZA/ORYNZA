import React from 'react';
import { Calendar } from 'lucide-react';
import { downloadICS } from '../../lib/dates';

/**
 * Reusable Add to Calendar Button for ORYNZA templates.
 * Generates an RFC-5545 standard .ics file download.
 * 
 * @param {Object} event - Event metadata { title, dateISO, startTime, endTime, venue, city, description }
 * @param {string} className - Optional CSS class
 * @param {React.ReactNode} children - Button label / content
 * @param {string} ariaLabel - Accessible announcement
 */
export default function CalendarDownloadButton({
  event,
  className = '',
  children,
  ariaLabel,
}) {
  const handleClick = () => {
    if (!event) return;
    downloadICS({
      title: event.title || 'Wedding Celebration',
      date: event.dateISO,
      time: event.startTime || '10:00',
      endTime: event.endTime || '14:00',
      location: [event.venue, event.city].filter(Boolean).join(', '),
      description: event.description || '',
    });
  };

  return (
    <button
      type="button"
      className={`orynza-cal-download-btn ${className}`.trim()}
      onClick={handleClick}
      aria-label={ariaLabel || `Add ${event?.title || 'event'} to your calendar`}
    >
      {children || (
        <>
          <Calendar size={15} aria-hidden="true" />
          <span>Add to Calendar</span>
        </>
      )}
    </button>
  );
}
