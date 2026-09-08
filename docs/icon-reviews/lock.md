# lock: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **indicate protected access that holds under tension**. It appears in routine controls where recognition matters more than spectacle.

## First Impressions
A shackle translating away from the body can stop looking attached.

## Visual Design
**Identity boundary** — Both shackle feet stay seated in the fixed body. Stable dither follows the contour. Color inherits the selected palette; accents use the same ink and stay below the primary silhouette in visual weight. Typography and card framing belong to the shared inspector, not the glyph.

## Interface Design
The missed opportunity is to express **indicate protected access that holds under tension** through a causal gesture. Body anchors; the shackle takes slight tension with both feet seated, the shoulders catch light, and tension releases. The inspector exposes replay and timing only when requested; the icon itself adds no controls or labels.

## Consistency & Conventions
Retain the conventional glyph. Use the shared hover, focus, click, reduced-motion, and completion contracts. MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply.

## User Context
Opening would change lock into unlock. Keep it closed, without a keyhole transformation or permission claim. Recognizability must survive a brief glance and the still-motion variant.

## Top Opportunities
1. Body anchors; the shackle takes slight tension with both feet seated, the shoulders catch light, and tension releases.
2. Both shackle feet stay seated in the fixed body.
3. Opening would change lock into unlock. Keep it closed, without a keyhole transformation or permission claim.

## Encoded storyboard and review

**Duration:** 1060ms. **Sequence:** Test / Hold / Seat.

Timing source: [presence.ts](../../src/motions/presence.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `shackle` | 0, 130, 350, 580, 820, 1060 |
| `seat-light` | 0, 250, 450, 680, 920, 1060 |
| `body-light` | 0, 410, 620, 870, 1060 |

**Rendered review:** Semantic review rejected an opening shackle because it would mean unlock. Both feet remain seated as the shackle takes tension; the keyhole and body remain unchanged.

Reviewed at preparation (20%), action (40%), recovery (70%) and neutral endpoint (100%), with actual playback and per-part endpoint inspection in the live gallery. These samples establish the reviewed poses; they do not replace the full timeline or the shared lifecycle checks in [VALIDATION.md](../VALIDATION.md).

**Visual reference:** icon 2 from the left in this family.

![lock: action pose at 40%, position 2](../motion-evidence/rollout/presence.png)

[Preparation image](../motion-evidence/rollout/presence-prepare.png) · [Recovery image](../motion-evidence/rollout/presence-recover.png)
