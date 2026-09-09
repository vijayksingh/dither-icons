import {actor,motion,pose,light} from './authoring';
/* ── TOKENIZE / read the boundaries, retain the sequence ─────
 *    0ms  three unequal text pieces under one source rule
 *  140ms  a short reading light crosses the source
 *  280ms  both actual piece boundaries answer
 *  470ms  outer pieces separate; the middle stays anchored
 *  560ms  their ordinal witnesses register beneath them
 *  860ms  witnesses clear before the pieces close
 * 1200ms  original spacing and marks restored
 * 1420ms  exact rest
 * MOT-01/03/05/08/16: separation reveals existing boundaries.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,       // Complete source sequence.
 read:140,     // Read before splitting.
 boundary:280, // Boundaries become legible first.
 separate:470,// Tokens reach independent spacing.
 register:560,// Ordinal witnesses follow separation.
 clear:860,    // Clear interpretation before recovery.
 home:1200,    // Restore original spacing.
 settle:1420,  // Exact rest.
};
export const TOKEN_PIECES=[{x:3.5,w:5.6,offset:-.8},{x:9.7,w:4.2,offset:0},{x:14.5,w:6,offset:.8}] as const;
export const TOKEN_ART={
 tile:(x:number,w:number)=>`M${x+1} 8.1h${w-2}a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h${2-w}a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z`,
 outline:(x:number,w:number)=>`M${x+1} 8.75h${w-2}a.35.35 0 0 1 .35.35v6a.35.35 0 0 1-.35.35h${2-w}a.35.35 0 0 1-.35-.35v-6a.35.35 0 0 1 .35-.35Z`,
 content:(x:number,w:number)=>`M${x+1.4} 11.2h${w-2.8}M${x+1.4} 13.3h${(w-2.8)*.65}`,
 source:'M3.8 5.4H20.2',boundaries:[9.4,14.2] as const,
};
const PIECE={originY:12.1};
const BOUNDARY={rest:'scaleY(.25)',open:'scaleY(1)',ink:.75};
export const tokenize=motion(TIMING.settle,'Find the boundaries. Keep the order.',['Read','Split','Index'],[
 actor('token-reading','3.8px 5.4px',[light(TIMING.rest,0,'scaleX(.1)'),light(TIMING.read,.75,'scaleX(1)'),light(TIMING.boundary,0,'scaleX(1)'),light(TIMING.settle,0,'scaleX(.1)')]),
 ...TOKEN_PIECES.flatMap((p,i)=>[
  actor(`token-piece-${i}`,`${p.x+p.w/2}px ${PIECE.originY}px`,[pose(TIMING.rest,'translateX(0px)'),pose(TIMING.boundary,'translateX(0px)'),pose(TIMING.separate,`translateX(${p.offset}px)`),pose(TIMING.clear,`translateX(${p.offset}px)`),pose(TIMING.home,'translateX(0px)'),pose(TIMING.settle,'translateX(0px)')]),
  actor(`token-index-${i}`,`${p.x+p.w/2}px 18.8px`,[light(TIMING.rest,0,'translateY(-.35px)'),light(TIMING.separate,0,'translateY(-.35px)'),light(TIMING.register,.8,'translateY(0px)'),light(TIMING.clear,0,'translateY(.2px)'),light(TIMING.settle,0,'translateY(-.35px)')]),
 ]),
 ...TOKEN_ART.boundaries.map((x,i)=>actor(`token-boundary-${i}`,`${x}px 5.4px`,[light(TIMING.rest,0,BOUNDARY.rest),light(TIMING.read,0,BOUNDARY.rest),light(TIMING.boundary,BOUNDARY.ink,BOUNDARY.open),light(TIMING.separate,.3,BOUNDARY.open),light(TIMING.register,0,BOUNDARY.open),light(TIMING.settle,0,BOUNDARY.rest)])),
]);
