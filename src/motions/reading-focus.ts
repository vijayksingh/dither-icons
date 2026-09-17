import {actor, motion, pose, light, ease} from './authoring';

/* READING FOCUS / engage a timer, carry attention to the next line
 *    0ms  stopwatch case, prose, and first-line brackets are readable
 *  120ms  crown takes up its short retained travel
 *  260ms  crown releases; the reading window begins its line step
 *  570ms  brackets seat on the next line without moving the prose
 *  660ms  that line's underline opens; the rim answers locally
 *  900ms  retain the reading window while its response clears
 * 1420ms  brackets return to the first line; exact neutral pose
 * MOT-01/03/05/16: advancing attention, not a metronome or speed reading.
 */
export const READING_FOCUS_TIMING = {
  rest: 0,          // Complete static symbol.
  press: 120,       // Crown compresses against its retained stem.
  release: 260,     // Start the reading step.
  arrive: 570,      // Brackets align to the second line.
  answer: 660,      // Local line and rim response.
  hold: 760,        // Give the selected line time to read.
  clear: 900,       // Remove accents before returning.
  return: 1010,     // Reading window begins its reset.
  settle: 1420,     // Exact original window.
};
export const READING_FOCUS_GEOMETRY = {
  center: [12, 13.25] as const, radius: 8.1, caseWidth: 1.55,
  lineY: [10.2, 13.35, 16.5], lineX: 8.6, lineEnd: 15.4,
  bracketLeft: 7.2, bracketRight: 16.8, bracketTop: 8.95, bracketBottom: 11.45,
  step: 3.15, crownTravel: .45, bracketWidth: 1.05, textWidth: 1.05,
};
const G = READING_FOCUS_GEOMETRY;
export const READING_FOCUS_ART = {
  case: 'M12 5.15a8.1 8.1 0 1 1 0 16.2a8.1 8.1 0 1 1 0-16.2Z',
  stem: 'M12 3.1v2.05', crown: 'M10.25 2.4h3.5', shoulder: 'M18.4 5.8l1.1-1.1',
  lines: G.lineY.map((y, i) => `M${G.lineX} ${y}h${i === 2 ? 5.2 : G.lineEnd - G.lineX}`),
  brackets: `M${G.bracketLeft + .65} ${G.bracketTop}H${G.bracketLeft}V${G.bracketBottom}h.65M${G.bracketRight - .65} ${G.bracketTop}h.65V${G.bracketBottom}h-.65`,
  underline: `M${G.lineX} 14.45H${G.lineEnd}`, rim: 'M20.65 11.3l.95-.2M20.8 13.25h1.05',
};
const WINDOW = {origin: '12px 10.2px', rest: 'translateY(0px)', next: `translateY(${G.step}px)`};
const CROWN = {origin: '12px 3px', rest: 'translateY(0px)', pressed: `translateY(${G.crownTravel}px)`};
const RESPONSE = {origin: `${G.lineX}px 14.45px`, start: 'scaleX(.08)', full: 'scaleX(1)', ink: .9};
const T = READING_FOCUS_TIMING;
export const readingFocus = motion(T.settle, 'The timer engages; a reading window advances one line.', ['Engage', 'Advance', 'Attend'], [
  actor('reading-crown', CROWN.origin, [pose(T.rest, CROWN.rest), pose(T.press, CROWN.pressed), pose(T.release, CROWN.rest), pose(T.settle, CROWN.rest)]),
  actor('reading-window', WINDOW.origin, [pose(T.rest, WINDOW.rest), pose(T.release, WINDOW.rest, ease.settle), pose(T.arrive, WINDOW.next), pose(T.return, WINDOW.next), pose(T.settle, WINDOW.rest)]),
  actor('reading-line-response', RESPONSE.origin, [light(T.rest, 0, RESPONSE.start), light(T.arrive, 0, RESPONSE.start), light(T.answer, RESPONSE.ink, RESPONSE.full), light(T.hold, RESPONSE.ink, RESPONSE.full), light(T.clear, 0, RESPONSE.full), light(T.settle, 0, RESPONSE.start)]),
  actor('reading-rim-response', '20px 13.25px', [light(T.rest, 0), light(T.arrive, 0), light(T.answer, .75), light(T.clear, 0), light(T.settle, 0)]),
]);
