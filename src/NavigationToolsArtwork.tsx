import {useId,type ReactNode} from 'react';
import type {Draw} from './ExtendedArtwork';
import {BACK_ART} from './motions/arrow-left';
import {HISTORY_ART} from './motions/history';
import {PANEL_CLOSE_ART,PANEL_CLOSE_GEOMETRY} from './motions/panel-left-close';
import {ZOOM_OUT_ART,ZOOM_OUT_GEOMETRY} from './motions/zoom-out';
const line=(d:string,width=.6)=><path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>;
const accent=(part:string,children:ReactNode)=><g data-part={part} opacity="0">{children}</g>;
export function NavigationToolsArtwork({name,draw,texture}:{name:string;draw:Draw;texture:'dither'|'solid'|'outline'}){
 const id=useId().replace(/:/g,'')+'-navigation';let contourIndex=0;
 // Grain fills a round-stroked contour; geometry is independent of pixel marks.
 const ink=(d:string,width=1.65)=>{
  const maskId=`${id}-${contourIndex++}`;
  if(texture!=='dither')return line(d,width);
  return <><defs><mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><path d={d} fill="none" stroke="white" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/></mask></defs><g mask={`url(#${maskId})`}>{draw('M0 0h24v24H0Z')}</g></>;
 };
 if(name==='arrow-left')return <>
  {accent('back-trace',line(BACK_ART.trace,.6))}
  <g data-part="back-arrow">{ink(BACK_ART.arrow,1.9)}</g>
  {accent('back-arrival',line(BACK_ART.arrival,.55))}
 </>;
 if(name==='history')return <>
  {ink(HISTORY_ART.ring,1.6)}{ink(HISTORY_ART.head,1.6)}
  <g data-part="history-minute">{ink(HISTORY_ART.minute,1.45)}</g>
  <g data-part="history-hour">{ink(HISTORY_ART.hour,1.45)}</g>
  <circle cx="12" cy="12" r=".65"/>
  {accent('history-trace',line(HISTORY_ART.trace,.7))}
  {accent('history-recall',line(HISTORY_ART.reply,.55))}
 </>;
 if(name==='panel-left-close'){
  const G=PANEL_CLOSE_GEOMETRY;
  return <>
   <defs><clipPath id={`${id}-inside`}><rect x={G.left} y={G.top} width="15.2" height={G.height}/></clipPath></defs>
   <g clipPath={`url(#${id}-inside)`}>
    <g data-part="panel-drawer"><g opacity=".28">{texture==='outline'?line(PANEL_CLOSE_ART.panel,.8):draw(PANEL_CLOSE_ART.panel)}</g><g opacity=".7">{line(PANEL_CLOSE_ART.rows,.55)}</g></g>
    <g data-part="panel-divider">{ink(PANEL_CLOSE_ART.divider,1.15)}</g>
   </g>
   {texture==='outline'?line(PANEL_CLOSE_ART.frameLine,1.4):draw(PANEL_CLOSE_ART.frame)}
   <g data-part="panel-arrow">{ink(PANEL_CLOSE_ART.arrow,1.5)}</g>
   {accent('panel-latch',line(PANEL_CLOSE_ART.latch,.65))}
  </>;
 }
 if(name==='zoom-out'){
  const G=ZOOM_OUT_GEOMETRY;
  return <>
   {texture==='outline'?<><circle cx="9.8" cy="9.8" r="5.48" fill="none" stroke="currentColor" strokeWidth="1.65"/>{line('M13.75 13.75 20.45 20.45',1.85)}</>:draw(ZOOM_OUT_ART.body)}
   {ink(ZOOM_OUT_ART.minus,1.25)}
   <g data-part="zoom-field-position">{accent('zoom-field',line(ZOOM_OUT_ART.field,.6))}</g>
   {G.points.map(([x,y],i)=><g key={i}>{accent(`zoom-context-${i}`,<circle cx={x} cy={y} r=".43"/>)}</g>)}
  </>;
 }
 return null;
}
