'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import Toast from './components/Toast';
import Accordion from './components/Accordion';

const visaCategories = [
  { value: 'tourist', title: 'e-Tourist Visa', detail: 'For sightseeing, casual visits, short yoga, short courses and permitted short voluntary activity.', docs: 'Passport bio page, recent photo and purpose-specific evidence if applicable.' },
  { value: 'business', title: 'e-Business Visa', detail: 'For meetings, trade, recruitment, supplier visits, technical consultations and eligible commercial activity.', docs: 'Passport bio page, recent photo, business card and invitation where applicable.' },
  { value: 'medical', title: 'e-Medical Visa', detail: 'For medical treatment in India, including treatment under Indian systems of medicine.', docs: 'Passport bio page, recent photo and hospital letter.' },
  { value: 'student', title: 'e-Student / Family Visa', detail: 'For eligible study-related travel and approved dependent family travel.', docs: 'Passport bio page, recent photo, admission/support evidence and category documents.' },
  { value: 'transit', title: 'e-Transit Visa', detail: 'For eligible travellers passing through India with confirmed onward travel.', docs: 'Passport bio page, recent photo, confirmed ticket and onward permission where required.' },
  { value: 'conference', title: 'Conference / Event route', detail: 'For eligible conferences, seminars, workshops and regulated specialist activities.', docs: 'Passport bio page, invitation, political/event clearance when required.' },
];

const faqItems = [
  { question: 'Is Indian eVisa only for business travel?', answer: 'No. Official guidance lists tourist, business, medical, medical attendant, student, family, transit, miscellaneous and production investment categories. This redesigned flow starts with purpose so the right category and documents are shown first.' },
  { question: 'When should I apply?', answer: 'For e-Tourist and e-Business travel, eligible applicants should apply online at least four days before arrival. Medical and medical-attendant routes also use a four-day minimum with a 120-day application window in official guidance.' },
  { question: 'Can I pay for faster processing?', answer: 'No. Government of India guidance says there is no emergency or express eVisa fee. Treat any claim of guaranteed faster grant for an extra government fee as suspicious.' },
  { question: 'What happens after submission?', answer: 'The application is scrutinized. If a document or image is not appropriate, the applicant may be advised by email to re-upload it. ETA is sent by email when granted and should be carried while travelling.' },
];

