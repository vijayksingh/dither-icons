import {actor, motion, pose, light, ease} from './authoring';
import {READER_CONTROLS_STYLE as INK} from './reader-controls-style';

/* ANIMATION STORYBOARD / DRAG HANDLE
 *    0ms  a centered ribbed grip sits within four symmetric registration corners
 *   90ms  catch the upper rib; the body has not moved yet
 *  170ms  take up the load before lifting it
 *  300ms  lift from the contact shadow; the lower body trails the grasp
 *  500ms  carry right with a 9-degree inertial lean
 *  630ms  the pull brakes; mass swings past the grasp instead of stopping dead
 *  760ms  release into contact; the shadow tightens underneath the body
 *  835ms  one smaller counter-rotation dissipates the landing
 *  930ms  rest at the new position with the ribs still rigidly attached
 * 1050ms  take the grip back for the preview reset
 * 1230ms  the return pull produces the opposite lean
 * 1390ms  land home, followed by a smaller rebound at 1470ms
 * 1580ms  exact original pose; shadow and grasp light clear
 * MOT-03/04/05/06/07/16: pickup, inertia and contact give the rigid grip weight.
 */
export const DRAG_HANDLE_TIMING = {
  rest: 0,       // Complete grip and registration corners.
  grasp: 90,     // Catch the upper rib before the body responds.
  load: 170,     // Brief resistance before pickup.
  lift: 300,     // Suspended body trails the grasp.
  carry: 500,    // Carry with a directional inertial lean.
  brake: 630,    // Deceleration starts the opposite swing.
  land: 760,     // Release into contact.
  rebound: 835,  // Smaller angular recovery.
  place: 930,    // Rest at the displaced position.
  return: 1050,  // Pick up again for the preview reset.
  returnLift: 1230, // Reverse-direction drag.
  homeLand: 1390,// Return contact.
  homeRebound: 1470, // Smaller final recovery.
  settle: 1580, // Exact original position.
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
// lower body's lag. Release reversals decay; the return pull reverses the lean.
export const DRAG_HANDLE_POSES = {
  rest: {x: 0, y: 0, angle: 0},
  load: {x: .06, y: .18, angle: 1.6},
  lifted: {x: .45, y: -1.05, angle: 7},
  carried: {x: G.dx - .15, y: G.dy, angle: 9},
  braking: {x: G.dx + .4, y: -1.25, angle: -2.6},
  landed: {x: G.dx, y: .2, angle: -5},
  rebound: {x: G.dx - .08, y: -.06, angle: 2},
  placed: {x: G.dx, y: 0, angle: 0},
  returning: {x: .55, y: -.85, angle: -6},
  homeLand: {x: 0, y: .16, angle: -1.3},
  homeRebound: {x: 0, y: -.07, angle: .6},
};
type GripPose = typeof DRAG_HANDLE_POSES.rest;
export const dragTransform = ({x, y, angle}: GripPose) => `translate(${x}px, ${y}px) rotate(${angle}deg)`;
const P = DRAG_HANDLE_POSES;
const GRIP = {origin: `${G.pivotX}px ${G.pivotY}px`, carryEase: 'cubic-bezier(.3,.1,.55,1)', fallEase: 'cubic-bezier(.45,0,.8,.65)'};
const GRASP = {origin: `${G.pivotX}px ${G.pivotY}px`, dim: 0, lit: .9};
const SHADOW = {origin: `${G.shadowX}px ${G.shadowY}px`, lifted: .1, contact: .36, resting: .18, broad: 1.2, tight: .84, neutral: 1};
// Project the same rigid body's bottom center onto the contact plane. The
// shadow follows its footprint, not the pointer, and never floats vertically.
const footprint = (p: GripPose, scale: number) => `translateX(${(p.x - (G.bottom - G.pivotY) * Math.sin(p.angle * Math.PI / 180)).toFixed(4)}px) scaleX(${scale})`;
const gripFrames = [
  pose(T.rest, dragTransform(P.rest)), pose(T.grasp, dragTransform(P.rest)),
  pose(T.load, dragTransform(P.load), ease.accelerate),
  pose(T.lift, dragTransform(P.lifted), GRIP.carryEase),
  pose(T.carry, dragTransform(P.carried), ease.settle),
  pose(T.brake, dragTransform(P.braking), GRIP.fallEase),
  pose(T.land, dragTransform(P.landed), ease.settle),
  pose(T.rebound, dragTransform(P.rebound), ease.settle),
  pose(T.place, dragTransform(P.placed)), pose(T.return, dragTransform(P.placed), GRIP.carryEase),
  pose(T.returnLift, dragTransform(P.returning), GRIP.fallEase),
  pose(T.homeLand, dragTransform(P.homeLand), ease.settle),
  pose(T.homeRebound, dragTransform(P.homeRebound), ease.settle),
  pose(T.settle, dragTransform(P.rest)),
];
export const dragHandle = motion(T.settle, 'The grip lifts, leans behind the pull, then lands with a short weighted settle.', ['Pick up', 'Drag', 'Release'], [
  actor('drag-grip', GRIP.origin, gripFrames),
  actor('drag-grip-cut', GRIP.origin, gripFrames),
  actor('drag-grasp', GRASP.origin, [light(T.rest, GRASP.dim), light(T.grasp, GRASP.lit), light(T.carry, GRASP.lit), light(T.brake, GRASP.dim), light(T.place, GRASP.dim), light(T.return, GRASP.lit), light(T.returnLift, GRASP.lit), light(T.homeLand, GRASP.dim), light(T.settle, GRASP.dim)]),
  actor('drag-contact', SHADOW.origin, [
    light(T.rest, 0, footprint(P.rest, SHADOW.neutral)),
    light(T.grasp, 0, footprint(P.rest, SHADOW.neutral)),
    light(T.load, SHADOW.resting, footprint(P.load, SHADOW.tight)),
    light(T.lift, SHADOW.lifted, footprint(P.lifted, SHADOW.broad)),
    light(T.carry, SHADOW.lifted, footprint(P.carried, SHADOW.broad)),
    light(T.brake, SHADOW.lifted, footprint(P.braking, SHADOW.broad)),
    light(T.land, SHADOW.contact, footprint(P.landed, SHADOW.tight)),
    light(T.rebound, SHADOW.resting, footprint(P.rebound, SHADOW.neutral)),
    light(T.place, SHADOW.resting, footprint(P.placed, SHADOW.neutral)),
    light(T.return, SHADOW.resting, footprint(P.placed, SHADOW.neutral)),
    light(T.returnLift, SHADOW.lifted, footprint(P.returning, SHADOW.broad)),
    light(T.homeLand, SHADOW.contact, footprint(P.homeLand, SHADOW.tight)),
    light(T.homeRebound, SHADOW.resting, footprint(P.homeRebound, SHADOW.neutral)),
    light(T.settle, 0, footprint(P.rest, SHADOW.neutral)),
  ].map((frame, index) => ({...frame, easing: gripFrames[index].easing}))),
]);
