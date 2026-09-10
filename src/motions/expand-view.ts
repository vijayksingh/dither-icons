import {actor,motion,pose,light} from './authoring';
/* ── EXPAND VIEW / room around a stable subject ─────────────
 *    0ms  four rigid corners; content remains fixed
 *  130ms  corners gather inward by .3px
 *  470ms  opposing corners open to 1.9px
 *  580ms  frame settles at its 1.6px expanded extent
 *  660ms  first diagonal pair answers; second at 710ms
 *  940ms  corner echoes clear
 * 1240ms  original boundary restored
 * 1440ms  exact rest
 * MOT-01/03/05/08/16: more room, no zoom or navigation claim.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,      // Preserve the fixed subject.
 prepare:130, // Gather the frame.
 extend:470,  // Open beyond the held extent.
 seat:580,    // Settle the four corners.
 first:660,   // First diagonal pair responds.
 second:710,  // Second pair follows quietly.
 clear:940,   // Clear the local echoes.
 home:1240,   // Restore the original frame.
 settle:1440, // Exact rest.
};
export const EXPAND_CORNERS=[{x:-1,y:-1,angle:0},{x:1,y:-1,angle:90},{x:1,y:1,angle:180},{x:-1,y:1,angle:270}] as const;
export const EXPAND_ART={
 corner:'M9.3 5.3H6.4a1.1 1.1 0 0 0-1.1 1.1v2.9h1.4V6.7h2.6Z',
 cornerLine:'M9.3 6H6v3.3',
 echo:'M7.3 3.9H4.7a.8.8 0 0 0-.8.8v2.6',
 content:'M9.5 10.8h5M9.5 13.2h3.2',
};
const FRAME={origin:'12px 12px',pickup:-.3,extended:1.9,seated:1.6};
const poses=[{at:TIMING.rest,r:0},{at:TIMING.prepare,r:FRAME.pickup},{at:TIMING.extend,r:FRAME.extended},{at:TIMING.seat,r:FRAME.seated},{at:TIMING.clear,r:FRAME.seated},{at:TIMING.home,r:0},{at:TIMING.settle,r:0}];
export const expandView=motion(TIMING.settle,'The frame expands around a fixed center.',['Gather','Expand','Breathe'],[
 ...EXPAND_CORNERS.flatMap((c,i)=>[
  actor(`expand-corner-${i}`,FRAME.origin,poses.map(p=>pose(p.at,`translate(${c.x*p.r}px,${c.y*p.r}px)`))),
  actor(`expand-echo-${i}`,`${c.x<0?6:18}px ${c.y<0?6:18}px`,[light(TIMING.rest,0,'scale(.85)'),light(TIMING.seat,0,'scale(.85)'),light(i%2===0?TIMING.first:TIMING.second,.65,'scale(1)'),light(TIMING.clear,0,'scale(1.04)'),light(TIMING.settle,0,'scale(.85)')]),
 ]),
]);
