'use client';
import Link from 'next/link';
import Toast from '../components/Toast';

export default function EtaPage() {
  return (
    <>
      <main className="eta-page">
        <div className="container">
          <Link className="back-link" href="/track">← Back to tracking</Link>
          <div className="eta-header">
            <div>
              <div className="eyebrow">Electronic Travel Authorisation</div>
              <h1 className="serif">Approved means ready.</h1>
            </div>
            <p>Keep this ETA with the passport used in your application. Your visa will be stamped by immigration on arrival.</p>
          </div>

          <div className="eta-grid">
            <section className="eta-card">
              <div className="eta-content">
                <div className="eta-top">
                  <Link className="brand" href="/" style={{ color: '#fff' }}>
                    <svg className="brand-mark" viewBox="0 0 32 32"><path d="M16 2.5 19.4 12l9.1 4-9.1 4L16 29.5 12.6 20 3.5 16l9.1-4L16 2.5Z" fill="currentColor"/></svg>
                    <span>Forge<small style={{ color: '#92a69d' }}>India eVisa</small></span>
                  </Link>
                  <span className="approved">Approved</span>
                </div>
                <h2 className="serif">Aarav Sharma</h2>
                <p>Normal e&#x2011;Business Visa · India</p>
                <div className="eta-details">
                  <div className="eta-detail"><span>Validity</span><strong>365 days</strong></div>
                  <div className="eta-detail"><span>Entries</span><strong>Multiple</strong></div>
                  <div className="eta-detail"><span>Stay per visit</span><strong>Up to 180 days</strong></div>
                  <div className="eta-detail"><span>Valid from</span><strong>18 July 2026</strong></div>
                  <div className="eta-detail"><span>Valid until</span><strong>17 July 2027</strong></div>
                  <div className="eta-detail"><span>Passport</span><strong>•••• 2847</strong></div>
                </div>
                <div className="eta-bottom">
                  <span className="eta-ref">IND-BIZ-26-7K92</span>
                  <span className="qr" aria-label="QR code">{Array.from({ length: 49 }).map((_, i) => <i key={i}></i>)}</span>
                </div>
              </div>
            </section>

            <aside className="eta-side">
              <div className="card">
                <div className="eyebrow">Before you fly</div>
                <h3>Keep these together</h3>
                <ul className="clean-list">
                  <li><span className="tick">✓</span>The passport used to apply</li>
                  <li><span className="tick">✓</span>An accessible copy of this ETA</li>
                  <li><span className="tick">✓</span>Return or onward journey details</li>
                  <li><span className="tick">✓</span>Business contact information</li>
                </ul>
                <button className="btn btn-primary" onClick={() => window.__forgeToast?.('Your eVisa is ready to save')}>Save ETA ↓</button>
              </div>
              <div className="card">
                <div className="eyebrow">On arrival</div>
                <h3>Immigration completes the journey</h3>
                <p>Biometric details may be captured at immigration. Present this ETA with your passport at an authorised check post.</p>
                <Link className="btn btn-ghost" href="/help">Arrival questions →</Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Toast />
    </>
  );
}
