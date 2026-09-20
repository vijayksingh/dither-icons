import {actor, ease, light, motion, pose} from './authoring';

/* ANIMATION STORYBOARD / VIVID
 *    0ms  a neutral phrase holds with one identifiable focus word
 *   80ms  the phrase settles as the focus word gathers
 *  240ms  the focus word gains weight and rises on its fixed baseline
 *  320ms  an ink swash grows out of that word's end
 *  440ms  the swash reaches its expressive peak; the phrase stays intact
 *  620ms  the emphasis holds for recognition
 *  740ms  the swash retracts into the word before the weight releases
 * 1040ms  exact neutral; no sparkle, plus or underline remains
 * MOT-01/02/03/04/05/06/07/08/10/11/12/14/15/16: expression is a
 * localized ink event attached to a focus word, not ambient decoration.
 */
export const VIVID_TIMING = {
  rest: 0, prepare: 80, focus: 240, inkStart: 320,
  inkPeak: 440, hold: 620, clear: 740, release: 860, settle: 1040,
};
export const VIVID_GEOMETRY = {focusX: 9.15, baselineY: 8, inkX: 10.7, inkY: 8};
export const VIVID_ART = {
  context: ['M3.2 8h3.4', 'M11.3 8h5.7', 'M3.2 13h4.6', 'M8.9 13h4.3'],
  focus: 'M7.6 8h3.1',
  accent: 'M10.7 8c.8.1 1.4.6 1.8 1.7.3 1 1 1.4 2.1-.5',
};
const T = VIVID_TIMING, G = VIVID_GEOMETRY;
export const vivid = motion(T.settle, 'A focus word gains weight and grows one attached ink swash.', ['Focus', 'Express', 'Release'], [
  actor('vivid-focus-word', `${G.focusX}px ${G.baselineY}px`, [
    pose(T.rest, 'translate(0px,0px) scale(1,1)'), pose(T.prepare, 'translate(0px,.12px) scale(1.01,.9)', ease.settle),
    pose(T.focus, 'translate(0px,-.3px) scale(1.06,1.5)', ease.settle), pose(T.hold, 'translate(0px,-.3px) scale(1.06,1.5)'),
    pose(T.release, 'translate(0px,0px) scale(1,1)', ease.smooth), pose(T.settle, 'translate(0px,0px) scale(1,1)'),
  ]),
  actor('vivid-ink-accent', `${G.inkX}px ${G.inkY}px`, [
    light(T.rest, 0, 'scale(.12)'), light(T.inkStart, 0, 'scale(.12)'),
    light(T.inkPeak, .92, 'scale(1.05)'), light(T.hold, .92, 'scale(1)'),
    light(T.clear, 0, 'scale(1)'), light(T.settle, 0, 'scale(.12)'),
  ]),
]);
