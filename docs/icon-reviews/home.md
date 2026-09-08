# home: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **return to a familiar entry point**. It appears in routine controls where recognition matters more than spectacle.

## First Impressions
Raising a solid doorway block reads as a loading bar.

## Visual Design
**Identity boundary** — House contour stays fixed. Stable dither follows the contour. Color inherits the selected palette; accents use the same ink and stay below the primary silhouette in visual weight. Typography and card framing belong to the shared inspector, not the glyph.

## Interface Design
The missed opportunity is to express **return to a familiar entry point** through a causal gesture. Keep the roof and walls still; door opens on its hinge, reveals a small interior light, and closes. The inspector exposes replay and timing only when requested; the icon itself adds no controls or labels.

## Consistency & Conventions
Retain the conventional glyph. Use the shared hover, focus, click, reduced-motion, and completion contracts. MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply.

## User Context
A welcoming gesture, not a navigation animation that relocates the page. Recognizability must survive a brief glance and the still-motion variant.

## Top Opportunities
1. Keep the roof and walls still; door opens on its hinge, reveals a small interior light, and closes.
2. House contour stays fixed.
3. A welcoming gesture, not a navigation animation that relocates the page.

## Encoded storyboard and review

**Duration:** 1220ms. **Sequence:** Welcome / Reveal / Rest.

Timing source: [controls.ts](../../src/motions/controls.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `door` | 0, 150, 440, 710, 1040, 1220 |
| `interior-light` | 0, 260, 530, 780, 1080, 1220 |

**Rendered review:** The roof and walls stay fixed while the door opens from its left edge. The interior light is quieter than the door and clears as it closes.

Reviewed at preparation (20%), action (40%), recovery (70%) and neutral endpoint (100%), with actual playback and per-part endpoint inspection in the live gallery. These samples establish the reviewed poses; they do not replace the full timeline or the shared lifecycle checks in [VALIDATION.md](../VALIDATION.md).

**Visual reference:** icon 2 from the left in this family.

![home: action pose at 40%, position 2](../motion-evidence/rollout/places.png)

[Preparation image](../motion-evidence/rollout/places-prepare.png) · [Recovery image](../motion-evidence/rollout/places-recover.png)
