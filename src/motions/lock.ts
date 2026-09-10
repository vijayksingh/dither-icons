import {actor,light,motion,pose} from './authoring';

/* LOCK / protection holds under tension
 *    0ms  both shackle feet sit behind the fixed housing
 *  120ms  small preparation, keyhole stays unchanged
 *  360ms  crown takes tension, feet remain on y=11.3
 *  430ms  the two receiving shoulders catch light
 *  500ms  short exterior marks answer the resistance
 *  610ms  sustained hold gives way to release
 *  780ms  shackle seats softly, accents clear
 * 1000ms  original crown restored
 * 1240ms  still closed, exact neutral
 * MOT-01/03/05/08/14/16: test the hold, never imply unlocking.
 */
export const LOCK_TIMING={rest:0,gather:120,tension:360,light:430,echo:500,hold:610,seat:780,home:1000,settle:1240};
export const LOCK_GEOMETRY={feetY:11.3,left:7.6,right:16.4,top:2.6};
export const LOCK_ART={
 shackle:'M6.6 11.3V8a5.4 5.4 0 0 1 10.8 0v3.3h-2V8a3.4 3.4 0 0 0-6.8 0v3.3Z',
 shackleLine:'M7.6 11.3V8a4.4 4.4 0 0 1 8.8 0v3.3',
 body:'M6.2 10.3h11.6a2.2 2.2 0 0 1 2.2 2.2v6.7a2.2 2.2 0 0 1-2.2 2.2H6.2A2.2 2.2 0 0 1 4 19.2v-6.7a2.2 2.2 0 0 1 2.2-2.2Z',
 keyhole:'M11.3 16.05a1.35 1.35 0 1 1 1.4 0v2.05h-1.4Z',
 seats:'M6.9 10.3h1.4M15.7 10.3h1.4',
 response:'M3.15 10.1l-.8-.45M20.85 10.1l.8-.45',
};
const SHACKLE={origin:`12px ${LOCK_GEOMETRY.feetY}px`,rest:'scaleY(1)',gather:'scaleY(.985)',tension:'scaleY(1.055)',seat:'scaleY(.992)'};
const T=LOCK_TIMING;
export const lock=motion(T.settle,'Take a little tension. Hold securely.',['Test','Hold','Release'],[
 actor('lock-shackle',SHACKLE.origin,[pose(T.rest,SHACKLE.rest),pose(T.gather,SHACKLE.gather),pose(T.tension,SHACKLE.tension),pose(T.hold,SHACKLE.tension),pose(T.seat,SHACKLE.seat),pose(T.home,SHACKLE.rest),pose(T.settle,SHACKLE.rest)]),
 actor('lock-seats','12px 10.3px',[light(T.rest,0),light(T.tension,0),light(T.light,.9),light(T.hold,.45),light(T.seat,0),light(T.settle,0)]),
 actor('lock-response','12px 10.3px',[light(T.rest,0,'scaleX(.95)'),light(T.light,0,'scaleX(.95)'),light(T.echo,.7,'scaleX(1)'),light(T.seat,0,'scaleX(1.07)'),light(T.settle,0,'scaleX(.95)')]),
]);
