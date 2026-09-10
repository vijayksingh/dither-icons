import {actor,motion,pose,light} from './authoring';
/* ── SIGN OUT / open the doorway before leaving ─────────────
 *    0ms  fixed doorway, hinged leaf, rightward arrow
 *  120ms  leaf takes up its hinge; arrow waits
 *  340ms  doorway is open around both fixed hinge endpoints
 *  660ms  arrow passes the threshold, still pointing right
 *  750ms  two close threshold witnesses answer
 *  940ms  response clears; return begins
 * 1210ms  arrow home before leaf closure
 * 1350ms  door closes around its original hinge
 * 1540ms  exact rest; session state is never changed
 * MOT-01/03/05/07/16: uncover a route, then cross its boundary.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,      // Original doorway and arrow.
 prepare:120, // Prepare the hinge.
 open:340,    // Clear the exit route.
 depart:660,  // Complete the outward passage.
 answer:750,  // Threshold response follows passage.
 clear:940,   // Clear and begin return.
 arrowHome:1210,// Arrow returns before closing.
 close:1350,  // Leaf closes without cutting through the arrow.
 settle:1540, // Exact rest.
};
export const EXIT_ART={
 frame:'M11.6 3.8H5.1a1.3 1.3 0 0 0-1.3 1.3v13.8a1.3 1.3 0 0 0 1.3 1.3h6.5v-1.4H5.2V5.2h6.4Z',
 frameLine:'M11.6 4.5H5.1a.6.6 0 0 0-.6.6v13.8a.6.6 0 0 0 .6.6h6.5',
 leaf:'M5.2 5.2h5.4v13.6H5.2Z',
 leafLine:'M5.75 5.75h4.3v12.5h-4.3Z',
 arrow:'M10.1 11.3h6.8l-1.85-1.85a.7.7 0 0 1 .99-.99l3.05 3.05a.7.7 0 0 1 0 .98l-3.05 3.05a.7.7 0 0 1-.99-.99l1.85-1.85h-6.8Z',
 arrowLine:'M10.1 12h8.5M15.55 8.95 18.6 12l-3.05 3.05',
 upper:'M12.4 9.2l.65-.45',lower:'M12.4 14.8l.65.45',
};
export const EXIT_DOOR={origin:'5.2px 12px',rest:'matrix(1,0,0,1,0,0)',pickup:'matrix(.96,.012,0,1,0,0)',open:'matrix(.58,.13,0,1,0,0)'};
const ARROW={origin:'10.1px 12px',rest:'translateX(0px)',pickup:'translateX(-.2px)',exit:'translateX(2.1px)'};
const doorFrames=[pose(TIMING.rest,EXIT_DOOR.rest),pose(TIMING.prepare,EXIT_DOOR.pickup),pose(TIMING.open,EXIT_DOOR.open),pose(TIMING.arrowHome,EXIT_DOOR.open),pose(TIMING.close,EXIT_DOOR.rest),pose(TIMING.settle,EXIT_DOOR.rest)];
export const signOut=motion(TIMING.settle,'The door opens before the arrow exits.',['Open','Leave','Release'],[
 ...['exit-leaf','exit-occlusion'].map(part=>actor(part,EXIT_DOOR.origin,doorFrames)),
 actor('exit-arrow',ARROW.origin,[pose(TIMING.rest,ARROW.rest),pose(TIMING.prepare,ARROW.pickup),pose(TIMING.open,ARROW.pickup),pose(TIMING.depart,ARROW.exit),pose(TIMING.clear,ARROW.exit),pose(TIMING.arrowHome,ARROW.rest),pose(TIMING.settle,ARROW.rest)]),
 ...['exit-witness-upper','exit-witness-lower'].map(part=>actor(part,'11.6px 12px',[light(TIMING.rest,0,'scale(.65)'),light(TIMING.depart,0,'scale(.65)'),light(TIMING.answer,.75,'scale(1)'),light(TIMING.clear,0,'scale(1.12)'),light(TIMING.settle,0,'scale(.65)')])),
]);
