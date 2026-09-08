import {actor,motion,pose,light} from './authoring';
import {ringPath} from './learning-geometry';

/* ── CHECKPOINT / receive a state and hold its exact position ─
 *    0ms  fixed version rail, circular enclosure, square state
 *  130ms  state takes up a little vertical travel
 *  300ms  a signal follows the upper rail
 *  440ms  state seats at the reference center
 *  495ms  retaining ring yields; corner registration catches
 *  570ms  two small side marks answer the capture
 *  800ms  ring and light settle; state remains exactly centered
 * 1320ms  held neutral; preview never claims a save occurred
 * MOT-01/03/05/08/14/16: the payoff is retention, not onward travel.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,         // A state sits within the fixed version rail.
 gather:130,     // The state takes up a little vertical travel.
 signalStart:150,// A light enters along the upper rail.
 signalPeak:300, // The signal approaches the retaining ring.
 contact:440,    // The state seats and stays at the exact center.
 signalOut:465,  // Clear the incoming signal after arrival.
 compress:495,   // The retainer yields to the captured state.
 corners:540,    // Fine corner marks register its position.
 marks:570,      // Two smaller exterior marks answer the capture.
 relax:625,      // Release the ring's compression gently.
 lightOut:800,   // Clear all registration light.
 ringRest:900,   // Retainer and rail occluder regain their dimensions.
 settle:1320,    // Hold still; a preview never certifies a save.
};
export const CHECKPOINT_ART={
 ring:ringPath(12,12,5.4,1.65),rail:'M11.2 2h1.6v6h-1.6ZM11.2 16h1.6v6h-1.6Z',
 state:'M10.2 9.6h3.6a.6.6 0 0 1 .6.6v3.6a.6.6 0 0 1-.6.6h-3.6a.6.6 0 0 1-.6-.6v-3.6a.6.6 0 0 1 .6-.6Z',
 signal:'M12 2.5v1.2',corners:'M8.35 10V8.35H10M14 15.65h1.65V14',marks:'M4.6 12H3.2M19.4 12h1.4',
};
const STATE={origin:'12px 12px',rest:'translateY(0px)',gather:'translateY(-.7px)'};
const RING={origin:STATE.origin,compress:.97,relax:1.016};
const EASE={gather:'cubic-bezier(.4,0,.7,1)',arrive:'cubic-bezier(.5,0,.75,.6)',contact:'cubic-bezier(.18,.8,.3,1)',settle:'cubic-bezier(.3,0,.3,1)'};
const checkpointMotion=motion(TIMING.settle,'A state arrives. Its place is kept.',['Receive','Register','Hold'],[
 actor('saved-state',STATE.origin,[pose(TIMING.rest,STATE.rest,EASE.gather),pose(TIMING.gather,STATE.gather,EASE.arrive),pose(TIMING.contact,STATE.rest),pose(TIMING.settle,STATE.rest)]),
 actor('retaining-ring',RING.origin,[pose(TIMING.rest,'scale(1)'),pose(TIMING.contact,'scale(1)',EASE.contact),pose(TIMING.compress,`scale(${RING.compress})`,EASE.settle),pose(TIMING.relax,`scale(${RING.relax})`,EASE.settle),pose(TIMING.ringRest,'scale(1)'),pose(TIMING.settle,'scale(1)')]),
 actor('capture-signal','12px 2.5px',[light(TIMING.rest,0,'translateY(0px)'),light(TIMING.signalStart,0,'translateY(0px)'),light(TIMING.signalPeak,.92,'translateY(1.5px)'),light(TIMING.contact,.92,'translateY(2.8px)'),light(TIMING.signalOut,0,'translateY(2.8px)'),light(TIMING.settle,0,'translateY(0px)')]),
 actor('state-registration',STATE.origin,[light(TIMING.rest,0,'scale(.85)'),light(TIMING.contact,0,'scale(.85)'),light(TIMING.corners,.9,'scale(1)'),light(TIMING.lightOut,0,'scale(1)'),light(TIMING.settle,0,'scale(.85)')]),
 actor('capture-marks',STATE.origin,[light(TIMING.rest,0,'scale(.92)'),light(TIMING.compress,0,'scale(.92)'),light(TIMING.marks,.78,'scale(1)'),light(TIMING.lightOut,0,'scale(1.035)'),light(TIMING.settle,0,'scale(.92)')]),
]);

export const checkpoint={...checkpointMotion,tracks:[...checkpointMotion.tracks,{...checkpointMotion.tracks.find(t=>t.part==='retaining-ring')!,part:'retainer-occlusion'}]};
