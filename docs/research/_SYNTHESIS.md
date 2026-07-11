# e-Visa / eTA competitive synthesis

Research date: 2026-07-11. Ten official portal endpoints were inspected. Where a portal blocked rendering or returned an error, the limitation is recorded rather than replaced with guessed visual detail.

## Executive conclusion

The winning Forge eVisa direction is **Kenya's welcoming clarity + Azerbaijan's process/price precision + India's real lifecycle and eligibility rules**. The experience should feel like a calm travel product while retaining the authority, auditability and recovery paths of a government service.

## Universal patterns

1. **Task separation:** Apply/new application and status/continue are usually distinct routes.
2. **Short process explanation:** the best portals reduce the service to 3–4 named steps before asking for data.
3. **Official identity:** ministry/immigration ownership, canonical URL and contact details are core trust devices.
4. **Email-based decision:** acknowledgement, review/approval and a downloadable or printable authorization are common.
5. **Passport-centred eligibility:** nationality/travel document, validity and purpose determine the route.
6. **Documents and payment:** scans plus card payment appear in nearly every eVisa flow, yet many sites defer price and document detail.
7. **Recovery:** continue application, status lookup and sometimes re-upload are essential because completion is not instantaneous.
8. **Language choice:** international portals frequently expose multiple languages, but placement varies from compact control to a full first screen.

## Differentiators

| Portal | Distinctive strength | Main weakness observed |
|---|---|---|
| India | Real four-step lifecycle, save/resume, re-upload, many visa types | Dense, contradictory/legacy rules; fee PDFs; weak hierarchy |
| Vietnam | Modern Vue/component architecture evidence | Blank client-rendered shell in capture; no readable fallback |
| Turkey | Domain-integrity lesson | Supplied official URL redirected to an unrelated-looking destination |
| Saudi Arabia | National platform/service framing | Portal timed out; no useful fallback state observed |
| Azerbaijan | Three steps, exact fee split, standard/urgent timing, family/group | Cloudflare blocks entry; warning/captcha burden |
| Kyrgyzstan | Apply/continue/status/passport-transfer services | Busy service menu; ambiguous “speed up review” action |
| Sri Lanka | Fees, entry checklist, acknowledgement/referral detail, languages | Legacy visual system and complex submission-method sprawl |
| Tanzania | Clear New/Continue/Status hub and pre-start checklist | Live ASP.NET runtime error; price/timing absent from home |
| Uganda | Warm destination story + four-step flow | Shell rendered blank; post-submit/cost story not visible |
| Kenya | Best modern hero, Apply/Check/Validate, shallow IA | Fee/timing certainty deferred from home |

## Color palette reference table

| Portal | Exact observed first-party/product values | Use in Forge? |
|---|---|---|
| India | `#212529`, `#2196F3`, `#DC1C24`, `#B53338`, `#89CFF0`, `#CFEBF9`, `#FFF` | Use only semantic ideas; avoid visual palette |
| Vietnam | Shell: `#000`, `rgb(40,50,82)`, `#FFF`; product tokens unavailable | No |
| Turkey | Redirect target: `#00204A`, `#212529`, `#DC3545`, `#198754`, `#FFC107` | No; not verified product UI |
| Saudi Arabia | Not statically extractable | No |
| Azerbaijan | Product tokens blocked; verification screen `#313131`, `#F2F2F2`, `#82B6FF` | No; verification only |
| Kyrgyzstan | `#09B169`, `#30333A`, `#191C23`, `#C8C8C8`, `#FFF` | Reference semantic green only |
| Sri Lanka | `#2D4452`, `#5468A5`, `#996600`, `#FF9900`, `#006699`, `#005DAB` | No; legacy visual character |
| Tanzania | Error page only: `#FF0000`, `#800000`, `#FFF` | No |
| Uganda | Shell: `#000`, `#4C4C4E`, `#333`, `#F5F5F7` | Neutral reference only |
| Kenya | `#030712`, `#244FBB`, `#006B3F`, `#4CAC7D`, `#21AE95`, `#D6991E`, `#FFF` | Reference contrast/hierarchy, not brand copy |

### Forge palette decision

Keep the approved warm editorial system: ivory `#FAF9F5`, surface `#F0EEE6`, border `#E8E6DC`, near-black `#141413`, terracotta CTA `#C6613F`, clay hover `#D97757`, olive success `#788C6D`, sky info `#6A9BCC`. Competitors prove that authority does not require generic government blue; structure and trust copy can carry credibility.

## Typography reference table

