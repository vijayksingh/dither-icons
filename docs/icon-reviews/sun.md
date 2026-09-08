# sun: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **daylight or a light appearance**. It appears in routine controls where recognition matters more than spectacle.

## First Impressions
Spinning the entire sun resembles a busy indicator.

## Visual Design
**Identity boundary** — Disc and rays remain a sun at every frame. Stable dither follows the contour. Color inherits the selected palette; accents use the same ink and stay below the primary silhouette in visual weight. Typography and card framing belong to the shared inspector, not the glyph.

## Interface Design
The missed opportunity is to express **daylight or a light appearance** through a causal gesture. Core anchors; rays extend slightly and answer around it with a warm rim accent. The inspector exposes replay and timing only when requested; the icon itself adds no controls or labels.

## Consistency & Conventions
Retain the conventional glyph. Use the shared hover, focus, click, reduced-motion, and completion contracts. MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply.

## User Context
One soft expansion, not a repeated breathing loop. Recognizability must survive a brief glance and the still-motion variant.

## Top Opportunities
1. Core anchors; rays extend slightly and answer around it with a warm rim accent.
2. Disc and rays remain a sun at every frame.
3. One soft expansion, not a repeated breathing loop.

## Encoded storyboard and review

**Duration:** 1160ms. **Sequence:** Warm / Radiate / Rest.

Timing source: [atmosphere.ts](../../src/motions/atmosphere.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `rays-cardinal` | 0, 140, 410, 610, 900, 1160 |
| `rays-diagonal` | 0, 120, 260, 520, 730, 1020, 1160 |
| `warmth` | 0, 120, 350, 700, 980, 1160 |

**Rendered review:** The disc stays anchored. Cardinal rays answer before diagonal rays, then both settle without a full spin or a busy-indicator reading.

Reviewed at preparation (20%), action (40%), recovery (70%) and neutral endpoint (100%), with actual playback and per-part endpoint inspection in the live gallery. These samples establish the reviewed poses; they do not replace the full timeline or the shared lifecycle checks in [VALIDATION.md](../VALIDATION.md).

**Visual reference:** icon 2 from the left in this family.

![sun: action pose at 40%, position 2](../motion-evidence/rollout/light.png)

[Preparation image](../motion-evidence/rollout/light-prepare.png) · [Recovery image](../motion-evidence/rollout/light-recover.png)
