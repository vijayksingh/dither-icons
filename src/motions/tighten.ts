import {actor, ease, light, motion, pose} from './authoring';

/* ANIMATION STORYBOARD / TIGHTEN
 *    0ms  three retained text lines sit between four inward-facing clamp tips
 *   80ms  the clamps take up play from both sides
 *  260ms  left and right edges close around the same text block
 *  380ms  the compact block seats; its registration line answers
 *  630ms  the compact result holds without deleting the source context
 *  745ms  clamps release before the study returns
 *  980ms  exact neutral; no forward navigation or text mutation is implied
 * MOT-01/02/03/04/05/07/08/10/11/12/14/15/16: opposing text clamps
 * express concision as a bounded squeeze, not four generic arrows.
 */
export const TIGHTEN_TIMING = {
  rest: 0, brace: 80, squeeze: 260, seat: 380,
  register: 455, hold: 630, release: 745, settle: 980,
};
export const TIGHTEN_GEOMETRY = {leftX: 5.2, rightX: 18.8, centerX: 12};
const G = TIGHTEN_GEOMETRY;
export const TIGHTEN_ART = {
  text: ['M8.8 7.4h7', 'M8.8 12h6', 'M8.8 16.6h5.2'],
  left: ['M3 5.2h3.6', 'M6.6 3.4l2 1.8-2 1.8', 'M3 18.8h3.6', 'M6.6 17l2 1.8-2 1.8'],
  right: ['M21 5.2h-3.6', 'M17.4 3.4l-2 1.8 2 1.8', 'M21 18.8h-3.6', 'M17.4 17l-2 1.8 2 1.8'],
  registration: 'M9.2 20.1h5.6',
};
const T = TIGHTEN_TIMING;
const clampFrames = (travel: number) => [
  pose(T.rest, 'translateX(0px)'), pose(T.brace, `translateX(${travel * .16}px)`, ease.accelerate),
  pose(T.squeeze, `translateX(${travel}px)`, ease.settle), pose(T.hold, `translateX(${travel}px)`),
  pose(T.release, `translateX(${travel * .25}px)`, ease.smooth), pose(T.settle, 'translateX(0px)'),
];
export const tighten = motion(T.settle, 'The opposing clamps draw a text block into a concise shape.', ['Withdraw', 'Compress', 'Seat'], [
  actor('tighten-left-clamp', `${G.leftX}px 12px`, clampFrames(1.18)),
  actor('tighten-right-clamp', `${G.rightX}px 12px`, clampFrames(-1.18)),
  actor('tighten-text', `${G.centerX}px 12px`, [
    pose(T.rest, 'scaleX(1)'), pose(T.brace, 'scaleX(.985)'), pose(T.squeeze, 'scaleX(.9)', ease.settle),
    pose(T.hold, 'scaleX(.9)'), pose(T.release, 'scaleX(.97)', ease.smooth), pose(T.settle, 'scaleX(1)'),
  ]),
  actor('tighten-registration', '12px 20.1px', [
    light(T.rest, 0, 'scaleX(.15)'), light(T.seat, 0, 'scaleX(.15)'),
    light(T.register, .82, 'scaleX(1)'), light(T.hold, .82, 'scaleX(1)'),
    light(T.release, 0, 'scaleX(1)'), light(T.settle, 0, 'scaleX(.15)'),
  ]),
]);
