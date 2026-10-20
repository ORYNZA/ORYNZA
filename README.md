# ORYNZA — Premium Indian Digital Wedding Invitation Studio
> **Made for Moments That Matter.**

ORYNZA is an editorial, boutique digital wedding invitation studio tailored for Indian couples and families. The platform delivers an art-directed stationery experience with seamless digital convenience, offering personalised digital invitations, multi-event wedding pages, clickable venue directions, RSVP coordination, and attendance summaries.

---

## 1. What ORYNZA Is

ORYNZA bridges timeless Indian wedding stationery craftsmanship and contemporary digital convenience. Rather than generic templates or crowded event platforms, ORYNZA treats each wedding invitation as a bespoke editorial stationery piece with:
- Warm ivory, champagne-gold, deep-charcoal, and muted sage visual aesthetics.
- Multi-function wedding itineraries (Mehendi, Sangeet, Muhurtham ceremony, Reception).
- Seamless WhatsApp-based consultation and ordering without unnecessary accounts or passwords.
- Reusable, separate digital invitation landing pages for individual couples.

---

## 2. Technology Stack

- **Framework:** React 18 (`react`, `react-dom`)
- **Routing:** React Router DOM v6 (`react-router-dom`)
- **Build Tool & Bundler:** Vite 6 (`vite`, `@vitejs/plugin-react`)
- **Icons:** SVG vector icons and Lucide React (`lucide-react`)
- **Styling:** Custom CSS Design Tokens (`src/styles.css`) using CSS variables, container queries, and fluid typography (`clamp()`)
- **Typography:** Google Fonts loaded with fallback support:
  - Headings: *Cormorant Garamond*, *Playfair Display*, Georgia, serif
  - Body & UI: *Inter*, system sans-serif

---

## 3. Directory Structure

```text
D:\ORYNZA\
├── assets/                     # Preserved Master Asset Library (untouched)
│   ├── README.md               # Asset Library documentation
│   ├── backgrounds/            # Hero, Site, Pricing, and Contact backgrounds
│   ├── brand/                  # Official transparent logo and favicon mark
│   ├── decorative/             # Monogram frames, botanical overlays, sprigs
│   ├── invitation-mockups/     # Curated invitation design artwork (1122x1402)
│   ├── supporting/             # Flat-lay stationery details and social preview
│   └── video/                  # 10s atmospheric stationery clips (720p/1080p)
│
├── public/                     # Static files served by Vite
│   ├── assets/                 # Web-ready mapped copies of master assets
│   ├── favicon.png             # Browser favicon mark
│   ├── orynza_logo.png         # Logo image
│   └── robots.txt              # Standard web robot directives
│
├── src/                        # Application source code
│   ├── components/
│   │   ├── home/               # Hero, BrandIntro, Gallery, Pricing, FAQ, etc.
│   │   └── layout/             # Header, Footer, and responsive navigation
│   ├── config/
│   │   ├── assets.js           # Central asset manifest mapping
│   │   └── site.js             # Brand coordinates, phone numbers, and palette
│   ├── data/
│   │   ├── designs.js          # 6 curated invitation styles data
│   │   ├── faqs.js             # 10 comprehensive FAQs
│   │   ├── howItWorks.js       # 4-step studio workflow
│   │   ├── invitations.js      # Structured demonstration couple invitations
│   │   ├── packages.js         # Exact pricing packages (₹399, ₹899, ₹1,799)
│   │   ├── services.js         # 4 core studio capabilities
│   │   └── whyOrynza.js        # 4 core brand values
│   ├── pages/
│   │   ├── HomePage.jsx        # 12-section master editorial homepage
│   │   ├── InvitationPage.jsx  # Reusable /invite/:slug invitation template
│   │   └── NotFoundPage.jsx    # Accessible 404 error page
│   ├── App.jsx                 # Route definitions and anchor scroll handling
│   ├── main.jsx                # Application root entry point
│   └── styles.css              # Global design system & component styles
│
├── index.html                  # HTML entry point with metadata & font links
├── package.json                # Project dependencies and npm scripts
├── vite.config.js              # Vite configuration
└── README.md                   # Project documentation (this file)
```

