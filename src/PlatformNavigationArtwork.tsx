import {useId} from 'react';
import type {Draw} from './ExtendedArtwork';
import {WORKSPACE_ART} from './motions/workspace';
import {GAUGE_ART,GAUGE_GEOMETRY} from './motions/gauge';
import {ORBIT_ART,ORBIT_GEOMETRY,orbitPoint} from './motions/orbit';
import {LIFEBUOY_ART,LIFEBUOY_GEOMETRY} from './motions/lifebuoy';

type Props={name:string;draw:Draw;texture:'dither'|'solid'|'outline'};
const line=(d:string,width=.65)=><path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>;
const accent=(part:string,d:string,width=.65)=><g data-part={part} opacity="0">{line(d,width)}</g>;
const field=<rect x="-24" y="-24" width="72" height="72" fill="white"/>;
const MASK={maskUnits:'userSpaceOnUse' as const,x:-24,y:-24,width:72,height:72};

export function PlatformNavigationArtwork({name,draw,texture}:Props){
 const id=useId().replace(/:/g,'')+'-navigation';
 if(name==='workspace')return <>
  {texture==='outline'?line(WORKSPACE_ART.frameLine,1.5):draw(WORKSPACE_ART.frame)}
  {texture==='outline'?line('M3.5 7.9h17',1.2):draw(WORKSPACE_ART.toolbar)}
  <g opacity=".6">{line('M5.2 6.1h.1M7.3 6.1h.1',.85)}{line(WORKSPACE_ART.tree,.8)}</g>
  <g data-part="divider">{texture==='outline'?line('M9.5 8.5V19',1.1):draw(WORKSPACE_ART.divider)}</g>
  <g data-part="source">
   <g data-part="source-first">{texture==='outline'?line('M12.2 11.275h6.5',1.15):draw(WORKSPACE_ART.first)}</g>
   <g data-part="source-second" opacity=".65">{texture==='outline'?line('M13.6 14.125h5.1',1.15):draw(WORKSPACE_ART.second)}</g>
   <g opacity=".85">{texture==='outline'?line('M12.2 16.975H16',1.15):draw(WORKSPACE_ART.third)}</g>
   {accent('editor-caret',WORKSPACE_ART.caret,.65)}
  </g>
  {accent('editor-edge',WORKSPACE_ART.edge,.6)}
 </>;
 if(name==='gauge')return <>
  <defs><mask id={`${id}-hub`} {...MASK}>{field}<circle cx={GAUGE_GEOMETRY.x} cy={GAUGE_GEOMETRY.y} r={GAUGE_GEOMETRY.hubRadius-.05} fill="black"/></mask></defs>
  {texture==='outline'?line(GAUGE_ART.rimLine,1.65):draw(GAUGE_ART.rim)}
  <g opacity=".6">{GAUGE_ART.ticks.map((d,i)=><g key={i}>{line(d,.8)}</g>)}{line(GAUGE_ART.baseline,1.2)}</g>
  <g mask={`url(#${id}-hub)`}><g data-part="needle">{draw(GAUGE_ART.needle)}</g></g>
  {texture==='outline'?<circle cx="12" cy="14.5" r="1.175" fill="none" stroke="currentColor" strokeWidth="1.05"/>:draw(GAUGE_ART.hub)}
  {accent('reading-tick',GAUGE_ART.registered,1)}{accent('reading-echo',GAUGE_ART.echo,.55)}
 </>;
 if(name==='orbit'){
  const [sx,sy]=orbitPoint(ORBIT_GEOMETRY.startAngle);
  return <g transform={`rotate(${ORBIT_GEOMETRY.tilt} 12 12)`}>
   <defs>
    <clipPath id={`${id}-rear`}><rect x="-24" y="-24" width="72" height="36"/></clipPath>
    <clipPath id={`${id}-front`}><rect x="-24" y="12" width="72" height="36"/></clipPath>
    <mask id={`${id}-core`} {...MASK}>{field}<circle cx="12" cy="12" r={ORBIT_GEOMETRY.coreRadius} fill="black" stroke="black" strokeWidth={texture==='outline'?1.4:.12}/></mask>
    <mask id={`${id}-front-orbit`} {...MASK}>{field}<path d={ORBIT_ART.front} fill="black" stroke="black" strokeWidth={texture==='outline'?.5:.15}/></mask>
    <mask id={`${id}-satellite`} {...MASK}>{field}<g clipPath={`url(#${id}-front)`}><g data-part="satellite-occlusion"><circle cx={sx} cy={sy} r={ORBIT_GEOMETRY.satelliteRadius} fill="black" stroke="black" strokeWidth={texture==='outline'?1.5:.2}/></g></g></mask>
   </defs>
   <g clipPath={`url(#${id}-rear)`} mask={`url(#${id}-core)`}>
    <g opacity=".5">{texture==='outline'?line(ORBIT_ART.rearLine,1.35):draw(ORBIT_ART.rear)}</g>
    <g data-part="satellite-rear">{draw(ORBIT_ART.satellite)}</g>
   </g>
   <g mask={`url(#${id}-satellite)`}>
    <g mask={`url(#${id}-front-orbit)`}>
     {draw(ORBIT_ART.core)}{accent('orbital-surface',ORBIT_ART.surface,.6)}
    </g>
    {texture==='outline'?line(ORBIT_ART.frontLine,1.35):draw(ORBIT_ART.front)}
    {accent('orbital-wake',ORBIT_ART.wake,.7)}
   </g>
   <g clipPath={`url(#${id}-front)`}><g data-part="satellite-front">{draw(ORBIT_ART.satellite)}</g></g>
  </g>;
 }
 if(name==='lifebuoy')return <>
  <defs><mask id={`${id}-wraps`} {...MASK}>{field}{LIFEBUOY_ART.bands.map((d,i)=><path key={i} d={d} fill="black" stroke="black" strokeWidth=".14"/>)}</mask></defs>
  <g opacity=".26">{line(LIFEBUOY_ART.water,.6)}</g>
  <g data-part="buoy">
   {texture==='outline'?<>
    <circle cx="12" cy="10.8" r={LIFEBUOY_GEOMETRY.radius-.7} fill="none" stroke="currentColor" strokeWidth="1.4"/>
    <circle cx="12" cy="10.8" r={LIFEBUOY_GEOMETRY.innerRadius+.7} fill="none" stroke="currentColor" strokeWidth="1.4"/>
    {line(LIFEBUOY_ART.seams,1.4)}
   </>:<>
    <g mask={`url(#${id}-wraps)`} opacity=".62">{draw(LIFEBUOY_ART.body)}</g>
    {LIFEBUOY_ART.bands.map((d,i)=><g key={i}>{draw(d)}</g>)}
   </>}
   {accent('buoy-contact',LIFEBUOY_ART.contact,.65)}
  </g>
  {accent('ripple-left',LIFEBUOY_ART.left,.6)}{accent('ripple-right',LIFEBUOY_ART.right,.6)}
  {accent('echo-left',LIFEBUOY_ART.echoLeft,.5)}{accent('echo-right',LIFEBUOY_ART.echoRight,.5)}
 </>;
 return null;
}
