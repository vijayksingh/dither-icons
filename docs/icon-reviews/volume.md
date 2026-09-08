# volume: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **sound propagating away from a source**. It appears in routine controls where recognition matters more than spectacle.

## First Impressions
Blinking the entire waveform hides propagation.

## Visual Design
**Identity boundary** — Speaker and at least the main wave remain visible. Stable dither follows the contour. Color inherits the selected palette; accents use the same ink and stay below the primary silhouette in visual weight. Typography and card framing belong to the shared inspector, not the glyph.

## Interface Design
The missed opportunity is to express **sound propagating away from a source** through a causal gesture. Speaker diaphragm responds first; near and far wave arcs answer in order, then return to rest. The inspector exposes replay and timing only when requested; the icon itself adds no controls or labels.

## Consistency & Conventions
Retain the conventional glyph. Use the shared hover, focus, click, reduced-motion, and completion contracts. MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply.

## User Context
Keep the response gentle and do not encode an actual volume change. Recognizability must survive a brief glance and the still-motion variant.

## Top Opportunities
1. Speaker diaphragm responds first; near and far wave arcs answer in order, then return to rest.
2. Speaker and at least the main wave remain visible.
3. Keep the response gentle and do not encode an actual volume change.

## Encoded storyboard and review

**Duration:** 1100ms. **Sequence:** Source / Near / Far.

Timing source: [media.ts](../../src/motions/media.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `speaker` | 0, 120, 290, 500, 720, 1100 |
| `wave-near` | 0, 190, 400, 620, 850, 1100 |
| `wave-far` | 0, 290, 520, 730, 980, 1100 |
| `sound-light` | 0, 350, 570, 880, 1100 |

**Rendered review:** The speaker responds first, then the near wave, then the outer wave. Both waves stay visible while their emphasis propagates outward.

Reviewed at preparation (20%), action (40%), recovery (70%) and neutral endpoint (100%), with actual playback and per-part endpoint inspection in the live gallery. These samples establish the reviewed poses; they do not replace the full timeline or the shared lifecycle checks in [VALIDATION.md](../VALIDATION.md).

**Visual reference:** icon 3 from the left in this family.

![volume: action pose at 40%, position 3](../motion-evidence/rollout/media.png)

[Preparation image](../motion-evidence/rollout/media-prepare.png) · [Recovery image](../motion-evidence/rollout/media-recover.png)
