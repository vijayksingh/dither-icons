import {actor, motion, pose, light} from './authoring';

/* ── ARROW UP / rise, then let the weight catch up ────────────
 *    0ms  head and foot at rest
 *  150ms  a small downward gathering of weight
 *  370ms  head rises first; the foot is still behind
 *  410ms  two fine updrafts appear behind the passing shoulders
 *  540ms  foot catches up while the head floats
 *  810ms  foot returns; head follows, gently stretching the stem
 *  960ms  one small settling compression
 * 1120ms  rest; no idle bobbing
 * MOT-01/02/03/04/06/10: gravity, not a rotated horizontal preset.
 * ────────────────────────────────────────────────────────── */
const TIMING = {rest:0, gather:150, rise:370, float:540, land:810, weight:960, settle:1120, wake:280, crest:410, dissipate:730};
export const UP_STEM = {x:12, joint:6.8, foot:21, halfWidth:1};
const HEAD = {gather:.7, rise:-1.85, float:-1.55, land:-.35, weight:.09};
const FOOT = {gather:0, rise:-.08, float:-1.1, land:0, weight:0};
const WAKE = {origin:'12px 13px', ink:.68, start:'translateY(.8px) scaleY(.45)', crest:'translateY(0px) scaleY(1)', end:'translateY(-1.4px) scaleY(.65)'};
const EASING = {gather:'cubic-bezier(.45,0,.7,1)', lift:'cubic-bezier(.18,1,.32,1)',
  float:'cubic-bezier(.2,0,.4,1)', fall:'cubic-bezier(.45,0,.55,1)', settle:'cubic-bezier(.2,0,.2,1)'};
const beats = [
  {at:TIMING.rest, head:0, foot:0, ease:EASING.gather},
  {at:TIMING.gather, head:HEAD.gather, foot:FOOT.gather, ease:EASING.lift},
  {at:TIMING.rise, head:HEAD.rise, foot:FOOT.rise, ease:EASING.float},
  {at:TIMING.float, head:HEAD.float, foot:FOOT.float, ease:EASING.fall},
  {at:TIMING.land, head:HEAD.land, foot:FOOT.land, ease:EASING.settle},
  {at:TIMING.weight, head:HEAD.weight, foot:FOOT.weight, ease:EASING.settle},
  {at:TIMING.settle, head:0, foot:0, ease:EASING.settle},
];
export const arrowUp = motion(TIMING.settle,
  'Rise first. Let the weight follow.', ['Gather','Lift','Float home'], [
    actor('head','0px 0px',beats.map(b=>pose(b.at,`translateY(${b.head}px)`,b.ease))),
    actor('stem',`${UP_STEM.x}px ${UP_STEM.foot}px`,beats.map(b=>pose(b.at,
      `translateY(${b.foot}px) scaleY(${1+(b.foot-b.head)/(UP_STEM.foot-UP_STEM.joint)})`,b.ease))),
    actor('lift-wake',WAKE.origin,[light(TIMING.rest,0,WAKE.start),light(TIMING.wake,0,WAKE.start),
      light(TIMING.crest,WAKE.ink,WAKE.crest),light(TIMING.dissipate,0,WAKE.end),light(TIMING.settle,0,WAKE.start)]),
  ]);
