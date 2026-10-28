# ORYNZA Common Assets Library

This directory serves as the centralized repository for shared, multi-template visual assets across all ORYNZA invitation suites.

---

## Asset Catalog

### 1. `orynza-logo.png`
- **Relative Path**: `src/templates/common assets/orynza-logo.png`
- **Asset Category**: Brand Identity & Atelier Mark
- **Verified Format**: PNG (Portable Network Graphics)
- **Verified Dimensions**: 2172 × 724 px
- **Aspect Ratio**: 3:1 (exact)
- **Alpha Transparency**: Yes (RGBA with full 8-bit alpha channel, 0 to 255)
- **Main Colors**:
  - Deep Bronze Ochre / Gold: `#863A00` / `#873B00`
  - Pure White highlight: `#FFFFFF`
- **Visual Subject & Style**: Official ORYNZA luxury serif wordmark and emblem; refined, high-contrast, scalable.
- **Intended Usage**: Header navigation bar (top-left brand lockup), modal headers, email templates, and official footer banners.
- **Recommended Background & Contrast**: Ivory (`#F8E9DF`, `#F8F5EF`), Champagne (`#F2D7C6`), or Dark Charcoal (`#1E1D19`) with high readability.
- **Responsive Guidance**: Render with a display width of 120–160 px and height of 40–54 px (`aspect-ratio: 3 / 1`). Always provide `alt="ORYNZA Atelier"`.
- **First Introduced**: Master Brand Atelier / `WED-001`
- **Suitability for Reuse**: Global (all categories and templates).
- **Source & Provenance**: Official brand asset from `D:/ORYNZA/assets/brand/orynza_logo.png`. ORYNZA proprietary trademark.

---

### 2. `royal-floral-frame.png`
- **Relative Path**: `src/templates/common assets/royal-floral-frame.png`
- **Asset Category**: Decorative Border & Overlay
- **Verified Format**: PNG (Portable Network Graphics)
- **Verified Dimensions**: 1448 × 1086 px
- **Aspect Ratio**: 4:3 (approx. 1.333:1)
- **Alpha Transparency**: Yes (RGBA with full 8-bit alpha channel, 0 to 255)
- **Main Colors**:
  - Charcoal / Sepia line work: `#1A1412` / `#000000`
  - Soft Blush Cream fill: `#F2E4D5`
  - Subtle Gold accents: `#D5AC78`
- **Visual Subject & Style**: Classical botanical and floral stationery border featuring Indian wedding marigolds, roses, and ornamental foliage.
- **Intended Usage**: Hero transition overlays, RSVP card decorative accents, Section dividers, and closing gratitude frames.
- **Recommended Background & Contrast**: Best blended on light ivory (`#F8E9DF`), blush (`#F5E0D2`), or layered over sunset photography with `mix-blend-mode: multiply` and `opacity: 0.25–0.45`.
- **Responsive Guidance**: Must always be set with `pointer-events: none` and `aria-hidden="true"`. Scale using `object-fit: cover` or corner anchoring.
- **First Introduced**: `WED-001` (Royal Lake Palace)
- **Suitability for Reuse**: High (Wedding `WED`, Engagement `ENG`, Anniversary `HOM`).
- **Source & Provenance**: Custom bespoke ORYNZA invitation stationery asset created for `WED-001`.

---

## Library Conventions & Guidelines

1. **Format Standards**: Transparent decorative overlays must be genuine 8-bit or 16-bit RGBA PNGs. Opaque scenic photographs should be web-optimized RGB PNG or WebP.
2. **Template Separation**: Template-specific photographs (couple portraits, specific venue landmarks, celebration panels) remain in their respective category directory (e.g. `src/templates/categories/WED/WED-001/assets/`).
3. **Accessibility**: All decorative overlays must specify `pointer-events: none` and `aria-hidden="true"` so they never intercept pointer interactions or confuse screen readers.
4. **Official Logo Requirement**: Every template header must display the official ORYNZA brand mark in the top-left navigation. A copy must exist in the template's local asset directory to ensure self-contained portability.

---

## Change History

- **2026-10-28**: Initialized Common Assets Library. Added verified official brand mark `orynza-logo.png` (2172 × 724 px) and reusable botanical stationery frame `royal-floral-frame.png` (1448 × 1086 px) with comprehensive metadata and responsive specifications.
