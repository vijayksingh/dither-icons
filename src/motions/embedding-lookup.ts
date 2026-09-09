import {actor,motion,pose,light} from './authoring';
/* ── EMBEDDING LOOKUP / address, select, read a copy ──────────
 *    0ms  address token, retained table and separate readout
 *  110ms  address prepares
 *  270ms  token meets its fixed connector
 *  340ms  first component registers (then 420ms, 500ms)
 *  510ms  a trace leaves the selected row's right edge
 *  800ms  trace arrives at the separate vector readout
 *  880ms  vector edge and two receiving marks answer
 * 1060ms  reading light clears; table never changes
 * 1280ms  address returns to its starting position
 * 1520ms  exact rest
 * MOT-03/05/08/14/16: lookup copies a row; it never removes one.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,        // Original table and readout.
 prepare:110,   // Small address pickup.
 address:270,   // Contact the input connector.
 first:340,     // Read the first component.
 second:420,    // Read the second component.
 third:500,     // Read the third component.
 depart:510,    // Result follows complete row selection.
 arrive:800,    // Reach the readout's actual edge.
 answer:880,    // Receiving vector responds.
 clear:1060,    // Clear the reading cues.
 home:1280,     // Restore the address.
 settle:1520,   // Exact rest.
};
export const EMBEDDING_CELLS=[8.2,11.65,15.1] as const;
export const EMBEDDING_ROWS=[4.2,8.5,12.8] as const;
export const EMBEDDING_ART={
 token:'M2.5 7.1h2.6a.7.7 0 0 1 .7.7v1.4a.7.7 0 0 1-.7.7H2.5a.7.7 0 0 1-.7-.7V7.8a.7.7 0 0 1 .7-.7Z',
 matrix:'M7.1 2.4H6.4v5.4M6.4 9.2v5.4h.7M18.7 2.4h.7v5.4M19.4 9.2v5.4h-.7',
 connector:'M6.5 8.5h1.7',
 cell:(x:number,y:number,height:number)=>`M${x+.4} ${y-height/2}h1.8a.4.4 0 0 1 .4.4v${height-.8}a.4.4 0 0 1-.4.4h-1.8a.4.4 0 0 1-.4-.4v${.8-height}a.4.4 0 0 1 .4-.4Z`,
 heights:[[1.8,2.7,2.2],[2.7,1.5,2.2],[2.2,2.7,1.5]] as const,
 outputBracket:'M7.1 18.3H6.4v3.5h.7M18.7 18.3h.7v1M19.4 20.7v1.1h-.7',
 route:'M17.7 8.5H20.8Q21.6 8.5 21.6 9.3V19.2Q21.6 20 20.8 20H17.7',
 outputEdge:'M8.6 22.8h8.3',upper:'M21.6 17.1l.85-.5',lower:'M21.6 22.4l.85.5',
};
// Piecewise exact line/quadratic carrier. Each corner receives its own samples.
const ROUTE=[
 {weight:3.1,point:(t:number)=>[17.7+3.1*t,8.5]},
 {weight:1.3,point:(t:number)=>[20.8+1.6*t-.8*t*t,8.5+.8*t*t]},
 {weight:9.9,point:(t:number)=>[21.6,9.3+9.9*t]},
 {weight:1.3,point:(t:number)=>[21.6-.8*t*t,19.2+1.6*t-.8*t*t]},
 {weight:3.1,point:(t:number)=>[20.8-3.1*t,20]},
];
const ROUTE_WEIGHT=ROUTE.reduce((sum,segment)=>sum+segment.weight,0);
export const embeddingPoint=(t:number)=>{let distance=t*ROUTE_WEIGHT;for(const segment of ROUTE){if(distance<=segment.weight+1e-10)return segment.point(Math.min(1,distance/segment.weight));distance-=segment.weight;}return [17.7,20];};
const TOKEN={origin:'3.8px 8.5px',rest:'translateX(0px)',pickup:'translateX(-.2px)',contact:'translateX(.7px)'};
const TRACE={origin:'17.7px 8.5px',samples:64};
const cornerSamples=ROUTE.slice(0,-1).map((_,i)=>ROUTE.slice(0,i+1).reduce((sum,s)=>sum+s.weight,0)/ROUTE_WEIGHT);
const traceSamples=[...new Set([...Array.from({length:TRACE.samples+1},(_,i)=>i/TRACE.samples),...cornerSamples])].sort((a,b)=>a-b);
const transferFrames=traceSamples.map(t=>{const [x,y]=embeddingPoint(t);return {...light(TIMING.depart+(TIMING.arrive-TIMING.depart)*t,.9,`translate(${x-17.7}px,${y-8.5}px)`),easing:'linear'};});
export const embeddingLookup=motion(TIMING.settle,'Address one row. Read its vector.',['Address','Select','Read'],[
 actor('embedding-address',TOKEN.origin,[pose(TIMING.rest,TOKEN.rest),pose(TIMING.prepare,TOKEN.pickup),pose(TIMING.address,TOKEN.contact),pose(TIMING.clear,TOKEN.contact),pose(TIMING.home,TOKEN.rest),pose(TIMING.settle,TOKEN.rest)]),
 ...[TIMING.first,TIMING.second,TIMING.third].map((at,i)=>actor(`embedding-component-${i}`,`${EMBEDDING_CELLS[i]+1.3}px 8.5px`,[light(TIMING.rest,0,'scale(.85)'),light(at-70,0,'scale(.85)'),light(at,.85,'scale(1)'),light(TIMING.arrive,.2,'scale(1)'),light(TIMING.clear,0,'scale(1)'),light(TIMING.settle,0,'scale(.85)')])),
 actor('embedding-transfer',TRACE.origin,[light(TIMING.rest,0,'translate(0px,0px)'),light(TIMING.third,0,'translate(0px,0px)'),...transferFrames,light(TIMING.answer,0,'translate(0px,11.5px)'),light(TIMING.settle,0,'translate(0px,0px)')]),
 actor('embedding-readout','12.75px 20px',[light(TIMING.rest,0,'scaleX(.75)'),light(TIMING.arrive,0,'scaleX(.75)'),light(TIMING.answer,.85,'scaleX(1)'),light(TIMING.clear,0,'scaleX(1)'),light(TIMING.settle,0,'scaleX(.75)')]),
 actor('embedding-edge','12.75px 22.8px',[light(TIMING.rest,0,'scaleX(.3)'),light(TIMING.arrive,0,'scaleX(.3)'),light(TIMING.answer,.8,'scaleX(1)'),light(TIMING.clear,0,'scaleX(1)'),light(TIMING.settle,0,'scaleX(.3)')]),
 ...['embedding-receive-upper','embedding-receive-lower'].map(part=>actor(part,'21.6px 20px',[light(TIMING.rest,0,'scale(.7)'),light(TIMING.arrive,0,'scale(.7)'),light(TIMING.answer,.7,'scale(1)'),light(TIMING.clear,0,'scale(1.2)'),light(TIMING.settle,0,'scale(.7)')])),
]);
