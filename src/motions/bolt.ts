import {actor,light,motion,pose,ease} from './authoring';

/* BOLT / gather potential → strike → branching discharge
 *    0ms  a clean, complete lightning silhouette
 *  180ms  energy draws back toward the upper source
 *  250ms  conduction reaches the elbow; hold for 60ms under tension
 *  390ms  a fast extension releases the charge to the lower point
 *  440ms  three discharge branches break out from that actual point
 *  480ms  strike holds while the response reaches its maximum
 *  650ms  body recovers; branches linger in the surrounding space
 *  860ms  remaining charge dissipates
 * 1160ms  exact rest, with no permanent inner seam or idle shimmer
 * MOT-01/03/04/05/07/08/16: slow potential, sudden release, long decay.
 */
export const BOLT_TIMING={rest:0,gather:180,elbow:250,hold:310,strike:390,discharge:440,release:480,recover:650,clear:860,settle:1160};
export const BOLT_GEOMETRY={source:[13.5,2.5],tip:[9.65,20.15],gatherScale:.91,strikeScale:1.045,chargeRadius:.68,coreRadius:.25};
export const BOLT_POINTS=[[12.5,5.5],[8.2,11.6],[14.5,11.6],[10.25,18.6]];
const G=BOLT_GEOMETRY,T=BOLT_TIMING;
export const BOLT_CONTACT=[G.tip[0],G.source[1]+(G.tip[1]-G.source[1])*G.strikeScale];
const [tipX,tipY]=BOLT_CONTACT;
export const BOLT_ART={
 body:'M13.1 2.35a.55.55 0 0 1 .98.38l-.98 7.17h5.7a.55.55 0 0 1 .43.9L10 20.15a.55.55 0 0 1-.97-.43l1.24-6.42H5.2a.55.55 0 0 1-.43-.9Z',
 discharge:[`M${tipX-.15} ${tipY+.15}l-.55.85-.6.05-.55.7`,`M${tipX+.3} ${tipY-.05}l.85.6-.05.5.8.5`,`M${tipX-.55} ${tipY-.5}l-1.1-.45-.1-.6-.8-.25`],
};
const point=(i:number)=>`translate(${BOLT_POINTS[i][0]}px,${BOLT_POINTS[i][1]}px)`;
const chargeFrames=[light(T.rest,0,point(0)),light(T.gather,1,point(0)),light(T.elbow,1,point(1)),light(T.hold,1,point(2)),light(T.strike,1,point(3)),light(T.discharge,0,point(3)),light(T.settle,0,point(0))];
export const bolt=motion(T.settle,'Hold the charge. Break the tension.',['Gather','Strike','Discharge'],[
 actor('bolt-body',G.source.map(n=>`${n}px`).join(' '),[pose(T.rest,'scaleY(1)',ease.smooth),pose(T.gather,`scaleY(${G.gatherScale})`),pose(T.hold,`scaleY(${G.gatherScale})`,ease.accelerate),pose(T.strike,`scaleY(${G.strikeScale})`),pose(T.release,`scaleY(${G.strikeScale})`,ease.settle),pose(T.recover,'scaleY(.985)'),pose(T.clear,'scaleY(1.004)'),pose(T.settle,'scaleY(1)')]),
 actor('bolt-charge','0px 0px',chargeFrames),
 actor('bolt-aperture','0px 0px',chargeFrames),
 ...BOLT_ART.discharge.map((_,i)=>actor(`bolt-discharge-${i}`,BOLT_CONTACT.map(n=>`${n}px`).join(' '),[light(T.rest,0,'scale(.15)'),light(T.strike+i*18,0,'scale(.15)'),light(T.discharge+i*18,.95-i*.1,'scale(1)'),light(T.clear+i*35,0,'scale(1.18)'),light(T.settle,0,'scale(.15)')])),
]);
