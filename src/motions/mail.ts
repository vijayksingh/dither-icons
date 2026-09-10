import {actor,motion,pose,light} from './authoring';

/* ── MAIL / unfold, reveal correspondence, tuck it safely ────
 *    0ms  a wide envelope, closed along its V-shaped seam
 *  115ms  flap gathers at the fixed horizontal hinge
 *  325ms  flap rolls behind the envelope
 *  505ms  a real letter clears the pocket and catches light
 *  560ms  two short reveal marks answer the paper edge
 *  650ms  paper begins tucking back into the pocket
 *  945ms  letter is hidden before the flap closes
 * 1090ms  flap seats with a small crease response
 * 1360ms  exact closed envelope
 * MOT-01/03/05/07/08/16: front/back occlusion changes at the hinge.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,        // sealed geometry
 gather:115,    // flap takes up tension
 letterStart:240,// paper waits for the opening
 open:325,      // shallow fold behind the envelope
 edgeStart:390, // emerging paper catches light
 reveal:505,    // paper at readable height
 raysStart:480, // exterior response waits for reveal
 rays:560,      // reveal climax
 tuck:650,      // paper returns before closure
 raysOut:840,   // clear opening accents
 letterHome:945,// contents inside
 closeStart:880,// hinge starts returning as paper clears
 close:1090,    // flap seats
 seam:1125,     // small closure glint
 seamOut:1240,  // glint clears
 settle:1360,   // exact rest
};
export const MAIL_HINGE={x:12,y:7.1};
export const MAIL_ART={
 back:'M4.15 7.1h15.7a1.4 1.4 0 0 1 1.4 1.4v10.1a1.4 1.4 0 0 1-1.4 1.4H4.15a1.4 1.4 0 0 1-1.4-1.4V8.5a1.4 1.4 0 0 1 1.4-1.4Z',
 flap:'M2.75 7.1h18.5l-8.3 6.25q-.95.7-1.9 0Z',
 pocket:'M2.75 7.6l8.3 6.25q.95.7 1.9 0l8.3-6.25v11a1.4 1.4 0 0 1-1.4 1.4H4.15a1.4 1.4 0 0 1-1.4-1.4Z',
 letter:'M6.6 8.9h10.8a.6.6 0 0 1 .6.6v9.8H6V9.5a.6.6 0 0 1 .6-.6Z',
 lines:'M8.5 11.65h7M8.5 14h4.6',
 cuts:'M8.5 11.4h7v.5h-7ZM8.5 13.75h4.6v.5H8.5Z',
 edge:'M7.1 9.1h9.8',
 seams:'M4.3 18.6l4.5-3.7M19.7 18.6l-4.5-3.7',
 seamCuts:'M4.1 18.4l4.5-3.7.4.4-4.5 3.7ZM19.9 18.4l-4.5-3.7-.4.4 4.5 3.7Z',
 rays:'M19.6 5.25l1-.7M17.6 2.55l.1-1.05',
 closure:'M9.85 12.45l1.25.95q.9.65 1.8 0l1.25-.95',
 separation:.28,
};
const FLAP={origin:`${MAIL_HINGE.x}px ${MAIL_HINGE.y}px`,gather:1.025,open:-.38,seat:1.012};
const LETTER={origin:'12px 18px',rise:-5.25};
const EDGE={origin:'7.1px 9.1px',ink:.85};
const RAYS={origin:'18px 5px',ink:.84,start:'translateY(.3px) scale(.55)',peak:'translateY(0px) scale(1)',end:'translateY(-.5px) scale(.95)'};
const SEAM={origin:'12px 13.5px',ink:.55};
const EASE={gather:'cubic-bezier(.4,0,.7,1)',open:'cubic-bezier(.24,.8,.34,1)',reveal:'cubic-bezier(.2,.75,.3,1)',
 tuck:'cubic-bezier(.45,0,.28,1)',close:'cubic-bezier(.4,0,.3,1)',settle:'cubic-bezier(.22,0,.3,1)'};
const flap=actor('flap',FLAP.origin,[pose(TIMING.rest,'scaleY(1)',EASE.gather),pose(TIMING.gather,`scaleY(${FLAP.gather})`,EASE.open),
 pose(TIMING.open,`scaleY(${FLAP.open})`),pose(TIMING.closeStart,`scaleY(${FLAP.open})`,EASE.close),
 pose(TIMING.close,`scaleY(${FLAP.seat})`,EASE.settle),pose(TIMING.settle,'scaleY(1)')]);
const letter=actor('letter',LETTER.origin,[pose(TIMING.rest,'translateY(0px)'),pose(TIMING.letterStart,'translateY(0px)',EASE.reveal),
 pose(TIMING.reveal,`translateY(${LETTER.rise}px)`),pose(TIMING.tuck,`translateY(${LETTER.rise}px)`,EASE.tuck),
 pose(TIMING.letterHome,'translateY(0px)'),pose(TIMING.settle,'translateY(0px)')]);
export const mail=motion(TIMING.settle,'The flap opens, the letter rises, then both close.',['Unfold','Reveal','Tuck away'],[
 flap,letter,{...flap,part:'flap-occlusion'},{...letter,part:'letter-occlusion'},{...letter,part:'letter-rear-occlusion'},
 actor('letter-edge',EDGE.origin,[light(TIMING.rest,0,'scaleX(.25)'),light(TIMING.edgeStart,0,'scaleX(.25)'),
 light(TIMING.reveal,EDGE.ink,'scaleX(1)'),light(TIMING.raysOut,0,'scaleX(1)'),light(TIMING.settle,0,'scaleX(.25)')]),
 actor('reveal-rays',RAYS.origin,[light(TIMING.rest,0,RAYS.start),light(TIMING.raysStart,0,RAYS.start),
 light(TIMING.rays,RAYS.ink,RAYS.peak),light(TIMING.raysOut,0,RAYS.end),light(TIMING.settle,0,RAYS.start)]),
 actor('closure-light',SEAM.origin,[light(TIMING.rest,0),light(TIMING.close,0),light(TIMING.seam,SEAM.ink),light(TIMING.seamOut,0),light(TIMING.settle,0)]),
]);
