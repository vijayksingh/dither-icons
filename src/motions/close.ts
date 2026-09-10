import {actor,light,motion,pose} from './authoring';

/* CLOSE / cross it out with two deliberate strokes
 *    0ms  a complete X; fixed diagonal angles
 *   90ms  first stroke draws back along its own line
 *  170ms  second stroke prepares as the first sweeps through
 *  230ms  first stroke finishes its mark
 *  370ms  the opposing stroke crosses it out
 *  430ms  a short finish at that second stroke's leading tip
 *  560ms  both strokes rest; the finish dissipates
 *  820ms  exact neutral
 * MOT-01/02/03/08/16: sequential crossing, not two scaling bars.
 */
export const CLOSE_TIMING={rest:0,markStart:90,crossStart:170,mark:230,firstRest:330,cross:370,finish:430,home:560,clear:630,settle:820};
export const CLOSE_ART={
 bar:'M2.5 10.9H21.5a1.1 1.1 0 0 1 0 2.2H2.5a1.1 1.1 0 0 1 0-2.2Z',
 centerline:'M2.5 12H21.5',
 edge:'M20.75 11.65l.55.35-.55.35',
 finish:'M23.5 11.9l.65-.2M22.85 10.1l.35-.5',
};
const STROKE={origin:'12px 12px',rest:'translateX(0px)',prepare:'translateX(-1.2px)',mark:'translateX(1.05px)'};
const SWEEP='cubic-bezier(.2,.65,.25,1)';
const T=CLOSE_TIMING;
const upper=[pose(T.rest,STROKE.rest),pose(T.markStart,STROKE.rest),pose(T.crossStart,STROKE.prepare,SWEEP),pose(T.cross,STROKE.mark),pose(T.home,STROKE.rest),pose(T.settle,STROKE.rest)];
export const close=motion(T.settle,'One stroke. Cross it out.',['Mark','Cross','Resolve'],[
 actor('close-down',STROKE.origin,[pose(T.rest,STROKE.rest),pose(T.markStart,STROKE.prepare,SWEEP),pose(T.mark,STROKE.mark),pose(T.firstRest,STROKE.rest),pose(T.settle,STROKE.rest)]),
 actor('close-up',STROKE.origin,upper),
 actor('close-occlusion',STROKE.origin,upper),
 actor('mark-edge',STROKE.origin,[light(T.rest,0),light(T.markStart,0),light(T.mark,.55),light(T.firstRest,0),light(T.settle,0)]),
 actor('cross-edge',STROKE.origin,[light(T.rest,0),light(T.crossStart,0),light(T.cross,.85),light(T.home,0),light(T.settle,0)]),
 actor('cross-finish','22.55px 12px',[light(T.rest,0,'scale(.65)'),light(T.cross,0,'scale(.65)'),light(T.finish,.75,'scale(1)'),light(T.clear,0,'scale(1.25)'),light(T.settle,0,'scale(.65)')]),
]);
