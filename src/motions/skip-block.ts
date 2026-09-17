import {actor, motion, pose, light, ease} from './authoring';
import {READER_CONTROLS_STYLE as INK} from './reader-controls-style';

/* ANIMATION STORYBOARD / SKIP BLOCK
 *    0ms  two text chunks, a hooked bypass arrow and a margin bracket remain visible
 *  140ms  bracket withdraws into the article gutter
 *  430ms  bracket passes the entire current chunk outside the text
 *  550ms  bracket seats beside the next chunk
 *  680ms  the receiving chunk's first line answers
 *  820ms  hold; both chunks remain intact and unedited
 *  940ms  receiving line clears
 * 1080ms  bracket withdraws for its return through the same empty gutter
 * 1240ms  bracket is back beside the original chunk
 * 1380ms  exact original pose
 * MOT-01/03/05/14/16: bypass a retained block, not next-page navigation.
 */
export const SKIP_BLOCK_TIMING = {
  rest: 0,        // Both article chunks remain present.
  withdraw: 140,  // Leave the current reading margin.
  bypass: 430,    // Pass the chunk through the empty gutter.
  arrive: 550,    // Seat at the next block's margin.
  answer: 680,    // Response follows arrival.
  hold: 820,      // Retain the next-block cue.
  clear: 940,     // Clear cue before returning.
  returnOut: 1080,// Withdraw into the gutter again.
  returnUp: 1240, // Return vertically outside the text.
  settle: 1380,  // Seat at the original margin.
};
export const SKIP_BLOCK_GEOMETRY = {
  markerX: 9.75, markerTop: 5.5, markerBottom: 9.5, cap: .65,
  gutterTravel: -.5, step: 10, contour: INK.contour,
  textX: 12, textEnd: 21, currentY: 6, nextY: 16, responseY: 17.5,
  arrowTipX: 7.65,
};
const G = SKIP_BLOCK_GEOMETRY;
export const SKIP_BLOCK_ART = {
  current: `M${G.textX} ${G.currentY}H${G.textEnd}M${G.textX} 9h6`,
  next: `M${G.textX} ${G.nextY}H${G.textEnd}M${G.textX} 19h6`,
  // One closed arrow contour: no overlapping stem/head strokes or hollow seams.
  bypass: 'M2.7 5.5a.5.5 0 0 1 1 0V15a2 2 0 0 0 2 2h.25l-.8-.8a.5.5 0 0 1 .7-.7l1.65 1.65a.5.5 0 0 1 0 .7L5.85 19.5a.5.5 0 0 1-.7-.7l.8-.8H5.7a3 3 0 0 1-3-3Z',
  marker: `M${G.markerX + G.cap} ${G.markerTop}H${G.markerX}V${G.markerBottom}h${G.cap}`,
  response: `M${G.textX} ${G.responseY}H${G.textEnd}`,
};
const T = SKIP_BLOCK_TIMING;
const MARKER = {
  origin: `${G.markerX}px ${G.markerTop}px`, rest: 'translate(0px, 0px)',
  outside: `translate(${G.gutterTravel}px, 0px)`,
  bypassed: `translate(${G.gutterTravel}px, ${G.step}px)`,
  arrived: `translate(0px, ${G.step}px)`,
};
const RESPONSE = {origin: `${G.textX}px ${G.responseY}px`, start: 'scaleX(.15)', full: 'scaleX(1)', ink: .9};
export const skipBlock = motion(T.settle, 'The margin bracket bypasses one text block and settles beside the next.', ['Withdraw', 'Bypass', 'Resume'], [
  actor('skip-marker', MARKER.origin, [
    pose(T.rest, MARKER.rest), pose(T.withdraw, MARKER.outside, ease.settle),
    pose(T.bypass, MARKER.bypassed), pose(T.arrive, MARKER.arrived),
    pose(T.clear, MARKER.arrived), pose(T.returnOut, MARKER.bypassed),
    pose(T.returnUp, MARKER.outside), pose(T.settle, MARKER.rest),
  ]),
  actor('skip-next-line', RESPONSE.origin, [light(T.rest, 0, RESPONSE.start), light(T.arrive, 0, RESPONSE.start), light(T.answer, RESPONSE.ink, RESPONSE.full), light(T.hold, RESPONSE.ink, RESPONSE.full), light(T.clear, 0, RESPONSE.full), light(T.settle, 0, RESPONSE.start)]),
]);
