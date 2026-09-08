# chart: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **compare ordered quantities against a shared baseline**. It appears in routine controls where recognition matters more than spectacle.

## First Impressions
Moving the chart as one block disconnects the bars from their reference.

## Visual Design
**Identity boundary** — Baseline is fixed and bar ordering is preserved. Stable dither follows the contour. Color inherits the selected palette; accents use the same ink and stay below the primary silhouette in visual weight. Typography and card framing belong to the shared inspector, not the glyph.

## Interface Design
The missed opportunity is to express **compare ordered quantities against a shared baseline** through a causal gesture. Emphasize each bar from its baseline in left-to-right order; cap highlights follow and fade. The inspector exposes replay and timing only when requested; the icon itself adds no controls or labels.

## Consistency & Conventions
Retain the conventional glyph. Use the shared hover, focus, click, reduced-motion, and completion contracts. MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply.

## User Context
No new values or random heights. Recognizability must survive a brief glance and the still-motion variant.

## Top Opportunities
1. Emphasize each bar from its baseline in left-to-right order; cap highlights follow and fade.
2. Baseline is fixed and bar ordering is preserved.
3. No new values or random heights.

## Encoded storyboard and review

**Duration:** 1260ms. **Sequence:** Compare / Emphasize / Resolve.

Timing source: [development.ts](../../src/motions/development.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `bar-small` | 0, 110, 340, 510, 780, 1000, 1260 |
| `bar-medium` | 0, 130, 260, 470, 640, 950, 1140, 1260 |
| `bar-tall` | 0, 270, 400, 610, 780, 1080, 1260 |
| `cap-small` | 0, 170, 370, 660, 1260 |
| `cap-medium` | 0, 310, 510, 800, 1260 |
| `cap-tall` | 0, 450, 650, 940, 1260 |

**Rendered review:** Bars respond from a fixed base in left-to-right order. Short, medium, and tall ordering remains unchanged; the tallest bar retains top clearance.

Reviewed at preparation (20%), action (40%), recovery (70%) and neutral endpoint (100%), with actual playback and per-part endpoint inspection in the live gallery. These samples establish the reviewed poses; they do not replace the full timeline or the shared lifecycle checks in [VALIDATION.md](../VALIDATION.md).

**Visual reference:** icon 4 from the left in this family.

![chart: action pose at 40%, position 4](../motion-evidence/rollout/development.png)

[Preparation image](../motion-evidence/rollout/development-prepare.png) · [Recovery image](../motion-evidence/rollout/development-recover.png)
