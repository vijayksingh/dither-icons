import {useId} from 'react';
import type {Draw} from './ExtendedArtwork';
import {RHYTHM_ART} from './motions/learning-rhythm';
import {GRADIENT_ART,GRADIENT_GEOMETRY,gradientPose} from './motions/gradient-check';
import {COMPARE_ART,comparePoint} from './motions/experiment-compare';
import {STEP_ART,STEP_GEOMETRY,stepPoint,stepTangent} from './motions/training-step';
type Props={name:string;draw:Draw;texture:'dither'|'solid'|'outline'};
const line=(d:string,width=.65)=><path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>;
const accent=(part:string,d:string,width=.65)=><g data-part={part} opacity="0">{line(d,width)}</g>;
const disc=(r:number,x=0,y=0)=>`M${x-r} ${y}a${r} ${r} 0 1 0 ${r*2} 0a${r} ${r} 0 1 0 ${-r*2} 0Z`;
const field=<rect x="-24" y="-24" width="72" height="72" fill="white"/>;
const MASK={maskUnits:'userSpaceOnUse' as const,x:-24,y:-24,width:72,height:72};
export function LearningPracticeArtwork({name,draw,texture}:Props){
 const id=useId().replace(/:/g,'')+'-practice';
 if(name==='learning-rhythm')return <>
  <g opacity=".85">{texture==='outline'?line(RHYTHM_ART.outline,1.3):draw(RHYTHM_ART.case)}</g>
  <g opacity=".35">{line(RHYTHM_ART.scale,.5)}</g>
  <g data-part="rhythm-arm"><g transform="rotate(-12 12 17.8)">
   {texture==='outline'?line('M12 7.2v10.6',1):draw(RHYTHM_ART.arm)}
   {draw(RHYTHM_ART.weight)}
   {accent('rhythm-glint',RHYTHM_ART.weightEdge,.55)}
  </g></g>
  <circle cx="12" cy="17.8" r="1.05"/><circle cx="12" cy="17.8" r=".35" fill="none" stroke="currentColor" strokeWidth=".2"/>
  <g opacity=".45">{line(RHYTHM_ART.foot,.9)}</g>
  {accent('rhythm-beat-upper',RHYTHM_ART.beatUpper,.55)}{accent('rhythm-beat-lower',RHYTHM_ART.beatLower,.55)}
 </>;
 if(name==='gradient-check')return <>
  <defs><mask id={`${id}-probes`} {...MASK}>{field}{([-1,1] as const).map((side,i)=>{const p=gradientPose(6,side);return <g key={i} data-part={`gradient-knockout-${i}`}><circle cx={p.x} cy={p.y} r={GRADIENT_GEOMETRY.radius+.25} fill="black"/></g>})}</mask></defs>
  <g opacity=".4">{line(GRADIENT_ART.axes,.8)}</g>
  <g mask={`url(#${id}-probes)`}>
   <g opacity=".75">{texture==='outline'?line(GRADIENT_ART.curve,1.1):draw(GRADIENT_ART.band)}</g>
   <g data-part="gradient-chord" opacity=".55">{line(GRADIENT_ART.chord,.7)}</g>
  </g>
  <g opacity=".8">{line(GRADIENT_ART.tangent,.65)}</g>
  {([-1,1] as const).map((side,i)=>{const p=gradientPose(6,side);return <g key={i} data-part={`gradient-probe-${i}`}>{texture==='outline'?<circle cx={p.x} cy={p.y} r=".9" fill="none" stroke="currentColor" strokeWidth=".7"/>:draw(disc(1.25,p.x,p.y)+disc(.55,p.x,p.y))}</g>})}
  <circle cx="12" cy="15" r=".4"/>
  <g data-part="gradient-center" opacity="0"><circle cx="12" cy="15" r=".95" fill="none" stroke="currentColor" strokeWidth=".5"/></g>
  {accent('gradient-witness',GRADIENT_ART.witness,.55)}
 </>;
 if(name==='experiment-compare')return <>
  <g opacity=".25">{line(COMPARE_ART.divider,.5)}</g>
  {[0,1].map(i=>{const [x,y]=comparePoint(i,1);return <g key={i} data-part={`compare-pane-${i}`}>
   {texture==='outline'?line(COMPARE_ART.outline(i?13.1:2.8),1.1):draw(COMPARE_ART.pane(i?13.1:2.8))}
   <g opacity=".6">{line(COMPARE_ART.plots[i],.85)}</g>
   <g data-part={`compare-cursor-${i}`} opacity="0">{line('M0 6.5v11',.5)}</g>
   <g data-part={`compare-point-${i}`} opacity="0"><circle r=".7"/></g>
   <g data-part={`compare-response-${i}`} opacity="0"><circle cx={x} cy={y} r="1.3" fill="none" stroke="currentColor" strokeWidth=".5"/></g>
  </g>})}
  {accent('compare-receipt',COMPARE_ART.receipt,.55)}
 </>;
 if(name==='training-step'){
  const [sx,sy]=stepPoint(STEP_GEOMETRY.start),[x,y]=stepPoint(STEP_GEOMETRY.end),[tx,ty]=stepTangent(STEP_GEOMETRY.end),length=Math.hypot(tx,ty),nx=-ty/length,ny=tx/length;
  const normal=(sign:number)=>`M${x+nx*2*sign} ${y+ny*2*sign}l${nx*.9*sign} ${ny*.9*sign}`;
  const [dx,dy]=stepTangent(STEP_GEOMETRY.start),dl=Math.hypot(dx,dy);
  return <>
   <defs><mask id={`${id}-parameter`} {...MASK}>{field}<g data-part="training-knockout"><circle cx={sx} cy={sy} r={STEP_GEOMETRY.radius+.35} fill="black"/></g></mask></defs>
   <g opacity=".4">{line(STEP_ART.axes,.8)}</g>
   <g mask={`url(#${id}-parameter)`}><g opacity=".8">{texture==='outline'?line(STEP_ART.curve,1.25):draw(STEP_ART.band)}</g>
    {accent('training-read',`M${sx-dx/dl*1.6} ${sy-dy/dl*1.6}l${dx/dl*4.3} ${dy/dl*4.3}`,1)}
    <g data-part="training-origin" opacity="0"><circle cx={sx} cy={sy} r=".75" fill="none" stroke="currentColor" strokeWidth=".5"/></g>
   </g>
   <g data-part="training-point">{texture==='outline'?<circle cx={sx} cy={sy} r=".95" fill="none" stroke="currentColor" strokeWidth=".7"/>:draw(disc(1.3,sx,sy))}</g>
   <g data-part="training-ring" opacity="0"><circle cx={x} cy={y} r="1.95" fill="none" stroke="currentColor" strokeWidth=".5"/></g>
   {accent('training-normal-upper',normal(-1),.6)}{accent('training-normal-lower',normal(1),.6)}
  </>;
 }
 return null;
}
