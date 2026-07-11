> Method: browser + static fallback. Live page and first-party CSS inspected 2026-07-11 at https://www.evisa.e-gov.kg/.

# Kyrgyz Republic e-Visa

## Overview

Kyrgyzstan positions e-Visa as a replacement for embassy appointments/original-document submission. Its home page is service-led: apply, continue an application, check status, transfer visa to a new passport, and speed up review.

## Visual Design

- Exact CSS colors: primary green `#09B169`, dark text/surface `#30333a`, near-black `#191C23`, white `#fff`, and gray borders `#c8c8c8`/`#dcdcdc`.
- CSS names `BebasNeueRegular` for display treatment; the browser’s normal body text was black/white with blue link default `rgb(0,0,238)` and green action accents `rgb(9,177,105)`.
- Aesthetic: functional government portal with icon/service tiles and a dark/green civic palette, rather than editorial marketing.

## Layout & Information Architecture

- Header groups: Services, About Kyrgyzstan, Information, Contact Us; language switcher KG/RU/EN; personal-account login.
- Services are explicit and shallow: Apply for a visa, Continue your application, Check status, Visa transfer to new passport, Speed up review.
- Explanatory content follows services: why e-Visa exists, what is required, and a “Do I need visa?” eligibility path.

## Application Flow

- The public copy frames the minimum inputs: internet, credit/debit card, and scanned documents; no embassy appointment or original-document presentation.
- Users can determine eligibility by selecting country/region of travel document. Each traveller, including children/infants, needs a separate e-Visa.
- A dedicated continue route demonstrates recovery from an interrupted application; status and passport-transfer are first-class services.
- Exact fees and document list were not observed on the home page.

## Content Strategy

- Clear benefit-led prose: it “does not require more information than traditional paper application” and grants the same entry right as a sticker visa.
- CTAs use verbs and service outcomes, not bureaucratic labels. Supporting content is short and practical.

## UX Patterns & Friction

- Strong patterns: dedicated resume, eligibility checker, status lookup, language switcher, and passport-change service.
- Potential friction: “Speed up e-Visa application review” can introduce paid/priority uncertainty; Forge should avoid such language because India’s official portal warns against emergency/express charges.
- The menu has enough services to be useful but requires hierarchy for a first-time applicant.

## Tech Hints

- First-party CSS includes jQuery UI and a slider stylesheet; the portal appears server-rendered/legacy-enhanced rather than a modern SPA.
- Multiple custom CSS bundles and image-led service cards suggest progressive enhancement is feasible.

## Takeaways for Forge eVisa

- COPY explicit **Continue application** and **Check status** entry points.
- COPY eligibility before form completion; users should know whether to proceed before assembling documents.
- COPY the promise of no embassy visit/original documents, but state exactly what scans are needed.
- AVOID ambiguous “speed up” language and a service menu that competes with the one main apply action.
