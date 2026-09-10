import {actor,light,motion,pose} from './authoring';

/* USER / a quiet personal acknowledgment
 *    0ms  an oval head rests above a grounded shoulder silhouette
 *  130ms  turn attention slightly toward the visitor
 *  390ms  one shallow nod; the shoulders answer with a later breath
 *  500ms  the head begins to rise; the cheek edge catches light
 *  570ms  two short greeting strokes answer that reversal
 *  760ms  the head is upright; the breath subsides
 *  940ms  all greeting light has gone
 * 1180ms  exact rest
 * MOT-01/03/06/16: expression through posture, without a face or badge.
 */
export const USER_TIMING={rest:0,notice:130,nod:390,rise:500,greet:570,upright:760,clear:940,settle:1180};
export const USER_GEOMETRY={head:[12,7.3],rx:3.65,ry:4.05,baseY:21.2};
export const USER_ART={
 head:'M12 3.25a3.65 4.05 0 1 0 0 8.1a3.65 4.05 0 1 0 0-8.1Z',
 shoulders:'M4 21.2v-1.3c0-3.2 3.6-5.45 8-5.45s8 2.25 8 5.45v1.3Z',
 cheek:'M14.3 5.4a2.7 3.15 0 0 1 .45 3.1',
 shoulder:'M6.2 17.7Q8.3 15.6 11.9 15.6',
 greeting:['M17.7 4.25l1.05-.65','M18.45 6.45l1.3.1'],
};
const HEAD={origin:'12px 11.35px',rest:'translate(0px,0px) rotate(0deg) scale(1,1)',notice:'translate(-.18px,-.1px) rotate(-4deg) scale(1,1)',nod:'translate(.32px,.58px) rotate(4deg) scale(1.015,.91)',rise:'translate(.12px,.36px) rotate(2deg) scale(1,.95)'};
const SHOULDERS={origin:'12px 21.2px',rest:'scale(1,1)',breath:'scale(1.018,1.035)'};
const EASE={notice:'cubic-bezier(.4,0,.6,1)',nod:'cubic-bezier(.3,.1,.3,1)',rise:'cubic-bezier(.22,.8,.3,1)'};
const T=USER_TIMING;
export const user=motion(T.settle,'A small nod. A warm acknowledgment.',['Notice','Acknowledge','Ease'],[
 actor('profile-head',HEAD.origin,[pose(T.rest,HEAD.rest,EASE.notice),pose(T.notice,HEAD.notice,EASE.nod),pose(T.nod,HEAD.nod,EASE.rise),pose(T.rise,HEAD.rise,EASE.rise),pose(T.upright,HEAD.rest),pose(T.settle,HEAD.rest)]),
 actor('profile-shoulders',SHOULDERS.origin,[pose(T.rest,SHOULDERS.rest),pose(T.notice,SHOULDERS.rest),pose(T.rise,SHOULDERS.breath),pose(T.upright,'scale(1.006,1.01)'),pose(T.clear,SHOULDERS.rest),pose(T.settle,SHOULDERS.rest)]),
 actor('cheek-light','12px 7.3px',[light(T.rest,0),light(T.nod,0),light(T.rise,.7),light(T.greet,.55),light(T.upright,0),light(T.settle,0)]),
 actor('shoulder-light',SHOULDERS.origin,[light(T.rest,0),light(T.nod,0),light(T.rise,.35),light(T.greet,.55),light(T.upright,.12),light(T.clear,0),light(T.settle,0)]),
 ...USER_ART.greeting.map((_,i)=>actor(`greeting-${i}`,'18px 6px',[
  light(T.rest,0,'translate(0px,0px) scale(.7)'),light(T.rise+i*35,0,'translate(0px,0px) scale(.7)'),
  light(T.greet+i*35,.75,'translate(.2px,-.1px) scale(1)'),light(T.upright+i*35,.15,'translate(.65px,-.2px) scale(1.08)'),light(T.clear,0,'translate(.85px,-.25px) scale(1.1)'),light(T.settle,0,'translate(0px,0px) scale(.7)')
 ])),
]);
