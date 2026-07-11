# Forge eVisa — process record

Last updated: 2026-07-11

## 1. Team and roles

- Jayant Dahiya — product owner, hackathon entrant, product direction and final approval.
- Codex — competitive research synthesis, information architecture, UI/UX, static front-end implementation, PixVerse CLI art direction and project documentation.
- PixVerse — generated the original cinematic image and video layer used by the website.

## 2. Brief and user prompt

The brief is to redesign India’s eVisa experience as the service it should have been: clear, trustworthy, original, mobile-ready and easy for a first-time applicant. The required lifecycle is apply → upload documents → pay → track status → receive ETA.

The development prompt asked Codex to:

- Build the full website autonomously from the existing competitive research.
- Create an `assets/` folder for all imagery and video.
- Use the installed PixVerse CLI to generate cinematic India imagery and looping video.
- Focus the entire experience on the normal Indian business eVisa flow.
- Access Indian Visa Online for current content and use Atlys and Saudi eVisa as visual/flow references.
- Add landing, application, document, payment, tracking and ETA experiences.
- Keep the site presentation customer-facing without labelling it as a demo.
- Document the prompt, research, decisions, generation and implementation in `process.md`.
- Build an agent knowledge network for future-session continuity.
- Stop after development for user verification, and do not push to GitHub until user approves a staging-branch push.
- Do not perform Codex verification after development.

## 3. Concept

**Business takes you places. India should be easy.**

The product pairs a warm, editorial portrait of India with the precision of a good travel service. The visual layer establishes desire and confidence; the application layer becomes calm, compact and practical. The design deliberately avoids default government blue. Authority comes from content clarity, transparent limits, consistent recovery states and visible links to official sources.

The normal e-Business route is the product spine:

- 365-day validity from grant of ETA.
- Multiple entry.
- Continuous stay of up to 180 days per visit.
- Apply at least 4 days and generally up to 120 days before arrival.
- Passport bio page, recent white-background photo and business card/invitation.
- Nationality-specific fee plus the disclosed payment-gateway charge.
- No emergency or express government eVisa fee.

## 4. Storyboard before generation

1. **Opening / Mumbai dawn:** a modern business traveller looks toward an awakening city. Copy establishes the promise and places the complete visa summary in the same viewport.
2. **Route check:** three questions return one recommended route, replacing the official portal’s category directory.
3. **Business facts:** 365 days, multiple entry and 180 days are presented as memorable editorial numbers.
4. **Process:** applicant → documents → payment → ETA, with save/resume and tracking made explicit.
5. **Modern India / Bengaluru:** contemporary enterprise appears inside real city life after monsoon rain.
6. **India in depth / Jaipur and Kerala:** craft, trade and landscape show the country beyond a transactional form.
7. **Application:** a restrained five-step workspace removes visual storytelling and prioritises accurate data entry.
8. **Tracking:** the lifecycle becomes a readable event timeline with a document recovery card.
9. **ETA:** approval becomes a digital travel pass with passport, validity, entry and arrival guidance.

## 5. Research and source use

The project began with ten portal reviews in `docs/research/`. The synthesis selected:

- Kenya’s welcoming clarity and shallow task architecture.
- Azerbaijan’s process and fee transparency.
- India’s actual application, save/resume, payment, re-upload and ETA lifecycle.
- Saudi eVisa’s destination-led full-bleed visual confidence.
- Atlys’ immediately visible route summary and sticky commercial information.

Indian Visa Online was revisited on 2026-07-11 before implementation. The page confirmed the official four-stage process, business validity and stay limits, upload requirements, application window, nationality-specific fees, payment charges, non-refund behaviour, re-upload lifecycle, passport validity and immigration requirements.

Canonical research files:

- `docs/research/_SYNTHESIS.md`
- `docs/research/india.md`
- `docs/research/kenya.md`
- `docs/research/azerbaijan.md`
- `docs/research/saudi-arabia.md`

## 6. Prompt log

### Product and research prompts

1. **User build brief — Codex:** Build the full website, use research and official India content, create assets, use PixVerse, document everything, maintain the normal business route, stop for verification before GitHub push.
   - Result: multi-page static product, media library, process record and agent docs.
2. **Official portal research — web:** Inspect Indian Visa Online for e-Business validity, entries, stay, timing, uploads, payment and recovery rules.
   - Result: product content was changed from tourist placeholder values to the normal e-Business route.
3. **Competitive synthesis — Codex:** Combine Kenya’s clarity, Azerbaijan’s transparency, India’s lifecycle and Saudi/Atlys destination-led presentation.
   - Result: minimal public navigation, visual hero, preflight card and focused application workspace.
4. **Flow refinement — Codex:** Model the full normal business lifecycle and include failure/recovery states.
   - Result: applicant, business, documents, fee, review, confirmation, status, re-upload and ETA views.

### PixVerse generated-image prompts

5. **Mumbai hero — Nano Banana 2 (`gemini-3.1-flash`), 1440p, 16:9, seed 11072026:** “Cinematic editorial photograph of Mumbai at first light, seen from a quiet elevated terrace toward the Arabian Sea and historic South Mumbai skyline, one Indian business traveller in a linen jacket seen from behind at the edge of frame, lived-in city detail, humid golden dawn, subtle film grain, rich terracotta and deep green palette, premium travel documentary, authentic contemporary India, no text, no logos, no fantasy architecture.”
   - Asset ID: `412942628978646`; used as hero poster and source frame.
