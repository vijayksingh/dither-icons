import {actor, motion, pose, light, ease} from './authoring';

/* ANIMATION STORYBOARD / READING PACE
 *    0ms  two words over a fixed, three-detent pace rail
 *   80ms  thumb takes up a small amount of travel
 *  240ms  thumb passes the next detent by a bounded amount
 *  285ms  thumb seats exactly; its rail knockout follows it
 *  335ms  the selected detent answers below the thumb
 *  400ms  first word receives the newly set cadence
 *  570ms  second word answers; the text itself never moves
 *  760ms  thumb returns after both reading cues clear
 *  980ms  exact rest; no numeric WPM change is claimed
 * MOT-01/03/05/07/08/16: a reading-rate adjustment, not a dial reading.
 */
export const READING_PACE_TIMING = {
  rest: 0, brace: 80, overshoot: 240, seat: 285, detent: 335,
  first: 400, firstPeak: 465, firstOut: 550,
  second: 570, secondPeak: 635, secondOut: 715,
  return: 760, settle: 980,
};
export const READING_PACE_GEOMETRY = {
  wordY: 5, wordStarts: [4, 14], wordWidth: 6, responseY: 7,
  railY: 17, railLeft: 3, railRight: 21, detents: [6, 12, 18],
  thumbX: 12, thumbLeft: 10, thumbRight: 14, thumbTop: 13.8, thumbBottom: 20.2,
  targetX: 18, step: 6, overshoot: .3, takeUp: -.3, detentY: 21.5,
};
const G = READING_PACE_GEOMETRY;
export const READING_PACE_ART = {
  words: G.wordStarts.map(x => `M${x} ${G.wordY}h${G.wordWidth}`),
  context: 'M4 10H18',
  rail: `M${G.railLeft} ${G.railY}H${G.railRight}`,
  detents: G.detents.map(x => `M${x} 16v2`),
  thumb: 'M11.4 13.8h1.2a1.4 1.4 0 0 1 1.4 1.4v3.6a1.4 1.4 0 0 1-1.4 1.4h-1.2a1.4 1.4 0 0 1-1.4-1.4v-3.6a1.4 1.4 0 0 1 1.4-1.4Z',
  detentResponse: `M${G.targetX - 1} ${G.detentY}h2`,
  underlines: G.wordStarts.map(x => `M${x} ${G.responseY}h${G.wordWidth}`),
};
const T = READING_PACE_TIMING;
const THUMB = {origin: `${G.thumbX}px ${G.railY}px`, rest: 'translateX(0px)', seated: `translateX(${G.step}px)`};
const CUE = {ink: .9, start: 'scaleX(.12)', full: 'scaleX(1)'};
const frames = [
  pose(T.rest, THUMB.rest), pose(T.brace, `translateX(${G.takeUp}px)`, ease.accelerate),
  pose(T.overshoot, `translateX(${G.step + G.overshoot}px)`, ease.settle),
  pose(T.seat, THUMB.seated), pose(T.return, THUMB.seated, ease.smooth), pose(T.settle, THUMB.rest),
];
export const readingPace = motion(T.settle, 'The pace thumb clicks into a detent; two words answer in sequence.', ['Adjust', 'Register', 'Read'], [
  actor('pace-thumb', THUMB.origin, frames), actor('pace-thumb-cut', THUMB.origin, frames),
  actor('pace-detent', `${G.targetX}px ${G.detentY}px`, [
    light(T.rest, 0, CUE.start), light(T.seat, 0, CUE.start), light(T.detent, CUE.ink, CUE.full),
    light(T.firstPeak, 0, CUE.full), light(T.settle, 0, CUE.start),
  ]),
  ...G.wordStarts.map((x, i) => actor(`pace-word-${i}`, `${x}px ${G.responseY}px`, [
    light(T.rest, 0, CUE.start), light(i === 0 ? T.first : T.second, 0, CUE.start),
    light(i === 0 ? T.firstPeak : T.secondPeak, CUE.ink, CUE.full),
    light(i === 0 ? T.firstOut : T.secondOut, 0, CUE.full), light(T.settle, 0, CUE.start),
  ])),
]);
