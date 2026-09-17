import {actor, ease, light, motion, pose} from './authoring';
import {sparklePath} from './sparkles';

/* ANIMATION STORYBOARD / SIMPLIFY
 *    0ms  three source lines and one clarity mark hold their text-shaped silhouette
 *   90ms  the lower lines gather toward the first readable line
 *  300ms  the single clarity star opens after the text has simplified
 *  430ms  a short underline registers the clearer result
 *  650ms  the response clears while the text remains legible
 *  820ms  the compressed lines release toward their original spacing
 * 1020ms  exact neutral; no rewrite or completion state is claimed
 * MOT-01/02/03/04/05/07/08/10/11/12/14/15/16: text remains the anchor;
 * the clarity mark follows the semantic reduction, not a generic sparkle loop.
 */
export const SIMPLIFY_TIMING = {
  rest: 0, gather: 90, clarify: 300, register: 430,
  clear: 650, release: 820, settle: 1020,
};
export const SIMPLIFY_GEOMETRY = {sparkX: 17, sparkY: 9.5, sparkRadius: 2.8};
const G = SIMPLIFY_GEOMETRY;
export const SIMPLIFY_ART = {
  lines: ['M3 5.5h9.2', 'M3 9.5h7', 'M3 13.5h5'],
  sparkle: sparklePath(G.sparkX, G.sparkY, G.sparkRadius),
  clarity: 'M3.2 17.1h6.2',
};
const T = SIMPLIFY_TIMING;
const LINE = [
  {part: 'simplify-line-0', origin: '3px 5.5px', gather: 'translateY(-.05px) scaleX(.98)'},
  {part: 'simplify-line-1', origin: '3px 9.5px', gather: 'translateY(-.38px) scaleX(.91)'},
  {part: 'simplify-line-2', origin: '3px 13.5px', gather: 'translateY(-.72px) scaleX(.8)'},
];
export const simplify = motion(T.settle, 'The text lines gather before a clarity mark answers.', ['Gather', 'Clarify', 'Resolve'], [
  ...LINE.map(({part, origin, gather}) => actor(part, origin, [
    pose(T.rest, 'translate(0px, 0px)'), pose(T.gather, gather, ease.settle),
    pose(T.clear, gather), pose(T.release, gather, ease.smooth), pose(T.settle, 'translate(0px, 0px)'),
  ])),
  actor('simplify-spark', `${G.sparkX}px ${G.sparkY}px`, [
    pose(T.rest, 'scale(.88)'), pose(T.gather, 'scale(.88)'), pose(T.clarify, 'scale(1.08)', ease.settle),
    pose(T.register, 'scale(1)'), pose(T.clear, 'scale(1)'), pose(T.settle, 'scale(.88)'),
  ]),
  actor('simplify-clarity', '3.2px 17.1px', [
    light(T.rest, 0, 'scaleX(.15)'), light(T.register, 0, 'scaleX(.15)'),
    light(T.register + 1, .82, 'scaleX(1)'), light(T.clear, 0, 'scaleX(1)'), light(T.settle, 0, 'scaleX(.15)'),
  ]),
]);
