import {actor,motion,pose,light,ease} from './authoring';
/* ── LEARNING RHYTHM / one measured beat ─────────────────────
 *    0ms  quiet weighted pendulum; case and pivot stay fixed
 *  130ms  a small pickup on the near side
 *  430ms  weight reaches the far beat and reverses
 *  500ms  attached weight glint and two bezel ticks answer
 *  730ms  beat cues disappear while the arm returns
 *  970ms  one small recovery at its resting side
 * 1240ms  weight rests exactly; no recurring timer
 * 1460ms  end
 * MOT-03/05/06/16: a beat comes from the pendulum's reversal.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,       // At the near side, already legible.
 pickup:130,   // Brief take-up before the crossing.
 beat:430,     // Far reversal is the main action.
 answer:500,   // Local beat witnesses peak afterward.
 clear:730,    // Space clears as energy decays.
 return:830,   // Back to the starting side.
 recover:970, // A small weighted recovery.
 home:1240,    // Exact resting angle.
 settle:1460, // Finite gesture.
};
export const RHYTHM_GEOMETRY={pivot:[12,17.8] as const,rest:-12,pickup:-16,beat:16};
export const RHYTHM_ART={
 case:'M9 2.6h6a1 1 0 0 1 .96.73l4.83 17a.8.8 0 0 1-.77 1.02H3.98a.8.8 0 0 1-.77-1.02l4.83-17A1 1 0 0 1 9 2.6ZM9.4 4.1 5 19.9h14L14.6 4.1Z',
 outline:'M9 3.35h6l4.7 17.25H4.3Z',
 arm:'M11.5 7.2a.5.5 0 0 1 1 0v2.1h-1ZM11.5 12.4h1v5.4h-1Z',
 weight:'M10.6 9.3h2.8a.65.65 0 0 1 .65.65v1.8a.65.65 0 0 1-.65.65h-2.8a.65.65 0 0 1-.65-.65v-1.8a.65.65 0 0 1 .65-.65Z',
 foot:'M5.5 22.1h13',
 scale:'M10.9 5.8h2.2M10.5 7.2h3M10.1 8.6h3.8',
 weightEdge:'M10.7 9.8h2.6',
 beatUpper:'M18.2 6.5l1.3-.7',beatLower:'M18.8 8.6l1.45-.1',
};
const ARM={origin:'12px 17.8px',rest:'rotate(0deg)',pickup:'rotate(-4deg)',beat:'rotate(28deg)',recovery:'rotate(1.5deg)'};
const GLINT={origin:'12px 9.8px',rest:'scaleX(.5)',peak:'scaleX(1)'};
export const learningRhythm=motion(TIMING.settle,'A pulse marks each beat, followed by a rest.',['Pick up','Beat','Rest'],[
 actor('rhythm-arm',ARM.origin,[pose(TIMING.rest,ARM.rest),pose(TIMING.pickup,ARM.pickup,ease.smooth),pose(TIMING.beat,ARM.beat,ease.smooth),pose(TIMING.return,ARM.rest),pose(TIMING.recover,ARM.recovery),pose(TIMING.home,ARM.rest),pose(TIMING.settle,ARM.rest)]),
 actor('rhythm-glint',GLINT.origin,[light(TIMING.rest,0,GLINT.rest),light(TIMING.beat,0,GLINT.rest),light(TIMING.answer,.95,GLINT.peak),light(TIMING.clear,0,GLINT.peak),light(TIMING.settle,0,GLINT.rest)]),
 ...['rhythm-beat-upper','rhythm-beat-lower'].map(part=>actor(part,'18px 8px',[light(TIMING.rest,0,'translateX(-.2px)'),light(TIMING.beat,0,'translateX(-.2px)'),light(TIMING.answer,.75,'translateX(0px)'),light(TIMING.clear,0,'translateX(.5px)'),light(TIMING.settle,0,'translateX(-.2px)')])),
]);
