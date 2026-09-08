import {actor,motion,pose,light} from './authoring';
import {circlePath} from './learning-geometry';

/* ── ORBIT / trace one relationship around a stable center ───
 *    0ms  tilted orbit, central body, and one satellite
 *  100ms  satellite departs along the ellipse itself
 *  440ms  it crosses the foreground of the central body
 *  510ms  a short orbital arc catches light behind the pass
 *  585ms  the central surface answers with a quieter glint
 *  760ms  the satellite is behind; foreground light is gone
 * 1320ms  one complete orbit returns to the same point
 * 1560ms  still; no recurring spin or moving coordinate frame
 * MOT-03/05/07/16: depth is occlusion, not a rotating logo.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,          // The orbit and its center are immediately visible.
 depart:100,      // Begin one finite traversal.
 approach:350,    // Light begins as the satellite nears the foreground.
 pass:440,        // Foreground crossing at the shortest projected radius.
 wake:510,        // The traversed front arc catches light.
 surface:585,     // The central body answers the close pass.
 lightOut:760,    // Clear the response before the rear transit completes.
 home:1320,       // Return precisely to the starting location.
 settle:1560,     // Hold still; never loop.
};
export const ORBIT_GEOMETRY={
 x:12,y:12,rx:9.2,ry:4.3,tilt:-25, // Fixed orbital plane in the icon.
 startAngle:20,coreRadius:4.5,satelliteRadius:1.3, // Static identity dimensions.
 samples:64, // Bound chord error below .03 viewBox units.
};
const n=(v:number)=>Number(v.toFixed(5));
export function orbitPoint(angle:number){const a=angle*Math.PI/180;return [n(12+9.2*Math.cos(a)),n(12+4.3*Math.sin(a))] as const;}
const start=orbitPoint(ORBIT_GEOMETRY.startAngle);
export const ORBIT_ART={
 rear:'M2.35 12A9.65 4.75 0 0 1 21.65 12H20.75A8.75 3.85 0 0 0 3.25 12Z',
 front:'M21.65 12A9.65 4.75 0 0 1 2.35 12H3.25A8.75 3.85 0 0 0 20.75 12Z',
 rearLine:'M2.8 12A9.2 4.3 0 0 1 21.2 12',frontLine:'M21.2 12A9.2 4.3 0 0 1 2.8 12',
 core:circlePath(12,12,4.5),satellite:circlePath(start[0],start[1],1.3),
 wake:`M${orbitPoint(40).join(' ')}A9.2 4.3 0 0 1 ${orbitPoint(105).join(' ')}`,
 surface:'M9.3 10.3a3.2 3.2 0 0 1 2.3-1.5',
};
const SATELLITE={origin:`${start[0]}px ${start[1]}px`,rest:'translate(0px,0px) scale(1)',frontScale:.08,rearScale:.12};
const WAKE={origin:'12px 12px',ink:.88,rest:'scale(1)'};
const SURFACE={origin:'10.45px 9.55px',ink:.72,small:'scale(.7)',full:'scale(1)'};
// Sample only at authoring time. The native/CSS clock animates transform;
// no JavaScript frame loop, path mutation, or rotating texture field.
const orbitFrames=[pose(TIMING.rest,SATELLITE.rest),pose(TIMING.depart,SATELLITE.rest),
 ...Array.from({length:ORBIT_GEOMETRY.samples},(_,i)=>{
  const t=(i+1)/ORBIT_GEOMETRY.samples,s=t*t*(3-2*t),angle=ORBIT_GEOMETRY.startAngle+360*s;
  const [x,y]=orbitPoint(angle),depth=Math.sin(angle*Math.PI/180)-Math.sin(ORBIT_GEOMETRY.startAngle*Math.PI/180);
  const scale=n(1+depth*(depth>0?SATELLITE.frontScale:SATELLITE.rearScale));
  return pose(TIMING.depart+(TIMING.home-TIMING.depart)*t,i===ORBIT_GEOMETRY.samples-1?SATELLITE.rest:`translate(${n(x-start[0])}px,${n(y-start[1])}px) scale(${scale})`,'linear');
 }),pose(TIMING.settle,SATELLITE.rest)];
export const orbit=motion(TIMING.settle,'Around the idea. Back in context.',['Depart','Pass','Return'],[
 ...['satellite-front','satellite-rear','satellite-occlusion'].map(part=>actor(part,SATELLITE.origin,orbitFrames)),
 actor('orbital-wake',WAKE.origin,[light(TIMING.rest,0,WAKE.rest),light(TIMING.approach,0,WAKE.rest),light(TIMING.wake,WAKE.ink,WAKE.rest),light(TIMING.lightOut,0,WAKE.rest),light(TIMING.settle,0,WAKE.rest)]),
 actor('orbital-surface',SURFACE.origin,[light(TIMING.rest,0,SURFACE.small),light(TIMING.pass,0,SURFACE.small),light(TIMING.surface,SURFACE.ink,SURFACE.full),light(TIMING.lightOut,0,SURFACE.full),light(TIMING.settle,0,SURFACE.small)]),
]);
