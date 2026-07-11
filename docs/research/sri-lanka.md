> Method: browser + static fallback plus official public-page extraction. Live portal and first-party CSS inspected 2026-07-11 at https://eta.gov.lk/slvisa/.

# Sri Lanka ETA

## Overview

Sri Lanka’s ETA is a formally structured, information-heavy short-visit authorization. It supports tourism, business and transit, several submission channels, acknowledgement plus approval/referral, status lookup, explicit entry requirements, and detailed fee tables.

## Visual Design

- Exact first-party CSS colors: slate `#2D4452`, indigo `#5468a5`, white `#fff`, gray `#999`/`#CCC`, gold/brown `#996600`, orange `#FF9900`, and blues `#006699`, `#005dab`, `#002e64`.
- Typography: Tahoma and Verdana/Arial/Helvetica; observed page text uses Bootstrap-era `rgb(33,37,41)`, white, black and action blue `rgb(0,123,255)`.
- Aesthetic: legacy, information-dense government web UI. The first captured screen prioritised a large language selector (English, Spanish, German, Chinese, Russian, Hindi, Japanese, French, Arabic).

## Layout & Information Architecture

- Home/about content explains ETA, eligibility/exemptions and issuing authority. Deep information pages cover how to apply, fees, FAQs, sample notices, overseas missions and extension.
- Navigation depth is high: the applicant must traverse an information hub to reach the right submission method and fee detail.
- Language choice is prominent; alternate routes include applicant, third party, overseas mission, head-office, and limited port-of-entry use.

## Application Flow

- Standard path: select Apply → complete ETA form → card payment → acknowledgement → approval or referral; status is checked by reference number/site or 24/7 contact.
- ETA is for short tourism, business, and transit. It is initially 30 days from arrival and may be extended up to six months; the approval should be carried to entry.
- Entry requirements are explicit: passport valid at least six months from arrival, confirmed return ticket and sufficient funds.
- Fees are unusually detailed: for applicant/mission/head-office submissions, tourist/business are US$20/30 for SAARC and US$50/55 for other countries; on arrival tourist is US$25/60. Transit up to two days is free. The site states a no-refund policy.

## Content Strategy

- Highly instructional, formal copy with many scenarios and exceptions. It offers samples of acknowledgement, approval and referral notices.
- Trust comes from the named Department of Immigration & Emigration, explicit card acceptance and 24/7 support—not from visual warmth.

## UX Patterns & Friction

- Strong patterns: reference-number status check, acknowledgement before decision, clear referral path, language breadth, transparent fees and entry checklist.
- Friction: six submission methods and long text produce decision load; a language wall can become the first task before users understand the product.
- Some key facts are buried in separate pages rather than being contextual in the apply flow.

## Tech Hints

- Server-rendered JSP URLs plus custom CSS and Bootstrap indicate a legacy Java/JSP-style implementation.
- The site is text-first and does not require a modern application framework for its core explanatory pages.

## Takeaways for Forge eVisa

- COPY acknowledgement + reference number immediately after submit, not a vague spinner.
- COPY a clear status/review/referral model and visible entry checklist.
- COPY fee tables but simplify them into the user’s selected visa, rather than making everyone decode country matrices.
- AVOID splitting one straightforward journey across many submission-method pages.
