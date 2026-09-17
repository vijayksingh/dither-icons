import {actor, ease, light, motion, pose} from './authoring';
import {sparklePath} from './sparkles';

/* ANIMATION STORYBOARD / VIVID
 *    0ms  a short text passage and one attached emphasis star hold together
 *  100ms  the star warms in place while the text remains the reference
 *  300ms  the focal mark opens without becoming a field of sparkles
 *  390ms  a single word underline catches the new emphasis
 *  455ms  the plus-shaped accent answers at the same local focus
 *  760ms  the emphasis clears in reverse causal order
 *  980ms  exact neutral; no color change or rewrite success is asserted
 * MOT-01/02/03/04/05/07/08/10/11/12/14/15/16: one text-bound focal
 * mark and one plus response distinguish vividness from Sparkles.
 */
export const VIVID_TIMING = {
  rest: 0, warm: 100, flare: 300, underline: 390,
  plus: 455, clear: 760, settle: 980,
};
export const VIVID_GEOMETRY = {starX: 17, starY: 8.2, starRadius: 2.9, plusX: 17, plusY: 15.8};
const G = VIVID_GEOMETRY;
export const VIVID_ART = {
  text: ['M3.2 5.8h7.2', 'M3.2 10h5.4', 'M3.2 14.2h7.2'],
  sparkle: sparklePath(G.starX, G.starY, G.starRadius),
  plus: 'M15.1 15.8h3.8M17 13.9v3.8',
  highlight: 'M3.2 17.1h7.2',
};
const T = VIVID_TIMING;
export const vivid = motion(T.settle, 'A text-bound emphasis mark opens, then its plus accent answers.', ['Warm', 'Emphasize', 'Release'], [
  actor('vivid-star', `${G.starX}px ${G.starY}px`, [
    pose(T.rest, 'scale(.9) rotate(0deg)'), pose(T.warm, 'scale(.94) rotate(4deg)', ease.accelerate),
    pose(T.flare, 'scale(1.12) rotate(12deg)', ease.settle), pose(T.underline, 'scale(1) rotate(0deg)'),
    pose(T.clear, 'scale(1) rotate(0deg)'), pose(T.settle, 'scale(.9) rotate(0deg)'),
  ]),
  actor('vivid-highlight', '3.2px 17.1px', [
    light(T.rest, 0, 'scaleX(.12)'), light(T.underline, 0, 'scaleX(.12)'),
    light(T.underline + 1, .86, 'scaleX(1)'), light(T.clear, 0, 'scaleX(1)'), light(T.settle, 0, 'scaleX(.12)'),
  ]),
  actor('vivid-plus', `${G.plusX}px ${G.plusY}px`, [
    pose(T.rest, 'scale(.78)'), pose(T.plus - 40, 'scale(.78)'), pose(T.plus, 'scale(1.06)', ease.settle),
    pose(T.clear, 'scale(1)'), pose(T.settle, 'scale(.78)'),
  ]),
]);
