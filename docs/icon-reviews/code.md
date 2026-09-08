# code: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **a bounded expression between delimiters**. It appears in routine controls where recognition matters more than spectacle.

## First Impressions
Independent vertical bracket movement breaks the paired syntax.

## Visual Design
**Identity boundary** — Opening and closing delimiters remain paired. Stable dither follows the contour. Color inherits the selected palette; accents use the same ink and stay below the primary silhouette in visual weight. Typography and card framing belong to the shared inspector, not the glyph.

## Interface Design
The missed opportunity is to express **a bounded expression between delimiters** through a causal gesture. Open both brackets laterally around a stable slash; let the slash make a small accommodating tilt. The inspector exposes replay and timing only when requested; the icon itself adds no controls or labels.

## Consistency & Conventions
Retain the conventional glyph. Use the shared hover, focus, click, reduced-motion, and completion contracts. MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply.

## User Context
No random glyph switching or text typing. Recognizability must survive a brief glance and the still-motion variant.

## Top Opportunities
1. Open both brackets laterally around a stable slash; let the slash make a small accommodating tilt.
2. Opening and closing delimiters remain paired.
3. No random glyph switching or text typing.

## Encoded storyboard and review

**Duration:** 1060ms. **Sequence:** Invite / Enclose / Align.

Timing source: [development.ts](../../src/motions/development.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `bracket-left` | 0, 130, 380, 590, 880, 1060 |
| `bracket-right` | 0, 160, 420, 630, 920, 1060 |
| `slash` | 0, 240, 500, 730, 920, 1060 |
| `syntax-light` | 0, 350, 550, 850, 1060 |

**Rendered review:** The two delimiters open around a stable slash. Additional contour inset preserves outline clearance at maximum reach; neither bracket leaves the viewBox.

Reviewed at preparation (20%), action (40%), recovery (70%) and neutral endpoint (100%), with actual playback and per-part endpoint inspection in the live gallery. These samples establish the reviewed poses; they do not replace the full timeline or the shared lifecycle checks in [VALIDATION.md](../VALIDATION.md).

**Visual reference:** icon 1 from the left in this family.

![code: action pose at 40%, position 1](../motion-evidence/rollout/development.png)

[Preparation image](../motion-evidence/rollout/development-prepare.png) · [Recovery image](../motion-evidence/rollout/development-recover.png)
