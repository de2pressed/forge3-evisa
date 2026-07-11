# Component and page map

Last updated: 2026-07-11

## Stack

- **Framework**: Next.js 16.2 App Router (JavaScript)
- **Layout**: Root layout (`app/layout.js`) imports `SiteHeader` and `SiteFooter` and renders them around `{children}`, so every page under `/` gets the same persistent header and footer. Pages render only their own `<main>` content. The `/apply` page additionally renders a thin `.apply-context` strip at the top of its `<main>` to surface the secure-label and Exit-application affordance without forking the header markup.
- **Styling**: Tailwind CSS v4 with `@theme` tokens + ported vanilla CSS in `app/globals.css`
- **State**: React hooks (`useState`, `useEffect`, `useRef`); `localStorage` markers for simulated persistence
- **Routing**: Next.js App Router (`app/` directory)

## Public pages

| Route | File | Responsibility | Main next action |
|---|---|---|---|
| `/` | `app/page.js` | Category-first landing, hero video, route checker, category cards, official lifecycle steps, culture gallery, requirements, FAQ, CTA | Start application |
| `/eligibility` | `app/eligibility/page.js` | Passport, purpose, documents, timing and eVisa limits | Start application |
| `/help` | `app/help/page.js` | FAQs for start, documents, fees, payment, tracking, arrival | Track or apply |
| `/track` | `app/track/page.js` | Reference lookup, event timeline, recovery card | Manage documents / view ETA |
| `/eta` | `app/eta/page.js` | Approved ETA template and arrival checklist | Save ETA |
| `/apply` | `app/apply/page.js` | Category-aware five-stage application with shared `SiteFooter` | Submit application |

## Application

`app/apply/page.js` runs a five-stage client-side flow. Every step label is generic enough to cover all categories while still surfacing category-specific evidence in step 3:

1. Category.
2. Details.
3. Documents.
4. Payment.
5. Review.

Step navigation, upload state, fee-consent gating, submission confirmation and toast messages are handled by React hooks within the component. Native `<select>` elements are preserved inside the form because their open state is not the primary visual focus and `CustomDropdown` is reserved for the homepage route checker.

## Shared components

| Component | File | Purpose |
|---|---|---|
| `SiteHeader` | `app/components/SiteHeader.js` | Announcement bar + grid header with BOI logo (left), nav+actions (center), eVisa logo (right); mobile menu toggle. Rendered once by the root layout. |
| `SiteFooter` | `app/components/SiteFooter.js` | Full footer carrying the Government of India emblem in the brand column; `minimal` variant retained for future use. Rendered once by the root layout. |
| `CustomDropdown` | `app/components/CustomDropdown.js` | Themed dropdown (themed background, hover sand, selected sage) replacing the browser-native select on the homepage route checker |
| `Accordion` | `app/components/Accordion.js` | Expandable FAQ/help sections |
| `Toast` | `app/components/Toast.js` | Global notification system via `window.__forgeToast` |

## Shared styles

`app/globals.css` declares colour tokens via Tailwind v4 `@theme`, then styles every section by hand in classical CSS so all original class names (`hero`, `proof-strip`, `quick-start`, `cta-band`, `feature-grid`, `requirements`, `culture-gallery`, `category-section`, `requirements-section`, `footer-grid` …) keep working. Custom additions in this iteration:

- `.official-nav` (3-column grid: left logo · center nav+actions · right logo).
- `.header-logo` and `.header-logo-left/.header-logo-right` for the framed logo slots.
- `.category-section` with a soft India-beauty background image and warm overlay.
- `.culture-gallery` (3-image editorial grid: main + 2 small).
- `.requirements-section` (warm ivory document checklist block) with `.requirements-section .requirement` cards in ivory rather than default white.
- `.drop` + `.drop-button` + `.drop-menu` + `.drop-item` for the themed dropdown.
- `.field select` forced theming (custom arrow, border, hover, focus) to style native selects everywhere they are kept.

## Media

| File | Source | Use |
|---|---|---|
| `public/video/india-beauty-loop.mp4` | PixVerse Seedance 2.0 Standard | 3840×2160 (2160p), 15s, 16:9, no audio — homepage hero loop, HEVC primary |
| `public/video/india-beauty-loop-1080p.mp4` | Local ffmpeg transcode | 3840×2160, 15s, H.264 — browser fallback for Safari/Firefox |
| `public/video/documents-loop.mp4` | PixVerse Seedance 2.0 Standard | 3840×2160 (2160p), 15s, 16:9, no audio — documents page inline loop, HEVC primary |
| `public/video/documents-loop-1080p.mp4` | Local ffmpeg transcode | 3840×2160, 15s, H.264 — documents page browser fallback |
| `public/images/india-beauty-hero.png` | PixVerse still | Homepage hero poster; reused as visa-categories background source |
| `public/images/doc-hero.jpg` | PixVerse `gpt-image-2.0` | Documents page hero background image, 3840×2160 |
| `public/images/doc-passport-mockup.jpg` | PixVerse `gpt-image-2.0` | Document status card — Passport bio page thumbnail |
| `public/images/doc-photo-mockup.jpg` | PixVerse `gpt-image-2.0` | Document status card — Recent photograph thumbnail |
| `public/images/doc-invitation-mockup.jpg` | PixVerse `gpt-image-2.0` | Document status card — Category evidence thumbnail |
| `public/images/doc-flight-mockup.jpg` | PixVerse `gpt-image-2.0` | Document status card — Travel confirmation thumbnail |
| `public/images/doc-reup-step1.jpg` | PixVerse `gpt-image-2.0` | Re-upload walkthrough step 1 (email inbox mockup) |
| `public/images/doc-reup-step2.jpg` | PixVerse `gpt-image-2.0` | Re-upload walkthrough step 2 (re-upload form mockup) |
| `public/images/doc-reup-step3.jpg` | PixVerse `gpt-image-2.0` | Re-upload walkthrough step 3 (success confirmation mockup) |
| `public/images/bengaluru-blue-hour.png` | PixVerse Nano Banana 2 | Culture gallery carousel (Bengaluru slide) |
| `public/images/kerala-backwaters.png` | PixVerse Nano Banana 2 | Eligibility page hero + culture gallery carousel (Kerala slide) |
| `public/images/jaipur-craft.png` | PixVerse Nano Banana 2 | Culture gallery carousel (Jaipur slide) |
| `public/images/category-slide-1.png` … `-4.png` | PixVerse `gemini-3.1-flash` | Visa-categories section slideshow (4 stills, 7s cycle) |
| `public/images/official/boi_logo_1.png` | User attachment | Public header left + apply header left |
| `public/images/official/emblem.png` | User attachment | Public footer brand column |
| `public/images/official/e-visa-logo.png` | User attachment | Public header right + apply header right |
| `public/images/trust-lotus.svg`, `trust-wheel.svg`, `trust-fern.svg`, `trust-diya.svg` | Hand-written SVG | India-motif icon set (no longer in active use; retained on disk for potential reuse) |

The previous Gateway of India video and poster were replaced by India-beauty media after the user rejected the initial Gateway look.

## External dependencies

Next.js, React, Tailwind CSS (dev dependencies). No runtime API dependencies. Official resources are normal outbound links. Media is stored locally in `public/`.

## See also

- `01-project-overview.md`
- `status/website-status.md`
- `status/media-status.md`
- `workflows/pixverse-assets.md`
