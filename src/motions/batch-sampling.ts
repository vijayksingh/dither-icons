import {actor,motion,light,ease} from './authoring';
/* ── BATCH SAMPLING / copy a subset into one receiving batch ─
 *    0ms  six source records and an empty receiving tray
 *  150ms  first source mark (then 250ms, 350ms)
 *  260ms  first copy leaves (then 360ms, 460ms)
 *  610ms  first sample seats (then 710ms, 810ms)
 *  680ms  its contact light (then 780ms, 880ms)
 *  940ms  the whole batch responds after the last arrival
 * 1100ms  end the held sample; clear the witnesses
 * 1280ms  copied samples fade in place
 * 1540ms  hidden copies reset; source records never removed
 * MOT-01/03/05/08/16: copying preserves data; reception is causal.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,       // Six source samples remain throughout.
 mark:150,     // Mark a source before copying it.
 depart:260,   // Begin the first copied sample.
 emerge:350,   // The copy becomes fully visible.
 contact:610,  // First actual floor contact.
 response:680, // First local receiving response.
 stagger:100,  // Subsequent columns retain their order.
 collected:940,// Shared receipt waits for the last contact.
 hold:1100,    // Hold the selected batch for inspection.
 fade:1280,    // Fade the copies in place, preserving source.
 settle:1540,  // Reset only after copies are hidden.
};
export const BATCH_SOURCE=Array.from({length:6},(_,i)=>({x:6+i%3*6,y:i<3?6:10.4}));
export const BATCH_SELECTION=[BATCH_SOURCE[0],BATCH_SOURCE[4],BATCH_SOURCE[2]];
export const BATCH_GEOMETRY={radius:1.25,seatY:19.25,floor:20.5};
export const BATCH_ART={
 source:'M3.1 12.5V3a.8.8 0 0 1 .8-.8h16.2a.8.8 0 0 1 .8.8v9.5',
 tray:'M2.9 16.8h1.2v3.7h15.8v-3.7h1.2v4.1a.8.8 0 0 1-.8.8H3.7a.8.8 0 0 1-.8-.8Z',
 trayLine:'M3.5 16.8v4.3h17v-4.3',
 receipt:'M8.5 23h7',
};
const COPY={origin:'0px 0px',rest:'translateY(0px)'};
const SEAT={rest:'scaleX(.4)',open:'scaleX(1)'};
export const batchSampling=motion(TIMING.settle,'Take a subset. Keep the source.',['Mark','Collect','Hold'],[
 ...BATCH_SELECTION.flatMap((p,i)=>{
  const delay=i*TIMING.stagger,distance=BATCH_GEOMETRY.seatY-p.y,land=`translateY(${distance}px)`;
  const copyFrames=[light(TIMING.rest,0,COPY.rest),{...light(TIMING.depart+delay,0,COPY.rest),easing:ease.accelerate},{...light(TIMING.emerge+delay,1,`translateY(${distance*.18}px)`),easing:ease.accelerate},light(TIMING.contact+delay,1,land),light(TIMING.hold,1,land),light(TIMING.fade,0,land),light(TIMING.settle,0,COPY.rest)];
  return [
   ...['copy','occlusion'].map(kind=>actor(`batch-${kind}-${i}`,COPY.origin,copyFrames)),
   actor(`batch-mark-${i}`,`${p.x}px ${p.y}px`,[light(TIMING.rest,0,'scale(.75)'),light(TIMING.mark+delay,.8,'scale(1)'),light(TIMING.depart+delay,.55,'scale(1)'),light(TIMING.contact+delay,0,'scale(1)'),light(TIMING.settle,0,'scale(.75)')]),
   actor(`batch-seat-${i}`,`${p.x}px 22.3px`,[light(TIMING.rest,0,SEAT.rest),light(TIMING.contact+delay,0,SEAT.rest),light(TIMING.response+delay,.85,SEAT.open),light(TIMING.hold,0,SEAT.open),light(TIMING.settle,0,SEAT.rest)]),
  ];
 }),
 actor('batch-receipt','12px 23px',[light(TIMING.rest,0,'scaleX(.3)'),light(TIMING.contact+2*TIMING.stagger,0,'scaleX(.3)'),light(TIMING.collected,.7,'scaleX(1)'),light(TIMING.hold,0,'scaleX(1)'),light(TIMING.settle,0,'scaleX(.3)')]),
]);
