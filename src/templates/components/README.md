# ORYNZA Shared Template Components

This directory contains theme-agnostic, reusable React components intended for use across all ORYNZA invitation templates.

---

## Components

### 1. `CountdownTimer`
- **File Location**: `src/templates/components/CountdownTimer.jsx`
- **Purpose**: Calculates and renders live days, hours, minutes, and seconds remaining until a designated event date and time.
- **Props**:
  - `targetDate` (*string*, required): Valid ISO-8601 date string (e.g. `'2027-02-15T16:30:00+05:30'`).
  - `className` (*string*, optional): Additional CSS class for container styling.
  - `labels` (*object*, optional): Custom unit labels (`{ days, hours, minutes, seconds }`).
  - `onExpire` (*function*, optional): Callback invoked when countdown reaches zero.
- **Dependencies**: React standard hooks (`useState`, `useEffect`).
- **Accessibility Behavior**:
  - Encapsulated in `<div role="timer">`.
  - Comprehensive `aria-label` announcing total time remaining for screen readers.
  - Digits marked `aria-hidden="true"` to prevent stuttering screen-reader interruptions on 1-second ticks.
- **Recommended Usage**: Used in hero sections, countdown callouts, or save-the-date cards. Automatically hides once the target date has passed.
- **Compatibility**: Standard React 18, zero external library requirements.

---

### 2. `CalendarDownloadButton`
- **File Location**: `src/templates/components/CalendarDownloadButton.jsx`
- **Purpose**: Accessible button that triggers standard RFC-5545 `.ics` calendar invitation download.
- **Props**:
  - `event` (*object*, required): Metadata object:
    - `title` (*string*): Event title (e.g. `'The Sacred Pheras'`).
    - `dateISO` (*string*): `'YYYY-MM-DD'`.
    - `startTime` (*string*): `'HH:mm'` 24-hr format.
    - `endTime` (*string*): `'HH:mm'` 24-hr format.
    - `venue` (*string*): Location name.
    - `city` (*string*): City name.
    - `description` (*string*): Notes and dress code.
  - `className` (*string*, optional): CSS class name.
  - `children` (*ReactNode*, optional): Custom button contents. Defaults to calendar icon and label.
  - `ariaLabel` (*string*, optional): Accessible label for screen readers.
- **Dependencies**: `lucide-react` (`Calendar`), `src/lib/dates.js` (`downloadICS`).
- **Accessibility Behavior**: Semantic `<button type="button">` with descriptive `aria-label`.
- **Recommended Usage**: Event schedule cards, itinerary blocks, single-ceremony cards.
- **Compatibility**: Compatible with Apple Calendar, Google Calendar, Outlook, and all `.ics` consumers.

---

### 3. `TemplateCard`
- **File Location**: `src/templates/components/TemplateCard.jsx`
- **Purpose**: Interactive card component representing a template item in catalogue browser galleries.
- **Props**:
  - `template` (*object*): Template metadata from `templates.json`.
  - `onSelect` (*function*): Handler triggered upon clicking the card.
