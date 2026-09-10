import {actor,motion,pose,light,ease} from './authoring';
import {arcPath,polar} from './learning-geometry';
/* HISTORY / turn back the clock → recall the previous hour → hold
 *    0ms  clock hands inside a fixed counterclockwise history ring
 *  120ms  slight forward take-up
 *  490ms  minute hand has rewound a quarter turn; hour hand follows at 1:12
 *  580ms  the ring's traveling light reaches its return arrow
 *  650ms  a brief catch acknowledges the earlier point
 *  860ms  time stays still long enough to read
 * 1460ms  original clock; no perpetual ticking or claim of restored state
 * MOT-01/03/05/08/14/16: rewind belongs to the hands, not the whole symbol.
 */
export const HISTORY_TIMING={rest:0,prepare:120,trace:180,rewind:490,reach:580,reply:650,hold:860,clear:1060,home:1300,settle:1460};
export const HISTORY_GEOMETRY={center:[12,12],radius:8,start:145,end:-150,minuteRewind:-90,hourRatio:12};
const G=HISTORY_GEOMETRY,T=HISTORY_TIMING;
export const HISTORY_TIP=polar(12,12,G.radius,G.end);
export const HISTORY_ART={ring:arcPath(12,12,G.radius,G.start,G.end),head:`M${HISTORY_TIP[0]-.59} ${HISTORY_TIP[1]-3.58}L${HISTORY_TIP.join(' ')}l3.39-1.28`,minute:'M12 12V7.6',hour:'M12 12l2.7 1.6',trace:arcPath(12,12,G.radius,86,104),reply:'M2.75 8.5l-.7.25M4.3 10.3l-.15.75'};
const hands=[{at:T.rest,deg:0},{at:T.prepare,deg:7},{at:T.rewind,deg:G.minuteRewind},{at:T.hold,deg:G.minuteRewind},{at:T.home,deg:0},{at:T.settle,deg:0}];
export const history=motion(T.settle,'Turn back the clock. Find an earlier moment.',['Rewind','Recall','Hold'],[
 ...[{part:'history-minute',ratio:1},{part:'history-hour',ratio:G.hourRatio}].map(({part,ratio})=>actor(part,'12px 12px',hands.map(({at,deg})=>pose(at,`rotate(${deg/ratio}deg)`,at===T.prepare?ease.settle:ease.smooth)))),
 actor('history-trace','12px 12px',[light(T.rest,0,'rotate(0deg)'),light(T.trace,0,'rotate(0deg)'),light(T.rewind,.95,'rotate(-185deg)'),light(T.reach,.95,`rotate(${G.end-86}deg)`),light(T.hold,0,`rotate(${G.end-86}deg)`),light(T.settle,0,'rotate(0deg)')]),
 actor('history-recall',HISTORY_TIP.map(n=>`${n}px`).join(' '),[light(T.rest,0,'scale(.6)'),light(T.reach,0,'scale(.6)'),light(T.reply,.8,'scale(1)'),light(T.clear,0,'scale(1.12)'),light(T.settle,0,'scale(.6)')]),
]);
