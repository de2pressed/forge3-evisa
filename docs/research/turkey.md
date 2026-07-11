> Method: browser + static fallback. Requested https://www.evisa.gov.tr/ on 2026-07-11; it redirected to `dtvgroup.com.tr`, so this is a domain-integrity observation, not a current official-product assessment.

# Turkey e-Visa — redirected destination observation

## Overview

The supplied eVisa URL did not present a recognisable Turkish government eVisa interface in the captured browser; it redirected to a third-party-looking destination. That outcome is a critical trust finding for a visa journey.

## Visual Design

- Redirect-destination CSS repeatedly uses navy `#00204a`, Bootstrap dark `#212529`, danger red `#dc3545`, success green `#198754`, light `#f8f9fa`, and warning `#ffc107`.
- Fonts loaded include `Poppins` and `Titillium Web`; an observed heading was white, 35.2px, weight 600.
- The captured screen exposed only “slide 2 of 3,” with large overlay/slider styling. These are destination-site tokens, **not endorsed Turkey eVisa tokens**.

## Layout & Information Architecture

- No official eVisa navigation, hero, application, status, or footer IA was observable after the redirect.
- The destination loads tiny-slider and AOS, suggesting a carousel-heavy marketing page rather than a reliable public-service task flow.

## Application Flow

- No official application flow, eligibility logic, fee transparency, or tracking was observable. The redirect interrupts task completion before the flow starts.

## Content Strategy

- No trustworthy official eVisa copy could be extracted from the supplied URL. For a visa product, loss of clear government identity is materially more harmful than weak visual design.

## UX Patterns & Friction

- Major friction: a visitor beginning at the supplied domain is redirected away from a recognisable official service.
- This demonstrates why Forge needs persistent product identity, clear ownership, a canonical URL/trust line, and no ambiguous third-party diversion.

## Tech Hints

- Redirect target uses static CSS assets including Bootstrap-adjacent utilities, Tiny Slider, AOS, Poppins and Titillium Web. No conclusion about the actual Turkish government stack is possible.

## Takeaways for Forge eVisa

- COPY nothing visual from the redirected destination.
- Make official ownership and the canonical product name visible in the header and footer.
- Keep the application and status actions at stable first-party URLs; give users a clear anti-scam note.
- Treat redirect/error handling as part of the service design: a failed route should still tell users what happened and where to go.
