import {useId, type ReactNode} from 'react';
import type {Draw} from './ExtendedArtwork';
import {READING_FOCUS_ART, READING_FOCUS_GEOMETRY} from './motions/reading-focus';
import {START_AT_TEXT_ART, START_AT_TEXT_GEOMETRY} from './motions/start-at-text';
import {LISTEN_ART, LISTEN_GEOMETRY} from './motions/listen';
import {READ_ALOUD_ART, READ_ALOUD_GEOMETRY} from './motions/read-aloud';
import {READER_STYLE as INK, READER_OUTLINE as OUTLINE} from './motions/reader-style';

const line = (d: string, width: number) => <path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>;
const accent = (part: string, children: ReactNode) => <g data-part={part} opacity="0">{children}</g>;

export function ReaderArtwork({name, draw, texture}: {name: string; draw: Draw; texture: 'dither' | 'solid' | 'outline'}) {
  const id = useId().replace(/:/g, '') + '-reader';
  let contourIndex = 0;
  // Both grain and transparent outline cores share their actor's coordinate frame.
  // The outline core is a real knockout, never a background-colored overpaint.
  const ink = (d: string, width: number, role: 'contour' | 'text' = 'contour') => {
    if (texture === 'solid') return line(d, width);
    if (texture === 'outline' && role === 'text') return line(d, OUTLINE.text);
    const maskId = `${id}-${contourIndex++}`;
    if (texture === 'outline') return <>
      <defs><mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill="white"/>
        <path d={d} fill="none" stroke="black" strokeWidth={width - 2 * OUTLINE.edge} strokeLinecap="round" strokeLinejoin="round"/>
      </mask></defs>
      <g mask={`url(#${maskId})`}>{line(d, width)}</g>
    </>;
    return <><defs><mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><path d={d} fill="none" stroke="white" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/></mask></defs><g mask={`url(#${maskId})`}>{draw('M0 0h24v24H0Z')}</g></>;
  };
  const detail = (d: string) => line(d, texture === 'outline' ? OUTLINE.response : INK.response);
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
