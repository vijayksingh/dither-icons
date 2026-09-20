import {useId, type ReactNode} from 'react';
import type {Draw} from './ExtendedArtwork';
import {SIMPLIFY_ART} from './motions/simplify';
import {TIGHTEN_ART} from './motions/tighten';
import {VIVID_ART} from './motions/vivid';
import {TRANSFORM_SCOPE_ART, TRANSFORM_SCOPE_CORNERS, TRANSFORM_SCOPE_OPACITY} from './motions/transform-scope';
import {READER_STYLE as INK} from './motions/reader-style';
import {READER_CONTROLS_STYLE as CONTROL} from './motions/reader-controls-style';

const line = (d: string, width: number) => <path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>;
const accent = (part: string, children: ReactNode) => <g data-part={part} opacity="0">{children}</g>;

export function SelectionArtwork({name, draw, texture}: {name: string; draw: Draw; texture: 'dither' | 'solid' | 'outline'}) {
  const id = useId().replace(/:/g, '') + '-selection';
  let maskIndex = 0;
  const contourWidth = (width: number) => texture === 'solid' ? CONTROL.solidContour : width;
  // Outline cores are knocked out from the same contour used by React and SVG exports.
  const ink = (d: string, width: number, role: 'contour' | 'text' = 'contour') => {
    if (role === 'text') width = texture === 'outline' ? CONTROL.outlineText : CONTROL.text;
    else width = contourWidth(width);
    if (texture === 'solid') return line(d, width);
    const maskId = `${id}-${maskIndex++}`;
    if (texture === 'outline') {
      const core = Math.max(.2, width - 2 * CONTROL.outlineEdge);
      return <>
        <defs><mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          <rect width="24" height="24" fill="white"/>
          <path d={d} fill="none" stroke="black" strokeWidth={core} strokeLinecap="round" strokeLinejoin="round"/>
        </mask></defs>
        <g mask={`url(#${maskId})`}>{line(d, width)}</g>
      </>;
    }
    return <>
      <defs><mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <path d={d} fill="none" stroke="white" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>
      </mask></defs>
      <g mask={`url(#${maskId})`}>{draw('M0 0h24v24H0Z')}</g>
    </>;
  };
  const detail = (d: string) => line(d, texture === 'outline' ? CONTROL.outlineResponse : CONTROL.response);

  if (name === 'simplify') {
    const A = SIMPLIFY_ART;
    return <>
      <g data-part="simplify-branch-upper">
        {A.upper.map((d, i) => <g key={d}>{ink(d, i === 0 ? CONTROL.contour : INK.text, i === 0 ? 'contour' : 'text')}</g>)}
      </g>
      <g data-part="simplify-branch-lower">
        {A.lower.map((d, i) => <g key={d}>{ink(d, i === 0 ? CONTROL.contour : INK.text, i === 0 ? 'contour' : 'text')}</g>)}
      </g>
      <g data-part="simplify-spine">
        {ink(A.spine, CONTROL.contour)}
        {A.main.map(d => <g key={d}>{ink(d, INK.text, 'text')}</g>)}
      </g>
    </>;
  }
  if (name === 'tighten') {
    const A = TIGHTEN_ART;
    return <>
      <g data-part="tighten-bound-left">{ink(A.bounds[0], CONTROL.contour)}</g>
      <g data-part="tighten-bound-right">{ink(A.bounds[1], CONTROL.contour)}</g>
      {A.words.map((d, i) => <g key={d} data-part={`tighten-word-${i}`}>{ink(d, INK.text, 'text')}</g>)}
    </>;
  }
  if (name === 'vivid') {
    const A = VIVID_ART;
    return <>
      <g data-part="vivid-context">{A.context.map(d => <g key={d}>{ink(d, INK.text, 'text')}</g>)}</g>
      <g data-part="vivid-focus-word">{ink(A.focus, INK.text, 'text')}</g>
      {accent('vivid-ink-accent', detail(A.accent))}
    </>;
  }
  if (name === 'transform-scope') {
    const A = TRANSFORM_SCOPE_ART;
    return <>
      <g data-part="scope-page">
        {ink(A.page, CONTROL.contour)}{ink(A.fold, CONTROL.contour)}
        {A.content.map(d => <g key={d}>{ink(d, INK.text, 'text')}</g>)}
      </g>
      <g data-part="scope-lens" opacity={TRANSFORM_SCOPE_OPACITY.lens}>
        {A.selection.map((d, i) => <g key={d} data-part={`scope-corner-${TRANSFORM_SCOPE_CORNERS[i].key}`}>{ink(d, CONTROL.contour)}</g>)}
      </g>
    </>;
  }
  return null;
}
