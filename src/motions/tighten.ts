import {actor, ease, motion, pose} from './authoring';

/* ANIMATION STORYBOARD / TIGHTEN
 *    0ms  ordered word units sit on two fixed baselines between two page edges
 *   80ms  the edges take up a small amount of whitespace
 *  280ms  every word compresses horizontally, preserving its order and baseline
 *  400ms  the shortened text block seats between the bounded edges
 *  700ms  the concise block holds as a readable sequence, not an arrow gesture
 *  820ms  word widths and whitespace release toward their original extents
 * 1040ms  exact neutral; no underline or navigation response is introduced
 * MOT-01/02/03/04/05/06/07/10/11/12/14/15/16: word units and their
 * whitespace carry the action; the bounded frame is a reference, not a clamp glyph.
 */
export const TIGHTEN_TIMING = {
  rest: 0, prepare: 80, compress: 280, seat: 400,
  hold: 700, release: 820, settle: 1040,
};
export const TIGHTEN_GEOMETRY = {leftEdge: 3.2, rightEdge: 20.8, upperBaseline: 8, lowerBaseline: 14};
export const TIGHTEN_ART = {
  bounds: ['M3.2 5.5v11', 'M20.8 5.5v11'],
  words: ['M4 8h2.3', 'M7.1 8h1.4', 'M9.5 8h3.2', 'M13.5 8h2.6', 'M17 8h1.6', 'M4 14h3.5', 'M8.3 14h2.1', 'M11.4 14h4.8'],
};
export const TIGHTEN_WORD_ORIGINS = ['4px 8px', '7.1px 8px', '9.5px 8px', '13.5px 8px', '17px 8px', '4px 14px', '8.3px 14px', '11.4px 14px'];
export const TIGHTEN_WORD_POSES = [
  'translate(.2px,0px) scaleX(.9)', 'translate(.08px,0px) scaleX(.82)', 'translate(-.12px,0px) scaleX(.82)',
  'translate(-.48px,0px) scaleX(.8)', 'translate(-1.05px,0px) scaleX(.76)', 'translate(.2px,0px) scaleX(.88)',
  'translate(-.08px,0px) scaleX(.82)', 'translate(-.62px,0px) scaleX(.8)',
];
const T = TIGHTEN_TIMING, G = TIGHTEN_GEOMETRY;
const EDGE = {leftRest: 'translateX(0px)', leftSeat: 'translateX(.65px)', rightRest: 'translateX(0px)', rightSeat: 'translateX(-1.9px)'};
const edgeFrames = (rest: string, seat: string) => [
  pose(T.rest, rest), pose(T.prepare, rest, ease.accelerate), pose(T.compress, seat, ease.settle),
  pose(T.hold, seat), pose(T.release, rest, ease.smooth), pose(T.settle, rest),
];
export const tighten = motion(T.settle, 'Ordered word units compress into a shorter text block.', ['Compress', 'Seat', 'Release'], [
  actor('tighten-bound-left', `${G.leftEdge}px 12px`, edgeFrames(EDGE.leftRest, EDGE.leftSeat)),
  actor('tighten-bound-right', `${G.rightEdge}px 12px`, edgeFrames(EDGE.rightRest, EDGE.rightSeat)),
  ...TIGHTEN_WORD_ORIGINS.map((origin, i) => actor(`tighten-word-${i}`, origin, [
    pose(T.rest, 'translate(0px,0px) scaleX(1)'), pose(T.prepare, 'translate(0px,0px) scaleX(1)'),
    pose(T.compress, TIGHTEN_WORD_POSES[i], ease.settle), pose(T.hold, TIGHTEN_WORD_POSES[i]),
    pose(T.release, 'translate(0px,0px) scaleX(1)', ease.smooth), pose(T.settle, 'translate(0px,0px) scaleX(1)'),
  ])),
]);
