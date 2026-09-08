import {actor,motion,pose,light} from './authoring';

/* ── PAUSE / two soft stops, then complete stillness ─────────
 *    0ms  two separate vertical bars on the same resting plane
 *  110ms  the first bar takes up its short travel
 *  155ms  the second follows (45ms behind)
 *  320ms  first bar returns to its stop; only then does it compress
 *  365ms  second stop arrives as the first yields
 *  385ms  first base gives a short, localized response
 *  430ms  second base answers
 *  665ms  both bars have settled; remaining light dissipates
 * 1040ms  held in exact rest, with no loop or state substitution
 * MOT-01/03/05/08/16: an arrested base, not inward squeezing.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,        // neutral pair
 rightStart:45, // second bar follows first
 leftGather:110,// first preload
 rightGather:155,// second preload
 leftContact:320,// first stop
 rightContact:365,// second stop
 leftCompress:365,// first bar yields after contact
 leftSeatCrest:370,// first base lights
 leftTickCrest:385,// first exterior response
 rightCompress:410,// second yields
 rightSeatCrest:415,// second base lights
 rightTickCrest:430,// second exterior response
 leftRebound:470,// very small material recovery
 rightRebound:515,// second recovery
 leftRest:620,  // first stops moving
 leftLightOut:650,// first effects gone
 rightRest:665, // both now still
 rightLightOut:695,// second effects gone
 settle:1040,   // sustained stillness
};
export const PAUSE_GEOMETRY={bottom:21,leftX:7.75,rightX:16.25,halfWidth:2.05};
export const PAUSE_ART={
 left:'M6.7 3.5h2.1a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1H6.7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z',
 right:'M15.2 3.5h2.1a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1h-2.1a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z',
 leftSeat:'M5.45 21.45h4.6',rightSeat:'M13.95 21.45h4.6',
 leftTick:'M4.85 20.65l-1.15-.5',rightTick:'M19.15 20.65l1.15-.5',
};
const BAR={rest:'translateY(0px) scale(1,1)',gather:'translateY(-.72px) scale(.99,1.012)',
 compress:'translateY(0px) scale(1.035,.955)',rebound:'translateY(0px) scale(.996,1.006)'};
const SEAT={ink:.92,start:'scaleX(.25)',peak:'scaleX(1)',end:'scaleX(1.1)'};
const TICK={ink:.76};
const EASE={gather:'cubic-bezier(.3,0,.4,1)',fall:'cubic-bezier(.55,0,.85,.4)',
 contact:'cubic-bezier(.14,.65,.3,1)',recover:'cubic-bezier(.22,0,.3,1)'};
export const PAUSE_STOPS=[
 {side:'left',x:PAUSE_GEOMETRY.leftX,start:TIMING.rest,gather:TIMING.leftGather,contact:TIMING.leftContact,
 compress:TIMING.leftCompress,seat:TIMING.leftSeatCrest,tick:TIMING.leftTickCrest,rebound:TIMING.leftRebound,rest:TIMING.leftRest,out:TIMING.leftLightOut,sign:-1},
 {side:'right',x:PAUSE_GEOMETRY.rightX,start:TIMING.rightStart,gather:TIMING.rightGather,contact:TIMING.rightContact,
 compress:TIMING.rightCompress,seat:TIMING.rightSeatCrest,tick:TIMING.rightTickCrest,rebound:TIMING.rightRebound,rest:TIMING.rightRest,out:TIMING.rightLightOut,sign:1},
];
export const pause=motion(TIMING.settle,'Two soft stops. Then stillness.',['Take up','Seat','Hold'],PAUSE_STOPS.flatMap(b=>[
 actor(`bar-${b.side}`,`${b.x}px ${PAUSE_GEOMETRY.bottom}px`,[
 pose(TIMING.rest,BAR.rest,EASE.gather),...(b.start?[pose(b.start,BAR.rest,EASE.gather)]:[]),
 pose(b.gather,BAR.gather,EASE.fall),pose(b.contact,BAR.rest,EASE.contact),pose(b.compress,BAR.compress,EASE.recover),
 pose(b.rebound,BAR.rebound,EASE.recover),pose(b.rest,BAR.rest),pose(TIMING.settle,BAR.rest)]),
 actor(`seat-${b.side}`,`${b.x}px 21.45px`,[light(TIMING.rest,0,SEAT.start),light(b.contact,0,SEAT.start),
 light(b.seat,SEAT.ink,SEAT.peak),light(b.out,0,SEAT.end),light(TIMING.settle,0,SEAT.start)]),
 actor(`stop-${b.side}`,`${b.x+b.sign*2.9}px 20.65px`,[
 light(TIMING.rest,0,'scale(.4)'),light(b.contact,0,'scale(.4)'),light(b.tick,TICK.ink,'scale(1)'),
 light(b.out,0,`translateX(${b.sign*.4}px) scale(.85)`),light(TIMING.settle,0,'scale(.4)')]),
]));
