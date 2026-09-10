import {actor,light,motion,pose,ease} from './authoring';

/* MOON / rise into a small night sky
 *    0ms  clean crescent; empty space above and inside its opening
 *  130ms  slight inclination before the rise
 *  460ms  crescent lifts and comes to rest
 *  500ms  a small shooting star appears above the free horn
 *  620ms  star sweeps down-left; its short tail follows the tangent
 *  780ms  star arrives inside the opening; tail contracts
 *  860ms  arrival twinkle and a quiet distant star answer
 * 1010ms  night holds; no repeated drifting
 * 1220ms  stars fade before the crescent's return
 * 1580ms  exact neutral
 * MOT-01/03/05/07/08/16: a rising crescent, one falling light, stillness.
 */
export const MOON_TIMING={rest:0,gather:130,rise:460,appear:500,travel:620,arrive:780,twinkle:860,hold:1010,clear:1220,settle:1580};
export const MOON_GEOMETRY={outer:[10.8,13.2],radius:8.6,cut:[14.6,9.4],cutRadius:8.05,star:[18.1,7.6],starRadius:1.75,distant:[12.7,2.9],distantRadius:.95};
const G=MOON_GEOMETRY,dx=G.cut[0]-G.outer[0],dy=G.cut[1]-G.outer[1],distance=Math.hypot(dx,dy);
const along=(G.radius**2-G.cutRadius**2+distance**2)/(2*distance),height=Math.sqrt(G.radius**2-along**2);
const middle=[G.outer[0]+along*dx/distance,G.outer[1]+along*dy/distance];
export const MOON_JOINTS={lower:[middle[0]-height*dy/distance,middle[1]+height*dx/distance],upper:[middle[0]+height*dy/distance,middle[1]-height*dx/distance]};
const glint=(x:number,y:number,r:number)=>`M${x} ${y-r}Q${x+r*.18} ${y-r*.18} ${x+r} ${y}Q${x+r*.18} ${y+r*.18} ${x} ${y+r}Q${x-r*.18} ${y+r*.18} ${x-r} ${y}Q${x-r*.18} ${y-r*.18} ${x} ${y-r}Z`;
export const MOON_ART={
 crescent:`M${MOON_JOINTS.upper.join(' ')}A${G.radius} ${G.radius} 0 1 0 ${MOON_JOINTS.lower.join(' ')}A${G.cutRadius} ${G.cutRadius} 0 0 1 ${MOON_JOINTS.upper.join(' ')}Z`,
 star:glint(G.star[0],G.star[1],G.starRadius),
 distant:glint(G.distant[0],G.distant[1],G.distantRadius),
 tail:'M18.7 6.6l.9-1.5',
};
const T=MOON_TIMING;
export const MOON_FLIGHT={start:'translate(2.1px,-3px)',end:'translate(0px,0px)'};
export const moon=motion(T.settle,'A crescent rises. A falling star finds its place.',['Rise','Catch a star','Rest'],[
 actor('moon-crescent',`${G.outer[0]}px ${G.outer[1]}px`,[pose(T.rest,'translateY(0px) rotate(0deg)'),pose(T.gather,'translateY(.2px) rotate(2deg)',ease.settle),pose(T.rise,'translateY(-.65px) rotate(-9deg)'),pose(T.hold,'translateY(-.65px) rotate(-9deg)'),pose(T.settle,'translateY(0px) rotate(0deg)')]),
 actor('moon-flight',`${G.star[0]}px ${G.star[1]}px`,[pose(T.rest,MOON_FLIGHT.start),pose(T.rise,MOON_FLIGHT.start),pose(T.arrive,MOON_FLIGHT.end),pose(T.clear,MOON_FLIGHT.end),pose(T.settle,MOON_FLIGHT.start)]),
 actor('moon-star',`${G.star[0]}px ${G.star[1]}px`,[light(T.rest,0,'scale(.35)'),light(T.rise,0,'scale(.35)'),light(T.appear,.65,'scale(.6)'),light(T.arrive,.85,'scale(.85)'),light(T.twinkle,1,'scale(1.12)'),light(T.hold,.8,'scale(1)'),light(T.clear,0,'scale(.7)'),light(T.settle,0,'scale(.35)')]),
 actor('moon-tail','18.7px 6.6px',[light(T.rest,0,'scale(1)'),light(T.rise,0,'scale(1)'),light(T.appear,.6,'scale(1)'),light(T.travel,.5,'scale(.8)'),light(T.arrive,0,'scale(0)'),light(T.settle,0,'scale(1)')]),
 actor('moon-distant',`${G.distant[0]}px ${G.distant[1]}px`,[light(T.rest,0,'scale(.4)'),light(T.arrive,0,'scale(.4)'),light(T.twinkle,.65,'scale(1)'),light(T.clear,0,'scale(.5)'),light(T.settle,0,'scale(.4)')]),
]);
