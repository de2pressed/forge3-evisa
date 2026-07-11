# Website status

Last updated: 2026-07-11

## State: `green` — header / category-show / trust-bar / hero all updated.

## Implemented this session (2026-07-11 fourth pass)

- Dedicated `/documents` route added: 7 sections (dark hero with Application reference input, Document status card with 4 mock-uploaded rows, inline 2160p Seedance video, official specifications for passport + photo, per-category evidence for 6 routes, re-upload walkthrough, 8-item FAQ, official support card). Header "Documents" nav, footer "Documents" link, /apply step-3 intro and /track "Manage documents" action all retargeted to `/documents`.
- 8 new stills via PixVerse `gpt-image-2.0` 2160p (assets `412976470064949` … `412976486107991`, seeds `413100001–413100008`): page hero, 4 document mockup thumbnails, 3 re-upload walkthrough steps.
- 1 new video via PixVerse Seedance 2.0 Standard 2160p 15s (asset `412976846616406`, seed `413200001`): documents page inline loop, HEVC primary + H.264 fallback.
- `app/documents/page.js` added. `app/globals.css` grew `.docs-*` styles. agent-docs updated: `decisions.md` (new dated entry), `02-component-map.md` (media rows), `media-status.md` (asset log), `status/global.md` (component state), `status/website-status.md` (fourth-pass section).

## Implemented this session (2026-07-11 third pass)

- Document checklist section removed from the homepage (the three ivory requirement cards + advisory bar). "Documents" nav links retargeted from the deleted `/#requirements` anchor to `/help#fees` (header) and `/help` (footer).
- `/apply` progress stepper fixed: each step now renders as a vertical column (dot on top, label below) with a single shared `.progress:before` connector at the dot's vertical center. Numbers no longer overlap labels.
- Header and footer lifted to root layout (`app/layout.js` now renders them around `{children}`). Every page file stripped its inline header/footer. `/apply` keeps its secure-label + Exit-application affordance via a new `.apply-context` strip at the top of its `<main>`. `/eta/page.js` (previously without any chrome) now gets the same global header + footer.
- Culture gallery converted to a single-image Instagram-style carousel (Bengaluru → Kerala → Jaipur). 5.5s auto-advance with a dot indicator in the bottom-right corner; respects `prefers-reduced-motion`.

## Implemented this session (2026-07-11 follow-up)

- Header reverted to a single horizontal row: nav links and the Track / Start buttons sit side-by-side with a thin `.nav-divider` between them, centred as one group between the BOI logo (left) and the eVisa logo (right).
- Trust / proof strip removed from the homepage entirely (JSX + CSS for `.proof-strip`, `.proof-grid`, `.proof-item`, `.proof-icon` plus their mobile rules). The hero is now followed directly by the "Check your route" card.
- Visa-categories section background replaced with a 4-image auto-advancing crossfade slideshow (Kerala dawn → Mehrangarh Fort → Mumbai Marine Drive → Varanasi ghats). Each image is a 5504×3072 PNG generated via PixVerse `gemini-3.1-flash` (seeds `413000001–413000004`). 7s per slide, 1.2s fade, respects `prefers-reduced-motion`.

## Previously implemented this session (still in effect)

- 3-column header grid (BOI left, nav+actions centre, eVisa right); centred hero (`.hero-content` `align-items: center`, `.hero-text` wrapper).
- 2160p / 15s Seedance 2.0 Standard hero loop + H.264 fallback; matching 2160p hero poster.
- Themed dropdown fix (overflow + isolation + z-index).

## Previously implemented

- Responsive destination-led landing page.
- Category route checker.
- Five-step application with local interaction states.
- Eligibility information page.
- Help centre with accordion answers.
- Reference-based status timeline and recovery card.
- Approved digital ETA and arrival checklist.
- Shared header/footer and mobile navigation.

## Intentionally not implemented

- Backend persistence or user accounts.
- Real eligibility computation.
- File upload service or OCR.
- Payment-gateway integration.
- Government submission or status API.
- Email and downloadable PDF generation.

## Pending

- User walk-through of the apply flow at `/apply`.
- User review of the redesigned header / hero / trust bar.
- Push instruction.

## See also

- `global.md`
- `../02-component-map.md`
- `../gotchas/content-accuracy.md`
