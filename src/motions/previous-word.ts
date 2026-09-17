import {actor, motion, pose, light, ease} from './authoring';
import {WORD_SEEK_GEOMETRY as G, WORD_SEEK_ART as A} from './word-seek-geometry';

/* ANIMATION STORYBOARD / PREVIOUS WORD
 *    0ms  left arrow and three retained words; selector under the middle word
 *   90ms  lift the selector out of its current registration
 *  230ms  rewind exactly one interval with a bounded leading-edge overshoot
 *  290ms  seat beneath the preceding word
 *  360ms  its underline opens from the recalled word's trailing edge
 *  510ms  hold that word for recognition
 *  590ms  clear the response, then return the preview selector
 *  860ms  exact rest; the article and playback index never change
 * MOT-01/03/05/08/16: recall one word, not navigate to a previous page.
 */
export const PREVIOUS_WORD_TIMING = {
  rest: 0, lift: 90, arrive: 230, seat: 290, recall: 360,
  hold: 510, clear: 590, return: 620, settle: 860,
};
export const PREVIOUS_WORD_ART = {...A, arrow: A.previousArrow, response: A.underlines[0]};
export const PREVIOUS_WORD_POSES = {
  rest: 'translate(0px, 0px)', lifted: 'translate(.25px, -.8px)',
  over: `translate(${-G.step - .3}px, -.15px)`, seated: `translate(${-G.step}px, 0px)`,
};
const T = PREVIOUS_WORD_TIMING, P = PREVIOUS_WORD_POSES;
const CURSOR = {origin: `12px ${G.cursorBottom}px`};
const RECALL = {origin: `${G.centers[0] + G.wordWidth / 2}px ${G.responseY}px`, start: 'scaleX(.1)', full: 'scaleX(1)', ink: .95};
export const previousWord = motion(T.settle, 'The selector lifts and steps back one word; that word is underlined.', ['Release', 'Recall', 'Hold'], [
  actor('previous-word-selector', CURSOR.origin, [
    pose(T.rest, P.rest), pose(T.lift, P.lifted, ease.accelerate), pose(T.arrive, P.over, ease.settle),
    pose(T.seat, P.seated), pose(T.return, P.seated, ease.smooth), pose(T.settle, P.rest),
  ]),
  actor('previous-word-recall', RECALL.origin, [
    light(T.rest, 0, RECALL.start), light(T.seat, 0, RECALL.start), light(T.recall, RECALL.ink, RECALL.full),
    light(T.hold, RECALL.ink, RECALL.full), light(T.clear, 0, RECALL.full), light(T.settle, 0, RECALL.start),
  ]),
]);
