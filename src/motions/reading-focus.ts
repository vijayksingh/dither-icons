import {actor, motion, pose, light, ease} from './authoring';
import {READER_STYLE as INK} from './reader-style';

/* READING FOCUS / engage the reading timer, advance its margin marker
 *    0ms  soft-square timer, three aligned lines, and margin marker remain visible
 *  100ms  crown presses against its retained stem
 *  220ms  crown releases; marker begins one line step
 *  480ms  marker seats beside the second line
 *  600ms  that line's underline opens from the reading margin
 *  780ms  hold the selected line; no elapsed-time or progress claim
 *  900ms  underline clears before the marker returns
 * 1240ms  exact original pose
 * MOT-01/03/05/16: fixed prose, local attention, no needle or metronome.
 */
export const READING_FOCUS_TIMING = {
  rest: 0,       // Complete static timer and reading marker.
  press: 100,    // Retained crown travel.
  release: 220,  // Begin the line step.
  arrive: 480,   // Marker aligns to the second baseline.
  answer: 600,   // The selected line responds.
  hold: 780,     // Readable selection hold.
  clear: 900,    // Clear the response before returning.
  return: 940,   // Start the neutral return.
  settle: 1240,  // Exact rest.
};
export const READING_FOCUS_GEOMETRY = {
  caseLeft: 4, caseRight: 20, caseTop: 5.5, caseBottom: 21, cornerRadius: 4,
  caseWidth: INK.contour, textWidth: INK.text, markerWidth: INK.contour,
  lineY: [10, 13.5, 17], lineX: 10, lineEnd: 16.5,
  markerX: 7, markerTop: 9.25, markerBottom: 10.75,
  step: 3.5, crownTravel: .4, responseY: 15,
};
const G = READING_FOCUS_GEOMETRY;
export const READING_FOCUS_ART = {
  case: 'M8 5.5h8a4 4 0 0 1 4 4V17a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9.5a4 4 0 0 1 4-4Z',
  stem: 'M12 3v2.5', crown: 'M10 2.75h4',
  lines: G.lineY.map((y, i) => `M${G.lineX} ${y}H${i === 2 ? 14.5 : G.lineEnd}`),
  marker: `M${G.markerX} ${G.markerTop}V${G.markerBottom}`,
  underline: `M${G.lineX} ${G.responseY}H${G.lineEnd}`,
};
const MARKER = {origin: `${G.markerX}px ${G.lineY[0]}px`, rest: 'translateY(0px)', next: `translateY(${G.step}px)`};
const CROWN = {origin: '12px 2.75px', rest: 'translateY(0px)', pressed: `translateY(${G.crownTravel}px)`};
const RESPONSE = {origin: `${G.lineX}px ${G.responseY}px`, start: 'scaleX(.12)', full: 'scaleX(1)', ink: .9};
const T = READING_FOCUS_TIMING;
export const readingFocus = motion(T.settle, 'The timer engages; its margin marker advances to the next line.', ['Engage', 'Advance', 'Attend'], [
  actor('reading-crown', CROWN.origin, [pose(T.rest, CROWN.rest), pose(T.press, CROWN.pressed), pose(T.release, CROWN.rest), pose(T.settle, CROWN.rest)]),
  actor('reading-marker', MARKER.origin, [pose(T.rest, MARKER.rest), pose(T.release, MARKER.rest, ease.settle), pose(T.arrive, MARKER.next), pose(T.return, MARKER.next), pose(T.settle, MARKER.rest)]),
  actor('reading-line-response', RESPONSE.origin, [light(T.rest, 0, RESPONSE.start), light(T.arrive, 0, RESPONSE.start), light(T.answer, RESPONSE.ink, RESPONSE.full), light(T.hold, RESPONSE.ink, RESPONSE.full), light(T.clear, 0, RESPONSE.full), light(T.settle, 0, RESPONSE.start)]),
]);
