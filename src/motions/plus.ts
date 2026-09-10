import {actor,light,motion,pose} from './authoring';

/* PLUS / add the upright; let the crossbar receive it
 *    0ms  complete plus, both arms present
 *  130ms  upright lifts along its own axis; crossbar waits
 *  300ms  crossbar begins to yield to the approaching upright
 *  340ms  upright registers; both centers share the small press
 *  420ms  both settle vertically; response travels along the crossbar
 *  600ms  the response reaches its two ends
 *  655ms  a brief outward finish acknowledges the addition
 *  810ms  accents clear; original crossbar length returns
 * 1080ms  exact neutral
 * MOT-01/03/05/08/16: insert, receive, propagate. Never become minus.
 */
export const PLUS_TIMING={rest:0,lift:130,receive:300,register:340,flow:420,arrive:600,finish:655,home:810,settle:1080};
export const PLUS_ART={
 bar:'M4.6 10.9H19.4a1.1 1.1 0 0 1 0 2.2H4.6a1.1 1.1 0 0 1 0-2.2Z',
 centerline:'M4.6 12H19.4',
 wave:'M12 12h1.2',
 tips:'M1.9 11.7l-.65.3.65.3M22.1 11.7l.65.3-.65.3',
};
const UPRIGHT={origin:'12px 12px',rest:'translateX(0px)',lift:'translateX(-1.8px)',press:'translateX(.25px)'};
const CROSSBAR={origin:'12px 12px',rest:'translateY(0px) scaleX(1)',press:'translateY(.25px) scaleX(1.04)',spread:'translateY(0px) scaleX(1.04)'};
const T=PLUS_TIMING;
const vertical=[pose(T.rest,UPRIGHT.rest),pose(T.lift,UPRIGHT.lift,'cubic-bezier(.5,0,.8,.4)'),pose(T.register,UPRIGHT.press),pose(T.flow,UPRIGHT.rest),pose(T.settle,UPRIGHT.rest)];
export const plus=motion(T.settle,'Add the upright. Let the crossbar answer.',['Insert','Receive','Extend'],[
 actor('plus-across',CROSSBAR.origin,[pose(T.rest,CROSSBAR.rest),pose(T.receive,CROSSBAR.rest),pose(T.register,CROSSBAR.press),pose(T.flow,CROSSBAR.spread),pose(T.arrive,CROSSBAR.spread),pose(T.home,CROSSBAR.rest),pose(T.settle,CROSSBAR.rest)]),
 actor('plus-above',UPRIGHT.origin,vertical),
 actor('plus-occlusion',UPRIGHT.origin,vertical),
 ...['left','right'].map(side=>actor(`plus-wave-${side}`,CROSSBAR.origin,[light(T.rest,0,'translateX(0px)'),light(T.register,0,'translateX(0px)'),light(T.flow,.8,'translateX(0px)'),light(T.arrive,.8,'translateX(6.2px)'),light(T.finish,0,'translateX(6.2px)'),light(T.settle,0,'translateX(0px)')])),
 actor('addition-finish',CROSSBAR.origin,[light(T.rest,0,'scaleX(.97)'),light(T.arrive,0,'scaleX(.97)'),light(T.finish,.75,'scaleX(1)'),light(T.home,0,'scaleX(1.04)'),light(T.settle,0,'scaleX(.97)')]),
]);
