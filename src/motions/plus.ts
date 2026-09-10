import {actor,light,motion,pose} from './authoring';

/* PLUS / make room from a stable center
 *    0ms  rounded arms share one uninterrupted crossing
 *  110ms  horizontal arm gathers; vertical stays readable
 *  300ms  horizontal opens; its endpoints register
 *  365ms  horizontal tip marks answer
 *  430ms  vertical completes the added space
 *  495ms  vertical tip marks answer that later arrival
 *  590ms  both extents hold, then ease home without recoil
 *  760ms  exterior accents clear
 *  930ms  original proportions restored
 * 1100ms  exact rest
 * MOT-03/05/07/08/16: two axes, two ordered arrivals, one center.
 */
export const PLUS_TIMING={rest:0,gather:110,follow:190,across:300,acrossEcho:365,above:430,aboveEcho:495,hold:590,clear:760,home:930,settle:1100};
export const PLUS_ART={
 bar:'M4.6 10.9H19.4a1.1 1.1 0 0 1 0 2.2H4.6a1.1 1.1 0 0 1 0-2.2Z',
 centerline:'M4.6 12H19.4',
 tips:'M1.75 11.45v1.1M22.25 11.45v1.1',
};
const ARM={origin:'12px 12px',rest:'scaleX(1)',gather:'scaleX(.965)',open:'scaleX(1.1)'};
const T=PLUS_TIMING;
const vertical=[pose(T.rest,ARM.rest),pose(T.gather,ARM.rest),pose(T.follow,ARM.gather),pose(T.above,ARM.open),pose(T.hold,ARM.open),pose(T.home,ARM.rest),pose(T.settle,ARM.rest)];
export const plus=motion(T.settle,'A little more room. In both directions.',['Across','Open','Ease'],[
 actor('plus-across',ARM.origin,[pose(T.rest,ARM.rest),pose(T.gather,ARM.gather),pose(T.across,ARM.open),pose(T.hold,ARM.open),pose(T.home,ARM.rest),pose(T.settle,ARM.rest)]),
 actor('plus-above',ARM.origin,vertical),
 actor('plus-occlusion',ARM.origin,vertical),
 actor('across-tips',ARM.origin,[light(T.rest,0,'scaleY(.4)'),light(T.across,0,'scaleY(.4)'),light(T.acrossEcho,.75,'scaleY(1)'),light(T.hold,0,'scaleY(.7)'),light(T.settle,0,'scaleY(.4)')]),
 actor('above-tips',ARM.origin,[light(T.rest,0,'scaleY(.4)'),light(T.above,0,'scaleY(.4)'),light(T.aboveEcho,.75,'scaleY(1)'),light(T.clear,0,'scaleY(.7)'),light(T.settle,0,'scaleY(.4)')]),
]);
