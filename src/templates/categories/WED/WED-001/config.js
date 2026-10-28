/**
 * ORYNZA Template 1 — Royal Lake Palace Configuration
 * All wedding details, demonstration placeholders, and configurable content.
 * Replaceable for real couples without altering template code.
 */

export const ROYAL_LAKE_PALACE_CONFIG = {
  templateId: 'WED-001',
  templateName: 'Royal Lake Palace',
  themeId: 'royal-lake-palace',
  category: 'WED',

  // Couple Details
  couple: {
    partnerA: 'Aarav',
    partnerB: 'Meera',
    partnerAFull: 'Aarav Sharma',
    partnerBFull: 'Meera Singhania',
    monogram: 'A & M',
    parentsWording: 'Together with their families',
    invitationCopy: 'request the pleasure of your company as they celebrate their marriage amidst the timeless splendour of Lake Pichola.',
  },

  // Main Wedding Event Details
  event: {
    title: 'The Royal Wedding Celebration',
    dateISO: '2027-02-15',
    dateDisplay: 'Monday, 15 February 2027',
    destination: 'Udaipur, Rajasthan',
    celebrationSubtitle: 'A Three-Day Royal Udaipur Odyssey',
    countdownTarget: '2027-02-15T16:30:00+05:30',
  },

  // Venue Information
  venue: {
    name: 'The Leela Palace Udaipur',
    palaceSubtitle: 'Heritage Palace on Lake Pichola',
    city: 'Udaipur, Rajasthan',
    address: 'Lake Pichola, P.O. Box No. 125, Udaipur, Rajasthan 313001, India',
    description: 'A romantic lakeside celebration surrounded by the heritage and scenery of Udaipur, where historic Mewar architecture meets the tranquil waters of Lake Pichola.',
    directionsUrl: 'https://maps.google.com/?q=The+Leela+Palace+Udaipur+Lake+Pichola',
    isDemonstrationMap: true,
    alt: 'White marble domes and ornate carved balconies of The Leela Palace reflecting in the calm waters of Lake Pichola at Udaipur',
  },

  // Story / Introductory Section
  intro: {
    eyebrow: 'Our Beginning',
    title: 'A New Chapter',
    paragraph1: 'From our first twilight conversation along the lakeside promenades to sharing dreams under starry desert skies, every step has brought us to this sacred threshold.',
    paragraph2: 'Surrounded by the warmth of family, the fragrance of royal roses, and the blessings of generations, we invite you to be part of the moments that will shape the rest of our lives.',
    quote: '“Where love finds its kingdom, every sunrise becomes an eternal promise.”',
  },

  // Celebrations (Section C: Moments to Make Memories)
  celebrations: [
    {
      id: 'mehendi',
      panelIndex: 0,
      title: 'Mehendi & Phoolon Ki Holi',
      date: 'Sunday, 14 February 2027',
      dateISO: '2027-02-14',
      startTime: '11:00',
      endTime: '15:00',
      timeDisplay: '11:00 AM – 3:00 PM',
      venue: 'The Guava Garden Courtyard',
      description: 'An exuberant sunlit gathering of intricate bridal henna artistry, Rajasthani folk melodies, marigold showers, and festive culinary treats.',
      dressCode: 'Vibrant Pastels & Festive Florals',
      panelAlt: 'Mehendi celebration decor featuring marigold canopies and handcrafted artisanal seating',
    },
    {
      id: 'sangeet',
      panelIndex: 1,
      title: 'Sangeet & Royal Gala',
      date: 'Sunday, 14 February 2027',
      dateISO: '2027-02-14',
      startTime: '19:00',
      endTime: '23:30',
      timeDisplay: '7:00 PM onwards',
      venue: 'The Mewar Ballroom & Terrace',
      description: 'A dazzling evening of family performances, Sufi music, choreographed dancing, and dinner overlooking the illuminated lake.',
      dressCode: 'Regal Glamour & Sparkle',
      panelAlt: 'Sangeet ballroom setting with dramatic chandeliers and floral arrangements',
    },
    {
      id: 'wedding',
      panelIndex: 2,
      title: 'The Sacred Pheras',
      date: 'Monday, 15 February 2027',
      dateISO: '2027-02-15',
      startTime: '16:30',
      endTime: '19:30',
      timeDisplay: '4:30 PM – 7:30 PM (Vows at Sunset)',
      venue: 'The Lakeside Palace Mandap',
      description: 'A solemn Vedic wedding ceremony at sunset, surrounded by sacred chants, lotus petals, and the reflection of the palaces in Lake Pichola.',
      dressCode: 'Imperial Indian Traditional / Burgundy & Antique Gold',
      panelAlt: 'Lakeside Mandap decorated with ivory fabrics and floral garlands at sunset',
    },
    {
      id: 'reception',
      panelIndex: 3,
      title: 'Grand Palace Reception',
      date: 'Monday, 15 February 2027',
      dateISO: '2027-02-15',
      startTime: '20:00',
      endTime: '23:59',
      timeDisplay: '8:00 PM onwards',
      venue: 'The Sheesh Mahal Banquet Lawn',
      description: 'A celebration banquet with royal Mewari delicacies, champagne toasts, live acoustic symphony, and late-night revelry.',
      dressCode: 'Formal Black-Tie / Regal Ethnic',
      panelAlt: 'Sheesh Mahal banquet hall with candlelit banquet tables and crystal accents',
    },
  ],

  // Ceremony Mandap Spotlight (Incorporated into Section C)
  ceremonyMandap: {
    eyebrow: 'Sacred Ceremony Atmosphere',
    title: 'The Lakeside Mandap Sanctuary',
    description: 'An open-air Vedic mandap crafted with antique-gold pillars, draped in ivory silk and cascading blush floristry along the tranquil shores of Lake Pichola.',
    alt: 'The sacred outdoor wedding mandap adorned with ivory draping, blush roses, and antique-gold pillars overlooking Lake Pichola',
  },

  // Guest Experience / Travel & Accommodation
  guestGuidance: {
    airport: {
      title: 'Arrival & Transfers',
      detail: 'Maharana Pratap Airport (UDR) is 26 km from the palace. Chauffeur shuttles and royal boat transfers from the pier will be available for all arriving flights on 13 and 14 February.',
    },
    accommodation: {
      title: 'Palace Accommodations',
      detail: 'Suites have been reserved at The Leela Palace Udaipur. Please provide your flight itinerary through the RSVP form or contact our hospitality desk.',
    },
    parking: {
      title: 'Valet & Pier Concierge',
      detail: 'Complimentary private valet parking and luxury jetty transport are stationed at the Dudh Talai pier for guests arriving by personal transport.',
    },
  },

  // RSVP Configuration
  rsvp: {
    deadlineDisplay: '15 January 2027',
    deadlineISO: '2027-01-15',
    maxGuests: 4,
    contactPhone: '+91 89219 93702',
    contactEmail: 'weddings@orynza.com',
    dietaryOptions: [
      'No Dietary Restrictions',
      'Vegetarian',
      'Jain (No Root Vegetables)',
      'Vegan',
      'Gluten-Free',
      'Nut Allergy',
    ],
  },

  // Closing Experience
  closing: {
    gratitudeTitle: 'With Gratitude & Joy',
    gratitudeMessage: 'Your presence, blessings, and laughter mean the world to us as we begin our lifelong journey. We look forward to creating unforgettable memories with you in Udaipur.',
    familySignoff: 'With love from the Sharma & Singhania Families',
  },

  // Demonstration Banner Info
  demoDisclaimer: 'DEMONSTRATION TEMPLATE — ROYAL LAKE PALACE (TEMPLATE 1). Replaceable placeholder content for demonstration purposes.',
};
