import { useState } from 'react';
import { DitherIcon, definitions, type Texture } from '../../src';
import { componentName, labelFor } from '../model';
import { agentPrompt } from '../content/agent';
import { Link } from '../routing';
import { useSite } from '../settings';
import { CopyButton, Glyph } from '../ui';

const intents = [{ name: 'save-preferences', action: 'Save preferences' }, { name: 'download', action: 'Download file' }, { name: 'file-explorer', action: 'Toggle file explorer' }, { name: 'sign-out', action: 'Sign out' }];
export default function AIPage() {
  const { motion } = useSite();
  const [name, setName] = useState('save-preferences');
  const [texture, setTexture] = useState<Texture>('dither');
  const [size, setSize] = useState(48);
  const [error, setError] = useState('');
  const prompt = agentPrompt(name, texture, size, location.origin);
  return <div className="ai-page">
    <section className="ai-hero"><div className="ai-emblem"><span><Glyph name="code" size={25} /></span><span><DitherIcon name="sparkles" size={35} animate={false} /></span></div><h1 data-page-heading tabIndex={-1}>Icon docs<br />{' '}<span>for coding agents.</span></h1><p>Export names, React examples, and visual references.<br />{' '}Download the docs or copy instructions for a specific icon.</p><div className="hero-actions"><a href="/AI.md" download className="button primary"><Glyph name="down" size={16} />Download AI.md</a><a href="#agent-composer" className="button subtle">Create instructions<Glyph name="arrow" size={16} /></a></div><p className="ai-compatibility">Markdown and JSON files you can keep in your project.</p></section>
    <section id="agent-composer" className="agent-composer-section"><div className="section-title-row"><div><h2>Create icon instructions</h2></div></div>
      <div className="agent-composer"><div className="agent-intent"><span className="composer-step">01<span>Choose an icon</span></span><h3>Which action needs an icon?</h3><label className="agent-select"><span className="sr-only">Interface action</span><select aria-label="Interface action" value={name} onChange={event => { setName(event.target.value); setError(''); }}>{intents.map(intent => <option value={intent.name} key={intent.name}>{intent.action}</option>)}</select><Glyph name="chevron" size={16} /></label><div className="agent-options"><label>Material<select aria-label="Agent icon material" value={texture} onChange={event => setTexture(event.target.value as Texture)}>{['dither', 'solid', 'outline'].map(value => <option key={value}>{value}</option>)}</select></label><label>Size<select aria-label="Agent icon size" value={size} onChange={event => setSize(Number(event.target.value))}>{[24, 32, 48, 64].map(value => <option key={value} value={value}>{value}px</option>)}</select></label></div><p>Copy instructions with the selected export, size, material, button label, and motion settings.</p><CopyButton value={prompt} label="Copy instructions" onError={() => setError('Clipboard unavailable. Open the instructions below and select the text.')} />{error && <p role="alert" className="inline-notice">{error}</p>}</div>
      <div className="agent-result"><span className="composer-step">02<span>Preview</span></span><div className="agent-result-stage"><button key={name} className="agent-example-button di-trigger"><DitherIcon name={name} size={size} texture={texture} animate={motion} /><span>{labelFor(name)}</span></button></div><div className="agent-export"><Glyph name="code" size={16} /><code>{componentName(name)}</code><Link href={`/icons/${name}`} aria-label={`Open ${labelFor(name)} icon page`}><Glyph name="arrow" size={16} /></Link></div><div className="agent-contract-chips"><span><Glyph name="check" size={12} />Button label</span><span><Glyph name="check" size={12} />Icon animation</span><span><Glyph name="check" size={12} />Reduced motion</span></div></div></div>
      <details className="agent-instructions"><summary>Read the generated instructions<Glyph name="chevron" size={16} /></summary><pre tabIndex={0}>{prompt}</pre></details>
    </section>
    <section className="agent-resources"><div className="section-title-row"><div><h2>Download the docs</h2></div></div><div className="resource-grid">{[
      { href: '/llms.txt', title: 'Documentation index', file: 'llms.txt', text: 'A short index of the library, guides, and visual references.' },
      { href: '/llms-full.txt', title: 'Complete guide', file: 'llms-full.txt', text: 'The integration contract, API, examples, and all icon exports.' },
      { href: '/icons.json', title: 'Icon manifest', file: 'icons.json', text: `${definitions.length} valid names, component exports, semantic keywords, and motion metadata.` },
    ].map(resource => <a className="resource-card" key={resource.href} href={resource.href} download><span className="resource-file"><Glyph name="code" size={17} /><code>{resource.file}</code><Glyph name="down" size={15} /></span><h3>{resource.title}</h3><p>{resource.text}</p></a>)}</div><div className="agent-portability"><span className="note-mark">i</span><p>Add <a href="/AI.md" download>AI.md</a> and <a href="/icons.json" download>icons.json</a> to your project and ask your agent to read them before adding icons.</p></div></section>
    <section className="agent-visuals"><div className="section-title-row"><div><h2>Visual references</h2></div></div><div className="visual-reference-grid"><a href="/reference/textures.svg" target="_blank" rel="noreferrer"><div><img src="/reference/textures.svg" alt="Download in dither, solid and outline material" width="900" height="310" loading="lazy" /></div><span><strong>Material comparison</strong><small>Dither, solid, and outline at the same size.</small><Glyph name="arrow" size={16} /></span></a><a href="/reference/icons.svg" target="_blank" rel="noreferrer"><div><img src="/reference/icons.svg" alt={`Contact sheet of all ${definitions.length} original Dither Icons`} width="1200" height={Math.ceil(definitions.length / 8) * 148 + 94} loading="lazy" /></div><span><strong>All icons</strong><small>Each icon labeled with its React export.</small><Glyph name="arrow" size={16} /></span></a></div></section>
    <div className="ai-closing"><p>Need the component props and playback options?</p><Link href="/docs/react">Read the React API<Glyph name="arrow" size={16} /></Link></div>
  </div>;
}
