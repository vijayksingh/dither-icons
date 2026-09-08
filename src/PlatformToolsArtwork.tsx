import {useId} from 'react';
import type {Draw} from './ExtendedArtwork';
import {SIGMA_ART} from './motions/sigma';
import {BUG_ART,BUG_GEOMETRY} from './motions/bug';
import {SLIDERS_ART,SLIDERS_KNOBS,SLIDERS_GEOMETRY} from './motions/sliders';
import {CAP_ART} from './motions/graduation-cap';

type Props={name:string;draw:Draw;texture:'dither'|'solid'|'outline'};
const line=(d:string,width=.65)=><path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>;
const accent=(part:string,d:string,width=.65)=><g data-part={part} opacity="0">{line(d,width)}</g>;
const field=<rect x="-24" y="-24" width="72" height="72" fill="white"/>;
const MASK={maskUnits:'userSpaceOnUse' as const,x:-24,y:-24,width:72,height:72};

export function PlatformToolsArtwork({name,draw,texture}:Props){
 const id=useId().replace(/:/g,'')+'-tools';
 if(name==='sigma')return <>
  <defs><clipPath id={`${id}-operator`}><path d={SIGMA_ART.body}/></clipPath></defs>
  {texture==='outline'?line(SIGMA_ART.line,1.7):draw(SIGMA_ART.body)}
  {['term-upper','term-middle','term-lower'].map(part=><g key={part} data-part={part} opacity="0"><circle cx="12.7" cy="12" r=".48"/></g>)}
  <g clipPath={`url(#${id}-operator)`}>
   <g data-part="sum-receiver" opacity="0"><circle cx="12.7" cy="12" r="1.2"/></g>
   <g data-part="sum-trace" opacity="0"><circle cx="12.7" cy="12" r="1.3"/></g>
  </g>
  {accent('sum-terminal',SIGMA_ART.terminal,.7)}
  {accent('output-upper',SIGMA_ART.upperWitness,.6)}{accent('output-lower',SIGMA_ART.lowerWitness,.6)}
 </>;
 if(name==='bug')return <>
  <g opacity=".7">{line(BUG_ART.hind,1.25)}</g>
  {BUG_ART.legs.map(l=><g data-part={l.part} key={l.part}>{line(l.d,1.25)}</g>)}
  <g data-part="feeler-left">{line(BUG_ART.antennaLeft,1.15)}</g>
  <g data-part="feeler-right">{line(BUG_ART.antennaRight,1.15)}</g>
  {texture==='outline'?line('M9.65 7.45V7a2.35 2.35 0 0 1 4.7 0v.45Z',1.3):draw(BUG_ART.head)}
  <g data-part="shell-left">{texture==='outline'?line(BUG_ART.leftLine,1.3):draw(BUG_ART.left)}</g>
  <g data-part="shell-right">{texture==='outline'?line(BUG_ART.rightLine,1.3):draw(BUG_ART.right)}</g>
  <circle cx={BUG_GEOMETRY.fault[0]} cy={BUG_GEOMETRY.fault[1]} r=".38" opacity=".5"/>
  <g data-part="fault-light" opacity="0"><circle cx="12" cy="14" r=".55"/><circle cx="12" cy="14" r=".93" fill="none" stroke="currentColor" strokeWidth=".35"/></g>
  {accent('fault-locator',BUG_ART.locator,.5)}
 </>;
 if(name==='sliders')return <>
  <defs><mask id={`${id}-thumbs`} {...MASK}>{field}
   {SLIDERS_KNOBS.map((k,i)=><g key={i} data-part={i===1?'slider-occlusion':undefined}><path d={SLIDERS_ART.knob(k.x,k.y)} fill="black" stroke="black" strokeWidth=".4"/></g>)}
  </mask></defs>
  <g mask={`url(#${id}-thumbs)`}>
   <g opacity=".32">{line(SLIDERS_ART.rails,1.15)}</g>
   <g opacity=".75"><g data-part="slider-fill">{line(`M${SLIDERS_GEOMETRY.railStart} 12H${SLIDERS_GEOMETRY.middleX}`,1.15)}</g></g>
  </g>
  {SLIDERS_KNOBS.map((k,i)=><g key={i} data-part={i===1?'slider-thumb':undefined} opacity={i===1?1:.8}>
   {texture==='outline'?<rect x={k.x-1.2} y={k.y-1.75} width="2.4" height="3.5" rx=".6" fill="none" stroke="currentColor" strokeWidth="1"/>:draw(SLIDERS_ART.knob(k.x,k.y))}
   {i===1&&accent('thumb-light',SLIDERS_ART.edge,.55)}
  </g>)}
  {accent('detent-upper',SLIDERS_ART.upper,.65)}{accent('detent-lower',SLIDERS_ART.lower,.65)}
 </>;
 if(name==='graduation-cap')return <g data-part="academic-cap">
  <defs>
   <mask id={`${id}-crown`} {...MASK}>{field}<path d={CAP_ART.board+CAP_ART.rim} fill="black" stroke="black" strokeWidth={texture==='outline'?1.35:.1}/></mask>
   <clipPath id={`${id}-board`}><path d={CAP_ART.board}/></clipPath>
  </defs>
  <g mask={`url(#${id}-crown)`} opacity=".6">{texture==='outline'?line(CAP_ART.crownLine,1.35):draw(CAP_ART.crown)}</g>
  {texture==='outline'?line(CAP_ART.boardLine,1.35):<>{draw(CAP_ART.board)}<g opacity=".55">{draw(CAP_ART.rim)}</g></>}
  <g clipPath={`url(#${id}-board)`}>{accent('cap-edge',CAP_ART.edge,.6)}</g>
  <g opacity=".85">{line(CAP_ART.cord,.65)}<circle cx="12" cy="8.6" r=".65"/></g>
  <g data-part="tassel-cord">
   {line(CAP_ART.hanging,.85)}
   <g data-part="tassel-tuft">{texture==='outline'?line('M20 16.3v2.4',1.8):draw(CAP_ART.tuft)}</g>
   {accent('tassel-catch',CAP_ART.echo,.55)}
  </g>
 </g>;
 return null;
}
