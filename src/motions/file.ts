import {actor, motion, pose, light} from './authoring';

/* ── FILE / paper curls, its surface stays continuous ───────
 *    0ms  folded corner rests above a quieter underside
 *  110ms  a little tension gathers at the diagonal crease
 *  365ms  the face rolls toward its hinge, exposing paper beneath
 *  420ms  the curled lip catches light; the crease answers
 *  475ms  a short curl of air escapes beyond the free edge
 *  575ms  the corner starts laying down, before the air fades
 *  895ms  gentle material resistance, then exact rest at 1160ms
 * MOT-01/03/05/07/08/12/16: no hole, no detached flying triangle.
 * ────────────────────────────────────────────────────────── */
const TIMING = {
  rest:0, gather:110, edgeStart:205, glintStart:265, peel:365,
  curlStart:345, edgeCrest:405, glint:435, curl:475, read:575,
  lightOut:770, layDown:895, settle:1160,
};
export const FILE_ART = {
  page:'M6 2h7.5v6.5H20V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z',
  fold:'M14 2v5.35a.65.65 0 0 0 .65.65H20Z',
  underside:'M14 2v6h6Z',
  lip:'M14.16 5.35v1.8a.69.69 0 0 0 .69.69h1.8',
  crease:'M14 2l6 6',
  glint:'M15 3l4 4',
  curl:'M21.2 6.35q1.1-1.05.25-2.15',
  lines:'M8 13h8M8 16h5',
  cutouts:'M8 12.7h8v.6H8ZM8 15.7h5v.6H8Z',
  separation:.16,
};
export const FILE_HINGE = {x:17,y:5,angle:45};
const FOLD = {gather:1.025, peel:.3, read:.39, layDown:1.018};
const EDGE = {origin:'14.5px 7.5px', ink:.86};
const GLINT = {origin:'17px 5px', ink:.65};
const CURL = {origin:'21px 6px', ink:.76, start:'translate(-.15px,.25px) scale(.55)', peak:'translate(.1px,-.1px) scale(1)', end:'translate(.55px,-.55px) scale(.9)'};
const EASE = {gather:'cubic-bezier(.4,0,.7,1)', peel:'cubic-bezier(.22,.82,.3,1)',
  linger:'cubic-bezier(.3,0,.65,.6)', return:'cubic-bezier(.32,.3,.22,1)', settle:'cubic-bezier(.2,0,.25,1)'};
const folded=(scale:number)=>`rotate(${FILE_HINGE.angle}deg) scaleY(${scale}) rotate(${-FILE_HINGE.angle}deg)`;
const fold=actor('fold',`${FILE_HINGE.x}px ${FILE_HINGE.y}px`,[
  pose(TIMING.rest,folded(1),EASE.gather),pose(TIMING.gather,folded(FOLD.gather),EASE.peel),
  pose(TIMING.peel,folded(FOLD.peel),EASE.linger),pose(TIMING.read,folded(FOLD.read),EASE.return),
  pose(TIMING.layDown,folded(FOLD.layDown),EASE.settle),pose(TIMING.settle,folded(1))]);
export const file=motion(TIMING.settle,'A held crease. Light follows the curl.',['Gather','Curl','Lay flat'],[
  fold,{...fold,part:'fold-occlusion'},
  actor('fold-edge',EDGE.origin,[light(TIMING.rest,0),light(TIMING.edgeStart,0),light(TIMING.edgeCrest,EDGE.ink),
    light(TIMING.lightOut,0),light(TIMING.settle,0)]),
  actor('crease-light',GLINT.origin,[light(TIMING.rest,0,'scale(.5)'),light(TIMING.glintStart,0,'scale(.5)'),
    light(TIMING.glint,GLINT.ink,'scale(1)'),light(TIMING.lightOut,0,'scale(1)'),light(TIMING.settle,0,'scale(.5)')]),
  actor('curl-air',CURL.origin,[light(TIMING.rest,0,CURL.start),light(TIMING.curlStart,0,CURL.start),
    light(TIMING.curl,CURL.ink,CURL.peak),light(TIMING.lightOut,0,CURL.end),light(TIMING.settle,0,CURL.start)]),
]);
