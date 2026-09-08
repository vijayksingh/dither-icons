# close: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **bring a boundary or surface to an end**. It appears in routine controls where recognition matters more than spectacle.

## First Impressions
A whole-icon pulse does not express the cross brace.

## Visual Design
**Identity boundary** — The X never rotates into a plus. Stable dither follows the contour. Color inherits the selected palette; accents use the same ink and stay below the primary silhouette in visual weight. Typography and card framing belong to the shared inspector, not the glyph.

## Interface Design
The missed opportunity is to express **bring a boundary or surface to an end** through a causal gesture. Two diagonals tighten toward their shared intersection with a small stagger, then release. The inspector exposes replay and timing only when requested; the icon itself adds no controls or labels.

## Consistency & Conventions
Retain the conventional glyph. Use the shared hover, focus, click, reduced-motion, and completion contracts. MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply.

## User Context
Restrained and quick; closing is a routine action. Recognizability must survive a brief glance and the still-motion variant.

## Top Opportunities
1. Two diagonals tighten toward their shared intersection with a small stagger, then release.
2. The X never rotates into a plus.
3. Restrained and quick; closing is a routine action.

## Encoded storyboard and review

**Duration:** 720ms. **Sequence:** Gather / Meet / Release.

Timing source: [controls.ts](../../src/motions/controls.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `diagonal-down` | 0, 110, 290, 410, 590, 720 |
| `diagonal-up` | 0, 150, 330, 450, 630, 720 |

**Rendered review:** The diagonals tighten around one shared center with a slight stagger. It remains an X in the preparation, action, and recovery poses.

Reviewed at preparation (20%), action (40%), recovery (70%) and neutral endpoint (100%), with actual playback and per-part endpoint inspection in the live gallery. These samples establish the reviewed poses; they do not replace the full timeline or the shared lifecycle checks in [VALIDATION.md](../VALIDATION.md).

**Visual reference:** icon 2 from the left in this family.

![close: action pose at 40%, position 2](../motion-evidence/rollout/actions.png)

[Preparation image](../motion-evidence/rollout/actions-prepare.png) · [Recovery image](../motion-evidence/rollout/actions-recover.png)
