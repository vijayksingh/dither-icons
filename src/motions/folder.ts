import {actor, motion, pose, light} from './authoring';

/* ── FOLDER / make room, reveal, tuck away ────────────────────
 *    0ms  tab and back stay planted; contents sit behind the cover
 *  120ms  cover takes up its hinge
 *  360ms  cover opens from its bottom edge
 *  440ms  rear sheet rises first
 *  525ms  front sheet follows and fans gently apart
 *  570ms  two fine rays punctuate the exposed paper edges
 *  850ms  rear sheet tucks in before the front sheet
 * 1120ms  cover closes after the contents clear it
 * 1320ms  exact rest
 * MOT-01/03/05/07/08/10/12/16: moving occlusion follows each plane.
 * ────────────────────────────────────────────────────────── */
const TIMING = {
  rest:0,        // all parts registered
  preload:120,   // take up cover hinge
  rearStart:180, // back sheet begins to rise
  frontStart:245,// front sheet follows
  open:360,      // cover reaches its opening
  rearRise:440,  // back sheet reaches its fan
  revealStart:455,// rays begin after the paper emerges
  frontRise:525, // front sheet finishes opening
  reveal:570,    // visible climax above the paper edges
  read:650,      // brief readable fan
  lightOut:830,  // rays dissolve before closing
  rearTuck:850,  // back sheet returns first
  frontTuck:965, // front sheet clears the cover
  close:1120,   // cover seats with restrained resistance
  settle:1320,  // exactly neutral
};
export const FOLDER_ART = {
  back:'M4 4h5l3 3h8a2 2 0 0 1 2 2v10H2V6a2 2 0 0 1 2-2Z',
  rear:'M6 9.5h10.5V19H6Z',
  front:'M7.5 10.5H18V19H7.5Z',
  cover:'M3 10h18a1 1 0 0 1 1 1.2l-1.5 8a1 1 0 0 1-1 .8h-15a1 1 0 0 1-1-.8l-1.5-8A1 1 0 0 1 3 10Z',
  rays:'M19.1 6.8l1.1-.9M16.5 5.9l.1-1.4',
  separation:.32, // transparent seam between stacked materials
};
const COVER = {origin:'12px 20px', preload:1.02, open:.59, read:.61, tuck:.86, seat:1.012};
const REAR = {origin:'12px 19px', rise:-2.25, angle:-4};
const FRONT = {origin:'12px 19px', rise:-2.65, angle:3.5};
const REVEAL = {origin:'17px 8px', ink:.82, start:'translateY(.5px) scale(.55)', peak:'translateY(0px) scale(1)', end:'translateY(-.6px) scale(1.1)'};
const EASE = {prepare:'cubic-bezier(.4,0,.7,1)', release:'cubic-bezier(.18,1,.32,1)',
  read:'cubic-bezier(.25,0,.45,1)', close:'cubic-bezier(.5,0,.3,1)', settle:'cubic-bezier(.2,0,.2,1)'};
const cover = actor('cover',COVER.origin,[
  pose(TIMING.rest,'scaleY(1)',EASE.prepare),pose(TIMING.preload,`scaleY(${COVER.preload})`,EASE.release),
  pose(TIMING.open,`scaleY(${COVER.open})`,EASE.read),pose(TIMING.read,`scaleY(${COVER.read})`,EASE.close),
  pose(TIMING.frontTuck,`scaleY(${COVER.tuck})`,EASE.close),pose(TIMING.close,`scaleY(${COVER.seat})`,EASE.settle),pose(TIMING.settle,'scaleY(1)')]);
const rear = actor('rear-paper',REAR.origin,[
  pose(TIMING.rest,'translateY(0px) rotate(0deg)'),pose(TIMING.rearStart,'translateY(0px) rotate(0deg)',EASE.release),
  pose(TIMING.rearRise,`translateY(${REAR.rise}px) rotate(${REAR.angle}deg)`,EASE.read),
  pose(TIMING.read,`translateY(${REAR.rise}px) rotate(${REAR.angle}deg)`,EASE.close),
  pose(TIMING.rearTuck,'translateY(0px) rotate(0deg)'),pose(TIMING.settle,'translateY(0px) rotate(0deg)')]);
const front = actor('front-paper',FRONT.origin,[
  pose(TIMING.rest,'translateY(0px) rotate(0deg)'),pose(TIMING.frontStart,'translateY(0px) rotate(0deg)',EASE.release),
  pose(TIMING.frontRise,`translateY(${FRONT.rise}px) rotate(${FRONT.angle}deg)`,EASE.read),
  pose(TIMING.read,`translateY(${FRONT.rise}px) rotate(${FRONT.angle}deg)`,EASE.close),
  pose(TIMING.frontTuck,'translateY(0px) rotate(0deg)'),pose(TIMING.settle,'translateY(0px) rotate(0deg)')]);
export const folder=motion(TIMING.settle,'Make room. Let the contents catch the light.',['Open','Reveal','Tuck away'],[
  cover,rear,front,
  // Each mask shares the exact track, not a second approximation of the movement.
  {...cover,part:'cover-occlusion'},{...rear,part:'rear-occlusion'},{...front,part:'front-occlusion'},
  actor('reveal-rays',REVEAL.origin,[light(TIMING.rest,0,REVEAL.start),light(TIMING.revealStart,0,REVEAL.start),
    light(TIMING.reveal,REVEAL.ink,REVEAL.peak),light(TIMING.lightOut,0,REVEAL.end),light(TIMING.settle,0,REVEAL.start)]),
]);
