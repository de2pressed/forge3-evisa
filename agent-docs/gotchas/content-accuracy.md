# Gotcha: eVisa content accuracy

Last updated: 2026-07-11

Severity: high

## Risk

India's official page contains many categories and some legacy or contradictory wording. Copying a nearby tourist, conference, medical or legacy rule into a wrong flow can produce a confident but incorrect product. The current build is now category-first: every category needs to be expressed correctly, and the protected business contract must still hold where the user picks business.

## Safe contract for every route

- Apply minimum four days before arrival and generally up to 120 days ahead.
- Passport bio page (PDF/JPEG) and a recent front-facing white-background photograph are required for every category.
- Specific evidence varies by route:
  - **e-Tourist**: purpose-specific evidence if applicable.
  - **e-Business**: business card or invitation where applicable.
  - **e-Medical**: hospital letter.
  - **e-Medical Attendant**: paired medical visa and attendant relation.
  - **e-Student / e-Family**: admission / support evidence and category documents.
  - **e-Transit**: confirmed onward ticket and onward permission where required.
  - **Conference / Event route**: invitation and political / event clearance when required.

## Safe contract for the business route (locked)

- Normal e‑Business validity: **365 days from ETA grant**.
- Entries: multiple.
- Continuous stay: **up to 180 days per visit**.
- Apply minimum four days before arrival, up to 120 days ahead.
- Nationality-specific fee; do not hardcode a universal amount.
- No emergency or express government eVisa fee.

## Common mistakes

- Reusing the old prototype's 30-day tourist visa and `$28` fee.
- Saying "processed within 72 hours" as a guarantee; the official rule is an application lead-time requirement, not a universal decision promise.
- Treating conference travel as normal business without its additional clearances.
- Saying the eVisa is extendable or convertible.
- Omitting the matching-passport and immigration requirement from the ETA experience.
- Presenting Forge as an official Government of India service.
- Defaulting copy to business without acknowledging the user might be a tourist, medical patient, student or family-dependent traveller.

## Implementation traps specific to the current build

- `CustomDropdown` is the right component for the homepage route checker; native selects in the apply form keep their OS-native open state by design — do not silently swap one for the other without user direction.
- `.field select` forces theming on the closed state but cannot fully style the open popover on every browser. If visual consistency of the open state is required across the entire site, replace native selects with `CustomDropdown`.
- The visa-categories section background image is the same `india-beauty-hero.jpg` used as the hero poster. If you regenerate one, regenerate the other or change both to keep the visual story coherent.

## Response

Before changing policy copy, consult current Indian Visa Online guidance, record the source and date in `../../process.md`, and add a dated entry to `../decisions.md`.

## See also

- `../decisions.md`
- `../status/website-status.md`
- `../../docs/research/india.md`
- `../../process.md`
