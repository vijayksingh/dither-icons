import {actor,motion,pose,light} from './authoring';
import {arcBand,arcPath,ringPath} from './learning-geometry';

/* ── PATH / follow a connected sequence of milestones ────────
 *    0ms  three nodes joined by two continuous quarter turns
 *  140ms  a signal leaves the origin
 *  420ms  first turn reaches the middle milestone
 *  485ms  the middle node receives and passes it onward
 *  790ms  second turn reaches the destination
 *  850ms  destination responds; a fine halo follows
 * 1120ms  all transient light has cleared
 * 1380ms  exact rest; no completion or progress state is recorded
 * MOT-01/03/05/08/16: the route stays put; its relationships act.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,            // connected path
 sourceStart:70,    // origin catches
 depart:140,        // first signal begins
 sourcePeak:180,    // origin response
 firstLight:265,    // first turn brightens
 middleArrival:420, // signal reaches middle node
 sourceOut:440,     // origin clears
 middlePeak:485,    // middle receives
 firstOut:505,      // first signal clears
 secondStart:510,   // middle passes onward
 middleRelax:620,   // middle settles
 secondLight:655,   // second turn brightens
 destination:790,   // second signal arrives
 middleRest:820,    // middle neutral
 destinationPeak:850,// destination receives
 secondOut:870,     // turn clears
 haloPeak:905,      // arrival echo
 destinationRelax:990,// node relaxes
 haloOut:1120,      // exterior response gone
 destinationRest:1170,// destination neutral
 settle:1380,       // exact rest
};
export const PATH_GEOMETRY={radius:4.5,width:1.6,nodes:[{part:'origin-node',x:5,y:19},{part:'middle-node',x:12,y:12},{part:'destination-node',x:19,y:5}]};
export const PATH_ART={
 first:arcBand(9.5,16.5,4.5,1.6,180,270),second:arcBand(14.5,7.5,4.5,1.6,90,0),
 firstOutline:arcPath(9.5,16.5,4.5,180,270),secondOutline:arcPath(14.5,7.5,4.5,90,0),
 firstLight:arcPath(9.5,16.5,4.5,180,199),secondLight:arcPath(14.5,7.5,4.5,90,71),
 node:(x:number,y:number)=>ringPath(x,y,2.5,1.35),
 originLight:arcPath(5,19,1.825,160,310),halo:arcPath(19,5,3.45,-80,150),
};
const FIRST={origin:'9.5px 16.5px',from:'rotate(0deg)',to:'rotate(71deg)',ink:.95};
const SECOND={origin:'14.5px 7.5px',from:'rotate(0deg)',to:'rotate(-71deg)',ink:.95};
const NODE={receive:1.1,relax:1.025};
const HALO={origin:'19px 5px',ink:.8,start:'scale(.8)',peak:'scale(1)',end:'scale(1.16)'};
const EASE={receive:'cubic-bezier(.18,.8,.3,1)',relax:'cubic-bezier(.3,0,.35,1)'};
export const path=motion(TIMING.settle,'A signal follows the path from node to node.',['Depart','Connect','Arrive'],[
 actor('source-light','5px 19px',[light(TIMING.rest,0),light(TIMING.sourceStart,0),light(TIMING.sourcePeak,.8),light(TIMING.sourceOut,0),light(TIMING.settle,0)]),
 actor('route-first',FIRST.origin,[light(TIMING.rest,0,FIRST.from),light(TIMING.depart,0,FIRST.from),light(TIMING.firstLight,FIRST.ink,'rotate(23deg)'),light(TIMING.middleArrival,FIRST.ink,FIRST.to),light(TIMING.firstOut,0,FIRST.to),light(TIMING.settle,0,FIRST.from)]),
 actor('middle-node','12px 12px',[pose(TIMING.rest,'scale(1)'),pose(TIMING.middleArrival,'scale(1)',EASE.receive),pose(TIMING.middlePeak,`scale(${NODE.receive})`,EASE.relax),pose(TIMING.middleRelax,`scale(${NODE.relax})`),pose(TIMING.middleRest,'scale(1)'),pose(TIMING.settle,'scale(1)')]),
 actor('route-second',SECOND.origin,[light(TIMING.rest,0,SECOND.from),light(TIMING.secondStart,0,SECOND.from),light(TIMING.secondLight,SECOND.ink,'rotate(-29deg)'),light(TIMING.destination,SECOND.ink,SECOND.to),light(TIMING.secondOut,0,SECOND.to),light(TIMING.settle,0,SECOND.from)]),
 actor('destination-node','19px 5px',[pose(TIMING.rest,'scale(1)'),pose(TIMING.destination,'scale(1)',EASE.receive),pose(TIMING.destinationPeak,'scale(1.13)',EASE.relax),pose(TIMING.destinationRelax,`scale(${NODE.relax})`),pose(TIMING.destinationRest,'scale(1)'),pose(TIMING.settle,'scale(1)')]),
 actor('arrival-halo',HALO.origin,[light(TIMING.rest,0,HALO.start),light(TIMING.destination,0,HALO.start),light(TIMING.haloPeak,HALO.ink,HALO.peak),light(TIMING.haloOut,0,HALO.end),light(TIMING.settle,0,HALO.start)]),
]);
