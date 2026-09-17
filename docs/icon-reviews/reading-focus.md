# Reading Focus: Interface Craft review

## Context
Cognimated's guided-reading timer is a focused-reading control, not Learning Rhythm's daily cadence or Gauge's measured value. The host owns elapsed time and progress.

## First Impressions
The user's screenshot showed a heavy round stopwatch containing cramped brackets and prose. The 2026-09-17 revision replaces the circular silhouette with a soft-square timer and a single margin marker. This is an implemented composition change, not a claim of user visual acceptance.

## Visual Design
The case occupies x=4–20, y=5.5–21 with 4-unit corners. A centered crown identifies a timer without a needle or diagonal shoulder. Text aligns at x=10 on three 3.5-unit baselines; the marker occupies a separate x=7 gutter. Shared reader tokens set contour/marker to 1.5, prose to 1.25 and transient underline to 1 unit. Round caps and joins stay consistent. These are design-grid units, not a universal stroke-width standard.

## Interface Design
Press the crown, advance the marker one line, then underline that line. Keep the case and prose stationary. Clear the underline before returning the marker. Removing paired brackets and exterior rim sparks leaves the reading action as the primary event.

## Consistency & Conventions
MOT-01/02/03/05/06 preserve identity, the attend verb, causal order, a fixed reference and small travel. MOT-07 retains attached grain; MOT-08/16 place the underline after arrival. MOT-09/10/11/12 retain single playback, exact return, static reduced motion and shared React/SVG tracks. MOT-14 forbids progress claims. MOT-13/15: visual approval remains with the user; source/tests do not substitute for rendered review. CSS hover ends on departure; React finishes its gesture.

## User Context
Keep native label, timer readout, pressed state and target size. At 16px the 1.5-unit contour renders at 1px; compact recognition still needs user review. Dither is intended for larger display. Motion-off retains timer, prose and marker.

## Top Opportunities
Implemented: open the internal negative space, remove redundant hardware, and establish one contour/text hierarchy. Remaining: user assessment of the soft-square timer's recognition at toolbar scale.

## Encoded storyboard and review
[Source](../../src/motions/reading-focus.ts): 1240ms. Actors: `reading-crown` at (12,2.75), `reading-marker` at (7,10), `reading-line-response` at (10,15). Crown presses at 100ms/releases at 220ms; marker arrives at 480ms; underline peaks at 600ms, holds to 780ms, clears at 900ms; marker returns from 940–1240ms.

[Revision checks and limits](../motion-evidence/cognimated-reader-refinement/README.md). Tests sample the marker sweep against the rounded case and text gutter. Previous screenshots show the rejected circular drawing and are historical only. No new browser visual review was performed, per the user's instruction.
