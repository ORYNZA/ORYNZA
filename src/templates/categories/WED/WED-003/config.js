/**
 * ORYNZA Template 3 — Enchanted Gardens Configuration
 * All wedding details, demonstration placeholders, and configurable content.
 * Replaceable for real couples without altering template code.
 */

export const ENCHANTED_GARDENS_CONFIG = {
  templateId: 'WED-003',
  templateName: 'Enchanted Gardens',
  themeId: 'enchanted-gardens',
  category: 'WED',

  // Couple Details
  couple: {
    partnerA: 'Rohan',
    partnerB: 'Ananya',
    partnerAFull: 'Rohan Sharma',
    partnerBFull: 'Ananya Hegde',
    monogram: 'R & A',
    parentsWording: 'Together with their families',
    invitationCopy: 'request the honour of your presence as they unite in marriage and celebrate love amidst the blossoming beauty of the garden canopy.',
  },

  // Main Wedding Event Details
  event: {
    title: 'Enchanted Gardens — Contemporary Botanical Wedding',
    tagline: 'A Celebration of Love',
    dateISO: '2027-11-24',
    dateDisplay: 'Wednesday, 24 November 2027',
    destination: 'Bengaluru, India',
    celebrationSubtitle: 'An Intimate Botanical Wedding Celebration',
    countdownTarget: '2027-11-24T16:00:00+05:30',
  },

  // Palette Tokens
  palette: {
    background: '#F6EFE7',
    surfaceBlush: '#E7C6C8',
    warmBronze: '#A67C52',
    sageGreen: '#587F5B',
    roseAccent: '#C65A6A',
    deepGarden: '#2E3F2F',
    crispLinen: '#FAF7F2',
    cardWhite: '#FFFFFF',
    textMuted: '#647A66',
  },

  // Venue Information
  venue: {
    name: 'The Tamarind Grove',
    subtitle: 'Open-Air Canopy Pavilion & Botanical Estate',
    city: 'Bengaluru, Karnataka, India',
    address: 'Tamarind Grove Estate, Hessarghatta Lake Road, Bengaluru, Karnataka 560088, India',
    description: 'An idyllic garden sanctuary shaded by century-old tamarind trees, fragrant jasmine vines, and architectural botanicals in the Garden City of Bengaluru.',
    directionsUrl: 'https://maps.google.com/?q=Bengaluru+Garden+Estate',
    isDemonstrationMap: true,
    alt: 'Lush botanical garden setting with shaded tamarind trees and manicured lawns at The Tamarind Grove in Bengaluru',
  },

  // Story / Editorial Introductory Section
  intro: {
    eyebrow: 'Our Narrative',
    title: 'Rooted in Love, Growing in Grace',
    paragraph1: 'Between coffee house conversations in Bengaluru and shared strolls through sunlit botanical gardens, our friendship blossomed into a lifelong promise.',
    paragraph2: 'Beneath the shade of century-old canopies, we invite you to join us for a celebration filled with laughter, sacred vows, and cherished moments with those who mean the most to us.',
    quote: '“Like branches of a tree, our lives grow in different directions yet our roots remain firmly as one.”',
  },

  // Celebrations (Section C: 4 Events linked to 4-panel image)
  celebrations: [
    {
      id: 'mehendi',
      panelIndex: 0,
      title: 'Mehendi & Afternoon Garden Tea',
      date: 'Tuesday, 23 November 2027',
      dateISO: '2027-11-23',
      startTime: '14:00',
      endTime: '17:30',
      timeDisplay: '2:00 PM – 5:30 PM',
      venue: 'The Shaded Lawn & Herbarium',
      description: 'An intimate afternoon of organic henna artistry, botanical infused high tea, artisanal treats, and acoustic garden melodies.',
      dressCode: 'Botanical Florals & Fresh Spring Pastels',
      panelAlt: 'Intimate garden Mehendi setup under blossoming floral canopies and wooden gazebos',
    },
    {
      id: 'sangeet',
      panelIndex: 1,
      title: 'Sangeet Under the Stars',
      date: 'Tuesday, 23 November 2027',
      dateISO: '2027-11-23',
      startTime: '19:00',
      endTime: '23:59',
      timeDisplay: '7:00 PM onwards',
      venue: 'The Glasshouse Pavilion',
      description: 'An exhilarating evening of family choreographies, live fusion orchestra, and joyous dancing beneath starlit conservatory glass.',
      dressCode: 'Contemporary Indowestern / Emerald, Blush & Champagne',
      panelAlt: 'Glasshouse pavilion illuminated with warm fairy lights for the evening Sangeet',
    },
    {
      id: 'wedding',
      panelIndex: 2,
      title: 'The Sacred Canopy Vows & Pheras',
      date: 'Wednesday, 24 November 2027',
      dateISO: '2027-11-24',
      startTime: '16:00',
      endTime: '19:30',
      timeDisplay: '4:00 PM – 7:30 PM (Auspicious Sunset Muhurtham)',
      venue: 'The Tamarind Mandap Amphitheatre',
      description: 'A serene Vedic ceremony accompanied by classical carnatic flute, sacred chants, and fragrant tuberose showers beneath the sacred tamarind tree.',
      dressCode: 'Traditional Indian Festive / Sage, Bronze & Rose',
      panelAlt: 'Sacred open-air floral mandap structure entwined with green foliage and hanging blooms',
    },
    {
      id: 'reception',
      panelIndex: 3,
      title: 'Reception Gala & Starlit Soirée',
      date: 'Wednesday, 24 November 2027',
      dateISO: '2027-11-24',
      startTime: '20:00',
      endTime: '23:59',
      timeDisplay: '8:00 PM onwards',
      venue: 'The Grand Canopy Orchard',
      description: 'A starlit banquet celebrating the newly wedded couple with curated farm-to-table culinary creations, celebratory champagne, and live jazz.',
      dressCode: 'Black-Tie Optional / Contemporary Garden Formal',
      panelAlt: 'Elegant reception banquet tables under open sky with botanical centerpieces and soft candles',
    },
  ],

  // Ceremony Highlight / Mandap Spotlight
  ceremonyMandap: {
    eyebrow: 'Sacred Installation',
    title: 'The Living Tamarind Mandap',
    description: 'Conceived as an organic extension of nature, our open-air ceremony pavilion is framed with living bamboo, trailing eucalyptus fronds, local rajnigandha, and heirloom blush roses entwined beneath the eternal shade of the grove.',
    alt: 'Artisanal ceremony mandap nestled beneath towering trees with intricate floral garlands and warm earthen lamps',
  },

  // Guest Experience / Travel & Accommodation
  guestGuidance: {
    airport: {
      title: 'Arrival & Shuttles',
      detail: 'Kempegowda International Airport (BLR) is located 38 km from the estate. Chauffeur shuttles will be coordinated directly for arriving guests on 22 and 23 November.',
    },
    accommodation: {
      title: 'Boutique Garden Villas',
      detail: 'Private courtyard suites and villas have been reserved on the property for all invited guests. Room allocations will be confirmed upon RSVP.',
    },
    climate: {
      title: 'Garden Climate & Attire',
      detail: 'Bengaluru in late November enjoys pleasant, crisp weather (18°C – 27°C) with cool evening breezes. Light shawls or wraps are suggested for open-air night events.',
    },
  },

  // RSVP Configuration
  rsvp: {
    deadlineDisplay: '20 October 2027',
    deadlineISO: '2027-10-20',
    maxGuests: 4,
    contactPhone: '+91 89219 93702',
    contactEmail: 'weddings@orynza.com',
    dietaryOptions: [
      'No Dietary Restrictions',
      'Vegetarian',
      'Jain (Strict Vegetarian without root vegetables)',
      'Vegan',
      'Gluten-Free',
      'Nut Allergy / Specific dietary note',
    ],
  },

  // Closing Experience
  closing: {
    gratitudeTitle: 'With Our Deepest Gratitude',
    gratitudeMessage: 'Your presence in our lives has nurtured our love. We are endlessly grateful for your blessings and cannot wait to celebrate this milestone together under the trees of Bengaluru.',
    familySignoff: 'With love from Rohan & Ananya and the Sharma & Hegde Families',
  },

  // Demonstration Banner Info
  demoDisclaimer: 'DEMONSTRATION TEMPLATE — ENCHANTED GARDENS (TEMPLATE 3). Replaceable placeholder content for demonstration purposes.',
};
