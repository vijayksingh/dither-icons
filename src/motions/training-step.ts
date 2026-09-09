import {actor,motion,pose,light} from './authoring';
/* ── TRAINING STEP / one bounded update ──────────────────────
 *    0ms  parameter point sits on a fixed loss contour
 *  140ms  local slope receives a brief reading light
 *  320ms  the point leaves; a faint origin witness remains
 *  720ms  point reaches a new sample, short of the minimum
 *  800ms  a local ring and normal ticks register the sample
 * 1040ms  hold ends; inspection cues clear
 * 1300ms  preview restores the original point
 * 1500ms  exact rest; no convergence or success assertion
 * MOT-01/03/05/08/16: the curve is the carrier and reference.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,       // Starting parameter sample.
 read:140,     // Read its local direction first.
 depart:320,   // Commit one illustrative step.
 arrive:720,   // Reach the new sample on the slope.
 answer:800,   // Local inspection follows arrival.
 clear:1040,   // Hold ends and evidence clears.
 home:1300,    // Restore the preview's initial value.
 settle:1500,  // Exact rest.
};
export const STEP_GEOMETRY={start:.2,end:.66,radius:1.3};
export const stepPoint=(t:number)=>{const u=1-t;return [u*u*u*3+3*u*u*t*6+3*u*t*t*7.5+t*t*t*13.5,u*u*u*7+3*u*u*t*9+3*u*t*t*18+t*t*t*18];};
export const stepTangent=(t:number)=>[3*(1-t)**2*3+6*(1-t)*t*1.5+3*t*t*6,3*(1-t)**2*2+6*(1-t)*t*9];
export const STEP_ART={
 curve:'M3 7C6 9 7.5 18 13.5 18C17.5 18 19.5 12 21 7',
 band:'M3 6.35C6 8.35 7.5 17.35 13.5 17.35C17.5 17.35 19.5 11.35 21 6.35V7.65C19.5 12.65 17.5 18.65 13.5 18.65C7.5 18.65 6 9.65 3 7.65Z',
 axes:'M2.3 3.5v18h19.4',
};
const smooth=(t:number)=>t*t*(3-2*t);
const segment=(start:number,end:number,from:number,to:number)=>Array.from({length:33},(_,i)=>{const t=i/32;return {at:start+(end-start)*t,t:from+(to-from)*smooth(t)};});
export const STEP_POSES=[{at:TIMING.rest,t:STEP_GEOMETRY.start},...segment(TIMING.depart,TIMING.arrive,STEP_GEOMETRY.start,STEP_GEOMETRY.end),{at:TIMING.clear,t:STEP_GEOMETRY.end},...segment(TIMING.clear,TIMING.home,STEP_GEOMETRY.end,STEP_GEOMETRY.start).slice(1),{at:TIMING.settle,t:STEP_GEOMETRY.start}];
const POINT={origin:'0px 0px'};
const [startX,startY]=stepPoint(STEP_GEOMETRY.start),[endX,endY]=stepPoint(STEP_GEOMETRY.end);
export const trainingStep=motion(TIMING.settle,'Read the slope. Take one considered step.',['Read','Step','Inspect'],[
 ...['training-point','training-knockout'].map(part=>actor(part,POINT.origin,STEP_POSES.map(f=>{const [x,y]=stepPoint(f.t);return pose(f.at,`translate(${x-startX}px,${y-startY}px)`,'linear');}))),
 actor('training-read',`${startX}px ${startY}px`,[light(TIMING.rest,0,'scaleX(.4)'),light(TIMING.read,.9,'scaleX(1)'),light(TIMING.depart,0,'scaleX(1)'),light(TIMING.settle,0,'scaleX(.4)')]),
 actor('training-origin',`${startX}px ${startY}px`,[light(TIMING.rest,0),light(TIMING.depart,0),light(TIMING.arrive,.4),light(TIMING.clear,.4),light(TIMING.home,0),light(TIMING.settle,0)]),
 actor('training-ring',`${endX}px ${endY}px`,[light(TIMING.rest,0,'scale(.55)'),light(TIMING.arrive,0,'scale(.55)'),light(TIMING.answer,.8,'scale(1)'),light(TIMING.clear,0,'scale(1.5)'),light(TIMING.settle,0,'scale(.55)')]),
 ...['training-normal-upper','training-normal-lower'].map(part=>actor(part,`${endX}px ${endY}px`,[light(TIMING.rest,0,'scale(.7)'),light(TIMING.arrive,0,'scale(.7)'),light(TIMING.answer,.8,'scale(1)'),light(TIMING.clear,0,'scale(1.25)'),light(TIMING.settle,0,'scale(.7)')])),
]);