| Portal | Observed typography | Hierarchy observation |
|---|---|---|
| India | System/Segoe UI/Roboto/Arial; Poppins and Montserrat assets; 14–20px headings, 24px advisory | Small, inconsistent heading scale |
| Vietnam | Not extractable from rendered shell | Component stack visible, content hierarchy unavailable |
| Turkey | Redirect target Poppins/Titillium Web; 35.2px/600 white heading | Marketing/carousel hierarchy, not visa UI |
| Saudi Arabia | Not statically extractable | — |
| Azerbaijan | Product typography blocked | Strong textual hierarchy survives extraction: H1 + numbered steps |
| Kyrgyzstan | Bebas Neue display + Arial/Helvetica fallback | Distinct service tiles, legacy typography |
| Sri Lanka | Tahoma; Verdana/Arial/Helvetica | Dense small-text information system |
| Tanzania | Error-page Verdana 24px/18.67px | No product hierarchy observed |
| Uganda | Not extractable; shell dark-gray/system output | Public content uses numbered steps |
| Kenya | Lexend; Inter/Roboto also loaded; hero 48px/600 | Best clear modern hierarchy |

### Forge typography decision

Use Playfair Display 500–700 only for short, reassuring display headlines; use Inter 300–700 for every task, label, table and status. The serif creates a travel/editorial voice, while Inter protects form legibility. Never use display type inside dense application controls.

## Navigation architecture comparison

| Level | Portals | Pattern |
|---|---|---|
| Minimal | Kenya, Uganda, Azerbaijan | One dominant Apply action, status nearby, support content in cards/FAQ |
| Standard | Tanzania, Kyrgyzstan | New/Continue/Status service hub plus information links |
| Deep | India, Sri Lanka | Many visa, payment, print, instruction and submission-method utilities |
| Unobservable/blocked | Vietnam, Saudi Arabia | App shell or timeout prevented reliable IA capture |
| Broken trust path | Turkey | Supplied domain redirected away from a recognisable official service |

Forge should use **minimal public navigation**—Home, Apply, Track—then contextualise everything else inside the selected applicant journey. Continue/resume can appear automatically when mock progress exists.

## What India's portal does badly

- Leads with helpdesk/utility density rather than a welcoming applicant promise.
- Hides category validity, entries, documents and fees in panels, FAQs and PDFs.
- Mixes current and legacy/commented rules; medical entries/durations visibly conflict between category markup and FAQ content.
- Makes users infer the correct route from nine categories rather than asking nationality + purpose.
- Treats Apply, partial completion, payment, print, status and re-upload as similarly weighted links.
- Retains print/Adobe Reader language and an old update stamp, weakening confidence in a current digital service.
- Explains re-upload as prose instead of showing a clear “Action needed” state with the rejected file and deadline.

## What other portals do best

- **Kenya:** the most welcoming hero, shallow IA, crisp Apply/Check/Validate distinction and human support options.
- **Azerbaijan:** the clearest 3-step explanation, exact US$20 + US$9 fee split, processing choices and status fallback.
- **Tanzania/Kyrgyzstan:** explicit New/Continue/Status routing and useful pre-start eligibility/document orientation.
- **Sri Lanka:** acknowledgement/referral semantics, detailed fee matrices, entry requirements and language breadth.
- **Uganda:** destination emotion and a memorable numbered flow.

## Actionable recommendations for Forge eVisa

1. **Hero:** “Your trip to India starts here—not with paperwork.” Pair **Apply now** with **Track application**. Add “Typically processed within 72 hours” and the anti-fraud trust line below.
2. **Preflight:** Ask nationality and trip purpose before presenting a visa. Return one recommendation with duration, entries, documents, fee and processing time on a single card.
3. **Fee contract:** Show visa fee, processing fee and non-refundable note on the recommendation card and again at payment—never reveal price only after form completion.
4. **Application:** Four persistent steps: Apply → Documents → Pay → Review. Each step should fit one clear task and preserve mock state.
5. **Documents:** Give visual examples/criteria, per-file validation and a recoverable “Action needed” state that explains exactly what to replace.
6. **Submission:** Generate a copyable reference instantly, explain what happens next, and link directly to Track.
7. **Tracking:** Present Submitted → Under review → Approved as an event timeline. If action is required, show the document and deadline inline.
8. **ETA:** Deliver a digital pass with QR, passport summary, validity, status and optional download. Printing is optional, not required.
9. **Content:** Keep policy text behind “Why we ask” or “Eligibility details” expanders; never hide price, required documents or key disqualifiers.
10. **Resilience:** Meaningful server-rendered headings/actions, accessible loading/error states and saved-progress messaging prevent the blank/error outcomes observed elsewhere.

## Locked UX rules for the build

- Exact fee and refund terms before commitment.
- One recommended route, not a category directory.
- Apply and Track are the only competing primary tasks.
- Persistent progress across all application routes.
- Plain language in the task; legal detail is contextual.
- Official/canonical anti-fraud trust line on home, payment and footer.
- Every submit/upload/payment mock has a visible success or recovery state.
- The final artifact is digital-first and usable on mobile without printing.
