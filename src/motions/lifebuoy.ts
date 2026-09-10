import {actor,motion,pose,light} from './authoring';
import {arcBand,arcPath,ringPath} from './learning-geometry';

/* ── LIFEBUOY / yield under weight, then support it ──────────
 *    0ms  four wrapped bands and an open center identify a buoy
 *  150ms  a small lift takes up the load
 *  410ms  the ring meets the fixed waterline
 *  495ms  buoyancy resists; a contact arc catches on the ring
 *  580ms  a pair of ripples travels outward from contact
 *  760ms  the supported ring rises with a small residual tilt
 * 1120ms  the body and all four wraps recover together
 * 1460ms  quiet rest; no support request has been sent
 * MOT-01/03/05/08/16: ripples begin at contact, not on hover.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,          // The ring and its four wraps are intact.
 gather:150,      // Lift slightly before accepting the load.
 contact:410,     // The ring reaches its stable receiving waterline.
 resist:495,      // Buoyancy arrests the downward motion.
 ripple:580,      // Displaced water responds after contact.
 rise:760,        // Recover with a restrained residual tilt.
 lightOut:960,    // Clear the contact light and exterior ripples.
 home:1120,       // Return every wrap and the aperture together.
 settle:1460,     // Exact stillness; this is an invitation to help.
};
export const LIFEBUOY_GEOMETRY={x:12,y:10.8,radius:7.7,innerRadius:4.65,contactY:19.6};
export const LIFEBUOY_ART={
 body:ringPath(12,10.8,7.7,3.05),
 bands:[45,135,225,315].map(a=>arcBand(12,10.8,6.175,3.05,a-12,a+12)),
 seams:[45,135,225,315].map(a=>{
  const r=a*Math.PI/180;return `M${12+5.35*Math.cos(r)} ${10.8+5.35*Math.sin(r)}L${12+7*Math.cos(r)} ${10.8+7*Math.sin(r)}`;
 }).join(''),
 contact:arcPath(12,10.8,7.35,66,114),
 water:'M6.5 19.6h11',
 left:'M6.4 20.1Q4.8 20.55 3.2 20.1',right:'M17.6 20.1q1.6.45 3.2 0',
 echoLeft:'M7.2 22q-1.2.3-2.4 0',echoRight:'M16.8 22q1.2.3 2.4 0',
};
const BODY={origin:'12px 10.8px',rest:'translateY(0px) rotate(0deg)',gather:'translateY(-.35px) rotate(-3deg)',contact:'translateY(1.1px) rotate(2deg)',resist:'translateY(1.1px) rotate(0deg)',rise:'translateY(-.18px) rotate(-.65deg)'};
const CONTACT={origin:'12px 18.15px',small:'scaleX(.35)',full:'scaleX(1)',ink:.9};
const RIPPLE={travel:.9,fall:.25,ink:.76,small:'scaleX(.55)',full:'scaleX(1)'};
const ECHO={travel:.45,fall:.1,ink:.36};
const SIDES=[{side:'left',sign:-1,origin:'6.4px 20.1px',echoOrigin:'7.2px 22px'},{side:'right',sign:1,origin:'17.6px 20.1px',echoOrigin:'16.8px 22px'}];
const EASE={lift:'cubic-bezier(.4,0,.6,1)',fall:'cubic-bezier(.5,0,.65,.7)',resist:'cubic-bezier(.16,.8,.3,1)',settle:'cubic-bezier(.3,0,.3,1)'};
export const lifebuoy=motion(TIMING.settle,'The ring meets its support before the ripple spreads.',['Meet','Support','Settle'],[
 actor('buoy',BODY.origin,[pose(TIMING.rest,BODY.rest,EASE.lift),pose(TIMING.gather,BODY.gather,EASE.fall),pose(TIMING.contact,BODY.contact,EASE.resist),pose(TIMING.resist,BODY.resist,EASE.resist),pose(TIMING.rise,BODY.rise,EASE.settle),pose(TIMING.home,BODY.rest),pose(TIMING.settle,BODY.rest)]),
 actor('buoy-contact',CONTACT.origin,[light(TIMING.rest,0,CONTACT.small),light(TIMING.contact,0,CONTACT.small),light(TIMING.resist,CONTACT.ink,CONTACT.full),light(TIMING.lightOut,0,CONTACT.full),light(TIMING.settle,0,CONTACT.small)]),
 ...SIDES.flatMap(s=>[
  actor(`ripple-${s.side}`,s.origin,[light(TIMING.rest,0,RIPPLE.small),light(TIMING.contact,0,RIPPLE.small),light(TIMING.ripple,RIPPLE.ink,RIPPLE.full),light(TIMING.lightOut,0,`translate(${s.sign*RIPPLE.travel}px,${RIPPLE.fall}px) scaleX(1.1)`),light(TIMING.settle,0,RIPPLE.small)]),
  actor(`echo-${s.side}`,s.echoOrigin,[light(TIMING.rest,0,RIPPLE.small),light(TIMING.resist,0,RIPPLE.small),light(TIMING.rise,ECHO.ink,RIPPLE.full),light(TIMING.lightOut,0,`translate(${s.sign*ECHO.travel}px,${ECHO.fall}px)`),light(TIMING.settle,0,RIPPLE.small)]),
 ]),
]);
