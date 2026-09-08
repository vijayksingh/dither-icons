import {actor,motion,pose,light} from './authoring';
import {ringPath,arcPath,circlePath} from './learning-geometry';

/* ── TARGET / gather intent, seat it precisely at the center ─
 *    0ms  two concentric rings and one complete diagonal dart
 *  150ms  the dart draws back along its own shaft
 *  405ms  its point reaches the bullseye
 *  455ms  the inner ring receives a restrained compression
 *  505ms  a short ring of energy resolves around the center
 *  570ms  two opposite rim marks answer the hit
 * 1000ms  all light is gone and the dart has settled
 * 1260ms  exact rest; no completion badge or assessment claim
 * MOT-01/03/05/08/16: all dart parts and their occluder travel together.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,          // complete target
 gather:150,      // draw back along shaft
 contact:405,     // point arrives at center
 compression:455, // material yields
 centerPeak:505,  // bullseye response
 recoil:555,      // tiny dart recovery
 rimPeak:570,     // rim answers
 ringRelax:650,   // ring recovers
 lightOut:865,    // center light clears
 ringRest:900,    // ring neutral
 dartRest:1000,   // dart and rim neutral
 settle:1260,     // exact neutral
};
export const TARGET_GEOMETRY={x:10,y:14};
export const TARGET_ART={
 outer:ringPath(10,14,8,1.55),inner:ringPath(10,14,4.6,1.45),center:circlePath(10,14,1.15),
 dart:'M10 14 11.4 10.55 12.15 11.3 18 5.45V3.25l1.5-1.5V4.5h2.75l-1.5 1.5h-2.2l-5.85 5.85.75.75Z',
 centerLight:arcPath(10,14,2.55,10,260),rim:'M2.5 18.7l-1.05.65M5.3 21.5l-.65 1.05',
};
const DART={origin:'10px 14px',rest:'translate(0px,0px)',gather:'translate(.85px,-.85px)',contact:'translate(0px,0px)',compress:'translate(-.09px,.09px)',recoil:'translate(.035px,-.035px)'};
const RING={origin:DART.origin,compress:.965,relax:1.014};
const LIGHT={origin:DART.origin,ink:.9};
const EASE={gather:'cubic-bezier(.4,0,.6,1)',flight:'cubic-bezier(.6,0,.85,.5)',contact:'cubic-bezier(.16,.8,.3,1)',settle:'cubic-bezier(.25,0,.3,1)'};
const dartFrames=[pose(TIMING.rest,DART.rest,EASE.gather),pose(TIMING.gather,DART.gather,EASE.flight),pose(TIMING.contact,DART.contact,EASE.contact),pose(TIMING.compression,DART.compress,EASE.settle),pose(TIMING.recoil,DART.recoil,EASE.settle),pose(TIMING.dartRest,DART.rest),pose(TIMING.settle,DART.rest)];
export const target=motion(TIMING.settle,'Draw back. Find the center.',['Aim','Seat','Resolve'],[
 actor('dart',DART.origin,dartFrames),actor('dart-occlusion',DART.origin,dartFrames),
 actor('inner-ring',RING.origin,[pose(TIMING.rest,'scale(1)'),pose(TIMING.contact,'scale(1)',EASE.contact),pose(TIMING.compression,`scale(${RING.compress})`,EASE.settle),pose(TIMING.ringRelax,`scale(${RING.relax})`,EASE.settle),pose(TIMING.ringRest,'scale(1)'),pose(TIMING.settle,'scale(1)')]),
 actor('center-response',LIGHT.origin,[light(TIMING.rest,0,'scale(.6)'),light(TIMING.contact,0,'scale(.6)'),light(TIMING.centerPeak,LIGHT.ink,'scale(1)'),light(TIMING.lightOut,0,'scale(1.2)'),light(TIMING.settle,0,'scale(.6)')]),
 actor('rim-response',RING.origin,[light(TIMING.rest,0,'scale(.9)'),light(TIMING.compression,0,'scale(.9)'),light(TIMING.rimPeak,.8,'scale(1)'),light(TIMING.dartRest,0,'scale(1.025)'),light(TIMING.settle,0,'scale(.9)')]),
]);
