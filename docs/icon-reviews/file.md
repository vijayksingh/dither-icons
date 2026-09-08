# file: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **a document with content and a folded corner**. It appears in routine controls where recognition matters more than spectacle.

## First Impressions
A floating rectangle makes the folded corner incidental.

## Visual Design
**Identity boundary** — Page silhouette remains anchored and the top-right fold remains legible. Stable dither follows the contour. Color inherits the selected palette; accents use the same ink and stay below the primary silhouette in visual weight. Typography and card framing belong to the shared inspector, not the glyph.

## Interface Design
The missed opportunity is to express **a document with content and a folded corner** through a causal gesture. Lift the corner around its crease, reveal quiet content strokes, and lay it back onto the page. The inspector exposes replay and timing only when requested; the icon itself adds no controls or labels.

## Consistency & Conventions
Retain the conventional glyph. Use the shared hover, focus, click, reduced-motion, and completion contracts. MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply.

## User Context
Avoid suggesting edits or a new document being created. Recognizability must survive a brief glance and the still-motion variant.

## Top Opportunities
1. Lift the corner around its crease, reveal quiet content strokes, and lay it back onto the page.
2. Page silhouette remains anchored and the top-right fold remains legible.
3. Avoid suggesting edits or a new document being created.

## Encoded storyboard and review

**Duration:** 960ms. **Sequence:** Lift / Read / Lay flat.

Timing source: [files.ts](../../src/motions/files.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `page` | 0, 170, 380, 680, 960 |
| `fold` | 0, 110, 350, 550, 800, 960 |
| `content-light` | 0, 230, 430, 710, 900, 960 |

**Rendered review:** The fold has a physical seam after the solid-mode review. It pivots within the page corner; content emphasis stays quiet and the page remains identifiable.

Reviewed at preparation (20%), action (40%), recovery (70%) and neutral endpoint (100%), with actual playback and per-part endpoint inspection in the live gallery. These samples establish the reviewed poses; they do not replace the full timeline or the shared lifecycle checks in [VALIDATION.md](../VALIDATION.md).

**Visual reference:** icon 3 from the left in this family.

![file: action pose at 40%, position 3](../motion-evidence/rollout/files-transfer.png)

[Preparation image](../motion-evidence/rollout/files-transfer-prepare.png) · [Recovery image](../motion-evidence/rollout/files-transfer-recover.png)
