# Product and implementation decisions

Last updated: 2026-07-11

## 2026-07-11 — Normal business route is the product spine

The earlier tourist placeholder was removed. All public facts, form labels, documents, tracking and ETA now describe the normal e‑Business route. Reason: the build brief explicitly required a normal business flow and official rules differ materially from tourist rules.

## 2026-07-11 — Do not invent a fixed fee

Indian eVisa fees are country/territory-specific. The payment step states that the applicable amount is calculated by nationality and discloses the transaction charge. Reason: transparent uncertainty is more trustworthy than a polished but false amount.

## 2026-07-11 — Destination-led public site, task-led application

The landing page uses full-bleed PixVerse media; the application removes decorative imagery and uses a restrained workspace. Reason: travel emotion is useful before commitment, while forms benefit from low distraction.

## 2026-07-11 — Static multi-page architecture

The single-file prototype was split into six HTML pages with one shared CSS and JavaScript layer. Reason: pages are individually understandable, easy to capture for judging and can later map cleanly to framework routes.

## 2026-07-11 — Five application stages

Applicant and business details are separate, followed by documents, payment and review. Reason: this keeps each page to one mental task and makes editing precise.

## 2026-07-11 — Digital ETA with accurate arrival language

The product presents a mobile-ready ETA but still tells travellers to carry the matching passport and present the ETA at immigration. Reason: digital convenience must not override official arrival requirements.

## 2026-07-11 — User verification is the release gate

Codex does not perform the final verification pass because the user explicitly prohibited it. No GitHub push occurs until explicit approval for staging.

## See also

- `01-project-overview.md`
- `gotchas/content-accuracy.md`
- `status/global.md`
- `../process.md`

