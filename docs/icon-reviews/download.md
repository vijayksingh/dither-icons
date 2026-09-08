# download: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **receive an item into a destination**. This is one of the four user-accepted foundation performances.

## First Impressions
Replacing the arrow with a checkmark lost the download identity.

## Visual Design
**Identity boundary** — Arrow and receiving tray remain visible at every frame. Stable dither follows the material. Accents inherit the same ink and remain subordinate.

## Interface Design
Arrow lifts briefly, drops into the tray, and causes the tray to yield; catch light dissipates as both settle. Playback, scrubbing and the still variant share the same named parts.

## Consistency & Conventions
MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-07, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply. Preserve the accepted performance while extending the vocabulary.

## User Context
Preview feedback must not assert that an application action succeeded. Keyboard, touch, and reduced-motion users retain the same recognizable icon.

## Top Opportunities
1. Preserve the accepted causal sequence.
2. Arrow and receiving tray remain visible at every frame.
3. Keep the neutral return and interrupted-input behavior consistent.

## Encoded storyboard and review

**Duration:** 1120ms. **Sequence:** Lift / Receive / Settle.

Timing source: [choreography.ts](../../src/choreography.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `arrow` | 0, 170, 380, 470, 730, 940, 1120 |
| `tray` | 0, 365, 460, 710, 910, 1120 |
| `receive-light` | 0, 360, 485, 690, 860, 1120 |
| `catch-0` | 0, 410, 480, 700, 1120 |
| `catch-1` | 0, 410, 480, 700, 1120 |

**Review:** The corrected arrow and tray stay recognizable at the impact beat. No checkmark or success-state substitution. See the [foundation playback and identity review](../MOTION-REVIEW.md). This rollout preserves its accepted tracks.

![Accepted foundation at 40%, light Cobalt](../motion-evidence/rollout/foundation.png)
