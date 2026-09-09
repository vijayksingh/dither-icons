import {actor,motion,pose,light} from './authoring';
/* ── TEST SUITE / independent samples, one stable fixture ─────
 *    0ms  three contained specimens above a common receiving bed
 *  100ms  first specimen lifts slightly (140ms case stagger)
 *  370ms  first specimen meets the actual chamber floor
 *  510ms  second contact; the third case remains independent
 *  650ms  last contact, with its own seat response
 *  780ms  all three are seated for comparison
 *  860ms  fixture light joins the individual observations
 * 1010ms  response light clears; no pass/fail state changes
 * 1260ms  specimens return to their starting positions
 * 1460ms  exact rest
 * MOT-01/03/05/08/14/16: a suite observes cases, not a fake pass.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,          // Three complete tubes and specimens.
 prepare:100,     // First preparation; other cases follow by the stagger.
 contact:370,     // First specimen reaches the chamber floor.
 rebound:435,     // A restrained contact rebound.
 seat:500,        // Settle the first specimen; last seats at 780ms.
 caseStagger:140, // Separation between independent cases.
 collected:860,   // The fixture responds after every case is seated.
 clear:1010,      // All local response light clears.
 returnStart:1050,// Restore the preview only after observation.
 home:1260,       // All specimens return without disappearing.
 settle:1460,    // Exact neutral state.
};
export const SUITE_GEOMETRY={floor:16.6,specimenRadius:.7,seat:15.9};
export const SUITE_CASES=[{x:5.5,top:5.1,startY:10.4},{x:12,top:3.1,startY:9.1},{x:18.5,top:4.1,startY:10}];
export const SUITE_ART={
 glass:(x:number,top:number)=>`M${x-1.8} ${top}h3.6v${15.7-top}a1.8 1.8 0 0 1-3.6 0ZM${x-.9} ${top+.9}v${15.7-top-.9}a.9.9 0 0 0 1.8 0V${top+.9}Z`,
 chamber:(x:number,top:number)=>`M${x-.9} ${top+.9}h1.8v${15.7-top-.9}a.9.9 0 0 1-1.8 0Z`,
 centerline:(x:number,top:number)=>`M${x-1.35} ${top+.45}v${15.7-top-.45}a1.35 1.35 0 0 0 2.7 0V${top+.45}Z`,
 rack:'M2.5 13.8h19M3.1 13.8v6.7h17.8v-6.7',datum:'M4.6 19h14.8',
};
const SPECIMEN={lift:-.5,rebound:-.32,ease:'cubic-bezier(.55,0,.8,.5)'};
const RESPONSE={ink:.9,small:'scale(.45,1)',full:'scale(1,1)'};
export const testSuite=motion(TIMING.settle,'Every case gets its own observation.',['Sample','Seat','Compare'],[
 ...SUITE_CASES.flatMap((c,i)=>{
  const offset=i*TIMING.caseStagger,drop=SUITE_GEOMETRY.seat-c.startY;
  return [
   actor(`case-${i}`,`${c.x}px ${c.startY}px`,[pose(TIMING.rest,'translateY(0px)'),...(offset?[pose(offset,'translateY(0px)')]:[]),pose(TIMING.prepare+offset,`translateY(${SPECIMEN.lift}px)`,SPECIMEN.ease),pose(TIMING.contact+offset,`translateY(${drop}px)`),pose(TIMING.rebound+offset,`translateY(${drop+SPECIMEN.rebound}px)`),pose(TIMING.seat+offset,`translateY(${drop}px)`),pose(TIMING.returnStart,`translateY(${drop}px)`),pose(TIMING.home,'translateY(0px)'),pose(TIMING.settle,'translateY(0px)')]),
   actor(`seat-light-${i}`,`${c.x}px 16.7px`,[light(TIMING.rest,0,RESPONSE.small),light(TIMING.contact+offset,0,RESPONSE.small),light(TIMING.rebound+offset,RESPONSE.ink,RESPONSE.full),light(TIMING.clear,0,RESPONSE.full),light(TIMING.settle,0,RESPONSE.small)]),
  ];
 }),
 actor('suite-datum','12px 19px',[light(TIMING.rest,0,'scaleX(.2)'),light(TIMING.seat+2*TIMING.caseStagger,0,'scaleX(.2)'),light(TIMING.collected,.7,'scaleX(1)'),light(TIMING.clear,0,'scaleX(1)'),light(TIMING.settle,0,'scaleX(.2)')]),
]);
