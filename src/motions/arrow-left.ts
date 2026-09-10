import {actor,motion,pose,light,ease} from './authoring';
/* BACK / recall → return → arrive
 *    0ms  a full left arrow, ready
 *  110ms  take up travel to the right, away from the destination
 *  370ms  return left; a receding trace marks the point just left behind
 *  440ms  arrival at the leftmost position, then a small tip response
 *  670ms  hold the destination before easing home
 * 1140ms  original arrow, with no recurring travel
 * MOT-01/03/05/08/16: direction remains left; the trace is a past location.
 */
export const BACK_TIMING={rest:0,prepare:110,depart:200,arrive:370,reply:440,hold:670,clear:820,home:1020,settle:1140};
export const BACK_GEOMETRY={tipX:5,tailX:20,centerY:12,travel:-1.65,pickup:.55};
export const BACK_ART={arrow:'M10.3 6.7 5 12l5.3 5.3M5 12h15',trace:'M20.7 12h1.7',arrival:'M1.5 10.5l-.45-.5M1.5 13.5l-.45.5'};
const T=BACK_TIMING,G=BACK_GEOMETRY;
export const arrowLeft=motion(T.settle,'Return to where you came from.',['Recall','Return','Arrive'],[
 actor('back-arrow','12px 12px',[pose(T.rest,'translateX(0px)'),pose(T.prepare,`translateX(${G.pickup}px)`,ease.accelerate),pose(T.arrive,`translateX(${G.travel}px)`,ease.settle),pose(T.reply,`translateX(${G.travel+.15}px)`),pose(T.hold,`translateX(${G.travel+.15}px)`),pose(T.home,'translateX(0px)'),pose(T.settle,'translateX(0px)')]),
 actor('back-trace','20.7px 12px',[light(T.rest,0,'scaleX(.1)'),light(T.depart,0,'scaleX(.1)'),light(T.arrive,.7,'scaleX(1)'),light(T.hold,0,'translateX(.4px) scaleX(.4)'),light(T.settle,0,'scaleX(.1)')]),
 actor('back-arrival','2px 12px',[light(T.rest,0,'scale(.6)'),light(T.arrive,0,'scale(.6)'),light(T.reply,.8,'scale(1)'),light(T.clear,0,'scale(1.12)'),light(T.settle,0,'scale(.6)')]),
]);
