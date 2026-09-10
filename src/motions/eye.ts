import {actor,light,motion,pose,ease} from './authoring';

/* EYE / a blink, then renewed attention
 *    0ms  open lids; iris keeps its shape and position
 *  110ms  a small widening before the blink
 *  250ms  aperture fully closes over the stationary iris
 *  320ms  closed crease holds for 70ms
 *  555ms  lids reopen with a small lift
 *  640ms  the revealed iris catches light
 *  760ms  lids settle at their original height
 *  940ms  catchlight clears
 * 1120ms  exact open rest
 * MOT-01/03/05/07/08/16: user-requested closed-eye exception;
 * the eyelids occlude an intact iris, never flatten the eyeball.
 */
export const EYE_TIMING={rest:0,widen:110,close:250,hold:320,reveal:430,open:555,light:640,home:760,clear:940,settle:1120};
export const EYE_GEOMETRY={center:[12,12],irisRadius:3.2,widen:1.035,open:1.04};
export const EYE_ART={
 outline:'M2 12C4.6 7.8 8.2 5.2 12 5.2S19.4 7.8 22 12C19.4 16.2 15.8 18.8 12 18.8S4.6 16.2 2 12Z',
 aperture:'M4.15 12C6.4 8.8 9.15 7 12 7S17.6 8.8 19.85 12C17.6 15.2 14.85 17 12 17S6.4 15.2 4.15 12Z',
 centerline:'M2.9 12C5.4 8.25 8.7 6.1 12 6.1S18.6 8.25 21.1 12C18.6 15.75 15.3 17.9 12 17.9S5.4 15.75 2.9 12Z',
 iris:'M12 8.8a3.2 3.2 0 1 0 0 6.4a3.2 3.2 0 1 0 0-6.4Z',
 catchlight:'M11 10.3a.6.6 0 1 0 0 1.2a.6.6 0 1 0 0-1.2Z',
 crease:'M2.9 11.4Q12 13.8 21.1 11.4a.6.6 0 0 1 0 1.2Q12 15 2.9 12.6a.6.6 0 0 1 0-1.2Z',
 creaseLine:'M2.9 12Q12 14.4 21.1 12',
 lashes:'M7.4 12.9l-.45 1.1M16.6 12.9l.45 1.1',
 light:'M10.4 9.75a2.7 2.7 0 0 1 2.15-.35',
};
const T=EYE_TIMING,G=EYE_GEOMETRY;
// Lids and aperture share the very same frames. Iris is outside these transforms.
export const EYE_BLINK=[pose(T.rest,'scaleY(1)'),pose(T.widen,`scaleY(${G.widen})`,ease.accelerate),pose(T.close,'scaleY(0)'),pose(T.hold,'scaleY(0)',ease.settle),pose(T.open,`scaleY(${G.open})`),pose(T.home,'scaleY(1)'),pose(T.settle,'scaleY(1)')];
export const eye=motion(T.settle,'The eye closes fully, then opens with a catchlight.',['Close','Open','Awaken'],[
 actor('eye-lids','12px 12px',EYE_BLINK),
 actor('eye-aperture','12px 12px',EYE_BLINK),
 actor('eye-crease','12px 12px',[light(T.rest,0),light(T.widen,0),light(T.close,1),light(T.hold,1),light(T.reveal,0),light(T.settle,0)]),
 actor('eye-light','12px 12px',[light(T.rest,0),light(T.open,0),light(T.light,.85),light(T.clear,0),light(T.settle,0)]),
]);
