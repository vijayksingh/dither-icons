import {actor, ease, motion, pose} from './authoring';

/* ANIMATION STORYBOARD / SIMPLIFY
 *    0ms  a dense hierarchy branches around one fixed readable spine
 *   90ms  the upper subordinate fragment folds toward the spine
 *  300ms  the lower subordinate fragment follows, preserving the spine
 *  500ms  the main reading line settles open after both branches yield
 *  700ms  the reduced hierarchy holds as one stable meaning
 *  840ms  subordinate fragments unfold toward their source positions
 * 1080ms  exact neutral; no star claims clarity and no text is erased
 * MOT-01/02/03/04/05/06/07/10/11/12/14/15/16: reduce branching around
 * a stable meaning spine; the instrument is hierarchy folding, not decoration.
 */
export const SIMPLIFY_TIMING = {
  rest: 0, prepare: 90, upperFold: 300, lowerFold: 410,
  spineSettle: 500, hold: 700, release: 840, settle: 1080,
};
export const SIMPLIFY_GEOMETRY = {spineX: 6.2, upperHingeY: 8, lowerHingeY: 16};
export const SIMPLIFY_ART = {
  spine: 'M6.2 3.5V20.5',
  main: ['M9 7h10', 'M9 11h8.2', 'M9 15h9.2'],
  upper: ['M6.2 8H3.3V5.2', 'M2.6 4h2.5', 'M2.6 6h1.7'],
  lower: ['M6.2 16H3.3v2.8', 'M2.6 18h2.5', 'M2.6 20h1.7'],
};
const T = SIMPLIFY_TIMING, G = SIMPLIFY_GEOMETRY;
const BRANCH = {rest: 'translate(0px,0px) rotate(0deg)', upper: 'translate(.8px,.55px) rotate(24deg)', lower: 'translate(.8px,-.55px) rotate(-24deg)'};
export const simplify = motion(T.settle, 'Subordinate text folds into a stable reading spine.', ['Fold', 'Clarify', 'Hold'], [
  actor('simplify-branch-upper', `${G.spineX}px ${G.upperHingeY}px`, [
    pose(T.rest, BRANCH.rest), pose(T.prepare, 'translate(-.15px,0px) rotate(2deg)', ease.accelerate),
    pose(T.upperFold, BRANCH.upper, ease.settle), pose(T.hold, BRANCH.upper),
    pose(T.release, 'translate(.2px,.1px) rotate(5deg)', ease.smooth), pose(T.settle, BRANCH.rest),
  ]),
  actor('simplify-branch-lower', `${G.spineX}px ${G.lowerHingeY}px`, [
    pose(T.rest, BRANCH.rest), pose(T.upperFold, 'translate(-.15px,0px) rotate(0deg)'),
    pose(T.lowerFold, BRANCH.lower, ease.settle), pose(T.hold, BRANCH.lower),
    pose(T.release, 'translate(.2px,-.1px) rotate(-5deg)', ease.smooth), pose(T.settle, BRANCH.rest),
  ]),
  actor('simplify-spine', `${G.spineX}px 12px`, [
    pose(T.rest, 'scaleX(1)'), pose(T.lowerFold, 'scaleX(1)'),
    pose(T.spineSettle, 'scaleX(1.035)', ease.settle), pose(T.hold, 'scaleX(1.035)'),
    pose(T.release, 'scaleX(1.01)', ease.smooth), pose(T.settle, 'scaleX(1)'),
  ]),
]);
