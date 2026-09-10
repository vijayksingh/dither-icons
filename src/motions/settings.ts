import {actor,light,motion,pose} from './authoring';

/* SETTINGS / one measured adjustment meets a spring stop
 *    0ms  eight teeth surround a fixed spring pawl
 *  120ms  take up resistance with a four-degree reverse turn
 *  410ms  the inner tab meets the pawl at (12, 9.05)
 *  470ms  the spring flexes about the contact; local light answers
 *  540ms  a fine contact ring disperses within the aperture
 *  710ms  hold the registered position, spring relaxed
 *  860ms  clear response light before reversing the demonstration
 * 1170ms  the original alignment returns
 * 1360ms  exact rest
 * MOT-03/05/08/16: rotation has a receiver, not a spinner.
 */
export const SETTINGS_TIMING={rest:0,gather:120,contact:410,flex:470,echo:540,hold:710,clear:860,home:1170,settle:1360};
export const SETTINGS_GEOMETRY={cx:12,cy:12,outer:8.3,root:6.85,hole:3.55,tabTipRadius:2.95,seatAngle:22.5,contact:[12,9.05]};
const point=(radius:number,degrees:number)=>{const a=degrees*Math.PI/180;return [12+radius*Math.sin(a),12-radius*Math.cos(a)]};
const xy=(p:number[])=>p.map(n=>Number(n.toFixed(5))).join(' ');
const toothPoints=Array.from({length:8},(_,i)=>[[-22.5,6.85],[-13,6.85],[-9,8.3],[9,8.3],[13,6.85]].map(([a,r])=>point(r,i*45+a))).flat();
// Short quadratic fillets soften the tooth shoulders without changing pitch.
const toward=(from:number[],to:number[],amount:number)=>{const length=Math.hypot(to[0]-from[0],to[1]-from[1]);return from.map((v,i)=>v+(to[i]-v)*Math.min(amount/length,.4))};
const outer=toothPoints.map((p,i)=>{const previous=toothPoints[(i+toothPoints.length-1)%toothPoints.length],next=toothPoints[(i+1)%toothPoints.length];return `${i?'L':'M'}${xy(toward(p,previous,.2))}Q${xy(p)} ${xy(toward(p,next,.2))}`}).join('')+'Z';
const tab=[point(3.8,-31.5),point(2.95,-22.5),point(3.8,-13.5)];
export const SETTINGS_ART={
 gear:outer+'M12 8.45a3.55 3.55 0 1 1 0 7.1a3.55 3.55 0 1 1 0-7.1Z',
 tab:`M${xy(tab[0])}L${xy(tab[1])}L${xy(tab[2])}Z`,
 pawl:'M10.65 10.8Q11.05 9.05 12 9.05Q12.95 9.05 13.35 10.8',
 contact:'M11.3 9.05h1.4',
 index:`M${xy(point(5.5,-29))}A5.5 5.5 0 0 1 ${xy(point(5.5,-16))}`,
};
const GEAR={origin:'12px 12px',rest:'rotate(0deg)',gather:'rotate(-4deg)',seat:'rotate(22.5deg)'};
const PAWL={origin:'12px 9.05px',rest:'scale(1,1)',flex:'scale(1.04,.87)'};
const EASE={gather:'cubic-bezier(.4,0,.6,1)',turn:'cubic-bezier(.2,.65,.3,1)',return:'cubic-bezier(.4,0,.3,1)'};
const T=SETTINGS_TIMING;
export const settings=motion(T.settle,'A measured turn. A precise little click.',['Adjust','Register','Release'],[
 actor('settings-gear',GEAR.origin,[pose(T.rest,GEAR.rest,EASE.gather),pose(T.gather,GEAR.gather,EASE.turn),pose(T.contact,GEAR.seat),pose(T.hold,GEAR.seat,EASE.return),pose(T.home,GEAR.rest),pose(T.settle,GEAR.rest)]),
 actor('spring-pawl',PAWL.origin,[pose(T.rest,PAWL.rest),pose(T.contact,PAWL.rest),pose(T.flex,PAWL.flex),pose(T.hold,PAWL.rest),pose(T.settle,PAWL.rest)]),
 actor('detent-light',PAWL.origin,[light(T.rest,0,'scaleX(.4)'),light(T.contact,0,'scaleX(.4)'),light(T.flex,.9,'scaleX(1)'),light(T.echo,.65,'scaleX(1)'),light(T.hold,0,'scaleX(1.2)'),light(T.settle,0,'scaleX(.4)')]),
 actor('detent-echo',PAWL.origin,[light(T.rest,0,'scale(.5)'),light(T.flex,0,'scale(.5)'),light(T.echo,.65,'scale(1)'),light(T.clear,0,'scale(1.7)'),light(T.settle,0,'scale(.5)')]),
 actor('gear-index',GEAR.origin,[light(T.rest,0),light(T.contact,0),light(T.flex,.75),light(T.echo,.45),light(T.hold,0),light(T.settle,0)]),
]);
