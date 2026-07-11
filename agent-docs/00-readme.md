# Agent knowledge network conventions

Last updated: 2026-07-11

This folder is the durable operational memory for Forge eVisa. It is curated for a fresh agent, not a transcript archive.

## Status vocabulary

- `green` — implemented and no known issue recorded.
- `yellow` — implemented but pending review or known follow-up.
- `red` — broken or blocked.
- `unknown` — not recently reviewed.
- `planned` — accepted but not implemented.

## Update rhythm

- Every turn: note changed facts and decisions mentally.
- Every 2–3 turns: update component status, decisions and gotchas in one batch.
- Every session end: update `status/global.md` and all touched status files.

Stable facts belong in overview/component/workflow files. Live state belongs under `status/`. Hard-won traps belong under `gotchas/`. Source material remains in `docs/` and is indexed rather than copied.

## Network map

- `01-project-overview.md` — stable business and experience context.
- `02-component-map.md` — page, asset and interaction ownership.
- `status/` — current implementation and approval state.
- `workflows/` — repeatable media and release procedures.
- `gotchas/` — accuracy and implementation traps.
- `decisions.md` — dated, non-obvious choices.
- `reference/` — canonical source pointers.

## Sensitive material

PixVerse authentication and account data remain outside this repository. Never add tokens, cookies, personal applicant data or payment details to this network. Customer-facing copy never calls this product a demo or prototype.

## See also

- `../AGENTS.md`
- `status/global.md`
- `decisions.md`
