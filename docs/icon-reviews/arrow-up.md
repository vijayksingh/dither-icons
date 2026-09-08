# arrow-up: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **move upward or return toward the top**. It appears in routine controls where recognition matters more than spectacle.

## First Impressions
A generic rise gives no sense of clearance or landing.

## Visual Design
**Identity boundary** — The tip always points upward. Stable dither follows the contour. Color inherits the selected palette; accents use the same ink and stay below the primary silhouette in visual weight. Typography and card framing belong to the shared inspector, not the glyph.

## Interface Design
The missed opportunity is to express **move upward or return toward the top** through a causal gesture. Compress slightly, lift along the vertical axis, let the short wake fade, and level out. The inspector exposes replay and timing only when requested; the icon itself adds no controls or labels.

## Consistency & Conventions
Retain the conventional glyph. Use the shared hover, focus, click, reduced-motion, and completion contracts. MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply.

## User Context
Use less overshoot than the heart; this is a directional control. Recognizability must survive a brief glance and the still-motion variant.

## Top Opportunities
1. Compress slightly, lift along the vertical axis, let the short wake fade, and level out.
2. The tip always points upward.
3. Use less overshoot than the heart; this is a directional control.

## Encoded storyboard and review

**Duration:** 860ms. **Sequence:** Gather / Lift / Level.

Timing source: [navigation.ts](../../src/motions/navigation.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `arrow` | 0, 130, 350, 560, 720, 860 |
| `lift-light` | 0, 200, 400, 650, 860 |

**Rendered review:** The point remains upright and inside the frame. The downward preparation reads as gathering lift; the short wake clears during recovery.

Reviewed at preparation (20%), action (40%), recovery (70%) and neutral endpoint (100%), with actual playback and per-part endpoint inspection in the live gallery. These samples establish the reviewed poses; they do not replace the full timeline or the shared lifecycle checks in [VALIDATION.md](../VALIDATION.md).

**Visual reference:** icon 2 from the left in this family.

![arrow-up: action pose at 40%, position 2](../motion-evidence/rollout/navigation.png)

[Preparation image](../motion-evidence/rollout/navigation-prepare.png) · [Recovery image](../motion-evidence/rollout/navigation-recover.png)
