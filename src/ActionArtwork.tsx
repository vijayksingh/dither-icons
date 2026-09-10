import {useId} from 'react';
import type {Draw} from './ExtendedArtwork';
import {CHECK_ART} from './motions/check';
import {CLOSE_ART} from './motions/close';
import {PLUS_ART} from './motions/plus';
import {LOCK_ART} from './motions/lock';
import {UNLOCK_ART,UNLOCK_REST_TRANSFORM} from './motions/unlock';

type Props={name:string;draw:Draw;texture:'dither'|'solid'|'outline'};
const stroke=(d:string,width=.65)=><path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>;
const accent=(part:string,d:string,width=.65)=><g data-part={part} opacity="0">{stroke(d,width)}</g>;
const MASK={maskUnits:'userSpaceOnUse' as const,x:-24,y:-24,width:72,height:72};

export function ActionArtwork({name,draw,texture}:Props){
 const id=useId().replace(/:/g,'')+'-action';
 if(name==='check')return <g data-part="check-stroke">
  {texture==='outline'?stroke(CHECK_ART.centerline,1.8):draw(CHECK_ART.body)}
  {accent('check-trace',CHECK_ART.trace,.7)}
  {accent('check-tip',CHECK_ART.rays,.6)}
 </g>;
 if(name==='close'||name==='plus'){
  const close=name==='close',art=close?CLOSE_ART:PLUS_ART;
  const lower=close?'close-down':'plus-across',upper=close?'close-up':'plus-above';
  const angle=close?-45:90;
  // The upper arm and its knockout use identical tracks. Their crossing has
  // one layer of ink in dither and no doubled outline strokes (MOT-07).
  const bar=()=>texture==='outline'?stroke(art.centerline,1.8):draw(art.bar);
  return <>
   <defs><mask id={id} {...MASK}>
    <rect x="-24" y="-24" width="72" height="72" fill="white"/>
    <g transform={`rotate(${angle} 12 12)`}><g data-part={close?'close-occlusion':'plus-occlusion'}>
     {texture==='outline'?<path d={art.centerline} fill="none" stroke="black" strokeWidth="1.8" strokeLinecap="round"/>:<path d={art.bar} fill="black"/>}
    </g></g>
   </mask></defs>
   <g mask={`url(#${id})`}><g transform={close?'rotate(45 12 12)':undefined}><g data-part={lower}>{bar()}{close?accent('mark-edge',CLOSE_ART.edge,.55):<>
    {accent('plus-wave-right',PLUS_ART.wave,.65)}
    <g transform="translate(24 0) scale(-1 1)">{accent('plus-wave-left',PLUS_ART.wave,.65)}</g>
   </>}</g></g></g>
   <g transform={`rotate(${angle} 12 12)`}><g data-part={upper}>{bar()}{close&&accent('cross-edge',CLOSE_ART.edge,.65)}</g></g>
   {close?<g transform="rotate(-45 12 12)">{accent('cross-finish',CLOSE_ART.finish,.55)}</g>:accent('addition-finish',PLUS_ART.tips,.55)}
  </>;
 }
 if(name==='lock'||name==='unlock'){
  const open=name==='unlock';
  return <>
  <defs><mask id={id} {...MASK}><rect x="-24" y="-24" width="72" height="72" fill="white"/><path d={LOCK_ART.body} fill="black"/></mask></defs>
  <g mask={`url(#${id})`}><g data-part={open?'unlock-shackle':'lock-shackle'}><g transform={open?UNLOCK_REST_TRANSFORM:undefined}>
   {texture==='outline'?stroke(LOCK_ART.shackleLine,1.8):draw(LOCK_ART.shackle)}
   {open&&accent('unlock-end',UNLOCK_ART.freeEnd,.7)}
  </g></g></g>
  {texture==='outline'?<>{stroke(LOCK_ART.body,1.3)}<path d={LOCK_ART.keyhole}/></>:draw(LOCK_ART.body+LOCK_ART.keyhole)}
  {open?accent('unlock-gap',UNLOCK_ART.gap,.6):<>
   {accent('lock-seats',LOCK_ART.seats,.7)}
   {accent('lock-response',LOCK_ART.response,.6)}
  </>}
 </>;
 }
 return null;
}