export default function HomePage() {
  const [showRoute, setShowRoute] = useState(false);
  const [route, setRoute] = useState(visaCategories[0]);
  const purposeRef = useRef(null);

  const handleRouteSubmit = (e) => {
    e.preventDefault();
    const selected = visaCategories.find(item => item.value === purposeRef.current?.value) || visaCategories[0];
    setRoute(selected);
    setShowRoute(true);
    window.__forgeToast?.('Your eVisa route is ready');
  };

  return (
    <>
      <SiteHeader announcement="No emergency or express eVisa fee is charged. Know every cost before you pay." />
      <main>
        <section className="hero">
          <div className="hero-media">
            <video autoPlay muted loop playsInline poster="/images/india-beauty-hero.jpg">
              <source src="/video/india-beauty-loop.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="container hero-content">
            <div>
              <div className="eyebrow light">Indian e&#x2011;Visa</div>
              <h1 className="serif">India begins with the right e&#x2011;Visa.</h1>
              <p className="hero-lead">Choose your travel purpose, prepare the right documents, pay the correct fee and track your ETA from one clear journey.</p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href="/apply">Start application ↗</Link>
                <Link className="btn btn-light" href="/track">Track or continue</Link>
              </div>
              <div className="hero-trust">
                <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3 20 6v5c0 5.2-3.4 8.4-8 10-4.6-1.6-8-4.8-8-10V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg>Official-source guidance</span>
                <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>Apply at least 4 days ahead</span>
                <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>Country-specific fee shown before payment</span>
              </div>
            </div>
            <aside className="hero-card">
              <div className="hero-card-top">
                <div><div className="eyebrow">Choose your route</div><h2>{route.title}</h2></div>
                <span className="pill">Eligible route</span>
              </div>
              <div className="fact-list">
                <div className="fact-row"><span>Start with</span><strong>Travel purpose</strong></div>
                <div className="fact-row"><span>Core files</span><strong>Passport + photo</strong></div>
                <div className="fact-row"><span>Fee</span><strong>Country-specific</strong></div>
                <div className="fact-row"><span>ETA</span><strong>Sent by email</strong></div>
              </div>
              <div className="hero-docs">
                <h3>Most used categories</h3>
                <ul className="clean-list">
                  <li><span className="tick">✓</span>Tourist, business and medical</li>
                  <li><span className="tick">✓</span>Student, family and transit</li>
                  <li><span className="tick">✓</span>Conference and specialist routes</li>
                </ul>
              </div>
              <Link className="btn btn-dark" href="/apply">Find my category →</Link>
            </aside>
          </div>
          <div className="scroll-cue">Discover India</div>
        </section>

        <section className="proof-strip"><div className="container proof-grid">
          <div className="proof-item"><span className="proof-icon">9</span><div><strong>eVisa categories</strong><span>Tourist, business, medical, student and more</span></div></div>
          <div className="proof-item"><span className="proof-icon">4</span><div><strong>Core process steps</strong><span>Apply, pay, receive ETA, fly</span></div></div>
          <div className="proof-item"><span className="proof-icon">↺</span><div><strong>Recovery built in</strong><span>Continue, verify payment and re-upload</span></div></div>
          <div className="proof-item"><span className="proof-icon">₹</span><div><strong>Transparent payment</strong><span>Fee varies by nationality and category</span></div></div>
        </div></section>

        <section className="section"><div className="container"><div className="quick-start card">
          <div className="quick-copy">
            <div className="eyebrow">Check your route</div>
            <h2 className="serif">One purpose. The right document list.</h2>
            <p>We&apos;ll use your passport, travel purpose and arrival date to point you to the right eVisa path before you start typing application details.</p>
          </div>
          <form className="quick-form" onSubmit={handleRouteSubmit}>
            <div className="form-grid">
              <div className="field"><label htmlFor="nationality">Passport nationality</label><select id="nationality"><option>United Kingdom</option><option>United States</option><option>Australia</option><option>Canada</option><option>Japan</option><option>Singapore</option></select></div>
              <div className="field"><label htmlFor="purpose">Reason for travel</label><select id="purpose" ref={purposeRef}>{visaCategories.map(item => <option key={item.value} value={item.value}>{item.title}</option>)}</select></div>
              <div className="field full"><label htmlFor="arrival">Planned arrival</label><input id="arrival" type="date" defaultValue="2026-08-10" /></div>
            </div>
            <button className="btn btn-primary" type="submit">See my route →</button>
            <div className={`route-result${showRoute ? ' show' : ''}`}>
              <div className="route-result-top"><div><div className="eyebrow">Recommended</div><h3>{route.title}</h3><p>{route.detail}</p></div><span className="pill">Matched</span></div>
              <p style={{ marginTop: '10px' }}><strong>Prepare:</strong> {route.docs}</p>
              <Link className="btn btn-dark btn-sm" href="/apply">Start application</Link>
            </div>
          </form>
        </div></div></section>

        <section className="section soft"><div className="container">
          <div className="section-head"><div><div className="eyebrow">Visa categories</div><h2 className="serif">The service is not business-only.</h2></div><p>Official guidance lists several eVisa routes. The redesigned experience starts by choosing the category, then narrows timing, documents and payment.</p></div>
          <div className="category-grid">
            {visaCategories.map(item => <article className="category-card card" key={item.value}><h3>{item.title}</h3><p>{item.detail}</p><span>{item.docs}</span></article>)}
          </div>
        </div></section>

        <section className="section dark"><div className="container">
          <div className="section-head"><div><div className="eyebrow light">Official lifecycle</div><h2 className="serif">Apply online. Pay online. Receive ETA. Fly to India.</h2></div><p>The public journey follows the official four-step process while adding recovery actions for partially filled forms, failed payments and document re-upload.</p></div>
          <div className="steps-grid">
            <article className="step"><span className="step-num">01</span><h3>Apply online</h3><p>Choose the category, enter passport and trip details, then upload required files.</p></article>
            <article className="step"><span className="step-num">02</span><h3>Pay eVisa fee</h3><p>Review the nationality/category-specific fee and transaction charges before payment.</p></article>
            <article className="step"><span className="step-num">03</span><h3>Receive ETA</h3><p>Electronic Travel Authorization is sent to the registered email when granted.</p></article>
            <article className="step"><span className="step-num">04</span><h3>Fly to India</h3><p>Carry the ETA and matching passport for immigration stamping on arrival.</p></article>
          </div>
        </div></section>

        <section className="section"><div className="container"><div className="feature-grid">
          <figure className="feature-visual">
            <img src="/images/bengaluru-blue-hour.png" alt="Bengaluru business district after monsoon rain" />
            <figcaption className="feature-caption"><strong>India moves at many speeds.</strong><span>Bengaluru · Karnataka</span></figcaption>
          </figure>
          <div className="feature-cards">
            <article className="feature-card card"><div><div className="eyebrow">Before you begin</div><h3>Check eligibility</h3><p>Passport nationality, passport type, travel purpose and prior restrictions decide whether eVisa is available.</p></div><Link href="/eligibility">Review the checklist →</Link></article>
            <article className="feature-card card"><div><div className="eyebrow">No surprises</div><h3>Fees depend on category and nationality</h3><p>The applicable eVisa fee and bank transaction charge are shown before payment. No emergency fee exists.</p></div><Link href="/help#fees">Understand fees →</Link></article>
            <article className="feature-card card"><div><div className="eyebrow">Return with confidence</div><h3>Track every update</h3><p>See submission, payment, document review, re-upload requests and decision as one readable timeline.</p></div><Link href="/track">Track an application →</Link></article>
          </div>
        </div></div></section>

        <section className="section soft"><div className="container">
          <div className="section-head"><div><div className="eyebrow">Continue or manage</div><h2 className="serif">The official service has recovery actions. So should this redesign.</h2></div><p>Applicants do not only start new forms. They come back to finish, pay, print, track and re-upload.</p></div>
          <div className="utility-grid">
            <Link className="utility-card card" href="/apply"><strong>Complete partially filled form</strong><span>Return to a saved application and continue from the last step.</span></Link>
            <Link className="utility-card card" href="/track"><strong>Verify payment / pay fee</strong><span>Check pending payment state before retrying a transaction.</span></Link>
            <Link className="utility-card card" href="/track"><strong>Print eVisa application</strong><span>Access the submitted form for records and travel preparation.</span></Link>
            <Link className="utility-card card" href="/track"><strong>Check visa status</strong><span>Use the application reference to see scrutiny, re-upload and ETA status.</span></Link>
            <Link className="utility-card card" href="/apply"><strong>Reupload data</strong><span>Replace unclear documents when review requests a correction.</span></Link>
            <a className="utility-card card" href="https://indianvisaonline.gov.in/evisa/images/SampleForm.pdf" target="_blank" rel="noopener"><strong>Sample application form ↗</strong><span>Compare the redesigned flow against the official sample form.</span></a>
          </div>
        </div></section>

        <section className="section" id="requirements"><div className="container">
          <div className="section-head"><div><div className="eyebrow">Document checklist</div><h2 className="serif">Core files first. Category evidence second.</h2></div><p>Every route starts with passport and photo. Additional documents depend on the eVisa category and purpose.</p></div>
          <div className="requirements">
            <article className="requirement card"><span className="requirement-num">01</span><h3>Passport bio page</h3><p>Clear scan showing photograph, name, date of birth, nationality and expiry date. Official guidance specifies PDF size limits.</p></article>
            <article className="requirement card"><span className="requirement-num">02</span><h3>Recent photograph</h3><p>Front-facing, full face, plain light or white background, without borders, shadows or blur.</p></article>
            <article className="requirement card"><span className="requirement-num">03</span><h3>Category evidence</h3><p>Business card, hospital letter, admission letter, invitation, onward ticket or clearance documents depending on route.</p></article>
          </div>
          <div className="advisory"><div><strong>Give yourself enough time.</strong><span>Eligible e-Tourist and e-Business applicants should apply online at least 4 days before arrival; some categories use a 120-day window.</span></div><Link className="btn btn-outline btn-sm" href="/eligibility">Full eligibility details</Link></div>
        </div></section>

        <section className="section soft"><div className="container faq">
          <div className="faq-intro"><div className="eyebrow">Plain answers</div><h2 className="serif">Before you ask.</h2><p>The essentials, without sending you through a maze of notices and PDFs.</p><Link className="btn btn-ghost" href="/help">Visit the help centre →</Link></div>
          <Accordion items={faqItems} defaultOpen={0} />
        </div></section>

        <section className="cta-band"><div className="container cta-band-inner"><div><h2 className="serif">India is waiting. Start with the correct route.</h2><p>Select your travel purpose first, then prepare the exact evidence before payment.</p></div><Link className="btn btn-light" href="/apply">Start your application ↗</Link></div></section>
      </main>
      <SiteFooter />
      <Toast />
    </>
  );
}
