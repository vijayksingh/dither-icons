import { memo, useEffect, useRef, useState, useTransition, type CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import { DitherIcon, definitions, studies, type Texture } from '../src';
import { MotionStudies } from './MotionStudies';
import { IconDetails } from './IconDetails';
import { CategoryFilter } from './CategoryFilter';
import { CopyButton, Glyph, TIMING } from './ui';
import { filterIcons, installCommand, labelFor, packageUrl, palettes, reactCode, textures } from './model';
import './style.css';

// Keep unchanged SVG geometry out of search, copy, dialog and theme updates.
const PreviewIcon = memo(DitherIcon);
const SHELF = ['heart', 'bell', 'download', 'layers', 'send'];
const FIRST_PAGE = 12;

function App() {
  const [palette, setPalette] = useState('Iris');
  const [dark, setDark] = useState(() => { try { return localStorage.getItem('dither-theme') !== 'light'; } catch { return true; } });
  const [motion, setMotion] = useState(true);
  const [texture, setTexture] = useState<Texture>('dither');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All icons');
  const [selected, setSelected] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [expanding, startExpansion] = useTransition();
  const [studio, setStudio] = useState(location.hash === '#motion-studies');
  const [message, setMessage] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const paletteRef = useRef<HTMLDetailsElement>(null);
  const colors = palettes.find(item => item.name === palette)!;
  const color = dark ? colors.dark : colors.light;
  const filtered = filterIcons(query, category);
  const visible = showAll || query || category !== 'All icons' ? filtered : filtered.slice(0, FIRST_PAGE);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    try { localStorage.setItem('dither-theme', dark ? 'dark' : 'light'); } catch { /* Storage is optional. */ }
  }, [dark]);
  useEffect(() => {
    function shortcuts(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k' && !document.querySelector('dialog[open]')) {
        event.preventDefault(); searchRef.current?.focus(); searchRef.current?.select();
      }
      if (event.key === 'Escape' && paletteRef.current?.open) { paletteRef.current.open = false; paletteRef.current.querySelector('summary')?.focus(); }
    }
    function outside(event: PointerEvent) { if (paletteRef.current && !paletteRef.current.contains(event.target as Node)) paletteRef.current.open = false; }
    function hashChanged() { if (location.hash === '#motion-studies') setStudio(true); }
    document.addEventListener('keydown', shortcuts); document.addEventListener('pointerdown', outside); window.addEventListener('hashchange', hashChanged);
    return () => { document.removeEventListener('keydown', shortcuts); document.removeEventListener('pointerdown', outside); window.removeEventListener('hashchange', hashChanged); };
  }, []);
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(''), 6000);
    return () => clearTimeout(timer);
  }, [message]);
  useEffect(() => {
    if (showAll) document.querySelectorAll<HTMLElement>('.card-title')[FIRST_PAGE]?.focus();
  }, [showAll]);
  function openStudies() {
    setStudio(true);
    requestAnimationFrame(() => document.getElementById('motion-studies')?.scrollIntoView());
  }

  return <div id="top" className="app" data-motion={motion} style={{ '--accent': color, '--icon-color': color, '--enter': `${TIMING.enter}ms`, '--exit': `${TIMING.dismiss}ms` } as CSSProperties}>
    <a className="skip-link" href="#collection">Skip to icons</a>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Dither Icons home"><span className="brand-mark"><PreviewIcon name="layers" size={25} animate={false} /></span>dither<span className="brand-muted">icons</span></a>
      <nav aria-label="Main navigation"><a href="#collection">Icons <span className="nav-count">{definitions.length}</span></a><a href="#motion-studies" onClick={openStudies}>Motion studies</a><a href="#use">Usage</a></nav>
      <div className="header-actions"><button className="icon-button theme-toggle" onClick={() => setDark(value => !value)} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}><span key={String(dark)}><Glyph name={dark ? 'sun' : 'moon'} /></span></button><a className="button subtle header-download" href={packageUrl} download>Get the library<Glyph name="down" size={15} /></a></div>
    </header>
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="icon-shelf" aria-label="Try the icons">
          {SHELF.map((name, index) => <button key={name} className="shelf-tile di-trigger" style={{ '--tilt': `${(index - 2) * 8}deg`, '--lift': `${Math.abs(index - 2) * 7}px`, '--order': index } as CSSProperties} aria-label={`Animate ${labelFor(name)}`} disabled={!motion}>
            <PreviewIcon name={name} size={57} texture={texture} animate={motion} /><span className="shelf-label">{labelFor(name)}</span>
          </button>)}
        </div>
        <h1 id="hero-title">A little grain.<br />{' '}<span>A lot of character.</span></h1>
        <p>Considered shapes. Meaningful motion.<br className="mobile-break" /> {definitions.length} original SVG icons<br className="desktop-break" /> for interfaces that feel a little more human.</p>
        <div className="hero-actions"><a className="button primary" href="#collection">Find your icon<Glyph name="arrow" size={16} /></a><a className="button subtle" href={packageUrl} download><Glyph name="code" size={16} />Get the library</a></div>
        <div className="hero-note"><span className="availability-dot" /><span>Free & open source</span><span aria-hidden="true">·</span><span>React + SVG</span><span className="credit-separator" aria-hidden="true">·</span><span className="maker-credit">Made by Unlocalhosted</span></div>
      </section>

      <section id="collection" className="collection" aria-labelledby="collection-title">
        <div className="collection-heading"><div><h2 id="collection-title">Find a little character.</h2><p>Hover to feel it. Click the name to make it yours.</p></div><label className="motion-toggle"><input type="checkbox" checked={motion} onChange={event => setMotion(event.target.checked)} /><span className="switch-track"><span /></span><span>Motion {motion ? 'on' : 'off'}</span></label></div>
        <div className="toolbar">
          <div className="search-field"><Glyph name="search" size={17} /><input ref={searchRef} type="search" aria-label="Search icons" placeholder="Find an icon…" value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => { if (event.key === 'Escape') setQuery(''); }} />{query ? <button className="icon-button" onClick={() => { setQuery(''); searchRef.current?.focus(); }} aria-label="Clear search"><Glyph name="close" size={15} /></button> : <kbd aria-hidden="true">⌘ K</kbd>}</div>
          <div className="gallery-options">
            <details className="palette-picker" ref={paletteRef}><summary aria-label={`Primary color: ${palette}`}><span className="color-dot" />{palette}<Glyph name="chevron" size={15} /></summary><div className="palette-popover"><span className="popover-label">A considered palette</span><div>{palettes.map(item => <button key={item.name} aria-pressed={palette === item.name} onClick={() => { setPalette(item.name); paletteRef.current!.open = false; paletteRef.current?.querySelector('summary')?.focus(); }}><span className="color-dot" style={{ background: dark ? item.dark : item.light }} /><span>{item.name}</span>{palette === item.name && <Glyph name="check" size={14} />}</button>)}</div></div></details>
            <div className="segmented texture-picker" aria-label="Icon texture">{textures.map(value => <button key={value} aria-pressed={texture === value} onClick={() => setTexture(value)}><span className={`texture-sample sample-${value}`} />{value}</button>)}</div>
          </div>
        </div>
        <div className="category-row"><CategoryFilter value={category} onChange={value => { setCategory(value); setShowAll(false); }} motion={motion} /><span className="result-count" role="status">{filtered.length} icons</span></div>
        <div className="icon-grid">
          {visible.map(icon => <article key={icon.name} className="icon-card">
            <button className="card-stage di-trigger" aria-label={`Preview ${labelFor(icon.name)} animation`} disabled={!motion}>
              <PreviewIcon name={icon.name} size={83} texture={texture} animate={motion} />
              <span className="stage-corner" aria-hidden="true"><i /><i /><i /><i /></span>
              <span className="animate-pill"><Glyph name="replay" size={12} /><span className="at-rest">{motion ? 'Animate' : 'Motion off'}</span><span className="is-playing">Playing</span></span>
            </button>
            <div className="card-meta"><button className="card-title" onClick={() => setSelected(icon.name)} aria-label={`Inspect ${labelFor(icon.name)}`}><span>{labelFor(icon.name)}<Glyph name="arrow" size={14} /></span><small>{icon.category}<span className="meta-dot">·</span>{(studies[icon.name].duration / 1000).toFixed(2)}s</small></button><CopyButton compact value={reactCode(icon.name, 48, texture, color, motion)} label={`Copy ${labelFor(icon.name)} React`} onError={() => { setSelected(icon.name); setMessage('Clipboard unavailable. Select the code in the inspector to copy it.'); }} /></div>
          </article>)}
        </div>
        {filtered.length === 0 && <div className="empty"><PreviewIcon name="search" size={56} animate={false} /><h3>No icons for “{query}”</h3><p>Try a different name, action, or category.</p><button className="button subtle" onClick={() => { setQuery(''); setCategory('All icons'); searchRef.current?.focus(); }}>Clear filters<Glyph name="arrow" size={15} /></button></div>}
        <div className="gallery-foot">{visible.length < filtered.length ? <button className="button subtle show-all" disabled={expanding} onClick={() => startExpansion(() => setShowAll(true))}>{expanding ? 'Opening collection…' : `Explore all ${filtered.length} icons`}<span>+{filtered.length - visible.length}</span><Glyph name="arrow" size={16} /></button> : <span>{filtered.length > 0 ? `${filtered.length} small details. Ready for your next interface.` : 'A fresh search is a good place to start.'}</span>}</div>
      </section>

      <section className="motion-invitation" aria-label="Motion study invitation"><div className="invitation-art di-trigger" tabIndex={0} role="img" aria-label="Animated layers illustration"><PreviewIcon name="layers" size={64} texture={texture} animate={motion} /></div><div><span className="eyebrow">NOT JUST A PRETTY FRAME</span><h2>Every icon has its own little story.</h2><p>A bell rings. A tray catches. A lid gives way.<br />Get closer to the details that make each gesture feel right.</p></div><a className="button subtle" href="#motion-studies" onClick={openStudies}>Explore the motion<Glyph name="arrow" size={16} /></a></section>
      <details className="studio-disclosure" open={studio} onToggle={event => setStudio(event.currentTarget.open)}><summary id="motion-studies"><span>Motion studies</span><span>{studio ? 'Close the studio' : 'Open the studio'}<Glyph name="chevron" size={16} /></span></summary>{studio && <MotionStudies texture={texture} enabled={motion} />}</details>

      <section id="use" className="usage" aria-labelledby="usage-title"><div className="usage-intro"><span className="eyebrow">READY WHEN YOU ARE</span><h2 id="usage-title">From this page<br />to your next idea.</h2><p>Take an SVG, or bring the whole collection.<br />One React dependency. No extra stylesheet.</p><a href={packageUrl} download className="button primary">Download the library<Glyph name="down" size={16} /></a><small>v0.1.0 · MIT license · Local package preview</small></div><div className="usage-code"><div className="usage-code-title"><span><Glyph name="code" size={17} />A small addition. A different feeling.</span></div><div className="install-line"><code>{installCommand}</code><CopyButton compact value={installCommand} label="Copy install command" onError={() => setMessage('Clipboard unavailable. Select the install command to copy it.')} /></div><pre tabIndex={0} aria-label="React usage example"><code><span className="syntax-muted">{'// Add to any React 18+ project\n'}</span><span className="syntax-purple">import</span>{' { DownloadIcon } '}<span className="syntax-purple">from</span>{'\n  '}<span className="syntax-green">{'\'@unlocalhosted/dither-icons\''}</span>{';\n\n'}{'<'}<span className="syntax-purple">button</span>{' className='}<span className="syntax-green">{'"di-trigger"'}</span>{'\n        aria-label='}<span className="syntax-green">{'"Download file"'}</span>{'>\n  <'}<span className="syntax-purple">DownloadIcon</span>{' size={48} />\n</button>'}</code></pre><div className="usage-code-foot"><span className="availability-dot" />Keyboard friendly. Reduced motion respected.</div></div></section>
    </main>
    <footer className="site-footer"><a className="brand" href="#top"><span className="brand-mark"><PreviewIcon name="layers" size={23} animate={false} /></span>dither<span className="brand-muted">icons</span></a><span>A little more human. By Unlocalhosted.</span><a href="#top">Back to top<Glyph name="arrow" size={14} /></a></footer>
    <div className={`site-notice ${message ? 'visible' : ''}`} role="status">{message}</div>
    {selected && <IconDetails notice={message} name={selected} texture={texture} setTexture={setTexture} color={color} motion={motion} onClose={() => setSelected(null)} />}
  </div>;
}

createRoot(document.getElementById('root')!).render(<App />);
