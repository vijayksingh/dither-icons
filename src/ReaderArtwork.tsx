import {useId, type ReactNode} from 'react';
import type {Draw} from './ExtendedArtwork';
import {READING_FOCUS_ART, READING_FOCUS_GEOMETRY} from './motions/reading-focus';
import {START_AT_TEXT_ART, START_AT_TEXT_GEOMETRY} from './motions/start-at-text';
import {LISTEN_ART, LISTEN_GEOMETRY} from './motions/listen';
import {READ_ALOUD_ART, READ_ALOUD_GEOMETRY} from './motions/read-aloud';
import {DRAG_HANDLE_ART, DRAG_HANDLE_GEOMETRY} from './motions/drag-handle';
import {SKIP_BLOCK_ART, SKIP_BLOCK_GEOMETRY} from './motions/skip-block';
import {COLLAPSE_RAIL_ART, COLLAPSE_RAIL_GEOMETRY} from './motions/collapse-rail';
import {HEADPHONES_ART, HEADPHONES_GEOMETRY} from './motions/headphones';
import {READER_STYLE as INK, READER_OUTLINE as OUTLINE} from './motions/reader-style';
import {READER_CONTROLS_STYLE as CONTROL} from './motions/reader-controls-style';

const line = (d: string, width: number) => <path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>;
const accent = (part: string, children: ReactNode) => <g data-part={part} opacity="0">{children}</g>;

