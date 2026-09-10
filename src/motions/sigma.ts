import {actor,motion,light} from './authoring';

/* ── SIGMA / collect terms, then release one result ──────────
 *    0ms  the complete operator is a stable receiving surface
 *  100ms  first term enters (90ms stagger, three terms)
 *  390ms  first term reaches the waist
 *  570ms  the final term arrives; accumulation is now complete
 *  660ms  a contained trace leaves the waist
 *  800ms  the trace turns onto the lower terminal
 *  960ms  the result reaches the terminal; edge light answers
 * 1040ms  two short output witnesses follow the result
 * 1260ms  the output clears without changing the operator
 * 1520ms  exact rest
 * MOT-01/03/05/08/16: output waits for the complete input set.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,          // Stable operator; effects absent.
 first:100,       // First term becomes visible.
 second:190,      // Second term follows.
 third:280,       // Third term follows.
 firstArrival:390,// First term reaches the waist.
 secondArrival:480,// Second term reaches the same waist.
 thirdArrival:570,// Final arrival unlocks the result.
 depart:660,      // Accumulation passes into the lower stroke.
 corner:800,      // Trace follows the actual diagonal to the foot.
 result:960,      // Result reaches the lower terminal.
 echo:1040,       // Exterior witnesses answer the terminal.
 clear:1260,      // Local response dissipates.
 settle:1520,     // Original, still operator.
};
export const SIGMA_GEOMETRY={waist:[12.7,12] as const,corner:[6.5,19] as const,result:[18.2,19] as const};
export const SIGMA_ART={
 body:'M5.7 3.2H19v4h-1.65V5H8.1l6.1 7-6.1 7h9.25v-2.2H19v4H5.7a.85.85 0 0 1-.64-1.4l6.9-7.4-6.9-7.4a.85.85 0 0 1 .64-1.4Z',
 line:'M18.2 6.2V4.1H5.9l7.2 7.9-7.2 7.9h12.3v-2.2',
 terminal:'M17.95 17.2v2.2h-2.4',
 upperWitness:'M20.5 17.5l1.25-.45',lowerWitness:'M20.5 20l1.25.45',
};
export const SIGMA_TERMS=[
 {part:'term-upper',start:TIMING.first,arrival:TIMING.firstArrival,x:3.2,y:7.3},
 {part:'term-middle',start:TIMING.second,arrival:TIMING.secondArrival,x:2.5,y:12},
 {part:'term-lower',start:TIMING.third,arrival:TIMING.thirdArrival,x:3.2,y:16.7},
];
const TERM={small:'scale(.45)',ink:.85,ease:'cubic-bezier(.5,0,.35,1)'};
const TRACE={origin:'12.7px 12px',rest:'translate(0px,0px)',corner:'translate(-6.2px,7px)',result:'translate(5.5px,7px)',ink:.9};
const RECEIVER={origin:'12.7px 12px',small:'scale(.5)',full:'scale(1.35)',ink:.85};
const RESULT={origin:'18px 19px',small:'scale(.7)',full:'scale(1)',ink:.95};
export const sigma=motion(TIMING.settle,'Terms gather at the operator before a result leaves.',['Gather','Combine','Release'],[
 ...SIGMA_TERMS.map(t=>{
  const start=`translate(${t.x-12.7}px,${t.y-12}px) ${TERM.small}`;
  const arrival='translate(0px,0px) scale(.85)';
  return actor(t.part,TRACE.origin,[light(TIMING.rest,0,start),{...light(t.start,TERM.ink,start),easing:TERM.ease},light(t.arrival,TERM.ink,arrival),light(t.arrival+(TIMING.depart-TIMING.thirdArrival),0,arrival),light(TIMING.settle,0,start)]);
 }),
 actor('sum-receiver',RECEIVER.origin,[light(TIMING.rest,0,RECEIVER.small),light(TIMING.firstArrival,.3,'scale(.7)'),light(TIMING.secondArrival,.55,'scale(1)'),light(TIMING.thirdArrival,RECEIVER.ink,RECEIVER.full),light(TIMING.depart,0,RECEIVER.full),light(TIMING.settle,0,RECEIVER.small)]),
 actor('sum-trace',TRACE.origin,[light(TIMING.rest,0,TRACE.rest),light(TIMING.thirdArrival,0,TRACE.rest),light(TIMING.depart,TRACE.ink,TRACE.rest),{...light(TIMING.corner,TRACE.ink,TRACE.corner),easing:'cubic-bezier(.25,.6,.4,1)'},light(TIMING.result,TRACE.ink,TRACE.result),light(TIMING.echo,0,TRACE.result),light(TIMING.settle,0,TRACE.rest)]),
 actor('sum-terminal',RESULT.origin,[light(TIMING.rest,0,RESULT.small),light(TIMING.corner,0,RESULT.small),light(TIMING.result,RESULT.ink,RESULT.full),light(TIMING.clear,0,RESULT.full),light(TIMING.settle,0,RESULT.small)]),
 ...['output-upper','output-lower'].map(part=>actor(part,'19px 19px',[light(TIMING.rest,0,'translateX(-.3px)'),light(TIMING.result,0,'translateX(-.3px)'),light(TIMING.echo,.75,'translateX(0px)'),light(TIMING.clear,0,'translateX(.6px)'),light(TIMING.settle,0,'translateX(-.3px)')])),
]);
