'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import Toast from './components/Toast';
import Accordion from './components/Accordion';

const faqItems = [
  { question: 'How long is the normal e\u2011Business visa valid?', answer: 'It is valid for 365 days from the date the Electronic Travel Authorisation is granted, with multiple entries. Continuous stay during each visit should not exceed 180 days.' },
  { question: 'What counts as a business card?', answer: 'A card provided by the company you work for. An invitation letter from the Indian company, including its information, address and phone number, can also support the application.' },
  { question: 'Can I pay for faster processing?', answer: 'No. There is no emergency or express eVisa fee. Be cautious of any service claiming otherwise.' },
  { question: 'Do I need to print the ETA?', answer: 'The ETA is sent by email. Keep an accessible copy for travel and present it with the same passport used in your application at immigration.' },
];

export default function HomePage() {
  const [showRoute, setShowRoute] = useState(false);
  const [routeTitle, setRouteTitle] = useState('Normal e\u2011Business Visa');
  const [routeDetail, setRouteDetail] = useState('365 days \u00b7 Multiple entry \u00b7 Up to 180 days each visit');
  const purposeRef = useRef(null);

  const handleRouteSubmit = (e) => {
    e.preventDefault();
    const purpose = purposeRef.current?.value;
    if (purpose === 'business') {
      setRouteTitle('Normal e\u2011Business Visa');
      setRouteDetail('365 days \u00b7 Multiple entry \u00b7 Up to 180 days each visit');
    } else {
      setRouteTitle('A different eVisa route may fit');
      setRouteDetail('This experience is focused on normal business travel. Review eligibility before applying.');
    }
    setShowRoute(true);
    window.__forgeToast?.('Your recommended route is ready');
  };

  return (
    <>
      <SiteHeader announcement="No emergency or express eVisa fee is charged. Know every cost before you pay." />
      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero-media">
            <video autoPlay muted loop playsInline poster="/images/hero-mumbai.png">
              <source src="/video/india-dawn-loop.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="container hero-content">
            <div>
              <div className="eyebrow light">Indian e&#x2011;Business Visa</div>
              <h1 className="serif">Business takes you places. India should be easy.</h1>
              <p className="hero-lead">A human-first application that explains every document, every fee and every next step before you begin.</p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href="/apply">Start business application ↗</Link>
                <Link className="btn btn-light" href="/track">Track an application</Link>
              </div>
              <div className="hero-trust">
                <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3 20 6v5c0 5.2-3.4 8.4-8 10-4.6-1.6-8-4.8-8-10V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg>Secure application</span>
                <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>Apply at least 4 days ahead</span>
                <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>Country-specific fee shown before payment</span>
              </div>
            </div>
            <aside className="hero-card">
              <div className="hero-card-top">
                <div><div className="eyebrow">Your route</div><h2>Normal e&#x2011;Business Visa</h2></div>
                <span className="pill">Available</span>
              </div>
              <div className="fact-list">
                <div className="fact-row"><span>Validity</span><strong>365 days</strong></div>
                <div className="fact-row"><span>Entries</span><strong>Multiple</strong></div>
                <div className="fact-row"><span>Stay per visit</span><strong>Up to 180 days</strong></div>
                <div className="fact-row"><span>Application window</span><strong>4–120 days ahead</strong></div>
              </div>
              <div className="hero-docs">
                <h3>Prepare these first</h3>
                <ul className="clean-list">
                  <li><span className="tick">✓</span>Passport bio page</li>
                  <li><span className="tick">✓</span>Recent white-background photo</li>
                  <li><span className="tick">✓</span>Business card or invitation</li>
                </ul>
              </div>
              <Link className="btn btn-dark" href="/apply">Begin in about 10 minutes →</Link>
            </aside>
          </div>
          <div className="scroll-cue">Discover India</div>
        </section>

        {/* Proof strip */}
        <section className="proof-strip"><div className="container proof-grid">
          <div className="proof-item"><span className="proof-icon">365</span><div><strong>One-year validity</strong><span>From the date ETA is granted</span></div></div>
          <div className="proof-item"><span className="proof-icon">↔</span><div><strong>Multiple entry</strong><span>For eligible business travel</span></div></div>
          <div className="proof-item"><span className="proof-icon">180</span><div><strong>Up to 180 days</strong><span>Continuous stay per visit</span></div></div>
          <div className="proof-item"><span className="proof-icon">₹</span><div><strong>Transparent payment</strong><span>Fee varies by nationality</span></div></div>
        </div></section>

        {/* Quick start */}
        <section className="section"><div className="container"><div className="quick-start card">
          <div className="quick-copy">
            <div className="eyebrow">Check your route</div>
            <h2 className="serif">Three answers. One clear next step.</h2>
            <p>We'll use your passport, travel purpose and arrival date to point you to the right application path.</p>
          </div>
          <form className="quick-form" onSubmit={handleRouteSubmit}>
            <div className="form-grid">
              <div className="field"><label htmlFor="nationality">Passport nationality</label><select id="nationality"><option>United Kingdom</option><option>United States</option><option>Australia</option><option>Canada</option><option>Japan</option><option>Singapore</option></select></div>
              <div className="field"><label htmlFor="purpose">Reason for travel</label><select id="purpose" ref={purposeRef}><option value="business">Business meetings or trade</option><option value="conference">Conference</option><option value="tourism">Tourism</option><option value="medical">Medical treatment</option></select></div>
              <div className="field full"><label htmlFor="arrival">Planned arrival</label><input id="arrival" type="date" defaultValue="2026-08-10" /></div>
            </div>
            <button className="btn btn-primary" type="submit">See my route →</button>
            <div className={`route-result${showRoute ? ' show' : ''}`}>
              <div className="route-result-top"><div><div className="eyebrow">Recommended</div><h3>{routeTitle}</h3><p>{routeDetail}</p></div><span className="pill">Matched</span></div>
              <Link className="btn btn-dark btn-sm" href="/apply">Start application</Link>
            </div>
          </form>
        </div></div></section>

        {/* Stats */}
        <section className="section soft"><div className="container">
          <div className="section-head"><div><div className="eyebrow">The normal business route</div><h2 className="serif">Built around the trip you&#39;re actually making.</h2></div><p>For business meetings, supplier visits, trade, recruitment, board meetings and other eligible commercial activity.</p></div>
          <div className="stats">
            <div className="stat"><b>365</b><span>days of validity from the grant of ETA</span></div>
            <div className="stat"><b>∞</b><span>multiple entries during the validity period</span></div>
            <div className="stat"><b>180</b><span>maximum continuous stay on each visit</span></div>
          </div>
        </div></section>

        {/* Steps */}
        <section className="section dark"><div className="container">
          <div className="section-head"><div><div className="eyebrow light">One calm journey</div><h2 className="serif">From passport to permission.</h2></div><p>Save your progress at every step, return when you need, and always know what happens next.</p></div>
          <div className="steps-grid">
            <article className="step"><span className="step-num">01</span><h3>Apply</h3><p>Tell us about yourself, your trip and the Indian organisation you&#39;ll visit.</p></article>
            <article className="step"><span className="step-num">02</span><h3>Upload</h3><p>Add your passport, photograph and business evidence with clear visual guidance.</p></article>
            <article className="step"><span className="step-num">03</span><h3>Pay</h3><p>Review the nationality-specific visa fee and transaction charge before paying.</p></article>
            <article className="step"><span className="step-num">04</span><h3>Receive</h3><p>Track the decision, respond to document requests and receive ETA by email.</p></article>
          </div>
        </div></section>

        {/* Feature */}
        <section className="section"><div className="container"><div className="feature-grid">
          <figure className="feature-visual">
            <img src="/images/bengaluru-blue-hour.png" alt="Bengaluru business district after monsoon rain" />
            <figcaption className="feature-caption"><strong>India moves at many speeds.</strong><span>Bengaluru · Karnataka</span></figcaption>
          </figure>
          <div className="feature-cards">
            <article className="feature-card card"><div><div className="eyebrow">Before you begin</div><h3>Know your eligibility</h3><p>Your passport must normally remain valid for at least six months when you apply and have two blank pages.</p></div><Link href="/eligibility">Review the checklist →</Link></article>
            <article className="feature-card card"><div><div className="eyebrow">No surprises</div><h3>Fees depend on nationality</h3><p>The applicable eVisa fee and bank transaction charge are shown before payment. No emergency fee exists.</p></div><Link href="/help#fees">Understand fees →</Link></article>
            <article className="feature-card card"><div><div className="eyebrow">Return with confidence</div><h3>Track every update</h3><p>See submission, payment, document review and decision as one readable timeline.</p></div><Link href="/track">Track an application →</Link></article>
          </div>
        </div></div></section>

        {/* Stories */}
        <section className="section soft"><div className="container">
          <div className="section-head"><div><div className="eyebrow">Beyond the form</div><h2 className="serif">The India your work brings you to.</h2></div><p>Ancient craft and new enterprise share the same streets. The visa is only the beginning.</p></div>
          <div className="stories">
            <article className="story"><img src="/images/jaipur-craft.png" alt="Artisan arranging block-printed textiles in Jaipur" /><div className="story-copy"><div className="eyebrow light">Jaipur · Rajasthan</div><h3>Made by hand, built to travel.</h3><p>Craft, trade and enterprise have crossed these courtyards for centuries.</p></div></article>
            <article className="story"><video autoPlay muted loop playsInline poster="/images/kerala-backwaters.png"><source src="/video/kerala-morning-loop.mp4" type="video/mp4" /></video><div className="story-copy"><div className="eyebrow light">Alappuzha · Kerala</div><h3>Room to see farther.</h3><p>A country of movement, from backwater mornings to boardroom afternoons.</p></div></article>
          </div>
        </div></section>

        {/* Requirements */}
        <section className="section" id="requirements"><div className="container">
          <div className="section-head"><div><div className="eyebrow">Document checklist</div><h2 className="serif">Prepare once. Upload with confidence.</h2></div><p>Clear, complete files prevent avoidable delays and make re-upload requests less likely.</p></div>
          <div className="requirements">
            <article className="requirement card"><span className="requirement-num">01</span><h3>Passport bio page</h3><p>A clear scan showing your photograph, name, date of birth, nationality and expiry date.</p></article>
            <article className="requirement card"><span className="requirement-num">02</span><h3>Recent photograph</h3><p>Front-facing, full face, plain white background, without borders or distracting shadows.</p></article>
            <article className="requirement card"><span className="requirement-num">03</span><h3>Business evidence</h3><p>Your business card, or an invitation from the Indian company with address and phone number.</p></article>
          </div>
          <div className="advisory"><div><strong>Give yourself enough time.</strong><span>Normal e&#x2011;Business applications should be made at least 4 days before arrival and can generally be made up to 120 days ahead.</span></div><Link className="btn btn-outline btn-sm" href="/eligibility">Full eligibility details</Link></div>
        </div></section>

        {/* FAQ */}
        <section className="section soft"><div className="container faq">
          <div className="faq-intro"><div className="eyebrow">Plain answers</div><h2 className="serif">Before you ask.</h2><p>The essentials, without sending you through a maze of notices and PDFs.</p><Link className="btn btn-ghost" href="/help">Visit the help centre →</Link></div>
          <Accordion items={faqItems} defaultOpen={0} />
        </div></section>

        {/* CTA */}
        <section className="cta-band"><div className="container cta-band-inner"><div><h2 className="serif">India is waiting. The paperwork shouldn&#39;t be.</h2><p>Start with the normal business route and know what you need before you type a single passport number.</p></div><Link className="btn btn-light" href="/apply">Start your application ↗</Link></div></section>
      </main>
      <SiteFooter />
      <Toast />
    </>
  );
}
