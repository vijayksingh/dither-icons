# user: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **represent a person or profile**. It appears in routine controls where recognition matters more than spectacle.

## First Impressions
A rocking full avatar feels like a toy and moves the identity anchor.

## Visual Design
**Identity boundary** — Head and shoulders remain connected as one avatar. Stable dither follows the contour. Color inherits the selected palette; accents use the same ink and stay below the primary silhouette in visual weight. Typography and card framing belong to the shared inspector, not the glyph.

## Interface Design
The missed opportunity is to express **represent a person or profile** through a causal gesture. Head gives one small nod while the shoulders respond more softly and later. The inspector exposes replay and timing only when requested; the icon itself adds no controls or labels.

## Consistency & Conventions
Retain the conventional glyph. Use the shared hover, focus, click, reduced-motion, and completion contracts. MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply.

## User Context
Friendly acknowledgment without facial expression or a cartoon jump. Recognizability must survive a brief glance and the still-motion variant.

## Top Opportunities
1. Head gives one small nod while the shoulders respond more softly and later.
2. Head and shoulders remain connected as one avatar.
3. Friendly acknowledgment without facial expression or a cartoon jump.

## Encoded storyboard and review

**Duration:** 1120ms. **Sequence:** Notice / Acknowledge / Ease.

Timing source: [presence.ts](../../src/motions/presence.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `head` | 0, 130, 390, 580, 890, 1120 |
| `shoulders` | 0, 240, 500, 750, 1010, 1120 |

**Rendered review:** The head gives a small acknowledgment and the shoulders answer later. The familiar avatar proportions remain intact; there is no whole-person bounce.

Reviewed at preparation (20%), action (40%), recovery (70%) and neutral endpoint (100%), with actual playback and per-part endpoint inspection in the live gallery. These samples establish the reviewed poses; they do not replace the full timeline or the shared lifecycle checks in [VALIDATION.md](../VALIDATION.md).

**Visual reference:** icon 1 from the left in this family.

![user: action pose at 40%, position 1](../motion-evidence/rollout/presence.png)

[Preparation image](../motion-evidence/rollout/presence-prepare.png) · [Recovery image](../motion-evidence/rollout/presence-recover.png)
