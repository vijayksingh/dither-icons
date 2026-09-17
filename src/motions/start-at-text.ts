import {actor, motion, pose, light, ease} from './authoring';

/* START AT TEXT / place an entry caret, then identify its following word
 *    0ms  I-beam sits before a short word; surrounding lines stay fixed
 *  110ms  caret takes up a small backward offset
 *  410ms  caret seats in the next inter-word gap
 *  530ms  a baseline grows under the word immediately to its right
 *  630ms  the baseline's far end gives a short, local registration
 *  880ms  underline clears before the caret returns
 * 1280ms  exact original insertion point; no article seek performed
 * MOT-01/03/05/16: the text never slides; the chosen entry point does.
 */
export const START_AT_TEXT_TIMING = {
  rest: 0, prepare: 110, place: 410, identify: 530, response: 630,
  hold: 740, clear: 880, return: 950, settle: 1280,
};
export const START_AT_TEXT_GEOMETRY = {
  caretX: 4.3, destinationX: 10.15, caretTop: 9.5, caretBottom: 15.4,
  capHalfWidth: .8, textWidth: 1.6, caretWidth: 1.35, pickup: -.35,
  words: [{x: 6.7, end: 7.6}, {x: 13, end: 19.5}], rowY: 12.5,
};
const G = START_AT_TEXT_GEOMETRY;
export const START_AT_TEXT_ART = {
  context: 'M4.3 5.2h15.2M4.3 19.1h11.3',
  words: G.words.map(word => `M${word.x} ${G.rowY}H${word.end}`),
  caret: `M${G.caretX - G.capHalfWidth} ${G.caretTop}h${2 * G.capHalfWidth}M${G.caretX} ${G.caretTop}v${G.caretBottom - G.caretTop}M${G.caretX - G.capHalfWidth} ${G.caretBottom}h${2 * G.capHalfWidth}`,
  underline: 'M13 15.1h6.5', register: 'M19.5 14.9v1.05',
};
const CARET = {origin: '4.3px 12.5px', rest: 'translateX(0px)', pickup: `translateX(${G.pickup}px)`, placed: `translateX(${G.destinationX - G.caretX}px)`};
const WORD = {origin: '13px 15.1px', start: 'scaleX(.05)', full: 'scaleX(1)', ink: .9};
const T = START_AT_TEXT_TIMING;
export const startAtText = motion(T.settle, 'The caret chooses a word; its starting line appears.', ['Place', 'Identify', 'Hold'], [
  actor('start-caret', CARET.origin, [pose(T.rest, CARET.rest), pose(T.prepare, CARET.pickup, ease.settle), pose(T.place, CARET.placed), pose(T.return, CARET.placed), pose(T.settle, CARET.rest)]),
  actor('start-word-line', WORD.origin, [light(T.rest, 0, WORD.start), light(T.place, 0, WORD.start), light(T.identify, WORD.ink, WORD.full), light(T.hold, WORD.ink, WORD.full), light(T.clear, 0, WORD.full), light(T.settle, 0, WORD.start)]),
  actor('start-registration', '19.5px 15.1px', [light(T.rest, 0), light(T.identify, 0), light(T.response, .8), light(T.hold, .8), light(T.clear, 0), light(T.settle, 0)]),
]);
