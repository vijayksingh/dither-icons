import {actor, motion, pose, light} from './authoring';

/* ── UPLOAD / load the source, then release ───────────────────
 *    0ms  an upward arrow above an open tray
 *  170ms  arrow compresses downward; the tray lips gather inward
 *  210ms  source bed catches light as the stored weight releases
 *  330ms  two fine strokes flare upward from the tray
 *  355ms  head releases upward while its foot lags
 *  440ms  tray lips open AFTER release, dissipating the load
 *  560ms  foot follows upward; tray has begun to recover
 *  800ms  tray is still again before the arrow comes home
 * 1000ms  arrow seats with a nearly imperceptible overshoot
 * 1180ms  exactly the original arrow and tray
 * MOT-01/02/03/04/05/08/14: the tray releases; nothing claims success.
 * ────────────────────────────────────────────────────────── */
const TIMING = {rest:0, load:170, launch:355, release:440, follow:560, trayRest:800, seat:1000, settle:1180, clear:245, charge:90, bright:210, flare:330, dissipate:670};
export const UPLOAD_STEM = {x:12, joint:7.3, foot:17, halfWidth:1};
const HEAD = {load:.9, launch:-2.15, follow:-1.8, seat:.1};
const FOOT = {load:.4, launch:.15, follow:-1.6, seat:.05};
const LIPS = {leftX:4, rightX:20, hingeY:20, gather:7, release:-6, recover:.65};
const RELEASE = {ink:.86, origin:'12px 20px', start:'translateY(.4px) scale(.55)', crest:'translateY(-.2px) scale(1)', end:'translateY(-1.45px) scale(1.08)'};
const EASING = {load:'cubic-bezier(.45,0,.65,1)', launch:'cubic-bezier(.16,1,.3,1)',
  follow:'cubic-bezier(.25,0,.35,1)', return:'cubic-bezier(.45,0,.2,1)', settle:'cubic-bezier(.2,0,.2,1)'};
const beats = [
  {at:TIMING.rest, head:0, foot:0, ease:EASING.load},
  {at:TIMING.load, head:HEAD.load, foot:FOOT.load, ease:EASING.launch},
  {at:TIMING.launch, head:HEAD.launch, foot:FOOT.launch, ease:EASING.follow},
  {at:TIMING.follow, head:HEAD.follow, foot:FOOT.follow, ease:EASING.return},
  {at:TIMING.seat, head:HEAD.seat, foot:FOOT.seat, ease:EASING.settle},
  {at:TIMING.settle, head:0, foot:0, ease:EASING.settle},
];
const lipBeats = [
  {at:TIMING.rest, angle:0, ease:EASING.load},
  {at:TIMING.load, angle:LIPS.gather, ease:EASING.load},
  {at:TIMING.clear, angle:LIPS.gather, ease:EASING.launch},
  {at:TIMING.release, angle:LIPS.release, ease:EASING.follow},
  {at:TIMING.follow, angle:LIPS.recover, ease:EASING.settle},
  {at:TIMING.trayRest, angle:0, ease:EASING.settle},
  {at:TIMING.settle, angle:0, ease:EASING.settle},
];
export const upload = motion(TIMING.settle,
  'The arrow lifts out of the tray.', ['Gather','Release','Ease home'], [
    actor('head','0px 0px',beats.map(b=>pose(b.at,`translateY(${b.head}px)`,b.ease))),
    actor('stem',`${UPLOAD_STEM.x}px ${UPLOAD_STEM.foot}px`,beats.map(b=>pose(b.at,
      `translateY(${b.foot}px) scaleY(${1+(b.foot-b.head)/(UPLOAD_STEM.foot-UPLOAD_STEM.joint)})`,b.ease))),
    actor('lip-left',`${LIPS.leftX}px ${LIPS.hingeY}px`,lipBeats.map(b=>pose(b.at,`rotate(${b.angle}deg)`,b.ease))),
    actor('lip-right',`${LIPS.rightX}px ${LIPS.hingeY}px`,lipBeats.map(b=>pose(b.at,`rotate(${-b.angle}deg)`,b.ease))),
    actor('source-light',RELEASE.origin,[light(TIMING.rest,0,'scaleX(.25)'),light(TIMING.charge,0,'scaleX(.25)'),
      light(TIMING.bright,.8,'scaleX(.7)'),light(TIMING.release,.25,'scaleX(1)'),light(TIMING.follow,0,'scaleX(1)'),light(TIMING.settle,0,'scaleX(.25)')]),
    actor('release-flare',RELEASE.origin,[light(TIMING.rest,0,RELEASE.start),light(TIMING.clear,0,RELEASE.start),
      light(TIMING.flare,RELEASE.ink,RELEASE.crest),light(TIMING.dissipate,0,RELEASE.end),light(TIMING.settle,0,RELEASE.start)]),
  ]);
