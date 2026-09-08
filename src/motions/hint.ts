import {actor,motion,light} from './authoring';

/* ── HINT / a small idea lights from the inside ──────────────
 *    0ms  a useful unlit bulb, filament and base intact
 *  120ms  a small light rises through the stem
 *  315ms  it reaches the filament junction
 *  410ms  filament opens; contained illumination follows
 *  510ms  the top ray answers
 *  570ms  two quieter side rays complete the insight
 *  950ms  light dissipates from outside back toward the source
 * 1260ms  exact unlit rest; a nudge, not an answer or completion
 * MOT-01/03/05/07/08/16: light has a source; glass never bounces.
 * ────────────────────────────────────────────────────────── */
const TIMING={
 rest:0,          // The unlit bulb, filament, and base remain useful.
 stemStart:120,   // Conduct a small light upward from the base.
 filamentStart:250,// Light reaches the filament junction.
 stemPeak:315,    // The stem is fully illuminated.
 topStart:385,    // A restrained top ray begins to answer.
 filamentPeak:410,// Both filament branches are now lit.
 sideStart:440,   // Side rays follow the central response.
 glowPeak:465,    // Contained illumination peaks inside the glass.
 topPeak:510,     // The top ray makes the insight legible.
 sidePeak:570,    // Quieter side rays finish the outward response.
 stemOut:635,     // The initial conduction light fades.
 raysOut:865,     // Exterior light disappears first.
 filamentOut:920, // The filament returns to its unlit contour.
 glowOut:950,     // The last internal light dissipates.
 settle:1260,     // Exact rest; no answer has been revealed.
};
export const HINT_ART={
 outer:'M8.8 17.4c0-1.65-.65-2.4-1.75-3.5A6.65 6.65 0 1 1 16.95 13.9c-1.1 1.1-1.75 1.85-1.75 3.5Z',
 inside:'M10.2 16h3.6c.28-1.23 1-2.25 2.16-3.42a5.25 5.25 0 1 0-7.92 0c1.16 1.17 1.88 2.19 2.16 3.42Z',
 outline:'M9.5 16.7c0-1.4-.7-2.4-1.97-3.68a5.95 5.95 0 1 1 8.94 0c-1.27 1.28-1.97 2.28-1.97 3.68Z',
 base:'M8.8 18.6h6.4v1.3H8.8ZM10 21h4v1.3h-4Z',
 filament:'M9.55 10.4 12 12.85l2.45-2.45M12 12.85v3.4',
 stem:'M12 15.9v-2.8',branches:'M9.55 10.4 12 12.85l2.45-2.45',
 glow:'M12 4.25a5.15 5.15 0 1 0 0 10.3a5.15 5.15 0 1 0 0-10.3Z',
 topRay:'M12 .7v1.1',leftRay:'M2.5 5.65l1.3.65',rightRay:'M21.5 5.65l-1.3.65',
};
const STEM={origin:'12px 15.9px',ink:.92};
const FILAMENT={origin:'12px 12.85px',ink:.94};
const GLOW={origin:'12px 9.4px',ink:.22};
const RAYS=[{part:'idea-top',origin:'12px 1.8px',start:TIMING.topStart,peak:TIMING.topPeak,ink:.88},{part:'idea-left',origin:'3.8px 6.3px',start:TIMING.sideStart,peak:TIMING.sidePeak,ink:.7},{part:'idea-right',origin:'20.2px 6.3px',start:TIMING.sideStart,peak:TIMING.sidePeak,ink:.7}];
export const hint=motion(TIMING.settle,'A little light from within.',['Conduct','Illuminate','Ease'],[
 actor('stem-light',STEM.origin,[light(TIMING.rest,0,'scaleY(.15)'),light(TIMING.stemStart,0,'scaleY(.15)'),light(TIMING.stemPeak,STEM.ink,'scaleY(1)'),light(TIMING.stemOut,0,'scaleY(1)'),light(TIMING.settle,0,'scaleY(.15)')]),
 actor('filament-light',FILAMENT.origin,[light(TIMING.rest,0,'scale(.2)'),light(TIMING.filamentStart,0,'scale(.2)'),light(TIMING.filamentPeak,FILAMENT.ink,'scale(1)'),light(TIMING.filamentOut,0,'scale(1)'),light(TIMING.settle,0,'scale(.2)')]),
 actor('illumination',GLOW.origin,[light(TIMING.rest,0,'scale(.75)'),light(TIMING.filamentStart,0,'scale(.75)'),light(TIMING.glowPeak,GLOW.ink,'scale(1)'),light(TIMING.glowOut,0,'scale(1.02)'),light(TIMING.settle,0,'scale(.75)')]),
 ...RAYS.map(r=>actor(r.part,r.origin,[light(TIMING.rest,0,'scale(.2)'),light(r.start,0,'scale(.2)'),light(r.peak,r.ink,'scale(1)'),light(TIMING.raysOut,0,'scale(1.12)'),light(TIMING.settle,0,'scale(.2)')])),
]);
