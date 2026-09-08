import {actor,motion,pose,light} from './authoring';
import {ringPath,arcPath} from './learning-geometry';

/* ── NETWORK / two inputs meet before an output answers ─────
 *    0ms  four nodes and three fixed connections
 *  130ms  upper input begins its transmission
 *  180ms  lower input follows
 *  420ms  first signal reaches the computation node
 *  470ms  second arrives; only now may the node respond
 *  525ms  a small compression combines the arrivals
 *  610ms  the node opens into an output pulse
 *  805ms  output receives; a fine echo follows
 * 1090ms  all light is gone, topology remains unchanged
 * 1380ms  exact rest; no numerical result or learning claim
 * MOT-01/03/05/08/16: convergence before transmission.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,          // Fixed topology makes the computation readable.
 upperStart:130,  // The first input enters its own connection.
 lowerStart:180,  // The second follows with a small causal stagger.
 upperLight:260,  // First transmission becomes fully visible.
 lowerLight:310,  // Second transmission becomes fully visible.
 upperArrive:420, // The hub receives the first input and waits.
 lowerArrive:470, // Both inputs are now available to the hub.
 upperOut:505,    // Retire the received first signal.
 combine:525,     // A small compression combines the arrivals.
 lowerOut:555,    // Retire the received second signal.
 outputStart:580, // Transmission begins after combination.
 release:610,     // The computation node releases its response.
 outputLight:740, // Light spans the output connection.
 receive:805,     // The output node receives before responding.
 echo:880,        // The receiving node and its finer echo peak.
 hubRest:940,     // The hub returns without shifting connections.
 outputOut:980,   // Clear the last transmission light.
 echoOut:1090,    // Let the exterior response dissipate.
 nodeRest:1150,   // All nodes regain their original dimensions.
 settle:1380,     // Exact rest; no numerical result is implied.
};
const ribbon=(x:number,y:number,a:number,b:number,w:number)=>{const len=Math.hypot(a-x,b-y),dx=-(b-y)/len*w/2,dy=(a-x)/len*w/2;return `M${x+dx} ${y+dy}L${a+dx} ${b+dy}L${a-dx} ${b-dy}L${x-dx} ${y-dy}Z`};
export const NETWORK_ART={
 upper:ribbon(4,7,12,12,1.35),lower:ribbon(4,17,12,12,1.35),output:ribbon(12,12,20,12,1.35),
 upperLine:'M4 7 12 12',lowerLine:'M4 17 12 12',outputLine:'M12 12H20',
 upperTrace:'M6.1 8.3125l1.15.71875',lowerTrace:'M6.1 15.6875l1.15-.71875',outputTrace:'M14.6 12h3.2',
 nodes:[{part:'input-upper',x:4,y:7,r:2.3},{part:'input-lower',x:4,y:17,r:2.3},{part:'compute-node',x:12,y:12,r:2.7},{part:'output-node',x:20,y:12,r:2.3}],
 node:(x:number,y:number,r:number)=>ringPath(x,y,r,1.2),echo:arcPath(20,12,3.4,-65,65),
};
const SIGNAL={travel:2.3,ink:.94};
const HUB={origin:'12px 12px',combine:.94,release:1.09};
const OUTPUT={origin:'20px 12px',receive:1.1};
const EASE={combine:'cubic-bezier(.4,0,.6,1)',release:'cubic-bezier(.18,.8,.3,1)',settle:'cubic-bezier(.3,0,.3,1)'};
const INPUTS=[{part:'upper-signal',y:8.3125,sign:1,start:TIMING.upperStart,bright:TIMING.upperLight,arrive:TIMING.upperArrive,out:TIMING.upperOut},{part:'lower-signal',y:15.6875,sign:-1,start:TIMING.lowerStart,bright:TIMING.lowerLight,arrive:TIMING.lowerArrive,out:TIMING.lowerOut}];
const networkMotion=motion(TIMING.settle,'Two inputs meet. One output answers.',['Receive','Combine','Transmit'],[
 ...INPUTS.map(b=>actor(b.part,`6.1px ${b.y}px`,[light(TIMING.rest,0,'translate(0px,0px)'),light(b.start,0,'translate(0px,0px)'),light(b.bright,SIGNAL.ink,`translate(.65px,${b.sign*.40625}px)`),light(b.arrive,SIGNAL.ink,`translate(${SIGNAL.travel}px,${b.sign*SIGNAL.travel*5/8}px)`),light(b.out,0,`translate(${SIGNAL.travel}px,${b.sign*SIGNAL.travel*5/8}px)`),light(TIMING.settle,0,'translate(0px,0px)')])),
 actor('compute-node',HUB.origin,[pose(TIMING.rest,'scale(1)'),pose(TIMING.lowerArrive,'scale(1)',EASE.combine),pose(TIMING.combine,`scale(${HUB.combine})`,EASE.release),pose(TIMING.release,`scale(${HUB.release})`,EASE.settle),pose(TIMING.hubRest,'scale(1)'),pose(TIMING.settle,'scale(1)')]),
 actor('output-signal','14.6px 12px',[light(TIMING.rest,0,'scaleX(.1)'),light(TIMING.outputStart,0,'scaleX(.1)'),light(TIMING.outputLight,.94,'scaleX(1)'),light(TIMING.receive,.94,'scaleX(1)'),light(TIMING.outputOut,0,'scaleX(1)'),light(TIMING.settle,0,'scaleX(.1)')]),
 actor('output-node',OUTPUT.origin,[pose(TIMING.rest,'scale(1)'),pose(TIMING.receive,'scale(1)',EASE.release),pose(TIMING.echo,`scale(${OUTPUT.receive})`,EASE.settle),pose(TIMING.nodeRest,'scale(1)'),pose(TIMING.settle,'scale(1)')]),
 actor('output-echo',OUTPUT.origin,[light(TIMING.rest,0,'scale(.82)'),light(TIMING.receive,0,'scale(.82)'),light(TIMING.echo,.82,'scale(1)'),light(TIMING.echoOut,0,'scale(1.03)'),light(TIMING.settle,0,'scale(.82)')]),
]);

export const network={...networkMotion,tracks:[...networkMotion.tracks,...[['compute-node','compute-occlusion'],['output-node','output-occlusion']].map(([visible,part])=>({...networkMotion.tracks.find(t=>t.part===visible)!,part}))]};
