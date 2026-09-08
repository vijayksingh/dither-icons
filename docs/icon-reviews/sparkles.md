# sparkles: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **a small moment of discovery or emphasis**. It appears in routine controls where recognition matters more than spectacle.

## First Impressions
A simultaneous pulse lacks a focal hierarchy.

## Visual Design
**Identity boundary** — The main star remains dominant. Stable dither follows the contour. Color inherits the selected palette; accents use the same ink and stay below the primary silhouette in visual weight. Typography and card framing belong to the shared inspector, not the glyph.

## Interface Design
The missed opportunity is to express **a small moment of discovery or emphasis** through a causal gesture. Main four-point mark gathers and opens; smaller satellite answers later with a restrained glint. The inspector exposes replay and timing only when requested; the icon itself adds no controls or labels.

## Consistency & Conventions
Retain the conventional glyph. Use the shared hover, focus, click, reduced-motion, and completion contracts. MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply.

## User Context
Avoid a particle shower or loading shimmer. Recognizability must survive a brief glance and the still-motion variant.

## Top Opportunities
1. Main four-point mark gathers and opens; smaller satellite answers later with a restrained glint.
2. The main star remains dominant.
3. Avoid a particle shower or loading shimmer.

## Encoded storyboard and review

**Duration:** 1180ms. **Sequence:** Gather / Glint / Echo.

Timing source: [atmosphere.ts](../../src/motions/atmosphere.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `star` | 0, 150, 390, 600, 850, 1180 |
| `satellite` | 0, 220, 520, 740, 1000, 1180 |
| `star-light` | 0, 180, 390, 650, 1180 |

**Rendered review:** The main star gathers and opens before the satellite responds. Both stars remain present, and the central glint is subordinate to the silhouette.

Reviewed at preparation (20%), action (40%), recovery (70%) and neutral endpoint (100%), with actual playback and per-part endpoint inspection in the live gallery. These samples establish the reviewed poses; they do not replace the full timeline or the shared lifecycle checks in [VALIDATION.md](../VALIDATION.md).

**Visual reference:** icon 1 from the left in this family.

![sparkles: action pose at 40%, position 1](../motion-evidence/rollout/light.png)

[Preparation image](../motion-evidence/rollout/light-prepare.png) · [Recovery image](../motion-evidence/rollout/light-recover.png)