---

## 4. Master Assets Organisation

The master asset library lives in `D:\ORYNZA\assets\` and is strictly preserved:
- `assets/brand/`: `orynza_logo.png` (transparent RGBA, 2172×724), `orynza-favicon-mark.png` (1254×1254).
- `assets/backgrounds/`: `orynza-hero-desktop.png`, `orynza-pricing-background.png`, `orynza-contact-background.png`, `orynza-site-background.png` (1672×941).
- `assets/decorative/`: `orynza-botanical-overlay.png`, `orynza-monogram-frame.png`, `orynza-sage-botanical.png` (transparent RGBA, 1254×1254).
- `assets/invitation-mockups/`: All six collections + hero mockup (1122×1402 portrait aspect ratio). Note: `design-traditional-indian..png` contains double dots in the original filename.
- `assets/supporting/`: `orynza-process-details.png` (1536×1024), `orynza-detail-floral.png` (1122×1402), `orynza-social-share-preview.png` (1731×909), `orynza-whatsapp-card.png` (1254×1254).
- `assets/video/`: Four 10-second cinematic clips (`orynza-hero-loop.mp4`, `orynza-brand-atmosphere..mp4`, `orynza-invitation-reveal.mp4`, `orynza-paper-craft.mp4`).

---

## 5. Web-Ready Assets Mapping

Web assets are served from `/public/assets/` and referenced exclusively through `src/config/assets.js`.
Original master files are never modified. In `public/assets/`, aliases are created to normalize filenames (e.g., `design-traditional-indian.png` aliases `design-traditional-indian..png`, and `orynza-brand-atmosphere.mp4` aliases `orynza-brand-atmosphere..mp4`).

Example manifest import:
```javascript
import { ASSETS } from '../config/assets';

// Correct:
<img src={ASSETS.brand.logo} alt="ORYNZA Logo" />
```

---

## 6. How to Install Dependencies

Inside the project root (`D:\ORYNZA`):
```bash
npm install
```

---

## 7. How to Start the Local Development Server

Run the development server script defined in `package.json`:
```bash
npm run dev
```
Vite will start the server locally (typically at `http://localhost:5173/`).

---

## 8. How to Run the Production Build

Execute the production build script:
```bash
npm run build
```
This compiles assets and components into the optimized `dist/` directory.

---

## 9. How to Preview the Production Build Locally

Preview the compiled `dist/` build:
```bash
npm run preview
```
Vite serves the static production build (typically at `http://localhost:4173/`).

---

## 10. Homepage Section Structure

The homepage (`src/pages/HomePage.jsx`) presents an intentional 12-section sequence:
1. **Navigation:** Sticky header with logo, section links, and "Create Your Invitation" CTA.
2. **Hero:** Full-width hero background with editorial headline, subcopy, and featured invitation card.
3. **Brand Introduction:** "More Than an Invitation" editorial split with floral stationery photography.
4. **Invitation Design Gallery:** 6 collections with category filters and "Choose This Style" actions.
5. **Services:** 4 core capabilities: Digital Invitations, Event Pages, RSVP Management, Guest Coordination.
6. **How It Works:** 4-step client journey supported by flat-lay process stationery photography.
7. **Pricing:** 3 transparent packages (₹399, ₹899, ₹1,799) with inclusions and "Recommended" highlighting.
8. **Featured Invitation Preview:** Live showcase of the fictional Aarav & Meera Kerala wedding with demo RSVP and map actions.
9. **Why ORYNZA:** 4 values: Personal by Design, Elegant by Nature, Easy to Share, Organised for Your Day.
10. **Frequently Asked Questions:** Accessible 10-question accordion with honest capability disclosures.
11. **Contact & WhatsApp Enquiry:** Interactive form that synchronizes chosen packages and designs, generating a pre-filled WhatsApp message.
12. **Footer:** Brand logo, tagline, quick links, dynamic copyright year, and fictional sample disclaimer.

