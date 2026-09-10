import {actor,motion,pose,light} from './authoring';

/* ── FLASK / a bounded experiment gives a small response ─────
 *    0ms  upright vessel; liquid rests below the clear neck
 *  135ms  liquid gathers into a small tilted meniscus
 *  350ms  it rolls across; a bubble emerges from the surface
 *  540ms  the bubble rises into the empty chamber
 *  630ms  bubble releases into three tiny, contained fizz marks
 *  695ms  the meniscus catches the response
 * 1050ms  liquid and chamber are quiet again
 * 1400ms  exact rest; never an endless boiling/loading loop
 * MOT-01/03/05/07/08/16: the glass is stable; contents respond.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,          // upright glass and liquid
 gather:135,      // first meniscus tilt
 bubbleStart:300, // emerge at the surface
 roll:350,        // liquid rolls across
 bubbleVisible:385,// bubble catches light
 rise:540,        // bubble reaches clear chamber
 release:585,     // bubble opens
 pop:630,         // local fizz climax
 meniscusPeak:695,// liquid catches response
 relax:760,       // small last surface tilt
 fizzOut:865,     // chamber response gone
 lightOut:920,    // surface light gone
 liquidRest:1050, // no residual tilt
 settle:1400,     // held neutral
};
export const FLASK_ART={
 outer:'M8.5 2.6h7v1.6h-1.15v5l6.15 9.6q1.35 2.1-1.2 2.6H4.7q-2.55-.5-1.2-2.6l6.15-9.6v-5H8.5Z',
 inside:'M11.1 4.2v5.4L5 19.1q-.6.9.5.9h13q1.1 0 .5-.9L12.9 9.6V4.2Z',
 outline:'M8.6 3.4h6.8M10.35 3.4v6L4.2 19q-.9 1.4.85 1.6h13.9q1.75-.2.85-1.6l-6.15-9.6v-6',
 liquid:'M2 15.3Q7 14.6 12 15.3T22 15.3V26H2Z',
 surface:'M6.4 15.08Q9.2 14.9 12 15.3T17.6 15.52',
 fizz:'M10.55 12.1l-.6-.4M11.8 11.5v-.7M13.05 12.1l.6-.4',
};
const LIQUID={origin:'12px 17px',gather:-5,roll:5.5,recover:-2.4,relax:.7};
const BUBBLE={origin:'12px 14.8px',start:'translate(0px,0px) scale(.3)',emerge:'translate(.25px,-.35px) scale(.8)',rise:'translate(-.2px,-2.4px) scale(1)',release:'translate(-.2px,-2.6px) scale(1.3)',ink:.9};
const FIZZ={origin:'11.8px 12.2px',ink:.84};
const EASE={gather:'cubic-bezier(.4,0,.6,1)',roll:'cubic-bezier(.2,.7,.35,1)',settle:'cubic-bezier(.3,0,.3,1)'};
export const flask=motion(TIMING.settle,'The liquid swirls before bubbles rise.',['Stir','React','Settle'],[
 actor('liquid',LIQUID.origin,[pose(TIMING.rest,'rotate(0deg)',EASE.gather),pose(TIMING.gather,`rotate(${LIQUID.gather}deg)`,EASE.roll),pose(TIMING.roll,`rotate(${LIQUID.roll}deg)`,EASE.roll),pose(TIMING.release,`rotate(${LIQUID.recover}deg)`,EASE.settle),pose(TIMING.relax,`rotate(${LIQUID.relax}deg)`,EASE.settle),pose(TIMING.liquidRest,'rotate(0deg)'),pose(TIMING.settle,'rotate(0deg)')]),
 actor('bubble',BUBBLE.origin,[light(TIMING.rest,0,BUBBLE.start),light(TIMING.bubbleStart,0,BUBBLE.start),light(TIMING.bubbleVisible,BUBBLE.ink,BUBBLE.emerge),light(TIMING.rise,BUBBLE.ink,BUBBLE.rise),light(TIMING.release,0,BUBBLE.release),light(TIMING.settle,0,BUBBLE.start)]),
 actor('reaction-fizz',FIZZ.origin,[light(TIMING.rest,0,'scale(.5)'),light(TIMING.rise,0,'scale(.5)'),light(TIMING.pop,FIZZ.ink,'scale(1)'),light(TIMING.fizzOut,0,'translateY(-.35px) scale(1.2)'),light(TIMING.settle,0,'scale(.5)')]),
 actor('meniscus-light',LIQUID.origin,[light(TIMING.rest,0),light(TIMING.release,0),light(TIMING.meniscusPeak,.88),light(TIMING.lightOut,0),light(TIMING.settle,0)]),
]);