6. **Kerala backwaters — Nano Banana 2, 1440p, 16:9, seed 11072027:** “Cinematic documentary aerial of Kerala backwaters at early morning, one traditional wooden houseboat moving slowly between coconut palms and small village homes, real monsoon-green landscape, thin mist, warm low sunlight, calm water reflections, sophisticated editorial travel photography, authentic India, restrained natural colour, subtle film grain, no text, no logos.”
   - Asset ID: `412942718795384`; used as eligibility hero, story poster and video source frame.
7. **Jaipur craft — Nano Banana 2, 1440p, 3:2, seed 11072028:** “Cinematic editorial photograph inside a Jaipur artisan courtyard at golden hour, Indian craftswoman arranging hand block printed textiles, weathered pink sandstone walls, indigo and marigold cloth, quiet human moment, natural window light, authentic Rajasthan, premium travel documentary style, subtle grain, no text, no logos, no staged tourist costume.”
   - Asset ID: `412942718961126`; used in the India editorial story section.
8. **Bengaluru business — Nano Banana 2, 1440p, 16:9, seed 11072029:** “Cinematic wide photograph of a modern Bengaluru technology district at blue hour framed through rain trees, pedestrians and auto-rickshaws moving naturally, glass offices alongside local street life, warm windows after a light monsoon rain, contemporary business India, grounded documentary realism, premium editorial photography, no text, no logos.”
   - Asset ID: `412942803966563`; used in the business/eligibility feature.

### PixVerse video prompts

9. **Mumbai dawn loop — PixVerse V6, 720p, 8 seconds, no audio, seed 11072030:** “Subtle seamless cinematic movement: slow steady push toward the Mumbai horizon, warm dawn light gradually blooming through humid air, distant birds crossing once, the traveller remains almost still with only a slight natural fabric movement, locked horizon, documentary realism, no scene change, no camera shake, first and last frames visually compatible for a smooth website loop.”
   - Asset ID: `412942946084622`; used as the landing hero background.
10. **Kerala morning loop — PixVerse V6, 720p, 8 seconds, no audio, seed 11072031:** “Gentle seamless cinematic movement over Kerala backwaters: very slow forward drone glide following the traditional houseboat, morning mist drifting softly, palm fronds moving in a light breeze, water reflections remain calm, authentic documentary realism, no abrupt action, no scene change, stable horizon, first and last frames visually compatible for looping website background.”
   - Asset ID: `412943151151063`; used in the editorial story section.

## 7. PixVerse features used and why

- **Nano Banana 2 text-to-image:** used for consistent high-resolution cinematic source frames with direct aspect-ratio control.
- **Image-to-video:** source images preserve place, palette and framing while V6 adds subtle movement.
- **PixVerse V6:** selected for restrained 8-second website loops with controlled motion.
- **Fixed seeds:** make each output reproducible and documentable.
- **No audio:** prevents surprise playback and keeps the website accessible in public or work settings.
- **Loop-directed prompting:** stable horizon, slow motion, no scene change and visually compatible first/last frames reduce visible playback seams.
- **CLI JSON and asset IDs:** preserve a traceable generation record and deterministic handoff.

## 8. Iterations and decisions

- The first prototype used a 30-day tourist scenario and fixed dollar fee. Official re-checking showed that the requested product must follow normal business travel, so the entire information model was replaced with the 365-day e‑Business route.
- The initial prototype was a single large HTML view. The full build was split into real linked pages with shared CSS and JavaScript so landing, application, status, ETA, eligibility and support can evolve independently.
- Exact business fees were not invented. The website explains that the amount is nationality-specific and includes the official transaction-charge disclosure.
- A duplicate “Apply now” header action in the early standalone prototype was removed before the full rewrite.
- The visual brief was narrowed from generic “beautiful India” to four grounded contexts: Mumbai dawn, Bengaluru after monsoon rain, Jaipur craft and Kerala backwaters.
- The application separates applicant data from business-contact data. This prevents a long first page and mirrors the user’s mental model.
- The payment step displays the fee contract before review but does not imitate a live payment processor.
- The approved ETA stays digital-first while accurately explaining that the passport and ETA are presented at immigration.

## 9. Tools used

- Codex desktop and shell tools for repository work.
- `apply_patch` for all authored file changes.
- Indian Visa Online and official Bureau of Immigration content for policy facts.
- Existing competitive research in `docs/research/`.
- PixVerse CLI for four images and two image-to-video loops.
- HTML5, CSS and vanilla JavaScript; no framework or external runtime dependency.
- Git for local history/context only. No push was performed.

## 10. Deliverables

- `index.html` — cinematic business-eVisa landing page.
- `apply.html` — five-stage normal e‑Business application.
- `eligibility.html` — eligibility, activity, document and limit details.
- `help.html` — documents, fees, payment, tracking and arrival support.
- `track.html` — application lifecycle and recovery state.
- `eta.html` — approved digital ETA.
- `assets/css/site.css` — shared responsive visual system.
- `assets/js/site.js` — navigation, route result, application, uploads, status and accordion behaviour.
- `assets/images/` — four original PixVerse images.
- `assets/video/` — two original PixVerse loops.
- `agent-docs/` and `AGENTS.md` — durable cross-session knowledge network.

## 11. Handoff state

Development is complete for user review. Codex did not perform the requested final website verification. No changes have been pushed to GitHub. The next gate is Jayant’s visual and functional review; only after approval should the work be placed on and pushed to a staging branch.

