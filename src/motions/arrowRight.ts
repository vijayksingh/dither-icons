import {actor, motion, pose, light} from './authoring';

/* ── ARROW RIGHT / lead, with the tail held ───────────────────
 *   0ms  one continuous arrow; tail registered at x=3
 * 115ms  head draws back, loading the shaft
 * 310ms  head leads; shaft extends from its fixed tail
 * 340ms  two tiny tip rays open at the crest, then dissipate
 * 415ms  a short, readable reach
 * 710ms  tension draws the head home, with one tiny undershoot
 * 900ms  exactly registered again
 * MOT-01/02/03/05/06/07/10/12: a continuous head and a brief directional release.
 * ────────────────────────────────────────────────────────── */
const TIMING = {rest:0, load:115, lead:310, read:415, recover:710, settle:900, spark:255, flare:340, dissipate:580};
export const RIGHT_SHAFT = {tail:3, joint:17.2, y:12, halfWidth:1};
const HEAD = {load:-.85, lead:1.9, read:1.72, recover:-.16};
const SPARK = {origin:'22px 12px', ink:.78, start:'translateX(-.6px) scale(.55)', crest:'translateX(0px) scale(1)', end:'translateX(.2px) scale(1.2)'};
const EASING = {
  load:'cubic-bezier(.4,0,.7,1)',
  release:'cubic-bezier(.16,1,.3,1)',
  coast:'cubic-bezier(.25,0,.55,1)',
  return:'cubic-bezier(.45,0,.2,1)',
  settle:'cubic-bezier(.2,0,.2,1)',
};
const beats = [
  {at:TIMING.rest, x:0, ease:EASING.load},
  {at:TIMING.load, x:HEAD.load, ease:EASING.release},
  {at:TIMING.lead, x:HEAD.lead, ease:EASING.coast},
  {at:TIMING.read, x:HEAD.read, ease:EASING.return},
  {at:TIMING.recover, x:HEAD.recover, ease:EASING.settle},
  {at:TIMING.settle, x:0, ease:EASING.settle},
];
// Both ends use identical times/easing. Their shared edge stays joined BETWEEN frames too.
export const arrowRight = motion(TIMING.settle,
  'The head leads. The tail holds its place.', ['Draw back','Extend','Resolve'], [
    actor('head','0px 0px',beats.map(b=>pose(b.at,`translateX(${b.x}px)`,b.ease))),
    actor('shaft',`${RIGHT_SHAFT.tail}px ${RIGHT_SHAFT.y}px`,beats.map(b=>
      pose(b.at,`scaleX(${1+b.x/(RIGHT_SHAFT.joint-RIGHT_SHAFT.tail)})`,b.ease))),
    actor('tip-release',SPARK.origin,[light(TIMING.rest,0,SPARK.start),light(TIMING.spark,0,SPARK.start),
      light(TIMING.flare,SPARK.ink,SPARK.crest),light(TIMING.dissipate,0,SPARK.end),light(TIMING.settle,0,SPARK.start)]),
  ]);
