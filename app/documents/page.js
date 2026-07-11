'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Toast from '../components/Toast';
import Accordion from '../components/Accordion';

const documentRows = [
  {
    key: 'passport',
    title: 'Passport bio page',
    detail: 'Scanned PDF or JPEG of the page with your photograph, name, date of birth, nationality and expiry date.',
    file: 'passport-bio-page.pdf',
    size: '1.4 MB',
    uploaded: '11 Jul · 12:41',
    status: 'ready',
    statusLabel: 'Ready',
    thumb: '/images/webp/doc-passport-mockup.webp',
  },
  {
    key: 'photo',
    title: 'Recent photograph',
    detail: 'Front-facing, plain white background, 25–35 mm head height, JPEG 10–300 KB, equal height and width.',
    file: 'photo-white-bg.jpg',
    size: '142 KB',
    uploaded: '11 Jul · 12:42',
    status: 'ready',
    statusLabel: 'Ready',
    thumb: '/images/webp/doc-photo-mockup.webp',
  },
  {
    key: 'business',
    title: 'Category evidence',
    detail: 'Business card, invitation letter, hospital letter, admission letter, onward ticket or clearance — depending on the eVisa category.',
    file: 'invitation-letter.pdf',
    size: '480 KB',
    uploaded: '11 Jul · 12:42',
    status: 'review',
    statusLabel: 'Under review',
    thumb: '/images/webp/doc-invitation-mockup.webp',
  },
  {
    key: 'travel',
    title: 'Travel confirmation',
    detail: 'Return or onward ticket, accommodation booking or itinerary that supports your travel dates.',
    file: 'flight-confirmation.pdf',
    size: '210 KB',
    uploaded: '11 Jul · 12:42',
    status: 'missing',
    statusLabel: 'Optional · not provided',
    thumb: '/images/webp/doc-flight-mockup.webp',
  },
];

const categoryEvidence = [
  {
    tag: 'e-Tourist',
    title: 'Tourist evidence',
    detail: 'Passport bio page + recent photo. Return or onward ticket recommended.',
    items: ['Passport bio page', 'Recent photograph', 'Onward journey proof (recommended)'],
  },
  {
    tag: 'e-Business',
    title: 'Business evidence',
    detail: 'Business card from a verifiable employer, or an invitation letter from the Indian host company on letterhead.',
    items: ['Business card', 'Invitation letter (company, address, phone)', 'Passport bio page', 'Recent photograph'],
  },
  {
    tag: 'e-Medical',
    title: 'Medical evidence',
    detail: 'Hospital letter on letterhead stating the medical condition, treatment plan and approximate duration.',
    items: ['Hospital letter', 'Passport bio page', 'Recent photograph'],
  },
  {
    tag: 'e-Student / Family',
    title: 'Study or dependent evidence',
    detail: 'Admission letter from the Indian institution, or proof of relationship for an e-Family dependent.',
    items: ['Admission letter', 'Passport bio page', 'Recent photograph', 'Family relationship proof'],
  },
  {
    tag: 'e-Transit',
    title: 'Transit evidence',
    detail: 'Confirmed onward ticket and any onward permission required by the transit country.',
    items: ['Onward ticket', 'Passport bio page', 'Recent photograph'],
  },
  {
    tag: 'e-Conference',
    title: 'Conference evidence',
    detail: 'Invitation from the conference organiser, plus political or event clearance where the route requires it.',
    items: ['Conference invitation', 'Political / event clearance', 'Passport bio page', 'Recent photograph'],
  },
];

