import { useState } from 'react';
import { DitherIcon } from '../src';
import { filterIcons, labelFor } from './model';
import { docs, docLabel, docPath } from './content/docs';
import { Link } from './routing';
import { Glyph, Modal } from './ui';
export default function SearchDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const words = query.trim().toLowerCase().split(/\s+/);
  const pages = [...docs.map(doc => ({ title: docLabel(doc), href: docPath(doc.slug), description: doc.description })), { title: 'For AI agents', href: '/ai', description: 'Agent guide, llms.txt, manifest, prompts and visual references' }, { title: 'Motion studio', href: '/motion', description: 'Replay, inspect, and compare individual icon gestures' }].filter(page => words.every(word => `${page.title} ${page.description}`.toLowerCase().includes(word))).slice(0, 4);
  const icons = filterIcons(query, 'All icons').slice(0, 7);
  return <Modal titleId="search-title" onClose={onClose} className="search-modal" autoFocusClose={false}>
    <h2 id="search-title" className="sr-only">Search the library</h2>
    <div className="command-search-input"><Glyph name="search" size={20} /><input data-dialog-autofocus aria-label="Search pages and icons" placeholder="Find an icon, guide, or action…" value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => { if (event.key === 'ArrowDown') { event.preventDefault(); document.querySelector<HTMLElement>('.command-results a')?.focus(); } }} /></div>
    <div className="command-results" onKeyDown={event => {
      const links = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>('a'));
      const index = links.indexOf(document.activeElement as HTMLAnchorElement);
      if (event.key === 'ArrowDown') { event.preventDefault(); links[(index + 1) % links.length]?.focus(); }
      if (event.key === 'ArrowUp') { event.preventDefault(); if (index <= 0) document.querySelector<HTMLInputElement>('.command-search-input input')?.focus(); else links[index - 1]?.focus(); }
    }}>
      {icons.length > 0 && <div className="command-group"><span>Icons</span>{icons.map(icon => <Link onClick={onClose} href={`/icons/${icon.name}`} key={icon.name}><DitherIcon name={icon.name} size={25} texture="solid" animate={false} /><span>{labelFor(icon.name)}<small>{icon.category}</small></span><Glyph name="arrow" size={15} /></Link>)}</div>}
      {pages.length > 0 && <div className="command-group"><span>Guides & pages</span>{pages.map(page => <Link onClick={onClose} href={page.href} key={page.href}><Glyph name="code" size={21} /><span>{page.title}</span><Glyph name="arrow" size={15} /></Link>)}</div>}
      {pages.length === 0 && icons.length === 0 && <p className="command-empty">Nothing for “{query}”. Try an action like save, or a guide like React.</p>}
    </div><div className="command-footer"><span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span><span><kbd>↵</kbd> to open</span><span><kbd>esc</kbd> to close</span></div>
  </Modal>;
}
