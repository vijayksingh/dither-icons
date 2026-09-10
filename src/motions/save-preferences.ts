import {actor,motion,pose,light} from './authoring';
/* ── SAVE PREFERENCES / open, write, seat ────────────────────
 *    0ms  fixed disk housing and retained label
 *  110ms  shutter takes up its channel
 *  270ms  write window open
 *  380ms  first label line registers; second at 480ms
 *  640ms  shutter returns to its physical stop
 *  720ms  stop and two close witnesses answer
 *  940ms  local response clears
 * 1380ms  exact rest; no successful-save claim
 * MOT-01/03/05/08/16: writing precedes the closure response.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,      // Complete save silhouette.
 prepare:110, // Begin the shutter's pickup.
 open:270,    // Expose the writing window.
 first:380,   // First write witness.
 second:480,  // Second write witness.
 close:640,   // Right edge meets the actual stop.
 answer:720,  // Response follows the closure.
 clear:940,   // Clear all witnesses.
 settle:1380, // Exact neutral state.
};
export const SAVE_ART={
 shell:'M5.3 3.5h9.4l5.8 5.8v9.4a1.8 1.8 0 0 1-1.8 1.8H5.3a1.8 1.8 0 0 1-1.8-1.8V5.3a1.8 1.8 0 0 1 1.8-1.8Zm.2 1.5a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V9.9L14.1 5Z',
 shellLine:'M5.3 4.25h9.1l5.35 5.35v9.1a1.05 1.05 0 0 1-1.05 1.05H5.3a1.05 1.05 0 0 1-1.05-1.05V5.3a1.05 1.05 0 0 1 1.05-1.05Z',
 shutter:'M8.5 5.2h6v3.5h-6Z',
 label:'M7.1 11.6h9.8v7.2H7.1Zm1.1 1.1v5h7.6v-5Z',
 labelLine:'M7.65 12.15h8.7v6.1h-8.7Z',
 lines:['M9.5 14.25h5','M9.5 16.45h3.4'],
 channel:'M7.05 5.2v4.2h7.45',stop:'M15 5.2v3.5',
 stopLight:'M15.05 5.8v2.2',upper:'M17.25 4.1l.65-.65',lower:'M20.5 7.35l.65-.65',
};
export const SAVE_SHUTTER={right:14.5,stopFace:14.5,origin:'8.5px 7px',rest:'translateX(0px)',pickup:'translateX(-.18px)',open:'translateX(-1.1px)'};
const WITNESS={rest:'scale(.65)',open:'scale(1)',clear:'scale(1.12)'};
export const savePreferences=motion(TIMING.settle,'The write indicator finishes before the shutter closes.',['Open','Write','Seat'],[
 actor('save-shutter',SAVE_SHUTTER.origin,[pose(TIMING.rest,SAVE_SHUTTER.rest),pose(TIMING.prepare,SAVE_SHUTTER.pickup),pose(TIMING.open,SAVE_SHUTTER.open),pose(TIMING.second,SAVE_SHUTTER.open),pose(TIMING.close,SAVE_SHUTTER.rest),pose(TIMING.settle,SAVE_SHUTTER.rest)]),
 ...[TIMING.first,TIMING.second].map((at,i)=>actor(`save-write-${i}`,`9.5px ${i===0?14.25:16.45}px`,[light(TIMING.rest,0,'scaleX(.1)'),light(TIMING.open,0,'scaleX(.1)'),light(at,.85,'scaleX(1)'),light(TIMING.close,.3,'scaleX(1)'),light(TIMING.clear,0,'scaleX(1)'),light(TIMING.settle,0,'scaleX(.1)')])),
 actor('save-stop','15px 7px',[light(TIMING.rest,0,'scaleY(.4)'),light(TIMING.close,0,'scaleY(.4)'),light(TIMING.answer,.9,'scaleY(1)'),light(TIMING.clear,0,'scaleY(1)'),light(TIMING.settle,0,'scaleY(.4)')]),
 ...['save-witness-upper','save-witness-lower'].map(part=>actor(part,'15px 7px',[light(TIMING.rest,0,WITNESS.rest),light(TIMING.close,0,WITNESS.rest),light(TIMING.answer,.8,WITNESS.open),light(TIMING.clear,0,WITNESS.clear),light(TIMING.settle,0,WITNESS.rest)])),
]);
