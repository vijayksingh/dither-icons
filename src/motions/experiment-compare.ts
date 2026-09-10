import {actor,motion,pose,light} from './authoring';
/* ── EXPERIMENT COMPARE / align attention, preserve results ──
 *    0ms  two distinct plots, one shared viewing reference
 *  150ms  make a little room between the windows
 *  360ms  both panes are ready before sampling starts
 *  380ms  paired cursors start at the same normalized position
 *  820ms  cursors reach the two different endpoint values
 *  900ms  local endpoint rings and shared divider answer
 * 1060ms  sampling clears
 * 1300ms  windows restore their spacing
 * 1520ms  exact rest; no winner is invented
 * MOT-03/05/08/16: the same question visits different data.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,       // Two distinct plots remain visible.
 prepare:150,  // Begin making room.
 open:360,     // Panes are ready before sampling.
 scan:380,     // Shared normalized sampling begins.
 arrive:820,   // Each cursor reaches its own endpoint.
 answer:900,   // Paired local registration.
 clear:1060,   // Clear sampling cues.
 home:1300,    // Restore spacing.
 settle:1520,  // Exact rest.
};
export const COMPARE_GEOMETRY={starts:[4.7,14.9],width:4.4,ys:[[15,6.5,18,9.5],[15.5,17,6,9.2]]} as const;
export const comparePoint=(side:number,t:number)=>{const u=1-t,y=COMPARE_GEOMETRY.ys[side];return [COMPARE_GEOMETRY.starts[side]+4.4*t,u*u*u*y[0]+3*u*u*t*y[1]+3*u*t*t*y[2]+t*t*t*y[3]];};
export const COMPARE_ART={
 pane:(x:number)=>`M${x+.9} 4.2h6.3a.9.9 0 0 1 .9.9v13.8a.9.9 0 0 1-.9.9h-6.3a.9.9 0 0 1-.9-.9V5.1a.9.9 0 0 1 .9-.9Zm.15 1.1v13.4h6V5.3Z`,
 outline:(x:number)=>`M${x+.9} 4.75h6.3a.35.35 0 0 1 .35.35v13.8a.35.35 0 0 1-.35.35h-6.3a.35.35 0 0 1-.35-.35V5.1a.35.35 0 0 1 .35-.35Z`,
 plots:['M4.7 15C6.166666667 6.5 7.633333333 18 9.1 9.5','M14.9 15.5C16.366666667 17 17.833333333 6 19.3 9.2'],
 divider:'M12 6.3v11.4',receipt:'M10.5 21h3M12 20.2v1.6',
};
const PANE={origins:['6.85px 12px','17.15px 12px'],offsets:[-.35,.35]};
const CURSOR={origin:'0px 0px',samples:36,ink:.85};
const scanFrames=(side:number,kind:'cursor'|'point')=>Array.from({length:CURSOR.samples+1},(_,i)=>{const t=i/CURSOR.samples,[x,y]=comparePoint(side,t);return {...light(TIMING.scan+(TIMING.arrive-TIMING.scan)*t,kind==='cursor'?.26:CURSOR.ink,`translate(${x}px,${kind==='cursor'?0:y}px)`),easing:'linear'};});
export const experimentCompare=motion(TIMING.settle,'Two panes scan from a shared reference line.',['Separate','Scan','Compare'],[
 ...[0,1].flatMap(i=>[
  actor(`compare-pane-${i}`,PANE.origins[i],[pose(TIMING.rest,'translateX(0px)'),pose(TIMING.prepare,'translateX(0px)'),pose(TIMING.open,`translateX(${PANE.offsets[i]}px)`),pose(TIMING.clear,`translateX(${PANE.offsets[i]}px)`),pose(TIMING.home,'translateX(0px)'),pose(TIMING.settle,'translateX(0px)')]),
  ...(['cursor','point'] as const).map(kind=>{const p=comparePoint(i,0),q=comparePoint(i,1),rest=`translate(${p[0]}px,${kind==='cursor'?0:p[1]}px)`,end=`translate(${q[0]}px,${kind==='cursor'?0:q[1]}px)`;return actor(`compare-${kind}-${i}`,CURSOR.origin,[light(TIMING.rest,0,rest),light(TIMING.open,0,rest),...scanFrames(i,kind),light(TIMING.answer,kind==='cursor'?.26:.85,end),light(TIMING.clear,0,end),light(TIMING.settle,0,rest)]);}),
  actor(`compare-response-${i}`,`${comparePoint(i,1)[0]}px ${comparePoint(i,1)[1]}px`,[light(TIMING.rest,0,'scale(.55)'),light(TIMING.arrive,0,'scale(.55)'),light(TIMING.answer,.8,'scale(1)'),light(TIMING.clear,0,'scale(1.5)'),light(TIMING.settle,0,'scale(.55)')]),
 ]),
 actor('compare-receipt','12px 21px',[light(TIMING.rest,0,'scaleX(.4)'),light(TIMING.arrive,0,'scaleX(.4)'),light(TIMING.answer,.7,'scaleX(1)'),light(TIMING.clear,0,'scaleX(1)'),light(TIMING.settle,0,'scaleX(.4)')]),
]);
