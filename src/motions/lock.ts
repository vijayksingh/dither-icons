import {actor,light,motion,pose} from './authoring';

/* LOCK / test the shackle; the housing refuses to yield
 *    0ms  a complete closed lock, housing and keyhole fixed
 *  110ms  tiny upward tug; both feet remain captured
 *  185ms  first sideways stop, then a short decaying rattle
 *  245ms  opposite stop; rigid metal never stretches or tilts
 *  305ms  second rightward reversal, with less travel
 *  360ms  second leftward reversal; resistance absorbs the shake
 *  405ms  final small rightward motion
 *  450ms  firm center stop; no lingering vibration
 *  495ms  receiving shoulders catch light after arrest
 *  550ms  short exterior response confirms the held state
 *  680ms  stillness holds before the tug relaxes
 *  850ms  original closed pose; accents gone
 * 1080ms  exact neutral
 * MOT-01/03/05/06/08/14/16: a bounded test of a closed mechanism.
 */
export const LOCK_TIMING={rest:0,tug:110,right:185,left:245,rightReturn:305,leftReturn:360,lastReturn:405,stop:450,light:495,echo:550,hold:680,home:850,settle:1080};
export const LOCK_GEOMETRY={feetY:11.3,left:7.6,right:16.4,top:2.6};
export const LOCK_ART={
 shackle:'M6.6 11.3V8a5.4 5.4 0 0 1 10.8 0v3.3h-2V8a3.4 3.4 0 0 0-6.8 0v3.3Z',
 shackleLine:'M7.6 11.3V8a4.4 4.4 0 0 1 8.8 0v3.3',
 body:'M6.2 10.3h11.6a2.2 2.2 0 0 1 2.2 2.2v6.7a2.2 2.2 0 0 1-2.2 2.2H6.2A2.2 2.2 0 0 1 4 19.2v-6.7a2.2 2.2 0 0 1 2.2-2.2Z',
 keyhole:'M11.3 16.05a1.35 1.35 0 1 1 1.4 0v2.05h-1.4Z',
 seats:'M6.9 10.3h1.4M15.7 10.3h1.4',
 response:'M3.15 10.1l-.8-.45M20.85 10.1l.8-.45',
};
const SHACKLE={
 origin:`12px ${LOCK_GEOMETRY.feetY}px`,
 lift:-.25,
 right:.72,left:-.62,rightReturn:.4,leftReturn:-.24,lastReturn:.1,
 reversalEase:'cubic-bezier(.4,0,.6,1)',
};
const shift=(x=0,y=0)=>`translate(${x}px, ${y}px)`;
const T=LOCK_TIMING;
const rattle=[
 [T.right,SHACKLE.right],[T.left,SHACKLE.left],[T.rightReturn,SHACKLE.rightReturn],
 [T.leftReturn,SHACKLE.leftReturn],[T.lastReturn,SHACKLE.lastReturn],
];
export const lock=motion(T.settle,'Give it a shake. It stays locked.',['Test','Resist','Hold'],[
 actor('lock-shackle',SHACKLE.origin,[
  pose(T.rest,shift()),pose(T.tug,shift(0,SHACKLE.lift),SHACKLE.reversalEase),
  ...rattle.map(([at,x])=>pose(at,shift(x,SHACKLE.lift),SHACKLE.reversalEase)),
  pose(T.stop,shift(0,SHACKLE.lift)),pose(T.hold,shift(0,SHACKLE.lift)),
  pose(T.home,shift()),pose(T.settle,shift()),
 ]),
 actor('lock-seats','12px 10.3px',[light(T.rest,0),light(T.stop,0),light(T.light,.9),light(T.hold,.4),light(T.home,0),light(T.settle,0)]),
 actor('lock-response','12px 10.3px',[light(T.rest,0,'scaleX(.95)'),light(T.light,0,'scaleX(.95)'),light(T.echo,.7,'scaleX(1)'),light(T.home,0,'scaleX(1.07)'),light(T.settle,0,'scaleX(.95)')]),
]);
