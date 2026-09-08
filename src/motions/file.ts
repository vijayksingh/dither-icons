import {actor, motion, pose, light} from './authoring';

/* ── FILE / peel along a real crease ─────────────────────────
 *    0ms  page rests; the diagonal crease is anchored at both ends
 *  130ms  folded corner gathers a little tension
 *  400ms  triangle peels toward edge-on about its diagonal hinge
 *  460ms  crease catches light; a small curl of air follows the edge
 *  620ms  pause long enough to read the folded surface
 *  940ms  paper lays down with a tiny elastic return
 * 1160ms  exact rest, with the page never floating
 * MOT-01/03/05/06/08/12/16: the crease, not the whole page, acts.
 * ────────────────────────────────────────────────────────── */
const TIMING = {
  rest:0,       // closed corner
  gather:130,   // fold takes up tension
  glintStart:285,// reflected edge starts to brighten
  peel:400,     // fold reaches its thinnest projection
  curlStart:340,// air follows the peeling edge
  glint:445,    // hinge highlight crests
  curl:490,     // exterior response follows the hinge
  read:620,     // quiet open pose
  lightOut:800,// clear accents before seating
  layDown:940,  // paper takes a small final bend
  settle:1160,  // exact flat fold
};
export const FILE_ART = {
  page:'M6 2h7.5v6.5H20V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z',
  fold:'M14 2v6h6Z',
  crease:'M14 2l6 6',
  glint:'M14.8 2.8l4.4 4.4',
  curl:'M21.2 6.5q1.2-1.2.1-2.5',
  lines:'M8 13h8M8 16h5',
  cutouts:'M8 12.7h8v.6H8ZM8 15.7h5v.6H8Z',
};
export const FILE_HINGE = {x:17,y:5,angle:45};
const FOLD = {gather:1.04, peel:.18, read:.24, layDown:1.035};
const GLINT = {origin:'17px 5px', ink:.85};
const CURL = {origin:'21px 6px', ink:.72, start:'translate(-.3px,.4px) scale(.45)', peak:'translate(0px,0px) scale(1)', end:'translate(.45px,-.6px) scale(1.12)'};
const EASE = {gather:'cubic-bezier(.4,0,.7,1)', peel:'cubic-bezier(.2,1,.35,1)',
  linger:'cubic-bezier(.25,0,.5,1)', return:'cubic-bezier(.45,0,.25,1)', settle:'cubic-bezier(.2,0,.2,1)'};
const folded=(scale:number)=>`rotate(${FILE_HINGE.angle}deg) scaleY(${scale}) rotate(${-FILE_HINGE.angle}deg)`;
export const file=motion(TIMING.settle,'A held crease. A little curl of paper.',['Gather','Peel','Lay flat'],[
  actor('fold',`${FILE_HINGE.x}px ${FILE_HINGE.y}px`,[
    pose(TIMING.rest,folded(1),EASE.gather),pose(TIMING.gather,folded(FOLD.gather),EASE.peel),
    pose(TIMING.peel,folded(FOLD.peel),EASE.linger),pose(TIMING.read,folded(FOLD.read),EASE.return),
    pose(TIMING.layDown,folded(FOLD.layDown),EASE.settle),pose(TIMING.settle,folded(1))]),
  actor('crease-light',GLINT.origin,[light(TIMING.rest,0,'scale(.6)'),light(TIMING.glintStart,0,'scale(.6)'),
    light(TIMING.glint,GLINT.ink,'scale(1)'),light(TIMING.lightOut,0,'scale(1)'),light(TIMING.settle,0,'scale(.6)')]),
  actor('curl-air',CURL.origin,[light(TIMING.rest,0,CURL.start),light(TIMING.curlStart,0,CURL.start),
    light(TIMING.curl,CURL.ink,CURL.peak),light(TIMING.lightOut,0,CURL.end),light(TIMING.settle,0,CURL.start)]),
]);
