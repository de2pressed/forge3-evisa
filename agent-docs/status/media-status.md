# Media status

Last updated: 2026-07-11

State: `green` — replacement hero and supporting media in place.

## Hero (homepage loop)

| File | PixVerse asset ID | Model | Settings |
|---|---:|---|---|
| `public/video/india-beauty-loop.mp4` | 412965404185381 | Seedance 2.0 Standard | 3840×2160 (2160p), 15s, 16:9, no audio, HEVC |
| `public/video/india-beauty-loop-1080p.mp4` | _local ffmpeg transcode_ | libx264 | 3840×2160, 15s, H.264 fallback for Safari/Firefox |
| `public/images/india-beauty-hero.png` | 412965436220959 | Nano Banana 2 (`gemini-3.1-flash`) | 5504×3072, 2160p; used as poster, eligibility hero, and visa-categories section source |

Previous asset (`india-beauty-loop.mp4`, 1920×1080 Seedance 2.0 Standard, asset `412953901140604`) and previous poster (`india-beauty-hero.jpg`, asset `412953901140603`) were replaced with the new 2160p generation. Seed: `412953901` (video), `412953902` (still). Prompts in `.pixverse/prompt-hero-2160.txt` and `.pixverse/prompt-hero-still.txt`.

Previous Gateway-of-India hero (`public/video/gateway-mumbai-loop.mp4`, `public/images/gateway-mumbai-hero.jpg`) was rejected by Jayant and removed.

## Still imagery

| File | PixVerse asset ID | Model |
|---|---:|---|
| `public/images/bengaluru-blue-hour.png` | 412942803966563 | Nano Banana 2 |
| `public/images/kerala-backwaters.png` | 412942718795384 | Nano Banana 2 |
| `public/images/jaipur-craft.png` | 412942718961126 | Nano Banana 2 |
| `public/images/category-slide-1.png` | 412968202075121 | Nano Banana 2 (`gemini-3.1-flash`) — Kerala backwaters at golden dawn, 5504×3072 |
| `public/images/category-slide-2.png` | 412968204076572 | Nano Banana 2 (`gemini-3.1-flash`) — Mehrangarh Fort, Jodhpur, 5504×3072 |
| `public/images/category-slide-3.png` | 412968206205935 | Nano Banana 2 (`gemini-3.1-flash`) — Mumbai Marine Drive at blue hour, 5504×3072 |
| `public/images/category-slide-4.png` | 412968208359251 | Nano Banana 2 (`gemini-3.1-flash`) — Varanasi ghats at first light, 5504×3072 |

Seeds: `413000001` / `413000002` / `413000003` / `413000004`. Prompts in `.pixverse/prompt-cat-{1..4}.txt`. Auto-advancing 7s cycle in `app/page.js`; respects `prefers-reduced-motion`.

## Official logos (provided by the user)

| File | Use |
|---|---|
| `public/images/official/boi_logo_1.png` | Public header left, apply header left |
| `public/images/official/emblem.png` | Footer brand column |
| `public/images/official/e-visa-logo.png` | Public header right, apply header right |

## Proof-bar icon set (hand-written SVG)

| File | Motif |
|---|---|
| `public/images/trust-lotus.svg` | Lotus |
| `public/images/trust-wheel.svg` | Ashoka wheel |
| `public/images/trust-fern.svg` | Palm leaves |
| `public/images/trust-diya.svg` | Diya |

All four SVGs are rendered at 46×46 px with rounded tiles for consistent proof-bar layout.

## See also

- `global.md`
- `../workflows/pixverse-assets.md`
- `../../process.md`
