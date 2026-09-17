# Reading Focus: Interface Craft review

## Context
The Cognimated extension's guided-reading toggle also displays the reading timer (`web-absorb/extension/content/reading-focus-timer.js:1020`). This is a focused-reading affordance, distinct from Learning Rhythm's daily cadence and Gauge's calibrated reading. The host owns time and durable progress.

## First Impressions
The stopwatch case identifies a timed activity; retained prose and traveling brackets identify reading within it. User feedback on 2026-09-17 rejected the batch's composition as insufficiently refined. The timer has more enclosing visual weight than the other three symbols. This implementation is reviewable, not visually approved.

## Visual Design
An 8.1-unit radius case centered at (12, 13.25) retains its crown and shoulder. Three fixed prose rows use 1.05-unit strokes. The case uses 1.55 units; reading brackets use 1.05. After containment checks, brackets were inset to x=7.2/16.8, y=8.95/11.45, and prose shortened to preserve negative space. Those corrections prevent contact with the circular casing; they do not settle the user's broader composition/stroke concerns.

## Interface Design
The crown engages first. The reading window then advances exactly one 3.15-unit line pitch. Only after seating do the selected line and adjacent rim respond. Accents clear before the window returns. Case, stem and text stay fixed. No clock hand, metronome swing, success mark or fabricated reading credit is introduced.

## Consistency & Conventions
MOT-01/02/03/05/06/07 require retained identity, a reading verb, causal parts, fixed references, restrained travel and attached grain. MOT-08/16 place the response after arrival. MOT-09/10/11/12 require finite native playback, exact neutral return, stillness and shared CSS/WAAPI tracks. MOT-13/15 govern this individual record; MOT-14 leaves real reading progress to Cognimated. CSS hover exports stop when hover ends; React playback completes after departure.

## User Context
The native button keeps its label, timer readout and pressed state. Reduced motion and motion-off retain timer, prose and brackets. Compact control composition and real platform contrast remain for the user's visual/integration review. No call sites were changed.

## Top Opportunities
Balance the case against the other reader symbols; decide whether the brackets add necessary meaning; assess stroke hierarchy at compact sizes. The user explicitly took over visual review, so these remain open rather than triggering further iteration.

## Encoded storyboard and review
[Timing source](../../src/motions/reading-focus.ts). 1420ms: `reading-crown` presses at 120ms, releases at 260ms; `reading-window` seats at 570ms; `reading-line-response` and `reading-rim-response` peak at 660ms, clear at 900ms; return begins at 1010ms and ends at 1420ms.

Prior to the stop on visual review, the live studio was inspected at 0/10/30/50/70/100%, with actual/half-speed and keyboard replay. [Evidence](../motion-evidence/cognimated-reader-01/README.md) records exact paused clocks, material rebinding and reduced-motion stillness. Solid/outline at 50% retained the pose. Focus departure did not cancel playback; repeated Enter preserved its start time. These are implementation observations, not user acceptance. No subsequent composition redesign, compact-size review or physical-device profiling was completed.
