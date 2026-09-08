# external-link: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **open another destination while retaining the current context**. It appears in routine controls where recognition matters more than spectacle.

## First Impressions
Moving the entire glyph loses the relationship between a source and a destination.

## Visual Design
**Identity boundary** — Retain both the frame and the diagonal arrow. Stable dither follows the contour. Color inherits the selected palette; accents use the same ink and stay below the primary silhouette in visual weight. Typography and card framing belong to the shared inspector, not the glyph.

## Interface Design
The missed opportunity is to express **open another destination while retaining the current context** through a causal gesture. Hold the source frame while the corner arrow reaches outward; frame response follows at a fraction of the travel. The inspector exposes replay and timing only when requested; the icon itself adds no controls or labels.

## Consistency & Conventions
Retain the conventional glyph. Use the shared hover, focus, click, reduced-motion, and completion contracts. MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply.

## User Context
Do not fly offscreen or imply an actual window has opened. Recognizability must survive a brief glance and the still-motion variant.

## Top Opportunities
1. Hold the source frame while the corner arrow reaches outward; frame response follows at a fraction of the travel.
2. Retain both the frame and the diagonal arrow.
3. Do not fly offscreen or imply an actual window has opened.

## Encoded storyboard and review

**Duration:** 920ms. **Sequence:** Anchor / Reach / Return.

Timing source: [navigation.ts](../../src/motions/navigation.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `arrow` | 0, 120, 350, 570, 780, 920 |
| `frame` | 0, 190, 400, 740, 920 |
| `corner-light` | 0, 270, 430, 670, 920 |

**Rendered review:** Both the source frame and outward diagonal remain legible. The small frame response makes the corner reach relational rather than a detached arrow.

Reviewed at preparation (20%), action (40%), recovery (70%) and neutral endpoint (100%), with actual playback and per-part endpoint inspection in the live gallery. These samples establish the reviewed poses; they do not replace the full timeline or the shared lifecycle checks in [VALIDATION.md](../VALIDATION.md).

**Visual reference:** icon 3 from the left in this family.

![external-link: action pose at 40%, position 3](../motion-evidence/rollout/navigation.png)

[Preparation image](../motion-evidence/rollout/navigation-prepare.png) · [Recovery image](../motion-evidence/rollout/navigation-recover.png)
