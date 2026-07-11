# Product and implementation decisions

Last updated: 2026-07-11

## 2026-07-11 — Dedicated Documents page (`/documents`)

The previous build had a thin "Documents" FAQ block buried inside `/help` and a "Documents" link in the header that pointed at `/help#fees` — but the depth (status tracking, re-upload flow, per-category evidence, official specs) had no dedicated home. Added a new route `app/documents/page.js` with seven sections:

1. **Dark hero** with a generated PixVerse airport-counter background image, breadcrumb, heading, lead, and a sticky Application reference input pre-filled with the demo `IND-BIZ-26-7K92` so the page works without a real backend.
2. **Document Status Card** — a single large card with a 4-row grid: Passport bio page, Recent photograph, Category evidence, Travel confirmation. Each row has a generated flat-lay thumbnail, file name + size + uploaded-at meta, a status pill (Ready / Under review / Re-upload requested / Missing), and a per-row Replace file action that flips the row to "Under review" + shows a toast.
3. **Inline 16:9 video block** — 2160p Seedance 2.0 Standard loop (15 s, no audio) rendered with HEVC primary + H.264 fallback, the same pattern as the hero video.
4. **Official Specifications** — two-column reference (Passport bio page | Recent photograph) with the official spec values mirrored from `indianvisaonline.gov.in/visa/instruction.html` (JPEG 10–300 KB, 25–35 mm head height, etc.) plus a "common rejection reasons" callout per card.
5. **Per-category evidence** — six cards (e-Tourist / e-Business / e-Medical / e-Student or Family / e-Transit / e-Conference) with the category-specific document list.
6. **Re-upload walkthrough** — three numbered steps (Receive the email → Open the Re-upload tab → Submit the corrected file) with generated PixVerse mockup images.
7. **Documents FAQ** (8 items) + **Official support** block with the Re-upload tab deep-link and the SBI ePay / Axis Bank helpdesk numbers from the official site.

Header "Documents" nav, footer "Documents" link, `/apply` step-3 intro, and `/track`'s "Manage documents" action all retargeted from `/help#fees` / `/help` / `/apply` to `/documents`. The page also gets the global header + footer from `app/layout.js` automatically.

## 2026-07-11 — Header and footer lifted to root layout (global)

The previous build had every page file (`app/page.js`, `app/apply/page.js`, `app/eligibility/page.js`, `app/help/page.js`, `app/track/page.js`) importing and rendering its own `<SiteHeader />` and `<SiteFooter />`, and `/apply` carried a completely separate `<header className="app-header">` with different markup (no nav, just a secure-label + Exit link). `/eta/page.js` had no header at all. Result: the header and footer were inconsistent across pages and the apply page's special context was orphaned from the design system.

The root layout (`app/layout.js`) now imports `SiteHeader` and `SiteFooter` once and renders them around `{children}`, so every page gets the same persistent header and footer. The `/apply` page's secure-label and Exit-application affordance move into a thin `.apply-context` strip rendered at the top of `<main>` so the apply flow keeps its focused-workspace context without forking the header markup. `SiteHeader`'s `announcement` prop now has a default value so `app/layout.js` can render `<SiteHeader />` without arguments; per-page announcement overrides were removed.

## 2026-07-11 — Document checklist section removed from homepage

The "Core files first. Category evidence second." section (three ivory requirement cards + an advisory bar) sat between the culture gallery and the FAQ. The same information is already covered by the homepage hero trust strip, the "Check your route" card, the eligibility page, and the FAQ — so the section was redundant visual weight. Deleted the `<section className="section requirements-section" id="requirements">` block from `app/page.js` and dropped the `.requirements-section / .requirement / .requirement-num` rules from `globals.css`. The "Documents" nav link in `SiteHeader` and the "Documents" footer link in `SiteFooter` were retargeted from the deleted `/#requirements` anchor to `/help#fees` and `/help` respectively so the navigation stays useful.

## 2026-07-11 — Culture gallery converted to single-image carousel

The culture-gallery section used a static 3-tile grid (one large Bengaluru tile + two small tiles for Kerala and Jaipur). Converted it to an Instagram-style single-image carousel: the three slides share one container, only the active slide is visible, the carousel auto-advances every 5.5s, and a small dot indicator sits in the bottom-right corner of the image. State (`galleryIndex`) and timer (a second `useEffect`) follow the same `prefers-reduced-motion` pattern as the visa-categories slideshow. The new container is `position: relative; min-height: 520px; overflow: hidden`; each slide is absolutely positioned with `opacity: 0` and `.active { opacity: 1 }` (`.9s` ease). The dot indicator is a glass pill with three 7×7 px circles. Uses the same three PixVerse stills (`bengaluru-blue-hour.png`, `kerala-backwaters.png`, `jaipur-craft.png`).

## 2026-07-11 — Apply flow progress stepper fixed

