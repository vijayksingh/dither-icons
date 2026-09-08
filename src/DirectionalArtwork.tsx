import type {Draw} from './ExtendedArtwork';
import {RIGHT_SHAFT} from './motions/arrowRight';
import {UP_STEM} from './motions/arrowUp';
import {LINK_SHAFT} from './motions/externalLink';
import {UPLOAD_STEM} from './motions/upload';

type Props = {name:string; draw:Draw; texture:'dither'|'solid'|'outline'};
/** Open contours omit the internal cut edges in outline mode. The ink silhouette
 * stays continuous in every material; a joint never becomes an extra crossbar. */
export function DirectionalArtwork({name,draw,texture}:Props) {
  const piece = (fill:string, contour:string) => texture==='outline'
    ? <path d={contour} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round"/>
    : draw(fill);
  const accent = (part:string,d:string,width=.55) => <g data-part={part} opacity="0"><path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/></g>;
  if(name==='arrow-right') {
    const {tail,joint,y,halfWidth:w}=RIGHT_SHAFT;
    const head=`M${joint} ${y-w}L11.5 5.3 13 4 21 12 13 20 11.5 18.7 ${joint} ${y+w}`;
    const shaft=`M${joint} ${y-w}H${tail}V${y+w}H${joint}`;
    return <><g data-part="shaft">{piece(shaft+'Z',shaft)}</g><g data-part="head">{piece(head+'Z',head)}</g>{accent('tip-release','M21.8 9.8l.9-.65M21.8 14.2l.9.65')}</>;
  }
  if(name==='arrow-up') {
    const {x,joint,foot,halfWidth:w}=UP_STEM;
    const head=`M${x-w} ${joint}L5.3 12.5 4 11 12 3 20 11 18.7 12.5 ${x+w} ${joint}`;
    const stem=`M${x-w} ${joint}V${foot}H${x+w}V${joint}`;
    return <><g data-part="stem">{piece(stem+'Z',stem)}</g><g data-part="head">{piece(head+'Z',head)}</g>{accent('lift-wake','M6.8 12.5q-.35 1.1.1 2M17.2 12.5q.35 1.1-.1 2')}</>;
  }
  if(name==='external-link') {
    const {tailX,tailY,jointX,halfWidth}=LINK_SHAFT;
    const length=(jointX-tailX)*Math.SQRT2, w=halfWidth*Math.SQRT2;
    // Positive local coordinates keep the dither field entirely inside its mask.
    const shaft=`M${3+length} ${12-w}H3V${12+w}H${3+length}`;
    const corner='M16 6.6L17.6 5H13V3H21V11H19V6.4L17.4 8';
    return <>
      {draw('M4 5h6v2H5v12h12v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z')}
      <g transform={`translate(${tailX} ${tailY}) rotate(-45) translate(-3 -12)`}><g data-part="shaft">{piece(shaft+'Z',shaft)}</g></g>
      <g data-part="corner">{piece(corner+'Z',corner)}</g>
      {accent('destination-echo','M20.3 .85h2.85V3.7',.5)}
    </>;
  }
  if(name==='upload') {
    const {x,joint,foot,halfWidth:w}=UPLOAD_STEM;
    const head=`M${x-w} ${joint}L6.7 11.5 5.3 10.1 12 3.5 18.7 10.1 17.3 11.5 ${x+w} ${joint}`;
    const stem=`M${x-w} ${joint}V${foot}H${x+w}V${joint}`;
    // Pivoting side walls meet an unmoving bed. No deformation of the source bed.
    const tray='M3 20V21a1 1 0 0 0 1 1H20a1 1 0 0 0 1-1V20M19 20H5';
    return <>
      {piece('M3 20h18v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z',tray)}
      <g data-part="lip-left">{piece('M3 20V16H5V20Z','M3 20V16H5V20')}</g>
      <g data-part="lip-right">{piece('M19 20V16H21V20Z','M19 20V16H21V20')}</g>
      {accent('source-light','M7 19.1H17',.7)}
      {accent('release-flare','M2.4 18.2l-.7-1.6M21.6 18.2l.7-1.6',.65)}
      <g data-part="stem">{piece(stem+'Z',stem)}</g>
      <g data-part="head">{piece(head+'Z',head)}</g>
    </>;
  }
  return null;
}
