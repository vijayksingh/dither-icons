import {actor, motion, pose, light, ease} from './authoring';

/* ANIMATION STORYBOARD / READER PATH
 *    0ms  a downward main column, side detour, and retained prose
 *   90ms  hinged route tongue takes up its play
 *  300ms  tongue seats on the main column, closing the detour entrance
 *  365ms  the downstream junction receives a short seam of light
 *  450ms  main prose below the aside responds; the aside stays present
 *  630ms  hold the main route, never erase excluded source content
 *  720ms  response clears before the tongue returns
 *  980ms  exact rest; checked state still belongs to the host switch
 * MOT-01/03/05/07/08/14/16: select a prose route, not learning milestones.
 */
export const READER_PATH_TIMING = {
  rest: 0, brace: 90, seat: 300, junction: 365, prose: 450,
  hold: 630, clear: 720, return: 750, settle: 980,
};
export const READER_PATH_GEOMETRY = {
  spineX: 5.5, top: 3.5, bottom: 20.5, hingeY: 7, tongueLength: 5,
  detourX: 11.5, detourBottom: 16, mainStart: 15, mainEnd: 21,
  mainY: [4.5, 18.5], asideY: 11.5, tongueAngle: 90, takeUp: -4,
};
const G = READER_PATH_GEOMETRY;
export const READER_PATH_ART = {
  spine: `M${G.spineX} ${G.top}V${G.bottom}M3.5 18.5l2 2 2-2`,
  detour: `M${G.spineX} ${G.hingeY}h5q1 0 1 1v6.5q0 1.5-1.5 1.5H${G.spineX}`,
  tongue: `M${G.spineX} ${G.hingeY}h${G.tongueLength}`,
  main: G.mainY.map(y => `M${G.mainStart} ${y}H${G.mainEnd}`),
  aside: `M15 ${G.asideY}h4M14 9.5h-1v4h1`,
  junction: `M${G.spineX} ${G.hingeY + G.tongueLength}v3`,
  response: `M${G.mainStart} 20.5H${G.mainEnd}`,
};
const T = READER_PATH_TIMING;
const TONGUE = {origin: `${G.spineX}px ${G.hingeY}px`, rest: 'rotate(0deg)', selected: `rotate(${G.tongueAngle}deg)`};
const RESPONSE = {ink: .95, narrow: 'scaleY(.1)', full: 'scaleY(1)', short: 'scaleX(.1)', wide: 'scaleX(1)'};
const frames = [pose(T.rest, TONGUE.rest), pose(T.brace, `rotate(${G.takeUp}deg)`, ease.accelerate),
  pose(T.seat, TONGUE.selected), pose(T.return, TONGUE.selected, ease.smooth), pose(T.settle, TONGUE.rest)];
export const readerPath = motion(T.settle, 'The gate selects the main column; the aside stays beside it.', ['Route', 'Latch', 'Continue'], [
  actor('reader-route-gate', TONGUE.origin, frames), actor('reader-route-cut', TONGUE.origin, frames),
  actor('reader-route-junction', `${G.spineX}px ${G.hingeY + G.tongueLength}px`, [
    light(T.rest, 0, RESPONSE.narrow), light(T.seat, 0, RESPONSE.narrow), light(T.junction, RESPONSE.ink, RESPONSE.full),
    light(T.prose, .4, RESPONSE.full), light(T.clear, 0, RESPONSE.full), light(T.settle, 0, RESPONSE.narrow),
  ]),
  actor('reader-route-prose', `${G.mainStart}px 20.5px`, [
    light(T.rest, 0, RESPONSE.short), light(T.junction, 0, RESPONSE.short), light(T.prose, RESPONSE.ink, RESPONSE.wide),
    light(T.hold, RESPONSE.ink, RESPONSE.wide), light(T.clear, 0, RESPONSE.wide), light(T.settle, 0, RESPONSE.short),
  ]),
]);