const docFaq = [
  {
    question: 'What if one of my documents is rejected?',
    answer: 'You will receive an email within 24 hours identifying the file and the reason. The email contains a direct link to the Re-upload tab where you can replace the specific document without resubmitting the whole application.',
  },
  {
    question: 'What is the exact photograph specification?',
    answer: 'JPEG only, 10–300 KB, equal height and width. Full face, front view, eyes open, plain light or white background, no shadows on the face or background, no borders. Head height 25–35 mm, eye height 28–35 mm.',
  },
  {
    question: 'Can I use the same photo for two different applications?',
    answer: 'Yes. As long as the photo meets the official spec and is recent, the same file can be reused across applications. Keep a copy in your files so you can re-upload quickly if asked.',
  },
  {
    question: 'Do I need a business card for an e-Business Visa?',
    answer: 'A business card is one accepted form of evidence. The alternative is an invitation letter on the Indian host company\u2019s letterhead including the company name, address and contact phone.',
  },
  {
    question: 'Is a flight ticket required at the documents stage?',
    answer: 'For e-Tourist and e-Business, an onward or return journey proof is recommended at submission and may be requested later. It is not part of the mandatory first-day upload set.',
  },
  {
    question: 'How long does the Re-upload tab stay open?',
    answer: 'The Re-upload tab is available for the lifetime of the application. There is no expiry on the link; if you no longer have the email, you can still reach the tab directly from the official Indian Visa Online portal.',
  },
  {
    question: 'Can I replace a document that was already marked Ready?',
    answer: 'Yes. Use the Replace file action on the document row to upload a new version. The new file is reviewed against the same spec; status will move to "Under review" again.',
  },
  {
    question: 'Is there a fee for re-uploading a document?',
    answer: 'No. Re-uploading a corrected file is part of the application process and is not a new transaction. The eVisa fee is paid once and is not refunded for re-uploads.',
  },
];

