import {actor,motion,pose,light} from './authoring';
import {arcBand,arcPath,ringPath,polar} from './learning-geometry';

/* ── GAUGE / take a reading against a fixed calibrated dial ──
 *    0ms  needle, pivot, and calibration marks establish a dial
 *  140ms  needle draws back within the calibrated arc
 *  400ms  it reaches just beyond its reference reading
 *  475ms  needle seats; the aligned tick catches light
 *  545ms  a short exterior arc answers that registration
 *  650ms  one small residual movement dissipates
 *  880ms  needle holds exactly at its initial reading
 * 1280ms  rest; this preview does not increase Progress
 * MOT-01/03/05/08/16: only the needle moves, not the scale.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,          // Static needle points at the reference tick.
 gather:140,      // Take up the mechanism's travel.
 overshoot:400,   // Approach the reference with restrained momentum.
 seat:475,        // Register on the reference tick.
 echo:545,        // The dial answers after registration.
 residual:650,    // A small remaining deflection settles.
 lightOut:850,    // Clear the tick and exterior catch.
 home:880,        // Return the needle precisely to its reference.
 settle:1280,     // Hold the reading; no metric changes.
};
export const GAUGE_GEOMETRY={x:12,y:14.5,radius:9.2,angle:300,needleLength:6.9,hubRadius:1.7};
const p=(r:number,a:number)=>polar(GAUGE_GEOMETRY.x,GAUGE_GEOMETRY.y,r,a).join(' ');
export const GAUGE_ART={
 rim:arcBand(12,14.5,9.2,1.65,165,375),rimLine:arcPath(12,14.5,9.2,165,375),
 needle:`M${p(.7,210)}L${p(6.9,300)}L${p(.7,30)}Z`,
 hub:ringPath(12,14.5,1.7,1.05),
 ticks:[210,240,270,300,330].map(a=>`M${p(6.9,a)}L${p(7.8,a)}`),
 registered:`M${p(6.9,300)}L${p(7.9,300)}`,echo:arcPath(12,14.5,10.65,291,309),
 baseline:'M8 20.5h8',
};
const NEEDLE={origin:'12px 14.5px',rest:'rotate(0deg)',gather:'rotate(-24deg)',over:'rotate(5deg)',residual:'rotate(.9deg)'};
const TICK={origin:p(7.4,300).split(' ').map(v=>v+'px').join(' '),small:'scale(.55)',full:'scale(1)',ink:1};
const ECHO={origin:NEEDLE.origin,small:'scale(.96)',full:'scale(1)',out:'scale(1.018)',ink:.84};
const EASE={gather:'cubic-bezier(.4,0,.6,1)',read:'cubic-bezier(.2,.75,.25,1)',settle:'cubic-bezier(.25,0,.3,1)'};
export const gauge=motion(TIMING.settle,'The needle moves to a tick and holds.',['Calibrate','Read','Hold'],[
 actor('needle',NEEDLE.origin,[pose(TIMING.rest,NEEDLE.rest,EASE.gather),pose(TIMING.gather,NEEDLE.gather,EASE.read),pose(TIMING.overshoot,NEEDLE.over,EASE.settle),pose(TIMING.seat,NEEDLE.rest,EASE.settle),pose(TIMING.residual,NEEDLE.residual,EASE.settle),pose(TIMING.home,NEEDLE.rest),pose(TIMING.settle,NEEDLE.rest)]),
 actor('reading-tick',TICK.origin,[light(TIMING.rest,0,TICK.small),light(TIMING.overshoot,0,TICK.small),light(TIMING.seat,TICK.ink,TICK.full),light(TIMING.lightOut,0,TICK.full),light(TIMING.settle,0,TICK.small)]),
 actor('reading-echo',ECHO.origin,[light(TIMING.rest,0,ECHO.small),light(TIMING.seat,0,ECHO.small),light(TIMING.echo,ECHO.ink,ECHO.full),light(TIMING.lightOut,0,ECHO.out),light(TIMING.settle,0,ECHO.small)]),
]);
