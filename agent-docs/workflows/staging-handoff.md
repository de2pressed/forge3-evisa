# Staging handoff workflow

Last updated: 2026-07-11

## Approval gate

Do not begin until Jayant explicitly approves the reviewed website AND authorises a push. Both gates are required. In autonomous work sessions the second gate (push authorisation) has so far been withheld; check `status/global.md` before assuming push authority.

## Procedure after approval

1. Inspect `git status --short --branch` and preserve any unrelated user changes.
2. Confirm the intended branch name. Use `staging` if Jayant asks for that branch; otherwise stay on `main` if he approves a direct push to `main`.
3. Create or switch to the approved local branch non-destructively.
4. Stage only the reviewed website, media and documentation files. PixVerse credentials and temporary prompt files must never be staged.
5. Commit with a message that describes the completed eVisa experience.
6. Push the approved branch to origin.
7. Report the exact branch and commit SHA. Do not open a pull request unless requested.
8. Update `../status/global.md` with the pushed state and the new SHA.

## See also

- `../status/global.md`
- `../../AGENTS.md`
