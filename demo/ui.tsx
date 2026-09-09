import { useEffect, useRef, useState, type ReactNode } from 'react';

// ANIMATION STORYBOARD — site surfaces, separate from icon performances.
//    0ms: press acknowledges input; opened surface starts at 97% / +8px.
//  160ms: dismiss finishes, focus returns to the opening control.
//  280ms: opened surface settles; content never waits on an entrance.
// 2000ms: successful copy feedback returns to its resting label.
export const TIMING = { dismiss: 160, enter: 280, copied: 2000 };

export function Glyph({ name, size = 18 }: { name: 'arrow' | 'down' | 'copy' | 'check' | 'close' | 'search' | 'replay' | 'sun' | 'moon' | 'code' | 'chevron'; size?: number }) {
  const paths = {
    arrow: 'M5 12h14M13 6l6 6-6 6', down: 'M12 4v12M7 11l5 5 5-5M5 19h14',
    copy: 'M9 9h11v11H9zM15 9V4H4v11h5', check: 'm5 12 4 4L19 6',
    close: 'm6 6 12 12M6 18 18 6', search: 'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
    replay: 'M4 10a8 8 0 1 1 1 7M4 4v6h6',
    sun: 'M12 3V1M12 23v-2M3 12H1M23 12h-2M4 4l2 2M18 18l2 2M4 20l2-2M18 6l2-2M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0',
    moon: 'M20.8 14A9 9 0 0 1 10 3.2 9 9 0 1 0 20.8 14', code: 'm8 6-6 6 6 6M16 6l6 6-6 6m-3-15-2 18', chevron: 'm7 10 5 5 5-5',
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

export function CopyButton({ value, label = 'Copy code', compact = false, onError }: { value: string; label?: string; compact?: boolean; onError: () => void }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => { setCopied(false); clearTimeout(timer.current); }, [value]);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true); clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), TIMING.copied);
    } catch { onError(); }
  }
  return <button type="button" className={`copy-button ${compact ? 'icon-button' : 'button subtle'}`} data-copied={copied} onClick={copy} aria-label={copied ? 'Copied to clipboard' : label}>
    <span className="copy-glyph" key={String(copied)}><Glyph name={copied ? 'check' : 'copy'} size={16} /></span>
    {!compact && <span>{copied ? 'Copied' : label}</span>}
    {compact && <span className="tooltip">{copied ? 'Copied!' : 'Copy'}</span>}
    <span className="sr-only" role="status">{copied ? `${label} copied to clipboard` : ''}</span>
  </button>;
}

export function Modal({ children, titleId, onClose, className = '' }: { children: ReactNode; titleId: string; onClose: () => void; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [closing, setClosing] = useState(false);
  const backdropDown = useRef(false);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const opener = document.activeElement as HTMLElement | null;
    ref.current?.showModal(); document.body.style.overflow = 'hidden';
    return () => { clearTimeout(timer.current); document.body.style.overflow = previousOverflow; opener?.focus({ preventScroll: true }); };
  }, []);
  function close() {
    if (closing) return;
    setClosing(true);
    timer.current = setTimeout(onClose, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : TIMING.dismiss);
  }
  return <dialog ref={ref} aria-labelledby={titleId} className={`modal ${className}`} data-closing={closing} onCancel={event => { event.preventDefault(); close(); }} onPointerDown={event => { backdropDown.current = event.target === event.currentTarget; }} onClick={event => { if (backdropDown.current && event.target === event.currentTarget) close(); }}>
    <button className="icon-button modal-close" onClick={close} aria-label="Close dialog" autoFocus><Glyph name="close" /></button>
    <div className="modal-surface">
      {children}
    </div>
  </dialog>;
}
