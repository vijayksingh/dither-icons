import { useMemo, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { DitherIcon, studies } from '../../src';
import { collection, labelFor, reactCode } from '../model';
import { Link } from '../routing';
import { useSite } from '../settings';
import { CodeBlock, DirectoryLayout, MaterialControls, PageHeading } from '../PageParts';
import { CopyButton, Glyph } from '../ui';

export default function IconPage({ name }: { name: string }) {
  const { texture, color, motion } = useSite();
  const [tab, setTab] = useState('Preview');
  const [size, setSize] = useState(48);
  const [actualSize, setActualSize] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState<number | undefined>();
  const [replay, setReplay] = useState(0);
  const [notice, setNotice] = useState('');
  const icon = collection.find(item => item.name === name)!;
  const study = studies[name];
  const index = collection.indexOf(icon);
  const previous = collection[(index - 1 + collection.length) % collection.length];
  const next = collection[(index + 1) % collection.length];
  const code = reactCode(name, size, texture, color, motion);
  const svg = useMemo(() => renderToStaticMarkup(<DitherIcon name={name} size={size} texture={texture} animate={motion} color={color} />), [name, size, texture, motion, color]);
  function download() {
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = `${name}-${texture}.svg`; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <DirectoryLayout icons>
    <PageHeading eyebrow={<><Link href="/#collection">Icons</Link><span>/</span>{icon.category}</>} title={labelFor(name)} description={study.caption}>
      <div className="page-pagination"><Link href={`/icons/${previous.name}`} className="icon-button previous-icon" aria-label={`Previous icon: ${labelFor(previous.name)}`}><Glyph name="arrow" /></Link><Link href={`/icons/${next.name}`} className="icon-button" aria-label={`Next icon: ${labelFor(next.name)}`}><Glyph name="arrow" /></Link></div>
    </PageHeading>
    <div className="workbench-heading"><div className="segmented workbench-tabs" role="tablist" aria-label="Icon view">{['Preview', 'React', 'SVG'].map(value => <button key={value} role="tab" id={`view-${value}`} aria-controls="icon-view" aria-selected={tab === value} tabIndex={tab === value ? 0 : -1} onClick={() => setTab(value)} onKeyDown={event => {
      const tabs = ['Preview', 'React', 'SVG']; let nextTab = -1;
      if (event.key === 'ArrowRight') nextTab = (tabs.indexOf(tab) + 1) % tabs.length;
      if (event.key === 'ArrowLeft') nextTab = (tabs.indexOf(tab) + 2) % tabs.length;
      if (event.key === 'Home') nextTab = 0; if (event.key === 'End') nextTab = 2;
      if (nextTab >= 0) { event.preventDefault(); setTab(tabs[nextTab]); document.getElementById(`view-${tabs[nextTab]}`)?.focus(); }
    }}>{value}</button>)}</div><CopyButton value={`${location.origin}/icons/${name}`} label="Copy link" onError={() => setNotice(`Copy this link: ${location.origin}/icons/${name}`)} /></div>
    <div id="icon-view" role="tabpanel" aria-labelledby={`view-${tab}`} className="icon-workbench">
      {tab === 'Preview' ? <div className="workbench-preview">
        <div className="preview-topline"><span><i />{texture} / {actualSize ? `${size}px` : 'enlarged preview'}</span><button aria-pressed={actualSize} onClick={() => setActualSize(value => !value)}>{actualSize ? 'Enlarge preview' : 'Actual size'}</button></div>
        <button className="workbench-art di-trigger" aria-label={`Replay ${labelFor(name)} animation`} disabled={!motion} onClick={() => { setProgress(undefined); setReplay(value => value + 1); }}>
          <DitherIcon name={name} size={actualSize ? size : 164} texture={texture} animate={motion} speed={speed} progress={progress} replayKey={replay} />
          <span className="animate-pill"><Glyph name="replay" size={13} />{motion ? 'Animate' : 'Motion off'}</span>
        </button>
        <div className="preview-bottomline"><span>Hover, focus, or tap</span><span>Original geometry · 24 × 24</span></div>
      </div> : <CodeBlock value={tab === 'React' ? code : svg} title={tab === 'React' ? `${labelFor(name).replaceAll(' ', '')}.tsx` : `${name}.svg`} language={tab === 'React' ? 'tsx' : 'svg'} className="workbench-code" />}
    </div>
    <div className="workbench-settings"><MaterialControls /><div className="export-settings"><label>Export size<select aria-label="Export size" value={size} onChange={event => setSize(Number(event.target.value))}>{[24, 32, 48, 64, 96].map(value => <option key={value} value={value}>{value}px</option>)}</select></label><button className="button primary" onClick={download}><Glyph name="down" size={16} />Download SVG</button></div></div>
    {notice && <p role="status" className="inline-notice">{notice}</p>}
    <div className="icon-context-note"><Glyph name="code" size={17} /><span>{tab === 'SVG' ? 'Keep the complete SVG, including its styles and internal definitions.' : 'Use the named React component, or take a standalone SVG.'} <Link href="/docs/installation">Installation guide<Glyph name="arrow" size={12} /></Link></span></div>
    <section className="gesture-section" aria-labelledby="gesture-title">
      <div className="gesture-heading"><div><span className="eyebrow">THE LITTLE DETAILS</span><h2 id="gesture-title">Inside the gesture.</h2></div><span className="duration-tag">{(study.duration / 1000).toFixed(2)}s</span></div>
      <div className="gesture-beats">{study.stages.map((stage, i) => <div key={stage}><span>{String(i + 1).padStart(2, '0')}</span><strong>{stage}</strong></div>)}</div>
      <div className="gesture-controls"><button className="button subtle" aria-pressed={progress !== undefined} disabled={!motion} onClick={() => { setTab('Preview'); setProgress(value => value === undefined ? 0 : undefined); }}><Glyph name="search" size={14} />Inspect timing</button><label><span className="sr-only">Playback speed</span><select aria-label="Playback speed" value={speed} onChange={event => setSpeed(Number(event.target.value))}><option value={1}>Actual speed</option><option value={0.5}>Half speed</option></select></label><span>A complete gesture. An exact return.</span></div>
      {progress !== undefined && <div className="frame-scrubber"><span>Rest</span><input aria-label="Animation frame" type="range" min="0" max="100" value={Math.round(progress * 100)} disabled={!motion} onChange={event => setProgress(Number(event.target.value) / 100)} /><span>Settle</span><output>{Math.round(progress * 100)}%</output></div>}
      <p className="quiet-note">Reduced motion is respected automatically. React lets a gesture finish after you leave; standalone CSS hover ends with hover.</p>
    </section>
    <section className="related-section"><div className="section-title-row"><h2>In good company.</h2><Link href="/#collection">All {collection.length} icons<Glyph name="arrow" size={14} /></Link></div><div className="related-icons">{collection.filter(item => item.category === icon.category && item.name !== name).slice(0, 3).map(item => <Link href={`/icons/${item.name}`} key={item.name} className="related-icon di-trigger"><DitherIcon name={item.name} size={42} texture={texture} animate={motion} /><span>{labelFor(item.name)}</span><Glyph name="arrow" size={14} /></Link>)}</div></section>
  </DirectoryLayout>;
}
