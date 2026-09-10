import {actor,light,motion,pose,ease} from './authoring';

/* EYE / find a subject and hold attention
 *    0ms  complete eye, fixed lids and a centered iris
 *  150ms  a small preparatory glance
 *  380ms  iris arrives at its subject on the right
 *  490ms  pupil focus tightens after arrival
 *  555ms  two fine corner marks acknowledge attention
 *  720ms  a readable gaze; no scanning back and forth
 *  900ms  corner marks clear before the return
 * 1120ms  iris centers and relaxes
 * 1300ms  exact neutral
 * MOT-01/03/05/08/16: find, focus, acknowledge; never conceal content.
 */
export const EYE_TIMING={rest:0,notice:150,arrive:380,focus:490,answer:555,hold:720,clear:900,home:1120,settle:1300};
export const EYE_ART={
 outline:'M2 12C4.6 7.8 8.2 5.2 12 5.2S19.4 7.8 22 12C19.4 16.2 15.8 18.8 12 18.8S4.6 16.2 2 12Z',
 aperture:'M4.15 12C6.4 8.8 9.15 7 12 7S17.6 8.8 19.85 12C17.6 15.2 14.85 17 12 17S6.4 15.2 4.15 12Z',
 centerline:'M2.9 12C5.4 8.25 8.7 6.1 12 6.1S18.6 8.25 21.1 12C18.6 15.75 15.3 17.9 12 17.9S5.4 15.75 2.9 12Z',
 iris:'M12 8.8a3.2 3.2 0 1 0 0 6.4a3.2 3.2 0 1 0 0-6.4Z',
 catchlight:'M11 10.3a.6.6 0 1 0 0 1.2a.6.6 0 1 0 0-1.2Z',
 answer:'M22.15 10.3l.85-.4M22.15 13.7l.85.4',
};
export const EYE_IRIS={radius:3.2,left:-.45,right:1.15,focused:.88};
const T=EYE_TIMING,P=EYE_IRIS;
export const eye=motion(T.settle,'Find a subject. Hold its gaze.',['Find','Focus','Acknowledge'],[
 actor('eye-gaze','12px 12px',[pose(T.rest,'translateX(0px)'),pose(T.notice,`translateX(${P.left}px)`),pose(T.arrive,`translateX(${P.right}px)`,ease.settle),pose(T.hold,`translateX(${P.right}px)`),pose(T.home,'translateX(0px)'),pose(T.settle,'translateX(0px)')]),
 actor('eye-iris','12px 12px',[pose(T.rest,'scale(1)'),pose(T.arrive,'scale(1)'),pose(T.focus,`scale(${P.focused})`),pose(T.hold,`scale(${P.focused})`),pose(T.home,'scale(1)'),pose(T.settle,'scale(1)')]),
 actor('eye-answer','21.8px 12px',[light(T.rest,0,'scale(.8)'),light(T.focus,0,'scale(.8)'),light(T.answer,.75,'scale(1)'),light(T.clear,0,'scale(1.12)'),light(T.settle,0,'scale(.8)')]),
]);
