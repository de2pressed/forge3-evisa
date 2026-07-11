> Method: browser + static fallback. Live page inspected 2026-07-11 at https://evisa.gov.vn/. The browser received the Vue application shell and linked CSS, but no rendered body copy; visual-token fields that did not render are marked accordingly.

# Vietnam National Electronic Visa System

## Overview

The official domain identifies itself as “Vietnam National Electronic Visa system.” The rendered application shell is thin in this environment, so this review separates observable implementation evidence from unobservable screen content rather than guessing.

## Visual Design

- Browser-observed initial tokens: `#000`, `rgb(40,50,82)` (dark navy/slate), and `#fff`; the page title is the system name.
- Linked assets include `ant-design-vue`, `vue-loading-overlay`, `vue3-carousel`, `slider`, and an app-specific hashed stylesheet. No font family, completed layout, or branded primary color was statically extractable from the delivered shell.
- Takeaway: treat the available technical evidence as evidence of a component-based, carousel-capable application—not a visual reference to copy.

## Layout & Information Architecture

- The accessible browser shell contained no navigable copy or CTA structure at capture time. Public page IA must be validated manually in a normal interactive session before using it as a content source.
- The presence of carousel/slider styles suggests a likely promotional or explainer surface, but this is an inference only.

## Application Flow

- No observable form flow, fee disclosure, eligibility logic, or tracking interaction was exposed in the automated capture.
- The lack of a readable no-JS/fallback state is itself relevant: a traveller with slow loading or script failure gets little orientation.

## Content Strategy

- The only reliable public label observed is the product name. Do not copy unsupported marketing or requirement claims from this portal.

## UX Patterns & Friction

- Friction observed: content is fully dependent on client rendering in this capture; the initial experience lacks accessible explanatory copy.
- Potential positive: mature component libraries can support consistent validation and controls when properly implemented, but that behaviour was not observed here.

## Tech Hints

- Strong evidence of Vue: `ant-design-vue`, `vue-loading-overlay`, and `vue3-carousel` styles are loaded from `/assets/css/`.
- Hashed CSS filenames indicate a production-built SPA bundle. Framework and libraries should not be mistaken for UX quality.

## Takeaways for Forge eVisa

- Do not make the core journey dependent on a blank client-rendered shell; render the heading, value proposition and recovery path immediately.
- Use robust component patterns, but keep the first screen understandable before data or animation loads.
- Preserve a simple, text-first “Apply” and “Track status” route independent of marketing carousels.
