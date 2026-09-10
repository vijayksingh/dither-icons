import {actor,motion,pose,light} from './authoring';

/* ── SLIDERS / adjust one variable, feel the detent ───────────
 *    0ms  three independent controls on fixed rails
 *  130ms  the middle thumb takes up a little resistance
 *  420ms  thumb arrives at x=10; the filled rail stays attached
 *  500ms  a .18-unit overshoot seats back into the detent
 *  565ms  two registration ticks catch above and below the thumb
 *  680ms  the knob's edge light fades while the setting holds
 *  840ms  all response light clears
 * 1130ms  quietly restore the demonstration's original setting
 * 1380ms  exact rest
 * MOT-01/03/05/08/16: one controlled adjustment, not random faders.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,        // Two untouched controls frame the active one.
 gather:130,    // Take up mechanical resistance.
 arrive:420,    // Reach the intended detent.
 register:500,  // Settle precisely after a small overshoot.
 catch:565,     // Registration marks answer the seated thumb.
 hold:680,      // Hold the selected position.
 clear:840,     // No accent during the return.
 home:1130,     // Restore the preview's initial setting.
 settle:1380,   // Exact rest.
};
export const SLIDERS_GEOMETRY={railStart:3.5,railEnd:20.5,middleX:14.5,detentX:10,halfWidth:1.7,halfHeight:2.25};
export const SLIDERS_KNOBS=[{x:7,y:5.5},{x:14.5,y:12},{x:10,y:18.5}];
const knob=(x:number,y:number)=>`M${x-.8} ${y-2.25}h1.6a.9.9 0 0 1 .9.9v2.7a.9.9 0 0 1-.9.9h-1.6a.9.9 0 0 1-.9-.9v-2.7a.9.9 0 0 1 .9-.9Z`;
export const SLIDERS_ART={knob,rails:'M3.5 5.5h17M3.5 12h17M3.5 18.5h17',upper:'M10 8.3v.8',lower:'M10 14.9v.8',edge:'M13.65 10.6v2.8'};
const THUMB={origin:'14.5px 12px',rest:0,gather:.3,arrival:-4.68,seat:-4.5};
const EASE={gather:'cubic-bezier(.4,0,.6,1)',travel:'cubic-bezier(.2,.8,.25,1)',seat:'cubic-bezier(.22,1,.36,1)',return:'cubic-bezier(.4,0,.3,1)'};
const KNOB_POSES=[{at:TIMING.rest,x:THUMB.rest,ease:EASE.gather},{at:TIMING.gather,x:THUMB.gather,ease:EASE.travel},{at:TIMING.arrive,x:THUMB.arrival,ease:EASE.seat},{at:TIMING.register,x:THUMB.seat,ease:EASE.seat},{at:TIMING.hold,x:THUMB.seat,ease:EASE.return},{at:TIMING.home,x:THUMB.rest,ease:EASE.return},{at:TIMING.settle,x:THUMB.rest,ease:EASE.return}];
const EDGE={origin:'14.5px 12px',small:'scaleY(.5)',full:'scaleY(1)',ink:.9};
export const sliders=motion(TIMING.settle,'The slider moves along its rail and locks into position.',['Adjust','Register','Hold'],[
 ...['slider-thumb','slider-occlusion'].map(p=>actor(p,THUMB.origin,KNOB_POSES.map(k=>pose(k.at,`translateX(${k.x}px)`,k.ease)))),
 actor('slider-fill','3.5px 12px',KNOB_POSES.map(k=>pose(k.at,`scaleX(${(11+k.x)/11})`,k.ease))),
 actor('thumb-light',EDGE.origin,[light(TIMING.rest,0,EDGE.small),light(TIMING.arrive,0,EDGE.small),light(TIMING.register,EDGE.ink,EDGE.full),light(TIMING.hold,.35,EDGE.full),light(TIMING.clear,0,EDGE.full),light(TIMING.settle,0,EDGE.small)]),
 ...['detent-upper','detent-lower'].map(part=>actor(part,'10px 12px',[light(TIMING.rest,0,'scaleY(.7)'),light(TIMING.register,0,'scaleY(.7)'),light(TIMING.catch,.85,'scaleY(1)'),light(TIMING.clear,0,'scaleY(1.12)'),light(TIMING.settle,0,'scaleY(.7)')])),
]);
