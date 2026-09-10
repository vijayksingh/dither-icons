import {actor,light,motion,pose} from './authoring';

/* CLOSE / two braces gather around their shared crossing
 *    0ms  fixed X angles, rounded ends, one clean intersection
 *   90ms  the first brace takes up a little space
 *  130ms  the second follows by 40ms
 *  240ms  first brace draws inward, center fixed
 *  300ms  second brace registers; the X is quietly firm
 *  365ms  two lateral marks answer the final registration
 *  420ms  hold releases; the accents dissipate separately
 *  680ms  the familiar proportions return
 *  840ms  neutral, no spin or change into a plus
 * MOT-01/03/05/07/16: each brace shortens along its own axis.
 */
export const CLOSE_TIMING={rest:0,gather:90,follow:130,first:240,meet:300,echo:365,hold:420,clear:550,home:680,settle:840};
export const CLOSE_ART={
 bar:'M2.5 10.9H21.5a1.1 1.1 0 0 1 0 2.2H2.5a1.1 1.1 0 0 1 0-2.2Z',
 centerline:'M2.5 12H21.5',
 response:'M8.8 12h-.8M15.2 12h.8',
};
const BRACE={origin:'12px 12px',rest:'scaleX(1)',gather:'scaleX(1.035)',seat:'scaleX(.92)'};
const T=CLOSE_TIMING;
const upper=[pose(T.rest,BRACE.rest),pose(T.gather,BRACE.rest),pose(T.follow,BRACE.gather),pose(T.meet,BRACE.seat),pose(T.hold,BRACE.seat),pose(T.home,BRACE.rest),pose(T.settle,BRACE.rest)];
export const close=motion(T.settle,'Draw inward. Meet at the crossing.',['Gather','Meet','Release'],[
 actor('close-down',BRACE.origin,[pose(T.rest,BRACE.rest),pose(T.gather,BRACE.gather),pose(T.first,BRACE.seat),pose(T.hold,BRACE.seat),pose(T.home,BRACE.rest),pose(T.settle,BRACE.rest)]),
 actor('close-up',BRACE.origin,upper),
 actor('close-occlusion',BRACE.origin,upper),
 actor('cross-response',BRACE.origin,[light(T.rest,0,'scaleX(.7)'),light(T.meet,0,'scaleX(.7)'),light(T.echo,.7,'scaleX(1)'),light(T.clear,0,'scaleX(1.25)'),light(T.settle,0,'scaleX(.7)')]),
]);
