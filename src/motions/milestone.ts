import {actor,motion,pose,light} from './authoring';
/* ── MILESTONE / a capability marker that holds its ground ────
 *    0ms  planted mast, broad flag and two-tier foundation
 *  130ms  cloth takes up a small opposing fold
 *  360ms  root panel catches the pull; its entire mast edge stays fixed
 *  470ms  free panel follows through around the shared vertical seam
 *  560ms  free-edge light and two short air marks answer the unfurl
 *  760ms  cloth carries a smaller returning fold
 * 1030ms  energy settles back through the flag
 * 1420ms  exact rest; no milestone completion claim
 * MOT-01/03/05/07/16: deform cloth around attached edges, not the pole.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,        // Stable marker.
 gather:130,    // Cloth takes up an opposing fold.
 rootPull:360,  // Mast-side panel catches the force.
 freePull:470,  // Free panel follows with delayed travel.
 crest:560,     // Edge catch and local air witnesses.
 returnFold:760,// Smaller returning cloth fold.
 quiet:1030,    // Dissipate the fold.
 settle:1420,   // Exact starting shape.
};
export const MILESTONE_GEOMETRY={mastX:9.5,seamX:14,freeX:20};
export const MILESTONE_ART={
 mast:'M8.1 3.4a.7.7 0 0 1 1.4 0v16.4H8.1Z',
 base:'M5.1 19.5h7.4v1.3H5.1ZM3.6 21h10.4v1.3H3.6Z',
 root:'M9.5 5C11 4.4 12.4 4.8 14 5.5v7c-1.6-.7-3-1.1-4.5-.5Z',
 free:'M14 5.5c2.1.9 4.1.8 6-.5v7c-1.9 1.3-3.9 1.4-6 .5Z',
 rootLine:'M9.5 5C11 4.4 12.4 4.8 14 5.5M9.5 12c1.5-.6 2.9-.2 4.5.5',
 freeLine:'M14 5.5c2.1.9 4.1.8 6-.5v7c-1.9 1.3-3.9 1.4-6 .5',
 edge:'M19.35 6.4v4.8',upper:'M21.4 6.4q.8-.5 1-.9',lower:'M21.4 10.8q.7-.2 1.1-.6',
};
const ROOT={origin:'9.5px 8.5px',gather:'skewY(2deg) scaleX(.99)',pull:'skewY(-5deg) scaleX(1.035)',return:'skewY(1.5deg) scaleX(.995)'};
const FREE={origin:'14px 9px',gather:'skewY(-3deg) scaleX(.96)',pull:'skewY(9deg) scaleX(1.055)',return:'skewY(-3.2deg) scaleX(.985)'};
const REST='skewY(0deg) scaleX(1)';
export const milestone=motion(TIMING.settle,'The flag unfurls above a fixed marker.',['Anchor','Unfurl','Hold'],[
 actor('flag-root',ROOT.origin,[pose(TIMING.rest,REST),pose(TIMING.gather,ROOT.gather),pose(TIMING.rootPull,ROOT.pull),pose(TIMING.freePull,ROOT.pull),pose(TIMING.returnFold,ROOT.return),pose(TIMING.quiet,REST),pose(TIMING.settle,REST)]),
 actor('flag-free',FREE.origin,[pose(TIMING.rest,REST),pose(TIMING.gather,FREE.gather),pose(TIMING.rootPull,REST),pose(TIMING.freePull,FREE.pull),pose(TIMING.returnFold,FREE.return),pose(TIMING.quiet,REST),pose(TIMING.settle,REST)]),
 actor('flag-edge','19.35px 8.8px',[light(TIMING.rest,0,'scaleY(.45)'),light(TIMING.freePull,0,'scaleY(.45)'),light(TIMING.crest,.85,'scaleY(1)'),light(TIMING.returnFold,0,'scaleY(1)'),light(TIMING.settle,0,'scaleY(.45)')]),
 ...['flag-air-upper','flag-air-lower'].map(part=>actor(part,'20px 9px',[light(TIMING.rest,0,'translateX(-.2px)'),light(TIMING.freePull,0,'translateX(-.2px)'),light(TIMING.crest,.7,'translateX(.2px)'),light(TIMING.returnFold,0,'translateX(.7px)'),light(TIMING.settle,0,'translateX(-.2px)')])),
]);
