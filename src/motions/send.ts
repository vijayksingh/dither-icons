import {actor,motion,pose,light} from './authoring';

/* ── SEND / take up the fold, catch air, glide home ───────────
 *    0ms  two paper faces share a fixed diagonal keel
 *  135ms  plane draws back; lower wing takes up tension
 *  340ms  the nose leads forward and upward
 *  400ms  wing releases; the folded edge catches light
 *  435ms  near wake stretches behind the departing tail
 *  505ms  a smaller wake follows, then both dissolve
 *  615ms  forward momentum becomes a quiet coast
 * 1010ms  a small correction resolves the return
 * 1220ms  exact neutral plane; no flight out of the control
 * MOT-01/03/05/07/08/14/16: keep direction and connected paper geometry.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,       // assembled plane
 gather:135,   // draw back with wing tension
 wingGather:180,// paper follows the initial movement
 lightStart:240,// keel starts catching light
 lead:340,     // main forward impulse
 wingRelease:400,// paper releases after the nose leads
 lightCrest:410,// attached crease response
 wakeStart:295,// near wake follows departure
 wakeCrest:435,// first exterior climax
 wakeFarStart:370,// smaller delayed echo
 wakeFarCrest:505,// trailing response
 coast:615,    // continue forward a fraction
 wakeOut:835,  // clear accents during return
 home:1010,    // damped correction
 settle:1220,  // exact rest
};
export const SEND_ART={
 upper:'M3.25 10.65 20 4 9.45 13.45 3.25 11.1q-.45-.2 0-.45Z',
 lower:'M10 14 20 4 13.55 20.6q-.2.5-.45 0Z',
 keel:'M10 14 20 4',
 glint:'M11.5 12.5l5.5-5.5',
 wakeNear:'M4.3 14.7l-1.4 1.4',
 wakeFar:'M7.3 18l-1.25 1.25',
};
export const SEND_HINGE={x:15,y:9,angle:-45};
const PLANE={origin:'10px 14px',rest:'translate(0px,0px) rotate(0deg)',
 gather:'translate(-.65px,.5px) rotate(-3.5deg)',lead:'translate(.85px,-.9px) rotate(1.7deg)',
 coast:'translate(1.12px,-1.14px) rotate(.7deg)',home:'translate(-.045px,.04px) rotate(-.18deg)'};
const WING={gather:.9,release:1.035,coast:.99};
const GLINT={origin:'15px 9px',ink:.86};
const WAKE={nearInk:.9,farInk:.68,start:'translate(.15px,-.15px) scale(.35)',peak:'translate(-.2px,.2px) scale(1)',end:'translate(-.7px,.7px) scale(.85)'};
const EASE={gather:'cubic-bezier(.4,0,.7,1)',lead:'cubic-bezier(.16,.75,.3,.95)',
 coast:'cubic-bezier(.2,.25,.35,1)',return:'cubic-bezier(.45,0,.23,1)',settle:'cubic-bezier(.2,0,.25,1)'};
const fold=(scale:number)=>`rotate(${SEND_HINGE.angle}deg) scaleY(${scale}) rotate(${-SEND_HINGE.angle}deg)`;
export const send=motion(TIMING.settle,'A folded wing. A small rush of air.',['Gather','Launch','Glide home'],[
 actor('plane',PLANE.origin,[pose(TIMING.rest,PLANE.rest,EASE.gather),pose(TIMING.gather,PLANE.gather,EASE.lead),
 pose(TIMING.lead,PLANE.lead,EASE.coast),pose(TIMING.coast,PLANE.coast,EASE.return),pose(TIMING.home,PLANE.home,EASE.settle),pose(TIMING.settle,PLANE.rest)]),
 actor('lower-wing',`${SEND_HINGE.x}px ${SEND_HINGE.y}px`,[pose(TIMING.rest,fold(1),EASE.gather),
 pose(TIMING.wingGather,fold(WING.gather),EASE.lead),pose(TIMING.wingRelease,fold(WING.release),EASE.coast),
 pose(TIMING.coast,fold(WING.coast),EASE.return),pose(TIMING.home,fold(1)),pose(TIMING.settle,fold(1))]),
 actor('crease-light',GLINT.origin,[light(TIMING.rest,0,'scale(.45)'),light(TIMING.lightStart,0,'scale(.45)'),
 light(TIMING.lightCrest,GLINT.ink,'scale(1)'),light(TIMING.wakeOut,0,'scale(1)'),light(TIMING.settle,0,'scale(.45)')]),
 actor('wake-near','4px 15px',[light(TIMING.rest,0,WAKE.start),light(TIMING.wakeStart,0,WAKE.start),
 light(TIMING.wakeCrest,WAKE.nearInk,WAKE.peak),light(TIMING.wakeOut,0,WAKE.end),light(TIMING.settle,0,WAKE.start)]),
 actor('wake-far','7px 18px',[light(TIMING.rest,0,WAKE.start),light(TIMING.wakeFarStart,0,WAKE.start),
 light(TIMING.wakeFarCrest,WAKE.farInk,WAKE.peak),light(TIMING.wakeOut,0,WAKE.end),light(TIMING.settle,0,WAKE.start)]),
]);
