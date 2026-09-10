import {useId,type ReactNode} from 'react';
import {TERMINAL_ART} from './motions/terminal';
import {CPU_ART,CPU_GEOMETRY} from './motions/cpu';
import {CHART_ART,CHART_POINTS,CHART_GEOMETRY} from './motions/chart';
import {BOLT_ART,BOLT_GEOMETRY} from './motions/bolt';
export type Draw=(path:string)=>ReactNode;
const stroke=(d:string,width=.7)=><path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>;
const accent=(part:string,children:ReactNode)=><g data-part={part} opacity="0">{children}</g>;
/** Individual stories; geometry and timing share their actual contact points. */
export function ExtendedArtwork({name,draw,texture}:{name:string;draw:Draw;texture:'dither'|'solid'|'outline'}){
 const id=useId().replace(/:/g,'')+'-technical';
 if(name==='terminal')return <>
  {texture==='outline'?stroke(TERMINAL_ART.frameLine,1.6):draw(TERMINAL_ART.frame)}
  <g data-part="terminal-history">
   {texture==='outline'?stroke(TERMINAL_ART.promptLine,1.7):draw(TERMINAL_ART.prompt)}
   {accent('terminal-first',stroke(TERMINAL_ART.first,.8))}
   {accent('terminal-second',stroke(TERMINAL_ART.second,.8))}
  </g>
  {accent('terminal-response',stroke(TERMINAL_ART.response,.8))}
  <g data-part="terminal-cursor">{texture==='outline'?stroke('M12 15.1h1',1.2):draw(TERMINAL_ART.cursor)}</g>
  {accent('terminal-return',stroke(TERMINAL_ART.returnMark,.5))}
 </>;
 if(name==='cpu')return <>
  <g opacity=".5">{[0,90,180,270].map(angle=><g key={angle} transform={`rotate(${angle} 12 12)`}>{CPU_GEOMETRY.lanes.map(y=><path key={y} d={`M${CPU_GEOMETRY.pinOuter} ${y}H${CPU_GEOMETRY.packageEdge}`} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>)}</g>)}</g>
  {texture==='outline'?stroke(CPU_ART.packageLine,1.4):draw(CPU_ART.package)}
  <g opacity=".24">{CPU_GEOMETRY.lanes.map((y,i)=><path key={y} d={`M6.4 ${y}H6.9V${10.5+i*1.5}H8.8`} fill="none" stroke="currentColor" strokeWidth=".45"/>)}{stroke('M15.2 12h2.4',.45)}</g>
  {texture==='outline'?stroke(CPU_ART.coreLine,1.2):draw(CPU_ART.core)}
  {CPU_GEOMETRY.lanes.map((_,i)=><g key={i}>{accent(`cpu-input-${i}`,<circle cx="0" cy="0" r=".6"/>)}</g>)}
  {CPU_GEOMETRY.cells.map(([x,y],i)=><g key={i}>{accent(`cpu-cell-${i}`,<rect x={x} y={y} width={CPU_GEOMETRY.cellSize} height={CPU_GEOMETRY.cellSize} rx=".15"/>)}</g>)}
  {accent('cpu-output',<circle cx="0" cy="12" r=".7"/>)}
  {accent('cpu-answer',stroke(CPU_ART.answer,.6))}
 </>;
 if(name==='chart'){
  const G=CHART_GEOMETRY;
  return <>
   <defs><mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="white"/><g data-part="chart-ruler-mask-position">{accent('chart-ruler-mask',<path d={`M${G.rulerStart} ${G.baseline}H${G.rulerEnd}`} fill="none" stroke="black" strokeWidth="1.5"/>)}</g></mask></defs>
   {texture==='outline'?stroke(CHART_ART.axisLine,1.4):draw(CHART_ART.axis)}
   <g mask={`url(#${id})`}>{CHART_ART.bars.map((path,i)=><g key={i}>{draw(path)}</g>)}</g>
   <g data-part="chart-ruler-position">{accent('chart-ruler',stroke(`M${G.rulerStart} ${G.baseline}H${G.rulerEnd}`, .45))}</g>
   {CHART_ART.caps.map((path,i)=><g key={i}>{accent(`chart-mark-${i}`,<>{stroke(path,.6)}{stroke(`M2 ${CHART_POINTS[i][1]}h1.6`,.55)}</>)}</g>)}
   {accent('chart-resolve',stroke(`M22 ${CHART_POINTS[2][1]-.95}l.6.95-.6.95`,.55))}
  </>;
 }
 if(name==='bolt')return <>
  <defs><mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="white"/>{accent('bolt-aperture',<circle cx="0" cy="0" r={BOLT_GEOMETRY.chargeRadius} fill="black"/>)}</mask><clipPath id={`${id}-body`}><path d={BOLT_ART.body}/></clipPath></defs>
  <g data-part="bolt-body">
   <g mask={texture==='outline'?undefined:`url(#${id})`}>{draw(BOLT_ART.body)}</g>
   <g clipPath={`url(#${id}-body)`}>{accent('bolt-charge',<circle cx="0" cy="0" r={texture==='outline'?.52:BOLT_GEOMETRY.coreRadius}/>)}</g>
  </g>
  {BOLT_ART.discharge.map((path,i)=><g key={i}>{accent(`bolt-discharge-${i}`,stroke(path,.65))}</g>)}
 </>;
 return null;
}
