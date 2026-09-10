import {actor,light,motion,pose,ease} from './authoring';

/* SUN / light leaves the center and reaches the rays
 *    0ms  fixed disc, eight round-ended radial strokes
 *  150ms  a wave emerges from the disc
 *  250ms  light becomes visible in the gap around the core
 *  430ms  wave reaches the inner edge of the cardinal rays
 *  485ms  diagonal rays follow; wave clears
 *  540ms  cardinal rays reach outward; tip glints peak at 605ms
 *  620ms  diagonal rays reach their quieter maximum
 *  750ms  extent holds briefly
 *  930ms  rays ease inward, tip glints gone
 * 1160ms  exact neutral; no rotation or recurrent breathing
 * MOT-03/05/08/16: a visible source, propagation, then radiation.
 */
export const SUN_TIMING={rest:0,emit:150,warm:250,reach:430,follow:485,cardinal:540,tips:605,diagonal:620,hold:750,clear:930,settle:1160};
export const SUN_GEOMETRY={coreRadius:4.4,waveRadius:4.65,rayInner:4.35,rayOuter:2.3,halfWidth:.825,cardinalTravel:.55,diagonalTravel:.4};
export const SUN_ART={
 disc:'M12 7.6a4.4 4.4 0 1 0 0 8.8a4.4 4.4 0 1 0 0-8.8Z',
 ray:'M11.175 2.3a.825.825 0 0 1 1.65 0v2.05a.825.825 0 0 1-1.65 0Z',
 rayLine:'M12 2.3v2.05',
 tips:'M11.65 .55h.7',
};
const T=SUN_TIMING,G=SUN_GEOMETRY;
// A round-ended ray's inner edge is closer than its centerline endpoint.
export const SUN_WAVE_REACH=(12-G.rayInner-G.halfWidth)/G.waveRadius;
export const sun=motion(T.settle,'Light spreads from the center to the rays.',['Warm','Reach','Radiate'],[
 actor('sun-wave','12px 12px',[light(T.rest,0,'scale(1)'),light(T.emit,0,'scale(1)'),light(T.warm,.6,'scale(1.05)'),light(T.reach,.38,`scale(${SUN_WAVE_REACH})`),light(T.follow,0,`scale(${SUN_WAVE_REACH})`),light(T.settle,0,'scale(1)')]),
 ...Array.from({length:8},(_,i)=>{
  const diagonal=i%2===1,start=diagonal?T.follow:T.reach,arrive=diagonal?T.diagonal:T.cardinal,travel=diagonal?G.diagonalTravel:G.cardinalTravel;
  return actor(`sun-ray-${i}`,'12px 12px',[pose(T.rest,'translateY(0px)'),pose(start,'translateY(0px)'),pose(arrive,`translateY(${-travel}px)`,ease.settle),pose(T.hold,`translateY(${-travel}px)`),pose(T.clear,'translateY(0px)'),pose(T.settle,'translateY(0px)')]);
 }),
 actor('sun-tips','12px 12px',[light(T.rest,0),light(T.cardinal,0),light(T.tips,.7),light(T.clear,0),light(T.settle,0)]),
]);
