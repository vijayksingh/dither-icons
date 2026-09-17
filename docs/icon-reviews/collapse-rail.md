# Collapse Rail: Interface Craft review

## Context
Collapse the floating reader controls while retaining the article. The saved reader exposes “Collapse reading controls” at `web-absorb/pwa/src/ReadingListView.tsx:127`; the extension grip also toggles its rail. This vertical right rail differs from Panel Left Close's horizontal drawer.

## First Impressions
Source-level critique: four open reading lines remain beside a detached rail with an upward chevron. The user's Outline screenshot exposed crossed contours at the cap/body joint. A fixed cap occlusion mask now removes the hidden body ink; lighter materials address the heavy Solid screenshot.

## Visual Design
Prose spans x=3–12; the rail spans x=16–21, down to y=20.5. Its top tab remains at y=3.5–8. Full-size controls translate −13.25 behind a fixed y=8 clip and the cap silhouette. Hollow contour cores remain transparent through the joint. Solid uses 1.05 contours, 0.9 text and 0.75 details. Dither/Outline use 1.35 outer contours with 0.35 Outline edges. The response sits below the dock at y=9.25.

## Interface Design
The chevron leads upward; the full-size rail retracts behind its top tab. Only after the trailing edge clears does the dock respond. Hold the retained tab, clear the response and restore the preview. Prose never moves or reflows. The mask and clip remain outside the moving body, so neither travels with the rail.

## Consistency & Conventions
MOT-01/02/03/05 retain the article and accessible tab. MOT-06/07 keep control size and clipping coherent. MOT-08/16 delay the dock response. MOT-09/10/11/12 retain shared finite playback, exact neutral return and a full static reduced-motion drawing. MOT-14 leaves actual expanded state to the host. MOT-13/15 rendered approval is pending. CSS hover stops on departure; React completes the gesture.

## User Context
Use this for the collapse action with the native `aria-expanded` state and label. Expanding requires the host's truthful opposite affordance. Motion-off retains the complete expanded rail and directional chevron. Compact Outline and docked-tab recognition remain user review items.

## Top Opportunities
Implemented: vertical docking, static prose, lighter strokes and masked contour joint. Remaining: user assessment of the compact hold and tab visibility.

## Encoded storyboard and review
[Timing](../../src/motions/collapse-rail.ts): 1320ms. `rail-chevron` origin (18.5,6), lead 110ms. `rail-body` origin (18.5,8), withdrawal 180ms, dock 510ms. `rail-seam` responds 620ms, holds to 810ms, clears 920ms. Body/chevron return by 1200ms; neutral clock end 1320ms.

[Checks and limits](../motion-evidence/cognimated-reader-02/README.md). Tests verify fixed clipping, whole trailing-stroke docking, unchanged text, unique IDs and transparent joint pixels. User screenshots motivate the correction; no browser/device approval is inferred.
