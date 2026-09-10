import {actor,light,motion,pose} from './authoring';

/* CHECK / affirmation follows the ascending stroke
 *    0ms  whole check visible; the low vertex is the anchor
 *  110ms  lean back four degrees, keeping the vertex fixed
 *  310ms  seat; a short highlight starts climbing the long arm
 *  590ms  highlight reaches the actual tip
 *  650ms  two small tip rays answer the arrival
 *  820ms  the response clears; the check already rests
 * 1060ms  exact neutral, without replacing the symbol
 * MOT-01/03/05/08/16: read the stroke before its finishing accent.
 */
export const CHECK_TIMING={rest:0,gather:110,seat:310,trace:350,arrive:590,echo:650,clear:820,settle:1060};
export const CHECK_ART={
 body:'M3.35147 13.04853L8.35147 18.04853a1.2 1.2 0 0 0 1.69706 0L20.64853 7.44853a1.2 1.2 0 0 0-1.69706-1.69706L9.2 15.50294L5.04853 11.35147a1.2 1.2 0 0 0-1.69706 1.69706Z',
 centerline:'M4.2 12.2 9.2 17.2 19.8 6.6',
 trace:'M9.8 16.6l1.1-1.1',
 rays:'M21.6 6.4l.65-.1M19.95 4.5l.1-.65',
};
const CHECK={origin:'9.2px 17.2px',rest:'rotate(0deg)',gather:'rotate(-4deg)'};
const TRACE={origin:CHECK.origin,rest:'translate(0px,0px)',tip:'translate(8.9px,-8.9px)'};
const T=CHECK_TIMING;
export const check=motion(T.settle,'Seat the stroke. Let the tip affirm.',['Seat','Trace','Affirm'],[
 actor('check-stroke',CHECK.origin,[pose(T.rest,CHECK.rest),pose(T.gather,CHECK.gather,'cubic-bezier(.18,.75,.25,1)'),pose(T.seat,CHECK.rest),pose(T.settle,CHECK.rest)]),
 actor('check-trace',TRACE.origin,[light(T.rest,0,TRACE.rest),light(T.seat,0,TRACE.rest),light(T.trace,.85,TRACE.rest),{...light(T.arrive,.85,TRACE.tip),easing:'linear'},light(T.echo,0,TRACE.tip),light(T.settle,0,TRACE.rest)]),
 actor('check-tip','19.8px 6.6px',[light(T.rest,0,'scale(.7)'),light(T.arrive,0,'scale(.7)'),light(T.echo,.8,'scale(1)'),light(T.clear,0,'scale(1.35)'),light(T.settle,0,'scale(.7)')]),
]);
