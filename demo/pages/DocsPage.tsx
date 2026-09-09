import { useState } from 'react';
import { DitherIcon } from '../../src';
import { docs, docLabel, docPath, type Block } from '../content/docs';
import { Link } from '../routing';
import { useSite } from '../settings';
import { CodeBlock, DirectoryLayout, NextGuide, PageHeading } from '../PageParts';
import { Glyph } from '../ui';
import { packageUrl } from '../model';

function LiveExample({ kind }: { kind: 'textures' | 'button' | 'replay' }) {
  const { motion } = useSite();
  const [replay, setReplay] = useState(0);
  return <div className="guide-live-example"><span className="example-label"><i />Live example</span><button className="example-action di-trigger" onClick={() => setReplay(value => value + 1)}><DitherIcon name={kind === 'replay' ? 'sparkles' : 'download'} size={36} replayKey={replay} animate={motion} /><span>{kind === 'replay' ? 'Replay the gesture' : 'Preview download'}</span></button><small>Try hover, keyboard focus, or a tap.</small></div>;
}
function DocBlock({ block }: { block: Block }) {
  switch (block.type) {
    case 'text': return <p>{block.text}</p>;
    case 'note': return <aside className="guide-note"><span className="note-mark">i</span><p>{block.text}</p></aside>;
    case 'code': return <CodeBlock value={block.value} title={block.title} language={block.language} />;
    case 'list': return <ul className="guide-list">{block.items.map(item => <li key={item}>{item}</li>)}</ul>;
    case 'table': return <div className="guide-table-wrap" tabIndex={0} aria-label="Scrollable reference table"><table><thead><tr>{block.columns.map(column => <th key={column}>{column}</th>)}</tr></thead><tbody>{block.rows.map(row => <tr key={row[0]}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody></table></div>;
    case 'image': return <figure className="guide-figure"><img src={block.src} alt={block.alt} loading="lazy" width="900" height="310" /><figcaption>{block.caption}</figcaption></figure>;
    case 'demo': return <LiveExample kind={block.kind} />;
  }
}
export default function DocsPage({ slug }: { slug: string }) {
  const doc = docs.find(item => item.slug === slug)!;
  const index = docs.indexOf(doc);
  const next = docs[index + 1];
  return <DirectoryLayout>
    <PageHeading eyebrow={<><Link href="/docs">Documentation</Link><span>/</span>{docLabel(doc)}</>} title={doc.title} description={doc.description} />
    <div className="doc-reading-layout"><article className="guide-article">
      {slug === 'installation' && <a href={packageUrl} download className="button primary guide-download"><Glyph name="down" size={16} />Download React package</a>}
      {doc.sections.map(section => <section key={section.id} id={section.id}><h2><a href={`#${section.id}`}>{section.title}<span aria-hidden="true">#</span></a></h2>{section.blocks.map((block, i) => <DocBlock key={i} block={block} />)}</section>)}
      <div className="guide-source-link"><a href={`/docs/${slug || 'introduction'}.md`} download><Glyph name="code" size={15} />Take this page as Markdown<Glyph name="down" size={14} /></a></div>
      <NextGuide href={next ? docPath(next.slug) : '/ai'} label={next ? docLabel(next) : 'For AI agents'} />
    </article><aside className="page-toc" aria-label="On this page"><span>On this page</span>{doc.sections.map(section => <a href={`#${section.id}`} key={section.id}>{section.title.replace(/^\d+\. /, '')}</a>)}<a href="/llms-full.txt" className="toc-agent">Read with your agent<Glyph name="arrow" size={12} /></a></aside></div>
  </DirectoryLayout>;
}
