# Reading Pace: Interface Craft review

## Context
Open reading pace / WPM controls. Source: `web-absorb/extension/content/reading-focus-timer.js:1033,1059–1060,1248–1250`; the slider calls `setWpm` at 1223. WPM input is disabled in Read-aloud mode; the parent can open mode/options too. A reusable glyph cannot own that host labeling or preference state.

## First Impressions
Source critique: another arc and needle would duplicate Gauge and communicate a measurement, not pacing written words. A word strip above a detented rate slider ties adjustment to reading. The primary thumb movement remains meaningful with every light removed. User visual acceptance is pending; no subjective browser review claimed.

## Visual Design
Two fixed words at y=5, a retained context line at y=10, and a rail at y=17 establish two distinct bands. The capsule thumb spans x=10–14, y=13.8–20.2. Detents at x=6/12/18 align exactly with the thumb's center; the six-unit step stays within the 24-unit canvas. Use the corrected 1.05 Solid contour, 1.35 Dither/Outline footprint and 0.9 text weight. A complete moving knockout removes rail and tick strokes from the thumb's transparent Outline core.

## Interface Design
Take up 0.3 units of travel, advance to the next detent, recover a 0.3-unit overshoot, and seat. Only then show the detent response below the thumb. Two word underlines answer sequentially after registration. Words, rail and detents remain fixed. Return the thumb after the reading cues clear. No numeric WPM, persisted preference or reading progress is fabricated.

## Consistency & Conventions
MOT-01/02 distinguish reading-rate adjustment from Gauge or Learning Rhythm. MOT-03/05/07 keep the rail fixed and bind its knockout to the thumb's entire clock. MOT-04/06 bound anticipation and overshoot. MOT-08/16 require registration before cadence cues. MOT-09/10/11/12 retain finite shared React/SVG tracks, exact neutral return and static reduced motion with transform/opacity only. MOT-14 leaves WPM state to the host. MOT-13/15 visual approval stays with the user; standalone CSS hover cannot continue after departure.

## User Context
Use alongside the WPM label and native slider output; do not encode a numeric setting in the glyph. Preserve keyboard range input, expanded state and disabled Read-aloud controls. Still compact materials remain useful without the cadence demonstration.

## Top Opportunities
Make the controlled quantity visibly textual; seat at an actual detent; keep subsequent reading cues separate from the mechanical adjustment.

## Encoded storyboard and review
[reading-pace.ts](../../src/motions/reading-pace.ts), 980ms: brace 80, pass 240, seat 285, detent 335, first word 400–550, second word 570–715, return 760, rest 980. Actors: `pace-thumb`, identical `pace-thumb-cut`, `pace-detent`, `pace-word-0/1`. Shared material renderer in `ReaderArtwork.tsx`. [Batch checks and limits](../motion-evidence/cognimated-reader-03/README.md) cover mask binding, detent alignment, bounds, order, static rasters and export parity. No claim of user approval or device performance.
