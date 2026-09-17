import {actor, motion, pose, light, ease} from './authoring';
import {READER_CONTROLS_STYLE as INK} from './reader-controls-style';

/* ANIMATION STORYBOARD / DRAG HANDLE
 *    0ms  a centered ribbed grip sits within four symmetric registration corners
 *   40ms  catch the upper rib before the body responds
 *  110ms  take up the load; a small downward yield supplies resistance
 *  190ms  lift; the lower body trails the grasp
 *  320ms  finish the pull with a 9-degree weighted lean
 *  380ms  let go after a brief tension hold
 *  470ms  snap straight home in 90ms with a small opposite overshoot
 *  535ms  one smaller rebound dissipates the snap
 *  650ms  exact rest; contact shadow clears
 * MOT-03/04/05/06/07/16: weight on the pull, stored tension on release.
 */
export const DRAG_HANDLE_TIMING = {
  rest: 0,       // Complete grip and registration corners.
  grasp: 40,     // Catch the upper rib before the body responds.
  load: 110,     // Brief resistance before pickup.
  lift: 190,     // Suspended body trails the grasp.
  carry: 320,    // Reach the dragged position with a weighted lean.
  release: 380,  // Let go; no displaced landing or second pickup.
  snap: 470,     // Cross home with bounded opposite overshoot.
  rebound: 535,  // One smaller recovery.
  settle: 650,   // Exact original position.
};
export const DRAG_HANDLE_GEOMETRY = {
  left: 8, right: 16, top: 5, bottom: 19, radius: 2.5,
  dx: 2.4, dy: -1.35, contour: INK.contour, pivotX: 12, pivotY: 8.5,
  ribStart: 10.5, ribEnd: 13.5, ribY: [8.5, 12, 15.5],
  shadowX: 12, shadowY: 20, shadowRadiusX: 3, shadowRadiusY: .28,
};
const G = DRAG_HANDLE_GEOMETRY;
export const DRAG_HANDLE_ART = {
  grip: 'M10.5 5h3A2.5 2.5 0 0 1 16 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-3A2.5 2.5 0 0 1 8 16.5v-9A2.5 2.5 0 0 1 10.5 5Z',
  ribs: G.ribY.map(y => `M${G.ribStart} ${y}H${G.ribEnd}`),
  registration: 'M5.5 7V4h3M18.5 7V4h-3M5.5 17v3h3M18.5 17v3h-3',
  grasp: `M${G.ribStart} ${G.ribY[0]}H${G.ribEnd}`,
};
const T = DRAG_HANDLE_TIMING;
// Rigid poses around the caught upper rib: x/y are the grasp, angle is the
// lower body's lag. Releasing tension snaps directly home; no second drag.
export const DRAG_HANDLE_POSES = {
  rest: {x: 0, y: 0, angle: 0},
  load: {x: .06, y: .18, angle: 1.6},
  lifted: {x: .45, y: -1.05, angle: 7},
  carried: {x: G.dx, y: G.dy, angle: 9},
  snapped: {x: -.32, y: .12, angle: -3},
  rebound: {x: .08, y: -.04, angle: .8},
};
type GripPose = typeof DRAG_HANDLE_POSES.rest;
export const dragTransform = ({x, y, angle}: GripPose) => `translate(${x}px, ${y}px) rotate(${angle}deg)`;
const P = DRAG_HANDLE_POSES;
const GRIP = {origin: `${G.pivotX}px ${G.pivotY}px`, carryEase: 'cubic-bezier(.3,.1,.55,1)', snapEase: 'cubic-bezier(.16,1,.3,1)'};
const GRASP = {origin: `${G.pivotX}px ${G.pivotY}px`, dim: 0, lit: .9};
const SHADOW = {origin: `${G.shadowX}px ${G.shadowY}px`, lifted: .1, contact: .36, resting: .18, broad: 1.2, tight: .84, neutral: 1};
// Project the same rigid body's bottom center onto the contact plane. The
// shadow follows its footprint, not the pointer, and never floats vertically.
const footprint = (p: GripPose, scale: number) => `translateX(${(p.x - (G.bottom - G.pivotY) * Math.sin(p.angle * Math.PI / 180)).toFixed(4)}px) scaleX(${scale})`;
const gripFrames = [
  pose(T.rest, dragTransform(P.rest)), pose(T.grasp, dragTransform(P.rest)),
  pose(T.load, dragTransform(P.load), ease.accelerate),
  pose(T.lift, dragTransform(P.lifted), GRIP.carryEase),
  pose(T.carry, dragTransform(P.carried)),
  pose(T.release, dragTransform(P.carried), GRIP.snapEase),
  pose(T.snap, dragTransform(P.snapped), ease.settle),
  pose(T.rebound, dragTransform(P.rebound), ease.settle),
  pose(T.settle, dragTransform(P.rest)),
];
export const dragHandle = motion(T.settle, 'The grip resists the pull, then snaps back with a short rebound.', ['Grip', 'Pull', 'Snap back'], [
  actor('drag-grip', GRIP.origin, gripFrames),
  actor('drag-grip-cut', GRIP.origin, gripFrames),
  actor('drag-grasp', GRASP.origin, [light(T.rest, GRASP.dim), light(T.grasp, GRASP.lit), light(T.carry, GRASP.lit), light(T.release, GRASP.dim), light(T.settle, GRASP.dim)]),
  actor('drag-contact', SHADOW.origin, [
    light(T.rest, 0, footprint(P.rest, SHADOW.neutral)),
    light(T.grasp, 0, footprint(P.rest, SHADOW.neutral)),
    light(T.load, SHADOW.resting, footprint(P.load, SHADOW.tight)),
    light(T.lift, SHADOW.lifted, footprint(P.lifted, SHADOW.broad)),
    light(T.carry, SHADOW.lifted, footprint(P.carried, SHADOW.broad)),
    light(T.release, SHADOW.lifted, footprint(P.carried, SHADOW.broad)),
    light(T.snap, SHADOW.contact, footprint(P.snapped, SHADOW.tight)),
    light(T.rebound, SHADOW.resting, footprint(P.rebound, SHADOW.neutral)),
    light(T.settle, 0, footprint(P.rest, SHADOW.neutral)),
  ].map((frame, index) => ({...frame, easing: gripFrames[index].easing}))),
]);
