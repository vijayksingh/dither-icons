import {actor,light,motion,pose} from './authoring';

/* SEARCH / bring a subject into focus
 *    0ms  an unbroken lens and handle rest as one rigid tool
 *  120ms  take up a little weight at the handle
 *  380ms  lean toward the subject; stop before the optical response
 *  470ms  two fine brackets converge inside the aperture
 *  540ms  a reflection crosses the glass; the rim catches it
 *  700ms  hold focus as the light dissipates
 *  850ms  clear the optics before returning the tool
 * 1160ms  arrive home without recoil
 * 1320ms  exact rest
 * MOT-01/03/07/08/16: the payoff belongs inside the lens.
 */
export const SEARCH_TIMING={rest:0,gather:120,arrive:380,focus:470,glint:540,hold:700,clear:850,home:1160,settle:1320};
export const SEARCH_GEOMETRY={cx:9.8,cy:9.8,outerRadius:6.3,innerRadius:4.65,handlePivot:[18.8,18.8]};
export const SEARCH_ART={
 // One outer contour: an even-odd overlap cannot punch a hole in the neck.
 body:'M14.8314 13.59143 21.2 19.61a1.08 1.08 0 0 1-1.59 1.59l-6.01857-6.3686a6.3 6.3 0 1 1 1.23997-1.23997ZM9.8 5.15a4.65 4.65 0 1 1 0 9.3a4.65 4.65 0 1 1 0-9.3Z',
 brackets:'M8.1 9.1v-1h1M11.5 10.5v1h-1',
 reflection:'M5.7 12.2 11.9 6',
 rim:'M4.45 9.8a5.35 5.35 0 0 1 5.35-5.35',
};
const TOOL={origin:'18.8px 18.8px',rest:'translate(0px,0px) rotate(0deg)',gather:'translate(.15px,.1px) rotate(3deg)',inspect:'translate(-.5px,-.3px) rotate(-9deg)'};
const OPTICS={origin:'9.8px 9.8px',wide:'scale(1.5)',focused:'scale(1)',clear:'scale(1.08)',ink:.85};
const EASE={takeUp:'cubic-bezier(.4,0,.6,1)',reach:'cubic-bezier(.2,.85,.3,1)',return:'cubic-bezier(.4,0,.25,1)'};
const T=SEARCH_TIMING;
export const search=motion(T.settle,'The lens tilts as its focus mark aligns.',['Attend','Focus','Return'],[
 actor('magnifier',TOOL.origin,[pose(T.rest,TOOL.rest,EASE.takeUp),pose(T.gather,TOOL.gather,EASE.reach),pose(T.arrive,TOOL.inspect),pose(T.hold,TOOL.inspect,EASE.return),pose(T.home,TOOL.rest),pose(T.settle,TOOL.rest)]),
 actor('focus-brackets',OPTICS.origin,[light(T.rest,0,OPTICS.wide),light(T.arrive,0,OPTICS.wide),light(T.focus,OPTICS.ink,OPTICS.focused),light(T.glint,.75,OPTICS.focused),light(T.hold,.3,OPTICS.focused),light(T.clear,0,OPTICS.clear),light(T.settle,0,OPTICS.wide)]),
 actor('glass-reflection',OPTICS.origin,[light(T.rest,0,'translateX(-4px)'),light(T.focus,0,'translateX(-4px)'),light(T.glint,.2,'translateX(0px)'),light(T.hold,0,'translateX(4px)'),light(T.settle,0,'translateX(-4px)')]),
 actor('lens-rim',OPTICS.origin,[light(T.rest,0,'rotate(-10deg)'),light(T.focus,0,'rotate(-10deg)'),light(T.glint,.8,'rotate(5deg)'),light(T.hold,.3,'rotate(25deg)'),light(T.clear,0,'rotate(35deg)'),light(T.settle,0,'rotate(-10deg)')]),
]);
