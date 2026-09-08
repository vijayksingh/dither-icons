# bolt: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **a short transfer of energy**. It appears in routine controls where recognition matters more than spectacle.

## First Impressions
Making the whole lightning bolt blink erases its shape and can resemble a fault.

## Visual Design
**Identity boundary** — Bolt silhouette remains fully visible. Stable dither follows the contour. Color inherits the selected palette; accents use the same ink and stay below the primary silhouette in visual weight. Typography and card framing belong to the shared inspector, not the glyph.

## Interface Design
The missed opportunity is to express **a short transfer of energy** through a causal gesture. Carry emphasis down the upper arm, through the bend, and into the lower point. The inspector exposes replay and timing only when requested; the icon itself adds no controls or labels.

## Consistency & Conventions
Retain the conventional glyph. Use the shared hover, focus, click, reduced-motion, and completion contracts. MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply.

## User Context
No flashing loop, large burst, or whole-screen glow. Recognizability must survive a brief glance and the still-motion variant.

## Top Opportunities
1. Carry emphasis down the upper arm, through the bend, and into the lower point.
2. Bolt silhouette remains fully visible.
3. No flashing loop, large burst, or whole-screen glow.

## Encoded storyboard and review

**Duration:** 780ms. **Sequence:** Charge / Conduct / Discharge.

Timing source: [atmosphere.ts](../../src/motions/atmosphere.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `charge` | 0, 100, 230, 350, 780 |
| `conduct` | 0, 140, 290, 430, 550, 780 |
| `discharge` | 0, 310, 450, 620, 780 |

**Rendered review:** The contour stays completely still and visible while emphasis travels from the upper arm through the bend to the lower point. No whole-icon blinking.

Reviewed at preparation (20%), action (40%), recovery (70%) and neutral endpoint (100%), with actual playback and per-part endpoint inspection in the live gallery. These samples establish the reviewed poses; they do not replace the full timeline or the shared lifecycle checks in [VALIDATION.md](../VALIDATION.md).

**Visual reference:** icon 4 from the left in this family.

![bolt: action pose at 40%, position 4](../motion-evidence/rollout/light.png)

[Preparation image](../motion-evidence/rollout/light-prepare.png) · [Recovery image](../motion-evidence/rollout/light-recover.png)
