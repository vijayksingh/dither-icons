import {actor,motion,pose,light} from './authoring';
/* ── CODE RUN / source prepares an execution impulse ─────────
 *    0ms  source window and launch triangle remain legible
 *  130ms  first source line conducts; the frame stays fixed
 *  250ms  second line follows
 *  350ms  final line conducts into the waiting launch mark
 *  410ms  triangle finishes its small draw-back
 *  600ms  release forward; triangle and knockout travel together
 *  680ms  leading edge answers, then two short launch witnesses
 *  880ms  output light clears; no success result appears
 * 1180ms  triangle returns to its original position
 * 1360ms  exact rest
 * MOT-01/03/05/08/14/16: code leads execution, not certification.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,      // Stable source and launch mark.
 firstOn:50,  // First line begins its own charge.
 first:130,   // First source line conducts.
 secondOn:170,// Second charge starts after the first receipt.
 second:250,  // Second source line follows.
 thirdOn:270, // Final charge starts after the second receipt.
 third:350,   // Final source line prepares the launch.
 gather:410,  // Small draw-back before release.
 launch:600,  // Leading triangle reaches full travel.
 crest:680,   // Edge catch and forward witnesses.
 clear:880,   // Response dissipates.
 home:1180,   // Triangle returns without changing identity.
 settle:1360, // Exact rest.
};
export const CODE_RUN_ART={
 frame:'M4 3h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM4 4.5a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5Z',
 frameLine:'M4 3.75h12A1.25 1.25 0 0 1 17.25 5v13A1.25 1.25 0 0 1 16 19.25H4A1.25 1.25 0 0 1 2.75 18V5A1.25 1.25 0 0 1 4 3.75Z',
 launch:'M12.6 11a.6.6 0 0 1 .9-.52l7.7 4.5a.6.6 0 0 1 0 1.04l-7.7 4.5a.6.6 0 0 1-.9-.52Z',
 launchLine:'M13.35 11.4v8.2l7-4.1Z',
 source:['M5.5 7.3h7.3','M5.5 10.2h4.2','M5.5 13.1h3'],
 edge:'M19.3 14.9l1 .6-1 .6',upper:'M21.7 13.9l.9-.3',lower:'M21.7 17.1l.9.3',
};
const SOURCE={starts:[TIMING.firstOn,TIMING.secondOn,TIMING.thirdOn],origin:'5.5px 10px',small:'scaleX(.3)',full:'scaleX(1)',ink:.85};
const LAUNCH={origin:'12.6px 15.5px',rest:'translateX(0px)',gather:'translateX(-.35px)',release:'translateX(.75px)',ease:'cubic-bezier(.18,.75,.25,1)'};
const LAUNCH_FRAMES=[pose(TIMING.rest,LAUNCH.rest),pose(TIMING.third,LAUNCH.rest),pose(TIMING.gather,LAUNCH.gather,LAUNCH.ease),pose(TIMING.launch,LAUNCH.release),pose(TIMING.crest,LAUNCH.release),pose(TIMING.home,LAUNCH.rest),pose(TIMING.settle,LAUNCH.rest)];
export const codeRun=motion(TIMING.settle,'From written intent to a running idea.',['Read','Launch','Coast'],[
 ...[TIMING.first,TIMING.second,TIMING.third].map((at,i)=>actor(`source-charge-${i}`,SOURCE.origin,[light(TIMING.rest,0,SOURCE.small),light(SOURCE.starts[i],0,SOURCE.small),light(at,SOURCE.ink,SOURCE.full),light(TIMING.gather,.3,SOURCE.full),light(TIMING.launch,0,SOURCE.full),light(TIMING.settle,0,SOURCE.small)])),
 ...['run-launch','run-occlusion'].map(part=>actor(part,LAUNCH.origin,LAUNCH_FRAMES)),
 actor('run-edge','20px 15.5px',[light(TIMING.rest,0,'scale(.8)'),light(TIMING.launch,0,'scale(.8)'),light(TIMING.crest,.9,'scale(1)'),light(TIMING.clear,0,'scale(1)'),light(TIMING.settle,0,'scale(.8)')]),
 ...['run-witness-upper','run-witness-lower'].map(part=>actor(part,'21px 15.5px',[light(TIMING.rest,0,'translateX(-.4px)'),light(TIMING.launch,0,'translateX(-.4px)'),light(TIMING.crest,.75,'translateX(0px)'),light(TIMING.clear,0,'translateX(.5px)'),light(TIMING.settle,0,'translateX(-.4px)')])),
]);
