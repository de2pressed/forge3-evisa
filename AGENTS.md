# Forge eVisa agent entry point

Last updated: 2026-07-11

## Project in one sentence

Forge eVisa is a cinematic, human-first Next.js 18 application for India's normal e‑Business visa journey: understand eligibility → apply → upload documents → review fee → submit → track → receive ETA.

## Task router

| If the task is… | Read first |
|---|---|
| Understand the product, audience or brief | `agent-docs/01-project-overview.md` |
| Change landing-page UI or visual language | `agent-docs/decisions.md`, `agent-docs/status/website-status.md` |
| Change visa content, eligibility or fees | `agent-docs/gotchas/content-accuracy.md`, `app/eligibility/page.js` |
| Change application flow or interactions | `agent-docs/02-component-map.md`, `app/apply/page.js` |
| Generate or replace PixVerse media | `agent-docs/workflows/pixverse-assets.md` |
| Prepare a GitHub push | `agent-docs/status/global.md`, `agent-docs/workflows/staging-handoff.md` |
| Continue an unfinished task | `agent-docs/status/global.md` |
| Find research or provenance | `agent-docs/reference/reports-index.md` |

## Standing rules

1. Preserve the normal e‑Business route throughout: 365-day validity, multiple entry, continuous stay up to 180 days per visit.
2. Do not invent an exact fee. The official amount is nationality/territory-specific; disclose applicable transaction charges and the no-emergency-fee advisory.
3. Treat official Indian Visa Online and Bureau of Immigration content as authoritative for policy. Research notes are a synthesis, not a substitute for checking changed rules.
4. Keep public navigation shallow: Home, Eligibility, Documents, Help, Track and Apply.
5. Do not call the customer-facing product a demo or prototype in website copy.
6. Keep cinematic media grounded and recognisably Indian. Avoid fantasy architecture, staged exoticism and invented official branding.
7. Preserve the recoverable lifecycle: saved progress, clear upload states, trackable review and exact re-upload action.
8. Never place credentials, PixVerse auth tokens or private data in repository documentation.
9. Existing uncommitted work belongs to the user. Inspect status and do not discard it.

## Critical paths

- Home page: `app/page.js`
- Application: `app/apply/page.js`
- Eligibility: `app/eligibility/page.js`
- Help centre: `app/help/page.js`
- Tracking: `app/track/page.js`
- Digital ETA: `app/eta/page.js`
- Root layout: `app/layout.js`
- Global styles: `app/globals.css`
- Shared components: `app/components/` (SiteHeader, SiteFooter, Accordion, Toast)
- Media: `public/images/`, `public/video/`
- Live work status: `agent-docs/status/global.md`

## Architecture summary

This is a Next.js 18 App Router application with Tailwind CSS v4. Pages use the `app/` directory convention with `'use client'` directives for interactive components. The original site.css design system is ported into `app/globals.css` using Tailwind v4 `@theme` tokens to preserve all original CSS class names, ensuring pixel-level fidelity with the original static site.

Shared components (`SiteHeader`, `SiteFooter`, `Accordion`, `Toast`) are in `app/components/`. Application state is simulated in-page using React `useState` and may save small markers in `localStorage`; there is no backend, identity service or payment processor. Media files (images, videos) are served from the `public/` directory.

### Stack
- **Framework**: Next.js 18 (App Router, JavaScript)
- **Styling**: Tailwind CSS v4 with `@theme` custom tokens + ported vanilla CSS classes
- **Components**: React client components with hooks
- **Static assets**: `public/images/`, `public/video/`

## Content contract

- Normal e‑Business validity: 365 days from grant of ETA.
- Entries: multiple.
- Continuous stay: no more than 180 days per visit.
- Timing: minimum four days before arrival; generally up to 120 days ahead.
- Core documents: passport bio page, recent front-facing white-background photo, business card or qualifying invitation.
- Passport: normally at least six months validity at application and two blank pages.
- Fees: country/territory-specific, payment charges disclosed separately, application fee not refunded on refusal.
- No emergency or express government eVisa charge.

Before changing any of these, check current official guidance and record the change in `agent-docs/decisions.md`.

## Update discipline

Every turn, mentally note changed files, newly discovered rules and decisions. Every 2–3 turns, batch-write relevant status or decision updates. At session end, always update `agent-docs/status/global.md`, affected component status, and timestamps. Add a gotcha when a mistake could recur; add a workflow when a procedure becomes repeatable. Do not dump transcripts into the network.

## Quick manual review commands

```bash
npm run dev          # Start dev server at localhost:3000
npm run build        # Production build
npm run lint         # ESLint check
```

## See also

- `agent-docs/00-readme.md`
- `agent-docs/01-project-overview.md`
- `agent-docs/02-component-map.md`
- `agent-docs/status/global.md`
- `agent-docs/decisions.md`
