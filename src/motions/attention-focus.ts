import {actor,motion,pose,light} from './authoring';
/* ── ATTENTION FOCUS / compare every key, emphasize one ──────
 *    0ms  fixed query lens and three persistent relationships
 *  120ms  the query pupil gathers inside its fixed ring
 *  200ms  three comparison signals leave together
 *  540ms  every unmasked key receives its comparison
 *  630ms  key witnesses answer with different emphasis
 *  770ms  the stronger middle relation gains a close frame
 *  960ms  hold ends; no other key has been erased
 * 1120ms  focus cues clear
 * 1460ms  exact rest
 * MOT-01/03/05/08/14/16: attention is emphasis, not hard lookup.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,      // All keys and links are present.
 gather:120,  // Prepare the query within its fixed lens.
 depart:200,  // Compare all keys in parallel.
 arrive:540,  // All comparisons reach their own key.
 respond:630, // Each key responds; strengths differ.
 focus:770,   // Middle relation receives the main emphasis.
 hold:960,    // Sustain focus before clearing.
 clear:1120,  // Clear witnesses, retain every relationship.
 settle:1460, // Exact rest.
};
export const ATTENTION_KEYS=[{y:4.8,ink:.35},{y:12,ink:.9},{y:19.2,ink:.3}] as const;
export const ATTENTION_ART={
 lens:'M4.8 9.2a2.8 2.8 0 1 0 0 5.6a2.8 2.8 0 1 0 0-5.6Zm0 1.15a1.65 1.65 0 1 1 0 3.3a1.65 1.65 0 1 1 0-3.3Z',
 key:(y:number)=>`M17.4 ${y-1.8}h2a.8.8 0 0 1 .8.8v2a.8.8 0 0 1-.8.8h-2a.8.8 0 0 1-.8-.8v-2a.8.8 0 0 1 .8-.8Z`,
 routes:['M7.6 12C11.8 12 12.4 4.8 16.6 4.8','M7.6 12H16.6','M7.6 12C11.8 12 12.4 19.2 16.6 19.2'],
 frameUpper:'M16.1 8.9v-.55h4.6v.55',frameLower:'M16.1 15.1v.55h4.6v-.55',
};
export const attentionPoint=(key:number,t:number)=>{if(key===1)return [7.6+9*t,12];const u=1-t,y=ATTENTION_KEYS[key].y;return [u**3*7.6+3*u*u*t*11.8+3*u*t*t*12.4+t**3*16.6,u**3*12+3*u*u*t*12+3*u*t*t*y+t**3*y];};
const QUERY={origin:'4.8px 12px',rest:'scale(1)',gather:'scale(.78)',release:'scale(1.08)'};
const TRACE={origin:'7.6px 12px',samples:36};
const FRAME={origin:'18.4px 12px',closed:'scaleY(.8)',open:'scaleY(1)'};
export const attentionFocus=motion(TIMING.settle,'Compare every key. Focus the relation.',['Query','Compare','Attend'],[
 actor('attention-pupil',QUERY.origin,[pose(TIMING.rest,QUERY.rest),pose(TIMING.gather,QUERY.gather),pose(TIMING.depart,QUERY.release),pose(TIMING.arrive,QUERY.rest),pose(TIMING.settle,QUERY.rest)]),
 ...ATTENTION_KEYS.flatMap((key,i)=>{
  const [x,y]=attentionPoint(i,1),end=`translate(${x-7.6}px,${y-12}px)`;
  return [actor(`attention-trace-${i}`,TRACE.origin,[light(TIMING.rest,0,'translate(0px,0px)'),light(TIMING.gather,0,'translate(0px,0px)'),...Array.from({length:TRACE.samples+1},(_,n)=>{const t=n/TRACE.samples,[x,y]=attentionPoint(i,t);return {...light(TIMING.depart+(TIMING.arrive-TIMING.depart)*t,.8,`translate(${x-7.6}px,${y-12}px)`),easing:'linear'};}),light(TIMING.respond,0,end),light(TIMING.settle,0,'translate(0px,0px)')]),
  actor(`attention-key-response-${i}`,`18.4px ${key.y}px`,[light(TIMING.rest,0,'scale(.6)'),light(TIMING.arrive,0,'scale(.6)'),light(TIMING.respond,key.ink,'scale(1)'),light(TIMING.hold,key.ink*.5,'scale(1)'),light(TIMING.clear,0,'scale(1)'),light(TIMING.settle,0,'scale(.6)')])];
 }),
 actor('attention-weight','7.6px 12px',[light(TIMING.rest,0,'scaleX(.3)'),light(TIMING.respond,0,'scaleX(.3)'),light(TIMING.focus,.75,'scaleX(1)'),light(TIMING.hold,.5,'scaleX(1)'),light(TIMING.clear,0,'scaleX(1)'),light(TIMING.settle,0,'scaleX(.3)')]),
 ...['attention-frame-upper','attention-frame-lower'].map(part=>actor(part,FRAME.origin,[light(TIMING.rest,0,FRAME.closed),light(TIMING.respond,0,FRAME.closed),light(TIMING.focus,.85,FRAME.open),light(TIMING.hold,.6,FRAME.open),light(TIMING.clear,0,FRAME.open),light(TIMING.settle,0,FRAME.closed)])),
]);
