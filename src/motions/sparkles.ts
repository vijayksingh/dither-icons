import {actor,light,motion,pose,ease} from './authoring';

/* SPARKLES / a central flare wakes a surrounding field
 *    0ms  three readable stars, large center and two satellites
 *  140ms  main gathers; the field stays quiet
 *  340ms  center flares without tumbling
 *  410ms  upper-left spark lights, followed clockwise at 80ms intervals
 *  500ms  upper-right satellite answers
 *  650ms  lower-left satellite answers; fourth outer spark peaks
 * 1040ms  the last peripheral light dissolves in place
 * 1040ms  all three permanent stars regain their exact proportions
 * 1260ms  quiet rest
 * MOT-01/03/05/07/08/16: many distinct glints, a single leading event.
 */
export const SPARKLES_TIMING={rest:0,gather:140,flare:340,first:410,stagger:80,satellite:500,reply:650,linger:65,fade:390,home:1040,settle:1260};
export const SPARKLES_GEOMETRY={main:[12,12],mainRadius:6.35,satellite:[19.25,4.65],satelliteRadius:2.5,companion:[4.4,19.25],companionRadius:2.1};
// Same concave four-point construction at every size; no square particle substitutes.
export function sparklePath(x:number,y:number,r:number){const neck=r*.19;return `M${x} ${y-r}Q${x+neck} ${y-neck} ${x+r} ${y}Q${x+neck} ${y+neck} ${x} ${y+r}Q${x-neck} ${y+neck} ${x-r} ${y}Q${x-neck} ${y-neck} ${x} ${y-r}Z`;}
const G=SPARKLES_GEOMETRY,T=SPARKLES_TIMING;
export const SPARKLES_FIELD=[
 {part:'spark-northwest',x:4.8,y:4.6,radius:1.55},
 {part:'spark-east',x:21.25,y:12.2,radius:1.35},
 {part:'spark-south',x:14.5,y:21,radius:1.6},
 {part:'spark-west',x:2.6,y:10.9,radius:1.1},
];
export const SPARKLES_ART={main:sparklePath(...G.main as [number,number],G.mainRadius),satellite:sparklePath(...G.satellite as [number,number],G.satelliteRadius),companion:sparklePath(...G.companion as [number,number],G.companionRadius)};
export const sparkles=motion(T.settle,'The central stars brighten as smaller sparks appear around them.',['Gather','Illuminate','Twinkle'],[
 actor('spark-main','12px 12px',[pose(T.rest,'scale(1)'),pose(T.gather,'scale(.87)',ease.settle),pose(T.flare,'scale(1.08)'),pose(T.reply,'scale(1.025)'),pose(T.home,'scale(1)'),pose(T.settle,'scale(1)')]),
 ...[{part:'spark-satellite',point:G.satellite,peak:T.satellite},{part:'spark-companion',point:G.companion,peak:T.reply}].map(({part,point,peak})=>actor(part,point.map(n=>`${n}px`).join(' '),[pose(T.rest,'scale(1)'),pose(T.flare,'scale(1)',ease.settle),pose(peak,'scale(1.16)'),pose(T.home,'scale(1)'),pose(T.settle,'scale(1)')])),
 ...SPARKLES_FIELD.map(({part,x,y},i)=>{const peak=T.first+i*T.stagger;return actor(part,`${x}px ${y}px`,[light(T.rest,0,'scale(.3)'),light(peak-100,0,'scale(.3)'),light(peak,1,'scale(1.1)'),{...light(peak+T.linger,.9,'scale(1)'),easing:ease.smooth},light(peak+T.fade,0,'scale(.45)'),light(T.settle,0,'scale(.3)')]);}),
]);
