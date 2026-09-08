import {actor, motion, pose, light} from './authoring';

/* ── EXTERNAL LINK / reach out, keep the source ───────────────
 *    0ms  source frame stays absolutely still throughout
 *  125ms  corner draws a fraction inward
 *  340ms  corner reaches beyond the source; tail remains inside
 *  430ms  a finer outer corner briefly echoes the reached destination
 *  520ms  tail follows through the opening, shortening the shaft
 *  660ms  destination is briefly legible
 *  970ms  arrow returns as one continuous object
 * 1120ms  exact rest, with no frame wobble or success signal
 * MOT-01/02/03/05/10/14: the opening is the reference for travel.
 * ────────────────────────────────────────────────────────── */
const TIMING = {rest:0, ready:125, reach:340, follow:520, read:660, return:970, settle:1120, echo:280, arrive:430, dissipate:730};
export const LINK_SHAFT = {tailX:10, tailY:14, jointX:16.7, jointY:7.3, halfWidth:.7};
const CORNER = {ready:-.35, reach:1.25, follow:1.25, read:1.15, return:-.08};
const TAIL = {ready:-.12, reach:.05, follow:1.55, read:1.55, return:-.05};
const ECHO = {origin:'21px 3px', ink:.72, start:'translate(-.55px,.55px) scale(.72)', crest:'translate(0px,0px) scale(1)', end:'translate(.15px,-.15px) scale(1.06)'};
const EASING = {prepare:'cubic-bezier(.4,0,.65,1)', reach:'cubic-bezier(.16,1,.3,1)',
  follow:'cubic-bezier(.3,0,.25,1)', hold:'cubic-bezier(.2,0,.5,1)', return:'cubic-bezier(.45,0,.2,1)', settle:'cubic-bezier(.2,0,.2,1)'};
const beats = [
  {at:TIMING.rest, head:0, tail:0, ease:EASING.prepare},
  {at:TIMING.ready, head:CORNER.ready, tail:TAIL.ready, ease:EASING.reach},
  {at:TIMING.reach, head:CORNER.reach, tail:TAIL.reach, ease:EASING.follow},
  {at:TIMING.follow, head:CORNER.follow, tail:TAIL.follow, ease:EASING.hold},
  {at:TIMING.read, head:CORNER.read, tail:TAIL.read, ease:EASING.return},
  {at:TIMING.return, head:CORNER.return, tail:TAIL.return, ease:EASING.settle},
  {at:TIMING.settle, head:0, tail:0, ease:EASING.settle},
];
export const externalLink = motion(TIMING.settle,
  'Reach beyond the frame. Keep the source.', ['Reach out','Follow through','Return'], [
    actor('corner','0px 0px',beats.map(b=>pose(b.at,`translate(${b.head}px,${-b.head}px)`,b.ease))),
    // The diagonal shaft is authored horizontally inside a fixed -45deg coordinate frame.
    actor('shaft','3px 12px',beats.map(b=>pose(b.at,
      `translateX(${Math.SQRT2*b.tail}px) scaleX(${1+(b.head-b.tail)/(LINK_SHAFT.jointX-LINK_SHAFT.tailX)})`,b.ease))),
    actor('destination-echo',ECHO.origin,[light(TIMING.rest,0,ECHO.start),light(TIMING.echo,0,ECHO.start),
      light(TIMING.arrive,ECHO.ink,ECHO.crest),light(TIMING.dissipate,0,ECHO.end),light(TIMING.settle,0,ECHO.start)]),
  ]);
