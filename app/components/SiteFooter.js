'use client';
import Link from 'next/link';
import { useEffect } from 'react';

export default function SiteFooter({ variant = 'full', disclaimer }) {
  useEffect(() => {
    document.querySelectorAll('[data-current-year]').forEach(node => {
      node.textContent = String(new Date().getFullYear());
    });
  }, []);

  if (variant === 'minimal') {
    return (
      <footer className="site-footer minimal-footer">
        <div className="container">
          <div className="footer-bottom">
            <span>© <span data-current-year></span> Forge eVisa</span>
            <span>{disclaimer}</span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="brand" href="/">
              <svg className="brand-mark" viewBox="0 0 32 32" fill="none">
                <path d="M16 2.5 19.4 12l9.1 4-9.1 4L16 29.5 12.6 20 3.5 16l9.1-4L16 2.5Z" fill="currentColor"/>
              </svg>
              <span>Forge<small style={{ color: '#9ba9a3' }}>India eVisa</small></span>
            </Link>
            <p>A clearer way to understand and complete the Indian eVisa journey.</p>
          </div>
          <div className="footer-col">
            <h3>Apply</h3>
            <Link href="/apply">New application</Link>
            <Link href="/track">Track application</Link>
            <Link href="/eligibility">Check eligibility</Link>
          </div>
          <div className="footer-col">
            <h3>Prepare</h3>
            <Link href="/#requirements">Documents</Link>
            <Link href="/help#fees">Fees and payment</Link>
            <Link href="/help">Help centre</Link>
          </div>
          <div className="footer-col">
            <h3>Official resources</h3>
            <a href="https://indianvisaonline.gov.in/evisa/" target="_blank" rel="noopener">Indian Visa Online ↗</a>
            <a href="https://boi.gov.in/" target="_blank" rel="noopener">Bureau of Immigration ↗</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© <span data-current-year></span> Forge eVisa</span>
          <span className="footer-official">Travel requirements can change. Confirm final requirements with the relevant official authority.</span>
        </div>
      </div>
    </footer>
  );
}
