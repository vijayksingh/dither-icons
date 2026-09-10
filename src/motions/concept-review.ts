import {actor,motion,pose,light} from './authoring';
/* ── CONCEPT REVIEW / return to an earlier idea ───────────────
 *    0ms  two intact cards and a visible returning arrow
 *  150ms  front card starts opening a view of the earlier card
 *  420ms  front card is held aside; the old content stays in place
 *  430ms  a fine signal starts up the fixed return arc
 *  700ms  signal arrives at the old card's line
 *  780ms  the earlier line answers; a close reading witness follows
 *  950ms  the recall cue clears before the card closes
 * 1250ms  front card nests into its original position
 * 1480ms  exact rest; no automatic answer reveal
 * MOT-01/03/05/08/16: returning reveals the earlier reference.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,         // Both cards and return route present.
 prepare:150,    // Deliberate opening begins.
 open:420,       // Earlier card is visible before the signal.
 depart:430,     // Return signal leaves the lower arc.
 arrive:700,     // Return signal reaches the old content.
 read:780,       // Old content acknowledges the arrival.
 clear:950,      // Clear the reading cue before closure.
 home:1250,      // Restore the overlap.
 settle:1480,    // Exact rest.
};
export const REVIEW_GEOMETRY={tail:[6.6,17.6] as const,tip:[8.1,7.5] as const,stroke:1.1};
export const REVIEW_ART={
 rear:'M9 2.6h9a1.4 1.4 0 0 1 1.4 1.4v13.4a1.4 1.4 0 0 1-1.4 1.4H9a1.4 1.4 0 0 1-1.4-1.4V4A1.4 1.4 0 0 1 9 2.6Z',
 front:'M10.5 4.8h9.2a1.3 1.3 0 0 1 1.3 1.3v13.5a1.3 1.3 0 0 1-1.3 1.3h-9.2a1.3 1.3 0 0 1-1.3-1.3V6.1a1.3 1.3 0 0 1 1.3-1.3Z',
 frontLine:'M10.5 5.5h9.2a.6.6 0 0 1 .6.6v13.5a.6.6 0 0 1-.6.6h-9.2a.6.6 0 0 1-.6-.6V6.1a.6.6 0 0 1 .6-.6Z',
 arc:'M6.6 17.6C4.55 17.6 3.45 15.35 3.45 12.55C3.45 9.75 4.55 7.5 6.6 7.5H8.1',
 head:'M6.65 6.05 8.1 7.5 6.65 8.95',
 oldLine:'M8.55 7.5H16',oldSecond:'M8.55 10.4h5.6',
 idea:'M15.1 8.4 17.2 10.5 15.1 12.6 13 10.5Z',content:'M12 16h6M12 18h4',
 witness:'M7 3.1H5.8v1.2',
};
// Two tangent-continuous cubic quadrants and a real horizontal neck.
// The sampled light follows the exact drawing, including the arrowhead join.
const cubic=(t:number,a:readonly number[],b:readonly number[],c:readonly number[],d:readonly number[])=>{const u=1-t;return [0,1].map(i=>u*u*u*a[i]+3*u*u*t*b[i]+3*u*t*t*c[i]+t*t*t*d[i]);};
export const reviewPoint=(t:number)=>t<=.45
 ?cubic(t/.45,REVIEW_GEOMETRY.tail,[4.55,17.6],[3.45,15.35],[3.45,12.55])
 :t<=.9?cubic((t-.45)/.45,[3.45,12.55],[3.45,9.75],[4.55,7.5],[6.6,7.5])
 :[6.6+(t-.9)/.1*1.5,7.5];
const CARD={origin:'19px 19.5px',rest:'translateX(0px) rotate(0deg)',open:'translateX(1.1px) rotate(3deg)'};
const TRACE={origin:'6.6px 17.6px',samples:48,ink:.85};
const signalFrames=Array.from({length:TRACE.samples+1},(_,i)=>{const t=i/TRACE.samples,[x,y]=reviewPoint(t);return {...light(TIMING.depart+(TIMING.arrive-TIMING.depart)*t,TRACE.ink,`translate(${x-6.6}px,${y-17.6}px)`),easing:'linear'};});
export const conceptReview=motion(TIMING.settle,'The page opens as the review arrow circles back.',['Open','Recall','Nest'],[
 ...['review-card','review-occlusion'].map(part=>actor(part,CARD.origin,[pose(TIMING.rest,CARD.rest),pose(TIMING.prepare,CARD.rest),pose(TIMING.open,CARD.open),pose(TIMING.read,CARD.open),pose(TIMING.clear,CARD.open),pose(TIMING.home,CARD.rest),pose(TIMING.settle,CARD.rest)])),
 actor('recall-trace',TRACE.origin,[light(TIMING.rest,0,'translate(0px,0px)'),light(TIMING.open,0,'translate(0px,0px)'),...signalFrames,light(TIMING.read,0,'translate(1.5px,-10.1px)'),light(TIMING.settle,0,'translate(0px,0px)')]),
 actor('recall-line','8.55px 7.5px',[light(TIMING.rest,0,'scaleX(.2)'),light(TIMING.arrive,0,'scaleX(.2)'),light(TIMING.read,.95,'scaleX(1)'),light(TIMING.clear,0,'scaleX(1)'),light(TIMING.settle,0,'scaleX(.2)')]),
 actor('recall-witness','7px 4px',[light(TIMING.rest,0,'scale(.75)'),light(TIMING.arrive,0,'scale(.75)'),light(TIMING.read,.8,'scale(1)'),light(TIMING.clear,0,'scale(1)'),light(TIMING.settle,0,'scale(.75)')]),
]);
