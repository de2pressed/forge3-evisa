document.addEventListener('DOMContentLoaded', () => {
  // Navigation & View Routing
  const navLinks = document.querySelectorAll('.nav-link');
  const viewSections = document.querySelectorAll('.view-section');
  const heroSection = document.querySelector('.hero');
  const eligibilityWidget = document.querySelector('.eligibility-widget');
  const featuresSection = document.querySelector('.features-section');

  function switchView(targetViewId) {
    // Update nav active states
    navLinks.forEach(link => {
      if (link.dataset.view === targetViewId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Toggle view visibility
    viewSections.forEach(section => {
      if (section.id === targetViewId + '-view') {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    // Special layout adjustments for home
    if (targetViewId === 'home') {
      if (heroSection) heroSection.style.display = 'flex';
      if (eligibilityWidget) eligibilityWidget.style.display = 'block';
      if (featuresSection) featuresSection.style.display = 'block';
    } else {
      if (heroSection) heroSection.style.display = 'none';
      if (eligibilityWidget) eligibilityWidget.style.display = 'none';
      if (featuresSection) featuresSection.style.display = 'none';
    }

    // Scroll to top of view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = link.dataset.view;
      switchView(targetView);
    });
  });

  // Handle CTA buttons
  const applyCta = document.getElementById('apply-cta');
  const trackCta = document.getElementById('track-cta');
  const widgetApplyCta = document.getElementById('widget-apply-cta');

  if (applyCta) applyCta.addEventListener('click', () => switchView('apply'));
  if (trackCta) trackCta.addEventListener('click', () => switchView('track'));
  if (widgetApplyCta) widgetApplyCta.addEventListener('click', () => switchView('apply'));


  // --- ELIGIBILITY & RECOMMENDATION SYSTEM ---
  const nationalitySelect = document.getElementById('widget-nationality');
  const purposeSelect = document.getElementById('widget-purpose');
  const checkButton = document.getElementById('widget-check-btn');
  const recResult = document.getElementById('rec-result');
  const recContent = document.getElementById('rec-content');

  const VISA_DATABASE = {
    tourism: {
      name: 'e-Tourist Visa (1 Year)',
      desc: 'Recommended for leisure travel, sightseeing, casual visits to friends or relatives, and short-term yoga programmes.',
      duration: '365 Days from grant date',
      entries: 'Multiple Entries',
      stay: 'Continuous stay capped at 180 days per calendar year',
      documents: ['Passport Bio Page (PDF, min 6 months validity)', 'Recent Photograph (JPEG, white background)'],
      baseFee: 40.00,
      processingFee: 2.50,
      time: '72 Hours'
    },
    business: {
      name: 'e-Business Visa',
      desc: 'Recommended for business meetings, setting up industrial/business ventures, recruitment, lecturing, and trade fairs.',
      duration: '365 Days from grant date',
      entries: 'Multiple Entries',
      stay: 'Each continuous stay capped at 180 days',
      documents: ['Passport Bio Page', 'Recent Photograph', 'Business Card / Invitation Letter from Indian host'],
      baseFee: 80.00,
      processingFee: 2.50,
      time: '72 Hours'
    },
    medical: {
      name: 'e-Medical Visa',
      desc: 'Recommended for short-term medical treatment for self in India from recognized hospitals.',
      duration: '365 Days from first arrival date',
      entries: 'Triple Entries',
      stay: 'Maximum total stay of 60 days from first arrival',
      documents: ['Passport Bio Page', 'Recent Photograph', 'Letter from relevant hospital in India on letterhead'],
      baseFee: 80.00,
      processingFee: 2.50,
      time: '72 Hours'
    },
    student: {
      name: 'e-Student Visa',
      desc: 'Recommended for short-term academic courses, internships, and student exchanges.',
      duration: '365 Days from grant date',
      entries: 'Multiple Entries',
      stay: 'Valid for the duration of the course up to 365 days',
      documents: ['Passport Bio Page', 'Recent Photograph', 'Admission Letter from a recognized Indian institute'],
      baseFee: 80.00,
      processingFee: 2.50,
      time: '72 Hours'
    },
    transit: {
      name: 'e-Transit Visa',
      desc: 'Recommended for travelers transiting through India to a third-country destination.',
      duration: '30 Days from grant date',
      entries: 'Double Entries',
      stay: 'Maximum stay of 72 hours per entry',
      documents: ['Passport Bio Page', 'Recent Photograph', 'Onward travel ticket with confirmed reservation'],
      baseFee: 20.00,
      processingFee: 2.50,
      time: '48 Hours'
    },
    conference: {
      name: 'e-Conference Visa',
      desc: 'Recommended for attending private seminars, workshops, or government-organized conferences.',
      duration: '30 Days from arrival date',
      entries: 'Single Entry',
      stay: 'Maximum stay of 30 days',
      documents: ['Passport Bio Page', 'Recent Photograph', 'Invitation from organizer', 'Political clearance from Ministry of External Affairs'],
      baseFee: 80.00,
      processingFee: 2.50,
      time: '72 Hours'
    }
  };

  if (checkButton) {
    checkButton.addEventListener('click', () => {
      const nationality = nationalitySelect.value;
      const purpose = purposeSelect.value;

      if (!nationality || !purpose) {
        alert('Please select both your nationality and purpose of travel.');
        return;
      }

      recResult.style.display = 'block';

      // Special rule: Pakistani passport/origin directs to paper visa
      if (nationality === 'Pakistan') {
        recContent.innerHTML = `
          <div class="info-callout" style="background-color: var(--color-error-bg); border-color: rgba(181, 51, 56, 0.2);">
            <div class="info-callout-icon" style="color: var(--color-error);">⚠️</div>
            <div>
              <strong style="color: var(--color-error); font-size: 1.1rem; display: block; margin-bottom: var(--spacing-sm);">Regular Visa Required</strong>
              <p>Applicants holding Pakistani passports or having Pakistani origin are not eligible for the e-Visa scheme. Please visit your nearest Indian Mission/Embassy to submit a regular paper visa application.</p>
            </div>
          </div>
        `;
        widgetApplyCta.style.display = 'none';
        return;
      }

      const visaInfo = VISA_DATABASE[purpose];
      const totalFee = visaInfo.baseFee + visaInfo.processingFee;

      recContent.innerHTML = `
        <div class="rec-card">
          <div class="rec-details">
            <h3>${visaInfo.name}</h3>
            <p>${visaInfo.desc}</p>
            
            <div class="rec-meta-grid">
              <div class="meta-item">
                <span class="label">Validity Period</span>
                <span class="value">${visaInfo.duration}</span>
              </div>
              <div class="meta-item">
                <span class="label">Permitted Entries</span>
                <span class="value">${visaInfo.entries}</span>
              </div>
              <div class="meta-item" style="grid-column: span 2; margin-top: var(--spacing-sm);">
                <span class="label">Stay Conditions</span>
                <span class="value">${visaInfo.stay}</span>
              </div>
              <div class="meta-item" style="grid-column: span 2; margin-top: var(--spacing-sm);">
                <span class="label">Required Documents</span>
                <span class="value" style="font-weight: 400; font-size: 0.85rem; margin-top: 2px;">
                  <ul style="padding-left: var(--spacing-md);">
                    ${visaInfo.documents.map(doc => `<li>${doc}</li>`).join('')}
                  </ul>
                </span>
              </div>
            </div>
          </div>
          
          <div class="rec-price-card">
            <div class="price-breakdown">
              <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-text-secondary); font-weight: 600; margin-bottom: var(--spacing-sm);">Estimated Fees</div>
              <div class="price-row">
                <span>Visa Fee</span>
                <span>$${visaInfo.baseFee.toFixed(2)}</span>
              </div>
              <div class="price-row">
                <span>Processing Fee</span>
                <span>$${visaInfo.processingFee.toFixed(2)}</span>
              </div>
              <div class="price-row total">
                <span>Total Cost</span>
                <span>$${totalFee.toFixed(2)}</span>
              </div>
              <div class="refund-notice">Non-refundable. Stated fees exclude bank charges (approx. 2.5-3%).</div>
            </div>
            <button class="btn btn-primary" id="widget-proceed-btn">Begin Application</button>
          </div>
        </div>
      `;

      widgetApplyCta.style.display = 'none';

      document.getElementById('widget-proceed-btn').addEventListener('click', () => {
        // Pre-fill application purpose based on selection
        const visaPurposeInput = document.getElementById('visa-purpose');
        if (visaPurposeInput) {
          visaPurposeInput.value = purpose;
          visaPurposeInput.dispatchEvent(new Event('change'));
        }
        switchView('apply');
      });
    });
  }


  // --- APPLICATION WIZARD (FORM FLOW) ---
  let currentStep = 1;
  const stepItems = document.querySelectorAll('.step-item');
  const stepPanes = document.querySelectorAll('.step-pane');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const applicationForm = document.getElementById('evisa-form');

  function updateWizardUI() {
    // Update step numbers and active classes in sidebar
    stepItems.forEach((item, index) => {
      const stepNum = index + 1;
      item.className = 'step-item';
      if (stepNum === currentStep) {
        item.classList.add('active');
      } else if (stepNum < currentStep) {
        item.classList.add('completed');
      }
    });

    // Update active content pane
    stepPanes.forEach((pane, index) => {
      const stepNum = index + 1;
      if (stepNum === currentStep) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // Handle button visibilities
    if (currentStep === 1) {
      btnPrev.style.display = 'none';
      btnNext.textContent = 'Continue to Documents';
    } else if (currentStep === 2) {
      btnPrev.style.display = 'inline-flex';
      btnNext.textContent = 'Continue to Payment';
    } else if (currentStep === 3) {
      btnPrev.style.display = 'inline-flex';
      btnNext.textContent = 'Review & Submit';
    } else if (currentStep === 4) {
      btnPrev.style.display = 'inline-flex';
      btnNext.textContent = 'Confirm & Pay Fee';
    }
  }

  // Persistent Form State
  function saveFormState() {
    const formData = {};
    const inputs = applicationForm.querySelectorAll('input, select');
    inputs.forEach(input => {
      if (input.type !== 'file') {
        formData[input.id] = input.value;
      }
    });
    localStorage.setItem('evisa_form_draft', JSON.stringify(formData));
  }

  function loadFormState() {
    const saved = localStorage.getItem('evisa_form_draft');
    if (saved) {
      const formData = JSON.parse(saved);
      for (const id in formData) {
        const input = document.getElementById(id);
        if (input) {
          input.value = formData[id];
        }
      }
      // If we pre-loaded a purpose, trigger the calculation
      const visaPurpose = document.getElementById('visa-purpose');
      if (visaPurpose && visaPurpose.value) {
        visaPurpose.dispatchEvent(new Event('change'));
      }
    }
  }

  // Attach auto-save to input events
  applicationForm.addEventListener('input', saveFormState);
  applicationForm.addEventListener('change', saveFormState);

  // Dynamic fee card inside application form step 3 & 4
  const visaPurposeSelect = document.getElementById('visa-purpose');
  const formFeeSummary = document.getElementById('form-fee-summary');

  function updateFormFee() {
    const purpose = visaPurposeSelect.value;
    if (!purpose || !VISA_DATABASE[purpose]) {
      formFeeSummary.style.display = 'none';
      return;
    }

    const visaInfo = VISA_DATABASE[purpose];
    const totalFee = visaInfo.baseFee + visaInfo.processingFee;

    formFeeSummary.style.display = 'block';
    formFeeSummary.innerHTML = `
      <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: var(--spacing-sm); border-bottom: 1px solid var(--color-border); padding-bottom: var(--spacing-xs);">
        Billing Summary (${visaInfo.name})
      </div>
      <div class="price-row">
        <span>eVisa Fee</span>
        <span>$${visaInfo.baseFee.toFixed(2)}</span>
      </div>
      <div class="price-row">
        <span>Processing Fee</span>
        <span>$${visaInfo.processingFee.toFixed(2)}</span>
      </div>
      <div class="price-row total">
        <span>Amount Payable</span>
        <span>$${totalFee.toFixed(2)}</span>
      </div>
      <div class="refund-notice" style="color: var(--color-error); font-weight: 500;">
        ⚠️ This fee is non-refundable. Rejection of the e-Visa application does not entitle the applicant to a refund.
      </div>
    `;

    // Also populate Review step billing box
    const reviewBillingBox = document.getElementById('review-billing-box');
    if (reviewBillingBox) {
      reviewBillingBox.innerHTML = `
        <div class="review-item">
          <span class="label">Visa Scheme</span>
          <span class="value">${visaInfo.name}</span>
        </div>
        <div class="review-item">
          <span class="label">Total Visa Fee</span>
          <span class="value">$${totalFee.toFixed(2)}</span>
        </div>
      `;
    }
  }

  visaPurposeSelect.addEventListener('change', updateFormFee);

  // Step Navigations
  btnNext.addEventListener('click', () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        currentStep++;
        updateWizardUI();
        if (currentStep === 4) {
          generateReviewSummary();
        }
      } else {
        processApplicationSubmit();
      }
    }
  });

  btnPrev.addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep--;
      updateWizardUI();
    }
  });

  function validateStep(step) {
    if (step === 1) {
      // Basic field checks
      const nationality = document.getElementById('app-nationality').value;
      const purpose = document.getElementById('visa-purpose').value;
      const givenName = document.getElementById('passport-given-name').value.trim();
      const surname = document.getElementById('passport-surname').value.trim();
      const passportNo = document.getElementById('passport-number').value.trim();

      if (!nationality || !purpose || !givenName || !surname || !passportNo) {
        alert('Please fill in all passport and travel details before proceeding.');
        return false;
      }
      return true;
    } else if (step === 2) {
      // Check document uploads
      const photoFile = document.getElementById('doc-photo').files[0];
      const passportFile = document.getElementById('doc-passport').files[0];

      if (!photoFile || !passportFile) {
        alert('You must upload both your photograph and passport bio page to proceed.');
        return false;
      }
      return true;
    } else if (step === 3) {
      // Payment details check
      const cardNo = document.getElementById('card-number').value.trim();
      const cardExp = document.getElementById('card-expiry').value.trim();
      const cardCvv = document.getElementById('card-cvv').value.trim();

      if (!cardNo || !cardExp || !cardCvv) {
        alert('Please fill in all credit card payment fields.');
        return false;
      }
      return true;
    }
    return true;
  }

  // Mock Document Previews & Validation
  function setupFileUpload(inputId, previewId, acceptedTypes, maxSizeMb) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);

    input.addEventListener('change', () => {
      const file = input.files[0];
      if (!file) {
        preview.style.display = 'none';
        return;
      }

      // Check size
      const sizeMb = file.size / (1024 * 1024);
      if (sizeMb > maxSizeMb) {
        alert(`File is too large. Maximum size allowed is ${maxSizeMb}MB.`);
        input.value = '';
        preview.style.display = 'none';
        return;
      }

      // Show preview card
      preview.style.display = 'flex';
      preview.querySelector('.file-name').textContent = `${file.name} (${sizeMb.toFixed(2)} MB)`;

      // Remove handler
      preview.querySelector('.btn-remove-file').addEventListener('click', (e) => {
        e.preventDefault();
        input.value = '';
        preview.style.display = 'none';
      });
    });
  }

  setupFileUpload('doc-photo', 'preview-photo', ['image/jpeg', 'image/jpg'], 1.0);
  setupFileUpload('doc-passport', 'preview-passport', ['application/pdf'], 3.0);

  // Generate Review step data summaries
  function generateReviewSummary() {
    const givenName = document.getElementById('passport-given-name').value;
    const surname = document.getElementById('passport-surname').value;
    const nationality = document.getElementById('app-nationality').value;
    const passportNo = document.getElementById('passport-number').value;
    const email = document.getElementById('applicant-email').value;

    const summaryPersonal = document.getElementById('review-personal-box');
    summaryPersonal.innerHTML = `
      <div class="review-item">
        <span class="label">Given Name(s)</span>
        <span class="value">${givenName}</span>
      </div>
      <div class="review-item">
        <span class="label">Surname</span>
        <span class="value">${surname}</span>
      </div>
      <div class="review-item">
        <span class="label">Nationality</span>
        <span class="value">${nationality}</span>
      </div>
      <div class="review-item">
        <span class="label">Passport Number</span>
        <span class="value">${passportNo}</span>
      </div>
      <div class="review-item" style="grid-column: span 2;">
        <span class="label">Contact Email</span>
        <span class="value">${email}</span>
      </div>
    `;

    // Doc summaries
    const photoFile = document.getElementById('doc-photo').files[0];
    const passportFile = document.getElementById('doc-passport').files[0];
    const summaryDocs = document.getElementById('review-docs-box');
    summaryDocs.innerHTML = `
      <div class="review-item">
        <span class="label">Applicant Photograph</span>
        <span class="value" style="color: var(--color-success);">✓ ${photoFile.name}</span>
      </div>
      <div class="review-item">
        <span class="label">Passport Bio Page</span>
        <span class="value" style="color: var(--color-success);">✓ ${passportFile.name}</span>
      </div>
    `;
  }

  // Handle Form Submit
  function processApplicationSubmit() {
    const btnContainer = btnNext.parentElement;
    btnNext.style.display = 'none';
    btnPrev.style.display = 'none';
    
    // Show spinner
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.innerHTML = `
      <div style="display: flex; align-items: center; gap: var(--spacing-sm); color: var(--color-primary); font-weight: 600;">
        <span class="spin-icon">⏳</span> Processing payment and submitting secure visa request...
      </div>
    `;
    btnContainer.appendChild(spinner);

    setTimeout(() => {
      // Mock Submission completes
      const givenName = document.getElementById('passport-given-name').value;
      const surname = document.getElementById('passport-surname').value;
      const passportNo = document.getElementById('passport-number').value;
      const nationality = document.getElementById('app-nationality').value;
      const purpose = document.getElementById('visa-purpose').value;
      const email = document.getElementById('applicant-email').value;

      // Create unique reference ID
      const referenceId = 'IND-' + Date.now().toString().slice(-6) + '-' + passportNo.slice(-3).toUpperCase();
      
      // Save this application info to tracking DB in localStorage
      const applicationData = {
        referenceId,
        passportNo,
        givenName,
        surname,
        nationality,
        purpose,
        email,
        submitDate: new Date().toLocaleDateString(),
        status: 'Submitted', // Start state
        comments: 'Application received and undergoing security checks.'
      };

      // Store in array of applications
      let applications = JSON.parse(localStorage.getItem('evisa_applications') || '[]');
      applications.push(applicationData);
      localStorage.setItem('evisa_applications', JSON.stringify(applications));

      // Clean draft
      localStorage.removeItem('evisa_form_draft');
      applicationForm.reset();

      // Switch to success view page inside wizard or redirect to track
      const wizardGridContainer = document.querySelector('.wizard-container');
      wizardGridContainer.innerHTML = `
        <div style="grid-column: span 2; text-align: center; padding: var(--spacing-xxl) var(--spacing-lg);">
          <div style="font-size: 3rem; color: var(--color-success); margin-bottom: var(--spacing-md);">✓</div>
          <h2 style="font-size: 2.2rem; margin-bottom: var(--spacing-sm);">Application Submitted Successfully</h2>
          <p style="color: var(--color-text-secondary); max-width: 600px; margin: 0 auto var(--spacing-xl);">
            Your application has been received and security screening has initiated. You will receive progress notifications at <strong>${email}</strong>.
          </p>
          
          <div style="background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--spacing-lg); max-width: 450px; margin: 0 auto var(--spacing-xl); text-align: left;">
            <div style="display:flex; justify-content:space-between; margin-bottom: var(--spacing-xs);">
              <span style="font-size: 0.85rem; color: var(--color-text-secondary); font-weight:600; text-transform: uppercase;">Application Reference</span>
              <strong style="color: var(--color-primary); font-family: monospace; font-size:1.1rem;">${referenceId}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom: var(--spacing-xs);">
              <span style="font-size: 0.85rem; color: var(--color-text-secondary); font-weight:600; text-transform: uppercase;">Passport Number</span>
              <strong>${passportNo.toUpperCase()}</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span style="font-size: 0.85rem; color: var(--color-text-secondary); font-weight:600; text-transform: uppercase;">Processing Time</span>
              <strong>Usually within 72 hours</strong>
            </div>
          </div>

          <div style="display: flex; justify-content: center; gap: var(--spacing-md);">
            <button class="btn btn-primary" id="success-track-btn">Track Application Status</button>
            <button class="btn btn-outline" id="success-home-btn">Return to Home</button>
          </div>
        </div>
      `;

      document.getElementById('success-track-btn').addEventListener('click', () => {
        switchView('track');
        // Pre-populate tracking fields
        document.getElementById('track-ref').value = referenceId;
        document.getElementById('track-passport').value = passportNo;
        document.getElementById('track-lookup-btn').click();
      });

      document.getElementById('success-home-btn').addEventListener('click', () => {
        // Reload page to refresh wizard structure, then switch to home
        window.location.reload();
      });
    }, 2500);
  }


  // --- TRACKING DASHBOARD & DOCUMENT RE-UPLOAD LOOP ---
  const trackRefInput = document.getElementById('track-ref');
  const trackPassportInput = document.getElementById('track-passport');
  const trackLookupBtn = document.getElementById('track-lookup-btn');
  const trackStatusCard = document.getElementById('track-status-card');

  // Insert mock data for recovery demo if empty
  function seedMockApplications() {
    let applications = JSON.parse(localStorage.getItem('evisa_applications') || '[]');
    const hasReuploadMock = applications.some(app => app.referenceId === 'IND-REUPLOAD');
    
    if (!hasReuploadMock) {
      applications.push({
        referenceId: 'IND-REUPLOAD',
        passportNo: 'Z1234567',
        givenName: 'EMILY',
        surname: 'WATSON',
        nationality: 'United Kingdom',
        purpose: 'tourism',
        email: 'emily.w@example.com',
        submitDate: '2026-07-09',
        status: 'Action Required',
        comments: 'Photograph rejected: background must be solid white. Please upload a compliant photo.'
      });
      applications.push({
        referenceId: 'IND-APPROVED',
        passportNo: 'A9876543',
        givenName: 'DAVID',
        surname: 'MILLER',
        nationality: 'United States',
        purpose: 'business',
        email: 'david.m@example.com',
        submitDate: '2026-07-08',
        status: 'Approved',
        comments: 'e-Visa request verified. Your ETA digital pass has been issued.'
      });
      localStorage.setItem('evisa_applications', JSON.stringify(applications));
    }
  }
  seedMockApplications();

  if (trackLookupBtn) {
    trackLookupBtn.addEventListener('click', () => {
      const ref = trackRefInput.value.trim().toUpperCase();
      const passport = trackPassportInput.value.trim().toUpperCase();

      if (!ref || !passport) {
        alert('Please fill in both the Application Reference ID and Passport Number.');
        return;
      }

      const applications = JSON.parse(localStorage.getItem('evisa_applications') || '[]');
      const match = applications.find(app => 
        app.referenceId.toUpperCase() === ref && 
        app.passportNo.toUpperCase() === passport
      );

      if (!match) {
        trackStatusCard.style.display = 'block';
        trackStatusCard.innerHTML = `
          <div style="text-align: center; padding: var(--spacing-lg) 0;">
            <p style="color: var(--color-error); font-weight: 600;">No matching application found.</p>
            <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-top: var(--spacing-xs);">
              Please verify your Reference ID (e.g. IND-REUPLOAD) and Passport Number.
            </p>
          </div>
        `;
        return;
      }

      renderStatusTimeline(match);
    });
  }

  function renderStatusTimeline(app) {
    trackStatusCard.style.display = 'block';
    
    // Status Timeline UI
    const isSubmitted = app.status === 'Submitted' || app.status === 'Under Review' || app.status === 'Action Required' || app.status === 'Approved';
    const isUnderReview = app.status === 'Under Review' || app.status === 'Action Required' || app.status === 'Approved';
    const isApproved = app.status === 'Approved';
    const isActionRequired = app.status === 'Action Required';

    let timelineHtml = `
      <div style="border-bottom: 1px solid var(--color-border); padding-bottom: var(--spacing-md); margin-bottom: var(--spacing-lg); display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="font-size: 0.75rem; color: var(--color-text-secondary); text-transform: uppercase; font-weight: 600;">Application File</span>
          <h3 style="font-size: 1.4rem;">${app.givenName} ${app.surname}</h3>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 0.75rem; color: var(--color-text-secondary); text-transform: uppercase; font-weight: 600;">Current Status</span>
          <div style="font-weight: 700; color: ${app.status === 'Approved' ? 'var(--color-success)' : app.status === 'Action Required' ? 'var(--color-error)' : 'var(--color-primary)'}; font-size: 1.1rem;">
            ${app.status}
          </div>
        </div>
      </div>

      <div class="timeline">
        <!-- Event 1: Submitted -->
        <div class="timeline-event completed">
          <div class="timeline-dot">✓</div>
          <div class="timeline-content">
            <h4 class="timeline-title">Application Submitted</h4>
            <p class="timeline-desc">Visa request recorded and payment validated on ${app.submitDate}.</p>
          </div>
        </div>

        <!-- Event 2: Under Review -->
        <div class="timeline-event ${isUnderReview ? 'completed' : 'active'}">
          <div class="timeline-dot">${isUnderReview ? '✓' : '2'}</div>
          <div class="timeline-content">
            <h4 class="timeline-title">Document Security Screening</h4>
            <p class="timeline-desc">Biometric photo and passport authenticity evaluation.</p>
            ${isActionRequired ? `
              <div class="action-card">
                <p><strong>Action Needed:</strong> ${app.comments}</p>
                <div class="form-group" style="margin-bottom: var(--spacing-sm);">
                  <label>Upload New Photograph</label>
                  <input type="file" id="reupload-photo-file" class="form-control" accept="image/jpeg, image/jpg" style="padding: 0.5rem; font-size: 0.85rem;">
                  <span class="upload-hint" style="margin-top: 2px;">Accepts JPEG format. Max size 1MB. Must have clear white background.</span>
                </div>
                <button class="btn btn-primary" id="reupload-submit-btn" style="padding: 0.5rem 1rem; font-size: 0.8rem;">Submit Photo</button>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Event 3: Decision -->
        <div class="timeline-event ${isApproved ? 'completed' : isActionRequired ? 'action-required' : 'active'}">
          <div class="timeline-dot">${isApproved ? '✓' : isActionRequired ? '!' : '3'}</div>
          <div class="timeline-content">
            <h4 class="timeline-title">Visa Decision</h4>
            <p class="timeline-desc">
              ${isApproved 
                ? 'Your electronic authorization has been approved. The travel pass is rendered below.' 
                : isActionRequired 
                ? 'Decision suspended pending photo correction.' 
                : 'ETA grant decision is pending. Typically complete within 72 hours.'}
            </p>
          </div>
        </div>
      </div>
    `;

    // Render pass if approved
    if (isApproved) {
      timelineHtml += renderDigitalPass(app);
    }

    trackStatusCard.innerHTML = timelineHtml;

    // Attach event listener for reupload loop if relevant
    if (isActionRequired) {
      const fileInput = document.getElementById('reupload-photo-file');
      const submitBtn = document.getElementById('reupload-submit-btn');

      submitBtn.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (!file) {
          alert('Please select a photograph file to upload.');
          return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Uploading...';

        setTimeout(() => {
          // Update status in localStorage to Approved
          const applications = JSON.parse(localStorage.getItem('evisa_applications') || '[]');
          const idx = applications.findIndex(a => a.referenceId === app.referenceId);
          if (idx !== -1) {
            applications[idx].status = 'Approved';
            applications[idx].comments = 'e-Visa request verified. Your ETA digital pass has been issued.';
            localStorage.setItem('evisa_applications', JSON.stringify(applications));
            
            // Re-render
            renderStatusTimeline(applications[idx]);
          }
        }, 2000);
      });
    }
  }

  function renderDigitalPass(app) {
    const visaInfo = VISA_DATABASE[app.purpose] || VISA_DATABASE.tourism;
    // Generate valid dates
    const grantDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return `
      <div class="eta-pass-wrapper">
        <div class="eta-pass-header">
          <span style="font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-border); font-weight: 600;">Republic of India · Electronic Travel Authorization</span>
          <h3 style="margin-top: 2px;">e-VISA DIRECT PASS</h3>
          <span class="status-badge">Approved / Active</span>
        </div>
        
        <div class="eta-pass-body">
          <div class="eta-qr-section">
            <div class="qr-code-img">
              <!-- Inline SVG for QR Code -->
              <svg width="120" height="120" viewBox="0 0 29 29" style="shape-rendering: crispEdges;">
                <path fill="#141413" d="M0 0h7v7H0zm1 1v5h5V1zm8 0h3v1H9zm1 2h1v1h-1zm-1 2h2v1H9zm4-5h7v7h-7zm1 1v5h5V1zm8 1h3v1h-3zm1 2h1v1h-1zm-1 2h2v1h-2zm-14 8h7v7H0zm1 1v5h5v-5zm8 0h1v1h-1zm2 1h1v1h-1zm-2 2h3v1h-3zm3 2h1v1h-1zm2-5h1v1h-1zm2 0h1v1h-1zm-3 2h2v1h-2zm3 1h2v1h-2zm2-3h1v1h-1zm-2 4h1v1h-1zm2 1h1v1h-1zm-7 1h1v1h-1zm3 0h1v1h-1zm3-8h1v2h-1zm1 3h2v1h-2zm1 2h1v1h-1zm-4-4h2v1h-2zm-1 2h1v1h-1zm-1 1h1v1h-1zm4 1h1v1h-1zm3 1h2v1h-2z"/>
              </svg>
            </div>
            <span style="font-size: 0.85rem; font-family: monospace; font-weight: 700; color: var(--color-primary);">${app.referenceId}</span>
          </div>

          <div class="pass-grid">
            <div class="pass-item">
              <span class="label">Given Name(s)</span>
              <span class="value">${app.givenName}</span>
            </div>
            <div class="pass-item">
              <span class="label">Surname</span>
              <span class="value">${app.surname}</span>
            </div>
            <div class="pass-item">
              <span class="label">Nationality</span>
              <span class="value">${app.nationality}</span>
            </div>
            <div class="pass-item">
              <span class="label">Passport Number</span>
              <span class="value">${app.passportNo}</span>
            </div>
            <div class="pass-item">
              <span class="label">Visa Subcategory</span>
              <span class="value" style="font-size:0.8rem;">${visaInfo.name}</span>
            </div>
            <div class="pass-item">
              <span class="label">Entries Allowed</span>
              <span class="value">${visaInfo.entries}</span>
            </div>
            <div class="pass-item">
              <span class="label">Date of Issue</span>
              <span class="value">${grantDate}</span>
            </div>
            <div class="pass-item">
              <span class="label">Date of Expiry</span>
              <span class="value">${expiryDate}</span>
            </div>
          </div>
        </div>

        <div class="eta-pass-footer">
          Please present this digital pass on your mobile device or printed copy to the Immigration Officer upon arrival in India.
          <br>
          <button class="btn btn-outline" onclick="window.print()" style="padding: 0.4rem 0.8rem; font-size: 0.75rem; margin-top: var(--spacing-sm);">
            🖨 Print or Download Pass
          </button>
        </div>
      </div>
    `;
  }

  // Pre-load form details
  loadFormState();
});
