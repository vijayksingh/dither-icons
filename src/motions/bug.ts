import {actor,motion,pose,light} from './authoring';

/* ── BUG / feel for the problem, expose its location ─────────
 *    0ms  six legs, head, feelers and split carapace stay legible
 *  140ms  left feeler probes; right follows with less travel
 *  330ms  both feelers attend inward; forelegs brace
 *  470ms  shell halves part around the existing center seam
 *  550ms  the exposed fault lights at its actual position
 *  640ms  a close-fitting locator brackets that position
 *  820ms  hold the diagnosis; no checkmark or removal
 * 1050ms  effects clear before the shell closes
 * 1320ms  exact rest
 * MOT-01/03/08/14/16: locate the fault, never claim it is fixed.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,         // Complete insect, fault unaccented.
 feel:140,       // Left antenna initiates the inquiry.
 follow:230,     // Right antenna responds.
 attend:330,     // Forelegs brace as both feelers orient inward.
 expose:470,     // Shell halves reveal the center seam.
 locate:550,     // Pinpoint the exposed fault.
 bracket:640,    // Tight locator answers the pinpoint.
 hold:820,       // Keep the located fault readable.
 clear:1050,     // Clear locator before covering the seam.
 home:1170,      // Shell and appendages return.
 settle:1320,    // Exact rest; bug still present.
};
export const BUG_GEOMETRY={fault:[12,14] as const,seamHalf:.55,travel:.65};
export const BUG_ART={
 head:'M9 8V7a3 3 0 0 1 6 0v1Z',
 left:'M11.45 8.8C8.3 8.8 7.4 10.7 7.4 14v1.5c0 3.1 1.35 5 4.05 5Z',
 right:'M12.55 8.8c3.15 0 4.05 1.9 4.05 5.2v1.5c0 3.1-1.35 5-4.05 5Z',
 leftLine:'M10.8 9.5C8.9 9.5 8.1 11 8.1 14v1.5c0 2.6 .8 4.3 2.7 4.3Z',
 rightLine:'M13.2 9.5c1.9 0 2.7 1.5 2.7 4.5v1.5c0 2.6-.8 4.3-2.7 4.3Z',
 antennaLeft:'M10.3 5.3 8.7 2.8',antennaRight:'M13.7 5.3 15.3 2.8',
 legs:[{part:'foreleg-left',d:'M8.4 10.6 5.5 9.2 4.1 7.5',origin:'8.4px 10.6px'}, {part:'foreleg-right',d:'M15.6 10.6 18.5 9.2 19.9 7.5',origin:'15.6px 10.6px'}],
 hind:'M7.5 14H3.7M16.5 14h3.8M8.4 17.6 5.5 18.8 4.1 20.5M15.6 17.6 18.5 18.8 19.9 20.5',
 locator:'M9.4 12.9v-1.2h1.2M13.4 11.7h1.2v1.2M14.6 15.1v1.2h-1.2M10.6 16.3H9.4v-1.2',
};
const ANTENNA=[{part:'feeler-left',origin:'10.3px 5.3px',start:TIMING.feel,probe:'rotate(-13deg)',attend:'rotate(12deg)'},{part:'feeler-right',origin:'13.7px 5.3px',start:TIMING.follow,probe:'rotate(9deg)',attend:'rotate(-10deg)'}];
const SHELL=[{part:'shell-left',origin:'11.45px 14px',open:'translateX(-.65px)'},{part:'shell-right',origin:'12.55px 14px',open:'translateX(.65px)'}];
const FAULT={origin:'12px 14px',small:'scale(.5)',full:'scale(1)',ink:.95};
const LOCATOR={origin:'12px 14px',wide:'scale(1.25)',fit:'scale(1)',ink:.8};
export const bug=motion(TIMING.settle,'Follow the trace. Find the fault.',['Feel','Expose','Locate'],[
 ...ANTENNA.map(a=>actor(a.part,a.origin,[pose(TIMING.rest,'rotate(0deg)'),pose(a.start,a.probe),pose(TIMING.attend,a.attend),pose(TIMING.hold,a.attend),pose(TIMING.home,'rotate(0deg)'),pose(TIMING.settle,'rotate(0deg)')])),
 ...BUG_ART.legs.map((l,i)=>actor(l.part,l.origin,[pose(TIMING.rest,'rotate(0deg)'),pose(TIMING.follow,'rotate(0deg)'),pose(TIMING.attend,`rotate(${i?5:-5}deg)`),pose(TIMING.hold,`rotate(${i?5:-5}deg)`),pose(TIMING.home,'rotate(0deg)'),pose(TIMING.settle,'rotate(0deg)')])),
 ...SHELL.map(s=>actor(s.part,s.origin,[pose(TIMING.rest,'translateX(0px)'),pose(TIMING.attend,'translateX(0px)'),pose(TIMING.expose,s.open),pose(TIMING.hold,s.open),pose(TIMING.home,'translateX(0px)'),pose(TIMING.settle,'translateX(0px)')])),
 actor('fault-light',FAULT.origin,[light(TIMING.rest,0,FAULT.small),light(TIMING.expose,0,FAULT.small),light(TIMING.locate,FAULT.ink,FAULT.full),light(TIMING.hold,.6,FAULT.full),light(TIMING.clear,0,FAULT.full),light(TIMING.settle,0,FAULT.small)]),
 actor('fault-locator',LOCATOR.origin,[light(TIMING.rest,0,LOCATOR.wide),light(TIMING.locate,0,LOCATOR.wide),light(TIMING.bracket,LOCATOR.ink,LOCATOR.fit),light(TIMING.hold,.6,LOCATOR.fit),light(TIMING.clear,0,LOCATOR.fit),light(TIMING.settle,0,LOCATOR.wide)]),
]);
