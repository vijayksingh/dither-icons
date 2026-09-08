import {useId} from 'react';
import type {Draw} from './ExtendedArtwork';
import {PATH_ART,PATH_GEOMETRY} from './motions/path';
import {FLASK_ART} from './motions/flask';
import {TARGET_ART} from './motions/target';
import {RETRY_ART} from './motions/retry';

type Props={name:string;draw:Draw;texture:'dither'|'solid'|'outline'};
const line=(d:string,width=.6)=><path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>;
const circle=(x:number,y:number,r:number,width=1.4)=><circle cx={x} cy={y} r={r} fill="none" stroke="currentColor" strokeWidth={width}/>;
const accent=(part:string,d:string,width=.6)=><g data-part={part} opacity="0">{line(d,width)}</g>;

export function LearningArtwork({name,draw,texture}:Props){
 const id=useId().replace(/:/g,'')+'-learning';
 if(name==='path')return <>
  {texture==='outline'?<>{line(PATH_ART.firstOutline,1.4)}{line(PATH_ART.secondOutline,1.4)}</>:<>{draw(PATH_ART.first)}{draw(PATH_ART.second)}</>}
  {PATH_GEOMETRY.nodes.map(n=><g key={n.part} data-part={n.part}>{texture==='outline'?circle(n.x,n.y,1.825):draw(PATH_ART.node(n.x,n.y))}</g>)}
  {accent('source-light',PATH_ART.originLight,.7)}
  {accent('route-first',PATH_ART.firstLight,.8)}
  {accent('route-second',PATH_ART.secondLight,.8)}
  {accent('arrival-halo',PATH_ART.halo,.6)}
 </>;
 if(name==='flask')return <>
  <defs><clipPath id={`${id}-glass`}><path d={FLASK_ART.inside}/></clipPath></defs>
  {texture==='outline'?line(FLASK_ART.outline,1.4):draw(FLASK_ART.outer+FLASK_ART.inside)}
  <g clipPath={`url(#${id}-glass)`}>
   <g data-part="liquid">
    {texture==='outline'?line(FLASK_ART.surface,1.2):draw(FLASK_ART.liquid)}
    {accent('meniscus-light',FLASK_ART.surface,.65)}
   </g>
   <g data-part="bubble" opacity="0">{circle(12,14.8,.65,.55)}</g>
   {accent('reaction-fizz',FLASK_ART.fizz,.55)}
  </g>
 </>;
 if(name==='target')return <>
  <defs><mask id={`${id}-dart`} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
   <rect width="24" height="24" fill="white"/>
   <g data-part="dart-occlusion"><path d={TARGET_ART.dart} fill="black" stroke="black" strokeWidth={texture==='outline'?1.7:.55} strokeLinejoin="round"/></g>
  </mask></defs>
  <g mask={`url(#${id}-dart)`}>
   {texture==='outline'?circle(10,14,7.225):draw(TARGET_ART.outer)}
   <g data-part="inner-ring">{texture==='outline'?circle(10,14,3.875):draw(TARGET_ART.inner)}</g>
   {draw(TARGET_ART.center)}
   {accent('center-response',TARGET_ART.centerLight,.6)}
  </g>
  <g data-part="dart">{draw(TARGET_ART.dart)}</g>
  {accent('rim-response',TARGET_ART.rim,.6)}
 </>;
 if(name==='retry')return <g data-part="return-arrow">
  <defs><mask id={`${id}-return-joint`} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
   <rect width="24" height="24" fill="white"/><path d={RETRY_ART.head} fill="black"/>
  </mask></defs>
  {texture==='outline'?<>{line(RETRY_ART.outline,1.4)}{line(RETRY_ART.headOutline,1.4)}</>:<><g mask={`url(#${id}-return-joint)`}>{draw(RETRY_ART.arc)}</g>{draw(RETRY_ART.head)}</>}
  {accent('rewind-trace',RETRY_ART.trace,.8)}
  {accent('catch-edge',RETRY_ART.edge,.65)}
  {accent('catch-marks',RETRY_ART.click,.55)}
 </g>;
 return null;
}
