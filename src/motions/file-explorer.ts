import {actor,motion,pose,light} from './authoring';
/* ── FILE EXPLORER / make room, retain the active file ───────
 *    0ms  fixed editor window, connected tree and source
 *  130ms  divider picks up a little room
 *  500ms  divider, tree endpoints and code share 2.3px travel
 *  600ms  the active-file witness registers in the open tree
 *  680ms  the divider's receiving marks answer
 *  940ms  witnesses clear before the layout closes
 * 1240ms  original code placement and tree widths restored
 * 1460ms  exact rest
 * MOT-03/05/07/16: spatial relationships remain continuous.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,      // Fixed editor boundary.
 prepare:130, // Begin opening room.
 open:500,    // Reach the widened explorer.
 select:600,  // Active-file response after the opening.
 answer:680,  // Divider response follows arrangement.
 clear:940,   // End the held arrangement.
 home:1240,   // Restore the original layout.
 settle:1460, // Exact rest.
};
export const EXPLORER_GEOMETRY={divider:8.8,branchStart:5.6,branchEnd:7.3,travel:2.3,rows:[10.6,13.8,17]};
export const EXPLORER_ART={
 frame:'M4.7 3.7h14.6A1.7 1.7 0 0 1 21 5.4v13.2a1.7 1.7 0 0 1-1.7 1.7H4.7A1.7 1.7 0 0 1 3 18.6V5.4a1.7 1.7 0 0 1 1.7-1.7Zm0 1.4a.3.3 0 0 0-.3.3v13.2a.3.3 0 0 0 .3.3h14.6a.3.3 0 0 0 .3-.3V5.4a.3.3 0 0 0-.3-.3Z',
 frameLine:'M4.7 4.4h14.6a1 1 0 0 1 1 1v13.2a1 1 0 0 1-1 1H4.7a1 1 0 0 1-1-1V5.4a1 1 0 0 1 1-1Z',
 chrome:'M4.4 7.3h15.2',spine:'M5.6 9.7V17',divider:'M8.8 8.8v9.3',
 code:'M10.7 10.7h6.9M12.1 13.5h6.1M10.7 16.3h5.2',
 topSeat:'M10.4 8.35h1.4',bottomSeat:'M10.4 18.55h1.4',
};
const LAYOUT={origin:'0px 0px',rest:'translateX(0px)',pickup:'translateX(.18px)',open:`translateX(${EXPLORER_GEOMETRY.travel}px)`};
const positions=[{at:TIMING.rest,dx:0},{at:TIMING.prepare,dx:.18},{at:TIMING.open,dx:EXPLORER_GEOMETRY.travel},{at:TIMING.clear,dx:EXPLORER_GEOMETRY.travel},{at:TIMING.home,dx:0},{at:TIMING.settle,dx:0}];
export const fileExplorer=motion(TIMING.settle,'Make room. Keep your place.',['Reveal','Arrange','Settle'],[
 ...['explorer-divider','explorer-code','explorer-nodes'].map(part=>actor(part,LAYOUT.origin,positions.map(p=>pose(p.at,`translateX(${p.dx}px)`)))),
 ...EXPLORER_GEOMETRY.rows.map((y,i)=>actor(`explorer-branch-${i}`,`${EXPLORER_GEOMETRY.branchStart}px ${y}px`,positions.map(p=>pose(p.at,`scaleX(${1+p.dx/(EXPLORER_GEOMETRY.branchEnd-EXPLORER_GEOMETRY.branchStart)})`)))),
 actor('explorer-active','7.3px 13.8px',[light(TIMING.rest,0,'scale(.65)'),light(TIMING.open,0,'scale(.65)'),light(TIMING.select,.85,'scale(1)'),light(TIMING.clear,0,'scale(1)'),light(TIMING.settle,0,'scale(.65)')]),
 ...['explorer-seat-top','explorer-seat-bottom'].map(part=>actor(part,'11.1px 13.8px',[light(TIMING.rest,0,'scaleX(.3)'),light(TIMING.open,0,'scaleX(.3)'),light(TIMING.answer,.8,'scaleX(1)'),light(TIMING.clear,0,'scaleX(1)'),light(TIMING.settle,0,'scaleX(.3)')])),
]);
