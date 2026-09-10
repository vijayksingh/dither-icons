import {actor,motion,pose,light} from './authoring';

/* ── PLAY / stored intent becomes forward momentum ──────────
 *    0ms  one complete, right-facing triangle
 *  110ms  draw back; the broad rear edge gathers pressure
 *  300ms  a decisive forward release, with a small material stretch
 *  345ms  attached rear edge and short launch stroke catch the release
 *  390ms  two fine pressure marks disperse behind the triangle
 *  470ms  continue forward a fraction as the shape relaxes
 *  770ms  a restrained correction resolves the return
 *  970ms  exact still triangle; never a pause or a second play glyph
 * MOT-01/03/04/07/08/14/16: the payoff belongs to the release.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,        // complete play silhouette
 gather:110,    // rearward pressure
 edgeStart:200, // light builds at the releasing edge
 strokeStart:245,// short launch stroke follows departure
 release:300,   // main forward impulse
 fanStart:300,  // exterior pressure marks follow impulse
 edgeCrest:325, // attached edge catches release
 strokeCrest:345,// near response
 fanCrest:390,  // broader, quieter response
 coast:470,     // continued forward drift
 lightOut:665,  // effects gone before rest
 home:770,      // small correction
 settle:970,    // exact neutral
};
export const PLAY_ART={
 triangle:'M6.25 4.4Q6.25 3.05 7.4 3.75L20.2 11.2Q21.55 12 20.2 12.8L7.4 20.25Q6.25 20.95 6.25 19.6Z',
 edge:'M6.55 8.8v6.4',
 stroke:'M2.6 12h2.3',
 fan:'M4.25 8.9 3 8.35M4.25 15.1 3 15.65',
};
const TRIANGLE={origin:'6.25px 12px',rest:'translateX(0px) scale(1,1)',
 gather:'translateX(-.65px) scale(.955,1.015)',release:'translateX(1.05px) scale(1.025,.99)',
 coast:'translateX(1.2px) scale(1.006,1)',home:'translateX(-.045px) scale(.999,1)'};
const EDGE={origin:'6.55px 12px',ink:.86};
const STROKE={origin:'4.9px 12px',ink:.92,start:'scaleX(.18)',peak:'scaleX(1)',end:'translateX(-.4px) scaleX(.65)'};
const FAN={origin:'4.5px 12px',ink:.74,start:'scale(.45,.55)',peak:'translateX(-.15px) scale(1,1)',end:'translateX(-.65px) scale(.9,1.12)'};
const EASE={gather:'cubic-bezier(.4,0,.7,1)',release:'cubic-bezier(.16,.78,.3,.96)',
 coast:'cubic-bezier(.2,.25,.35,1)',return:'cubic-bezier(.42,0,.24,1)',settle:'cubic-bezier(.2,0,.25,1)'};
export const play=motion(TIMING.settle,'The play arrow leans back before moving forward.',['Gather','Release','Coast'],[
 actor('triangle',TRIANGLE.origin,[pose(TIMING.rest,TRIANGLE.rest,EASE.gather),pose(TIMING.gather,TRIANGLE.gather,EASE.release),
 pose(TIMING.release,TRIANGLE.release,EASE.coast),pose(TIMING.coast,TRIANGLE.coast,EASE.return),pose(TIMING.home,TRIANGLE.home,EASE.settle),pose(TIMING.settle,TRIANGLE.rest)]),
 actor('release-edge',EDGE.origin,[light(TIMING.rest,0,'scaleY(.35)'),light(TIMING.edgeStart,0,'scaleY(.35)'),
 light(TIMING.edgeCrest,EDGE.ink,'scaleY(1)'),light(TIMING.lightOut,0,'scaleY(1)'),light(TIMING.settle,0,'scaleY(.35)')]),
 actor('launch-stroke',STROKE.origin,[light(TIMING.rest,0,STROKE.start),light(TIMING.strokeStart,0,STROKE.start),
 light(TIMING.strokeCrest,STROKE.ink,STROKE.peak),light(TIMING.lightOut,0,STROKE.end),light(TIMING.settle,0,STROKE.start)]),
 actor('release-fan',FAN.origin,[light(TIMING.rest,0,FAN.start),light(TIMING.fanStart,0,FAN.start),
 light(TIMING.fanCrest,FAN.ink,FAN.peak),light(TIMING.lightOut,0,FAN.end),light(TIMING.settle,0,FAN.start)]),
]);
