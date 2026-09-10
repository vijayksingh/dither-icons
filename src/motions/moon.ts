import {actor,light,motion,pose,ease} from './authoring';

/* MOON / a crescent settles before the last light appears
 *    0ms  joined circular arcs, broad negative space
 *  130ms  a one-degree preparation
 *  450ms  crescent inclines quietly; no elastic wobble
 *  520ms  inner-rim light begins after the crescent rests
 *  710ms  light reaches the lower rim; a small star answers at 780ms
 *  900ms  hold the night silhouette while the glint fades
 * 1150ms  accents gone before recovery
 * 1420ms  exact neutral
 * MOT-01/03/05/07/08/16: slow settling and one small, contained payoff.
 */
export const MOON_TIMING={rest:0,gather:130,incline:450,light:520,arrive:710,glint:780,hold:900,clear:1150,settle:1420};
export const MOON_GEOMETRY={outer:[12,12],radius:9.3,cut:[15.8,8.2],cutRadius:8.6};
const G=MOON_GEOMETRY,dx=G.cut[0]-G.outer[0],dy=G.cut[1]-G.outer[1],distance=Math.hypot(dx,dy);
const along=(G.radius**2-G.cutRadius**2+distance**2)/(2*distance),height=Math.sqrt(G.radius**2-along**2);
const middle=[G.outer[0]+along*dx/distance,G.outer[1]+along*dy/distance];
export const MOON_JOINTS={lower:[middle[0]-height*dy/distance,middle[1]+height*dx/distance],upper:[middle[0]+height*dy/distance,middle[1]-height*dx/distance]};
const point=(angle:number,radius=G.cutRadius)=>[G.cut[0]+radius*Math.cos(angle*Math.PI/180),G.cut[1]+radius*Math.sin(angle*Math.PI/180)];
const traceStart=point(153),traceEnd=point(139);
export const MOON_ART={
 crescent:`M${MOON_JOINTS.upper.join(' ')}A${G.radius} ${G.radius} 0 1 0 ${MOON_JOINTS.lower.join(' ')}A${G.cutRadius} ${G.cutRadius} 0 0 1 ${MOON_JOINTS.upper.join(' ')}Z`,
 trace:`M${traceStart.join(' ')}A${G.cutRadius} ${G.cutRadius} 0 0 0 ${traceEnd.join(' ')}`,
 glint:'M17.7 5.1Q18.05 6.35 19.3 6.7Q18.05 7.05 17.7 8.3Q17.35 7.05 16.1 6.7Q17.35 6.35 17.7 5.1Z',
};
const CRESCENT={origin:'12px 12px',rest:'rotate(0deg)',prepare:'rotate(1deg)',incline:'rotate(-5deg)'};
const T=MOON_TIMING;
export const moon=motion(T.settle,'Settle into night. Catch the last light.',['Incline','Catch','Still'],[
 actor('moon-crescent',CRESCENT.origin,[pose(T.rest,CRESCENT.rest),pose(T.gather,CRESCENT.prepare),pose(T.incline,CRESCENT.incline,ease.settle),pose(T.hold,CRESCENT.incline),pose(T.settle,CRESCENT.rest)]),
 actor('moon-rim',`${G.cut[0]}px ${G.cut[1]}px`,[light(T.rest,0,'rotate(0deg)'),light(T.incline,0,'rotate(0deg)'),light(T.light,.65,'rotate(0deg)'),light(T.arrive,.65,'rotate(-47deg)'),light(T.hold,0,'rotate(-47deg)'),light(T.settle,0,'rotate(0deg)')]),
 actor('moon-glint','17.7px 6.7px',[light(T.rest,0,'scale(.6)'),light(T.arrive,0,'scale(.6)'),light(T.glint,.85,'scale(1)'),light(T.clear,0,'scale(.7)'),light(T.settle,0,'scale(.6)')]),
]);
