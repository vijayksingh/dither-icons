import {actor,light,motion,pose,ease} from './authoring';

/* SPARKLES / a glint passes from a large star to a small one
 *    0ms  both four-point stars present, with separate centers
 *  120ms  main star gathers inward
 *  310ms  vertical flare; its tips answer at 370ms
 *  410ms  flare relaxes across; small star prepares to answer
 *  555ms  satellite catches the glint, after the main event
 *  625ms  two tiny rays complete the satellite's response
 *  790ms  all transient light clears
 *  980ms  original star proportions restored
 * 1220ms  exact neutral
 * MOT-01/03/05/08/16: one luminous event, then an echo; no particle shower.
 */
export const SPARKLES_TIMING={rest:0,gather:120,flare:310,flash:370,pass:410,catch:555,echo:625,clear:790,home:980,settle:1220};
export const SPARKLES_GEOMETRY={main:[9.8,13.2],mainRadius:8.1,satellite:[19.1,4.9],satelliteRadius:2.7};
export const SPARKLES_ART={
 main:'M9.8 5.1C10.9 10.4 12.6 12.1 17.9 13.2C12.6 14.3 10.9 16 9.8 21.3C8.7 16 7 14.3 1.7 13.2C7 12.1 8.7 10.4 9.8 5.1Z',
 satellite:'M19.1 2.2C19.6 3.9 20.1 4.4 21.8 4.9C20.1 5.4 19.6 5.9 19.1 7.6C18.6 5.9 18.1 5.4 16.4 4.9C18.1 4.4 18.6 3.9 19.1 2.2Z',
 tips:'M9.8 3.4v-.8M9.8 23v.6',
 echo:'M22 2.25l.5-.5M22.6 5.8l.6.2',
};
const MAIN={origin:'9.8px 13.2px',rest:'scale(1, 1)',gather:'scale(.9, .94)',flare:'scale(.98, 1.075)',pass:'scale(1.045, 1.015)'};
const SMALL={origin:'19.1px 4.9px',rest:'scale(1)',gather:'scale(.86)',catch:'scale(1.15)'};
const T=SPARKLES_TIMING;
export const sparkles=motion(T.settle,'One bright glint. A smaller reply.',['Gather','Flare','Echo'],[
 actor('spark-main',MAIN.origin,[pose(T.rest,MAIN.rest),pose(T.gather,MAIN.gather),pose(T.flare,MAIN.flare,ease.settle),pose(T.pass,MAIN.pass),pose(T.home,MAIN.rest),pose(T.settle,MAIN.rest)]),
 actor('spark-satellite',SMALL.origin,[pose(T.rest,SMALL.rest),pose(T.flare,SMALL.rest),pose(T.pass,SMALL.gather),pose(T.catch,SMALL.catch,ease.settle),pose(T.home,SMALL.rest),pose(T.settle,SMALL.rest)]),
 actor('spark-tips',MAIN.origin,[light(T.rest,0,'scaleY(.94)'),light(T.flare,0,'scaleY(.94)'),light(T.flash,.8,'scaleY(1)'),light(T.catch,0,'scaleY(1.025)'),light(T.settle,0,'scaleY(.94)')]),
 actor('spark-echo',SMALL.origin,[light(T.rest,0,'scale(.86)'),light(T.catch,0,'scale(.86)'),light(T.echo,.75,'scale(1)'),light(T.clear,0,'scale(1.08)'),light(T.settle,0,'scale(.86)')]),
]);
