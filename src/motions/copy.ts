import {actor, motion, pose, light} from './authoring';

/* ── COPY / register, peel free, become a twin ────────────────
 *    0ms  two sheets; the source remains fixed throughout
 *  145ms  front sheet draws toward its source and tips slightly
 *  210ms  source registration catches light
 *  345ms  duplicate peels diagonally away, trailing a little rotation
 *  450ms  front sheet squares itself; outer registration ticks answer
 *  640ms  two distinct sheets, briefly held
 *  980ms  duplicate nests with a small damped correction
 * 1180ms  exact rest; no checkmark or copied-state claim
 * MOT-01/03/05/08/10/14/16: light hands off from source to duplicate.
 * ────────────────────────────────────────────────────────── */
const TIMING = {
  rest:0,        // offset pair at rest
  register:145,  // front sheet gathers toward source
  sourceStart:100,// source marker appears during registration
  sourceGlint:210,// first, smaller crest
  sourceOut:360,// source light clears as duplicate separates
  peel:345,      // duplicate leaves with a slight tilt
  targetStart:370,// destination markers wait until separation
  square:450,    // duplicate becomes parallel again
  targetGlint:480,// primary payoff at the new registration
  read:640,      // source and twin remain legible
  targetOut:790,// clear ticks before returning
  nest:980,      // very small settling correction
  settle:1180,   // exactly home
};
export const COPY_ART = {
  source:'M4 2h11a2 2 0 0 1 2 2v2h-2V4H4v11h2v2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z',
  duplicate:'M9.5 8H19a1.5 1.5 0 0 1 1.5 1.5V19a1.5 1.5 0 0 1-1.5 1.5H9.5A1.5 1.5 0 0 1 8 19V9.5A1.5 1.5 0 0 1 9.5 8Z',
  sourceMark:'M5.6 8V5.6H8',
  targetMarks:'M18.3 22.7h2.5M22.7 18.3v2.5',
};
const DUPLICATE = {origin:'9px 9px', gather:'translate(-.55px,-.65px) rotate(-2.5deg)',
  peel:'translate(1.1px,1.15px) rotate(1.8deg)', square:'translate(1.35px,1.35px) rotate(0deg)', nest:'translate(-.1px,-.1px) rotate(-.25deg)', rest:'translate(0px,0px) rotate(0deg)'};
const SOURCE = {origin:'6.5px 6.5px', ink:.58};
const TARGET = {origin:'20.5px 20.5px', ink:.84, start:'translate(-.45px,-.45px) scale(.65)', peak:'translate(0px,0px) scale(1)', end:'translate(.3px,.3px) scale(1.08)'};
const EASE = {gather:'cubic-bezier(.4,0,.7,1)', peel:'cubic-bezier(.16,1,.3,1)',
  square:'cubic-bezier(.2,0,.2,1)', hold:'cubic-bezier(.3,0,.5,1)', nest:'cubic-bezier(.5,0,.25,1)', settle:'cubic-bezier(.2,0,.2,1)'};
export const copy=motion(TIMING.settle,'The source stays. Its twin finds its place.',['Register','Separate','Nest'],[
  actor('duplicate',DUPLICATE.origin,[pose(TIMING.rest,DUPLICATE.rest,EASE.gather),pose(TIMING.register,DUPLICATE.gather,EASE.peel),
    pose(TIMING.peel,DUPLICATE.peel,EASE.square),pose(TIMING.square,DUPLICATE.square,EASE.hold),
    pose(TIMING.read,DUPLICATE.square,EASE.nest),pose(TIMING.nest,DUPLICATE.nest,EASE.settle),pose(TIMING.settle,DUPLICATE.rest)]),
  actor('source-glint',SOURCE.origin,[light(TIMING.rest,0,'scale(.7)'),light(TIMING.sourceStart,0,'scale(.7)'),
    light(TIMING.sourceGlint,SOURCE.ink,'scale(1)'),light(TIMING.sourceOut,0,'scale(1)'),light(TIMING.settle,0,'scale(.7)')]),
  actor('registration-ticks',TARGET.origin,[light(TIMING.rest,0,TARGET.start),light(TIMING.targetStart,0,TARGET.start),
    light(TIMING.targetGlint,TARGET.ink,TARGET.peak),light(TIMING.targetOut,0,TARGET.end),light(TIMING.settle,0,TARGET.start)]),
]);
