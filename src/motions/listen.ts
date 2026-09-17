import {actor, motion, pose, light, ease} from './authoring';
import {READER_STYLE as INK} from './reader-style';

/* LISTEN / a line on the page becomes outward speech
 *    0ms  broad, fold-free page and two sound arcs remain readable
 *   80ms  begin the source-line underline
 *  300ms  source line is read; near sound arc responds
 *  440ms  near arc reaches its crest
 *  470ms  farther arc begins, after the near arrival
 *  640ms  farther arc crests while the source remains marked
 *  820ms  source clears; sound contours relax separately
 * 1220ms  exact original page and waves
 * MOT-03/05/08/16: the page is the source, sound is the consequence.
 */
export const LISTEN_TIMING = {
  rest: 0,        // Complete static page-to-audio symbol.
  read: 80,       // Begin marking the source line.
  phrase: 300,    // The whole source line has been marked.
  near: 440,      // Near-wave crest.
  farStart: 470,  // Distance-ordered response.
  far: 640,       // Far-wave crest.
  sourceHold: 720,// Keep the source connected to the sound.
  clear: 820,     // Source underline disappears.
  nearRest: 960,  // Near wave returns first.
  farRest: 1120,  // Far wave returns later.
  settle: 1220,   // Exact rest.
};
export const LISTEN_GEOMETRY = {
  pageLeft: 3, pageRight: 14.5, pageTop: 4, pageBottom: 20, cornerRadius: 2,
  pageWidth: INK.contour, textWidth: INK.text, waveWidth: INK.contour,
  origin: '14.5px 12px', nearTravel: .35, farTravel: .5,
  textX: 6, textEnd: 11.5, sourceY: 12, responseY: 13.5,
  nearMaxX: 18.501, farMaxX: 21.75,
};
const G = LISTEN_GEOMETRY;
export const LISTEN_ART = {
  page: 'M5 4h7.5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
  context: `M${G.textX} 8.5H${G.textEnd}M${G.textX} 15.5H10`,
  source: `M${G.textX} ${G.sourceY}H${G.textEnd}`,
  underline: `M${G.textX} ${G.responseY}H${G.textEnd}`,
  near: 'M17.25 9.5c1.667 1.25 1.667 3.75 0 5',
  far: 'M20 7c2.333 2.5 2.333 7.5 0 10',
};
const T = LISTEN_TIMING;
const NEAR = {rest: 'translateX(0px)', crest: `translateX(${G.nearTravel}px)`};
const FAR = {rest: 'translateX(0px)', crest: `translateX(${G.farTravel}px)`};
const SOURCE = {origin: `${G.textX}px ${G.responseY}px`, start: 'scaleX(.12)', full: 'scaleX(1)', ink: .9};
export const listen = motion(T.settle, 'A line is read on the page; the two sound arcs answer outward.', ['Read', 'Speak', 'Carry'], [
  actor('listen-source', SOURCE.origin, [light(T.rest, 0, SOURCE.start), light(T.read, 0, SOURCE.start), light(T.phrase, SOURCE.ink, SOURCE.full), light(T.sourceHold, SOURCE.ink, SOURCE.full), light(T.clear, 0, SOURCE.full), light(T.settle, 0, SOURCE.start)]),
  actor('listen-near', G.origin, [pose(T.rest, NEAR.rest), pose(T.phrase, NEAR.rest, ease.settle), pose(T.near, NEAR.crest), pose(T.far, NEAR.crest), pose(T.nearRest, NEAR.rest), pose(T.settle, NEAR.rest)]),
  actor('listen-far', G.origin, [pose(T.rest, FAR.rest), pose(T.farStart, FAR.rest, ease.settle), pose(T.far, FAR.crest), pose(T.sourceHold, FAR.crest), pose(T.farRest, FAR.rest), pose(T.settle, FAR.rest)]),
]);
