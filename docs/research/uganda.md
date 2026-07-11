> Method: browser + public-site extraction. Live page inspected 2026-07-11 at https://visas.immigration.go.ug/; its app shell did not render visible body copy in-browser, while the official public page remained extractable.

# Uganda e-Immigration System

## Overview

Uganda pairs destination storytelling with a simple four-step application process. The public page is explicitly owned by the Directorate of Citizenship and Immigration Control, Ministry of Internal Affairs.

## Visual Design

- Browser-observed shell colors: black `#000`, dark gray `rgb(76,76,78)` / `#4c4c4e`, `#333`, and pale gray `#f5f5f7`.
- Exact product typography, CTA color, heading sizes and imagery treatment were not statically extractable because the client content did not render in the capture.
- Public content uses destination imagery/storytelling (“Pearl of Africa,” Nile, gorillas, wildlife) before the service process.

## Layout & Information Architecture

- Government/service identity is followed by a welcoming tourism narrative.
- A four-step process is prominently described: Application type → Fill the form → Add documents → Submit.
- Primary CTA is “Start a new application.” The public snapshot did not expose an equally prominent resume/status route.
- Navigation depth could not be reliably captured from the shell.

## Application Flow

- The observable process separates application-type selection from form entry and document upload, which helps users form a mental model.
- Payment timing, fees, eligibility, processing time, decision notification and tracking were not visible in the extracted home-page content.
- The flow naming omits post-submit expectations; applicants need an explicit reference/status/decision story.

## Content Strategy

- Warm destination copy creates desire and national identity before the administrative task.
- The headline “Visiting the Pearl of Africa for business or Pleasure has never been easier” is benefit-led but makes an ease claim without immediately proving timing/price.
- Government ownership is a clear trust signal.

## UX Patterns & Friction

- Strong pattern: a memorable, numbered four-step flow with documents isolated as their own step.
- Friction: destination copy can delay urgent users, and the extracted page does not make the status/resume path or cost visible.
- Client-rendering dependence led to an empty body in the automated browser, so a text-first fallback is advisable.

## Tech Hints

- First-party compiled stylesheets (`styles.css`, `print-styles.css`) and an initially empty client shell were observed. No framework was safely identifiable.
- The dedicated print stylesheet reflects an older document/output mental model.

## Takeaways for Forge eVisa

- COPY the welcoming national tone and a numbered process.
- Balance destination emotion with immediate Apply and Track actions above the fold.
- Extend the process narrative through payment, review, approval and arrival—not just submission.
- Ensure meaningful content renders even when client-side enhancement is delayed.
