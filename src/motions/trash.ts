import {actor, motion, pose, light} from './authoring';

/* ── TRASH / lift, close, a soft rim impact ───────────────────
 *    0ms  lid, handle, and vented bin retain their identity
 *  120ms  a small downward brace at the lid's left support
 *  340ms  lid opens; handle follows a little later
 *  520ms  held open, with the bin still planted
 *  730ms  lid returns to the rim
 *  785ms  rim lights and bin yields AFTER contact
 *  810ms  two short impact ticks dissipate sideways
 *  900ms  lid rebounds a fraction; handle lags behind
 * 1240ms  exact rest, with no disappearing contents or deletion claim
 * MOT-01/03/04/05/08/10/14/16: climax belongs to contact, not opening.
 * ────────────────────────────────────────────────────────── */
const TIMING = {
  rest:0,       // assembled bin
  brace:120,    // lid takes up its weight
  open:340,     // full opening
  handleOpen:390,// handle's delayed response
  read:520,     // pause before closing
  handleFall:620,// handle changes direction after lid starts falling
  contact:730,  // lid meets rim; bin has not reacted yet
  rimStart:720, // light begins immediately around contact
  impact:785,   // body compression and rim-light crest
  ticks:810,    // short exterior response
  rebound:900,  // lid rebounds a fraction
  lightOut:1010,// no light remains after dissipation
  recover:1070, // body settled; handle finishing
  settle:1240,  // original pose
};
export const TRASH_ART = {
  bin:'M5 8h14l-1 12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Zm4 3v8h1v-8Zm5 0v8h1v-8Z',
  lid:'M3 5h18v2H3Z',
  handle:'M9 5V3.5A1 1 0 0 1 10 2.5h4a1 1 0 0 1 1 1V5h-2V4.25h-2V5Z',
  rim:'M6.2 7.65h11.6',
  ticks:'M2.8 8.5l-1.3.5M21.2 8.5l1.3.5',
};
const LID = {origin:'4.5px 6.5px', rest:'translateY(0px) rotate(0deg)', brace:'translateY(.25px) rotate(1deg)',
  open:'translateY(-.05px) rotate(-11deg)', contact:'translateY(.4px) rotate(.4deg)', rebound:'translateY(-.12px) rotate(-1.3deg)'};
const HANDLE = {origin:'12px 5px', open:3.5, fall:-2.5, impact:2, recover:-.4};
const BIN = {origin:'12px 22px', rest:'scale(1,1)', impact:'scale(1.025,.975)', rebound:'scale(.995,1.008)'};
const RIM = {origin:'12px 8px', ink:.88};
const IMPACT = {origin:'12px 8px', ink:.8, start:'scaleX(.75)', peak:'scaleX(1)', end:'translateY(.25px) scaleX(1.08)'};
const EASE = {brace:'cubic-bezier(.4,0,.65,1)', open:'cubic-bezier(.18,1,.32,1)', read:'cubic-bezier(.2,0,.5,1)',
  fall:'cubic-bezier(.55,0,.8,.4)', rebound:'cubic-bezier(.16,1,.3,1)', settle:'cubic-bezier(.25,0,.3,1)'};
export const trash=motion(TIMING.settle,'A little weight. A soft close.',['Lift','Close','Dissipate'],[
  actor('lid',LID.origin,[pose(TIMING.rest,LID.rest,EASE.brace),pose(TIMING.brace,LID.brace,EASE.open),
    pose(TIMING.open,LID.open,EASE.read),pose(TIMING.read,LID.open,EASE.fall),
    pose(TIMING.contact,LID.contact,EASE.rebound),pose(TIMING.rebound,LID.rebound,EASE.settle),pose(TIMING.settle,LID.rest)]),
  actor('handle',HANDLE.origin,[pose(TIMING.rest,'rotate(0deg)'),pose(TIMING.brace,'rotate(0deg)',EASE.open),
    pose(TIMING.handleOpen,`rotate(${HANDLE.open}deg)`,EASE.read),pose(TIMING.read,`rotate(${HANDLE.open}deg)`,EASE.fall),
    pose(TIMING.handleFall,`rotate(${HANDLE.fall}deg)`,EASE.rebound),pose(TIMING.impact,`rotate(${HANDLE.impact}deg)`,EASE.settle),
    pose(TIMING.recover,`rotate(${HANDLE.recover}deg)`,EASE.settle),pose(TIMING.settle,'rotate(0deg)')]),
  actor('bin',BIN.origin,[pose(TIMING.rest,BIN.rest),pose(TIMING.contact,BIN.rest,EASE.rebound),
    pose(TIMING.impact,BIN.impact,EASE.rebound),pose(TIMING.rebound,BIN.rebound,EASE.settle),pose(TIMING.recover,BIN.rest),pose(TIMING.settle,BIN.rest)]),
  actor('rim-light',RIM.origin,[light(TIMING.rest,0,'scaleX(.3)'),light(TIMING.rimStart,0,'scaleX(.3)'),
    light(TIMING.impact,RIM.ink,'scaleX(.85)'),light(TIMING.rebound,.25,'scaleX(1)'),light(TIMING.lightOut,0,'scaleX(1)'),light(TIMING.settle,0,'scaleX(.3)')]),
  actor('impact-ticks',IMPACT.origin,[light(TIMING.rest,0,IMPACT.start),light(TIMING.contact,0,IMPACT.start),
    light(TIMING.ticks,IMPACT.ink,IMPACT.peak),light(TIMING.lightOut,0,IMPACT.end),light(TIMING.settle,0,IMPACT.start)]),
]);
