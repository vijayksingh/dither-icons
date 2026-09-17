import {actor, motion, pose, light, ease} from './authoring';
import {READER_STYLE as INK} from './reader-style';

/* READ ALOUD / receive speech, then relate it to the transcript below
 *    0ms  centered microphone and two transcript rows form one vertical symbol
 *  120ms  restrained intake marks approach the microphone from the left
 *  260ms  diaphragm receives inside the stationary capsule
 *  380ms  intake clears and diaphragm rests
 *  520ms  first transcript word responds below the microphone
 *  690ms  second word responds; no checkmark or invented reading credit
 *  860ms  retain the complete phrase response
 * 1020ms  phrase underlines clear
 * 1340ms  exact original pose
 * MOT-01/03/05/14/16: microphone first, text second; never outward playback.
 */
export const READ_ALOUD_TIMING = {
  rest: 0,      // Microphone and transcript remain complete.
  approach: 120,// Incoming speech cue.
  receive: 260, // Internal diaphragm response.
  relax: 380,   // Receiver rests before text answers.
  first: 520,   // First transcript word response.
  second: 690,  // Second transcript word response.
  hold: 860,    // Readable phrase hold.
  clear: 1020,  // Clear responses without changing text.
  settle: 1340, // Exact rest.
};
export const READ_ALOUD_GEOMETRY = {
  micX: 12, capsuleLeft: 9, capsuleRight: 15, capsuleTop: 3, capsuleBottom: 11,
  micWidth: INK.contour, textWidth: INK.text,
  diaphragmWidth: 2.4, diaphragmY: 7, diaphragmRest: .5, diaphragmPeak: 1,
  words: [{x: 5, width: 4.5}, {x: 12.5, width: 6.5}], rowY: 18, responseY: 19.5,
  contextY: 21.5, inputTravel: .6,
};
const G = READ_ALOUD_GEOMETRY;
export const READ_ALOUD_ART = {
  capsule: 'M9 6a3 3 0 0 1 6 0v2a3 3 0 0 1-6 0Z',
  cradle: 'M7 8.5V9a5 5 0 0 0 10 0v-.5M12 14v1',
  diaphragm: `M${G.micX - G.diaphragmWidth / 2} ${G.diaphragmY}h${G.diaphragmWidth}`,
  context: `M5 ${G.contextY}H16`,
  words: G.words.map(word => `M${word.x} ${G.rowY}h${word.width}`),
  input: ['M4 6.5h1.25', 'M4.5 4l1.1.65'],
};
const T = READ_ALOUD_TIMING;
const INPUT = {origin: '5px 6px', start: 'translateX(0px)', received: `translateX(${G.inputTravel}px)`, ink: .75};
const DIAPHRAGM = {origin: `${G.micX}px ${G.diaphragmY}px`, rest: 'scaleX(1)', receive: `scaleX(${G.diaphragmPeak / G.diaphragmRest})`};
const PHRASE = {start: 'scaleX(.12)', full: 'scaleX(1)', ink: .95};
export const readAloud = motion(T.settle, 'The microphone receives speech; the transcript below responds word by word.', ['Receive', 'Relate', 'Retain'], [
  ...G.words.map((word, i) => actor(`aloud-phrase-${i}`, `${word.x}px ${G.responseY}px`, [
    light(T.rest, 0, PHRASE.start), light(i === 0 ? T.relax : T.first, 0, PHRASE.start),
    light(i === 0 ? T.first : T.second, PHRASE.ink, PHRASE.full), light(T.hold, PHRASE.ink, PHRASE.full), light(T.clear, 0, PHRASE.full), light(T.settle, 0, PHRASE.start),
  ])),
  actor('aloud-input', INPUT.origin, [light(T.rest, 0, INPUT.start), light(T.approach, INPUT.ink, INPUT.start), light(T.receive, 0, INPUT.received), light(T.settle, 0, INPUT.start)]),
  actor('aloud-diaphragm', DIAPHRAGM.origin, [pose(T.rest, DIAPHRAGM.rest), pose(T.approach, DIAPHRAGM.rest, ease.settle), pose(T.receive, DIAPHRAGM.receive), pose(T.relax, DIAPHRAGM.rest), pose(T.settle, DIAPHRAGM.rest)]),
]);
