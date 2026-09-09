import {dataFlow} from './motions/data-flow';
import {learningPractice} from './motions/learning-practice';
import {learningWorkflow} from './motions/learning-workflow';
import {platformTools} from './motions/platform-tools';
import {learning} from './motions/learning';
import {platformNavigation} from './motions/platform-navigation';
import {communication} from './motions/communication';
import {media} from './motions/media';
import {files} from './motions/files';
import {navigation} from './motions/navigation';
import {development} from './motions/development';
import {controls} from './motions/controls';
import {presence} from './motions/presence';
import {atmosphere} from './motions/atmosphere';
/**
 * ONE MOTION LANGUAGE — one clock, individually authored mechanical parts.
 *
 * Bell       0ms brace; 120ms swing; 190ms clapper strikes; 940ms settle.
 * Heart      0ms gather; 130ms release; 240ms flecks travel; 820ms settle.
 * Download   0ms lift; 170ms fall; 460ms catch; 690ms rebound; 1120ms settle.
 * Layers     0ms compress; 180ms fan out; 540ms read; 1120ms stack settles.
 *
 * Tracks share a time origin. The browser interpolates transform / opacity;
 * pointer leave never cuts a performance short. No recurring animation loop.
 */
export type Frame = { at:number; transform?:string; opacity?:number; easing?:string };
export type Track = { part:string; origin:string; frames:Frame[] };
export type Study = { duration:number; caption:string; stages:string[]; tracks:Track[] };
const EASE={settle:'cubic-bezier(.22,1,.36,1)',accelerate:'cubic-bezier(.55,0,.85,.45)',smooth:'cubic-bezier(.4,0,.2,1)'};
const track=(part:string,origin:string,frames:Frame[]):Track=>({part,origin,frames});
export const studies:Record<string,Study>={
 ...learningWorkflow,...learningPractice,...dataFlow,...platformTools,...navigation,...files,...learning,...platformNavigation,...communication,...media,...development,...controls,...presence,...atmosphere,
 bell:{duration:940,caption:'A little weight. A lingering ring.',stages:['Anticipate','Strike','Resonate'],tracks:[
  track('shell','12px 5px',[
   {at:0,transform:'rotate(0deg)',easing:EASE.smooth},{at:100,transform:'rotate(-7deg)',easing:EASE.accelerate},
   {at:230,transform:'rotate(18deg)',easing:EASE.smooth},{at:400,transform:'rotate(-12deg)',easing:EASE.smooth},
   {at:570,transform:'rotate(6deg)',easing:EASE.smooth},{at:720,transform:'rotate(-2.5deg)',easing:EASE.smooth},{at:850,transform:'rotate(.7deg)'},{at:940,transform:'rotate(0deg)'}]),
  track('clapper','12px 15px',[
   {at:0,transform:'rotate(0deg)'},{at:110,transform:'rotate(4deg)',easing:EASE.smooth},{at:280,transform:'rotate(-24deg)',easing:EASE.smooth},
   {at:450,transform:'rotate(18deg)',easing:EASE.smooth},{at:630,transform:'rotate(-9deg)',easing:EASE.smooth},{at:790,transform:'rotate(3deg)'},{at:940,transform:'rotate(0deg)'}]),
  track('ring-right','18px 9px',[{at:0,opacity:0,transform:'translateX(-1px) scale(.85)'},{at:210,opacity:0,transform:'translateX(-1px) scale(.85)'},{at:310,opacity:.85,transform:'translateX(0px) scale(1)'},{at:570,opacity:0,transform:'translateX(1.2px) scale(1.08)'},{at:940,opacity:0}]),
  track('ring-left','6px 9px',[{at:0,opacity:0,transform:'translateX(1px) scale(.85)'},{at:380,opacity:0,transform:'translateX(1px) scale(.85)'},{at:490,opacity:.6,transform:'translateX(0px) scale(1)'},{at:740,opacity:0,transform:'translateX(-1px) scale(1.08)'},{at:940,opacity:0}]),
 ]},
 heart:{duration:820,caption:'Gather, open, let a little joy escape.',stages:['Gather','Bloom','Exhale'],tracks:[
  track('heart','12px 13px',[{at:0,transform:'scale(1,1)',easing:EASE.smooth},{at:130,transform:'scale(.88,.93)',easing:EASE.settle},{at:310,transform:'scale(1.13,1.07)',easing:EASE.smooth},{at:470,transform:'scale(.985,1.025)',easing:EASE.smooth},{at:640,transform:'scale(1.02,.995)'},{at:820,transform:'scale(1,1)'}]),
  track('heart-light','12px 13px',[{at:0,opacity:0},{at:130,opacity:0},{at:280,opacity:.55},{at:560,opacity:0},{at:820,opacity:0}]),
  ...[[-1,-1],[1,-1],[-1,.5],[1,.5]].map(([x,y],i)=>track(`fleck-${i}`,'12px 12px',[
   {at:0,opacity:0,transform:'translate(0px,0px) scale(.4)'},{at:180+i*18,opacity:0,transform:'translate(0px,0px) scale(.4)'},
   {at:290+i*18,opacity:.8,transform:`translate(${x*.8}px,${y*.8}px) scale(1)`},
   {at:560+i*18,opacity:0,transform:`translate(${x*2}px,${y*2}px) scale(.5)`},{at:820,opacity:0}]))
 ]},
 download:{duration:1120,caption:'The arrow leads. The tray catches.',stages:['Lift','Receive','Settle'],tracks:[
  track('arrow','12px 12px',[
   {at:0,transform:'translateY(0px) scale(1)',easing:EASE.smooth},
   {at:170,transform:'translateY(-1.3px) scale(.98,1.025)',easing:EASE.accelerate},
   {at:380,transform:'translateY(1.7px) scale(1)',easing:EASE.smooth},
   {at:470,transform:'translateY(1.2px) scale(1.055,.94)',easing:EASE.settle},
   {at:730,transform:'translateY(-.35px) scale(.99,1.015)',easing:EASE.smooth},
   {at:940,transform:'translateY(.12px) scale(1)'},{at:1120,transform:'translateY(0px) scale(1)'}]),
  track('tray','12px 20px',[
   {at:0,transform:'translateY(0px) scale(1)'},{at:365,transform:'translateY(0px) scale(1)',easing:EASE.smooth},
   {at:460,transform:'translateY(.75px) scale(1.07,.87)',easing:EASE.settle},
   {at:710,transform:'translateY(-.2px) scale(.99,1.02)'},{at:910,transform:'translateY(0px) scale(1)'},{at:1120,transform:'translateY(0px) scale(1)'}]),
  track('receive-light','12px 20px',[
   {at:0,opacity:0,transform:'scaleX(.3)'},{at:360,opacity:0,transform:'scaleX(.3)'},{at:485,opacity:.8,transform:'scaleX(.7)'},
   {at:690,opacity:.25,transform:'scaleX(1)'},{at:860,opacity:0,transform:'scaleX(1)'},{at:1120,opacity:0}]),
  ...[-1,1].map((x,i)=>track(`catch-${i}`,'12px 20px',[{at:0,opacity:0,transform:'translateX(0px)'},{at:410,opacity:0,transform:'translateX(0px)'},{at:480,opacity:.6,transform:`translateX(${x*.5}px)`},{at:700,opacity:0,transform:`translateX(${x*1.2}px)`},{at:1120,opacity:0}]))
 ]},
 layers:{duration:1120,caption:'Make room, reveal the depth, fit back together.',stages:['Gather','Separate','Nest'],tracks:[
  track('plane-bottom','12px 16px',[{at:0,transform:'translateY(0px)'},{at:120,transform:'translateY(-.65px)',easing:EASE.settle},{at:380,transform:'translateY(2.3px)'},{at:610,transform:'translateY(2.3px)',easing:EASE.smooth},{at:850,transform:'translateY(-.3px)'},{at:1010,transform:'translateY(0px)'},{at:1120,transform:'translateY(0px)'}]),
  track('plane-middle','12px 12px',[{at:0,transform:'translate(0px,0px)'},{at:170,transform:'translate(0px,0px)',easing:EASE.settle},{at:430,transform:'translate(1px,-.3px)'},{at:650,transform:'translate(1px,-.3px)',easing:EASE.smooth},{at:920,transform:'translate(-.2px,.3px)'},{at:1070,transform:'translate(0px,0px)'},{at:1120,transform:'translate(0px,0px)'}]),
  track('plane-top','12px 8px',[{at:0,transform:'translateY(0px)'},{at:120,transform:'translateY(.8px)',easing:EASE.settle},{at:400,transform:'translateY(-3px)'},{at:620,transform:'translateY(-3px)',easing:EASE.smooth},{at:930,transform:'translateY(.5px)'},{at:1120,transform:'translateY(0px)'}]),
  track('guides','12px 12px',[{at:0,opacity:0},{at:260,opacity:0},{at:450,opacity:.25},{at:650,opacity:.25},{at:850,opacity:0},{at:1120,opacity:0}])
 ]}
};
export function keyframesFor(study:Study,track:Track):Keyframe[]{return track.frames.map(({at,...frame})=>({...frame,offset:at/study.duration}));}
/** Same choreography travels with a standalone SVG as a CSS hover fallback. */
export function styleForStudy(name:string):string{
 const study=studies[name];if(!study)return '';
 return study.tracks.map(track=>{
  const animation=`di-${name}-${track.part}`;
  const selector=`.di-icon[data-icon="${name}"] [data-part="${track.part}"]`;
  const trigger=`.di-icon[data-icon="${name}"][data-animate=true]:not([data-motion-runtime=true]):is(:hover,:focus-visible)`;
  const parent=`.di-trigger:is(:hover,:focus-visible) .di-icon[data-icon="${name}"][data-animate=true]:not([data-motion-runtime=true])`;
  const frames=track.frames.map(({at,easing,...props})=>`${100*at/study.duration}%{${Object.entries(props).map(([k,v])=>`${k}:${v}`).join(';')}${easing?`;animation-timing-function:${easing}`:''}}`).join('');
  return `${selector}{transform-box:view-box;transform-origin:${track.origin}}${trigger} [data-part="${track.part}"],${parent} [data-part="${track.part}"]{animation:${animation} ${study.duration}ms linear both}@keyframes ${animation}{${frames}}`;
 }).join('')+'@media(prefers-reduced-motion:reduce){.di-icon [data-part]{animation:none!important}}';
}
