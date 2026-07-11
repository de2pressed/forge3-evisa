'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import OfficialMasthead from './OfficialMasthead';

export default function SiteHeader({ announcement }) {
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
        <div className="container nav">
          <OfficialMasthead />
          <nav className="nav-links" id="navLinks" aria-label="Main navigation">
            <Link className={isActive('/') && pathname === '/' ? 'active' : ''} href="/">Home</Link>
            <Link className={isActive('/eligibility') ? 'active' : ''} href="/eligibility">Eligibility</Link>
            <Link href="/#requirements">Documents</Link>
            <Link className={isActive('/track') ? 'active' : ''} href="/track">Track</Link>
            <Link className={isActive('/help') ? 'active' : ''} href="/help">Help</Link>
          </nav>
          <button className="menu-button" id="menuButton" aria-label="Open menu" aria-expanded="false" onClick={handleMenu}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 7h16M4 12h16M4 17h16"/>
            </svg>
          </button>
          <div className="nav-actions">
            <Link className="btn btn-outline btn-sm" href="/track">Track application</Link>
            <Link className="btn btn-primary btn-sm" href="/apply">Start application ↗</Link>
          </div>
        </div>
      </header>
    </>
  );
}
