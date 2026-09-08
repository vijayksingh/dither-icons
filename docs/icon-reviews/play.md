# play: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **start forward progression**. It appears in routine controls where recognition matters more than spectacle.

## First Impressions
A plain pulse does not convey the forward direction encoded by the triangle.

## Visual Design
**Identity boundary** — The triangle never becomes a pause or leaves its frame. Stable dither follows the contour. Color inherits the selected palette; accents use the same ink and stay below the primary silhouette in visual weight. Typography and card framing belong to the shared inspector, not the glyph.

## Interface Design
The missed opportunity is to express **start forward progression** through a causal gesture. The triangle loads slightly backward, leads right, and lets a small trailing line decay. The inspector exposes replay and timing only when requested; the icon itself adds no controls or labels.

## Consistency & Conventions
Retain the conventional glyph. Use the shared hover, focus, click, reduced-motion, and completion contracts. MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply.

## User Context
One decisive onset; no perpetual playback metaphor. Recognizability must survive a brief glance and the still-motion variant.

## Top Opportunities
1. The triangle loads slightly backward, leads right, and lets a small trailing line decay.
2. The triangle never becomes a pause or leaves its frame.
3. One decisive onset; no perpetual playback metaphor.

## Encoded storyboard and review

**Duration:** 800ms. **Sequence:** Load / Start / Coast.

Timing source: [media.ts](../../src/motions/media.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `triangle` | 0, 110, 300, 490, 670, 800 |
| `start-light` | 0, 160, 340, 590, 800 |

**Rendered review:** The triangle remains a play symbol through its forward start. The small trailing cue clears before rest; there is no play/pause substitution.

Reviewed at preparation (20%), action (40%), recovery (70%) and neutral endpoint (100%), with actual playback and per-part endpoint inspection in the live gallery. These samples establish the reviewed poses; they do not replace the full timeline or the shared lifecycle checks in [VALIDATION.md](../VALIDATION.md).

**Visual reference:** icon 1 from the left in this family.

![play: action pose at 40%, position 1](../motion-evidence/rollout/media.png)

[Preparation image](../motion-evidence/rollout/media-prepare.png) · [Recovery image](../motion-evidence/rollout/media-recover.png)
