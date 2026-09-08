import {actor, motion, pose, light} from './authoring';

/* ── TRASH / weight transfers through a real contact ────────
 *    0ms  planted bin, recognizable lid and handle
 *  110ms  the lid takes up its weight
 *  335ms  lift from the left support; handle follows
 *  510ms  release into a short, accelerating fall
 *  750ms  lid bottom meets the rim exactly
 *  800ms  lid AND rim compress together, a fine seam flashes
 *  835ms  paired impact strokes travel away from the contact
 *  900ms  a small rebound; the handle answers a beat later
 * 1250ms  exact rest, every accent gone
 * MOT-01/03/05/08/10/14/16: contact → compression → dissipation.
 * ────────────────────────────────────────────────────────── */
const TIMING = {
  rest:0, brace:110, open:335, handleOpen:390, read:510,
  handleFall:665, contact:750, rimCrest:782, impact:800,
  ticks:835, rebound:900, handleRebound:945, lightOut:1035,
  recover:1100, settle:1250,
};
export const TRASH_ART = {
  bin:'M5 8h14l-1 12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Zm4 3v8h1v-8Zm5 0v8h1v-8Z',
  lid:'M3.45 5h17.1a.45.45 0 0 1 .45.45v1.1a.45.45 0 0 1-.45.45H3.45A.45.45 0 0 1 3 6.55v-1.1A.45.45 0 0 1 3.45 5Z',
  handle:'M9 5V3.5A1 1 0 0 1 10 2.5h4a1 1 0 0 1 1 1V5h-2V4.25h-2V5Z',
  rim:'M6.1 8.08h11.8',
  leftTick:'M3.55 8.35l-1 .35',
  rightTick:'M20.45 8.35l1 .35',
};
export const TRASH_CONTACT = {at:TIMING.contact, compressedAt:TIMING.impact, rimY:8, baseY:22, lidBottom:7, compression:.97};
const LID = {origin:'4.5px 6.5px', rest:'translateY(0px) rotate(0deg)', brace:'translateY(.22px) rotate(.7deg)',
  open:'translateY(-.06px) rotate(-11.5deg)', rebound:'translateY(.08px) rotate(-.9deg)'};
const HANDLE = {origin:'12px 5px', open:2.8, fall:-2, impact:2.4, rebound:-.9};
const BIN = {origin:'12px 22px', rest:'scale(1,1)', impact:`scale(1.012,${TRASH_CONTACT.compression})`, rebound:'scale(.997,1.006)'};
const RIM = {origin:'12px 8px', ink:.92};
const IMPACT = {leftOrigin:'3.5px 8.5px', rightOrigin:'20.5px 8.5px', ink:.84, travel:.7};
const EASE = {brace:'cubic-bezier(.4,0,.65,1)', open:'cubic-bezier(.18,.85,.3,1)',
  fall:'cubic-bezier(.55,0,.88,.45)', contact:'cubic-bezier(.12,.65,.25,1)',
  rebound:'cubic-bezier(.18,.85,.3,1)', settle:'cubic-bezier(.25,0,.3,1)'};
// One contact equation for both planes. Keep identical interpolation during compression.
const lidAtRim=(scale:number)=>`translateY(${TRASH_CONTACT.baseY-(TRASH_CONTACT.baseY-TRASH_CONTACT.rimY)*scale-TRASH_CONTACT.lidBottom}px) rotate(0deg)`;
const tick=(side:'left'|'right')=>{
  const sign=side==='left'?-1:1;
  const start='translateX(0px) scale(.45)', peak=`translateX(${sign*.25}px) scale(1)`, end=`translateX(${sign*IMPACT.travel}px) scale(.8)`;
  return actor(`impact-${side}`,side==='left'?IMPACT.leftOrigin:IMPACT.rightOrigin,[
    light(TIMING.rest,0,start),light(TIMING.contact,0,start),light(TIMING.ticks,IMPACT.ink,peak),
    light(TIMING.lightOut,0,end),light(TIMING.settle,0,start)]);
};
export const trash=motion(TIMING.settle,'A little weight. A close you can feel.',['Lift','Contact','Dissipate'],[
  actor('lid',LID.origin,[pose(TIMING.rest,LID.rest,EASE.brace),pose(TIMING.brace,LID.brace,EASE.open),
    pose(TIMING.open,LID.open),pose(TIMING.read,LID.open,EASE.fall),
    pose(TIMING.contact,lidAtRim(1),EASE.contact),pose(TIMING.impact,lidAtRim(TRASH_CONTACT.compression),EASE.rebound),
    pose(TIMING.rebound,LID.rebound,EASE.settle),pose(TIMING.recover,LID.rest),pose(TIMING.settle,LID.rest)]),
  actor('handle',HANDLE.origin,[pose(TIMING.rest,'rotate(0deg)'),pose(TIMING.brace,'rotate(0deg)',EASE.open),
    pose(TIMING.handleOpen,`rotate(${HANDLE.open}deg)`),pose(TIMING.read,`rotate(${HANDLE.open}deg)`,EASE.fall),
    pose(TIMING.handleFall,`rotate(${HANDLE.fall}deg)`,EASE.contact),pose(TIMING.impact,`rotate(${HANDLE.impact}deg)`,EASE.rebound),
    pose(TIMING.handleRebound,`rotate(${HANDLE.rebound}deg)`,EASE.settle),pose(TIMING.settle,'rotate(0deg)')]),
  actor('bin',BIN.origin,[pose(TIMING.rest,BIN.rest),pose(TIMING.contact,BIN.rest,EASE.contact),
    pose(TIMING.impact,BIN.impact,EASE.rebound),pose(TIMING.rebound,BIN.rebound,EASE.settle),
    pose(TIMING.recover,BIN.rest),pose(TIMING.settle,BIN.rest)]),
  actor('rim-light',RIM.origin,[light(TIMING.rest,0,'scaleX(.25)'),light(TIMING.contact,0,'scaleX(.25)'),
    light(TIMING.rimCrest,RIM.ink,'scaleX(.82)'),light(TIMING.ticks,.6,'scaleX(1)'),
    light(TIMING.lightOut,0,'scaleX(1)'),light(TIMING.settle,0,'scaleX(.25)')]),
  tick('left'),tick('right'),
]);
