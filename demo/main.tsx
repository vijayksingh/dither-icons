import { Component, Suspense, lazy, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { DitherIcon, definitions } from '../src';
import HomePage from './HomePage';
import SearchDialog from './SearchDialog';
import { Link, Router, useRouter } from './routing';
import { SiteProvider, useSite } from './settings';
import { docs, docLabel, docPath } from './content/docs';
import { labelFor } from './model';
import { Glyph, TIMING } from './ui';
import './style.css';
import './pages.css';

const IconPage = lazy(() => import('./pages/IconPage'));
const DocsPage = lazy(() => import('./pages/DocsPage'));
const AIPage = lazy(() => import('./pages/AIPage'));
const MotionPage = lazy(() => import('./pages/MotionPage'));
class PageBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="page-error"><h1 data-page-heading tabIndex={-1}>This page didn’t load.</h1><p>Reload the page to try again.</p><button className="button primary" onClick={() => location.reload()}>Reload page</button></div> : this.props.children; }
}
function LoadedPage({ children }: { children: ReactNode }) {
  const { route, settle } = useRouter();
  useLayoutEffect(() => {
    const frame = requestAnimationFrame(settle);
    return () => cancelAnimationFrame(frame);
  }, [route.key]);
  return <div className="page-arrival">{children}</div>;
}
function App() {
  const { route } = useRouter();
  const { color, motion, dark, setDark } = useSite();
  const [search, setSearch] = useState(false);
  const mobileMenu = useRef<HTMLDetailsElement>(null);
  const iconName = route.path.startsWith('/icons/') ? route.path.slice('/icons/'.length) : undefined;
  const icon = definitions.find(item => item.name === iconName);
  const doc = docs.find(item => docPath(item.slug) === route.path);
  const pageTitle = icon ? labelFor(icon.name) : doc ? docLabel(doc) : route.path === '/ai' ? 'For AI agents' : route.path === '/motion' ? 'Motion studio' : 'A little grain. A lot of character.';
  useEffect(() => {
    document.title = `Dither Icons — ${pageTitle}`;
    if (mobileMenu.current) mobileMenu.current.open = false;
  }, [route.path, pageTitle]);
  useEffect(() => {
    function keyboard(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearch(value => !value); }
      if (event.key === 'Escape' && mobileMenu.current?.open) { mobileMenu.current.open = false; mobileMenu.current.querySelector('summary')?.focus(); }
    }
    function outside(event: PointerEvent) { if (mobileMenu.current && !mobileMenu.current.contains(event.target as Node)) mobileMenu.current.open = false; }
    document.addEventListener('keydown', keyboard); document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', keyboard); document.removeEventListener('pointerdown', outside); };
  }, []);
  const links = [{ href: '/#collection', label: 'Icons', active: route.path === '/' || !!icon }, { href: '/motion', label: 'Motion', active: route.path === '/motion' }, { href: '/docs', label: 'Docs', active: !!doc }, { href: '/ai', label: 'For AI', active: route.path === '/ai' }];
  return <div id="top" className="app" data-motion={motion} style={{ '--accent': color, '--icon-color': color, '--enter': `${TIMING.enter}ms`, '--exit': `${TIMING.dismiss}ms` } as CSSProperties}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header multi-page-header"><Link className="brand" href="/" aria-label="Dither Icons home"><span className="brand-mark"><DitherIcon name="layers" size={25} animate={false} /></span>dither<span className="brand-muted">icons</span></Link><nav aria-label="Main navigation">{links.map(link => <Link key={link.href} href={link.href} aria-current={link.active ? 'page' : undefined}>{link.label}{link.label === 'Icons' && <span className="nav-count">{definitions.length}</span>}</Link>)}</nav>
      <div className="header-actions"><button className="header-search" onClick={() => setSearch(true)} aria-label="Search the library"><Glyph name="search" size={15} /><span>Search</span><kbd>⌘ K</kbd></button><button className="icon-button theme-toggle" onClick={() => setDark(value => !value)} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}><span key={String(dark)}><Glyph name={dark ? 'sun' : 'moon'} /></span></button><Link className="button subtle header-download" href="/docs/installation">Get the library<Glyph name="down" size={15} /></Link><details ref={mobileMenu} className="mobile-menu"><summary aria-label="Open navigation"><Glyph name="menu" size={21} /></summary><nav aria-label="Mobile navigation">{links.map(link => <Link href={link.href} key={link.href} aria-current={link.active ? 'page' : undefined}>{link.label}<Glyph name="arrow" size={14} /></Link>)}<Link href="/docs/installation">Get the library<Glyph name="down" size={14} /></Link></nav></details></div>
    </header>
    <main id="main-content"><PageBoundary key={route.path}><Suspense fallback={<div className="page-loading" role="status"><span />Preparing the page…</div>}><LoadedPage key={route.path}>{route.path === '/' ? <HomePage /> : icon ? <IconPage key={icon.name} name={icon.name} /> : doc ? <DocsPage key={doc.slug} slug={doc.slug} /> : route.path === '/ai' ? <AIPage /> : route.path === '/motion' ? <MotionPage /> : <div className="page-error"><DitherIcon name="search" size={64} animate={false} /><h1 data-page-heading tabIndex={-1}>That page wandered off.</h1><p>There are still {definitions.length} little details to discover.</p><Link href="/" className="button primary">Back to the collection<Glyph name="arrow" size={16} /></Link></div>}</LoadedPage></Suspense></PageBoundary></main>
    <footer className="site-footer"><Link className="brand" href="/"><span className="brand-mark"><DitherIcon name="layers" size={23} animate={false} /></span>dither<span className="brand-muted">icons</span></Link><span>A little more human. By Unlocalhosted.</span><nav aria-label="Footer navigation"><Link href="/docs">Documentation</Link><Link href="/ai">For AI agents</Link><a href="/llms.txt">llms.txt</a></nav></footer>
    <span className="sr-only" role="status">{pageTitle}</span>
    {search && <SearchDialog onClose={() => setSearch(false)} />}
  </div>;
}
createRoot(document.getElementById('root')!).render(<SiteProvider><Router><App /></Router></SiteProvider>);