The 5-step progress strip on `/apply` (Category / Details / Documents / Payment / Review) had the per-step connector line at `top: 14px` while the labels sat next to each dot via flex `align-items: center` — so the connector ran straight through the labels' vertical center, making the numbers and label text visually collide. Switched each `.progress-item` to `flex-direction: column; align-items: center; gap: 10px` (dot on top, label below) and moved the connector into a single shared `.progress:before` pseudo-element on the parent `.progress` so it runs at the dot's vertical center across all items. Old per-item `:after` connector rules were removed from both desktop and mobile breakpoints. Numbers now sit cleanly inside the 29px dots with labels below them, exactly as the standard stepper pattern.

## 2026-07-11 — Header nav and action buttons on a single horizontal row

The earlier two-row stack was a wrong interpretation of "centre the header". The user clarified that nav links and the Track / Start buttons should sit side-by-side on one row, centred as a single group between the BOI logo (left) and the eVisa logo (right). Reverted `.header-center` from `flex-direction: column` back to the default row, removed the `width: 100%` override on `.nav-links` and `.nav-actions`, and inserted a thin `.nav-divider` between the nav group and the action group so the visual separation reads without a vertical line in the markup. `.header-center` now wraps with `flex-wrap: wrap` so narrow viewports degrade cleanly into two rows.

## 2026-07-11 — Proof / trust strip removed from the homepage

The four-item trust bar (eVisa categories / Core process steps / Recovery built in / Transparent payment) sat between the hero and the "Check your route" card and added visual noise without earning its space — every claim it made is already covered by adjacent sections. Removed the `<section className="proof-strip">` block from `app/page.js` and dropped the `.proof-strip / .proof-grid / .proof-item / .proof-icon` rules and their mobile overrides from `globals.css`. The four India-motif SVGs (`trust-lotus`, `trust-wheel`, `trust-fern`, `trust-diya`) remain on disk in `public/images/` so they can be repurposed later without re-generating them.

## 2026-07-11 — Visa-categories section now a 4-image auto slideshow

The "Visa categories" section previously used a single static background image (`india-beauty-hero.png`). Replaced it with a 4-image auto-advancing crossfade slideshow showing four distinct sides of India: Kerala backwaters at dawn (asset `412968202075121`), Mehrangarh Fort at warm afternoon (`412968204076572`), Mumbai Marine Drive at blue hour (`412968206205935`) and Varanasi ghats at first light (`412968208359251`). All four generated via PixVerse `gemini-3.1-flash` at 2160p / 16:9 / seed `413000001–413000004`, downloaded as 5504×3072 PNGs into `public/images/category-slide-{1..4}.png`. The slideshow is driven by a single `useState`/`useEffect` interval in `app/page.js` (7s per slide, 1.2s fade) and respects `prefers-reduced-motion` by skipping the timer entirely. The warm beige overlay on top of the slides stays unchanged so the category cards remain readable. The old `.category-section:before` single-image rule was replaced with proper layered elements (`.category-slideshow > .category-slide × 4 + .category-overlay`) and `isolation: isolate` keeps the slideshow's stacking context from leaking into adjacent sections.

## 2026-07-11 — Hero upgraded to 2160p / 15s Seedance 2.0 Standard

The user asked for a better 2160p / 15s hero loop. Replaced the 1920×1080 Seedance 2.0 generation with a new Seedance 2.0 Standard at 3840×2160 (true 4K / 2160p), 15s, 16:9, no audio (asset `412965404185381`). The matching still was regenerated at 5504×3072 with `gemini-3.1-flash` (asset `412965436220959`) so the homepage poster and the visa-categories section background stay coherent. HEVC is the primary source; an H.264 fallback at the same 3840×2160 is generated locally with ffmpeg for browsers that don't decode HEVC (Safari, older Firefox).

## 2026-07-11 — Hero text and card vertically centred

The hero left column previously sat flush-bottom (`align-items: end`); the floating `Choose your route` card on the right looked vertically detached. Switched `.hero-content` to `align-items: center` and added a `.hero-text` wrapper that centres the eyebrow, h1, lead, CTAs and trust strip within their column. The card stays right-aligned with `align-self: center`.

## 2026-07-11 — Header nav and actions stacked into two centred rows

The header centre cell had nav links and two action buttons in a single horizontal flex row that pushed left when the row got wide. Switched `.header-center` to `flex-direction: column` and gave `.nav-links` and `.nav-actions` `width: 100%` so each row independently fills and centres within the centre cell. Mobile breakpoints still collapse to the hamburger pattern unchanged.

## 2026-07-11 — Trust bar separators removed; icons re-centred

The proof strip had a `border-right` between every item and a `border-bottom` on the strip itself. Removed all separator rules. Replaced the icon container's `display: grid; place-items: center` with `display: flex; align-items: center; justify-content: center` so the SVG stays centred regardless of its aspect ratio. Each item is now `justify-content: center` so icon + label group sits centred in its cell.

## 2026-07-11 — Custom dropdown bug fix

