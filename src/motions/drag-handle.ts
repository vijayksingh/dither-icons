import {actor, motion, pose, light, ease} from './authoring';
import {READER_CONTROLS_STYLE as INK} from './reader-controls-style';

/* ANIMATION STORYBOARD / DRAG HANDLE
 *    0ms  a centered ribbed grip sits within four symmetric registration corners
 *  120ms  the middle rib catches light as the grip is engaged
 *  360ms  the rigid grip moves diagonally away from its registration corners
 *  470ms  the upper-right registration corner answers after arrival
 *  650ms  hold the repositioned grip
 *  780ms  the witness clears before the grip returns
 * 1120ms  grip, ribs and texture return together to exact rest
 * MOT-01/03/05/07/16: a graspable object moves, never a menu opening.
 */
export const DRAG_HANDLE_TIMING = {
  rest: 0,       // Complete grip and registration corners.
  grasp: 120,    // Engage the friction surface before translation.
  carry: 360,    // Arrive at the displaced position.
  register: 470,// Destination responds after arrival.
  hold: 650,    // Hold the new location briefly.
  clear: 780,   // Clear the destination cue before returning.
  return: 820,  // Begin the preview's neutral return.
  settle: 1120, // Exact original position.
};
export const DRAG_HANDLE_GEOMETRY = {
  left: 8, right: 16, top: 5, bottom: 19, radius: 2.5,
  dx: 1, dy: -1, contour: INK.contour,
  ribStart: 10.5, ribEnd: 13.5, ribY: [8.5, 12, 15.5],
};
const G = DRAG_HANDLE_GEOMETRY;
export const DRAG_HANDLE_ART = {
  grip: 'M10.5 5h3A2.5 2.5 0 0 1 16 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-3A2.5 2.5 0 0 1 8 16.5v-9A2.5 2.5 0 0 1 10.5 5Z',
  ribs: G.ribY.map(y => `M${G.ribStart} ${y}H${G.ribEnd}`),
  registration: 'M5.5 7V4h3M18.5 7V4h-3M5.5 17v3h3M18.5 17v3h-3',
  grasp: `M${G.ribStart} ${G.ribY[1]}H${G.ribEnd}`,
  destination: 'M18.5 7V4h-3',
};
const T = DRAG_HANDLE_TIMING;
const GRIP = {origin: '12px 12px', rest: 'translate(0px, 0px)', moved: `translate(${G.dx}px, ${G.dy}px)`};
const GRASP = {origin: '12px 12px', dim: 0, lit: .9};
const WITNESS = {origin: '18.5px 4px', dim: 0, lit: .85};
export const dragHandle = motion(T.settle, 'The ribbed grip moves diagonally; a corner marks its new position.', ['Grasp', 'Move', 'Place'], [
  actor('drag-grip', GRIP.origin, [pose(T.rest, GRIP.rest), pose(T.grasp, GRIP.rest, ease.settle), pose(T.carry, GRIP.moved), pose(T.return, GRIP.moved), pose(T.settle, GRIP.rest)]),
  actor('drag-grasp', GRASP.origin, [light(T.rest, GRASP.dim), light(T.grasp, GRASP.lit), light(T.carry, GRASP.lit), light(T.hold, GRASP.dim), light(T.settle, GRASP.dim)]),
  actor('drag-destination', WITNESS.origin, [light(T.rest, WITNESS.dim), light(T.carry, WITNESS.dim), light(T.register, WITNESS.lit), light(T.hold, WITNESS.lit), light(T.clear, WITNESS.dim), light(T.settle, WITNESS.dim)]),
]);
