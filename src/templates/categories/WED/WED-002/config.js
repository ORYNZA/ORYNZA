/**
 * ORYNZA Template 2 — Sunset Shores Configuration
 * All wedding details, demonstration placeholders, and configurable content.
 * Replaceable for real couples without altering template code.
 */

export const SUNSET_SHORES_CONFIG = {
  templateId: 'WED-002',
  templateName: 'Sunset Shores',
  themeId: 'sunset-shores',
  category: 'WED',

  // Couple Details
  couple: {
    partnerA: 'Arjun',
    partnerB: 'Kiara',
    partnerAFull: 'Arjun Mehta',
    partnerBFull: 'Kiara D’Souza',
    monogram: 'A & K',
    parentsWording: 'Together with their families',
    invitationCopy: 'request the pleasure of your company as they celebrate their love and exchange vows beside the sun-kissed shores of the Arabian Sea.',
  },

  // Main Wedding Event Details
  event: {
    title: 'Sunset Shores — A Celebration in Goa',
    tagline: 'A Love Story by the Sea',
    dateISO: '2027-04-12',
    dateDisplay: 'Monday, 12 April 2027',
    destination: 'Goa, India',
    celebrationSubtitle: 'A Coastal Celebration of Love & Sunset Vows',
    countdownTarget: '2027-04-12T16:30:00+05:30',
  },

  // Palette Tokens
  palette: {
    sand: '#E8D7C9',
    terracotta: '#E79B7B',
    teal: '#0E6B6F',
    gold: '#F4C563',
    coral: '#B85C3E',
    green: '#0F3E3A',
    ivory: '#FBF7F2',
    charcoal: '#1C2A28',
  },

  // Venue Information
  venue: {
    name: 'Taj Exotica Resort & Spa, Goa',
    palaceSubtitle: 'Mediterranean Coastal Resort on Benaulim Beach',
    city: 'Benaulim, South Goa, India',
    address: 'Calwaddo, Benaulim, Salcete, Goa 403716, India',
    description: 'An idyllic Mediterranean-style sanctuary nestled on the southwest coast of Goa, featuring sun-drenched private beaches, swaying palm groves, and breathtaking ocean sunsets overlooking the Arabian Sea.',
    directionsUrl: 'https://maps.google.com/?q=Taj+Exotica+Resort+Spa+Goa',
    isDemonstrationMap: true,
    alt: 'Mediterranean terracotta roofs, sun-drenched palm trees, and ocean-horizon views of Taj Exotica Resort & Spa in South Goa',
  },

  // Story / Introductory Section
  intro: {
    eyebrow: 'Our Journey',
    title: 'Two Souls, One Beautiful Journey',
    paragraph1: 'From sun-drenched walks along tranquil ocean shores to late-night laughter under starlit skies, life brought us together by the sea.',
    paragraph2: 'As the ocean tides roll in and the golden sun dips into the horizon, we begin our greatest adventure surrounded by the love, laughter, and blessings of our family and dearest friends.',
    quote: '“In the melody of crashing waves and golden horizons, our forever begins.”',
  },

  // Celebrations (Section C: Celebrations by the Sea)
  celebrations: [
    {
      id: 'mehendi',
      panelIndex: 0,
      title: 'Sundowner Mehendi & Sangria',
      date: 'Sunday, 11 April 2027',
      dateISO: '2027-04-11',
      startTime: '15:30',
      endTime: '18:30',
      timeDisplay: '3:30 PM – 6:30 PM',
      venue: 'The Palm Grove Lawn',
      description: 'An afternoon of vibrant henna artistry, refreshing tropical sips, lively acoustic tunes, and festive celebration amidst swaying coconut palms.',
      dressCode: 'Breezy Tropical Pastels & Sunshine Yellows',
      panelAlt: 'Mehendi celebration setup under swaying palm trees with tropical floral decor',
    },
    {
      id: 'sangeet',
      panelIndex: 1,
      title: 'Beachside Sangeet & Starlit Soirée',
      date: 'Sunday, 11 April 2027',
      dateISO: '2027-04-11',
      startTime: '19:30',
      endTime: '23:59',
      timeDisplay: '7:30 PM onwards',
      venue: 'The Sunset Deck & Ocean Terrace',
      description: 'An energetic night of family dance performances, coastal cocktails, DJ beats, and joyous celebrations under a canopy of fairy lights.',
      dressCode: 'Glamorous Coastal Chic / Sequins & Jewel Tones',
      panelAlt: 'Beachside Sangeet stage lit with warm fairy lights and ocean backdrop',
    },
    {
      id: 'wedding',
      panelIndex: 2,
      title: 'The Sunset Vows & Sacred Pheras',
      date: 'Monday, 12 April 2027',
      dateISO: '2027-04-12',
      startTime: '16:30',
      endTime: '19:30',
      timeDisplay: '4:30 PM – 7:30 PM (Sunset Vows)',
      venue: 'The Oceanfront Mandap Beach',
      description: 'A sacred Vedic ceremony accompanied by the ocean breeze, sacred mantras, floral showers, and the golden hour sun setting into the Arabian Sea.',
      dressCode: 'Traditional Indian Elegance / Terracotta, Coral & Sand',
      panelAlt: 'Beachside wedding mandap with flowing terracotta fabrics and floral garlands at golden hour',
    },
    {
      id: 'reception',
      panelIndex: 3,
      title: 'Ocean Pavilion Gala & Dinner',
      date: 'Monday, 12 April 2027',
      dateISO: '2027-04-12',
      startTime: '20:00',
      endTime: '23:59',
      timeDisplay: '8:00 PM onwards',
      venue: 'The Grand Ocean Ballroom & Lawn',
      description: 'An unforgettable evening of celebratory toasts, coastal culinary delights, live music, and dancing under the stars.',
      dressCode: 'Black-Tie Optional / Festive Formal',
      panelAlt: 'Ocean pavilion reception tables with candlelight and tropical floral centerpieces',
    },
  ],

  // Ceremony Highlight / Mandap Spotlight
  ceremonyMandap: {
    eyebrow: 'The Sacred Setting',
    title: 'Beachside Mandap Sanctuary',
    description: 'Set right along the soft sands of Benaulim Beach, our open-air floral mandap blends natural timber pillars, fragrant bougainvillea, and delicate white blossoms framing the panoramic Arabian Sea sunset.',
    alt: 'The open-air beachfront wedding mandap adorned with tropical flora and flowing drapes right along the shore',
  },

  // Guest Experience / Travel & Accommodation
  guestGuidance: {
    airport: {
      title: 'Arrival & Transfers',
      detail: 'Goa International Airport (GOI / Dabolim is 28 km; MOPA is 65 km). Private chauffeur shuttles will welcome guests at both airports throughout 10 and 11 April.',
    },
    accommodation: {
      title: 'Resort Accommodations',
      detail: 'Mediterranean-style villas and rooms are arranged for our guests at Taj Exotica Resort & Spa. Please mention your room preferences in your RSVP.',
    },
    climate: {
      title: 'Coastal Climate & Attire',
      detail: 'Goa in April enjoys warm coastal sunshine with gentle evening sea breezes (26°C – 32°C). Lightweight natural fabrics and sunglasses are highly recommended.',
    },
  },

  // RSVP Configuration
  rsvp: {
    deadlineDisplay: '15 March 2027',
    deadlineISO: '2027-03-15',
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
    gratitudeTitle: 'With Love and Gratitude',
    gratitudeMessage: 'Your love, presence, and laughter mean the world to us as we begin our lifelong journey. We cannot wait to raise a toast and celebrate with you on the shores of Goa.',
    familySignoff: 'With love from Arjun & Kiara and the Mehta & D’Souza Families',
  },

  // Demonstration Banner Info
  demoDisclaimer: 'DEMONSTRATION TEMPLATE — SUNSET SHORES (TEMPLATE 2). Replaceable placeholder content for demonstration purposes.',
};
