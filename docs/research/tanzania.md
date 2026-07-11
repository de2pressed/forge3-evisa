> Method: browser attempt + public-site extraction. Live browser request to https://visa.immigration.go.tz/ returned an ASP.NET runtime error on 2026-07-11; the official page's indexed public content supplied the application IA.

# Tanzania Electronic Visa Application System

## Overview

Tanzania provides a conventional service hub for online visas covering mainland Tanzania and Zanzibar. Its public content explains the high-level process and separates new applications, continued applications and status lookup.

## Visual Design

- The live browser reached a white ASP.NET error page with Verdana 24px red `#ff0000` and 18.67px maroon `#800000`; these are error-page defaults, not intentional product branding.
- The actual portal's colors, type scale, imagery and CTA styling were not statically extractable during the outage.
- The product uses image-led tiles for its three main tasks according to the public page structure.

## Layout & Information Architecture

- Intro: “Welcome to Tanzania Electronic Visa Application System!” followed by a short explanation.
- Pre-start checklist links: Types of Visa, Required documents, visa-exempt countries, and countries requiring Commissioner General approval.
- Three task tiles: New Application, Continue Application, Visa Status.
- Footer includes version number, support email and browser recommendations; a public-notice block can dominate the page.

## Application Flow

- Stated path: fill in the online form → make payment → submit → internal review → email acceptance/rejection.
- Applicants can track status online and may be asked to attend an embassy/consulate interview.
- Continue Application requires an application ID; status is a separate first-class route.
- Fees, processing times and document specifics are not surfaced in the captured home-page content.

## Content Strategy

- The language is direct but institutional. “What do you want to do?” is an effective task-routing prompt.
- Upfront links to visa types, documents and special-approval countries help applicants assess effort before beginning.
- Browser compatibility and maintenance notices communicate operations, but consume attention that should belong to the core task.

## UX Patterns & Friction

- Strong patterns: three mutually clear task choices, continue by application ID, status lookup and pre-start checklist.
- Friction: current server failure blocks all tasks; fee/timing certainty is not part of the home-page promise; interview escalation appears without a contextual explanation.
- A public-service outage needs a usable service-status/recovery page instead of a framework error.

## Tech Hints

- The runtime-error signature and `aspxerrorpath` indicate Microsoft ASP.NET. The error handler itself failed, exposing implementation detail.
- Public copy reports a version (`2024.4.2.1`) and browser guidance, suggesting a centrally maintained transactional application.

## Takeaways for Forge eVisa

- COPY “New / Continue / Check status” as a simple three-way task router.
- COPY the pre-start checklist, but render the selected visa's requirements directly on the same page.
- Add processing time and fee before the form begins.
- Provide a branded offline/error state that preserves the application reference and tells users what remains safe.
