# trash: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **place something into a removable container**. It appears in routine controls where recognition matters more than spectacle.

## First Impressions
A whole-bin bounce makes the object feel toy-like rather than useful.

## Visual Design
**Identity boundary** — Bin, open top, and lid remain recognizable. Stable dither follows the contour. Color inherits the selected palette; accents use the same ink and stay below the primary silhouette in visual weight. Typography and card framing belong to the shared inspector, not the glyph.

## Interface Design
The missed opportunity is to express **place something into a removable container** through a causal gesture. Lid releases around one end, bin reacts slightly later, then the lid seats with a small damping beat. The inspector exposes replay and timing only when requested; the icon itself adds no controls or labels.

## Consistency & Conventions
Retain the conventional glyph. Use the shared hover, focus, click, reduced-motion, and completion contracts. MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply.

## User Context
Do not dissolve the bin or imply that user data was deleted. Recognizability must survive a brief glance and the still-motion variant.

## Top Opportunities
1. Lid releases around one end, bin reacts slightly later, then the lid seats with a small damping beat.
2. Bin, open top, and lid remain recognizable.
3. Do not dissolve the bin or imply that user data was deleted.

## Encoded storyboard and review

**Duration:** 1100ms. **Sequence:** Release / Open / Seat.

Timing source: [files.ts](../../src/motions/files.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `lid` | 0, 110, 350, 570, 850, 1100 |
| `bin` | 0, 200, 430, 760, 1100 |
| `rim-light` | 0, 300, 480, 730, 1100 |

**Rendered review:** The lifted lid retains its handle and stays close to the bin. A delayed bin response follows the lid; the lid returns to its original seat.

Reviewed at preparation (20%), action (40%), recovery (70%) and neutral endpoint (100%), with actual playback and per-part endpoint inspection in the live gallery. These samples establish the reviewed poses; they do not replace the full timeline or the shared lifecycle checks in [VALIDATION.md](../VALIDATION.md).

**Visual reference:** icon 2 from the left in this family.

![trash: action pose at 40%, position 2](../motion-evidence/rollout/files-containers.png)

[Preparation image](../motion-evidence/rollout/files-containers-prepare.png) · [Recovery image](../motion-evidence/rollout/files-containers-recover.png)
