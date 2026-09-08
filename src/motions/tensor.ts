import {actor,motion,pose,light} from './authoring';

/* ── TENSOR / inspect one rigid slice of an indexed volume ───
 *    0ms  three faces establish a 2 × 2 grid in depth
 *  120ms  one solid 1 × 2 × 2 slice takes up a little travel
 *  390ms  its three connected faces pull out along one axis
 *  455ms  the trailing cut edge catches light
 *  535ms  a short dimension witness opens across the new gap
 *  640ms  hold the slice with its cell order unchanged
 * 1100ms  rejoin the volume; occlusion remains registered
 * 1400ms  exact rest, no cells shuffled or values changed
 * MOT-01/03/05/07/08/16: extract the object; never scatter its cells.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,         // The full indexed volume is visible.
 gather:120,     // Take up travel without disturbing the cell grid.
 edgeStart:300,  // Light begins only as the cut face becomes exposed.
 extract:390,    // The solid slice reaches its inspection position.
 edgePeak:455,   // The newly exposed edge catches the strongest light.
 gapPeak:535,    // A finer witness makes the separation readable.
 hold:640,       // Give the extracted cells time to be inspected.
 lightOut:880,   // Accents disappear during the return.
 home:1100,      // Three faces and their occluder rejoin the volume.
 settle:1400,    // Finish in exact, quiet rest.
};
export const TENSOR_ART={
 // The stationary half and extracted half are both solid cuboids.
 top:'M12 2.8 16.5 5.05 7.5 9.55 3 7.3Z',
 left:'M3 7.3 7.5 9.55V18.95L3 16.7Z',
 cut:'M16.5 5.05 7.5 9.55V18.95L16.5 14.45Z',
 sliceTop:'M16.5 5.05 21 7.3 12 11.8 7.5 9.55Z',
 sliceLeft:'M7.5 9.55 12 11.8V21.2L7.5 18.95Z',
 face:'M12 11.8 21 7.3V16.7L12 21.2Z',
 silhouette:'M16.5 5.05 21 7.3V16.7L12 21.2 7.5 18.95V9.55Z',
 grid:'M16.5 9.55V18.95M12 16.5 21 12',
 topGrid:'M7.5 5.05 12 7.3',leftGrid:'M3 12 7.5 14.25',
 cutGrid:'M12 7.3V16.7M7.5 14.25 16.5 9.75',
 sliceTopGrid:'M12 7.3 16.5 9.55M16.5 5.05 7.5 9.55',
 sliceLeftGrid:'M7.5 14.25 12 16.5M7.5 9.55V18.95',
 edge:'M7.8 10.6v7.2',gap:'M7.5 19.7l1.8.9M7.5 19.35v.7M9.3 20.25v.7',
};
export const TENSOR_SLICE={origin:'12px 16.5px',rest:'translate(0px,0px)',gather:'translate(-.12px,-.06px)',extract:'translate(1.8px,.9px)'};
const EDGE={origin:'7.8px 14.2px',ink:.92};
const GAP={origin:'7.5px 19.7px',ink:.8};
const EASE={gather:'cubic-bezier(.4,0,.65,1)',extract:'cubic-bezier(.2,.8,.3,1)',return:'cubic-bezier(.4,0,.25,1)'};
const frames=[pose(TIMING.rest,TENSOR_SLICE.rest,EASE.gather),pose(TIMING.gather,TENSOR_SLICE.gather,EASE.extract),pose(TIMING.extract,TENSOR_SLICE.extract),pose(TIMING.hold,TENSOR_SLICE.extract,EASE.return),pose(TIMING.home,TENSOR_SLICE.rest),pose(TIMING.settle,TENSOR_SLICE.rest)];
export const tensor=motion(TIMING.settle,'One slice. Its cell order stays intact.',['Select','Extract','Rejoin'],[
 actor('slice',TENSOR_SLICE.origin,frames),actor('slice-occlusion',TENSOR_SLICE.origin,frames),
 actor('slice-edge',EDGE.origin,[light(TIMING.rest,0,'scaleY(.35)'),light(TIMING.edgeStart,0,'scaleY(.35)'),light(TIMING.edgePeak,EDGE.ink,'scaleY(1)'),light(TIMING.lightOut,0,'scaleY(1)'),light(TIMING.settle,0,'scaleY(.35)')]),
 actor('slice-gap',GAP.origin,[light(TIMING.rest,0,'scale(.25)'),light(TIMING.extract,0,'scale(.25)'),light(TIMING.gapPeak,GAP.ink,'scale(1)'),light(TIMING.lightOut,0,'scale(1)'),light(TIMING.settle,0,'scale(.25)')]),
]);
