import {actor,light,motion,pose} from './authoring';
import {LOCK_ART} from './lock';

/* UNLOCK / an open shackle clears its free end
 *    0ms  already open by 18 degrees; right foot stays attached
 *  130ms  a one-degree preparation, never closes the gap
 *  380ms  open to 28 degrees around the seated right foot
 *  440ms  the newly exposed free end catches light
 *  510ms  two short marks answer inside the cleared space
 *  650ms  hold open, then relax without touching the housing
 *  980ms  return to the original OPEN pose
 * 1200ms  neutral; host application still owns access state
 * MOT-01/03/05/08/14/16: open is a distinct state, not a lock animation.
 */
export const UNLOCK_TIMING={rest:0,gather:130,release:380,light:440,echo:510,hold:650,home:980,settle:1200};
export const UNLOCK_GEOMETRY={pivot:[16.4,11.3],free:[7.6,11.3],restAngle:18,openAngle:28};
const angle=UNLOCK_GEOMETRY.openAngle*Math.PI/180;
const free=[16.4-8.8*Math.cos(angle),11.3-8.8*Math.sin(angle)];
const gapRay=(offset:number)=>{const a=angle+offset;const start=[free[0]-Math.sin(a)*1.5,free[1]+Math.cos(a)*1.5],end=[free[0]-Math.sin(a)*2.15,free[1]+Math.cos(a)*2.15];return `M${start.join(' ')}L${end.join(' ')}`};
export const UNLOCK_ART={...LOCK_ART,freeEnd:'M6.95 11.3h1.3',gap:gapRay(-.35)+gapRay(.35)};
const SHACKLE={origin:'16.4px 11.3px',rest:'rotate(0deg)',gather:'rotate(-1deg)',open:'rotate(10deg)',staticTransform:'rotate(18 16.4 11.3)'};
export const UNLOCK_REST_TRANSFORM=SHACKLE.staticTransform;
const T=UNLOCK_TIMING;
export const unlock=motion(T.settle,'The open shackle pivots farther out and stays open.',['Release','Clear','Stay open'],[
 actor('unlock-shackle',SHACKLE.origin,[pose(T.rest,SHACKLE.rest),pose(T.gather,SHACKLE.gather,'cubic-bezier(.2,.65,.3,1)'),pose(T.release,SHACKLE.open),pose(T.hold,SHACKLE.open),pose(T.home,SHACKLE.rest),pose(T.settle,SHACKLE.rest)]),
 actor('unlock-end','7.6px 11.3px',[light(T.rest,0),light(T.release,0),light(T.light,.85),light(T.hold,0),light(T.settle,0)]),
 actor('unlock-gap',`${free[0]}px ${free[1]}px`,[light(T.rest,0,'scale(.7)'),light(T.light,0,'scale(.7)'),light(T.echo,.7,'scale(1)'),light(T.hold,0,'scale(1.15)'),light(T.settle,0,'scale(.7)')]),
]);
