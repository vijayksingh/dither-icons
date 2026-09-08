# message: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **an ongoing conversation or a short thought**. It appears in routine controls where recognition matters more than spectacle.

## First Impressions
Blinking all three dots simultaneously feels like an error indicator.

## Visual Design
**Identity boundary** — Bubble and tail stay fully readable. Stable dither follows the contour. Color inherits the selected palette; accents use the same ink and stay below the primary silhouette in visual weight. Typography and card framing belong to the shared inspector, not the glyph.

## Interface Design
The missed opportunity is to express **an ongoing conversation or a short thought** through a causal gesture. Pass a restrained emphasis across three dots from left to right inside a steady bubble. The inspector exposes replay and timing only when requested; the icon itself adds no controls or labels.

## Consistency & Conventions
Retain the conventional glyph. Use the shared hover, focus, click, reduced-motion, and completion contracts. MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply.

## User Context
One pass only; do not claim someone is typing indefinitely. Recognizability must survive a brief glance and the still-motion variant.

## Top Opportunities
1. Pass a restrained emphasis across three dots from left to right inside a steady bubble.
2. Bubble and tail stay fully readable.
3. One pass only; do not claim someone is typing indefinitely.

## Encoded storyboard and review

**Duration:** 1020ms. **Sequence:** Begin / Answer / Rest.

Timing source: [communication.ts](../../src/motions/communication.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `dot-left` | 0, 100, 270, 490, 690, 1020 |
| `dot-center` | 0, 210, 380, 600, 800, 1020 |
| `dot-right` | 0, 320, 490, 710, 910, 1020 |

**Rendered review:** The three dots answer in sequence without moving the bubble or tail. Solid mode uses animated cutouts so the dots do not disappear into a same-color body.

Reviewed at preparation (20%), action (40%), recovery (70%) and neutral endpoint (100%), with actual playback and per-part endpoint inspection in the live gallery. These samples establish the reviewed poses; they do not replace the full timeline or the shared lifecycle checks in [VALIDATION.md](../VALIDATION.md).

**Visual reference:** icon 2 from the left in this family.

![message: action pose at 40%, position 2](../motion-evidence/rollout/communication.png)

[Preparation image](../motion-evidence/rollout/communication-prepare.png) · [Recovery image](../motion-evidence/rollout/communication-recover.png)
