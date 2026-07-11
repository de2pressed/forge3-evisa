'use client';
import Link from 'next/link';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import Toast from '../components/Toast';

export default function EligibilityPage() {
  return (
    <>
      <SiteHeader announcement="Normal e‑Business applications should be made at least 4 days before arrival." />
      <main>
        <section className="page-hero has-image">
          <div className="page-hero-media"><img src="/images/kerala-backwaters.png" alt="Morning over Kerala's backwaters" /></div>
          <div className="container page-hero-content">
            <div className="breadcrumb"><Link href="/">Home</Link><span>›</span><span>Eligibility</span></div>
            <div className="eyebrow light" style={{ marginTop: '35px' }}>Know before you begin</div>
            <h1 className="serif">A clear route into business India.</h1>
            <p>Passport rules, eligible activity, documents and timing for the normal Indian e&#x2011;Business Visa—brought together in one readable place.</p>
          </div>
        </section>

        <section className="section">
          <div className="container info-layout">
            <nav className="side-nav card" aria-label="Page sections">
              <a className="active" href="#route">Your route</a>
              <a href="#passport">Passport</a>
              <a href="#activity">Business activity</a>
              <a href="#documents">Documents</a>
              <a href="#timing">Timing and validity</a>
              <a href="#limits">Important limits</a>
            </nav>
            <div>
              <section className="content-block" id="route">
                <div className="eyebrow">Normal e&#x2011;Business</div>
                <h2 className="serif">Is this the right visa?</h2>
                <p>This route is intended for eligible foreign nationals visiting India for normal business purposes such as meetings, negotiations, trade, supplier relationships, recruitment, internal company activity or technical consultation.</p>
                <div className="detail-table">
                  <div className="detail-row"><span>Validity</span><strong>365 days from the date ETA is granted</strong></div>
                  <div className="detail-row"><span>Entries</span><strong>Multiple</strong></div>
                  <div className="detail-row"><span>Continuous stay</span><strong>Up to 180 days on each visit</strong></div>
                  <div className="detail-row"><span>Application timing</span><strong>At least 4 days and generally up to 120 days before arrival</strong></div>
                </div>
              </section>

              <section className="content-block" id="passport">
                <div className="eyebrow">Passport readiness</div>
                <h2 className="serif">Travel on the same passport.</h2>
                <p>Your passport should normally have at least six months of validity when you apply and at least two blank pages for immigration stamping. The bio page must be clear and show your photograph and personal details.</p>
                <div className="notice">Applicants holding Pakistani passports or of Pakistani origin are directed by the official instructions to use the regular visa route rather than the eVisa route.</div>
              </section>

              <section className="content-block" id="activity">
                <div className="eyebrow">Business purpose</div>
                <h2 className="serif">One route, specific activity.</h2>
                <p>Describe the purpose of your visit precisely. Specialist purposes—including conferences, sports, film work, academic programmes and protected-area travel—can require additional evidence or a different sub-category.</p>
                <h3>Normal business examples</h3>
                <ul>
                  <li>Meetings, negotiations or board activity</li>
                  <li>Supplier, customer or partner visits</li>
                  <li>Sales, trade or commercial discussions</li>
                  <li>Recruitment and internal company meetings</li>
                  <li>Technical consultation or project discussions</li>
                </ul>
              </section>

              <section className="content-block" id="documents">
                <div className="eyebrow">Prepare your files</div>
                <h2 className="serif">Three core documents.</h2>
                <div className="document-grid">
                  <article className="document-card card"><strong>Passport bio page</strong><p>Photograph, name, date of birth, nationality and expiry date fully visible.</p></article>
                  <article className="document-card card"><strong>Recent photograph</strong><p>Front-facing, full face, plain white background and clear image quality.</p></article>
                  <article className="document-card card"><strong>Business card</strong><p>A card supplied by the organisation you currently work for.</p></article>
                  <article className="document-card card"><strong>Or Indian invitation</strong><p>Company information, address and phone number in India. Additional invitation evidence may be requested.</p></article>
                </div>
              </section>

              <section className="content-block" id="timing">
                <div className="eyebrow">Dates that matter</div>
                <h2 className="serif">Give the application room.</h2>
                <p>Eligible e&#x2011;Business applicants may apply online a minimum of four days before arrival, and generally up to 120 days ahead of the proposed journey. The 365-day visa validity begins when ETA is granted—not when you first arrive.</p>
                <div className="advisory"><div><strong>Do not book around an assumed decision.</strong><span>Wait for confirmation or grant of ETA before travelling to India.</span></div></div>
              </section>

              <section className="content-block" id="limits">
                <div className="eyebrow">Important limits</div>
                <h2 className="serif">What the eVisa does not cover.</h2>
                <ul>
                  <li>The eVisa is non-extendable and non-convertible.</li>
                  <li>It is not valid for visiting Protected, Restricted or Cantonment Areas without prior permission from the relevant civil authority.</li>
                  <li>Biometric details are captured at immigration on arrival.</li>
                  <li>A return or onward ticket and sufficient funds may be required.</li>
                  <li>The application fee is not refundable if the application is refused.</li>
                </ul>
                <p><Link className="btn btn-primary" href="/apply">I&#39;m ready to apply →</Link></p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter variant="minimal" disclaimer="Requirements summarised from Indian Visa Online. Confirm final eligibility with official guidance." />
      <Toast />
    </>
  );
}
