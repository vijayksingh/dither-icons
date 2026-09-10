import {actor,light,motion,pose} from './authoring';

/* SETTINGS / one measured adjustment, a clean open center
 *    0ms  eight teeth surround an uninterrupted circular aperture
 *  120ms  take up resistance with a four-degree reverse turn
 *  410ms  stop at the registered angle
 *  470ms  one tooth catches a short rim highlight
 *  540ms  two fine exterior ticks release the click
 *  710ms  hold the registered position, highlight clear
 *  860ms  exterior ticks dissolve during the return
 * 1170ms  the original alignment returns
 * 1360ms  exact rest
 * MOT-01/03/08/16: the stop causes the rim response; the center stays empty.
 */
export const SETTINGS_TIMING={rest:0,gather:120,register:410,glint:470,echo:540,hold:710,clear:860,home:1170,settle:1360};
export const SETTINGS_GEOMETRY={cx:12,cy:12,outer:8.3,root:6.85,hole:3.55,seatAngle:22.5};
const point=(radius:number,degrees:number)=>{const a=degrees*Math.PI/180;return [12+radius*Math.sin(a),12-radius*Math.cos(a)]};
const xy=(p:number[])=>p.map(n=>Number(n.toFixed(5))).join(' ');
const toothPoints=Array.from({length:8},(_,i)=>[[-22.5,6.85],[-13,6.85],[-9,8.3],[9,8.3],[13,6.85]].map(([a,r])=>point(r,i*45+a))).flat();
// Short quadratic fillets soften the tooth shoulders without changing pitch.
const toward=(from:number[],to:number[],amount:number)=>{const length=Math.hypot(to[0]-from[0],to[1]-from[1]);return from.map((v,i)=>v+(to[i]-v)*Math.min(amount/length,.4))};
const outer=toothPoints.map((p,i)=>{const previous=toothPoints[(i+toothPoints.length-1)%toothPoints.length],next=toothPoints[(i+1)%toothPoints.length];return `${i?'L':'M'}${xy(toward(p,previous,.2))}Q${xy(p)} ${xy(toward(p,next,.2))}`}).join('')+'Z';
export const SETTINGS_ART={
 gear:outer+'M12 8.45a3.55 3.55 0 1 1 0 7.1a3.55 3.55 0 1 1 0-7.1Z',
 rim:`M${xy(point(8.3,-7))}L${xy(point(8.3,7))}`,
 ticks:[-10.5,10.5].map(angle=>`M${xy(point(9.25,angle))}L${xy(point(9.75,angle))}`).join(''),
};
const GEAR={origin:'12px 12px',rest:'rotate(0deg)',gather:'rotate(-4deg)',seat:'rotate(22.5deg)'};
const EASE={gather:'cubic-bezier(.4,0,.6,1)',turn:'cubic-bezier(.2,.65,.3,1)',return:'cubic-bezier(.4,0,.3,1)'};
const T=SETTINGS_TIMING;
export const settings=motion(T.settle,'A measured turn. A precise little click.',['Adjust','Register','Release'],[
 actor('settings-gear',GEAR.origin,[pose(T.rest,GEAR.rest,EASE.gather),pose(T.gather,GEAR.gather,EASE.turn),pose(T.register,GEAR.seat),pose(T.hold,GEAR.seat,EASE.return),pose(T.home,GEAR.rest),pose(T.settle,GEAR.rest)]),
 actor('tooth-light','12px 3.8px',[light(T.rest,0,'scaleX(.4)'),light(T.register,0,'scaleX(.4)'),light(T.glint,.85,'scaleX(1)'),light(T.echo,.5,'scaleX(1)'),light(T.hold,0,'scaleX(1)'),light(T.settle,0,'scaleX(.4)')]),
 actor('rim-ticks',GEAR.origin,[light(T.rest,0,'translateY(0px)'),light(T.glint,0,'translateY(0px)'),light(T.echo,.65,'translateY(-.1px)'),light(T.clear,0,'translateY(-.4px)'),light(T.settle,0,'translateY(0px)')]),
]);
