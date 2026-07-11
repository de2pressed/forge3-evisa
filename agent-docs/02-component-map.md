# Component and page map

Last updated: 2026-07-11

## Stack

- **Framework**: Next.js 18 (App Router, JavaScript)
- **Styling**: Tailwind CSS v4 with `@theme` tokens + ported vanilla CSS
- **State**: React hooks (`useState`, `useEffect`, `useRef`), `localStorage` markers
- **Routing**: Next.js App Router (`app/` directory)

## Public pages

| Route | File | Responsibility | Main next action |
|---|---|---|---|
| `/` | `app/page.js` | Destination-led landing, route check, business facts, process, requirements and FAQ | Start application |
| `/eligibility` | `app/eligibility/page.js` | Passport, purpose, documents, timing and eVisa limits | Start application |
| `/help` | `app/help/page.js` | FAQs for start, documents, fees, payment, tracking and arrival | Track or apply |
| `/track` | `app/track/page.js` | Reference lookup, event timeline and document recovery | Manage documents / view ETA |
| `/eta` | `app/eta/page.js` | Approved e‑Business ETA and arrival checklist | Save ETA |

## Application

`app/apply/page.js` owns a five-stage client-side flow:

1. Applicant and passport.
2. Business activity and Indian contact.
3. Passport, photograph and business evidence uploads.
4. Nationality-specific fee disclosure and consent.
5. Review, submit and reference confirmation.

Step navigation, upload state, fee-consent gating, submission confirmation and toast messages are handled by React hooks within the component.

## Shared components

| Component | File | Purpose |
|---|---|---|
| `SiteHeader` | `app/components/SiteHeader.js` | Navigation, announcement bar, mobile menu, active link detection |
| `SiteFooter` | `app/components/SiteFooter.js` | Full and minimal footer variants |
| `Accordion` | `app/components/Accordion.js` | Expandable FAQ/help sections |
| `Toast` | `app/components/Toast.js` | Global notification system via `window.__forgeToast` |

## Shared styles

`app/globals.css` owns colour tokens (via Tailwind v4 `@theme`), typography, header/footer, cinematic hero, public sections, information pages, application workspace, tracker, ETA and responsive rules. All original CSS class names are preserved.

## Media

- `public/images/hero-mumbai.png` — homepage video poster/source.
- `public/video/india-dawn-loop.mp4` — homepage hero loop.
- `public/images/bengaluru-blue-hour.png` — business feature.
- `public/images/jaipur-craft.png` — editorial story.
- `public/images/kerala-backwaters.png` — eligibility hero and loop poster/source.
- `public/video/kerala-morning-loop.mp4` — editorial story loop.

## External dependencies

Next.js, React, Tailwind CSS (dev dependencies). No runtime API dependencies. Official resources are normal outbound links. Media is stored locally in `public/`.

## See also

- `01-project-overview.md`
- `status/website-status.md`
- `status/media-status.md`
- `workflows/pixverse-assets.md`
