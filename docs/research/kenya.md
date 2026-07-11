> Method: browser + static fallback. Live page and first-party CSS inspected 2026-07-11 at https://etakenya.go.ke/.

# Kenya Electronic Travel Authorisation

## Overview

Kenya is the strongest modern benchmark in this set. It pairs a welcoming travel-first hero with three direct actions—Apply Now, Check Status and Validate eTA—then routes supporting questions into How to apply, General Information and FAQs.

## Visual Design

- Browser-observed colors: near-black `rgb(3,7,18)` / `#030712`, white `#fff`, blue `rgb(36,79,187)` and grays `#9ca3af`, `#374151`, `#111827`, `#e5e7eb`.
- First-party CSS adds government green `#006B3F`, mint `#4cac7d`, teal `#21AE95`, blue `#2563eb`, gold `#D6991E`, and red/pink error colors `#FF5555`/`#FEEAEF`.
- Typography: `Lexend` for the interface; hero heading observed at 48px/600 in white. Google Font links also load Inter and Roboto.
- Aesthetic: modern destination photography, oversized hero message, generous spacing, rounded informational cards and restrained civic color.

## Layout & Information Architecture

- Identity: Electronic Travel Authorisation + Directorate of Immigration Services.
- Hero: eligibility/language controls, “Your visit to Kenya begins here,” concise promise, Apply Now + Check Status.
- Separate validation utility: Validate eTA.
- Three supporting cards: How to apply, General Information, FAQs.
- Destination story follows the task section; footer includes email, WhatsApp, phone, terms/privacy and ministry ownership. Navigation is minimal and shallow.

## Application Flow

- Apply and Check Status are available above the fold. “Validate eTA” serves a distinct verification audience without crowding the main CTA pair.
- The home page explains where to learn requirements rather than dumping them into the hero.
- Fee and refund terms were not visible in the captured home-page content, so Kenya is a layout benchmark more than a price-transparency benchmark.

## Content Strategy

- Welcoming, plain language: “Your visit to Kenya begins here” and “Apply for your ETA online from anywhere, anytime.”
- CTA labels are short and unambiguous. Supporting copy speaks in outcomes: process/requirements, eligibility/exemptions/processing, FAQs.
- Multiple human support channels and explicit ministry ownership strengthen trust.

## UX Patterns & Friction

- Strong patterns: traveller-centred hero, two primary journeys, third-party validation, shallow IA, useful support cards, and a visually distinct destination section.
- Potential friction: fee/timing certainty is deferred; a hero-photo dependency may affect performance and text contrast on weaker devices.
- Language/eligibility controls are compact rather than dominating the task.

## Tech Hints

- Compiled app CSS resembles a utility-first/Tailwind output and includes Lexend/system stacks. Swiffy Slider is loaded for visual content.
- Modern responsive typography and semantic card structure are evident; the exact framework is not inferred from CSS alone.

## Takeaways for Forge eVisa

- COPY the warm hero, shallow navigation, Apply + Check Status pair, and compact supporting cards.
- COPY the separation between urgent service tasks and evocative destination storytelling.
- Add what Kenya's home page does not immediately show: a personalised upfront fee and “typically within 72 hours.”
- Use an optional Verify eTA action only after the core applicant flow is complete.
