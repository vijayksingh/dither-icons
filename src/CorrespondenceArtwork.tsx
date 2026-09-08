import {useId} from 'react';
import type {Draw} from './ExtendedArtwork';
import {BOOK_ART} from './motions/book';
import {MAIL_ART,MAIL_HINGE} from './motions/mail';
import {MESSAGE_ART} from './motions/message';
import {SEND_ART} from './motions/send';

type Props={name:string;draw:Draw;texture:'dither'|'solid'|'outline'};
const line=(d:string,width=.55)=><path d={d} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>;
const accent=(part:string,d:string,width=.55)=><g data-part={part} opacity="0">{line(d,width)}</g>;
const cutout=(d:string,width:number)=><path d={d} fill="black" stroke="black" strokeWidth={width} strokeLinejoin="round"/>;

/** Surfaces and their occluders use the same tracks, including opacity.
 * Mail's two fixed half-planes establish which side of its hinge is in front.
 * No opacity toggle or z-order jump is needed when the flap crosses edge-on. */
export function CorrespondenceArtwork({name,draw,texture}:Props){
 const id=useId().replace(/:/g,'')+'-correspondence';
 if(name==='book')return <>
  <defs><mask id={`${id}-page`} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
   <rect width="24" height="24" fill="white"/>
   <g data-part="page-occlusion" opacity="0">{cutout(BOOK_ART.right,BOOK_ART.separation)}</g>
  </mask></defs>
  <g mask={`url(#${id}-page)`}>
   <g data-part="left-bed"><g opacity=".72">{draw(BOOK_ART.left)}</g></g>
   {draw(BOOK_ART.right+(texture!=='outline'?BOOK_ART.rightCuts:''))}
   {texture==='outline'&&<g opacity=".5">{line(BOOK_ART.rightLines,.5)}</g>}
  </g>
  <g data-part="turning-page" opacity="0">
   {draw(BOOK_ART.right)}
   {accent('page-edge',BOOK_ART.edge,.5)}
   {accent('landing-light',BOOK_ART.landing,.6)}
  </g>
  <g opacity=".55">{line(BOOK_ART.spine,.6)}</g>
  {accent('page-air',BOOK_ART.air,.6)}
 </>;
 if(name==='mail')return <>
  <defs>
   <clipPath id={`${id}-front`}><rect y={MAIL_HINGE.y} width="24" height={24-MAIL_HINGE.y}/></clipPath>
   <clipPath id={`${id}-rear`}><rect width="24" height={MAIL_HINGE.y}/></clipPath>
   <mask id={`${id}-pocket`} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="white"/>{cutout(MAIL_ART.pocket,MAIL_ART.separation)}
   </mask>
   <mask id={`${id}-flap`} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="white"/>
    <g clipPath={`url(#${id}-front)`}><g data-part="flap-occlusion">{cutout(MAIL_ART.flap,MAIL_ART.separation)}</g></g>
   </mask>
   <mask id={`${id}-letter`} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="white"/>
    <g data-part="letter-occlusion">{cutout(MAIL_ART.letter,MAIL_ART.separation)}</g>
   </mask>
   <mask id={`${id}-letter-rear`} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="white"/>
    <g clipPath={`url(#${id}-rear)`}><g data-part="letter-rear-occlusion">{cutout(MAIL_ART.letter,MAIL_ART.separation)}</g></g>
   </mask>
  </defs>
  <g mask={`url(#${id}-pocket)`}>
   <g mask={`url(#${id}-letter)`}><g mask={`url(#${id}-flap)`}><g opacity=".4">{draw(MAIL_ART.back)}</g></g></g>
   <g mask={`url(#${id}-letter-rear)`}><g data-part="flap"><g opacity=".72">{draw(MAIL_ART.flap)}</g></g></g>
   <g mask={`url(#${id}-flap)`}><g data-part="letter">
    {draw(MAIL_ART.letter+(texture!=='outline'?MAIL_ART.cuts:''))}
    {texture==='outline'&&<g opacity=".5">{line(MAIL_ART.lines,.5)}</g>}
    {accent('letter-edge',MAIL_ART.edge,.5)}
   </g></g>
  </g>
  {draw(MAIL_ART.pocket+(texture!=='outline'?MAIL_ART.seamCuts:''))}
  {texture==='outline'&&<g opacity=".5">{line(MAIL_ART.seams,.5)}</g>}
  {accent('closure-light',MAIL_ART.closure,.55)}
  {accent('reveal-rays',MAIL_ART.rays,.6)}
 </>;
 if(name==='message'){
  const dots=(ink:string)=>MESSAGE_ART.dots.map(({part,x})=><g data-part={part} key={part}>
   <circle cx={x} cy={MESSAGE_ART.dotY} r={MESSAGE_ART.radius} fill={ink}/>
  </g>);
  return <>
   {texture!=='outline'?<>
    <defs><mask id={`${id}-dots`} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
     <rect width="24" height="24" fill="white"/>{dots('black')}
    </mask></defs>
    <g mask={`url(#${id}-dots)`}>{draw(MESSAGE_ART.bubble)}</g>
   </>:<>{draw(MESSAGE_ART.bubble)}{dots('currentColor')}</>}
   {accent('reply-edge',MESSAGE_ART.edge,.55)}
   {accent('reply-echo',MESSAGE_ART.echo,.6)}
  </>;
 }
 if(name==='send')return <>
  <g data-part="plane">
   <g opacity=".78">{draw(SEND_ART.upper)}</g>
   <g data-part="lower-wing">{draw(SEND_ART.lower)}</g>
   <g opacity=".45">{line(SEND_ART.keel,.45)}</g>
   {accent('crease-light',SEND_ART.glint,.6)}
  </g>
  {accent('wake-near',SEND_ART.wakeNear,.65)}
  {accent('wake-far',SEND_ART.wakeFar,.55)}
 </>;
 return null;
}
