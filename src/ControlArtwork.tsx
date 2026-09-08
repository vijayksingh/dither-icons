import {useId} from 'react';
import type {Draw} from './ExtendedArtwork';
import {PLAY_ART} from './motions/play';
import {PAUSE_ART} from './motions/pause';
import {VOLUME_ART} from './motions/volume';
import {CODE_ART} from './motions/code';

type Props={name:string;draw:Draw;texture:'dither'|'solid'|'outline'};
const line=(d:string,width=.6)=><path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>;
const accent=(part:string,d:string,width=.6)=><g data-part={part} opacity="0">{line(d,width)}</g>;

/** Highlights belong to their moving surfaces. Exterior responses stay in the
 * icon's frame; they describe release, arrest, propagation, or registration. */
export function ControlArtwork({name,draw,texture}:Props){
 const id=useId().replace(/:/g,'')+'-expression';
 if(name==='play')return <>
  <g data-part="triangle">{draw(PLAY_ART.triangle)}{accent('release-edge',PLAY_ART.edge,.55)}</g>
  {accent('launch-stroke',PLAY_ART.stroke,.65)}
  {accent('release-fan',PLAY_ART.fan,.55)}
 </>;
 if(name==='pause')return <>
  <g data-part="bar-left">{draw(PAUSE_ART.left)}</g>
  <g data-part="bar-right">{draw(PAUSE_ART.right)}</g>
  {accent('seat-left',PAUSE_ART.leftSeat,.6)}
  {accent('seat-right',PAUSE_ART.rightSeat,.6)}
  {accent('stop-left',PAUSE_ART.leftTick,.55)}
  {accent('stop-right',PAUSE_ART.rightTick,.55)}
 </>;
 if(name==='volume')return <>
  {texture==='outline'?line('M7 9H3.65a.65.65 0 0 0-.65.65v4.7a.65.65 0 0 0 .65.65H7',1.4):draw(VOLUME_ART.neck)}
  <g data-part="cone">
   {texture==='outline'?line(VOLUME_ART.cone.slice(0,-1),1.4):draw(VOLUME_ART.cone)}
   {accent('diaphragm-light',VOLUME_ART.diaphragm,.55)}
  </g>
  <g data-part="wave-near">{texture==='outline'?line(VOLUME_ART.nearOutline,1.4):draw(VOLUME_ART.near)}</g>
  <g data-part="wave-far">{texture==='outline'?line(VOLUME_ART.farOutline,1.4):draw(VOLUME_ART.far)}{accent('wave-light',VOLUME_ART.farLight,.55)}</g>
  {accent('sound-front',VOLUME_ART.front,.6)}
 </>;
 if(name==='code')return <>
  <defs><clipPath id={id}><path d={CODE_ART.slash}/></clipPath></defs>
  <g data-part="bracket-left">{draw(CODE_ART.left)}{accent('registration-left',CODE_ART.leftCaps,.6)}</g>
  <g data-part="bracket-right">{draw(CODE_ART.right)}{accent('registration-right',CODE_ART.rightCaps,.6)}</g>
  <g data-part="slash">{draw(CODE_ART.slash)}<g clipPath={`url(#${id})`}>{accent('syntax-trace',CODE_ART.trace,1.05)}</g></g>
  {accent('alignment-left',CODE_ART.leftTick,.6)}
  {accent('alignment-right',CODE_ART.rightTick,.6)}
 </>;
 return null;
}
