import {actor,motion,pose,light} from './authoring';

/* ── BOOK / turn one page, feel it land ──────────────────────
 *    0ms  two readable leaves and one fixed binding
 *  140ms  the right page gathers at its outer edge
 *  340ms  a curled leaf approaches the spine
 *  410ms  the leaf crosses the binding; the book stays open
 *  610ms  the page meets its matching left bed
 *  670ms  both surfaces yield together; the landing edge lights
 *  715ms  a small breath of air escapes the left edge
 * 1060ms  the new leaf blends into the left stack
 * 1360ms  exact rest, no repeated page-flipping
 * MOT-01/03/05/07/08/16: the binding stays attached throughout.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,       // static open spread
 appear:90,    // overlay joins the right stack
 gather:140,   // page takes up tension
 edgeStart:180,// free edge catches light
 lift:340,     // curled, almost edge-on
 cross:410,    // crosses the spine
 edgeOut:555,  // edge light gives way to landing
 land:610,     // page and receiving bed coincide
 compress:670, // coupled material response
 air:715,      // exterior breath follows contact
 rebound:755,  // small correction
 bedRest:850,  // receiving stack settles
 fade:1060,    // page merges into the stack
 reset:1160,   // hidden overlay resets
 settle:1360,  // neutral endpoint
};
export const BOOK_ART={
 right:'M12 5Q15.1 3.35 20.5 4v15.5Q15.1 19 12 21Z',
 left:'M12 5Q8.9 3.35 3.5 4v15.5Q8.9 19 12 21Z',
 spine:'M12 5v16',
 rightLines:'M14.6 8q1.8-.5 3.6-.25M14.6 11q1.8-.5 3.6-.25M14.6 14q1.3-.35 2.6-.3',
 rightCuts:'M14.6 7.75q1.8-.5 3.6-.25v.5q-1.8-.25-3.6.25ZM14.6 10.75q1.8-.5 3.6-.25v.5q-1.8-.25-3.6.25ZM14.6 13.75q1.3-.35 2.6-.3v.5q-1.3-.05-2.6.3Z',
 edge:'M19.9 5.1v12.8',
 landing:'M19.7 18.85q-4.15-.15-6.55 1.25',
 air:'M2.05 10.2q-.75 1.2 0 2.4',
 separation:.24,
};
export const BOOK_BINDING={x:12,y:14,land:TIMING.land,compress:TIMING.compress};
const PAGE={origin:'12px 14px',ink:.98,rest:'scaleX(1) skewY(0deg)',gather:'scaleX(.97) skewY(-1deg)',
 lift:'scaleX(.18) skewY(-7deg)',cross:'scaleX(-.08) skewY(-8deg)',land:'scaleX(-1) skewY(0deg)',
 compress:'scaleX(-1) skewY(.7deg)',rebound:'scaleX(-1) skewY(-.15deg)'};
const BED={origin:PAGE.origin,rest:'skewY(0deg)',compress:'skewY(-.7deg)',rebound:'skewY(.15deg)'};
const EDGE={origin:'19.9px 11px',ink:.8};
const LANDING={origin:'13.2px 20px',ink:.9};
const AIR={origin:'2px 11.4px',ink:.82,start:'translateX(.3px) scale(.55)',peak:'translateX(0px) scale(1)',end:'translateX(-.5px) scale(1.08)'};
const EASE={gather:'cubic-bezier(.4,0,.7,1)',lift:'cubic-bezier(.38,0,.55,.78)',cross:'cubic-bezier(.2,.25,.6,.72)',
 land:'cubic-bezier(.2,.35,.35,1)',contact:'cubic-bezier(.15,.65,.3,1)',settle:'cubic-bezier(.22,0,.3,1)'};
const page=actor('turning-page',PAGE.origin,[
 {...light(TIMING.rest,0,PAGE.rest),easing:EASE.gather},light(TIMING.appear,PAGE.ink,PAGE.rest),
 {...light(TIMING.gather,PAGE.ink,PAGE.gather),easing:EASE.lift},
 {...light(TIMING.lift,PAGE.ink,PAGE.lift),easing:EASE.cross},
 {...light(TIMING.cross,PAGE.ink,PAGE.cross),easing:EASE.land},
 {...light(TIMING.land,PAGE.ink,PAGE.land),easing:EASE.contact},
 {...light(TIMING.compress,PAGE.ink,PAGE.compress),easing:EASE.settle},
 {...light(TIMING.rebound,PAGE.ink,PAGE.rebound),easing:EASE.settle},light(TIMING.bedRest,PAGE.ink,PAGE.land),
 light(TIMING.fade,0,PAGE.land),light(TIMING.reset,0,PAGE.rest),light(TIMING.settle,0,PAGE.rest)]);
export const book=motion(TIMING.settle,'One page turns. A soft landing.',['Lift','Turn','Land'],[
 page,{...page,part:'page-occlusion'},
 actor('left-bed',BED.origin,[pose(TIMING.rest,BED.rest),pose(TIMING.land,BED.rest,EASE.contact),
  pose(TIMING.compress,BED.compress,EASE.settle),pose(TIMING.rebound,BED.rebound,EASE.settle),
  pose(TIMING.bedRest,BED.rest),pose(TIMING.settle,BED.rest)]),
 actor('page-edge',EDGE.origin,[light(TIMING.rest,0),light(TIMING.edgeStart,0),light(TIMING.lift,EDGE.ink),light(TIMING.edgeOut,0),light(TIMING.settle,0)]),
 actor('landing-light',LANDING.origin,[light(TIMING.rest,0,'scaleX(.3)'),light(TIMING.land,0,'scaleX(.3)'),
  light(TIMING.compress,LANDING.ink,'scaleX(1)'),light(TIMING.bedRest,0,'scaleX(1)'),light(TIMING.settle,0,'scaleX(.3)')]),
 actor('page-air',AIR.origin,[light(TIMING.rest,0,AIR.start),light(TIMING.land,0,AIR.start),
  light(TIMING.air,AIR.ink,AIR.peak),light(TIMING.fade,0,AIR.end),light(TIMING.settle,0,AIR.start)]),
]);
