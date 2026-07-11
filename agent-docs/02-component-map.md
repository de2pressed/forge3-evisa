# Component and page map

Last updated: 2026-07-11

## Public pages

| Page | Responsibility | Main next action |
|---|---|---|
| `index.html` | Destination-led landing, route check, business facts, process, requirements and FAQ | Start application |
| `eligibility.html` | Passport, purpose, documents, timing and eVisa limits | Start application |
| `help.html` | FAQs for start, documents, fees, payment, tracking and arrival | Track or apply |
| `track.html` | Reference lookup, event timeline and document recovery | Manage documents / view ETA |
| `eta.html` | Approved e‑Business ETA and arrival checklist | Save ETA |

## Application

`apply.html` owns a five-stage client-side flow:

1. Applicant and passport.
2. Business activity and Indian contact.
3. Passport, photograph and business evidence uploads.
4. Nationality-specific fee disclosure and consent.
5. Review, submit and reference confirmation.

`assets/js/site.js` manages step navigation, upload state, fee-consent gating, submission confirmation, status lookup, accordions, the mobile menu and toast messages.

## Shared presentation

`assets/css/site.css` owns colour tokens, typography, header/footer, cinematic hero, public sections, information pages, application workspace, tracker, ETA and responsive rules.

## Media

- `assets/images/hero-mumbai.png` — homepage video poster/source.
- `assets/video/india-dawn-loop.mp4` — homepage hero loop.
- `assets/images/bengaluru-blue-hour.png` — business feature.
- `assets/images/jaipur-craft.png` — editorial story.
- `assets/images/kerala-backwaters.png` — eligibility hero and loop poster/source.
- `assets/video/kerala-morning-loop.mp4` — editorial story loop.

## External dependencies

None at runtime. Official resources are normal outbound links. Media is stored locally.

## See also

- `01-project-overview.md`
- `status/website-status.md`
- `status/media-status.md`
- `workflows/pixverse-assets.md`

