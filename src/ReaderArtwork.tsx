import {useId, type ReactNode} from 'react';
import type {Draw} from './ExtendedArtwork';
import {READING_FOCUS_ART, READING_FOCUS_GEOMETRY} from './motions/reading-focus';
import {START_AT_TEXT_ART, START_AT_TEXT_GEOMETRY} from './motions/start-at-text';
import {LISTEN_ART, LISTEN_GEOMETRY} from './motions/listen';
import {READ_ALOUD_ART, READ_ALOUD_GEOMETRY} from './motions/read-aloud';

const line = (d: string, width: number) => <path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>;
const accent = (part: string, children: ReactNode) => <g data-part={part} opacity="0">{children}</g>;
const DETAIL = {responseWidth: .65, contextOpacity: .68, inputWidth: .65};

export function ReaderArtwork({name, draw, texture}: {name: string; draw: Draw; texture: 'dither' | 'solid' | 'outline'}) {
  const id = useId().replace(/:/g, '') + '-reader';
  let contourIndex = 0;
  // Round contours carry the same stable grain as the accepted navigation set.
  // Masks are inside their moving actors so grain travels with the object.
  const ink = (d: string, width: number) => {
    if (texture !== 'dither') return line(d, width);
    const maskId = `${id}-${contourIndex++}`;
    return <><defs><mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><path d={d} fill="none" stroke="white" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/></mask></defs><g mask={`url(#${maskId})`}>{draw('M0 0h24v24H0Z')}</g></>;
  };
  if (name === 'reading-focus') {
    const A = READING_FOCUS_ART, G = READING_FOCUS_GEOMETRY;
    return <>
      {ink(A.stem, G.caseWidth)}{ink(A.shoulder, G.caseWidth)}{ink(A.case, G.caseWidth)}
      <g data-part="reading-crown">{ink(A.crown, G.caseWidth)}</g>
      <g opacity={DETAIL.contextOpacity}>{A.lines.map(d => <g key={d}>{ink(d, G.textWidth)}</g>)}</g>
      <g data-part="reading-window">{ink(A.brackets, G.bracketWidth)}</g>
      {accent('reading-line-response', line(A.underline, DETAIL.responseWidth))}
      {accent('reading-rim-response', line(A.rim, DETAIL.responseWidth))}
    </>;
  }
  if (name === 'start-at-text') {
    const A = START_AT_TEXT_ART, G = START_AT_TEXT_GEOMETRY;
    return <>
      <g opacity={DETAIL.contextOpacity}>{ink(A.context, G.textWidth)}</g>
      {A.words.map(d => <g key={d}>{ink(d, G.textWidth)}</g>)}
      <g data-part="start-caret">{ink(A.caret, G.caretWidth)}</g>
      {accent('start-word-line', line(A.underline, DETAIL.responseWidth))}
      {accent('start-registration', line(A.register, DETAIL.responseWidth))}
    </>;
  }
  if (name === 'listen') {
    const A = LISTEN_ART, G = LISTEN_GEOMETRY;
    return <>
      {ink(A.page, G.pageWidth)}
      <g opacity={DETAIL.contextOpacity}>{ink(A.context, G.textWidth)}{A.words.map(d => <g key={d}>{ink(d, G.textWidth)}</g>)}</g>
      {G.words.map((word, i) => <g key={word.x}>{accent(`listen-word-${i}`, line(`M${word.x} 12.65h${word.width}`, DETAIL.responseWidth))}</g>)}
      <g data-part="listen-near">{ink(A.near, G.waveWidth)}</g>
      <g data-part="listen-far">{ink(A.far, G.waveWidth)}</g>
      {accent('listen-front', line(A.front, DETAIL.responseWidth))}
    </>;
  }
  if (name === 'read-aloud') {
    const A = READ_ALOUD_ART, G = READ_ALOUD_GEOMETRY;
    return <>
      {ink(A.capsule, G.micWidth)}{ink(A.cradle, G.micWidth)}
      {line(A.grille, DETAIL.responseWidth)}
      <g transform={`translate(${G.micX} 0) scale(${G.diaphragmRest} 1) translate(${-G.micX} 0)`}>
        <g data-part="aloud-diaphragm">{line(A.diaphragm, DETAIL.responseWidth)}</g>
      </g>
      <g opacity={DETAIL.contextOpacity}>{ink(A.context, G.textWidth)}</g>
      {A.words.map(d => <g key={d}>{ink(d, G.textWidth)}</g>)}
      {G.words.map((word, i) => <g key={word.x}>{accent(`aloud-phrase-${i}`, line(`M${word.x} 14.7h${word.width}`, DETAIL.responseWidth))}</g>)}
      {accent('aloud-input', <>{A.input.map(d => <g key={d}>{line(d, DETAIL.inputWidth)}</g>)}</>)}
      {accent('aloud-registration', line(A.registration, DETAIL.responseWidth))}
    </>;
  }
  return null;
}
