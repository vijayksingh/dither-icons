import {actor,motion,pose,light} from './authoring';

/* ── CODE / make room, trace an expression, align its bounds ─
 *    0ms  paired chevrons around a stable diagonal slash
 *  115ms  both delimiters gather by the same amount
 *  325ms  the pair opens symmetrically; slash accommodates slightly
 *  440ms  a short ink glint travels down the existing slash
 *  645ms  delimiters return together into registration
 *  680ms  their terminal edges catch the alignment
 *  715ms  two crisp exterior ticks answer the paired closure
 *  790ms  all glyph parts settle, light continues dissipating
 * 1160ms  exact rest; no generated text or compilation-success claim
 * MOT-01/03/05/08/14/16: the pair is one relationship, not two wobbles.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,        // paired expression
 gather:115,    // equal inward preparation
 traceStart:245,// light starts along existing slash
 open:325,      // symmetric opening
 slashOpen:370, // accommodating tilt follows delimiters
 traceCrest:440,// middle of trace
 read:465,      // short readable space
 traceOut:580,  // trace clears before closure
 edgeStart:610, // light builds as the pair seats
 register:645,  // pair arrives together
 ticksStart:645,// exterior response waits for alignment
 edgeCrest:680, // attached terminal response
 ticksCrest:715,// crisp outer punctuation
 settleGlyph:790,// identity parts still
 lightOut:945,  // accents cleared
 settle:1160,   // exact endpoint
};
export const CODE_ART={
 left:'M7.65 5.25 2.9 11.4q-.45.6 0 1.2l4.75 6.15 1.45-1.12L4.8 12l4.3-5.63Z',
 right:'M16.35 5.25 21.1 11.4q.45.6 0 1.2l-4.75 6.15-1.45-1.12L19.2 12l-4.3-5.63Z',
 slash:'M13.25 4.1a.8.8 0 0 1 1.55.4L10.75 19.9a.8.8 0 0 1-1.55-.4Z',
 trace:'M13.85 5.1l-.55 2.15',
 leftCaps:'M7.8 5.6l.9.7M7.8 18.4l.9-.7',
 rightCaps:'M16.2 5.6l-.9.7M16.2 18.4l-.9-.7',
 leftTick:'M1.9 12H1',rightTick:'M22.1 12H23',
};
const PAIR={gather:-.26,open:.8,register:-.04};
const SLASH={origin:'12px 12px',open:-2.6,register:.25};
const TRACE={origin:'12px 12px',ink:.94,start:'translate(0px,0px)',middle:'translate(-1.5px,5.7px)',end:'translate(-3.2px,12.2px)'};
const EDGE={ink:.88};
const TICK={ink:.84};
const EASE={gather:'cubic-bezier(.4,0,.7,1)',open:'cubic-bezier(.2,.8,.32,1)',
 close:'cubic-bezier(.45,0,.25,1)',settle:'cubic-bezier(.22,0,.3,1)'};
const pair=[{side:'left',sign:-1,x:6,tickX:1.9},{side:'right',sign:1,x:18,tickX:22.1}];
export const code=motion(TIMING.settle,'The brackets open around the code expression.',['Open','Trace','Align'],[
 ...pair.flatMap(b=>[
 actor(`bracket-${b.side}`,`${b.x}px 12px`,[
 pose(TIMING.rest,'translateX(0px)',EASE.gather),pose(TIMING.gather,`translateX(${b.sign*PAIR.gather}px)`,EASE.open),
 pose(TIMING.open,`translateX(${b.sign*PAIR.open}px)`),pose(TIMING.read,`translateX(${b.sign*PAIR.open}px)`,EASE.close),
 pose(TIMING.register,`translateX(${b.sign*PAIR.register}px)`,EASE.settle),pose(TIMING.settleGlyph,'translateX(0px)'),pose(TIMING.settle,'translateX(0px)')]),
 actor(`registration-${b.side}`,`${b.x}px 12px`,[light(TIMING.rest,0),light(TIMING.edgeStart,0),
 light(TIMING.edgeCrest,EDGE.ink),light(TIMING.lightOut,0),light(TIMING.settle,0)]),
 actor(`alignment-${b.side}`,`${b.tickX}px 12px`,[light(TIMING.rest,0,'scaleX(.25)'),light(TIMING.ticksStart,0,'scaleX(.25)'),
 light(TIMING.ticksCrest,TICK.ink,'scaleX(1)'),light(TIMING.lightOut,0,`translateX(${b.sign*.25}px) scaleX(.85)`),light(TIMING.settle,0,'scaleX(.25)')]),
 ]),
 actor('slash',SLASH.origin,[pose(TIMING.rest,'rotate(0deg)'),pose(TIMING.gather,'rotate(0deg)',EASE.open),
 pose(TIMING.slashOpen,`rotate(${SLASH.open}deg)`),pose(TIMING.read,`rotate(${SLASH.open}deg)`,EASE.close),
 pose(TIMING.register,`rotate(${SLASH.register}deg)`,EASE.settle),pose(TIMING.settleGlyph,'rotate(0deg)'),pose(TIMING.settle,'rotate(0deg)')]),
 actor('syntax-trace',TRACE.origin,[light(TIMING.rest,0,TRACE.start),light(TIMING.traceStart,0,TRACE.start),
 light(TIMING.traceCrest,TRACE.ink,TRACE.middle),light(TIMING.traceOut,0,TRACE.end),light(TIMING.settle,0,TRACE.start)]),
]);
