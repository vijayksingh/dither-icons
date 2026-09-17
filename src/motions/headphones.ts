import {actor, motion, pose, light, ease} from './authoring';
import {READER_CONTROLS_STYLE as INK} from './reader-controls-style';

/* ANIMATION STORYBOARD / HEADPHONES
 *    0ms  open arch, two earcups and their internal drivers remain visible
 *  110ms  both cups begin seating inward around their retained pivots
 *  310ms  the cups seat; the arch and both suspension points stay fixed
 *  450ms  left driver responds inside its cup
 *  530ms  right driver answers; local cushion marks catch light
 *  690ms  drivers relax while cups hold their listening position
 *  830ms  cushion response clears
 * 1080ms  cups return independently of the already resting drivers
 * 1260ms  exact original headset
 * MOT-01/03/05/16: a listening output device, without page or speaker waves.
 */
export const HEADPHONES_TIMING = {
  rest: 0,       // Full static headset.
  engage: 110,   // Begin seating around the fixed suspension points.
  seat: 310,     // Cups turn inward before driver response.
  left: 450,     // First transducer receives a short response.
  right: 530,    // The paired transducer follows.
  relax: 690,    // Both drivers return to neutral.
  clear: 830,    // Clear local cushion response.
  home: 1080,    // Cups return around the same pivots.
  settle: 1260,  // Exact rest.
};
export const HEADPHONES_GEOMETRY = {
  contour: INK.contour, pivotY: 12, leftPivot: 4, rightPivot: 20,
  seatAngle: 5, driverTop: 14, driverBottom: 17, driverY: 15.5,
  driverExpansion: 1.22,
  cups: [{side: 'left', pivotX: 4, driverX: 5.5, direction: -1}, {side: 'right', pivotX: 20, driverX: 18.5, direction: 1}],
};
const G = HEADPHONES_GEOMETRY;
export const HEADPHONES_ART = {
  arch: 'M4 12v-1a8 8 0 0 1 16 0v1',
  left: 'M4 12h2a1.5 1.5 0 0 1 1.5 1.5v5A1.5 1.5 0 0 1 6 20H5.5A2.5 2.5 0 0 1 3 17.5V13a1 1 0 0 1 1-1Z',
  right: 'M20 12h-2a1.5 1.5 0 0 0-1.5 1.5v5A1.5 1.5 0 0 0 18 20h.5a2.5 2.5 0 0 0 2.5-2.5V13a1 1 0 0 0-1-1Z',
  drivers: G.cups.map(cup => `M${cup.driverX} ${G.driverTop}V${G.driverBottom}`),
  cushions: ['M9 14v3', 'M15 14v3'],
};
const T = HEADPHONES_TIMING;
const CUP = {rest: 'rotate(0deg)'};
const DRIVER = {rest: 'scaleY(1)', sounding: `scaleY(${G.driverExpansion})`};
const RESPONSE = {rest: 0, ink: .8};
export const headphones = motion(T.settle, 'The earcups seat inward; their drivers answer inside the fixed headband.', ['Seat', 'Listen', 'Release'], [
  ...G.cups.flatMap((cup, i) => {
    const peak = i === 0 ? T.left : T.right;
    const suspension = [pose(T.rest, CUP.rest), pose(T.engage, CUP.rest, ease.settle), pose(T.seat, `rotate(${cup.direction * G.seatAngle}deg)`), pose(T.clear, `rotate(${cup.direction * G.seatAngle}deg)`), pose(T.home, CUP.rest), pose(T.settle, CUP.rest)];
    return [
      actor(`headphones-${cup.side}-cup`, `${cup.pivotX}px ${G.pivotY}px`, suspension),
      actor(`headphones-${cup.side}-cut`, `${cup.pivotX}px ${G.pivotY}px`, suspension),
      actor(`headphones-${cup.side}-driver`, `${cup.driverX}px ${G.driverY}px`, [pose(T.rest, DRIVER.rest), pose(T.seat, DRIVER.rest), pose(peak, DRIVER.sounding), pose(T.relax, DRIVER.rest), pose(T.settle, DRIVER.rest)]),
      actor(`headphones-${cup.side}-response`, `${cup.driverX}px ${G.driverY}px`, [light(T.rest, RESPONSE.rest), light(T.seat, RESPONSE.rest), light(peak, RESPONSE.ink), light(T.relax, RESPONSE.ink), light(T.clear, RESPONSE.rest), light(T.settle, RESPONSE.rest)]),
    ];
  }),
]);
