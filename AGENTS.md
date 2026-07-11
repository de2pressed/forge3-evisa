# Forge eVisa agent entry point

Last updated: 2026-07-11

## Project in one sentence

Forge eVisa is a cinematic, category-first Next.js App Router prototype for India's full eVisa lifecycle: understand eligibility → choose category → apply → upload documents → pay fee → submit → track → receive ETA. The homepage leads with category selection, not with a single business route.

## Task router

| If the task is… | Read first |
|---|---|
| Understand the product, audience or brief | `agent-docs/01-project-overview.md` |
| Change landing-page UI or visual language | `agent-docs/decisions.md`, `agent-docs/status/website-status.md` |
| Change visa content, eligibility or fees | `agent-docs/gotchas/content-accuracy.md`, `app/eligibility/page.js` |
| Change application flow or interactions | `agent-docs/02-component-map.md`, `app/apply/page.js`, `app/components/CustomDropdown.js` |
| Change shared header or footer logos | `app/components/SiteHeader.js`, `app/components/SiteFooter.js` |
| Generate or replace PixVerse media | `agent-docs/workflows/pixverse-assets.md` |
| Prepare a GitHub push | `agent-docs/status/global.md`, `agent-docs/workflows/staging-handoff.md` |
| Continue an unfinished task | `agent-docs/status/global.md` |
| Find research or provenance | `agent-docs/reference/reports-index.md` |

## Standing rules

1. Category-first, not business-only. The official eVisa service covers tourist, business, medical, medical attendant, student, family, transit, conference and specialist routes. The product's flow must start with the category.
2. Preserve the normal e‑Business contract wherever it remains: 365-day validity from ETA grant, multiple entry, continuous stay up to 180 days per visit, apply minimum 4 days before arrival (and up to 120 days ahead).
3. Do not invent an exact fee. The official amount is nationality/category-specific; disclose applicable transaction charges and the no-emergency-fee advisory.
4. Treat Indian Visa Online and Bureau of Immigration as authoritative for policy. Research notes are a synthesis, not a substitute for rechecking changed rules.
5. Keep public navigation shallow: Home, Eligibility, Documents, Help, Track and Apply.
6. Do not call the customer-facing product a demo or prototype in website copy.
7. Header carries two official logos only (BOI left, eVisa right); the third (Government of India emblem) sits in the footer brand column. No visible logo text labels in the public header.
8. Keep cinematic media grounded, recognisably Indian and loopable. No fantasy architecture, no invented official branding.
9. Preserve the recoverable lifecycle: saved progress, theme-matched dropdowns, clear upload states, trackable review and exact re-upload action.
10. Never place credentials, PixVerse auth tokens or private data in repository documentation.
11. Existing uncommitted work belongs to the user. Inspect status and do not discard it.

## Critical paths

- Home page: `app/page.js`
- Application: `app/apply/page.js`
- Eligibility: `app/eligibility/page.js`
- Help centre: `app/help/page.js`
- Tracking: `app/track/page.js`
- Digital ETA: `app/eta/page.js`
- Root layout: `app/layout.js`
- Global styles: `app/globals.css`
- Shared components: `app/components/` (`SiteHeader`, `SiteFooter`, `Accordion`, `Toast`, `CustomDropdown`)
- Media: `public/images/`, `public/video/`
- Live work status: `agent-docs/status/global.md`

## Architecture summary

Next.js App Router application (Next 16 / React 19 / Tailwind v4) with most interactive components marked `'use client'`. The global design system lives in `app/globals.css` with colour tokens declared via Tailwind v4 `@theme` and brand styles declared in classical CSS (`SiteHeader`, `SiteFooter`, hero, sections, application pages, ETA, track, modal, toast, accordion).

Shared components live in `app/components/`:

- `SiteHeader` (announcement bar + grid header with BOI logo left, nav+actions centered, eVisa logo right).
- `SiteFooter` (full footer carrying the Government of India emblem in the brand column, and a minimal variant used by the apply page).
- `CustomDropdown` (themed dropdown used by the route checker; native selects remain in `app/apply/page.js` and form selects without dropdown controls).
- `Accordion` (FAQ/help expansion).
- `Toast` (global notification system via `window.__forgeToast`).

There is no backend, identity service, real eligibility engine, upload endpoint, payment processor or email delivery.

### Stack

- **Framework**: Next.js 16.2 App Router, React 19, JavaScript (`.js` client components).
- **Styling**: Tailwind CSS v4 + hand-written `app/globals.css` covering all original class names plus custom official-header, gallery, requirements-section, category-section and dropdown styles.
- **Components**: React client components with hooks. `localStorage` markers are used for in-page simulated persistence only.
- **Static assets**: `public/images/`, `public/video/`.

## Content contract (minimum policy floors)

- Normal e‑Business: 365-day validity from ETA grant; multiple entry; up to 180 days continuous stay per visit.
- All categories: apply minimum 4 days before arrival; most categories accept up to 120 days ahead.
- Core documents for every route: passport bio page, recent front-facing white-background photo.
- Category evidence varies: tourist (purpose-specific), business (business card or invitation), medical (hospital letter), student/family (admission/support evidence), transit (confirmed onward ticket), conference (invitation + event clearance where required).
- Fees: country/territory-specific, plus disclosed transaction charges; no emergency or express government eVisa fee.
- Passport: normally at least six months validity at application and two blank pages.

Before changing any of these, check current official guidance and record the change in `agent-docs/decisions.md`.

## Update discipline

Every turn, mentally note changed files, newly discovered rules and decisions. Every 2–3 turns, batch-write relevant status or decision updates. At session end, always update `agent-docs/status/global.md`, affected component status, and timestamps. Add a gotcha when a mistake could recur; add a workflow when a procedure becomes repeatable. Do not dump transcripts into the network.

## Quick manual review commands

```bash
npm run dev          # Start dev server at localhost:3000
npm run lint         # ESLint (no errors expected; only `<img>` warnings)
npm run build        # Production build with type-check
git status --short   # Inspect local changes before any push
```

Never run `npm audit fix --force` — it can suggest downgrading Next.js to a 9.x version. Workspace root warning about `/home/jayant/package-lock.json` is known and informational; do not touch unrelated lockfiles.
