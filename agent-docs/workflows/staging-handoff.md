# Staging handoff workflow

Last updated: 2026-07-11

## Approval gate

Do not begin until Jayant explicitly approves the reviewed website and authorises a staging push.

## Procedure after approval

1. Inspect `git status --short --branch` and preserve unrelated user changes.
2. Confirm the intended branch name. Use `staging` if Jayant asks for that exact branch; otherwise use the required Codex prefix convention such as `codex/staging`.
3. Create or switch to the approved local branch non-destructively.
4. Stage only the reviewed website, media and documentation files.
5. Commit with a message that describes the completed eVisa experience.
6. Push the approved branch to origin.
7. Report the exact branch and commit. Do not open a pull request unless requested.
8. Update `../status/global.md` with the pushed state.

## See also

- `../status/global.md`
- `../../AGENTS.md`

