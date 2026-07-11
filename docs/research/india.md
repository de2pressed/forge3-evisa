> Method: browser + static fallback. Live page inspected 2026-07-11; page HTML and first-party CSS reviewed. Source: https://indianvisaonline.gov.in/evisa/tvoa.html

# India e-Visa — redesign target and data source

## Overview

The Bureau of Immigration / Ministry of Home Affairs page is the functional source for Forge eVisa. It exposes a long e-Visa landing page with numerous help links, a 4-step process, nine top-level categories, an application-resume path, payment/status/re-upload utilities, and extensive hidden/accordion legal content.

The visible process is: **Apply online** (upload photo and passport page) → **Pay eVisa fee online** (card/debit card/wallet) → **Receive ETA online** (email) → **Fly to India** (present ETA; visa stamped at immigration).

## Visual Design

- Exact observed dominant colors: `rgb(33,37,41)` / `#212529` text, `#fff` surfaces, `#2196f3` blue, `#dc1c24` red, `#b53338` advisory red, `#89cff0`/`#CFEBF9` light blue, and `#007FFF` action blue. First-party CSS repeats `#b53338`, `#89CFF0`, `#fff`, and `#000`.
- Typography is mostly system/Bootstrap sans; observed headings are 14–20px at weight 500 and an advisory heading is 24px. CSS also loads `Conv_Poppins-Regular` and `Conv_Montserrat-Regular`.
- Aesthetic: dense, utilitarian, white background, small text, many underlined/link-style actions, icon-led process row. No decisive visual hierarchy between the primary task and support/help content.
- Imagery is largely decorative/utility rather than applicant-centred.

## Layout & Information Architecture

- Top utilities: Back to Home, text-size controls, government identity, eligibility, instructions, FAQs, payment/checkpost/helpdesk links.
- Central content: payment helpdesk, four-step e-Visa process, an anti-emergency-fee advisory, category list, save/resume and re-upload guidance.
- Bottom utility links: Apply, Complete Partially Filled Application, Verify Payment/Pay Fee, Print Application, Check Status, Reupload Data.
- Footer carries ministry/NIC ownership and a browser/Adobe Reader compatibility note. Navigation depth is deep because key requirements and visa definitions sit in hidden category/FAQ content.

## Application Flow

- Core flow is clear at a high level but fractured in execution: apply, photo/passport upload, pay, ETA email, immigration arrival.
- India lists e-Tourist (T1): 30-day, 1-year, and 5-year variants; 1/5-year are multiple entry with a 180-day maximum stay in one calendar year. The source includes a legacy/hidden entry description for the 30-day variant, so Forge should present the chosen rule plainly rather than reproduce the ambiguity.
- e-Business B1: 365 days from ETA grant, multiple entry, each continuous stay capped at 180 days; B5 conference: 30 days from arrival; B6: 365 days, multiple entry.
- e-Medical M1/M3: source says 365 days from arrival, multiple entry; e-Medical Attendant M2/M4: 60 days from arrival, multiple entry. The FAQ also contains older 60-day/triple-entry wording—an important content-versioning warning.
- e-Student S: 365 days from ETA grant, multiple entry; e-Family SX: 365 days, multiple entry. e-Transit TR: 30 days from ETA grant, multiple entry. e-Miscellaneous X1: 3 months from first entry, multiple entry. e-Production Investment: 6 months, multiple entry.
- Mandatory common uploads: a recent front-facing white-background photo and passport bio page. Additional documents vary: business card/invitation for business, hospital letter for medical, admission letter for student, and onward ticket for transit.
- The lifecycle supports save/resume. After submission, the applicant may receive an email within 24 hours to re-upload an unsuitable document/image; it has a separate Reupload Data utility.
- Eligibility constraints visible in instructions: passport valid at least six months at application, return/onward ticket and sufficient funds; Pakistani passport/origin applicants are directed to a regular visa route. Fees are country/territory-specific, PDFs sit behind “Click here,” and a 3% bank transaction charge is disclosed in FAQ rather than at the first decision point.

## Content Strategy

- Strong trust signals: Government of India, Ministry of Home Affairs, NIC, payment helpdesk and an anti-fraud warning that no emergency/express fee exists.
- Copy is formal and procedural: “admissable,” “scrutinized,” “re-upload,” and long eligibility clauses. The page foregrounds process and legal content more than user reassurance.
- Primary CTAs are present but treated as similar-looking utilities; “Apply here for e-visa” competes with print, payment, status, and re-upload links.

## UX Patterns & Friction

- Useful patterns: a visible four-step overview, save/resume, status lookup, re-upload loop, and document requirements by visa type.
- Friction: fees are not surfaced as a clean upfront price; category/duration information is hidden in dense disclosures; current and legacy rules appear together; the current site still references printing and Adobe Reader.
- The page provides no single personalised eligibility-to-document-to-fee path. Users must map their purpose to multiple help/FAQ sections themselves.
- Language appears English-first; accessibility includes A+/A/A− controls, but the small, dense content remains difficult to scan.

## Tech Hints

- Server-rendered HTML with first-party Bootstrap, Owl Carousel, Font Awesome, Easy Responsive Tabs and custom CSS; no SPA framework is evident.
- The raw page contains hidden category panels and legacy commented markup, which explains contradictory content surfacing.
- Updated-on text on the live page reads 16 May 2019 despite newer notices; content freshness needs a clear ownership/versioning layer in a redesign.

## Takeaways for Forge eVisa

- COPY the four-step mental model, save/resume, status lookup, re-upload recovery and official anti-fraud language.
- FIX fee opacity: show the exact price, processing fee and non-refundable rule before the applicant enters a long form.
- FIX content sprawl: ask nationality and purpose first, then show only the relevant requirements, documents and timing.
- FIX lifecycle uncertainty: turn “scrutiny/re-upload” into a visible status timeline with an actionable document card.
- AVOID printing/Adobe Reader as a dependency; use a digital ETA card with QR and optional download.
- Keep official authority, but replace helpdesk-first legalese with an empathetic first-time-applicant voice.
