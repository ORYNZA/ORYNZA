/**
 * ORYNZA — Core Site Configuration
 * Single source of truth for branding, contact coordinates, extended atelier palette, and navigation links.
 */

export const SITE = {
  name: 'ORYNZA',
  tagline: 'Made for Moments That Matter.',
  businessType: 'Boutique Digital Wedding Invitation Studio',
  
  // WhatsApp Contact Coordinates
  whatsappNumber: '918921993702',
  localNumber: '8921993702',
  displayPhone: '+91 89219 93702',
  whatsappBaseUrl: 'https://wa.me/918921993702',
  
  defaultEnquiryMessage: 'Hi ORYNZA! I would like to enquire about creating a bespoke digital wedding invitation.',
  
  meta: {
    title: 'ORYNZA | Boutique Digital Wedding Invitation Studio',
    description: 'Thoughtfully designed digital wedding invitations, multi-event ceremony suites, and guest RSVP coordination for Indian couples and families. Made for Moments That Matter.',
  },
};

/**
 * Extended Atelier Palette
 * Balances warm ivory, champagne gold, deep emerald, peacock teal, marigold, saffron,
 * coral blush, plum wine, and deep charcoal.
 */
export const COLORS = {
  // Heritage neutrals
  warmIvory: '#F8F5EF',
  whiteIvory: '#FFFDF8',
  softChampagne: '#F4ECE1',
  paperCream: '#FBF9F4',
  
  // Signature golds
  champagneGold: '#A7874E',
  champagneGoldLight: '#C9B283',
  liquidGold: '#D4AF37',
  deepGold: '#80632F',
  antiqueOchre: '#8A6B32',
  
  // Celebratory jewel & spice tones
  deepEmerald: '#1C3F30',
  emeraldDark: '#132C22',
  peacockTeal: '#124844',
  tealAccent: '#1F6A64',
  royalMarigold: '#D97706',
  saffronWarmth: '#E0851E',
  vividBlush: '#DE6B7A',
  blushRose: '#EAD4CC',
  plumWine: '#5C1D38',
  burgundyVelvet: '#48162B',
  sapphireMidnight: '#1E3A5F',
  
  // Natural botanicals
  sageGreen: '#35463A',
  sageLight: '#4A5F50',
  sageOlive: '#56735E',
  
  // Contrast & text
  deepCharcoal: '#292820',
  darkCharcoal: '#1E1D19',
  mutedTaupe: '#81796C',
  slateDark: '#434A48',
  borderLine: '#E7E0D3',
};

export const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#designs', label: 'Collections' },
  { href: '#preview-studio', label: 'Preview Studio' },
  { href: '#experience', label: 'Celebration Moods' },
  { href: '#journey', label: 'Guest Experience' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faqs', label: 'FAQs' },
  { href: '#contact', label: 'Consultation' },
];
