'use client';
import Link from 'next/link';
import Toast from '../components/Toast';
import Accordion from '../components/Accordion';

export default function HelpPage() {
  return (
    <>
      <main>
        <section className="page-hero">
          <div className="container page-hero-content">
            <div className="breadcrumb"><Link href="/">Home</Link><span>›</span><span>Help centre</span></div>
            <div className="eyebrow light" style={{ marginTop: '35px' }}>Help without the hold music</div>
            <h1 className="serif">Answers that move you forward.</h1>
            <p>Find the next action for eligibility, documents, payment, tracking and travel.</p>
          </div>
        </section>

        <section className="section">
          <div className="container info-layout">
            <nav className="side-nav card">
              <a className="active" href="#start">Getting started</a>
              <a href="#documents">Documents</a>
              <a href="#fees">Fees and payment</a>
              <a href="#tracking">Tracking</a>
              <a href="#arrival">Arrival</a>
              <a href="#official">Official support</a>
            </nav>
            <div>
              <section className="content-block" id="start">
                <div className="eyebrow">Getting started</div>
                <h2 className="serif">Start with eligibility, not paperwork.</h2>
                <Accordion items={[
                  { question: 'When should I apply?', answer: 'Normal e\u2011Business applicants should apply at least four days before arrival and can generally apply up to 120 days ahead.' },
                  { question: 'How long is the visa valid?', answer: '365 days from the date ETA is granted, with multiple entries. Continuous stay on each visit should not exceed 180 days.' },
                  { question: 'Can I use this for a conference?', answer: 'Conference travel has specific documentary requirements and may use a different business sub-category. Check the activity before starting a normal business application.' }
                ]} defaultOpen={0} />
              </section>

              <section className="content-block" id="documents">
                <div className="eyebrow">Documents</div>
                <h2 className="serif">Clear files prevent unclear delays.</h2>
                <Accordion items={[
                  { question: 'What business evidence is required?', answer: 'Upload your business card. An invitation letter from the Indian company including company information, address and phone number can also support the application.' },
                  { question: 'What happens if an image is rejected?', answer: 'You may be advised by email to upload a clearer or corrected file. The tracking page identifies the document and provides the recovery action.' },
                  { question: 'What should the photograph look like?', answer: 'Use a recent front-facing photograph showing the full face against a plain white background, without blur, borders or distracting shadows.' }
                ]} defaultOpen={0} />
              </section>

              <section className="content-block" id="fees">
                <div className="eyebrow">Fees and payment</div>
                <h2 className="serif">The total before the transaction.</h2>
                <p>The eVisa fee is country- or territory-specific. Official guidance states that card or payment-gateway transaction charges can be up to 3% of the applicable visa fee; PayPal charges may differ. The breakdown should be shown on the payment page.</p>
                <div className="notice">There is no emergency or express eVisa fee. Treat claims of guaranteed or faster grant for an additional government fee as suspicious.</div>
                <h3>If your account was debited but payment failed</h3>
                <p>Do not immediately repeat the transaction. Official guidance recommends checking payment status after a short interval. Failed debits are handled through payment reconciliation.</p>
              </section>

              <section className="content-block" id="tracking">
                <div className="eyebrow">Tracking</div>
                <h2 className="serif">One reference, every update.</h2>
                <p>Your application reference is issued after submission and is used for payment status, document updates and the decision. Keep it with the email address used to apply.</p>
                <Link className="btn btn-dark" href="/track">Track an application →</Link>
              </section>

              <section className="content-block" id="arrival">
                <div className="eyebrow">Arrival in India</div>
                <h2 className="serif">Bring the passport that matches.</h2>
                <p>Travel with the same passport used in the application and an accessible copy of the granted ETA. Immigration may capture biometric details and stamp the eVisa at an authorised check post.</p>
              </section>

              <section className="content-block" id="official">
                <div className="eyebrow">Official support</div>
                <h2 className="serif">When you need the source.</h2>
                <p>For case-specific decisions, payment disputes or changes to eligibility, use the Government of India&#39;s official services.</p>
                <div className="document-grid">
                  <a className="document-card card" href="https://indianvisaonline.gov.in/evisa/" target="_blank" rel="noopener" style={{ textDecoration: 'none' }}><strong>Indian Visa Online ↗</strong><p>Official eVisa categories, instructions, payment and application services.</p></a>
                  <a className="document-card card" href="https://boi.gov.in/" target="_blank" rel="noopener" style={{ textDecoration: 'none' }}><strong>Bureau of Immigration ↗</strong><p>Official arrival and immigration information.</p></a>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Toast />
    </>
  );
}
