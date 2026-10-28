/**
 * ORYNZA — Central Asset Manifest
 * Maps verified web-ready asset paths in /assets/ to symbolic constants.
 * Dynamically resolves with Vite base path (e.g. /ORYNZA/ on GitHub Pages).
 * All components MUST reference assets through this manifest.
 */

const base = import.meta.env.BASE_URL || '/';
const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
const assetUrl = (path) => `${cleanBase}${path.startsWith('/') ? path : `/${path}`}`;

export const ASSETS = {
  brand: {
    logo: assetUrl('/assets/brand/orynza_logo.png'),
    faviconMark: assetUrl('/assets/brand/orynza-favicon-mark.png'),
  },
  backgrounds: {
    hero: assetUrl('/assets/backgrounds/orynza-hero-desktop.png'),
    site: assetUrl('/assets/backgrounds/orynza-site-background.png'),
    pricing: assetUrl('/assets/backgrounds/orynza-pricing-background.png'),
    contact: assetUrl('/assets/backgrounds/orynza-contact-background.png'),
  },
  decorative: {
    botanicalOverlay: assetUrl('/assets/decorative/orynza-botanical-overlay.png'),
    monogramFrame: assetUrl('/assets/decorative/orynza-monogram-frame.png'),
    sageBotanical: assetUrl('/assets/decorative/orynza-sage-botanical.png'),
  },
  mockups: {
    royalLakePalace: assetUrl('/assets/invitation-mockups/design-royal-lake-palace.png'),
    timelessIvoryGold: assetUrl('/assets/invitation-mockups/design-timeless-ivory-gold.png'),
    botanicalSage: assetUrl('/assets/invitation-mockups/design-botanical-sage.png'),
    blushRomance: assetUrl('/assets/invitation-mockups/design-blush-romance.png'),
    modernMinimal: assetUrl('/assets/invitation-mockups/design-modern-minimal.png'),
    traditionalIndian: assetUrl('/assets/invitation-mockups/design-traditional-indian.png'),
    eveningReception: assetUrl('/assets/invitation-mockups/design-evening-reception.png'),
    heroMockup: assetUrl('/assets/invitation-mockups/orynza-hero-invitation-mockup.png'),
  },
  supporting: {
    processDetails: assetUrl('/assets/supporting/orynza-process-details.png'),
    detailFloral: assetUrl('/assets/supporting/orynza-detail-floral.png'),
    socialSharePreview: assetUrl('/assets/supporting/orynza-social-share-preview.png'),
    whatsappCard: assetUrl('/assets/supporting/orynza-whatsapp-card.png'),
  },
  video: {
    heroLoop: assetUrl('/assets/video/orynza-hero-loop.mp4'),
    brandAtmosphere: assetUrl('/assets/video/orynza-brand-atmosphere.mp4'),
    invitationReveal: assetUrl('/assets/video/orynza-invitation-reveal.mp4'),
    paperCraft: assetUrl('/assets/video/orynza-paper-craft.mp4'),
  },
};
