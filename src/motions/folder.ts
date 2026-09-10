import {actor, motion, pose, light} from './authoring';

/* ── FOLDER / the cover makes room, the contents catch light ─
 *    0ms  quiet back, two sheets behind the hinged cover
 *  105ms  small preload
 *  325ms  cover yields; rear paper rises through the opening
 *  420ms  front paper follows, opposing the rear's fan
 *  495ms  cover relaxes as the front sheet finds its pose
 *  530ms  light travels across its edge, then two fine reveal rays
 *  615ms  rear paper starts tucking; front follows at 675ms
 *  745ms  cover starts one continuous closing arc
 * 1110ms  cover seats after both sheets clear it
 * 1320ms  exact rest
 * MOT-01/03/05/07/08/10/12/16: nested material, connected timing.
 * ────────────────────────────────────────────────────────── */
const TIMING = {
  rest:0, preload:105, rearStart:165, frontStart:235, open:325,
  rearRise:420, edgeStart:390, frontRise:495, revealStart:480,
  edgeCrest:530, reveal:585, rearReturn:615, frontReturn:675,
  coverReturn:745, lightOut:840, rearTuck:865, frontTuck:955,
  close:1110, settle:1320,
};
export const FOLDER_ART = {
  back:'M4 4h5l3 3h8a2 2 0 0 1 2 2v10H2V6a2 2 0 0 1 2-2Z',
  rear:'M6.6 9.5h9.3a.6.6 0 0 1 .6.6V19H6v-8.9a.6.6 0 0 1 .6-.6Z',
  front:'M8.1 10.5h9.3a.6.6 0 0 1 .6.6V19H7.5v-7.9a.6.6 0 0 1 .6-.6Z',
  cover:'M3 10h18a1 1 0 0 1 1 1.2l-1.5 8a1 1 0 0 1-1 .8h-15a1 1 0 0 1-1-.8l-1.5-8A1 1 0 0 1 3 10Z',
  edge:'M8.4 10.7h8.5',
  rays:'M19.35 6.5l.9-.8M16.65 5.65l.1-1.15',
  separation:.32,
};
const COVER = {origin:'12px 20px', preload:1.018, open:.55, read:.59, seat:1.009};
const REAR = {origin:'12px 19px', rise:-2.4, angle:-6};
const FRONT = {origin:'12px 19px', rise:-2.8, angle:5};
const EDGE = {origin:'8.4px 10.7px', ink:.82};
const REVEAL = {origin:'17px 8px', ink:.84, start:'translateY(.35px) scale(.55)', peak:'translateY(-.05px) scale(1)', end:'translateY(-.6px) scale(.95)'};
const EASE = {prepare:'cubic-bezier(.4,0,.7,1)', release:'cubic-bezier(.2,.8,.32,1)',
  relax:'cubic-bezier(.22,0,.35,1)', close:'cubic-bezier(.42,0,.24,1)', settle:'cubic-bezier(.2,0,.25,1)'};
const cover=actor('cover',COVER.origin,[
  pose(TIMING.rest,'scaleY(1)',EASE.prepare),pose(TIMING.preload,`scaleY(${COVER.preload})`,EASE.release),
  pose(TIMING.open,`scaleY(${COVER.open})`,EASE.relax),pose(TIMING.frontRise,`scaleY(${COVER.read})`),
  pose(TIMING.coverReturn,`scaleY(${COVER.read})`,EASE.close),pose(TIMING.close,`scaleY(${COVER.seat})`,EASE.settle),pose(TIMING.settle,'scaleY(1)')]);
const rear=actor('rear-paper',REAR.origin,[
  pose(TIMING.rest,'translateY(0px) rotate(0deg)'),pose(TIMING.rearStart,'translateY(0px) rotate(0deg)',EASE.release),
  pose(TIMING.rearRise,`translateY(${REAR.rise}px) rotate(${REAR.angle}deg)`),
  pose(TIMING.rearReturn,`translateY(${REAR.rise}px) rotate(${REAR.angle}deg)`,EASE.close),
  pose(TIMING.rearTuck,'translateY(0px) rotate(0deg)'),pose(TIMING.settle,'translateY(0px) rotate(0deg)')]);
const front=actor('front-paper',FRONT.origin,[
  pose(TIMING.rest,'translateY(0px) rotate(0deg)'),pose(TIMING.frontStart,'translateY(0px) rotate(0deg)',EASE.release),
  pose(TIMING.frontRise,`translateY(${FRONT.rise}px) rotate(${FRONT.angle}deg)`),
  pose(TIMING.frontReturn,`translateY(${FRONT.rise}px) rotate(${FRONT.angle}deg)`,EASE.close),
  pose(TIMING.frontTuck,'translateY(0px) rotate(0deg)'),pose(TIMING.settle,'translateY(0px) rotate(0deg)')]);
export const folder=motion(TIMING.settle,'The folder opens to reveal the pages inside.',['Open','Reveal','Tuck away'],[
  cover,rear,front,
  {...cover,part:'cover-occlusion'},{...rear,part:'rear-occlusion'},{...front,part:'front-occlusion'},
  actor('paper-edge',EDGE.origin,[light(TIMING.rest,0,'scaleX(.2)'),light(TIMING.edgeStart,0,'scaleX(.2)'),
    light(TIMING.edgeCrest,EDGE.ink,'scaleX(1)'),light(TIMING.lightOut,0,'scaleX(1)'),light(TIMING.settle,0,'scaleX(.2)')]),
  actor('reveal-rays',REVEAL.origin,[light(TIMING.rest,0,REVEAL.start),light(TIMING.revealStart,0,REVEAL.start),
    light(TIMING.reveal,REVEAL.ink,REVEAL.peak),light(TIMING.lightOut,0,REVEAL.end),light(TIMING.settle,0,REVEAL.start)]),
]);