---

## 11. How to Edit Package Prices and Inclusions

Open `src/data/packages.js`:
```javascript
export const PACKAGES = [
  {
    id: 'essential',
    name: 'Essential Invite',
    price: 399,
    priceDisplay: '₹399',
    description: 'For a beautiful, straightforward digital invitation.',
    inclusions: [ ... ]
  },
  // ...
];
```
Prices, inclusions, and labels update automatically across cards, footnotes, and WhatsApp enquiries.

---

## 12. How to Add a New Gallery Design

1. Place the portrait mockup (1122×1402 px) in `public/assets/invitation-mockups/`.
2. Register the path in `src/config/assets.js`:
   ```javascript
   mockups: {
     myNewCollection: '/assets/invitation-mockups/design-my-new-collection.png',
   }
   ```
3. Add the design entry in `src/data/designs.js`:
   ```javascript
   {
     id: 'my-new-collection',
     name: 'My New Collection',
     category: 'romantic',
     categoryLabel: 'Romantic & Floral',
     description: 'A brief description of this style...',
     image: ASSETS.mockups.myNewCollection,
     alt: 'Descriptive accessible alt text'
   }
   ```

---

## 13. How to Replace an Image Safely

1. Never overwrite or delete files in `D:\ORYNZA\assets\`.
2. Place the replacement file in `public/assets/<folder>/`.
3. Update the corresponding key in `src/config/assets.js`.
4. Ensure dimensions match the target container (e.g., 1122×1402 for invitation mockups, 1672×941 for backgrounds).

---

## 14. How to Add a Video

1. Place the MP4 video in `public/assets/video/`.
2. Register the path in `src/config/assets.js`.
3. Use HTML5 `<video>` with `muted`, `playsInline`, `loop`, and provide an image poster fallback:
   ```jsx
   <video
     src={ASSETS.video.invitationReveal}
     poster={ASSETS.mockups.heroMockup}
     muted
     playsInline
     loop
     aria-hidden="true"
   />
   ```
4. Always wrap video playback in `@media (prefers-reduced-motion: no-preference)` to respect user preferences.

---

## 15. How to Create Another Demonstration Invitation

Open `src/data/invitations.js` and add a new slug entry:
```javascript
export const DEMO_INVITATIONS = {
  'kerala-celebration': {
    slug: 'kerala-celebration',
    isDemonstration: true,
    disclaimer: 'DEMONSTRATION INVITATION — FICTIONAL DETAILS',
    theme: 'ivory',
    mockupImage: ASSETS.mockups.timelessIvoryGold,
    couple: {
      partnerA: 'Naveen',
      partnerB: 'Lakshmi',
      parentsWording: 'With the blessings of our families',
      invitationText: 'invite you to join us on our special day.',
    },
    celebration: 'Wedding Celebration',
    dateDisplay: 'Sunday, 18 April 2027',
    venue: {
      name: 'Kovalam Beach Resort',
      city: 'Thiruvananthapuram, Kerala',
      address: 'Beach Road, Kovalam',
      isDemoMap: true,
    },
    events: [ ... ],
    rsvpConfig: {
      type: 'demo-modal',
      deadline: '18 March 2027',
    }
  }
};
```
The invitation is instantly viewable at `/invite/kerala-celebration`.

---

## 16. How to Configure an Invitation's RSVP Link

In production, each couple's invitation configuration in `src/data/invitations.js` can specify an external form URL (such as a Google Form):
```javascript
rsvpConfig: {
  type: 'google-forms',
  externalFormUrl: 'https://forms.gle/your-form-id',
  deadline: '15 January 2027'
}
```
If `externalFormUrl` is omitted or `type: 'demo-modal'`, the page renders the built-in demonstration modal clarifying that responses are simulated.

---

## 17. How the WhatsApp Enquiry Message Is Assembled

The enquiry form in `src/components/home/ContactSection.jsx`:
1. Validates `name` and a 10-digit Indian `phone`.
2. Reads the selected package (e.g. *Wedding Plus*) and selected design (e.g. *Botanical Sage*).
3. Assembles a structured message:
   ```text
   *ORYNZA Wedding Invitation Enquiry*
   ---------------------------------
   *Name:* Priya Nair
   *Contact:* 9876543210
   *Couple:* Aarav & Meera
   *Wedding Date:* 2027-02-15
   *Package:* Wedding Plus
   *Invitation Style:* Botanical Sage
   *Number of Functions:* 3 Functions
   *Additional Notes:* Looking for bilingual wording
   ---------------------------------
   Hi ORYNZA team! Please review my details and share the next steps.
   ```
4. URL-encodes the message and directs to `https://wa.me/918921993702?text=...`.

