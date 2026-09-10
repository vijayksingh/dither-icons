# Sun: Interface Craft refinement 07

## Context
**Light appearance.** Sun indicates daylight or a light appearance. The platform ModeToggle.tsx:29/35 pairs it with Moon. The host chooses the actual theme; hovering a Sun preview does not change it.

## First Impressions
Square bars and diamond blocks made the earlier rays feel coarse. The two rotating ray groups read like a small busy indicator, and the tiny internal arc did not explain where their movement came from.

## Visual Design
A fixed radius-4.4 disc is surrounded by eight identical round-ended capsules, with 1.65-unit width. Static 45-degree rotations establish the radial frame; each animated ray translates only along its own radius. A thin finite wave crosses the empty space around the disc. Four short tangential endpoint marks finish the cardinal response.

## Interface Design
The wave emerges at 150ms, brightens at 250ms and reaches the actual rounded inner edge of the rays at 430ms. Cardinal rays then travel .55 units outward by 540ms; diagonals follow and travel .4 units by 620ms. The tip response peaks at 605ms. Rays hold briefly before returning. The disc never rotates or breathes.

## Consistency & Conventions
MOT-01/02/03/04/05/06/07/08/09/10/11/12/13/14/15/16. Use the existing native playback, shared CSS timeline and frame inspector. Each icon has its own geometry and timing module. Reduced motion and motion-off retain the complete static symbol. Standalone CSS hover stops on departure; React completes the gesture.

## User Context
Daylight should feel open and even. The wave is a single event; the sun remains complete with motion off. The capsule contours work at 24px, and the maximum outer edge stays inside the viewBox.

## Top Opportunities
1. Replace blocky rays with consistent capsules.
2. Show propagation from a visible source before the rays move.
3. Keep all motion radial and bound the outer ends.

## Encoded storyboard and rendered review
[sun.ts](../../src/motions/sun.ts), **1160ms**, **Warm / Reach / Radiate**.

```text
0 — 150 emit — 250 warm — 430 reach — 485 follow — 540 cardinal — 605 tips — 620 diagonal — 750 hold — 930 clear — 1160 rest
```

[Current browser evidence](../motion-evidence/refinement-07/) records inspected poses, actual/half-speed playback, keyboard completion, material continuity, reduced motion and compact exports. These supersede the broad-rollout references for this icon. Implementation review does not claim user acceptance or a production release.

![Eye, Sparkles, Sun and Moon during their response](../motion-evidence/refinement-07/pose-55.png)
