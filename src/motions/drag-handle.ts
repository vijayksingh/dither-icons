import {actor, motion, pose, light, ease} from './authoring';
import {READER_CONTROLS_STYLE as INK} from './reader-controls-style';

/* ANIMATION STORYBOARD / DRAG HANDLE
 *    0ms  ribbed grip, fixed upper guides, paired lower stops
 *   40ms  grasp the upper rib before taking up the weight
 *  105ms  small counter-pull; the lower body resists
 *  180ms  lift and pull, leaving the lower stops behind
 *  285ms  reach the tension pose with a trailing lean
 *  335ms  release; accelerate into the home stops, do not ease to a halt
 *  425ms  grip underside meets both stops; receiver has not moved yet
 *  470ms  grip and stops yield together; contact light crests
 *  505ms  exterior ticks answer the contact, after the receiving motion
 *  550ms  grip rebounds free; stops return ahead of it
 *  635ms  small recovery at home
 *  700ms  exact rest, all accents hidden
 * MOT-03/05/08/16: Bin/Download's contact, receiver, then dissipation,
 * translated to a dragged grip. No floating shadow as a substitute for contact.
 */
export const DRAG_HANDLE_TIMING = {
  rest: 0,       // Complete grip and registration guides.
  grasp: 40,     // Catch the upper rib before the body responds.
  load: 105,     // Counter-pull supplies resistance.
  lift: 180,    // Suspended lower body trails the grasp.
  carry: 285,   // Readable weighted pull.
  release: 335, // Brief tension hold ends.
  snap: 425,    // Actual underside/stop contact, not an arbitrary overshoot.
  compress: 470, // Both contacting planes yield together.
  ticks: 505,   // Delayed exterior response.
  rebound: 550, // Grip separates; receiver recovers.
  lightOut: 610, // Local response clears independently.
  recover: 635, // Last small recovery.
  settle: 700,  // Exact original position.
};
export const DRAG_HANDLE_GEOMETRY = {
  left: 8, right: 16, top: 5, bottom: 19, radius: 2.5,
  dx: 3.2, dy: -1.8, contour: INK.contour, pivotX: 12, pivotY: 8.5,
  ribStart: 10.5, ribEnd: 13.5, ribY: [8.5, 12, 15.5],
  stopLeft: 5.5, stopRight: 18.5, stopTop: 17, stopTipLeft: 11, stopTipRight: 13,
  contactTravel: .55, stopYield: .42,
};
const G = DRAG_HANDLE_GEOMETRY;
// Align the ink edges, not centerlines. Material widths differ, so each
// receiver is drawn at its own neutral Y; every material shares the same motion.
export const dragSeatArt = (contourWidth: number, responseWidth: number) => {
  const y = G.bottom + G.contactTravel + (contourWidth + responseWidth) / 2;
  return {
    y,
    stop: `M${G.stopLeft} ${G.stopTop}V${y}H${G.stopTipLeft}M${G.stopRight} ${G.stopTop}V${y}H${G.stopTipRight}`,
    seam: `M7.5 ${y}H${G.stopTipLeft}M${G.stopTipRight} ${y}H16.5`,
    ticks: [`M4.25 ${y}l-1 .45`, `M19.75 ${y}l1 .45`],
  };
};
const SEAT_ART = dragSeatArt(G.contour, INK.response);
const TOP_GUIDES = 'M5.5 7V4h3M18.5 7V4h-3';
export const DRAG_HANDLE_ART = {
  grip: 'M10.5 5h3A2.5 2.5 0 0 1 16 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-3A2.5 2.5 0 0 1 8 16.5v-9A2.5 2.5 0 0 1 10.5 5Z',
  ribs: G.ribY.map(y => `M${G.ribStart} ${y}H${G.ribEnd}`),
  topGuides: TOP_GUIDES,
  registration: TOP_GUIDES + SEAT_ART.stop,
  grasp: `M${G.ribStart} ${G.ribY[0]}H${G.ribEnd}`,
};
const T = DRAG_HANDLE_TIMING;
export const DRAG_HANDLE_POSES = {
  rest: {x: 0, y: 0, angle: 0},
  load: {x: -.2, y: .2, angle: 2},
  lifted: {x: .7, y: -1.2, angle: 9},
  carried: {x: G.dx, y: G.dy, angle: 12.5},
  snapped: {x: 0, y: G.contactTravel, angle: 0},
  compressed: {x: 0, y: G.contactTravel + G.stopYield, angle: 0},
  rebound: {x: -.35, y: -.55, angle: -3.5},
  recovered: {x: .08, y: .08, angle: .65},
};
type GripPose = typeof DRAG_HANDLE_POSES.rest;
export const dragTransform = ({x, y, angle}: GripPose) => `translate(${x}px, ${y}px) rotate(${angle}deg)`;
const P = DRAG_HANDLE_POSES;
const GRIP = {origin: `${G.pivotX}px ${G.pivotY}px`, pullEase: 'cubic-bezier(.3,.1,.55,1)'};
export const DRAG_HANDLE_EASE = {
  // Same accelerating approach as Download; the impulse survives until contact.
  snap: ease.accelerate,
  contact: 'cubic-bezier(.12,.65,.25,1)', // Bin's coupled receiver easing.
  rebound: ease.settle,
};
const E = DRAG_HANDLE_EASE;
const GRASP = {origin: GRIP.origin, dim: 0, lit: .9};
const STOP = {origin: '12px 20px', rest: 'translateY(0px)', yield: `translateY(${G.stopYield}px)`};
const SEAM = {origin: STOP.origin, ink: .95, dim: .35, start: 'scaleX(.4)', full: 'scaleX(1)'};
const IMPACT = {origin: STOP.origin, ink: .8, start: 'translateX(0px)', peak: .3, end: .9};
const gripFrames = [
  pose(T.rest, dragTransform(P.rest)), pose(T.grasp, dragTransform(P.rest)),
  pose(T.load, dragTransform(P.load), ease.accelerate),
  pose(T.lift, dragTransform(P.lifted), GRIP.pullEase),
  pose(T.carry, dragTransform(P.carried)),
  pose(T.release, dragTransform(P.carried), E.snap),
  pose(T.snap, dragTransform(P.snapped), E.contact),
  pose(T.compress, dragTransform(P.compressed), E.rebound),
  pose(T.rebound, dragTransform(P.rebound), ease.smooth),
  pose(T.recover, dragTransform(P.recovered), ease.settle),
  pose(T.settle, dragTransform(P.rest)),
];
export const dragHandle = motion(T.settle, 'The grip snaps back into its stops; both yield before the rebound.', ['Pull', 'Catch', 'Rebound'], [
  actor('drag-grip', GRIP.origin, gripFrames),
  actor('drag-grip-cut', GRIP.origin, gripFrames),
  actor('drag-grasp', GRASP.origin, [light(T.rest, GRASP.dim), light(T.grasp, GRASP.lit), light(T.carry, GRASP.lit), light(T.release, GRASP.dim), light(T.settle, GRASP.dim)]),
  actor('drag-stop', STOP.origin, [
    pose(T.rest, STOP.rest), pose(T.snap, STOP.rest, E.contact),
    pose(T.compress, STOP.yield, E.rebound), pose(T.rebound, STOP.rest), pose(T.settle, STOP.rest),
  ]),
  actor('drag-seat-light', SEAM.origin, [
    light(T.rest, 0, SEAM.start), light(T.snap, 0, SEAM.start),
    light(T.compress, SEAM.ink, SEAM.full), light(T.ticks, SEAM.dim, SEAM.full),
    light(T.lightOut, 0, SEAM.full), light(T.settle, 0, SEAM.start),
  ]),
  ...[-1, 1].map((side, i) => actor(`drag-impact-${i}`, IMPACT.origin, [
    light(T.rest, 0, IMPACT.start), light(T.compress, 0, IMPACT.start),
    light(T.ticks, IMPACT.ink, `translateX(${side * IMPACT.peak}px)`),
    light(T.lightOut, 0, `translateX(${side * IMPACT.end}px)`), light(T.settle, 0, IMPACT.start),
  ])),
]);
