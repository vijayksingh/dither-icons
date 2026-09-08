import {actor,motion,pose,light} from './authoring';

/* ── GRADUATION CAP / a small tip, a weighted tassel ──────────
 *    0ms  mortarboard, crown and attached tassel form one cap
 *  140ms  take up a restrained counter-tip
 *  400ms  the rigid cap tips six degrees in acknowledgement
 *  470ms  hanging cord lags, then recovers towards gravity
 *  590ms  hold the invitation to learn
 *  810ms  cap returns; the cord carries its remaining momentum
 *  875ms  cord reverses at the catch; tuft trails it
 *  940ms  a short local arc follows the tassel's reversal
 * 1090ms  secondary motion diminishes
 * 1440ms  exact rest, no graduation or completion claim
 * MOT-01/03/06/08/16: motion lives in the weighted attachment.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,        // Complete academic cap.
 gather:140,    // Small counter-tip prepares the gesture.
 tip:400,       // Rigid plane and crown tip together.
 lag:470,       // Cord responds after the board.
 hold:590,      // Hold the invitation briefly.
 home:810,      // Board returns; free attachment keeps moving.
 catch:875,     // Cord reaches its restrained reversal.
 echo:940,      // Tuft and local arc follow the reversal.
 rebound:1090,  // Dissipate the remaining attachment energy.
 quiet:1260,    // Last, very small correction.
 settle:1440,   // Exact neutral geometry.
};
export const CAP_GEOMETRY={pivot:[12,16] as const,hinge:[20,9.4] as const,tuft:[20,16.3] as const};
export const CAP_ART={
 board:'M2.4 8.3 11.6 3.7a.9.9 0 0 1 .8 0l9.2 4.6a.5.5 0 0 1 0 .9l-9.2 4.6a.9.9 0 0 1-.8 0L2.4 9.2a.5.5 0 0 1 0-.9Z',
 boardLine:'M2.7 8.75 12 4.1l9.3 4.65L12 13.4Z',
 rim:'M2.3 9.1 12 13.95 21.7 9.1v.8L12 14.75 2.3 9.9Z',
 crown:'M6.4 11.3v4.35c0 3.75 11.2 3.75 11.2 0V11.3L12 14.1Z',
 crownLine:'M7.1 12.1v3.4c0 2.8 9.8 2.8 9.8 0v-3.4',
 cord:'M12 8.6 20 9.4',hanging:'M20 9.4v6.9',
 tuft:'M19.4 16.3h1.2l.55 3.1h-2.3Z',
 edge:'M5.2 8.6 12 5.2l5.1 2.55',
 echo:'M22 16.9q.65 1.2 .2 2.4',
};
const CAP={origin:'12px 16px',rest:'translateY(0px) rotate(0deg)',gather:'translateY(0px) rotate(1.2deg)',tip:'translateY(-.25px) rotate(-6deg)'};
const CORD={origin:'20px 9.4px',rest:'rotate(0deg)',gather:'rotate(-2deg)',lag:'rotate(11deg)',hold:'rotate(6deg)',catch:'rotate(-7deg)',rebound:'rotate(2.8deg)',quiet:'rotate(-.65deg)'};
const TUFT={origin:'20px 16.3px',rest:'rotate(0deg)',lag:'rotate(5deg)',catch:'rotate(-8deg)',rebound:'rotate(3.5deg)'};
const LIGHT={origin:'12px 8.6px',ink:.65};
export const graduationCap=motion(TIMING.settle,'A small tip. A little possibility.',['Acknowledge','Catch','Settle'],[
 actor('academic-cap',CAP.origin,[pose(TIMING.rest,CAP.rest),pose(TIMING.gather,CAP.gather),pose(TIMING.tip,CAP.tip),pose(TIMING.hold,CAP.tip),pose(TIMING.home,CAP.rest),pose(TIMING.settle,CAP.rest)]),
 actor('tassel-cord',CORD.origin,[pose(TIMING.rest,CORD.rest),pose(TIMING.gather,CORD.gather),pose(TIMING.lag,CORD.lag),pose(TIMING.hold,CORD.hold),pose(TIMING.catch,CORD.catch),pose(TIMING.rebound,CORD.rebound),pose(TIMING.quiet,CORD.quiet),pose(TIMING.settle,CORD.rest)]),
 actor('tassel-tuft',TUFT.origin,[pose(TIMING.rest,TUFT.rest),pose(TIMING.gather,TUFT.rest),pose(TIMING.lag,TUFT.lag),pose(TIMING.hold,TUFT.rest),pose(TIMING.echo,TUFT.catch),pose(TIMING.rebound,TUFT.rebound),pose(TIMING.quiet,TUFT.rest),pose(TIMING.settle,TUFT.rest)]),
 actor('cap-edge',LIGHT.origin,[light(TIMING.rest,0),light(TIMING.hold,0),light(TIMING.home,LIGHT.ink),light(TIMING.rebound,0),light(TIMING.settle,0)]),
 actor('tassel-catch','20px 18px',[light(TIMING.rest,0,'scaleY(.65)'),light(TIMING.home,0,'scaleY(.65)'),light(TIMING.echo,.78,'scaleY(1)'),light(TIMING.rebound,0,'scaleY(1.15)'),light(TIMING.settle,0,'scaleY(.65)')]),
]);
