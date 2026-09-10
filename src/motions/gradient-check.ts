import {actor,motion,pose,light} from './authoring';
/* ── GRADIENT CHECK / inspect from both sides ────────────────
 *    0ms  fixed function, center tangent, two spaced probes
 *  140ms  probes take up a little symmetric clearance
 *  560ms  both probes reach the smaller neighborhood
 *  650ms  local center witness responds to the paired arrival
 *  910ms  inspection clears before the neighborhood restores
 * 1280ms  exact original samples and chord
 * 1500ms  end; no checkmark or numerical correctness claim
 * MOT-01/03/05/16: derive both samples and chord from one span.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,       // Original symmetric neighborhood.
 pickup:140,   // Brief extra clearance.
 inspect:560,  // Both probes arrive together.
 answer:650,   // Inspect the center after arrival.
 clear:910,    // Clear the local response.
 home:1280,    // Restore the original samples and chord.
 settle:1500,  // Exact rest.
};
export const GRADIENT_GEOMETRY={center:12,restSpan:6,pickupSpan:6.25,inspectSpan:2.5,radius:1.25};
export const gradientY=(x:number)=>15-.5*(x-12)-.04*(x-12)**2;
export const GRADIENT_ART={
 curve:'M3 16.26Q12 18.24 21 7.26',
 band:'M3 15.66Q12 17.64 21 6.66L21 7.86Q12 18.84 3 16.86Z',
 axes:'M2.5 5v16h19',
 tangent:'M9.2 16.4 14.8 13.6',
 chord:'M6 16.56 18 10.56',
 witness:'M11.25 18.8 12 18.05 12.75 18.8',
};
// Every pose, including interpolation, shares the same span and y offset.
// The quadratic's symmetric secant slope is constant; only its offset changes.
export const gradientPose=(span:number,side:-1|1)=>({x:12+side*span,y:gradientY(12+side*span)});
export const gradientChord=(span:number)=>{const s=span/6;return `matrix(${s},${-.5*(s-1)},0,1,0,${-.04*span*span+1.44})`;};
const smooth=(t:number)=>t*t*(3-2*t);
const segment=(from:number,to:number,start:number,end:number)=>Array.from({length:25},(_,i)=>{const t=i/24;return {at:start+(end-start)*t,span:from+(to-from)*smooth(t)};});
export const GRADIENT_POSES=[...segment(6,6.25,TIMING.rest,TIMING.pickup),...segment(6.25,2.5,TIMING.pickup,TIMING.inspect).slice(1),{at:TIMING.clear,span:2.5},...segment(2.5,6,TIMING.clear,TIMING.home).slice(1),{at:TIMING.settle,span:6}];
const PROBE={origin:'0px 0px',sides:[-1,1] as const};
const CHORD={origin:'12px 13.56px'};
export const gradientCheck=motion(TIMING.settle,'Two probes sample either side of the center.',['Sample','Narrow','Inspect'],[
 ...PROBE.sides.flatMap((side,i)=>['probe','knockout'].map(kind=>actor(`gradient-${kind}-${i}`,PROBE.origin,GRADIENT_POSES.map(({at,span})=>{const p=gradientPose(span,side),rest=gradientPose(6,side);return pose(at,`translate(${p.x-rest.x}px,${p.y-rest.y}px)`,'linear');})))),
 actor('gradient-chord',CHORD.origin,GRADIENT_POSES.map(({at,span})=>pose(at,gradientChord(span),'linear'))),
 actor('gradient-center','12px 15px',[light(TIMING.rest,0,'scale(.65)'),light(TIMING.inspect,0,'scale(.65)'),light(TIMING.answer,.9,'scale(1)'),light(TIMING.clear,0,'scale(1.3)'),light(TIMING.settle,0,'scale(.65)')]),
 actor('gradient-witness','12px 18.4px',[light(TIMING.rest,0,'translateY(.25px)'),light(TIMING.inspect,0,'translateY(.25px)'),light(TIMING.answer,.8,'translateY(0px)'),light(TIMING.clear,0,'translateY(.3px)'),light(TIMING.settle,0,'translateY(.25px)')]),
]);
