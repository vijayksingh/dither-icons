import {actor,motion,pose,light} from './authoring';

/* ── MESSAGE / a thought gathers, then earns a response ──────
 *    0ms  three round dots inside a stable speech bubble
 *  110ms  the first dot gathers, then lifts
 *  230ms  the middle dot receives the same impulse
 *  365ms  the last dot gathers as the first settles
 *  545ms  final dot crests, slightly stronger than its predecessors
 *  585ms  the nearby bubble edge catches the response
 *  635ms  one small exterior echo expands and dissolves
 * 1180ms  exact still dots; no perpetual typing indicator
 * MOT-01/03/05/08/14/16: finite conversational emphasis, no state claim.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,       // fixed bubble, three resting dots
 leftGather:110,// first impulse
 leftPeak:275, // first crest
 leftSeat:470, // first dot lands
 leftRest:700, // first recovery complete
 middleGather:230,// receiving impulse
 middlePeak:405,  // second crest
 middleSeat:605,  // second dot lands
 middleRest:830,  // second recovery complete
 rightGather:365, // final thought takes shape
 rightPeak:545,   // strongest crest
 edgeStart:490,   // edge response begins near the last crest
 edgeCrest:585,   // local response
 echoStart:545,   // exterior echo follows final dot
 echoCrest:635,   // conversational climax
 rightSeat:745,   // last dot returns
 echoOut:940,     // response dissipates
 rightRest:1000,  // dot settled
 settle:1180,     // exact rest
};
export const MESSAGE_ART={
 bubble:'M5 3.75h14a2.25 2.25 0 0 1 2.25 2.25v10A2.25 2.25 0 0 1 19 18.25h-8.7l-5.55 3.5v-3.5h-.2A2.3 2.3 0 0 1 2.75 16V6A2.25 2.25 0 0 1 5 3.75Z',
 dots:[{part:'dot-left',x:7},{part:'dot-center',x:12},{part:'dot-right',x:17}],
 dotY:10.5,radius:1.05,
 edge:'M20.35 8.9v3.2',
 echo:'M22.5 8.7q.65 1.8 0 3.6',
};
const DOT={gather:.91,lift:-.9,peak:1.17,seat:.13,lastLift:-1.12,lastPeak:1.24};
const EDGE={origin:'20.35px 10.5px',ink:.78};
const ECHO={origin:'22.5px 10.5px',ink:.88,start:'translateX(-.15px) scaleY(.35)',peak:'translateX(0px) scaleY(1)',end:'translateX(.45px) scaleY(1.08)'};
const EASE={gather:'cubic-bezier(.4,0,.7,1)',lift:'cubic-bezier(.17,.8,.32,1)',land:'cubic-bezier(.4,0,.6,1)',settle:'cubic-bezier(.2,0,.28,1)'};
const beats=[
 {part:'dot-left',x:7,gather:TIMING.leftGather,peak:TIMING.leftPeak,seat:TIMING.leftSeat,rest:TIMING.leftRest,last:false},
 {part:'dot-center',x:12,gather:TIMING.middleGather,peak:TIMING.middlePeak,seat:TIMING.middleSeat,rest:TIMING.middleRest,last:false},
 {part:'dot-right',x:17,gather:TIMING.rightGather,peak:TIMING.rightPeak,seat:TIMING.rightSeat,rest:TIMING.rightRest,last:true},
];
const REST='translateY(0px) scale(1)';
export const message=motion(TIMING.settle,'A thought gathers. A little response.',['Gather','Answer','Resolve'],[
 ...beats.map(b=>actor(b.part,`${b.x}px ${MESSAGE_ART.dotY}px`,[
 pose(TIMING.rest,REST,EASE.gather),pose(b.gather,`translateY(.15px) scale(${DOT.gather})`,EASE.lift),
 pose(b.peak,`translateY(${b.last?DOT.lastLift:DOT.lift}px) scale(${b.last?DOT.lastPeak:DOT.peak})`,EASE.land),
 pose(b.seat,`translateY(${DOT.seat}px) scale(.97)`,EASE.settle),pose(b.rest,REST),pose(TIMING.settle,REST)])),
 actor('reply-edge',EDGE.origin,[light(TIMING.rest,0,'scaleY(.3)'),light(TIMING.edgeStart,0,'scaleY(.3)'),
 light(TIMING.edgeCrest,EDGE.ink,'scaleY(1)'),light(TIMING.echoOut,0,'scaleY(1)'),light(TIMING.settle,0,'scaleY(.3)')]),
 actor('reply-echo',ECHO.origin,[light(TIMING.rest,0,ECHO.start),light(TIMING.echoStart,0,ECHO.start),
 light(TIMING.echoCrest,ECHO.ink,ECHO.peak),light(TIMING.echoOut,0,ECHO.end),light(TIMING.settle,0,ECHO.start)]),
]);