The two `CustomDropdown`s in the "Check your route" card were not opening when clicked. Root cause: `.quick-start` had `overflow: hidden` (originally to clip the rounded corners) which trapped the absolutely-positioned `.drop-menu` inside the card. Fixed by switching `.quick-start` and `.quick-form` to `overflow: visible`, adding `isolation: isolate` to `.quick-start` (and `.drop`) so the menu establishes a clean stacking context, and raising `.drop-menu` z-index to 60 so it sits above any sibling stacking context. No JS change — the `open` state and document-click handler were already correct.

## 2026-07-11 — Category-first homepage supersedes business-only framing

The brief and `AGENTS.md` previously framed the product as a normal e‑Business flow. After a question round, the user confirmed that the official service is not business-only and the redesign must show tourist, business, medical, medical attendant, student, family, transit and conference routes from the homepage. The homepage, route checker and `app/apply/page.js` were reworked to start with category selection while preserving the exact business-route rules (365-day validity, multiple entry, continuous stay up to 180 days per visit) wherever the user eventually chooses business.

## 2026-07-11 — Header carries two logos; emblem lives in the footer

`AGENTS.md` previously wanted three government logos in the header. The user said the header was getting crowded and asked for a cleaner layout. The user then refined this to: BOI on the left, eVisa on the right, both clickable to the official sites, no visible text labels next to the logos. The Government of India emblem moved to the footer brand column. Centered nav plus Track/Start buttons remain between the logos. The apply page header (`.app-header`) follows the same left/right structure with a centered secure-label and an Exit link.

## 2026-07-11 — Custom dropdown replaces native select on the homepage route checker

Native browser dropdowns looked default and broke the theme. A small `CustomDropdown` component was added in `app/components/` and used for the homepage Passport-nationality and Reason-for-travel selects. Native selects in the application form keep their OS-native open state because their visuals are not the hero UI; their closed state is forced themed via `.field select` CSS.

## 2026-07-11 — Visa categories section now carries a subtle media overlay

The “Visa categories” section was visually flat. A `::before` pseudo-element now paints the `india-beauty-hero.jpg` with a warm beige gradient overlay so cards stay readable while still benefiting from the visual warmth of the same image used in the hero.

## 2026-07-11 — Culture gallery upgraded from one image to three

What used to be a single Bengaluru tile is now a 3-image editorial gallery: large Bengaluru with “India moves at many speeds,” small Kerala with “India begins gently,” and small Rajasthan/Jaipur with “India remembers every detail.” Each card carries its own caption and location tag.

## 2026-07-11 — Continue-or-manage section removed from the homepage

The “Continue or manage” recovery-actions grid was removed from the homepage at the user's request. The recovery actions themselves remain available where they belong: Track (`/track`) and Apply (`/apply`) already expose the continue/pay/reupload actions in their actual context.

## 2026-07-11 — Document checklist background separated from neighbours

The Document checklist section now sits on warm ivory (`#fffaf0`) with ivory-tinted cards (`#fffdf8`) so it breaks rhythm with the surrounding beige soft section and the dark green official lifecycle section instead of melting into either neighbour.

## 2026-07-11 — India-centric icons in the proof bar

The old `9 / 4 / ↺ / ₹` text symbols were replaced by India-motif icon SVGs (lotus, Ashoka wheel, leaves, diya). Every icon is rendered as a real SVG tile at the same 46×46 px size so they read as intentional illustration rather than as raw OS glyphs.

## 2026-07-11 — Discover India scroll cue removed from the hero

The previous side-rotated “Discover India” text cue was removed because it overlapped the visa card on small screens and did not earn its visual weight against the now-strong video.

## 2026-07-11 — India-beauty looping video replaces Gateway of India

The user rejected a Gateway of India hero loop. The replacement is an India-beauty montage generated with `seedance-2.0-standard` at 1080p, 15s, 16:9, no audio; the static poster is a still from the same prompt. Asset and seed are recorded in `status/media-status.md`.

## 2026-07-11 — Do not invent a fixed fee

Indian eVisa fees are country/territory-specific. The payment step states that the applicable amount is calculated by nationality and discloses the transaction charge.

## 2026-07-11 — Destination-led public site, task-led application

The landing page uses full-bleed PixVerse media; the application removes decorative imagery and uses a restrained workspace.

## 2026-07-11 — Digital ETA with accurate arrival language

The product presents a mobile-ready ETA but still tells travellers to carry the matching passport and present the ETA at immigration.

## 2026-07-11 — No `npm audit fix --force`

`npm audit` flags `postcss < 8.5.10` through the bundled Next.js dependency. Running `npm audit fix --force` proposes a downgrade to `next@9.3.3`, which is unacceptable. Track this rather than silence it.

## 2026-07-11 — No push without explicit per-session approval

Jayant approved autonomous work for the home/header footer/trust dropdown applications changes, but explicitly forbade any GitHub push before he reviews and instructs push in the current session. Working tree should remain dirty with the approved draft until he gives the push instruction.

## See also

- `01-project-overview.md`
- `gotchas/content-accuracy.md`
- `status/global.md`
- `../process.md`
