# folder: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **contain and reveal grouped files**. It appears in routine controls where recognition matters more than spectacle.

## First Impressions
Lifting the whole folder gives no clue that it can contain something.

## Visual Design
**Identity boundary** — Tab and folder back remain steady. Stable dither follows the contour. Color inherits the selected palette; accents use the same ink and stay below the primary silhouette in visual weight. Typography and card framing belong to the shared inspector, not the glyph.

## Interface Design
The missed opportunity is to express **contain and reveal grouped files** through a causal gesture. Hinge the front cover from its lower edge while a paper edge rises behind it; close in reverse order. The inspector exposes replay and timing only when requested; the icon itself adds no controls or labels.

## Consistency & Conventions
Retain the conventional glyph. Use the shared hover, focus, click, reduced-motion, and completion contracts. MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply.

## User Context
The reveal is small enough to read at 32px and does not look like a drawer. Recognizability must survive a brief glance and the still-motion variant.

## Top Opportunities
1. Hinge the front cover from its lower edge while a paper edge rises behind it; close in reverse order.
2. Tab and folder back remain steady.
3. The reveal is small enough to read at 32px and does not look like a drawer.

## Encoded storyboard and review

**Duration:** 1160ms. **Sequence:** Unseat / Reveal / Close.

Timing source: [files.ts](../../src/motions/files.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `cover` | 0, 110, 390, 650, 960, 1160 |
| `paper` | 0, 200, 470, 660, 920, 1160 |

**Rendered review:** The cover hinges from its base while paper rises behind it. An interior opening keeps the paper visible in solid mode; the folder tab stays fixed.

Reviewed at preparation (20%), action (40%), recovery (70%) and neutral endpoint (100%), with actual playback and per-part endpoint inspection in the live gallery. These samples establish the reviewed poses; they do not replace the full timeline or the shared lifecycle checks in [VALIDATION.md](../VALIDATION.md).

**Visual reference:** icon 1 from the left in this family.

![folder: action pose at 40%, position 1](../motion-evidence/rollout/files-containers.png)

[Preparation image](../motion-evidence/rollout/files-containers-prepare.png) · [Recovery image](../motion-evidence/rollout/files-containers-recover.png)
