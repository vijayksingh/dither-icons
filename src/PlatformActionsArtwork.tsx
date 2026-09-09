import {useId} from 'react';
import type {Draw} from './ExtendedArtwork';
import {SAVE_ART} from './motions/save-preferences';
import {EXPLORER_ART,EXPLORER_GEOMETRY} from './motions/file-explorer';
import {EXPAND_ART,EXPAND_CORNERS} from './motions/expand-view';
import {EXIT_ART} from './motions/sign-out';
type Props={name:string;draw:Draw;texture:'dither'|'solid'|'outline'};
const line=(d:string,width=.65)=><path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>;
const accent=(part:string,d:string,width=.65)=><g data-part={part} opacity="0">{line(d,width)}</g>;
const disc=(x:number,y:number,r:number)=>`M${x-r} ${y}a${r} ${r} 0 1 0 ${r*2} 0a${r} ${r} 0 1 0 ${-r*2} 0Z`;
const field=<rect x="-24" y="-24" width="72" height="72" fill="white"/>;
const MASK={maskUnits:'userSpaceOnUse' as const,x:-24,y:-24,width:72,height:72};
export function PlatformActionsArtwork({name,draw,texture}:Props){
 const id=useId().replace(/:/g,'')+'-actions';
 if(name==='save-preferences')return <>
  <defs><mask id={`${id}-shutter`} {...MASK}>{field}<path d="M12.3 5.8h1v2.3h-1Z" fill="black"/></mask></defs>
  {texture==='outline'?line(SAVE_ART.shellLine,1.5):draw(SAVE_ART.shell)}
  <g opacity=".5">{line(SAVE_ART.channel,.6)}{line(SAVE_ART.stop,1)}</g>
  <g data-part="save-shutter">{texture==='outline'?<>{line('M8.85 5.55h5.3v2.8h-5.3Z',.7)}{line('M12.8 6.1v1.7',.55)}</>:<g mask={`url(#${id}-shutter)`}>{draw(SAVE_ART.shutter)}</g>}</g>
  <g opacity=".7">{texture==='outline'?line(SAVE_ART.labelLine,1.1):draw(SAVE_ART.label)}</g>
  {SAVE_ART.lines.map((d,i)=><g key={i}><g opacity=".35">{line(d,.65)}</g>{accent(`save-write-${i}`,d,.8)}</g>)}
  {accent('save-stop',SAVE_ART.stopLight,.7)}{accent('save-witness-upper',SAVE_ART.upper,.55)}{accent('save-witness-lower',SAVE_ART.lower,.55)}
 </>;
 if(name==='file-explorer')return <>
  <defs><clipPath id={`${id}-editor`}><rect x="4.4" y="8.3" width="15.2" height="10.6"/></clipPath></defs>
  {texture==='outline'?line(EXPLORER_ART.frameLine,1.4):draw(EXPLORER_ART.frame)}
  <g opacity=".5">{line(EXPLORER_ART.chrome,.65)}<circle cx="5.8" cy="5.9" r=".32"/><circle cx="7.3" cy="5.9" r=".32"/></g>
  <g clipPath={`url(#${id}-editor)`}>
   <g data-part="explorer-code" opacity=".45">{line(EXPLORER_ART.code,.8)}</g>
   <g data-part="explorer-divider" opacity=".65">{line(EXPLORER_ART.divider,.8)}</g>
   <g opacity=".6">{line(EXPLORER_ART.spine,.55)}</g>
   {EXPLORER_GEOMETRY.rows.map((y,i)=><g key={i} data-part={`explorer-branch-${i}`} opacity=".6">{line(`M5.6 ${y}h1.7`,.55)}</g>)}
   <g data-part="explorer-nodes">{EXPLORER_GEOMETRY.rows.map((y,i)=><g key={i} opacity={i===1?.9:.6}>{texture==='outline'?<circle cx="7.3" cy={y} r=".45" fill="none" stroke="currentColor" strokeWidth=".45"/>:draw(disc(7.3,y,.65))}</g>)}
    <g data-part="explorer-active" opacity="0"><circle cx="7.3" cy="13.8" r="1.15" fill="none" stroke="currentColor" strokeWidth=".5"/></g>
   </g>
  </g>
  {accent('explorer-seat-top',EXPLORER_ART.topSeat,.6)}{accent('explorer-seat-bottom',EXPLORER_ART.bottomSeat,.6)}
 </>;
 if(name==='expand-view')return <>
  <g opacity=".55">{line(EXPAND_ART.content,.8)}</g>
  {EXPAND_CORNERS.map((c,i)=><g key={i} data-part={`expand-corner-${i}`}>
   <g transform={`rotate(${c.angle} 12 12)`}>{texture==='outline'?line(EXPAND_ART.cornerLine,1.4):draw(EXPAND_ART.corner)}</g>
   <g data-part={`expand-echo-${i}`} opacity="0"><g transform={`rotate(${c.angle} 12 12)`}>{line(EXPAND_ART.echo,.5)}</g></g>
  </g>)}
 </>;
 if(name==='sign-out')return <>
  <defs>
   <mask id={`${id}-arrow`} {...MASK}>{field}<g data-part="exit-occlusion"><path d={EXIT_ART.leaf} fill="black" stroke="black" strokeWidth=".35"/></g></mask>
   <mask id={`${id}-handle`} {...MASK}>{field}<circle cx="9.15" cy="12" r=".32" fill="black"/></mask>
  </defs>
  {texture==='outline'?line(EXIT_ART.frameLine,1.4):draw(EXIT_ART.frame)}
  <g mask={`url(#${id}-arrow)`}><g data-part="exit-arrow">{texture==='outline'?line(EXIT_ART.arrowLine,1.4):draw(EXIT_ART.arrow)}</g></g>
  <g data-part="exit-leaf">{texture==='outline'?<>{line(EXIT_ART.leafLine,1.1)}<circle cx="9.15" cy="12" r=".3"/></>:<g opacity=".7" mask={`url(#${id}-handle)`}>{draw(EXIT_ART.leaf)}</g>}</g>
  {accent('exit-witness-upper',EXIT_ART.upper,.6)}{accent('exit-witness-lower',EXIT_ART.lower,.6)}
 </>;
 return null;
}
