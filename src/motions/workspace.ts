import {actor,motion,pose,light} from './authoring';

/* ── WORKSPACE / make room for the code already here ─────────
 *    0ms  frame, file tree, divider, and three source lines
 *  100ms  the divider takes up a small amount of travel
 *  340ms  the editor opens; the file tree stays anchored
 *  420ms  first source line occupies the new space
 *  490ms  the indented line follows
 *  560ms  an editor-edge catch and caret answer the opening
 *  700ms  hold the organized working surface
 * 1120ms  close the extra space; all content stays intact
 * 1360ms  exact rest, no file edit or Run implied
 * MOT-01/03/05/08/16: opening space has a receiving surface.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,          // The complete Workspace is immediately legible.
 gather:100,      // Take up the divider's travel.
 open:340,        // Create space before the source responds.
 firstLine:420,   // The first line uses the expanded editor.
 secondLine:490,  // The indented line follows without reordering.
 catch:560,       // The editor edge and caret answer the opening.
 hold:700,        // Keep the arrangement readable.
 lightOut:920,    // Clear the response before the frame closes.
 home:1120,       // Restore the original pane proportions.
 settle:1360,    // Exact, quiet rest.
};
export const WORKSPACE_ART={
 frame:'M4 3.5h16a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2ZM4 5a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h16a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5Z',
 frameLine:'M4 4.25h16a1.25 1.25 0 0 1 1.25 1.25v13A1.25 1.25 0 0 1 20 19.75H4a1.25 1.25 0 0 1-1.25-1.25v-13A1.25 1.25 0 0 1 4 4.25Z',
 toolbar:'M3.5 7.3h17v1.2h-17Z',divider:'M8.95 8.5h1.1V19h-1.1Z',
 tree:'M5.1 10.3v6h1.7M5.1 12.1h1.7',
 first:'M12.2 10.7h6.5v1.15h-6.5Z',second:'M13.6 13.55h5.1v1.15h-5.1Z',third:'M12.2 16.4h3.8v1.15h-3.8Z',
 edge:'M20 10.1v7.8',caret:'M17.75 16.1v1.75',
};
const DIVIDER={origin:'9.5px 8.5px',rest:'translateX(0px)',gather:'translateX(.2px)',open:'translateX(-1.2px)'};
const SOURCE={origin:'12.2px 14px',rest:'translateX(0px)',open:'translateX(-1px)'};
const LINES=[
 {part:'source-first',origin:'12.2px 11.275px',peak:TIMING.firstLine,open:'scaleX(1.15)'},
 {part:'source-second',origin:'13.6px 14.125px',peak:TIMING.secondLine,open:'scaleX(1.12)'},
];
const EDGE={origin:'20px 14px',small:'scaleY(.2)',full:'scaleY(1)',ink:.84};
const CARET={origin:'17.75px 17px',small:'scaleY(.3)',full:'scaleY(1)',ink:.92};
const EASE={gather:'cubic-bezier(.4,0,.6,1)',open:'cubic-bezier(.2,.8,.3,1)',close:'cubic-bezier(.4,0,.25,1)'};
export const workspace=motion(TIMING.settle,'The panel opens and its contents move into place.',['Open','Arrange','Return'],[
 actor('divider',DIVIDER.origin,[pose(TIMING.rest,DIVIDER.rest,EASE.gather),pose(TIMING.gather,DIVIDER.gather,EASE.open),pose(TIMING.open,DIVIDER.open),pose(TIMING.hold,DIVIDER.open,EASE.close),pose(TIMING.home,DIVIDER.rest),pose(TIMING.settle,DIVIDER.rest)]),
 actor('source',SOURCE.origin,[pose(TIMING.rest,SOURCE.rest),pose(TIMING.gather,SOURCE.rest,EASE.open),pose(TIMING.open,SOURCE.open),pose(TIMING.hold,SOURCE.open,EASE.close),pose(TIMING.home,SOURCE.rest),pose(TIMING.settle,SOURCE.rest)]),
 ...LINES.map(l=>actor(l.part,l.origin,[pose(TIMING.rest,'scaleX(1)'),pose(TIMING.open,'scaleX(1)',EASE.open),pose(l.peak,l.open),pose(TIMING.hold,l.open,EASE.close),pose(TIMING.home,'scaleX(1)'),pose(TIMING.settle,'scaleX(1)')])),
 actor('editor-edge',EDGE.origin,[light(TIMING.rest,0,EDGE.small),light(TIMING.secondLine,0,EDGE.small),light(TIMING.catch,EDGE.ink,EDGE.full),light(TIMING.lightOut,0,EDGE.full),light(TIMING.settle,0,EDGE.small)]),
 actor('editor-caret',CARET.origin,[light(TIMING.rest,0,CARET.small),light(TIMING.secondLine,0,CARET.small),light(TIMING.catch,CARET.ink,CARET.full),light(TIMING.lightOut,0,CARET.full),light(TIMING.settle,0,CARET.small)]),
]);
