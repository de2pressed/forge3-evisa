# Forge eVisa agent entry point

Last updated: 2026-07-11

## Project in one sentence

Forge eVisa is a cinematic, human-first static redesign of India’s normal e‑Business visa journey: understand eligibility → apply → upload documents → review fee → submit → track → receive ETA.

Project root: `/home/jayant/forge3-evisa`

## Task router

| If the task is… | Read first |
|---|---|
| Understand the product, audience or brief | `agent-docs/01-project-overview.md`, `process.md` |
| Change landing-page UI or visual language | `agent-docs/decisions.md`, `agent-docs/status/website-status.md`, `docs/research/_SYNTHESIS.md` |
| Change visa content, eligibility or fees | `agent-docs/gotchas/content-accuracy.md`, `docs/research/india.md`, `eligibility.html` |
| Change application flow or interactions | `agent-docs/02-component-map.md`, `agent-docs/status/website-status.md`, `apply.html`, `assets/js/site.js` |
| Generate or replace PixVerse media | `agent-docs/workflows/pixverse-assets.md`, `process.md` |
| Prepare a GitHub push | `agent-docs/status/global.md`, `agent-docs/workflows/staging-handoff.md` |
| Continue an unfinished task | `agent-docs/status/global.md` |
| Find research or provenance | `agent-docs/reference/reports-index.md`, `process.md` |

## Standing rules

1. Do not push to GitHub until Jayant explicitly approves the current build and authorises the staging push.
2. Preserve the normal e‑Business route throughout: 365-day validity, multiple entry, continuous stay up to 180 days per visit.
3. Do not invent an exact fee. The official amount is nationality/territory-specific; disclose applicable transaction charges and the no-emergency-fee advisory.
4. Treat official Indian Visa Online and Bureau of Immigration content as authoritative for policy. Research notes are a synthesis, not a substitute for checking changed rules.
5. Keep public navigation shallow: Home, Eligibility, Documents, Help, Track and Apply.
6. Do not call the customer-facing product a demo or prototype in website copy.
7. Keep cinematic media grounded and recognisably Indian. Avoid fantasy architecture, staged exoticism and invented official branding.
8. Preserve the recoverable lifecycle: saved progress, clear upload states, trackable review and exact re-upload action.
9. Never place credentials, PixVerse auth tokens or private data in repository documentation.
10. Existing uncommitted work belongs to the user. Inspect status and do not discard it.

## Critical paths

- Landing page: `index.html`
- Application: `apply.html`
- Eligibility: `eligibility.html`
- Help centre: `help.html`
- Tracking: `track.html`
- Digital ETA: `eta.html`
- Shared styles: `assets/css/site.css`
- Shared behaviour: `assets/js/site.js`
- Media: `assets/images/`, `assets/video/`
- Full process record: `process.md`
- Competitive research: `docs/research/`
- Live work status: `agent-docs/status/global.md`

## Architecture summary

This is a framework-free, multi-page static site. Every page links to the same CSS and JavaScript. Landing media is local and generated with PixVerse. Application state is simulated in-page and may save small markers in `localStorage`; there is no backend, identity service or payment processor. See `agent-docs/02-component-map.md` for page and flow ownership.

## Content contract

- Normal e‑Business validity: 365 days from grant of ETA.
- Entries: multiple.
- Continuous stay: no more than 180 days per visit.
- Timing: minimum four days before arrival; generally up to 120 days ahead.
- Core documents: passport bio page, recent front-facing white-background photo, business card or qualifying invitation.
- Passport: normally at least six months validity at application and two blank pages.
- Fees: country/territory-specific, payment charges disclosed separately, application fee not refunded on refusal.
- No emergency or express government eVisa charge.

Before changing any of these, check current official guidance and record the change in `agent-docs/decisions.md` and `process.md`.

## Update discipline

Every turn, mentally note changed files, newly discovered rules and decisions. Every 2–3 turns, batch-write relevant status or decision updates. At session end, always update `agent-docs/status/global.md`, affected component status, and timestamps. Add a gotcha when a mistake could recur; add a workflow when a procedure becomes repeatable. Do not dump transcripts into the network.

## Quick manual review commands

These commands are listed for the user or a future authorised verification pass. Do not run them when the user has explicitly prohibited Codex verification.

```bash
cd /home/jayant/forge3-evisa
git status --short --branch
python3 -m http.server 4173
rg -n "demo|prototype|TODO|FIXME" --glob '*.html' --glob '*.js' --glob '*.css'
find assets -type f -maxdepth 3 -print
```

## Current gate

Development is complete and waiting for Jayant’s manual review. No staging push is authorised yet. Read `agent-docs/status/global.md` before taking action.

## See also

- `agent-docs/00-readme.md`
- `agent-docs/01-project-overview.md`
- `agent-docs/02-component-map.md`
- `agent-docs/status/global.md`
- `agent-docs/decisions.md`
- `process.md`

