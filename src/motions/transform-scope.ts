import {actor, ease, motion, pose} from './authoring';

/* ANIMATION STORYBOARD / TRANSFORM SCOPE
 *    0ms  a page boundary contains the same content as a smaller selected-passage lens
 *  110ms  the lens corners gather at the selection frame
 *  320ms  the four corners travel toward the page boundary
 *  450ms  each corner seats on the page frame with a short local click
 *  680ms  whole-article scope holds long enough to read
 *  820ms  the corners contract back into the selected passage
 * 1040ms  exact neutral; page and selection remain recognizable
 * MOT-01/02/03/04/05/06/07/10/11/12/14/15/16: the boundary/lens
 * is the scope instrument; no abstract arrow substitutes for target expansion.
 */
export const TRANSFORM_SCOPE_TIMING = {
  rest: 0, prepare: 110, expand: 320, seat: 450,
  hold: 680, contract: 820, settle: 1040,
};
export const TRANSFORM_SCOPE_GEOMETRY = {
  lensLeft: 5.4, lensTop: 6.6, lensRight: 18.2, lensBottom: 17,
  pageLeft: 3.4, pageTop: 3.2, pageRight: 20.2, pageBottom: 20.8,
};
export const TRANSFORM_SCOPE_OPACITY = {lens: .9};
/* Marks clear the text lines by 0.325-0.525 and the page frame by 0.5;
 * the 2.4-unit dog-ear keeps the seated top-right mark off the fold. */
export const TRANSFORM_SCOPE_ART = {
  page: 'M3.4 3.2h16.8v17.6H3.4Z',
  fold: 'M17.8 3.2L20.2 5.6',
  content: ['M7.2 8.5h9.2', 'M7.2 11.9h7.8', 'M7.2 15.3h5.8', 'M7.2 18.7h8.2'],
  selection: ['M6.9 6.6H5.4V8.4', 'M16.7 6.6h1.5v1.8', 'M6.9 17H5.4v-1.8', 'M16.7 17h1.5V15.2'],
};
const T = TRANSFORM_SCOPE_TIMING, G = TRANSFORM_SCOPE_GEOMETRY;
const n = (value: number) => Number(value.toFixed(2));
/* Constant-size corner marks travel to the page frame; scaling the marks
 * themselves turned the lens into oversized brackets that overshot the page. */
export const TRANSFORM_SCOPE_CORNERS = [
  {key: 'tl', x: G.lensLeft, y: G.lensTop, dx: n(G.pageLeft - G.lensLeft), dy: n(G.pageTop - G.lensTop)},
  {key: 'tr', x: G.lensRight, y: G.lensTop, dx: n(G.pageRight - G.lensRight), dy: n(G.pageTop - G.lensTop)},
  {key: 'bl', x: G.lensLeft, y: G.lensBottom, dx: n(G.pageLeft - G.lensLeft), dy: n(G.pageBottom - G.lensBottom)},
  {key: 'br', x: G.lensRight, y: G.lensBottom, dx: n(G.pageRight - G.lensRight), dy: n(G.pageBottom - G.lensBottom)},
] as const;
const corner = ({key, x, y, dx, dy}: typeof TRANSFORM_SCOPE_CORNERS[number]) => {
  const travel = (scale: number) => `translate(${n(dx * scale)}px,${n(dy * scale)}px)`;
  return actor(`scope-corner-${key}`, `${x}px ${y}px`, [
    pose(T.rest, 'translate(0px,0px) scale(1)'),
    pose(T.prepare, `${travel(-.04)} scale(.98)`, ease.accelerate),
    pose(T.expand, `${travel(.96)} scale(1)`, ease.settle),
    pose(T.seat, `${travel(1)} scale(1.1)`, ease.settle),
    pose(T.hold, `${travel(1)} scale(1)`),
    pose(T.contract, `${travel(-.03)} scale(1)`, ease.smooth),
    pose(T.settle, 'translate(0px,0px) scale(1)'),
  ]);
};
export const transformScope = motion(T.settle, 'The selected-passage lens corners travel to the page boundary and return.', ['Frame', 'Expand', 'Return'], TRANSFORM_SCOPE_CORNERS.map(corner));
