# PixVerse asset workflow

Last updated: 2026-07-11

## Goal

Create grounded, cinematic India media that fits the established forest/terracotta editorial system and remains traceable. The current homepage loop is a Seedance 2.0 Standard generation; legacy stills came from Nano Banana 2.

## Procedure

1. Read `../../process.md` to avoid duplicating an existing scene.
2. Draft the still first. Specify real place, time, human activity, restrained colour, documentary realism, no text/logos, no fantasy architecture, no official branding, first and last frames visually compatible for a smooth loop.
3. Generate with a fixed seed and JSON output. Use `gemini-3.1-flash` for stills, `seedance-2.0-standard` for video loops that need 1080p + 15s in 16:9, `v6` for shorter loops, `veo-3.1-standard` only when 8s is acceptable.

```bash
# still
pixverse create image --prompt "…" --model gemini-3.1-flash --quality 1440p --aspect-ratio 16:9 --seed SEED --json

# video loop
pixverse create video --prompt ./prompt.txt --model seedance-2.0-standard --quality 1080p --aspect-ratio 16:9 --duration 15 --no-audio --seed SEED --json
```

4. Download by returned image/video ID into `public/images/` or `public/video/` and rename semantically.
5. Strip audio with `ffmpeg -i input.mp4 -an -c:v copy output.mp4` when a generation comes back with audio.
6. Add asset ID, model, seed, exact prompt, destination and rationale to `../../process.md` and `../status/media-status.md`.
7. Add `<video autoPlay muted loop playsInline poster="…">` with a still fallback.

## Rules

- Do not expose auth tokens or account details.
- Do not delete generated cloud assets without user instruction.
- Never imply generated people are real applicants or officials.
- Prefer 8- or 15-second silent loops for background use.
- Preserve the documentary palette and avoid oversaturated tourism-ad clichés.

## See also

- `../status/media-status.md`
- `../decisions.md`
- `../../process.md`
