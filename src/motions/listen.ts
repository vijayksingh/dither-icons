import {actor, motion, pose, light, ease} from './authoring';

/* LISTEN / written phrase becomes outward speech
 *    0ms  folded page and two sound arcs identify page-to-audio mode
 *  120ms  first word begins its source underline
 *  300ms  first word carries into the second
 *  450ms  phrase is ready; near arc begins responding
 *  570ms  near sound arc expands from the page edge
 *  730ms  farther arc answers; source phrase remains visible
 *  820ms  a fine front leaves the outer arc
 * 1080ms  source underline and front clear; arcs relax independently
 * 1480ms  exact page-and-sound rest; no actual audio starts
 * MOT-03/05/08/16: text is the source; propagation is the consequence.
 */
export const LISTEN_TIMING = {
  rest: 0, read: 120, first: 300, phrase: 450, near: 570,
  farStart: 580, far: 730, front: 820, sourceHold: 850,
  clear: 1080, nearRest: 1160, farRest: 1300, settle: 1480,
};
export const LISTEN_GEOMETRY = {
  pageWidth: 1.5, textWidth: 1.1, waveWidth: 1.5,
  origin: '13.8px 12px', nearTravel: .45, farTravel: .65,
  words: [{x: 5.8, width: 2.1}, {x: 9.3, width: 1.9}],
  nearMaxX: 18, farMaxX: 21.5, frontMaxX: 22.4,
};
export const LISTEN_ART = {
  page: 'M13.8 8.1V20a1 1 0 0 1-1 1H4.2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5.3l4.3 5.1ZM9.5 3v4.1a1 1 0 0 0 1 1h3.3',
  words: LISTEN_GEOMETRY.words.map(word => `M${word.x} 11.3h${word.width}`),
  context: 'M5.8 15h5.4M5.8 17.8h3.4',
  near: 'M16.5 8.7c2 1.8 2 4.8 0 6.6',
  far: 'M19 5.6c3.33 3.5 3.33 9.3 0 12.8',
  front: 'M21.8 9.8q1.2 2.2 0 4.4',
};
const G = LISTEN_GEOMETRY, T = LISTEN_TIMING;
const NEAR = {rest: 'translateX(0px)', crest: `translateX(${G.nearTravel}px)`};
const FAR = {rest: 'translateX(0px)', crest: `translateX(${G.farTravel}px)`};
const FRONT = {start: 'translateX(-.25px)', end: 'translateX(.45px)', ink: .72};
const WORD = {start: 'scaleX(.05)', full: 'scaleX(1)', ink: .85};
export const listen = motion(T.settle, 'A written phrase leads; sound travels out from the page.', ['Read', 'Speak', 'Carry'], [
  ...G.words.map((word, i) => actor(`listen-word-${i}`, `${word.x}px 12.65px`, [
    light(T.rest, 0, WORD.start), light(i === 0 ? T.read : T.first, 0, WORD.start),
    light(i === 0 ? T.first : T.phrase, WORD.ink, WORD.full), light(T.sourceHold, WORD.ink, WORD.full), light(T.clear, 0, WORD.full), light(T.settle, 0, WORD.start),
  ])),
  actor('listen-near', G.origin, [pose(T.rest, NEAR.rest), pose(T.phrase, NEAR.rest, ease.settle), pose(T.near, NEAR.crest), pose(T.far, NEAR.crest), pose(T.nearRest, NEAR.rest), pose(T.settle, NEAR.rest)]),
  actor('listen-far', G.origin, [pose(T.rest, FAR.rest), pose(T.farStart, FAR.rest, ease.settle), pose(T.far, FAR.crest), pose(T.front, FAR.crest), pose(T.farRest, FAR.rest), pose(T.settle, FAR.rest)]),
  actor('listen-front', G.origin, [light(T.rest, 0, FRONT.start), light(T.far, 0, FRONT.start), light(T.front, FRONT.ink, FRONT.start), light(T.clear, 0, FRONT.end), light(T.settle, 0, FRONT.start)]),
]);
