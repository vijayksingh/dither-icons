import {actor,light,motion,pose} from './authoring';

/* HOME / open a familiar threshold
 *    0ms  roof, walls, jambs, and sill anchor the house
 *  120ms  a tiny inward pressure takes up the hinge
 *  420ms  the leaf opens; its entire left edge stays attached
 *  480ms  interior light reaches the newly exposed threshold
 *  560ms  a short fan of light spreads onto the doorstep
 *  730ms  hold the welcoming opening
 *  890ms  clear the light before closure
 * 1200ms  the door returns to its original jamb
 * 1400ms  exact rest
 * MOT-03/05/07/16: the doorway causes the light, never the roof.
 */
export const HOME_TIMING={rest:0,gather:120,open:420,threshold:480,spill:560,hold:730,clear:890,close:1200,settle:1400};
export const HOME_GEOMETRY={hingeX:9.65,top:14.1,bottom:21,width:4.7};
export const HOME_ART={
 house:'M3.4 10.3 11.05 3.8Q12 3 12.95 3.8L20.6 10.3V19.8Q20.6 21 19.4 21H14.95V13.4H9.05V21H4.6Q3.4 21 3.4 19.8Z',
 door:'M9.65 14.1h4.7V21h-4.7Z',
 interior:'M9.65 14.1h4.7V21h-4.7Z',
 threshold:'M9.65 21h4.7',
 spill:'M9.65 21h4.7l2.15 1.6h-9Z',
 seam:'M13.7 15v4.9',
};
const DOOR={origin:'9.65px 14.1px',rest:'scaleX(1) skewY(0deg)',gather:'scaleX(.975) skewY(-.7deg)',open:'scaleX(.24) skewY(-9deg)'};
const LIGHT={origin:'12px 21px',small:'scale(.55,.3)',full:'scale(1,1)',fade:'scale(1.12,1.08)',ink:.28};
const EASE={takeUp:'cubic-bezier(.4,0,.6,1)',open:'cubic-bezier(.22,.8,.25,1)',close:'cubic-bezier(.4,0,.25,1)'};
const T=HOME_TIMING;
const doorFrames=()=>[pose(T.rest,DOOR.rest,EASE.takeUp),pose(T.gather,DOOR.gather,EASE.open),pose(T.open,DOOR.open),pose(T.hold,DOOR.open,EASE.close),pose(T.close,DOOR.rest),pose(T.settle,DOOR.rest)];
export const home=motion(T.settle,'A familiar door. A little light to greet you.',['Open','Welcome','Close'],[
 ...['home-door','home-door-occlusion'].map(part=>actor(part,DOOR.origin,doorFrames())),
 actor('interior-light',LIGHT.origin,[light(T.rest,0,'scaleY(.65)'),light(T.gather,0,'scaleY(.65)'),light(T.open,.18,'scaleY(1)'),light(T.threshold,.36,'scaleY(1)'),light(T.hold,.18,'scaleY(1)'),light(T.clear,0,'scaleY(1)'),light(T.settle,0,'scaleY(.65)')]),
 actor('threshold-light',LIGHT.origin,[light(T.rest,0,'scaleX(.3)'),light(T.open,0,'scaleX(.3)'),light(T.threshold,.9,'scaleX(1)'),light(T.spill,.65,'scaleX(1)'),light(T.hold,.25,'scaleX(1)'),light(T.clear,0,'scaleX(1)'),light(T.settle,0,'scaleX(.3)')]),
 actor('welcome-spill',LIGHT.origin,[light(T.rest,0,LIGHT.small),light(T.threshold,0,LIGHT.small),light(T.spill,LIGHT.ink,LIGHT.full),light(T.hold,.1,LIGHT.fade),light(T.clear,0,LIGHT.fade),light(T.settle,0,LIGHT.small)]),
 actor('door-edge',DOOR.origin,[light(T.rest,0),light(T.gather,0),light(T.open,.5),light(T.threshold,.7),light(T.hold,.25),light(T.clear,0),light(T.settle,0)]),
]);
