import {useId} from 'react';
import type {Draw} from './ExtendedArtwork';
import {EYE_ART} from './motions/eye';
import {SPARKLES_ART} from './motions/sparkles';
import {SUN_ART,SUN_GEOMETRY} from './motions/sun';
import {MOON_ART} from './motions/moon';

type Props={name:string;draw:Draw;texture:'dither'|'solid'|'outline'};
const stroke=(d:string,width=.6)=><path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>;
const accent=(part:string,d:string,width=.6)=><g data-part={part} opacity="0">{stroke(d,width)}</g>;

export function AppearanceArtwork({name,draw,texture}:Props){
 const aperture=useId().replace(/:/g,'')+'-aperture';
 if(name==='eye')return <>
  <defs><clipPath id={aperture}><path d={EYE_ART.aperture}/></clipPath></defs>
  {texture==='outline'?stroke(EYE_ART.centerline,1.65):draw(EYE_ART.outline+EYE_ART.aperture)}
  <g clipPath={`url(#${aperture})`}><g data-part="eye-gaze"><g data-part="eye-iris">
   {texture==='outline'?<><circle cx="12" cy="12" r="2.7" fill="none" stroke="currentColor" strokeWidth="1.4"/><circle cx="12" cy="12" r=".9"/></>:draw(EYE_ART.iris+EYE_ART.catchlight)}
  </g></g></g>
  {accent('eye-answer',EYE_ART.answer,.55)}
 </>;
 if(name==='sparkles')return <>
  <g data-part="spark-main">{draw(SPARKLES_ART.main)}</g>
  <g data-part="spark-satellite">{texture==='outline'?stroke(SPARKLES_ART.satellite,1.05):draw(SPARKLES_ART.satellite)}</g>
  {accent('spark-tips',SPARKLES_ART.tips,.55)}
  {accent('spark-echo',SPARKLES_ART.echo,.5)}
 </>;
 if(name==='sun')return <>
  {draw(SUN_ART.disc)}
  <g data-part="sun-wave" opacity="0"><circle cx="12" cy="12" r={SUN_GEOMETRY.waveRadius} fill="none" stroke="currentColor" strokeWidth=".45"/></g>
  {Array.from({length:8},(_,i)=><g key={i} transform={`rotate(${i*45} 12 12)`}><g data-part={`sun-ray-${i}`}>
   {texture==='outline'?stroke(SUN_ART.rayLine,1.65):draw(SUN_ART.ray)}
  </g></g>)}
  <g data-part="sun-tips" opacity="0">{[0,90,180,270].map(angle=><g key={angle} transform={`rotate(${angle} 12 12)`}>{stroke(SUN_ART.tips,.45)}</g>)}</g>
 </>;
 if(name==='moon')return <g data-part="moon-crescent">
  {draw(MOON_ART.crescent)}
  {accent('moon-rim',MOON_ART.trace,.6)}
  <g data-part="moon-glint" opacity="0"><path d={MOON_ART.glint}/></g>
 </g>;
 return null;
}
