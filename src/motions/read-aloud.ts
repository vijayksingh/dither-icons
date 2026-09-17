import {actor, motion, pose, light, ease} from './authoring';

/* READ ALOUD / receive speech before responding at the printed phrase
 *    0ms  microphone, cradle, and text are already fully recognizable
 *  140ms  two inward marks approach the microphone's open sound field
 *  300ms  diaphragm receives the input inside the stationary capsule
 *  440ms  diaphragm relaxes; input marks have cleared
 *  580ms  first text segment responds after reception
 *  760ms  second segment follows; retain the entire printed phrase
 *  830ms  small baseline witness registers at the phrase end
 * 1120ms  phrase response clears without a checkmark or progress badge
 * 1540ms  exact static microphone and text; no recognition claim
 * MOT-03/05/14/16: input precedes text response, unlike Listen's output.
 */
export const READ_ALOUD_TIMING = {
  rest: 0, approach: 140, receive: 300, relax: 440, first: 580,
  second: 760, answer: 830, hold: 950, clear: 1120, settle: 1540,
};
export const READ_ALOUD_GEOMETRY = {
  micX: 17.2, capsuleLeft: 14.8, capsuleRight: 19.6,
  capsuleTop: 3.3, capsuleBottom: 13.4, micWidth: 1.5, textWidth: 1.35,
  diaphragmWidth: 2.6, diaphragmRest: .48, diaphragmPeak: 1,
  words: [{x: 2.8, width: 2.2}, {x: 6.6, width: 3.1}],
  inputTravel: .6,
};
const G = READ_ALOUD_GEOMETRY;
export const READ_ALOUD_ART = {
  capsule: 'M14.8 5.7a2.4 2.4 0 0 1 4.8 0V11a2.4 2.4 0 0 1-4.8 0Z',
  cradle: 'M12.5 10.5V11a4.7 4.7 0 0 0 9.4 0v-.5M17.2 15.7v4.8M14.1 20.5h6.2',
  grille: 'M16.3 6.5h1.8M16.3 8.4h1.8',
  diaphragm: 'M15.9 10.6h2.6',
  context: 'M2.8 5.7h6.9M2.8 18.5h5.1',
  words: G.words.map(word => `M${word.x} 12.1h${word.width}`),
  input: ['M22.2 4.8l-1.1.65', 'M22.8 7.5h-1.2'],
  registration: 'M9.7 14.5v.9',
};
const T = READ_ALOUD_TIMING;
const INPUT = {start: 'translateX(.3px)', received: `translateX(-${G.inputTravel}px)`, ink: .75};
const DIAPHRAGM = {origin: '17.2px 10.6px', rest: 'scaleX(1)', receive: `scaleX(${G.diaphragmPeak / G.diaphragmRest})`};
const PHRASE = {start: 'scaleX(.04)', full: 'scaleX(1)', ink: .95};
export const readAloud = motion(T.settle, 'The microphone receives speech; the text responds in order.', ['Receive', 'Relate', 'Retain'], [
  ...G.words.map((word, i) => actor(`aloud-phrase-${i}`, `${word.x}px 14.7px`, [
    light(T.rest, 0, PHRASE.start), light(i === 0 ? T.relax : T.first, 0, PHRASE.start),
    light(i === 0 ? T.first : T.second, PHRASE.ink, PHRASE.full), light(T.hold, PHRASE.ink, PHRASE.full), light(T.clear, 0, PHRASE.full), light(T.settle, 0, PHRASE.start),
  ])),
  actor('aloud-input', '21px 6px', [light(T.rest, 0, INPUT.start), light(T.approach, INPUT.ink, INPUT.start), light(T.receive, 0, INPUT.received), light(T.settle, 0, INPUT.start)]),
  actor('aloud-diaphragm', DIAPHRAGM.origin, [pose(T.rest, DIAPHRAGM.rest), pose(T.approach, DIAPHRAGM.rest, ease.settle), pose(T.receive, DIAPHRAGM.receive), pose(T.relax, DIAPHRAGM.rest), pose(T.settle, DIAPHRAGM.rest)]),
  actor('aloud-registration', '9.7px 14.7px', [light(T.rest, 0), light(T.second, 0), light(T.answer, .75), light(T.hold, .75), light(T.clear, 0), light(T.settle, 0)]),
]);
