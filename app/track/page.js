'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Toast from '../components/Toast';

export default function TrackPage() {
  const [reference, setReference] = useState('IND-BIZ-26-7K92');
  const [statusRef, setStatusRef] = useState('IND-BIZ-26-7K92');

  useEffect(() => {
    document.body.classList.add('app-bg');
    return () => document.body.classList.remove('app-bg');
  }, []);

  const handleStatus = () => {
    if (!reference.trim()) {
      document.getElementById('referenceInput')?.focus();
      window.__forgeToast?.('Enter your application reference');
      return;
    }
    setStatusRef(reference.trim().toUpperCase());
    window.__forgeToast?.('Status refreshed');
  };

  return (
    <>
      <main className="section track-page-main">
        <div className="container track-grid">
          <section className="lookup">
            <div className="eyebrow">Application status</div>
            <h1 className="serif">Know where you stand.</h1>
            <p>Enter the reference sent to your email. You&#39;ll see payment, document review, any action needed and your decision in one place.</p>
            <div className="lookup-box card">
              <div className="field">
                <label htmlFor="referenceInput">Application reference</label>
                <input id="referenceInput" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="IND-BIZ-26-7K92" />
              </div>
              <button className="btn btn-primary" onClick={handleStatus}>Check status →</button>
              <p className="helper">Example: IND-BIZ-26-7K92</p>
            </div>
          </section>

          <section className="status-card card" id="statusResult">
            <div className="status-head">
              <div>
                <div className="eyebrow" id="statusReference">{statusRef}</div>
                <h2>Documents under review</h2>
              </div>
              <span className="status-pill">In progress</span>
            </div>
            <div className="timeline">
              <div className="timeline-event done"><span className="timeline-dot"></span><div><strong>Application submitted</strong><p>Your application entered the review queue.</p></div><time>11 Jul · 12:42</time></div>
              <div className="timeline-event done"><span className="timeline-dot"></span><div><strong>Payment confirmed</strong><p>Your transaction was successful.</p></div><time>11 Jul · 12:43</time></div>
              <div className="timeline-event current"><span className="timeline-dot"></span><div><strong>Documents under review</strong><p>Your passport, photograph and category evidence are being checked.</p></div><time>In progress</time></div>
              <div className="timeline-event"><span className="timeline-dot"></span><div><strong>Decision</strong><p>Your ETA will be sent to the email used in your application.</p></div><time>—</time></div>
            </div>
            <div className="action-needed">
              <div><strong>If we need something clearer</strong><p>The exact document and a replacement deadline will appear here. You&#39;ll also receive an email.</p></div>
              <Link className="btn btn-outline btn-sm" href="/apply">Manage documents</Link>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '14px', marginTop: '21px', paddingTop: '18px', borderTop: '1px solid var(--line)' }}>
              <Link className="btn btn-ghost" href="/help">Get help →</Link>
              <Link className="btn btn-dark btn-sm" href="/eta">Preview approved ETA</Link>
            </div>
          </section>
        </div>
      </main>
      <Toast />
    </>
  );
}
