'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Toast from '../components/Toast';

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [feeConsented, setFeeConsented] = useState(false);
  const [uploadStates, setUploadStates] = useState({ passport: false, photo: false, business: false });
  const [uploadNames, setUploadNames] = useState({ passport: 'JPG, PNG or PDF · maximum 5 MB', photo: 'Front-facing · white background', business: 'Company details, address and phone' });

  useEffect(() => {
    document.body.classList.add('app-bg');
    return () => document.body.classList.remove('app-bg');
  }, []);

  const setStep = (step) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try { localStorage.setItem('forge-evisa-step', String(step)); } catch (_) {}
  };

  const handleFileChange = (key, e) => {
    if (!e.target.files.length) return;
    setUploadStates(prev => ({ ...prev, [key]: true }));
    setUploadNames(prev => ({ ...prev, [key]: e.target.files[0].name }));
    window.__forgeToast?.('Document ready to review');
  };

  const handleSubmit = () => {
    setSubmitted(true);
    window.__forgeToast?.('Application submitted');
    try {
      localStorage.setItem('forge-evisa-reference', 'IND-BIZ-26-7K92');
      localStorage.setItem('forge-evisa-status', 'under-review');
    } catch (_) {}
  };

  const copyReference = async () => {
    try { await navigator.clipboard.writeText('IND-BIZ-26-7K92'); } catch (_) {}
    window.__forgeToast?.('Reference copied');
  };

  return (
    <>
      <main className="app-main" id="applicationFlow">
        <div className="apply-context">
          <div className="container">
            <span className="secure-label">◈ Category-aware eVisa application · Progress saved on this device</span>
            <Link className="exit-link" href="/">Exit application ×</Link>
          </div>
        </div>
        <div className="container">
          <div className="app-title">
            <div><div className="eyebrow">Indian e&#x2011;Visa</div><h1 className="serif">Start with the correct category.</h1></div>
            <p>You&#39;ll need your passport, a recent photograph and the evidence required for your travel purpose. Most people finish in about 10–15 minutes.</p>
          </div>

          <div className="progress" aria-label="Application progress">
            {[{ n: 1, label: 'Category' }, { n: 2, label: 'Details' }, { n: 3, label: 'Documents' }, { n: 4, label: 'Payment' }, { n: 5, label: 'Review' }].map(({ n, label }) => (
              <div key={n} className={`progress-item${n === currentStep && !submitted ? ' current' : ''}${n < currentStep || submitted ? ' done' : ''}`} data-progress={n}>
                <span className="progress-dot">{n < currentStep || submitted ? '✓' : n}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="app-layout">
            <section className="form-panel card">
              {/* Step 1 */}
              <div className={`form-step${currentStep === 1 ? ' active' : ''}`} data-step="1">
                <h2>Choose your route and identify the traveller</h2>
                <p className="form-intro">Select the eVisa category first, then enter details exactly as they appear in the passport you will travel with.</p>
                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                  <div className="form-grid">
                    <div className="field"><label htmlFor="givenName">Given name</label><input id="givenName" required placeholder="Aarav" autoComplete="given-name" /></div>
                    <div className="field"><label htmlFor="surname">Surname</label><input id="surname" required placeholder="Sharma" autoComplete="family-name" /></div>
                    <div className="field"><label htmlFor="visaCategory">Travel purpose</label><select id="visaCategory" required><option>e-Tourist Visa</option><option>e-Business Visa</option><option>e-Medical Visa</option><option>e-Medical Attendant Visa</option><option>e-Student Visa</option><option>e-Family Visa</option><option>e-Transit Visa</option><option>Conference / Event route</option></select></div>
                    <div className="field"><label htmlFor="passportCountry">Passport nationality</label><select id="passportCountry" required><option>United Kingdom</option><option>United States</option><option>Australia</option><option>Canada</option><option>Japan</option><option>Singapore</option></select></div>
                    <div className="field"><label htmlFor="birthDate">Date of birth</label><input id="birthDate" type="date" required defaultValue="1990-06-12" /></div>
                    <div className="field"><label htmlFor="passportNumber">Passport number</label><input id="passportNumber" required placeholder="533912847" /></div>
                    <div className="field"><label htmlFor="passportExpiry">Passport expiry</label><input id="passportExpiry" type="date" required defaultValue="2031-05-28" /></div>
                    <div className="field"><label htmlFor="arrivalDate">Planned arrival</label><input id="arrivalDate" type="date" required defaultValue="2026-08-10" /></div>
                    <div className="field"><label htmlFor="arrivalPort">Expected arrival port</label><select id="arrivalPort"><option>Delhi — Indira Gandhi International</option><option>Mumbai — Chhatrapati Shivaji Maharaj</option><option>Bengaluru — Kempegowda International</option><option>Chennai International</option><option>Hyderabad — Rajiv Gandhi International</option></select></div>
                    <div className="field full"><label htmlFor="email">Email address</label><input id="email" type="email" required placeholder="aarav@example.com" autoComplete="email" /><p className="helper">Your application reference and ETA will be sent here.</p></div>
                  </div>
                  <div className="form-section">
                    <h3>Passport check</h3>
                    <div className="choice-grid">
                      <label className="choice"><input type="checkbox" required defaultChecked /><span><strong>Valid for at least six months</strong><span>From the date of your application.</span></span></label>
                      <label className="choice"><input type="checkbox" required defaultChecked /><span><strong>At least two blank pages</strong><span>Available for immigration stamps.</span></span></label>
                    </div>
                  </div>
                  <div className="form-actions">
                    <span className="save-status">✓ Saved locally</span>
                    <button className="btn btn-primary" type="submit">Continue to trip details →</button>
                  </div>
                </form>
              </div>

              {/* Step 2 */}
              <div className={`form-step${currentStep === 2 ? ' active' : ''}`} data-step="2">
                <h2>Your trip details</h2>
                <p className="form-intro">Tell us why you&#39;re travelling, where you&#39;ll arrive and which contact or host applies to your category.</p>
                <form onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                  <div className="form-grid">
                    <div className="field full"><label htmlFor="activity">Primary travel purpose</label><select id="activity"><option>Sightseeing or casual visit</option><option>Business meetings or trade</option><option>Medical treatment</option><option>Medical attendant</option><option>Study or family dependent</option><option>Transit through India</option><option>Conference or specialist event</option></select></div>
                    <div className="field"><label htmlFor="employer">Home organisation / host context</label><input id="employer" required placeholder="Employer, school, family host or NA" /></div>
                    <div className="field"><label htmlFor="role">Occupation or role</label><input id="role" required placeholder="Traveller, employee, student, attendant" /></div>
                    <div className="field"><label htmlFor="indiaCompany">Indian host / hotel / institution</label><input id="indiaCompany" required placeholder="Hotel, company, hospital or institution" /></div>
                    <div className="field"><label htmlFor="indiaContact">Contact person in India</label><input id="indiaContact" required placeholder="Host, coordinator or support desk" /></div>
                    <div className="field full"><label htmlFor="indiaAddress">Address in India</label><textarea id="indiaAddress" required placeholder="Hotel, office, hospital, institution or host address in India"></textarea></div>
                    <div className="field"><label htmlFor="contactPhone">Indian contact phone</label><input id="contactPhone" type="tel" placeholder="+91 98…" /></div>
                    <div className="field"><label htmlFor="stayLength">Expected stay</label><select id="stayLength"><option>Under 14 days</option><option>15–30 days</option><option>31–90 days</option><option>91–180 days</option></select></div>
                  </div>
                  <div className="form-section">
                    <h3>Travel confirmation</h3>
                    <div className="choice-grid">
                      <label className="choice"><input type="checkbox" defaultChecked required /><span><strong>Return or onward journey</strong><span>I can provide travel plans if requested.</span></span></label>
                      <label className="choice"><input type="checkbox" defaultChecked required /><span><strong>Sufficient funds</strong><span>I can support myself during the visit.</span></span></label>
                    </div>
                  </div>
                  <div className="form-actions">
                    <button className="back-link" type="button" onClick={() => setStep(1)}>← Back</button>
                    <button className="btn btn-primary" type="submit">Continue to documents →</button>
                  </div>
                </form>
              </div>

              {/* Step 3 */}
              <div className={`form-step${currentStep === 3 ? ' active' : ''}`} data-step="3">
                <h2>Your documents</h2>
                <p className="form-intro">Use clear, current files. Core files are required for every route; the third file changes by category.</p>
                <div className="upload-list">
                  {[{ key: 'passport', icon: '▣', label: 'Passport bio page' }, { key: 'photo', icon: '◉', label: 'Recent photograph' }, { key: 'business', icon: '▤', label: 'Category evidence' }].map(({ key, icon, label }) => (
                    <div key={key} className={`upload-card${uploadStates[key] ? ' ready' : ''}`}>
                      <div className="upload-info">
                        <span className="upload-icon">{icon}</span>
                        <div><strong>{label}</strong><span>{uploadNames[key]}</span></div>
                      </div>
                      <div className="upload-control">
                        <span className={`upload-status${uploadStates[key] ? ' ready' : ''}`}>{uploadStates[key] ? 'Ready' : 'Missing'}</span>
                        <input id={`${key}File`} type="file" accept={key === 'photo' ? 'image/*' : 'image/*,.pdf'} onChange={(e) => handleFileChange(key, e)} />
                        <label className="upload-label" htmlFor={`${key}File`}>Choose file</label>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="criteria">
                  <div className="criterion"><strong>Readable</strong>No glare, blur or shadows</div>
                  <div className="criterion"><strong>Complete</strong>All edges and details visible</div>
                  <div className="criterion"><strong>Current</strong>Matches this application</div>
                </div>
                <div className="notice" style={{ marginTop: '17px' }}>If a document is not clear or does not meet the specification, you may be asked by email to upload it again.</div>
                <div className="form-actions">
                  <button className="back-link" type="button" onClick={() => setStep(2)}>← Back</button>
                  <button className="btn btn-primary" type="button" onClick={() => setStep(4)}>Continue to fee →</button>
                </div>
              </div>

              {/* Step 4 */}
              <div className={`form-step${currentStep === 4 ? ' active' : ''}`} data-step="4">
                <h2>Review the fee before paying</h2>
                <p className="form-intro">The applicable eVisa fee depends on passport nationality and selected category. The full amount is shown before payment.</p>
                <div className="fee-box">
                  <div className="eyebrow">United Kingdom passport</div>
                  <div className="fee-row"><span>Selected eVisa category fee</span><strong>Calculated for nationality</strong></div>
                  <div className="fee-row"><span>Bank transaction charge</span><strong>Up to 3%</strong></div>
                  <div className="fee-row total"><span>Total due</span><strong>Shown at checkout</strong></div>
                </div>
                <div className="advisory" style={{ marginTop: '14px' }}>
                  <div><strong>No emergency or express fee.</strong><span>India&#39;s official advisory states there is no additional emergency charge for granting an eVisa.</span></div>
                </div>
                <label className="consent">
                  <input type="checkbox" checked={feeConsented} onChange={(e) => setFeeConsented(e.target.checked)} />
                  <span>I understand the visa fee is nationality-specific, bank charges are added at payment, and the application fee is not refunded if the visa is refused.</span>
                </label>
                <div className="form-actions">
                  <button className="back-link" type="button" onClick={() => setStep(3)}>← Back</button>
                  <button className="btn btn-primary" type="button" disabled={!feeConsented} onClick={() => setStep(5)}>Continue to review →</button>
                </div>
              </div>

              {/* Step 5 */}
              <div className={`form-step${currentStep === 5 ? ' active' : ''}`} data-step="5">
                <div className={submitted ? 'hidden' : ''} id="reviewContent">
                  <h2>Check everything once</h2>
                  <p className="form-intro">You are responsible for ensuring your name, nationality, passport number, date of birth and photograph are correct before submission.</p>
                  <dl className="review-list">
                    <div className="review-row"><dt>Applicant</dt><dd>Aarav Sharma<br /><span className="muted" style={{ fontWeight: 400 }}>United Kingdom · passport ending 2847</span></dd><button type="button" onClick={() => setStep(1)}>Edit</button></div>
                    <div className="review-row"><dt>Trip</dt><dd>e-Tourist route · Arrival 10 August 2026</dd><button type="button" onClick={() => setStep(1)}>Edit</button></div>
                    <div className="review-row"><dt>Indian contact</dt><dd>Hotel / host details · Bengaluru</dd><button type="button" onClick={() => setStep(2)}>Edit</button></div>
                    <div className="review-row"><dt>Documents</dt><dd>Passport, photo and category evidence ready</dd><button type="button" onClick={() => setStep(3)}>Edit</button></div>
                    <div className="review-row"><dt>Payment</dt><dd>Nationality-specific fee + transaction charge</dd><button type="button" onClick={() => setStep(4)}>Edit</button></div>
                  </dl>
                  <div className="form-actions">
                    <button className="back-link" type="button" onClick={() => setStep(4)}>← Back</button>
                    <button className="btn btn-primary" type="button" onClick={handleSubmit}>Submit application ↗</button>
                  </div>
                </div>
                <div className={`success${submitted ? ' show' : ''}`}>
                  <div className="success-icon">✓</div>
                  <div className="eyebrow">Application received</div>
                  <h2>We&#39;ll take it from here.</h2>
                  <p>Your reference has been sent by email. Keep it close—you&#39;ll use it to track payment, document review and the decision.</p>
                  <button className="reference" type="button" onClick={copyReference}>IND-BIZ-26-7K92 ⧉</button>
                  <br />
                  <Link className="btn btn-primary" href="/track">Track application →</Link>
                </div>
              </div>
            </section>

            <aside>
              <div className="summary card">
                <div className="eyebrow">Your visa</div>
                <h3>Selected eVisa route</h3>
                <div className="summary-row"><span>Category</span><strong>Purpose-based</strong></div>
                <div className="summary-row"><span>Core files</span><strong>Passport + photo</strong></div>
                <div className="summary-row"><span>Evidence</span><strong>Depends on route</strong></div>
                <div className="summary-row"><span>Apply</span><strong>4–120 days ahead</strong></div>
                <div className="summary-row"><span>Fee</span><strong>Varies by nationality</strong></div>
                <div className="summary-note"><strong>Pick the category carefully.</strong><br />Tourist, business, medical, student, transit and specialist routes can require different evidence.</div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Toast />
    </>
  );
}
