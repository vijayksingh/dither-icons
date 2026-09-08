# bell: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **draw attention through a mechanical ring**. This is one of the four user-accepted foundation performances.

## First Impressions
A whole-icon wiggle ignores the weight and crown.

## Visual Design
**Identity boundary** — Shell stays suspended from its crown; clapper remains visibly related. Stable dither follows the material. Accents inherit the same ink and remain subordinate.

## Interface Design
Shell anticipates the swing; clapper lags, strikes, and drives asymmetric ring marks. Playback, scrubbing and the still variant share the same named parts.

## Consistency & Conventions
MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-07, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply. Preserve the accepted performance while extending the vocabulary.

## User Context
Preview feedback must not assert that an application action succeeded. Keyboard, touch, and reduced-motion users retain the same recognizable icon.

## Top Opportunities
1. Preserve the accepted causal sequence.
2. Shell stays suspended from its crown; clapper remains visibly related.
3. Keep the neutral return and interrupted-input behavior consistent.

## Encoded storyboard and review

**Duration:** 940ms. **Sequence:** Anticipate / Strike / Resonate.

Timing source: [choreography.ts](../../src/choreography.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `shell` | 0, 100, 230, 400, 570, 720, 850, 940 |
| `clapper` | 0, 110, 280, 450, 630, 790, 940 |
| `ring-right` | 0, 210, 310, 570, 940 |
| `ring-left` | 0, 380, 490, 740, 940 |

**Review:** The clapper and shell oppose each other; ringing cues follow the strike. Retain the accepted amplitude and timing. See the [foundation playback and identity review](../MOTION-REVIEW.md). This rollout preserves its accepted tracks.

![Accepted foundation at 40%, light Cobalt](../motion-evidence/rollout/foundation.png)
