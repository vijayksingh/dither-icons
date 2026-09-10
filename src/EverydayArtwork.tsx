import {useId} from 'react';
import type {Draw} from './ExtendedArtwork';
import {SEARCH_ART,SEARCH_GEOMETRY} from './motions/search';
import {HOME_ART} from './motions/home';
import {SETTINGS_ART} from './motions/settings';
import {USER_ART} from './motions/user';

type Props={name:string;draw:Draw;texture:'dither'|'solid'|'outline'};
const line=(d:string,width=.6)=><path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>;
const accent=(part:string,d:string,width=.6)=><g data-part={part} opacity="0">{line(d,width)}</g>;
const MASK={maskUnits:'userSpaceOnUse' as const,x:-24,y:-24,width:72,height:72};

export function EverydayArtwork({name,draw,texture}:Props){
 const id=useId().replace(/:/g,'')+'-everyday';
 if(name==='search')return <g data-part="magnifier">
  <defs><clipPath id={`${id}-glass`}><circle cx={SEARCH_GEOMETRY.cx} cy={SEARCH_GEOMETRY.cy} r={SEARCH_GEOMETRY.innerRadius-.3}/></clipPath></defs>
  {texture==='outline'?<><circle cx="9.8" cy="9.8" r="5.48" fill="none" stroke="currentColor" strokeWidth="1.65"/>{line('M13.75 13.75 20.45 20.45',1.85)}</>:draw(SEARCH_ART.body)}
  <g clipPath={`url(#${id}-glass)`}>
   {accent('glass-reflection',SEARCH_ART.reflection,.7)}
   {accent('focus-brackets',SEARCH_ART.brackets,.55)}
  </g>
  {accent('lens-rim',SEARCH_ART.rim,.55)}
 </g>;
 if(name==='home')return <>
  <defs><mask id={`${id}-door`} {...MASK}><rect x="-24" y="-24" width="72" height="72" fill="white"/><g data-part="home-door-occlusion"><path d={HOME_ART.door} fill="black" stroke="black" strokeWidth={texture==='outline'?.65:0}/></g></mask></defs>
  {texture==='outline'?line(HOME_ART.house,1.25):draw(HOME_ART.house)}
  <g data-part="welcome-spill" opacity="0"><path d={HOME_ART.spill}/></g>
  <g mask={`url(#${id}-door)`}>
   <g data-part="interior-light" opacity="0"><path d={HOME_ART.interior}/></g>
   {accent('threshold-light',HOME_ART.threshold,.65)}
  </g>
  <g data-part="home-door"><g opacity=".72">{texture==='outline'?line(HOME_ART.door,.8):draw(HOME_ART.door)}</g>{accent('door-edge',HOME_ART.seam,.45)}<circle cx="13.4" cy="17.5" r=".23" opacity=".75"/></g>
 </>;
 if(name==='settings')return <g data-part="settings-gear">
   {texture==='outline'?line(SETTINGS_ART.gear,1.05):draw(SETTINGS_ART.gear)}
   {accent('tooth-light',SETTINGS_ART.rim,.65)}
   {accent('rim-ticks',SETTINGS_ART.ticks,.5)}
 </g>;
 if(name==='user')return <>
  <g data-part="profile-shoulders">{texture==='outline'?line(USER_ART.shoulders,1.4):draw(USER_ART.shoulders)}{accent('shoulder-light',USER_ART.shoulder,.5)}</g>
  <g data-part="profile-head">{texture==='outline'?line(USER_ART.head,1.4):draw(USER_ART.head)}{accent('cheek-light',USER_ART.cheek,.55)}</g>
  {USER_ART.greeting.map((d,i)=><g key={d} data-part={`greeting-${i}`} opacity="0">{line(d,.6)}</g>)}
 </>;
 return null;
}
