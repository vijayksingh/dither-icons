import {actor, motion, pose, light} from './authoring';

/* ── COPY / a sheet takes an impression, then finds its place ─
 *    0ms  two equal sheets, physically occluded, one shaded
 *  135ms  duplicate draws toward the fixed source
 *  195ms  source corner registers a quiet glint
 *  320ms  duplicate peels diagonally free; rotation trails position
 *  435ms  sheet squares itself, its edge catches the light
 *  505ms  two registration strokes answer outside the new corners
 *  610ms  return begins while the marks finish dispersing
 *  985ms  sheet nests with a small material correction
 * 1190ms  exact rest; no copied-state assertion
 * MOT-01/03/05/07/08/10/14/16: one object gives rise to its twin.
 * ────────────────────────────────────────────────────────── */
const TIMING = {
  rest:0, sourceStart:85, register:135, sourceGlint:195,
  peel:320, sourceOut:355, edgeStart:350, targetStart:420,
  square:435, edgeCrest:460, targetGlint:505, read:610,
  targetOut:825, nest:985, settle:1190,
};
// Identical silhouettes. The rear is a whole sheet, not a disconnected bracket.
const SHEET='M9.5 8H19a1.5 1.5 0 0 1 1.5 1.5V19a1.5 1.5 0 0 1-1.5 1.5H9.5A1.5 1.5 0 0 1 8 19V9.5A1.5 1.5 0 0 1 9.5 8Z';
export const COPY_ART = {
  sheet:SHEET, sourceOffset:'translate(-5.25 -5.25)',
  sourceMark:'M4.2 7V5.3a1.1 1.1 0 0 1 1.1-1.1H7',
  edge:'M17.5 20.2H19a1.2 1.2 0 0 0 1.2-1.2v-1.5',
  rightMark:'M22.55 17.9v2.1', bottomMark:'M17.9 22.55H20',
  separation:.38,
};
const DUPLICATE = {origin:'9px 9px', gather:'translate(-.5px,-.6px) rotate(-2.2deg)',
  peel:'translate(1.12px,1.02px) rotate(1.45deg)', square:'translate(1.35px,1.35px) rotate(0deg)',
  read:'translate(1.3px,1.3px) rotate(0deg)', nest:'translate(-.08px,-.08px) rotate(-.16deg)', rest:'translate(0px,0px) rotate(0deg)'};
const SOURCE = {origin:'4.5px 4.5px', ink:.7};
const EDGE = {origin:'20px 20px', ink:.88};
const TARGET = {ink:.86, travel:.5};
const EASE = {gather:'cubic-bezier(.4,0,.7,1)', peel:'cubic-bezier(.18,.78,.32,.95)',
  square:'cubic-bezier(.18,.35,.22,1)', hold:'cubic-bezier(.3,0,.5,1)', nest:'cubic-bezier(.42,0,.22,1)', settle:'cubic-bezier(.2,0,.2,1)'};
const duplicate=actor('duplicate',DUPLICATE.origin,[
  pose(TIMING.rest,DUPLICATE.rest,EASE.gather),pose(TIMING.register,DUPLICATE.gather,EASE.peel),
  pose(TIMING.peel,DUPLICATE.peel,EASE.square),pose(TIMING.square,DUPLICATE.square,EASE.hold),
  pose(TIMING.read,DUPLICATE.read,EASE.nest),pose(TIMING.nest,DUPLICATE.nest,EASE.settle),pose(TIMING.settle,DUPLICATE.rest)]);
const mark=(axis:'X'|'Y')=>{
  const start=`translate${axis}(-.2px) scale${axis==='X'?'Y':'X'}(.4)`;
  return actor(axis==='X'?'registration-right':'registration-bottom',axis==='X'?'22.55px 19px':'19px 22.55px',[
    light(TIMING.rest,0,start),light(TIMING.targetStart,0,start),light(TIMING.targetGlint,TARGET.ink,`translate${axis}(0px) scale(1)`),
    light(TIMING.targetOut,0,`translate${axis}(${TARGET.travel}px) scale(1)`),light(TIMING.settle,0,start)]);
};
export const copy=motion(TIMING.settle,'An impression. A twin. Its own place.',['Register','Separate','Nest'],[
  duplicate,{...duplicate,part:'duplicate-occlusion'},
  actor('source-glint',SOURCE.origin,[light(TIMING.rest,0,'scale(.7)'),light(TIMING.sourceStart,0,'scale(.7)'),
    light(TIMING.sourceGlint,SOURCE.ink,'scale(1)'),light(TIMING.sourceOut,0,'scale(1)'),light(TIMING.settle,0,'scale(.7)')]),
  actor('duplicate-edge',EDGE.origin,[light(TIMING.rest,0),light(TIMING.edgeStart,0),light(TIMING.edgeCrest,EDGE.ink),
    light(TIMING.targetOut,0),light(TIMING.settle,0)]),
  mark('X'),mark('Y'),
]);
