import {actor, motion, pose, light, ease} from './authoring';
import {WORD_SEEK_GEOMETRY as G, WORD_SEEK_ART as A} from './word-seek-geometry';

/* ANIMATION STORYBOARD / NEXT WORD
 *    0ms  right arrow and three retained words; selector under the middle word
 *   70ms  take up forward travel with a short counter-movement
 *  110ms  release the current registration
 *  220ms  advance one interval, with a small forward overshoot
 *  270ms  seat beneath the next word
 *  335ms  reveal that word's underline from its leading edge
 *  430ms  hold the new reading position
 *  510ms  clear the response before the preview reset
 *  780ms  exact rest; no navigation or reading credit is asserted
 * MOT-01/03/05/08/16: a discrete text step, not an arrow translating alone.
 */
export const NEXT_WORD_TIMING = {
  rest: 0, load: 70, release: 110, arrive: 220, seat: 270, identify: 335,
  hold: 430, clear: 510, return: 550, settle: 780,
};
export const NEXT_WORD_ART = {...A, arrow: A.nextArrow, response: A.underlines[2]};
export const NEXT_WORD_POSES = {
  rest: 'translate(0px, 0px)', loaded: 'translate(-.25px, .25px)', lifted: 'translate(0px, -.65px)',
  over: `translate(${G.step + .35}px, 0px)`, seated: `translate(${G.step}px, 0px)`,
};
const T = NEXT_WORD_TIMING, P = NEXT_WORD_POSES;
const CURSOR = {origin: `12px ${G.cursorBottom}px`};
const WORD = {origin: `${G.centers[2] - G.wordWidth / 2}px ${G.responseY}px`, start: 'scaleX(.1)', full: 'scaleX(1)', ink: .95};
export const nextWord = motion(T.settle, 'The selector advances one word; its underline opens from the leading edge.', ['Release', 'Step', 'Identify'], [
  actor('next-word-selector', CURSOR.origin, [
    pose(T.rest, P.rest), pose(T.load, P.loaded), pose(T.release, P.lifted, ease.accelerate),
    pose(T.arrive, P.over, ease.settle), pose(T.seat, P.seated), pose(T.return, P.seated, ease.smooth), pose(T.settle, P.rest),
  ]),
  actor('next-word-identify', WORD.origin, [
    light(T.rest, 0, WORD.start), light(T.seat, 0, WORD.start), light(T.identify, WORD.ink, WORD.full),
    light(T.hold, WORD.ink, WORD.full), light(T.clear, 0, WORD.full), light(T.settle, 0, WORD.start),
  ]),
]);
