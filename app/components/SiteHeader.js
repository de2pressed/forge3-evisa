'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
          <Link className="brand" href="/" aria-label="Forge eVisa home">
            <svg className="brand-mark" viewBox="0 0 32 32" fill="none">
              <path d="M16 2.5 19.4 12l9.1 4-9.1 4L16 29.5 12.6 20 3.5 16l9.1-4L16 2.5Z" fill="currentColor"/>
              <path d="m16 8 1.7 6.3L24 16l-6.3 1.7L16 24l-1.7-6.3L8 16l6.3-1.7L16 8Z" fill="#fbfaf5"/>
            </svg>
            <span>Forge<small>India eVisa</small></span>
          </Link>
          <nav className="nav-links" id="navLinks" aria-label="Main navigation">
            <Link className={isActive('/') && pathname === '/' ? 'active' : ''} href="/">Home</Link>
            <Link className={isActive('/eligibility') ? 'active' : ''} href="/eligibility">Eligibility</Link>
            <Link href="/#requirements">Documents</Link>
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