---

## 18. Features That Currently Require a Future Backend

The current system is a fast, secure local frontend application. The following features will require an external backend or cloud integration in future phases:
- **Database Storage:** Storing submitted enquiry forms on a private server.
- **Automated RSVP Dashboard:** Automatically writing guest responses to a database rather than utilizing configured Google Forms.
- **Client Login Portal:** Allowing couples to manage guest lists behind authenticated accounts.
- **Online Payment Processing:** Automated checkout gateway (current policy confirms terms and payments directly via WhatsApp).

---

## 19. Asset Audit & Status

All 24 expected visual assets are present, verified, and integrated:
- **Brand Assets:**
  - `brand/orynza_logo.png`: Verified genuine alpha transparency (colorType 6, RGBA). Used in Header, Footer, and stationery badges.
  - `brand/orynza-favicon-mark.png`: 1254×1254 px square mark, used as browser favicon.
- **Background Assets:**
  - `backgrounds/orynza-hero-desktop.png`: Integrated into Hero section with legibility gradient.
  - `backgrounds/orynza-pricing-background.png`: Integrated into Pricing section.
  - `backgrounds/orynza-contact-background.png`: Integrated into Contact section.
  - `backgrounds/orynza-site-background.png`: Available for general site surfaces.
- **Decorative Assets:**
  - `decorative/orynza-botanical-overlay.png`: Genuine alpha channel, integrated into Brand Intro.
  - `decorative/orynza-monogram-frame.png`: Genuine alpha channel, integrated into Invitation covers.
  - `decorative/orynza-sage-botanical.png`: Genuine alpha channel.
- **Invitation Mockups:**
  - All 6 gallery styles (`design-timeless-ivory-gold.png`, `design-botanical-sage.png`, `design-blush-romance.png`, `design-modern-minimal.png`, `design-traditional-indian..png`, `design-evening-reception.png`) plus `orynza-hero-invitation-mockup.png` are exactly 1122×1402 px portrait aspect ratio.
- **Supporting Assets:**
  - `supporting/orynza-process-details.png`: Integrated into How It Works.
  - `supporting/orynza-detail-floral.png`: Integrated into Brand Intro.
  - `supporting/orynza-social-share-preview.png`: Configured in Open Graph metadata.
  - `supporting/orynza-whatsapp-card.png`: Available for WhatsApp previews.
- **Video Assets:**
  - Four 10-second cinematic clips in `public/assets/video/` ready for selective playback.

---

## 20. Known Limitations

- **Frontend-Only Demonstrations:** RSVP submission and map destination buttons on sample invitations are explicitly labelled as demonstrations.
- **No Third-Party Tracker:** No cookies, trackers, or third-party analytics are bundled.
- **WhatsApp API:** Enquiries rely on WhatsApp Click-to-Chat (`https://wa.me/`). The client device or browser must have access to WhatsApp web or mobile.

---

*ORYNZA — Made for Moments That Matter.*
