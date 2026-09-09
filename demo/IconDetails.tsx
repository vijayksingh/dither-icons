import { useMemo, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { DitherIcon, studies, type Texture } from '../src';
import { labelFor, reactCode, textures } from './model';
import { CopyButton, Glyph, Modal } from './ui';

export function IconDetails({ notice = '', name, texture, setTexture, color, motion, onClose }: { notice?: string; name: string; texture: Texture; setTexture: (texture: Texture) => void; color: string; motion: boolean; onClose: () => void }) {
  const [size, setSize] = useState(48);
  const [format, setFormat] = useState('React');
  const [replay, setReplay] = useState(0);
  const [error, setError] = useState(notice);
  const svg = useMemo(() => renderToStaticMarkup(<DitherIcon name={name} size={size} texture={texture} animate={motion} color={color} />), [name, size, texture, motion, color]);
  const code = format === 'React' ? reactCode(name, size, texture, color, motion) : svg;
  function download() {
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    const link = document.createElement('a');
    link.href = url; link.download = `${name}-${texture}.svg`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <Modal titleId="icon-title" onClose={onClose} className="icon-modal">
    <div className="detail-preview">
      <span className="eyebrow">MADE TO MOVE</span>
      <button className="detail-art di-trigger" disabled={!motion} onClick={() => setReplay(value => value + 1)} aria-label={`Replay ${labelFor(name)}`}>
        <DitherIcon name={name} size={160} texture={texture} animate={motion} replayKey={replay} color={color} />
        <span className="animate-pill"><Glyph name="replay" size={13} />{motion ? 'Replay' : 'Motion off'}</span>
      </button>
      <h2 id="icon-title">{labelFor(name)}</h2>
      <p>{studies[name].caption}</p>
      <div className="detail-facts"><span>24 × 24 viewBox</span><span>{(studies[name].duration / 1000).toFixed(2)}s gesture</span></div>
    </div>
    <div className="detail-code">
      <h3>Make it yours</h3>
      <div className="detail-setting"><span>Texture</span><div className="segmented">{textures.map(value => <button key={value} aria-pressed={value === texture} onClick={() => setTexture(value)}>{value}</button>)}</div></div>
      <div className="detail-setting"><span>Export size</span><div className="segmented">{[24, 32, 48, 64].map(value => <button key={value} aria-label={`${value} pixels`} aria-pressed={value === size} onClick={() => setSize(value)}>{value}</button>)}</div></div>
      <div className="code-block">
        <div className="code-bar"><div className="code-tabs">{['React', 'SVG'].map(value => <button key={value} aria-pressed={format === value} onClick={() => { setFormat(value); setError(''); }}>{value}</button>)}</div><CopyButton value={code} label={`Copy ${format}`} onError={() => setError('Clipboard unavailable. Select and copy the code below.')} /></div>
        <pre tabIndex={0} aria-label={`${format} source`}><code>{code}</code></pre>
      </div>
      <p className="detail-note">{format === 'React' ? <><code>di-trigger</code> makes the whole button respond to hover, focus, and tap.</> : 'Standalone SVG plays on hover. Use React to let a gesture finish after the pointer leaves.'}</p>
      <button className="button download-button" onClick={download}><Glyph name="down" size={16} />Download SVG<small>Transparent background</small></button>
      {error && <p role="alert" className="error-note">{error}</p>}
    </div>
  </Modal>;
}
