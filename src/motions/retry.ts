import {actor,motion,pose,light} from './authoring';
import {arcBand,arcPath} from './learning-geometry';

/* ── RETRY / rewind, catch, return ready ─────────────────────
 *    0ms  complete open circular arrow
 *  115ms  short clockwise take-up before the rewind
 *  410ms  counterclockwise pull; a glint follows the curved rail
 *  565ms  glint reaches the attached arrow head; mechanism catches
 *  625ms  head edge lights; two small catch marks answer
 * 1000ms  arrow eases home with no residual rotation
 * 1280ms  exact rest; one reset invitation, never a loading spinner
 * MOT-01/03/07/08/14/16: finite rewind with a recognizable open arrow.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,         // open circular arrow
 gather:115,     // mechanical take-up
 traceStart:150, // tail starts returning
 traceVisible:255,// moving glint
 rewind:410,     // arrow pulled counterclockwise
 catch:565,      // rail signal reaches head
 edgePeak:610,   // head receives
 clickPeak:655,  // catch responds
 traceOut:685,   // rail clears
 release:735,    // tension released
 lightOut:920,   // response dissipated
 home:1000,      // reference pose
 settle:1280,    // exact rest
};
export const RETRY_ART={
 arc:arcBand(12,12,7.65,1.7,-145,145),
 head:'M3.5 3.8h1.7v4h4v1.7H3.5Z',
 outline:arcPath(12,12,7.65,-145,145),headOutline:'M4.35 4.1v4.55H8.9',
 trace:arcPath(12,12,7.65,125,145),
 edge:'M4 7.2v1.8h1.8',click:'M1.75 9.6l-.65.8M4.5 11.25v1',
};
const ARROW={origin:'12px 12px',gather:5,rewind:-24,catch:-27,release:-7};
const TRACE={origin:ARROW.origin,ink:.96,from:'rotate(0deg)',middle:'rotate(-87deg)',end:'rotate(-270deg)'};
const EDGE={origin:'4.35px 8.65px',ink:.92};
const EASE={gather:'cubic-bezier(.4,0,.65,1)',rewind:'cubic-bezier(.18,.7,.3,1)',catch:'cubic-bezier(.35,0,.7,1)',return:'cubic-bezier(.3,0,.25,1)'};
export const retry=motion(TIMING.settle,'The arrow rewinds and returns to its starting position.',['Rewind','Catch','Ready'],[
 actor('return-arrow',ARROW.origin,[pose(TIMING.rest,'rotate(0deg)',EASE.gather),pose(TIMING.gather,`rotate(${ARROW.gather}deg)`,EASE.rewind),pose(TIMING.rewind,`rotate(${ARROW.rewind}deg)`,EASE.catch),pose(TIMING.catch,`rotate(${ARROW.catch}deg)`,EASE.return),pose(TIMING.release,`rotate(${ARROW.release}deg)`,EASE.return),pose(TIMING.home,'rotate(0deg)'),pose(TIMING.settle,'rotate(0deg)')]),
 actor('rewind-trace',TRACE.origin,[light(TIMING.rest,0,TRACE.from),light(TIMING.traceStart,0,TRACE.from),light(TIMING.traceVisible,TRACE.ink,TRACE.middle),light(TIMING.catch,TRACE.ink,TRACE.end),light(TIMING.traceOut,0,TRACE.end),light(TIMING.settle,0,TRACE.from)]),
 actor('catch-edge',EDGE.origin,[light(TIMING.rest,0),light(TIMING.catch,0),light(TIMING.edgePeak,EDGE.ink),light(TIMING.lightOut,0),light(TIMING.settle,0)]),
 actor('catch-marks',EDGE.origin,[light(TIMING.rest,0,'scale(.55)'),light(TIMING.catch,0,'scale(.55)'),light(TIMING.clickPeak,.86,'scale(1)'),light(TIMING.lightOut,0,'translate(-.15px,.2px) scale(1.1)'),light(TIMING.settle,0,'scale(.55)')]),
]);
