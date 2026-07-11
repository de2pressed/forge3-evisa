# Project overview

Last updated: 2026-07-11

## Product

Forge eVisa is a category-first redesign of India's full eVisa lifecycle. Its homepage leads with **“Choose your travel purpose first,”** then points users to the right category before paperwork. The product covers all eVisa categories the official Indian Visa Online lists (tourist, business, medical, medical attendant, student, family, transit, conference, production investment), keeps editorial cinematic media, and exposes both new-form and recovery actions (continue, pay, print, track, reupload).

## Audience

Primary: any international traveller applying for an Indian eVisa for the first time or for a non-routine category. They need to pick the right route and prepare the right evidence without learning visa terminology first.

Secondary: returning applicants tracking a decision; operations / executive-assistant users supporting a traveller; approved travellers retrieving ETA.

## Experience principles

1. Category first, administration second. The homepage shows the route, then the form.
2. One current category at a time. The route checker highlights the recommended category; the application labels every step with the active category.
3. Price honesty. Never fabricate a fixed fee; show nationality-specific calculation, transaction charges and the no-emergency-fee advisory.
4. Recovery is a first-class state. Saved progress, email reference, trackable review, exact re-upload action, recoverable sample-form link.
5. Digital-first ETA. Clear mobile pass with no fabricated expiry, still telling travellers to carry the matching passport.
6. Authority through clarity. Restrained visual system, accurate limits, official resources surfaced under Home and in the footer.
7. Theme-matched UI. Native selects in themed feature cards use `CustomDropdown`; native selects in the application form keep OS-native rendering because their open state is not the primary visual.

## Visual system

Warm ivory and near-black are paired with terracotta action, deep forest authority, sage success and gold advisory. Georgia provides the editorial display voice; system sans handles forms and task content. PixVerse media covers Kerala sunrise, Rajasthan heritage and Bengaluru/City modern India for the homepage and feature gallery.

The official logos (Bureau of Immigration circular, Government of India emblem, Indian e-Visa) are loaded from `/public/images/official/` and placed without visible text labels:

- Public header: BOI left, eVisa right, both clickable to the official sites.
- Public footer brand column: Government of India emblem.
- Apply header (`.app-header`): BOI left, eVisa right; secure-label centered; `Exit application` link.

## Technical boundary

This is a Next.js App Router application. Pages use the `app/` directory convention with `'use client'` directives for interactive components. No backend, no account system, no real eligibility engine, no upload endpoint, no payment processor, no email and no government integration. Customer-facing copy never calls the product a demo or prototype.

## Approval state

User has approved iterative work via autonomous mode for an extended session. GitHub push is gated on explicit per-session approval from Jayant. Working tree is dirty with the most recent approved draft, awaiting his push instruction.

## See also

- `02-component-map.md`
- `decisions.md`
- `status/global.md`
- `../process.md`
- `../docs/research/_SYNTHESIS.md`