export default function DocumentsPage() {
  const [reference, setReference] = useState('IND-BIZ-26-7K92');
  const [docRows, setDocRows] = useState(documentRows);

  useEffect(() => {
    document.body.classList.add('app-bg');
    return () => document.body.classList.remove('app-bg');
  }, []);

  const handleReplace = (key) => {
    window.__forgeToast?.('Document ready to review');
    setDocRows((rows) =>
      rows.map((row) =>
        row.key === key
          ? { ...row, status: 'review', statusLabel: 'Under review', uploaded: 'just now' }
          : row
      )
    );
  };

  const handleReferenceLookup = (e) => {
    e.preventDefault();
    if (!reference.trim()) {
      window.__forgeToast?.('Enter your application reference');
      return;
    }
    window.__forgeToast?.(`Status refreshed for ${reference.toUpperCase()}`);
  };

  return (
    <>
      <main>
        <section className="docs-hero">
          <div className="docs-hero-media">
            <img src="/images/webp/doc-hero.webp" alt="An immigration officer at an Indian airport counter scanning a passport under warm light" loading="lazy" />
          </div>
          <div className="container docs-hero-content">
            <div className="breadcrumb">
              <Link href="/">Home</Link><span>›</span><span>Documents</span>
            </div>
            <div className="eyebrow light" style={{ marginTop: '28px' }}>Document centre</div>
            <h1 className="serif">Every file, clearly accounted for.</h1>
            <p>Check the status of each uploaded document, see what each eVisa category needs, and re-upload a clearer file if the official team has asked for one — all in one place.</p>
            <form className="docs-reference" onSubmit={handleReferenceLookup}>
              <label htmlFor="docsRef">Application reference</label>
              <input
                id="docsRef"
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="IND-BIZ-26-7K92"
                spellCheck="false"
                autoComplete="off"
              />
              <button className="btn btn-primary btn-sm" type="submit">Refresh status →</button>
            </form>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="docs-section-head">
              <div>
                <div className="eyebrow">Document status</div>
                <h2 className="serif">What you have uploaded so far.</h2>
              </div>
              <p>Each row shows the current review state. Ready means the file is on file; Under review means the official team is looking at it; a re-upload request will appear in the row with a direct replace action.</p>
            </div>

            <div className="docs-status-card">
              <div className="docs-status-head">
                <div>
                  <div className="eyebrow">Active application</div>
                  <h2>IND-BIZ-26-7K92 · e-Business Visa</h2>
                  <p>Submitted 11 Jul · United Kingdom passport · arrival 10 Aug 2026. Document review is in progress.</p>
                </div>
                <Link className="btn btn-outline btn-sm" href="/track">Open tracking →</Link>
              </div>

              <div className="docs-status-list">
                {docRows.map((row) => (
                  <div className="docs-row" key={row.key}>
                    <div className="docs-row-thumb">
                      <img src={row.thumb} alt="" />
                    </div>
                    <div className="docs-row-info">
                      <h3>{row.title}</h3>
                      <p>{row.detail}</p>
                      <div className="docs-row-meta">
                        <span>📄 {row.file}</span>
                        <span>{row.size}</span>
                        <span>↑ {row.uploaded}</span>
                      </div>
                    </div>
                    <div className="docs-row-actions">
                      <span className={`status-pill ${row.status}`}>{row.statusLabel}</span>
                      <button className="docs-row-replace" type="button" onClick={() => handleReplace(row.key)}>Replace file</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section soft" style={{ paddingTop: 60, paddingBottom: 60 }}>
          <div className="container">
            <div className="docs-section-head">
              <div>
                <div className="eyebrow">Inside the journey</div>
                <h2 className="serif">A short look at the document handover.</h2>
              </div>
              <p>A still moment from the official eVisa journey — passport under warm light, immigration counter, the stamp that opens the country.</p>
            </div>
            <div className="docs-video-block">
              <video autoPlay muted loop playsInline preload="metadata" poster="/images/webp/doc-hero.webp">
                <source src="/video/compressed/documents-loop-1080p.mp4" type="video/mp4" />
              </video>
            </div>
            <p className="docs-video-caption">15-second loop · 2160p · Seedance 2.0 Standard</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="docs-section-head">
              <div>
                <div className="eyebrow">Official specifications</div>
                <h2 className="serif">What the official team checks.</h2>
              </div>
              <p>Both the passport bio page and the photograph have exact format requirements. The values below are mirrored from indianvisaonline.gov.in — if your file does not meet them, the re-upload email will arrive.</p>
            </div>

            <div className="docs-specs">
              <article className="docs-spec-card">
                <h3>Passport bio page <span className="spec-badge">PDF or JPEG</span></h3>
                <ul className="docs-spec-list">
                  <li><span><strong>Validity</strong>At least six months from the date of application. Two blank pages minimum for immigration stamps.</span></li>
                  <li><span><strong>Scan</strong>Full page visible, no glare, no edges cropped, single page only. PDF or JPEG accepted.</span></li>
                  <li><span><strong>Readability</strong>Name, date of birth, nationality, passport number and expiry date must all be legible.</span></li>
                  <li><span><strong>File size</strong>Keep the scan under 5 MB. Larger files will not upload through the portal.</span></li>
                </ul>
                <div className="docs-spec-rejection">
                  <strong>Common rejection reasons</strong>
                  Glare from a phone flash, the page photographed at an angle, the photograph page missing, multiple pages uploaded as one file.
                </div>
              </article>

              <article className="docs-spec-card">
                <h3>Recent photograph <span className="spec-badge">JPEG 10–300 KB</span></h3>
                <ul className="docs-spec-list">
                  <li><span><strong>Format</strong>JPEG only. Height and width must be equal. 10 KB minimum, 300 KB maximum.</span></li>
                  <li><span><strong>Background</strong>Plain light or white. No objects, no people in the background, no shadows on the wall.</span></li>
                  <li><span><strong>Subject</strong>Full face, front view, eyes open. Head centred from top of hair to bottom of chin.</span></li>
                  <li><span><strong>Measurements</strong>Head height 25–35 mm. Eye height 28–35 mm. No borders, no filters, no edits.</span></li>
                </ul>
                <div className="docs-spec-rejection">
                  <strong>Common rejection reasons</strong>
                  Eyewear with glare, hats or head coverings (unless for religion), selfie angle, colour background, image from a passport that is already cropped.
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section soft">
          <div className="container">
            <div className="docs-section-head">
              <div>
                <div className="eyebrow">Per-category evidence</div>
                <h2 className="serif">What each eVisa category needs.</h2>
              </div>
              <p>Passport bio page and recent photograph are required for every category. The third document changes with the route you choose.</p>
            </div>

            <div className="docs-categories-grid">
              {categoryEvidence.map((c) => (
                <article className="docs-category-card" key={c.tag}>
                  <span className="category-tag">{c.tag}</span>
                  <h3>{c.title}</h3>
                  <p>{c.detail}</p>
                  <ul className="evidence-list">
                    {c.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="docs-section-head">
              <div>
                <div className="eyebrow">Re-upload walkthrough</div>
                <h2 className="serif">From rejection email to a fresh file.</h2>
              </div>
              <p>If a document is not appropriate, the official team emails you with a direct link to the Re-upload tab. The whole loop usually takes under five minutes.</p>
            </div>

            <div className="docs-walkthrough-grid">
              <article className="docs-walkthrough-step">
                <span className="step-num">1</span>
                <div className="step-image"><img src="/images/webp/doc-reup-step1.webp" alt="Email inbox mockup showing the re-upload notification" loading="lazy" /></div>
                <div className="step-body">
                  <h3>Receive the email</h3>
                  <p>Within about 24 hours, the official team emails the address you used to apply. The subject line identifies which document to replace.</p>
                </div>
              </article>
              <article className="docs-walkthrough-step">
                <span className="step-num">2</span>
                <div className="step-image"><img src="/images/webp/doc-reup-step2.webp" alt="Re-upload form with a file drop zone" loading="lazy" /></div>
                <div className="step-body">
                  <h3>Open the Re-upload tab</h3>
                  <p>The email link takes you to the Re-upload tab on the official portal. The offending document is highlighted — no need to redo the rest of the form.</p>
                </div>
              </article>
              <article className="docs-walkthrough-step">
                <span className="step-num">3</span>
                <div className="step-image"><img src="/images/webp/doc-reup-step3.webp" alt="Confirmation screen after a successful re-upload" loading="lazy" /></div>
                <div className="step-body">
                  <h3>Submit the corrected file</h3>
                  <p>Upload the corrected file in the same spec as the original. Status returns to Under review. The same reference number is used throughout.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section soft">
          <div className="container">
            <div className="docs-section-head">
              <div>
                <div className="eyebrow">Document FAQ</div>
                <h2 className="serif">The questions the helpdesk gets most.</h2>
              </div>
              <p>Eight short answers, grounded in the official portal and in the way the re-upload flow works in practice.</p>
            </div>
            <Accordion items={docFaq} defaultOpen={0} />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="docs-section-head">
              <div>
                <div className="eyebrow">Official support</div>
                <h2 className="serif">When you need the source.</h2>
              </div>
              <p>For case-specific decisions, payment disputes or changes to eligibility, use the Government of India&#39;s official services.</p>
            </div>
            <div className="docs-official">
              <article className="docs-official-card">
                <h3>Re-upload tab on Indian Visa Online</h3>
                <p>The official portal exposes a Re-upload tab that survives for the lifetime of the application. If you cannot find the email, the tab is reachable directly.</p>
                <a className="btn btn-primary btn-sm" href="https://indianvisaonline.gov.in/evisa/" target="_blank" rel="noopener">Open the Re-upload tab ↗</a>
              </article>
              <article className="docs-helpdesk-card">
                <h3>Helpdesk numbers</h3>
                <div className="docs-helpdesk-list">
                  <div className="row"><strong>SBI ePay (payment)</strong><span>+91-022-65361671 · 24×7</span></div>
                  <div className="row"><strong>Axis Bank (payment)</strong><span>+91 1800-419-0073 · 24×7</span></div>
                  <div className="row"><strong>Rest of world (paid)</strong><span>+91-40-6717-4100</span></div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Toast />
    </>
  );
}
