import { useEffect, useRef, useState, type ReactNode } from 'react';
import { DitherIcon } from '../src';
import { collection, filterIcons, labelFor, palettes, textures } from './model';
import { docs, docLabel, docPath } from './content/docs';
import { Link, useRouter } from './routing';
import { useSite } from './settings';
import { CopyButton, Glyph } from './ui';

export function DirectoryLayout({ children, icons = false }: { children: ReactNode; icons?: boolean }) {
  const { route, navigate } = useRouter();
  const [query, setQuery] = useState('');
  const sidebar = useRef<HTMLElement>(null);
  useEffect(() => {
    const active = sidebar.current?.querySelector<HTMLElement>('[aria-current=page]');
    if (active && sidebar.current) {
      const offset = active.offsetTop - sidebar.current.offsetTop;
      if (offset > sidebar.current.scrollTop + sidebar.current.clientHeight - 70 || offset < sidebar.current.scrollTop) sidebar.current.scrollTop = Math.max(0, offset - 120);
    }
  }, [route.path]);
  return <div className="directory-layout">
    <label className="mobile-page-picker"><span>On this page</span><select aria-label="Browse pages" value={route.path} onChange={event => navigate(event.target.value)}>
      <optgroup label="Guides">{docs.map(doc => <option key={doc.slug} value={docPath(doc.slug)}>{docLabel(doc)}</option>)}<option value="/ai">For AI agents</option><option value="/motion">Motion studio</option></optgroup>
      {icons && <optgroup label="Icons">{collection.map(icon => <option key={icon.name} value={`/icons/${icon.name}`}>{labelFor(icon.name)}</option>)}</optgroup>}
    </select><Glyph name="chevron" size={16} /></label>
    <aside className="directory-sidebar" ref={sidebar} aria-label={icons ? 'Browse the library' : 'Documentation navigation'}>
      <span className="sidebar-heading">Getting started</span>
      <nav>{docs.map(doc => <Link key={doc.slug} href={docPath(doc.slug)} aria-current={route.path === docPath(doc.slug) ? 'page' : undefined}>{docLabel(doc)}</Link>)}<Link href="/ai" aria-current={route.path === '/ai' ? 'page' : undefined}>For AI agents<small>↗</small></Link></nav>
      {icons ? <>
        <div className="sidebar-section-heading"><span className="sidebar-heading">The collection</span><small>{collection.length}</small></div>
        <label className="sidebar-search"><Glyph name="search" size={13} /><input aria-label="Filter icon navigation" placeholder="Find an icon…" value={query} onChange={event => setQuery(event.target.value)} /></label>
        <nav className="icon-directory">{filterIcons(query, 'All icons').map(icon => <Link href={`/icons/${icon.name}`} key={icon.name} aria-current={route.path === `/icons/${icon.name}` ? 'page' : undefined}><span>{labelFor(icon.name)}</span></Link>)}{filterIcons(query, 'All icons').length === 0 && <p className="sidebar-empty">No matching icons.</p>}</nav>
      </> : <div className="sidebar-note"><DitherIcon name="book" size={34} animate={false} /><p>Prefer to read with your agent?</p><a href="/llms-full.txt">Plain-text guide<Glyph name="arrow" size={13} /></a></div>}
    </aside>
    <div className="directory-content">{children}</div>
  </div>;
}

function Highlight({ value }: { value: string }) {
  if (value.length > 16000) return <>{value}</>;
  return <>{value.split(/("[^"\n]*"|'[^'\n]*'|\/\/[^\n]*|\b(?:import|from|export|const|return|function|true|false)\b)/g).map((part, index) => <span key={index} className={part.startsWith('//') ? 'syntax-muted' : /^['"]/.test(part) ? 'syntax-green' : /^(import|from|export|const|return|function|true|false)$/.test(part) ? 'syntax-purple' : undefined}>{part}</span>)}</>;
}
export function CodeBlock({ value, title = 'React', language = 'tsx', className = '' }: { value: string; title?: string; language?: string; className?: string }) {
  const [error, setError] = useState(false);
  useEffect(() => setError(false), [value]);
  return <div className={`guide-code ${className}`}>
    <div className="guide-code-bar"><span><Glyph name="code" size={14} />{title}</span><CopyButton value={value} label={`Copy ${language === 'tsx' ? 'React' : language === 'svg' ? 'SVG' : 'code'}`} onError={() => setError(true)} /></div>
    <pre tabIndex={0} aria-label={`${title} source`}><code><Highlight value={value} /></code></pre>
    {error && <p role="alert" className="code-error">Clipboard unavailable. Select the source above to copy it.</p>}
  </div>;
}
export function MaterialControls({ compact = false }: { compact?: boolean }) {
  const { texture, setTexture, palette, setPalette, color, motion, setMotion } = useSite();
  return <div className={`material-controls ${compact ? 'compact' : ''}`}>
    <div className="segmented" aria-label="Material">{textures.map(value => <button key={value} aria-pressed={value === texture} onClick={() => setTexture(value)}><span className={`texture-sample sample-${value}`} />{value}</button>)}</div>
    <label className="page-palette"><span className="color-dot" style={{ background: color }} /><select aria-label="Icon color" value={palette} onChange={event => setPalette(event.target.value)}>{palettes.map(item => <option key={item.name}>{item.name}</option>)}</select><Glyph name="chevron" size={14} /></label>
    <label className="motion-toggle"><input type="checkbox" aria-label="Icon motion" checked={motion} onChange={event => setMotion(event.target.checked)} /><span className="switch-track"><span /></span><span>Motion {motion ? 'on' : 'off'}</span></label>
  </div>;
}
export function PageHeading({ eyebrow, title, description, children }: { eyebrow: ReactNode; title: string; description: string; children?: ReactNode }) {
  return <div className="page-heading"><div className="page-eyebrow">{eyebrow}</div><div className="page-title-row"><h1 data-page-heading tabIndex={-1}>{title}</h1>{children}</div><p>{description}</p></div>;
}
export function NextGuide({ href, label }: { href: string; label: string }) { return <Link className="next-guide" href={href}><span><small>Up next</small><strong>{label}</strong></span><Glyph name="arrow" /></Link>; }
