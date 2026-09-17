import {actor, motion, pose, light, ease} from './authoring';
import {READER_STYLE as INK} from './reader-style';

/* START AT TEXT / seat an entry caret beside the chosen sentence
 *    0ms  I-beam starts beside the first of three evenly spaced text lines
 *  100ms  caret holds its starting baseline; no decorative wind-up
 *  360ms  caret seats beside the second sentence
 *  510ms  its first word receives an underline
 *  710ms  hold the chosen entry; article text never moves
 *  820ms  underline clears before the caret returns
 * 1120ms  exact original caret position
 * MOT-01/03/05/16: choose a start, not edit text or press play.
 */
export const START_AT_TEXT_TIMING = {
  rest: 0,       // Fully readable text and I-beam.
  prepare: 100,  // Brief starting-line hold.
  place: 360,    // Caret arrives at the second sentence.
  identify: 510, // First word receives its underline.
  hold: 710,     // Readable entry-point hold.
  clear: 820,    // Erase selection response before return.
  return: 850,   // Begin neutral return.
  settle: 1120,  // Exact rest.
};
export const START_AT_TEXT_GEOMETRY = {
  caretX: 4, caretTop: 4.5, caretBottom: 8.5, capHalfWidth: 1,
  caretWidth: INK.contour, textWidth: INK.text,
  lineY: [6.5, 12, 17.5], lineX: 8, lineEnd: 20, step: 5.5,
  words: [{x: 8, end: 12}, {x: 15.5, end: 20}], responseY: 14,
};
const G = START_AT_TEXT_GEOMETRY;
export const START_AT_TEXT_ART = {
  context: `M${G.lineX} ${G.lineY[0]}H${G.lineEnd}M${G.lineX} ${G.lineY[2]}H17`,
  words: G.words.map(word => `M${word.x} ${G.lineY[1]}H${word.end}`),
  caret: `M${G.caretX - G.capHalfWidth} ${G.caretTop}h${2 * G.capHalfWidth}M${G.caretX} ${G.caretTop}V${G.caretBottom}M${G.caretX - G.capHalfWidth} ${G.caretBottom}h${2 * G.capHalfWidth}`,
  underline: `M${G.words[0].x} ${G.responseY}H${G.words[0].end}`,
};
const CARET = {origin: `${G.caretX}px ${G.lineY[0]}px`, rest: 'translateY(0px)', placed: `translateY(${G.step}px)`};
const WORD = {origin: `${G.words[0].x}px ${G.responseY}px`, start: 'scaleX(.12)', full: 'scaleX(1)', ink: .95};
const T = START_AT_TEXT_TIMING;
export const startAtText = motion(T.settle, 'The caret selects a sentence; its first word is underlined.', ['Place', 'Identify', 'Hold'], [
  actor('start-caret', CARET.origin, [pose(T.rest, CARET.rest), pose(T.prepare, CARET.rest, ease.settle), pose(T.place, CARET.placed), pose(T.return, CARET.placed), pose(T.settle, CARET.rest)]),
  actor('start-word-line', WORD.origin, [light(T.rest, 0, WORD.start), light(T.place, 0, WORD.start), light(T.identify, WORD.ink, WORD.full), light(T.hold, WORD.ink, WORD.full), light(T.clear, 0, WORD.full), light(T.settle, 0, WORD.start)]),
]);
