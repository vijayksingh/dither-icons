import {actor,motion,pose,light} from './authoring';

/* ── VOLUME / pressure leaves a source and travels outward ───
 *    0ms  planted neck, attached cone, two readable wave arcs
 *  115ms  cone gathers at its fixed neck
 *  250ms  the source releases; its diaphragm catches light
 *  375ms  the near wave receives the impulse
 *  505ms  the farther wave responds
 *  635ms  a fine outer wavefront expands into surrounding space
 *  970ms  transient front has dissipated
 * 1280ms  exact source and two-wave rest; no actual level change
 * MOT-01/03/05/07/08/16: source first, distance determines response.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,        // persistent speaker and two arcs
 gather:115,    // pressure gathers
 sourceLightStart:150,// diaphragm starts catching light
 nearStart:200, // near wave waits for source
 source:250,    // main pressure release
 sourceLight:270,// reflected source response
 farStart:320,  // far wave waits for near
 near:375,      // near crest
 sourceRecoil:420,// small source recovery
 farLightStart:435,// far edge starts responding
 frontStart:485,// expanding exterior wavefront
 sourceLightOut:495,// clear source light
 far:505,       // far crest
 farLight:535,  // attached outer arc highlight
 nearRelax:565, // near wave relaxes while front continues
 front:635,     // final propagation climax
 sourceRest:650,// source now still
 farRelax:705,  // outer persistent arc relaxes
 farLightOut:840,// attached light clears
 nearRest:850,  // near arc neutral
 frontOut:970,  // exterior wavefront gone
 farRest:1040,  // far arc neutral
 settle:1280,   // exact endpoint
};
export const VOLUME_GEOMETRY={x:11,y:12,nearRadius:5.3,farRadius:8.35,weight:1.3,angle:40,neckX:7};
const number=(n:number)=>Number(n.toFixed(4));
const point=(r:number,a:number)=>`${number(VOLUME_GEOMETRY.x+r*Math.cos(a*Math.PI/180))} ${number(VOLUME_GEOMETRY.y+r*Math.sin(a*Math.PI/180))}`;
const arc=(r:number,a:number)=>`M${point(r,-a)}A${r} ${r} 0 0 1 ${point(r,a)}`;
const band=(r:number)=>{
 const inner=number(r-VOLUME_GEOMETRY.weight),cap=VOLUME_GEOMETRY.weight/2,a=VOLUME_GEOMETRY.angle;
 return `M${point(r,-a)}A${r} ${r} 0 0 1 ${point(r,a)}A${cap} ${cap} 0 0 1 ${point(inner,a)}A${inner} ${inner} 0 0 0 ${point(inner,-a)}A${cap} ${cap} 0 0 1 ${point(r,-a)}Z`;
};
export const VOLUME_ART={
 neck:'M3.65 9h3.4v6h-3.4a.65.65 0 0 1-.65-.65v-4.7A.65.65 0 0 1 3.65 9Z',
 cone:'M7 9l5-4.25q.4-.35.4.2v14.1q0 .55-.4.2L7 15Z',
 diaphragm:'M12.05 7.3v9.4',
 near:band(VOLUME_GEOMETRY.nearRadius),far:band(VOLUME_GEOMETRY.farRadius),
 nearOutline:arc(4.65,VOLUME_GEOMETRY.angle),farOutline:arc(7.7,VOLUME_GEOMETRY.angle),
 farLight:arc(7.7,26),front:arc(9.75,26),
};
const CONE={origin:'7px 12px',gather:.955,source:1.04,recoil:.992};
const NEAR={origin:'11px 12px',peak:'translateX(.22px) scale(1.07)',relax:'translateX(.14px) scale(1.025)'};
const FAR={origin:NEAR.origin,peak:'translateX(.3px) scale(1.05)',relax:'translateX(.16px) scale(1.015)'};
const DIAPHRAGM={origin:'12.05px 12px',ink:.84};
const LIGHT={origin:NEAR.origin,ink:.86};
const FRONT={origin:NEAR.origin,ink:.88,start:'scale(.82)',peak:'scale(1)',end:'scale(1.12)'};
const EASE={gather:'cubic-bezier(.4,0,.7,1)',release:'cubic-bezier(.18,.8,.32,1)',relax:'cubic-bezier(.3,0,.4,1)',settle:'cubic-bezier(.22,0,.3,1)'};
const REST='translateX(0px) scale(1)';
export const volume=motion(TIMING.settle,'A pulse at the source. A widening echo.',['Source','Propagate','Dissipate'],[
 actor('cone',CONE.origin,[pose(TIMING.rest,'scaleX(1)',EASE.gather),pose(TIMING.gather,`scaleX(${CONE.gather})`,EASE.release),
 pose(TIMING.source,`scaleX(${CONE.source})`,EASE.relax),pose(TIMING.sourceRecoil,`scaleX(${CONE.recoil})`,EASE.settle),pose(TIMING.sourceRest,'scaleX(1)'),pose(TIMING.settle,'scaleX(1)')]),
 actor('wave-near',NEAR.origin,[pose(TIMING.rest,REST),pose(TIMING.nearStart,REST,EASE.release),pose(TIMING.near,NEAR.peak,EASE.relax),
 pose(TIMING.nearRelax,NEAR.relax,EASE.settle),pose(TIMING.nearRest,REST),pose(TIMING.settle,REST)]),
 actor('wave-far',FAR.origin,[pose(TIMING.rest,REST),pose(TIMING.farStart,REST,EASE.release),pose(TIMING.far,FAR.peak,EASE.relax),
 pose(TIMING.farRelax,FAR.relax,EASE.settle),pose(TIMING.farRest,REST),pose(TIMING.settle,REST)]),
 actor('diaphragm-light',DIAPHRAGM.origin,[light(TIMING.rest,0,'scaleY(.35)'),light(TIMING.sourceLightStart,0,'scaleY(.35)'),
 light(TIMING.sourceLight,DIAPHRAGM.ink,'scaleY(1)'),light(TIMING.sourceLightOut,0,'scaleY(1)'),light(TIMING.settle,0,'scaleY(.35)')]),
 actor('wave-light',LIGHT.origin,[light(TIMING.rest,0,'scaleY(.45)'),light(TIMING.farLightStart,0,'scaleY(.45)'),
 light(TIMING.farLight,LIGHT.ink,'scaleY(1)'),light(TIMING.farLightOut,0,'scaleY(1)'),light(TIMING.settle,0,'scaleY(.45)')]),
 actor('sound-front',FRONT.origin,[light(TIMING.rest,0,FRONT.start),light(TIMING.frontStart,0,FRONT.start),
 light(TIMING.front,FRONT.ink,FRONT.peak),light(TIMING.frontOut,0,FRONT.end),light(TIMING.settle,0,FRONT.start)]),
]);
