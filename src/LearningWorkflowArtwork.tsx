import {useId} from 'react';
import type {Draw} from './ExtendedArtwork';
import {CODE_RUN_ART} from './motions/code-run';
import {SUITE_ART,SUITE_CASES,SUITE_GEOMETRY} from './motions/test-suite';
import {MILESTONE_ART} from './motions/milestone';
import {REVIEW_ART,REVIEW_GEOMETRY} from './motions/concept-review';
type Props={name:string;draw:Draw;texture:'dither'|'solid'|'outline'};
const line=(d:string,width=.65)=><path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>;
const accent=(part:string,d:string,width=.65)=><g data-part={part} opacity="0">{line(d,width)}</g>;
const field=<rect x="-24" y="-24" width="72" height="72" fill="white"/>;
const MASK={maskUnits:'userSpaceOnUse' as const,x:-24,y:-24,width:72,height:72};
export function LearningWorkflowArtwork({name,draw,texture}:Props){
 const id=useId().replace(/:/g,'')+'-workflow';
 if(name==='code-run')return <>
  <defs><mask id={`${id}-launch`} {...MASK}>{field}<g data-part="run-occlusion"><path d={CODE_RUN_ART.launch} fill="black" stroke="black" strokeWidth="1.8"/></g></mask></defs>
  <g mask={`url(#${id}-launch)`}>
   {texture==='outline'?line(CODE_RUN_ART.frameLine,1.5):draw(CODE_RUN_ART.frame)}
   {CODE_RUN_ART.source.map((d,i)=><g key={i}><g opacity={.35+i*.1}>{line(d,1.1)}</g>{accent(`source-charge-${i}`,d,1.1)}</g>)}
  </g>
  <g data-part="run-launch">
   {texture==='outline'?line(CODE_RUN_ART.launchLine,1.4):draw(CODE_RUN_ART.launch)}
   {accent('run-edge',CODE_RUN_ART.edge,.6)}
  </g>
  {accent('run-witness-upper',CODE_RUN_ART.upper,.55)}{accent('run-witness-lower',CODE_RUN_ART.lower,.55)}
 </>;
 if(name==='test-suite')return <>
  <defs>
   <mask id={`${id}-rack`} {...MASK}>{field}{SUITE_CASES.map((c,i)=><path key={i} d={`M${c.x-1.8} ${c.top}h3.6v${15.7-c.top}a1.8 1.8 0 0 1-3.6 0Z`} fill="black" stroke="black" strokeWidth=".18"/>)}</mask>
   {SUITE_CASES.map((c,i)=><clipPath key={i} id={`${id}-chamber-${i}`}><path d={SUITE_ART.chamber(c.x,c.top)}/></clipPath>)}
  </defs>
  <g mask={`url(#${id}-rack)`} opacity=".65">{line(SUITE_ART.rack,1.2)}</g>
  {SUITE_CASES.map((c,i)=><g key={i}>
   {texture==='outline'?line(SUITE_ART.centerline(c.x,c.top),.9):draw(SUITE_ART.glass(c.x,c.top))}
   {line(`M${c.x-2.2} ${c.top}h4.4`,1.05)}
   <g clipPath={`url(#${id}-chamber-${i})`}><g data-part={`case-${i}`}><circle cx={c.x} cy={c.startY} r={SUITE_GEOMETRY.specimenRadius}/></g></g>
   {accent(`seat-light-${i}`,`M${c.x-1.15} 18.2q1.15.55 2.3 0`,.6)}
  </g>)}
  {accent('suite-datum',SUITE_ART.datum,.6)}
 </>;
 if(name==='milestone')return <>
  {texture==='outline'?<>{line('M8.8 3.4v16.4',1.4)}{line('M5.1 20.15h7.4M3.6 21.65H14',1.3)}</>:<>{draw(MILESTONE_ART.mast)}{draw(MILESTONE_ART.base)}</>}
  <g data-part="flag-root">
   {texture==='outline'?line(MILESTONE_ART.rootLine,1.3):draw(MILESTONE_ART.root)}
   <g data-part="flag-free">
    <g opacity={texture==='outline'?1:.8}>{texture==='outline'?line(MILESTONE_ART.freeLine,1.3):draw(MILESTONE_ART.free)}</g>
    {accent('flag-edge',MILESTONE_ART.edge,.65)}
   </g>
  </g>
  {accent('flag-air-upper',MILESTONE_ART.upper,.55)}{accent('flag-air-lower',MILESTONE_ART.lower,.55)}
 </>;
 if(name==='concept-review')return <>
  <defs>
   <mask id={`${id}-rear`} {...MASK}>{field}<g data-part="review-occlusion"><path d={REVIEW_ART.front} fill="black" stroke="black" strokeWidth=".3"/></g></mask>
   <mask id={`${id}-content`} {...MASK}>{field}<path d={REVIEW_ART.idea} fill="black"/><path d={REVIEW_ART.content} fill="none" stroke="black" strokeWidth=".85" strokeLinecap="round"/></mask>
   <mask id={`${id}-return`} {...MASK}><path d={REVIEW_ART.arc} fill="none" stroke="white" strokeWidth={REVIEW_GEOMETRY.stroke} strokeLinecap="round"/></mask>
  </defs>
  <g mask={`url(#${id}-rear)`}>
   <g opacity=".35">{draw(REVIEW_ART.rear)}</g>
   <g opacity=".6">{line(REVIEW_ART.oldLine,.85)}{line(REVIEW_ART.oldSecond,.85)}</g>
   {accent('recall-line',REVIEW_ART.oldLine,1.1)}
  </g>
  <g data-part="review-card">
   {texture==='outline'?<>{line(REVIEW_ART.frontLine,1.4)}{line(REVIEW_ART.idea,1)}{line(REVIEW_ART.content,.85)}</>:<g mask={`url(#${id}-content)`}>{draw(REVIEW_ART.front)}</g>}
  </g>
  <g opacity=".7">{line(REVIEW_ART.arc+REVIEW_ART.head,REVIEW_GEOMETRY.stroke)}</g>
  <g mask={`url(#${id}-return)`}><g data-part="recall-trace" opacity="0"><circle cx={REVIEW_GEOMETRY.tail[0]} cy={REVIEW_GEOMETRY.tail[1]} r="1.1"/></g></g>
  {accent('recall-witness',REVIEW_ART.witness,.65)}
 </>;
 return null;
}