export function ReaderArtwork({name, draw, texture}: {name: string; draw: Draw; texture: 'dither' | 'solid' | 'outline'}) {
  const id = useId().replace(/:/g, '') + '-reader';
  const controls = ['drag-handle', 'skip-block', 'collapse-rail', 'headphones'].includes(name);
  const contourWidth = (width: number) => controls && texture === 'solid' ? CONTROL.solidContour : width;
  let contourIndex = 0;
  // Both grain and transparent outline cores share their actor's coordinate frame.
  // The outline core is a real knockout, never a background-colored overpaint.
  const ink = (d: string, width: number, role: 'contour' | 'text' = 'contour') => {
    if (controls) width = role === 'text' ? CONTROL.text : contourWidth(width);
    if (texture === 'solid') return line(d, width);
    if (texture === 'outline' && role === 'text') return line(d, controls ? CONTROL.outlineText : OUTLINE.text);
    const maskId = `${id}-${contourIndex++}`;
    if (texture === 'outline') return <>
      <defs><mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill="white"/>
        <path d={d} fill="none" stroke="black" strokeWidth={width - 2 * (controls ? CONTROL.outlineEdge : OUTLINE.edge)} strokeLinecap="round" strokeLinejoin="round"/>
      </mask></defs>
      <g mask={`url(#${maskId})`}>{line(d, width)}</g>
    </>;
    return <><defs><mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><path d={d} fill="none" stroke="white" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/></mask></defs><g mask={`url(#${maskId})`}>{draw('M0 0h24v24H0Z')}</g></>;
  };
  const detail = (d: string) => line(d, controls ? (texture === 'outline' ? CONTROL.outlineResponse : CONTROL.response) : (texture === 'outline' ? OUTLINE.response : INK.response));
  if (name === 'drag-handle') {
    const A = DRAG_HANDLE_ART, G = DRAG_HANDLE_GEOMETRY;
    const referenceMaskId = `${id}-drag-reference-mask`;
    return <>
      <defs><mask id={referenceMaskId} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill="white"/>
        <g data-part="drag-grip-cut"><path d={A.grip} fill="black" stroke="black" strokeWidth={contourWidth(G.contour)} strokeLinejoin="round"/></g>
      </mask></defs>
      <g opacity={CONTROL.referenceOpacity} mask={`url(#${referenceMaskId})`}>{detail(A.registration)}</g>
      {accent('drag-contact', <ellipse cx={G.shadowX} cy={G.shadowY} rx={G.shadowRadiusX} ry={G.shadowRadiusY}/>)}
      <g data-part="drag-grip">
        {ink(A.grip, G.contour)}
        <g opacity={INK.contextOpacity}>{A.ribs.map(d => <g key={d}>{ink(d, INK.text, 'text')}</g>)}</g>
        {accent('drag-grasp', detail(A.grasp))}
      </g>
    </>;
  }
  if (name === 'skip-block') {
    const A = SKIP_BLOCK_ART, G = SKIP_BLOCK_GEOMETRY;
    return <>
      <g opacity={INK.contextOpacity}>{ink(A.current, INK.text, 'text')}{ink(A.next, INK.text, 'text')}</g>
      {texture === 'dither' ? draw(A.bypass) : <path d={A.bypass} fill={texture === 'outline' ? 'none' : 'currentColor'} stroke={texture === 'outline' ? 'currentColor' : 'none'} strokeWidth={CONTROL.outlineEdge} strokeLinejoin="round"/>}
      <g data-part="skip-marker">{ink(A.marker, G.contour)}</g>
      {accent('skip-next-line', detail(A.response))}
    </>;
  }
  if (name === 'collapse-rail') {
    const A = COLLAPSE_RAIL_ART, G = COLLAPSE_RAIL_GEOMETRY;
    const clipId = `${id}-rail-clip`;
    const capMaskId = `${id}-rail-cap-mask`;
    return <>
      <g opacity={INK.contextOpacity}>{A.lines.map(d => <g key={d}>{ink(d, INK.text, 'text')}</g>)}</g>
      <defs>
        <clipPath id={clipId} clipPathUnits="userSpaceOnUse"><rect {...G.clip}/></clipPath>
        <mask id={capMaskId} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          <rect width="24" height="24" fill="white"/>
          <path d={A.cap} fill="black" stroke="black" strokeWidth={contourWidth(G.contour)} strokeLinejoin="round"/>
        </mask>
      </defs>
      <g mask={`url(#${capMaskId})`}><g clipPath={`url(#${clipId})`}><g data-part="rail-body">
        {ink(A.body, G.contour)}
        {A.controls.map(d => <g key={d}>{detail(d)}</g>)}
      </g></g></g>
      {ink(A.cap, G.contour)}
      <g data-part="rail-chevron">{detail(A.chevron)}</g>
      {accent('rail-seam', detail(A.seam))}
    </>;
  }
  if (name === 'headphones') {
    const A = HEADPHONES_ART, G = HEADPHONES_GEOMETRY;
    const archMaskId = `${id}-headphones-arch-mask`;
    return <>
      <defs><mask id={archMaskId} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill="white"/>
        {G.cups.map((cup, i) => <g key={cup.side} data-part={`headphones-${cup.side}-cut`}>
          <path d={i === 0 ? A.left : A.right} fill="black" stroke="black" strokeWidth={contourWidth(G.contour)} strokeLinejoin="round"/>
        </g>)}
      </mask></defs>
      <g mask={`url(#${archMaskId})`}>{ink(A.arch, G.contour)}</g>
      {G.cups.map((cup, i) => <g key={cup.side} data-part={`headphones-${cup.side}-cup`}>
        {ink(i === 0 ? A.left : A.right, G.contour)}
        <g data-part={`headphones-${cup.side}-driver`}>{detail(A.drivers[i])}</g>
        {accent(`headphones-${cup.side}-response`, detail(A.cushions[i]))}
      </g>)}
    </>;
  }
  if (name === 'reading-focus') {
    const A = READING_FOCUS_ART, G = READING_FOCUS_GEOMETRY;
    return <>
      {ink(A.stem, G.caseWidth)}{ink(A.case, G.caseWidth)}
      <g data-part="reading-crown">{ink(A.crown, G.caseWidth)}</g>
      <g opacity={INK.contextOpacity}>{A.lines.map(d => <g key={d}>{ink(d, G.textWidth, 'text')}</g>)}</g>
      <g data-part="reading-marker">{ink(A.marker, G.markerWidth)}</g>
      {accent('reading-line-response', detail(A.underline))}
    </>;
  }
  if (name === 'start-at-text') {
    const A = START_AT_TEXT_ART, G = START_AT_TEXT_GEOMETRY;
    return <>
      <g opacity={INK.contextOpacity}>{ink(A.context, G.textWidth, 'text')}</g>
      {A.words.map(d => <g key={d}>{ink(d, G.textWidth, 'text')}</g>)}
      <g data-part="start-caret">{ink(A.caret, G.caretWidth)}</g>
      {accent('start-word-line', detail(A.underline))}
    </>;
  }
  if (name === 'listen') {
    const A = LISTEN_ART, G = LISTEN_GEOMETRY;
    return <>
      {ink(A.page, G.pageWidth)}
      <g opacity={INK.contextOpacity}>{ink(A.context, G.textWidth, 'text')}{ink(A.source, G.textWidth, 'text')}</g>
      {accent('listen-source', detail(A.underline))}
      <g data-part="listen-near">{ink(A.near, G.waveWidth)}</g>
      <g data-part="listen-far">{ink(A.far, G.waveWidth)}</g>
    </>;
  }
  if (name === 'read-aloud') {
    const A = READ_ALOUD_ART, G = READ_ALOUD_GEOMETRY;
    return <>
      {ink(A.capsule, G.micWidth)}{ink(A.cradle, G.micWidth)}
      <g transform={`translate(${G.micX} 0) scale(${G.diaphragmRest} 1) translate(${-G.micX} 0)`}>
        <g data-part="aloud-diaphragm">{detail(A.diaphragm)}</g>
      </g>
      <g opacity={INK.contextOpacity}>{ink(A.context, G.textWidth, 'text')}</g>
      {A.words.map(d => <g key={d}>{ink(d, G.textWidth, 'text')}</g>)}
      {G.words.map((word, i) => <g key={word.x}>{accent(`aloud-phrase-${i}`, detail(`M${word.x} ${G.responseY}h${word.width}`))}</g>)}
      {accent('aloud-input', <>{A.input.map(d => <g key={d}>{detail(d)}</g>)}</>)}
    </>;
  }
  return null;
}
