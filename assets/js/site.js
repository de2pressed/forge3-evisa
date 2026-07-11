(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const toast = $('#toast');
  let toastTimer;

  function notify(message) {
    if (!toast) return;
    const copy = $('[data-toast-copy]', toast);
    if (copy) copy.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  const menu = $('#menuButton');
  if (menu) menu.addEventListener('click', () => {
    const nav = $('#navLinks');
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });

  $$('.accordion-button').forEach(button => button.addEventListener('click', () => {
    const item = button.closest('.accordion-item');
    const open = item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  }));

  const routeForm = $('#routeForm');
  if (routeForm) routeForm.addEventListener('submit', event => {
    event.preventDefault();
    const purpose = $('#purpose')?.value;
    const result = $('#routeResult');
    const title = $('[data-route-title]', result);
    const detail = $('[data-route-detail]', result);
    if (purpose === 'business') {
      title.textContent = 'Normal e‑Business Visa';
      detail.textContent = '365 days · Multiple entry · Up to 180 days each visit';
    } else {
      title.textContent = 'A different eVisa route may fit';
      detail.textContent = 'This experience is focused on normal business travel. Review eligibility before applying.';
    }
    result.classList.add('show');
    notify('Your recommended route is ready');
  });

  const application = $('#applicationFlow');
  if (application) {
    let current = 1;
    let submitted = false;

    function setStep(step) {
      current = step;
      $$('.form-step', application).forEach(panel => panel.classList.toggle('active', Number(panel.dataset.step) === step));
      $$('.progress-item').forEach(item => {
        const number = Number(item.dataset.progress);
        item.classList.toggle('current', number === step);
        item.classList.toggle('done', number < step);
        $('.progress-dot', item).textContent = number < step ? '✓' : number;
      });
      window.scrollTo({top: 0, behavior: 'smooth'});
      try { localStorage.setItem('forge-evisa-step', String(step)); } catch (_) {}
    }

    $$('[data-next]').forEach(button => button.addEventListener('click', () => setStep(Number(button.dataset.next))));
    $$('[data-back]').forEach(button => button.addEventListener('click', () => setStep(Number(button.dataset.back))));
    $$('[data-edit]').forEach(button => button.addEventListener('click', () => setStep(Number(button.dataset.edit))));

    const applicantForm = $('#applicantForm');
    if (applicantForm) applicantForm.addEventListener('submit', event => {
      event.preventDefault();
      setStep(2);
    });

    const businessForm = $('#businessForm');
    if (businessForm) businessForm.addEventListener('submit', event => {
      event.preventDefault();
      setStep(3);
    });

    $$('input[type="file"]', application).forEach(input => input.addEventListener('change', () => {
      if (!input.files.length) return;
      const card = input.closest('.upload-card');
      card.classList.add('ready');
      const status = $('.upload-status', card);
      status.textContent = 'Ready';
      status.classList.add('ready');
      const filename = $('[data-filename]', card);
      if (filename) filename.textContent = input.files[0].name;
      notify('Document ready to review');
    }));

    const feeConsent = $('#feeConsent');
    const feeContinue = $('#feeContinue');
    if (feeConsent && feeContinue) feeConsent.addEventListener('change', () => feeContinue.disabled = !feeConsent.checked);

    const submitButton = $('#submitApplication');
    if (submitButton) submitButton.addEventListener('click', () => {
      submitted = true;
      $('#reviewContent').classList.add('hidden');
      $('#applicationSuccess').classList.add('show');
      $$('.progress-item').forEach(item => {
        item.classList.add('done');
        item.classList.remove('current');
        $('.progress-dot', item).textContent = '✓';
      });
      notify('Application submitted');
      try {
        localStorage.setItem('forge-evisa-reference', 'IND-BIZ-26-7K92');
        localStorage.setItem('forge-evisa-status', 'under-review');
      } catch (_) {}
    });

    const copyReference = $('#copyReference');
    if (copyReference) copyReference.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText('IND-BIZ-26-7K92'); } catch (_) {}
      notify('Reference copied');
    });
  }

  const statusButton = $('#statusButton');
  if (statusButton) statusButton.addEventListener('click', () => {
    const input = $('#referenceInput');
    if (!input.value.trim()) {
      input.focus();
      notify('Enter your application reference');
      return;
    }
    $('#statusReference').textContent = input.value.trim().toUpperCase();
    $('#statusResult').classList.remove('hidden');
    notify('Status refreshed');
  });

  const downloadEta = $('#downloadEta');
  if (downloadEta) downloadEta.addEventListener('click', () => notify('Your eVisa is ready to save'));

  const modal = $('#officialModal');
  $$('[data-official-modal]').forEach(trigger => trigger.addEventListener('click', event => {
    event.preventDefault();
    modal?.classList.add('open');
  }));
  $$('[data-close-modal]').forEach(trigger => trigger.addEventListener('click', () => modal?.classList.remove('open')));
  if (modal) modal.addEventListener('click', event => { if (event.target === modal) modal.classList.remove('open'); });

  $$('[data-current-year]').forEach(node => node.textContent = String(new Date().getFullYear()));
})();
