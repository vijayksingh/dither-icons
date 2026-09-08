# settings: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **make a measured adjustment**. It appears in routine controls where recognition matters more than spectacle.

## First Impressions
A full quarter-turn reset looks like a spinner, not a considered adjustment.

## Visual Design
**Identity boundary** — Gear teeth and central opening stay legible. Stable dither follows the contour. Color inherits the selected palette; accents use the same ink and stay below the primary silhouette in visual weight. Typography and card framing belong to the shared inspector, not the glyph.

## Interface Design
The missed opportunity is to express **make a measured adjustment** through a causal gesture. Gear moves to a small detent, inner index reacts, then releases back with restrained damping. The inspector exposes replay and timing only when requested; the icon itself adds no controls or labels.

## Consistency & Conventions
Retain the conventional glyph. Use the shared hover, focus, click, reduced-motion, and completion contracts. MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply.

## User Context
No infinite rotation or suggestion that a setting has changed. Recognizability must survive a brief glance and the still-motion variant.

## Top Opportunities
1. Gear moves to a small detent, inner index reacts, then releases back with restrained damping.
2. Gear teeth and central opening stay legible.
3. No infinite rotation or suggestion that a setting has changed.

## Encoded storyboard and review

**Duration:** 1080ms. **Sequence:** Take up / Click / Release.

Timing source: [controls.ts](../../src/motions/controls.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `gear` | 0, 130, 380, 460, 670, 940, 1080 |
| `detent` | 0, 310, 450, 660, 940, 1080 |

**Rendered review:** The gear reaches a small detent and holds briefly. Its index responds after the adjustment; teeth and central opening remain readable without a spinner loop.

Reviewed at preparation (20%), action (40%), recovery (70%) and neutral endpoint (100%), with actual playback and per-part endpoint inspection in the live gallery. These samples establish the reviewed poses; they do not replace the full timeline or the shared lifecycle checks in [VALIDATION.md](../VALIDATION.md).

**Visual reference:** icon 3 from the left in this family.

![settings: action pose at 40%, position 3](../motion-evidence/rollout/places.png)

[Preparation image](../motion-evidence/rollout/places-prepare.png) · [Recovery image](../motion-evidence/rollout/places-recover.png)
