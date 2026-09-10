# Eye: Interface Craft refinement 07

## Context
**Visibility and inspection.** Eye represents an available view or a deliberate look. It is suitable for preview and visibility controls; this pass does not add a new platform control. A library glance must not hide content or claim that inspection succeeded.

## First Impressions
The old pupil looked left and then right without resolving on a subject. Its heavy nested outline and full circular pupil gave little focal hierarchy. The focus event needed to come after the gaze arrived.

## Visual Design
Two joined cubic lids frame one fixed aperture. Dither/solid use a filled band and an iris with a small negative catchlight; outline uses a single 1.65-unit lid contour and a ring with a compact pupil. The full moving iris stays clipped by the aperture. No eyelid closes, no reticle is added.

## Interface Design
A .45-unit preparatory glance precedes a 1.15-unit gaze to the right at 380ms. The iris then contracts to 88% at 490ms. Two fine marks at the right corner acknowledge attention at 555ms. The subject is held until 720ms; the marks clear before the iris centers and relaxes. Fixed lids give the gaze a stable reference.

## Consistency & Conventions
MOT-01/02/03/04/05/06/07/08/09/10/11/12/13/14/15/16. Use the existing native playback, shared CSS timeline and frame inspector. Each icon has its own geometry and timing module. Reduced motion and motion-off retain the complete static symbol. Standalone CSS hover stops on departure; React completes the gesture.

## User Context
A quick recognition cue, followed by enough stillness to feel intentional. At 24px, use solid/outline; the gaze does not depend on the tiny corner accents. Actual visibility belongs to the host.

## Top Opportunities
1. Let the gaze arrive before focus changes.
2. Keep the iris inside a fixed aperture and remove doubled outlines.
3. Use a small corner response, then hold attention.

## Encoded storyboard and rendered review
[eye.ts](../../src/motions/eye.ts), **1300ms**, **Find / Focus / Acknowledge**.

```text
0 — 150 notice — 380 arrive — 490 focus — 555 answer — 720 hold — 900 clear — 1120 home — 1300 rest
```

[Current browser evidence](../motion-evidence/refinement-07/) records inspected poses, actual/half-speed playback, keyboard completion, material continuity, reduced motion and compact exports. These supersede the broad-rollout references for this icon. Implementation review does not claim user acceptance or a production release.

![Eye, Sparkles, Sun and Moon during their response](../motion-evidence/refinement-07/pose-55.png)
