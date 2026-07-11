# PixVerse asset workflow

Last updated: 2026-07-11

## Goal

Create grounded, cinematic India media that fits the established forest/terracotta editorial system and remains traceable.

## Procedure

1. Read `../../process.md` to avoid duplicating an existing scene.
2. Draft the still first. Specify real place, time, human activity, restrained colour, documentary realism, no text/logos and no fantasy architecture.
3. Generate with a fixed seed and JSON output:

```bash
pixverse create image --prompt "…" --model gemini-3.1-flash --quality 1440p --aspect-ratio 16:9 --seed SEED --json
```

4. Download by returned image ID into `assets/images/`.
5. For a loop, animate the accepted still with PixVerse V6. Ask for slow motion, stable horizon, no scene change, no audio and visually compatible first/last frames.

```bash
pixverse create video --prompt "…" --image ./assets/images/source.png --model v6 --duration 8 --quality 720p --aspect-ratio 16:9 --no-audio --seed SEED --json
```

6. Download by video ID into `assets/video/` and give it a semantic filename.
7. Add asset ID, model, seed, exact prompt, destination and rationale to `../../process.md` and `../status/media-status.md`.
8. Add `<video autoplay muted loop playsinline poster="…">` with a still fallback.

## Rules

- Do not expose auth tokens or account details.
- Do not delete generated cloud assets without user instruction.
- Never imply generated people are real applicants or officials.
- Prefer 8-second silent loops for background use.
- Preserve the existing documentary palette and avoid oversaturated tourism-ad clichés.

## See also

- `../status/media-status.md`
- `../decisions.md`
- `../../process.md`

