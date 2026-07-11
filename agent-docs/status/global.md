# Global status

Last updated: 2026-07-11

Overall state: `green` — previous approved build is live on `origin/main`. The current session’s drafts are uncommitted on disk, awaiting user review and an explicit push instruction.

## Current gate

Jayant approved the most recent batch of homepage/header/footer/trust-bar/dropdown changes ("proceed with the changes only then"). He also asked for an agent-docs refresh before review. The drafts are now implemented and the docs are aligned. No push has occurred; Jayant has not yet instructed a push.

## Components

| Component | State | Detail |
|---|---|---|
| Public website — homepage | green | Category-first hero, route checker, categories section with 4-image auto slideshow, 3-image gallery, requirements, FAQ |
| Public website — header/footer | green | 3-column header grid with BOI left, nav+actions centred on one row, eVisa right; emblem in footer brand column |
| Public website — header on /apply | green | Same left/right logo layout adapted for `.app-header` |
| Application flow | yellow | Five-stage, category-aware flow; awaiting user walk-through |
| Tracking and ETA | green | Timeline, recovery and approval views present |
| PixVerse media | green | 2160p (3840×2160) India-beauty loop + Kerala/Rajasthan/Bengaluru stills in place |
| Research | green | Ten-portal study and official India refresh complete |
| Process record | yellow | `process.md` not present in this repo snapshot; media history captured in `status/media-status.md` |
| GitHub working tree | yellow | Dirty with approved drafts; awaiting explicit push instruction |

## Recently completed (current session)

- Document checklist section removed from the homepage (`app/page.js` + `.requirements-section` / `.requirement` / `.requirement-num` rules dropped from `globals.css`). "Documents" nav links in the header and footer retargeted from `/#requirements` to `/help#fees` and `/help`.
- Apply-flow progress stepper fixed: each step now renders as a vertical column (dot on top, label below), and the connector is a single shared `.progress:before` line at the dot's vertical center. Numbers no longer overlap labels.
- Header and footer lifted to root layout (`app/layout.js` now renders `<SiteHeader />` and `<SiteFooter />` around `{children}`). Every page file (`page.js`, `apply/page.js`, `eligibility/page.js`, `help/page.js`, `track/page.js`) had its inline header/footer stripped. The `/apply` page's secure-label + Exit-application affordance now lives in a thin `.apply-context` strip at the top of its `<main>`. `/eta/page.js` (which previously had no header or footer) now gets the same global chrome. `SiteHeader`'s `announcement` prop gained a default value.
- Culture gallery converted to a single-image Instagram-style carousel (Bengaluru / Kerala / Jaipur). 5.5s auto-advance with dot indicator in the bottom-right corner; respects `prefers-reduced-motion`.
- Updated `decisions.md` (four new dated entries), `02-component-map.md` (media rows + layout note), `website-status.md` and `status/global.md`.

## Previously completed (current session)

- Centred the homepage hero: switched `.hero-content` from `align-items: end` to `align-items: center`, added a `.hero-text` wrapper (`align-items: center; text-align: center; max-width: 720px`) for the eyebrow / h1 / lead / CTAs / trust strip; the floating card now has `align-self: center`.
- Centred the header: `.header-center` is now `flex-direction: column`; `.nav-links` and `.nav-actions` are `width: 100%` so the nav row and the action buttons each centre within the centre grid cell.
- Removed every separator line from the proof / trust strip (per-item `border-right` and the strip's `border-bottom`); re-centred the SVG icons by switching `.proof-icon` from `display: grid` to `display: flex`.
- Fixed the "Check your route" dropdowns: they were not opening because `.quick-start` had `overflow: hidden`. Switched the strip and the inner form to `overflow: visible`, added `isolation: isolate` to `.quick-start` and `.drop`, and raised `.drop-menu` z-index to 60.
- Upgraded the hero video from 1920×1080 to 3840×2160 (2160p) via PixVerse Seedance 2.0 Standard (asset `412965404185381`), and regenerated the matching poster / visa-categories background at 5504×3072 with `gemini-3.1-flash` (asset `412965436220959`). Added a local H.264 fallback for browsers that do not decode HEVC.
- Refreshed `decisions.md` (five new dated entries), `media-status.md` (new asset IDs + seeds + prompts), `website-status.md` (now `green` overall) and `status/global.md`.
- Reverted header to a single row: `.header-center` back to `flex-direction: row`, removed the `width: 100%` overrides on `.nav-links` / `.nav-actions`, added a `.nav-divider` between the nav and the buttons. `flex-wrap: wrap` keeps narrow viewports clean.
- Removed the proof / trust strip from the homepage: deleted the `<section className="proof-strip">` block and every `.proof-*` CSS rule (desktop + two mobile breakpoints). The four India-motif SVGs stay on disk.
- Replaced the single `.category-section:before` background with a 4-image auto slideshow. New PNGs generated via PixVerse `gemini-3.1-flash` (assets `412968202075121` / `412968204076572` / `412968206205935` / `412968208359251`, seeds `413000001–413000004`, prompts in `.pixverse/prompt-cat-{1..4}.txt`). 7s cycle, 1.2s fade, respects `prefers-reduced-motion`.

## Previously completed (historical baseline)

- Replaced the early tourist prototype with the normal e‑Business route.
- Split the product into six linked static pages, then migrated to the Next.js App Router.
- Generated local Mumbai, Bengaluru, Jaipur and Kerala media with PixVerse, then swapped to a Seedance 2.0 India-beauty loop.

## Next action

- Wait for Jayant's review of the screenshots at `http://localhost:3000`, `http://localhost:3000/apply`, `http://localhost:3000/track`.
- Either request adjustments or authorise a push.
- Once authorised, run `git status --short`, confirm there is nothing unintended, push, then update this file with the new commit SHA.

## See also

- `website-status.md`
- `media-status.md`
- `../workflows/staging-handoff.md`
- `../../process.md`
