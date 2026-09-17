import {actor, light, motion} from './authoring';

/* ANIMATION STORYBOARD / TRANSFORM SCOPE
 *    0ms  a whole-page outline and a selected-passage frame share one compact control
 *  120ms  the page yields slightly as the selection takes focus
 *  330ms  a bidirectional handoff crosses the narrow scope gap
 *  460ms  the selected passage seats; both scope meanings remain visible
 *  690ms  the handoff clears while the chosen scope holds briefly
 *  820ms  page and selection return to their neutral emphasis
 * 1040ms  exact neutral; the host still owns pressed state and target selection
 * MOT-01/02/03/04/05/07/08/10/11/12/14/15/16: scope is a relation
 * between page and passage, not a page icon or selection marquee alone.
 */
export const TRANSFORM_SCOPE_TIMING = {
  rest: 0, prepare: 120, handoff: 330, seat: 460,
  clear: 690, release: 820, settle: 1040,
};
export const TRANSFORM_SCOPE_GEOMETRY = {pageX: 7.2, selectionX: 17.5};
export const TRANSFORM_SCOPE_OPACITY = {page: .78, selection: .95};
export const TRANSFORM_SCOPE_ART = {
  page: 'M3.2 3.3h5.2l2 2v15.4H3.2Z',
  fold: 'M8.4 3.3v2h2',
  pageLines: ['M5 9h3.5', 'M5 12h3.5', 'M5 15h2.5'],
  selection: ['M15 7h-1.3v2.2', 'M18.7 7H20v2.2', 'M15 17h-1.3v-2.2', 'M18.7 17H20v-2.2'],
  selectionLines: ['M15.2 11h4.1', 'M15.2 13.8h3.1'],
  transfer: 'M11.2 9.4h1.6l-.8-.8M12.8 14.6h-1.6l.8.8',
};
const T = TRANSFORM_SCOPE_TIMING;
const G = TRANSFORM_SCOPE_GEOMETRY;
export const transformScope = motion(T.settle, 'The page and passage frame hand off the active transform scope.', ['Present', 'Switch', 'Settle'], [
  actor('scope-page', `${G.pageX}px 12px`, [
    light(T.rest, TRANSFORM_SCOPE_OPACITY.page, 'scale(1)'), light(T.prepare, TRANSFORM_SCOPE_OPACITY.page, 'scale(1)'),
    light(T.handoff, TRANSFORM_SCOPE_OPACITY.page, 'scale(.95)'), light(T.seat, TRANSFORM_SCOPE_OPACITY.page, 'scale(.95)'),
    light(T.clear, TRANSFORM_SCOPE_OPACITY.page, 'scale(.98)'), light(T.release, TRANSFORM_SCOPE_OPACITY.page, 'scale(1)'), light(T.settle, TRANSFORM_SCOPE_OPACITY.page, 'scale(1)'),
  ]),
  actor('scope-selection', `${G.selectionX}px 12px`, [
    light(T.rest, TRANSFORM_SCOPE_OPACITY.selection, 'scale(1)'), light(T.prepare, TRANSFORM_SCOPE_OPACITY.selection, 'scale(1.03)'),
    light(T.handoff, TRANSFORM_SCOPE_OPACITY.selection, 'scale(1.05)'), light(T.seat, TRANSFORM_SCOPE_OPACITY.selection, 'scale(1.08)'),
    light(T.clear, TRANSFORM_SCOPE_OPACITY.selection, 'scale(1.05)'), light(T.release, TRANSFORM_SCOPE_OPACITY.selection, 'scale(1)'), light(T.settle, TRANSFORM_SCOPE_OPACITY.selection, 'scale(1)'),
  ]),
  actor('scope-transfer', '12px 12px', [
    light(T.rest, 0, 'translateX(-.6px) scale(.7)'), light(T.prepare, 0, 'translateX(-.6px) scale(.7)'),
    light(T.handoff, .82, 'translateX(.45px) scale(1)'), light(T.seat, .86, 'translateX(0px) scale(1)'),
    light(T.clear, 0, 'translateX(.6px) scale(.7)'), light(T.settle, 0, 'translateX(-.6px) scale(.7)'),
  ]),
]);
