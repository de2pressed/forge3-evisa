'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SiteHeader({ announcement = 'No emergency or express eVisa fee is charged. Know every cost before you pay.' }) {
  const pathname = usePathname();

  const handleMenu = () => {
    const nav = document.getElementById('navLinks');
    const btn = document.getElementById('menuButton');
    if (nav && btn) {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    }
  };

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {announcement && (
        <div className="announcement">
          <div className="container">
            <i></i>{announcement}
          </div>
        </div>
      )}
      <header className="site-header">
        <div className="container nav official-nav">
          <a
            className="header-logo header-logo-left"
            href="https://boi.gov.in/"
            target="_blank"
            rel="noopener"
            aria-label="Bureau of Immigration"
          >
            <img src="/images/webp/boi_logo_1.webp" alt="Bureau of Immigration" />
          </a>

          <div className="header-center">
            <nav className="nav-links" id="navLinks" aria-label="Main navigation">
              <Link className={isActive('/') && pathname === '/' ? 'active' : ''} href="/">Home</Link>
              <Link className={isActive('/eligibility') ? 'active' : ''} href="/eligibility">Eligibility</Link>
              <Link href="/documents">Documents</Link>
              <Link className={isActive('/track') ? 'active' : ''} href="/track">Track</Link>
              <Link className={isActive('/help') ? 'active' : ''} href="/help">Help</Link>
            </nav>
            <span className="nav-divider" aria-hidden="true" />
            <div className="nav-actions">
              <Link className="btn btn-outline btn-sm" href="/track">Track application</Link>
              <Link className="btn btn-primary btn-sm" href="/apply">Start application ↗</Link>
            </div>
          </div>

          <a
            className="header-logo header-logo-right"
            href="https://indianvisaonline.gov.in/evisa/"
            target="_blank"
            rel="noopener"
            aria-label="Indian e-Visa"
          >
            <img src="/images/webp/e-visa-logo.webp" alt="Indian e-Visa" />
          </a>

          <button className="menu-button" id="menuButton" aria-label="Open menu" aria-expanded="false" onClick={handleMenu}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 7h16M4 12h16M4 17h16"/>
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}
