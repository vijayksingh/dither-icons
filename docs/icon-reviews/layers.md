# layers: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **reveal separate planes within a stack**. This is one of the four user-accepted foundation performances.

## First Impressions
Moving a stack as one object cannot expose its structure.

## Visual Design
**Identity boundary** — Three planes preserve their order. Stable dither follows the material. Accents inherit the same ink and remain subordinate.

## Interface Design
Compress the stack, fan the planes with staggered timing, hold for reading, and nest again. Playback, scrubbing and the still variant share the same named parts.

## Consistency & Conventions
MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-07, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply. Preserve the accepted performance while extending the vocabulary.

## User Context
Preview feedback must not assert that an application action succeeded. Keyboard, touch, and reduced-motion users retain the same recognizable icon.

## Top Opportunities
1. Preserve the accepted causal sequence.
2. Three planes preserve their order.
3. Keep the neutral return and interrupted-input behavior consistent.

## Encoded storyboard and review

**Duration:** 1120ms. **Sequence:** Gather / Separate / Nest.

Timing source: [choreography.ts](../../src/choreography.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `plane-bottom` | 0, 120, 380, 610, 850, 1010, 1120 |
| `plane-middle` | 0, 170, 430, 650, 920, 1070, 1120 |
| `plane-top` | 0, 120, 400, 620, 930, 1120 |
| `guides` | 0, 260, 450, 650, 850, 1120 |

**Review:** Independent planes stay ordered; the middle plane offsets laterally while the top and bottom create depth. See the [foundation playback and identity review](../MOTION-REVIEW.md). This rollout preserves its accepted tracks.

![Accepted foundation at 40%, light Cobalt](../motion-evidence/rollout/foundation.png)
