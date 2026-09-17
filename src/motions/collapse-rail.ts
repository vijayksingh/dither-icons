import {actor, motion, pose, light, ease} from './authoring';
import {READER_CONTROLS_STYLE as INK} from './reader-controls-style';

/* ANIMATION STORYBOARD / COLLAPSE RAIL
 *    0ms  a floating right rail stands beside unchanged reading lines
 *  110ms  its upward chevron leads into the retained top tab
 *  180ms  the rail starts retracting behind that tab
 *  510ms  full-size controls are occluded; the top tab remains accessible
 *  620ms  a short seam response marks the dock
 *  810ms  hold the compact rail while prose remains unchanged
 *  920ms  clear the seam response
 * 1200ms  the preview restores the rail and chevron
 * 1320ms  exact original pose
 * MOT-01/03/05/07/16: a vertical tool rail docks, not a left drawer closing.
 */
export const COLLAPSE_RAIL_TIMING = {
  rest: 0,       // Reading surface and expanded rail.
  lead: 110,     // Chevron anticipates withdrawal.
  withdraw: 180,// Rail follows the chevron.
  dock: 510,     // Rail reaches its retained tab.
  answer: 620,   // Dock seam answers after arrival.
  hold: 810,     // Hold the compact silhouette.
  clear: 920,    // Clear seam before returning.
  home: 1200,   // Expanded rail restored.
  settle: 1320, // Exact rest.
};
export const COLLAPSE_RAIL_GEOMETRY = {
  left: 16, right: 21, capTop: 3.5, capBottom: 8,
  bodyTop: 6.5, bottom: 20.5, travel: -13.25, contour: INK.contour,
  clip: {x: 15, y: 8, width: 7, height: 14},
  textX: 3, textEnd: 12, lineY: [6, 10, 14, 18],
};
const G = COLLAPSE_RAIL_GEOMETRY;
export const COLLAPSE_RAIL_ART = {
  cap: 'M18 3.5h1a2 2 0 0 1 2 2V8h-5V5.5a2 2 0 0 1 2-2Z',
  body: 'M16 6.5v11.5a2.5 2.5 0 0 0 5 0V6.5',
  controls: ['M18.5 11.25v.5', 'M18.5 14.25v.5', 'M18.5 17.25v.5'],
  chevron: 'M17.5 6.5 18.5 5.5l1 1',
  lines: G.lineY.map((y, i) => `M${G.textX} ${y}H${i === 3 ? 9 : G.textEnd}`),
  seam: 'M17.25 9.25h2.5',
};
const T = COLLAPSE_RAIL_TIMING;
const RAIL = {origin: '18.5px 8px', rest: 'translateY(0px)', docked: `translateY(${G.travel}px)`};
const CHEVRON = {origin: '18.5px 6px', rest: 'translateY(0px)', lead: 'translateY(-.35px)'};
const SEAM = {origin: '18.5px 9.25px', start: 'scaleX(.35)', full: 'scaleX(1)', ink: .95};
export const collapseRail = motion(T.settle, 'The control rail retracts into its top tab while the reading lines stay still.', ['Lead', 'Retract', 'Dock'], [
  actor('rail-body', RAIL.origin, [pose(T.rest, RAIL.rest), pose(T.withdraw, RAIL.rest, ease.settle), pose(T.dock, RAIL.docked), pose(T.clear, RAIL.docked), pose(T.home, RAIL.rest), pose(T.settle, RAIL.rest)]),
  actor('rail-chevron', CHEVRON.origin, [pose(T.rest, CHEVRON.rest), pose(T.lead, CHEVRON.lead), pose(T.hold, CHEVRON.lead), pose(T.home, CHEVRON.rest), pose(T.settle, CHEVRON.rest)]),
  actor('rail-seam', SEAM.origin, [light(T.rest, 0, SEAM.start), light(T.dock, 0, SEAM.start), light(T.answer, SEAM.ink, SEAM.full), light(T.hold, SEAM.ink, SEAM.full), light(T.clear, 0, SEAM.full), light(T.settle, 0, SEAM.start)]),
]);
