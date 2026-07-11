> Method: browser attempt + public-site extraction. Live browser capture on 2026-07-11 reached Cloudflare verification rather than the product interface; public pages at https://evisa.gov.az/en/ and `/en/information` supplied content/IA evidence.

# Azerbaijan ASAN Visa

## Overview

ASAN Visa is the strongest process benchmark in the set. It makes the journey legible as **#1 Application → #2 Payment → #3 Download**, separates standard and urgent service, offers status checking, supports individual/family/group applications, and publishes exact fee components.

## Visual Design

- Product-page visual tokens were not extractable because the live browser was stopped by Cloudflare. The only observed verification-screen colors were `rgb(49,49,49)`, `rgb(242,242,242)`, and `rgb(130,182,255)`; these must not be treated as ASAN brand values.
- The public text IA references rotating slides/images, language options (Azerbaijani, English, German, Spanish, French, Hebrew, Italian, Turkmen, Russian, Arabic, Persian, Korean, Chinese) and a concise numbered process.

## Layout & Information Architecture

- Primary actions: New application, Check visa status, Conditions for issuing electronic visas.
- Supporting groups: Information, FAQ, Countries eligible, Migration rules, Duration of stay, Purpose of visa, Contact, Video.
- The home page places standard/urgent choices and the three-step flow before deep information. This is a compact standard navigation with well-labelled supporting content.

## Application Flow

- Standard e-Visa: issued within 3 working days; urgent: within 3 hours, including holidays/non-working days.
- Flow: direct data entry → electronic payment → email delivery/download; status can also be checked in the portal.
- Single-entry e-Visa is valid for 90 days with permission to stay up to 30 days. Passport validity must extend at least 3 months beyond the planned e-Visa expiry.
- Applications may be individual, family (2–10) or group (10–300). The application form begins with nationality/citizenship, travel document/passport and entry type.
- Fee transparency is unusually explicit: US$20 state fee plus US$9 processing service fee, both non-refundable; accepted cards include Visa, Mastercard, UnionPay and JCB.

## Content Strategy

- Plain, task-oriented labels: “Just in 3 steps,” “New application,” “Check visa status,” “Standard e-Visa,” “Urgent e-Visa.”
- It states limitations precisely: passport-document mismatch invalidates a visa; applications must be made before travel; rejection/payment responsibility is explained.
- Multilingual navigation and a dedicated FAQ make policy content accessible without putting it all in the main flow.

## UX Patterns & Friction

- Strong patterns: fee component breakdown, turnaround choice, three-step framing, status fallback, family/group support, clear passport validation warnings.
- Friction: Cloudflare can prevent legitimate first-time access; the first form shows a verification code and policy warning early, before a reassuring explanation.
- “Urgent” is a useful choice but can create anxiety if price/eligibility are not surfaced at the same moment.

## Tech Hints

- The product UI was not available for framework inspection due to Cloudflare. Indexed page structure includes an iframe-like application surface; do not infer a framework from it.

## Takeaways for Forge eVisa

- COPY the short, numbered application/pay/download narrative and an always-available status path.
- COPY line-item pricing and refund clarity before card entry.
- COPY the choice between normal and expedited handling only if it can be offered truthfully; Forge should not imply paid “express” treatment.
- AVOID blocking the first screen with bot verification or dense “pay attention” warnings.
- Offer a friendly document/passport mismatch check before submission, not after payment.
