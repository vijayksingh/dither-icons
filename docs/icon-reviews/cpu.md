# cpu: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **receive a signal, process it, emit a response**. It appears in routine controls where recognition matters more than spectacle.

## First Impressions
Flashing the die alone discards the causal role of the pins.

## Visual Design
**Identity boundary** — Chip outline and pins stay fixed. Stable dither follows the contour. Color inherits the selected palette; accents use the same ink and stay below the primary silhouette in visual weight. Typography and card framing belong to the shared inspector, not the glyph.

## Interface Design
The missed opportunity is to express **receive a signal, process it, emit a response** through a causal gesture. An input trace brightens, the central die responds, and the output side follows after a delay. The inspector exposes replay and timing only when requested; the icon itself adds no controls or labels.

## Consistency & Conventions
Retain the conventional glyph. Use the shared hover, focus, click, reduced-motion, and completion contracts. MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply.

## User Context
Do not flash the whole package or invent processing progress. Recognizability must survive a brief glance and the still-motion variant.

## Top Opportunities
1. An input trace brightens, the central die responds, and the output side follows after a delay.
2. Chip outline and pins stay fixed.
3. Do not flash the whole package or invent processing progress.

## Encoded storyboard and review

**Duration:** 1280ms. **Sequence:** Receive / Process / Respond.

Timing source: [development.ts](../../src/motions/development.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `input` | 0, 90, 260, 450, 580, 1280 |
| `die` | 0, 250, 380, 540, 720, 940, 1280 |
| `die-light` | 0, 310, 510, 740, 930, 1280 |
| `output` | 0, 570, 800, 1020, 1190, 1280 |

**Rendered review:** The input trace leads the die response and the output trace follows. A gap around the die preserves that relationship in solid mode; pins and package remain fixed.

Reviewed at preparation (20%), action (40%), recovery (70%) and neutral endpoint (100%), with actual playback and per-part endpoint inspection in the live gallery. These samples establish the reviewed poses; they do not replace the full timeline or the shared lifecycle checks in [VALIDATION.md](../VALIDATION.md).

**Visual reference:** icon 3 from the left in this family.

![cpu: action pose at 40%, position 3](../motion-evidence/rollout/development.png)

[Preparation image](../motion-evidence/rollout/development-prepare.png) · [Recovery image](../motion-evidence/rollout/development-recover.png)
