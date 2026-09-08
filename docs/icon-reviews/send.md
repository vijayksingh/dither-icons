# send: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **direct a message toward its destination**. It appears in routine controls where recognition matters more than spectacle.

## First Impressions
An unbounded paper-plane flight would erase the control.

## Visual Design
**Identity boundary** — Plane remains fully inside the frame. Stable dither follows the contour. Color inherits the selected palette; accents use the same ink and stay below the primary silhouette in visual weight. Typography and card framing belong to the shared inspector, not the glyph.

## Interface Design
The missed opportunity is to express **direct a message toward its destination** through a causal gesture. Draw back slightly, lead forward and upward, let the fold and a short wake respond, then return. The inspector exposes replay and timing only when requested; the icon itself adds no controls or labels.

## Consistency & Conventions
Retain the conventional glyph. Use the shared hover, focus, click, reduced-motion, and completion contracts. MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply.

## User Context
Communicate intent without asserting a message was delivered. Recognizability must survive a brief glance and the still-motion variant.

## Top Opportunities
1. Draw back slightly, lead forward and upward, let the fold and a short wake respond, then return.
2. Plane remains fully inside the frame.
3. Communicate intent without asserting a message was delivered.

## Encoded storyboard and review

**Duration:** 1040ms. **Sequence:** Aim / Lead / Ease back.

Timing source: [communication.ts](../../src/motions/communication.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `plane` | 0, 140, 400, 620, 880, 1040 |
| `crease-light` | 0, 240, 440, 720, 1040 |
| `wake` | 0, 280, 480, 780, 1040 |

**Rendered review:** The paper plane retains its wing and diagonal crease. Preparation gives it an aim; the short trailing marks fade as it eases home.

Reviewed at preparation (20%), action (40%), recovery (70%) and neutral endpoint (100%), with actual playback and per-part endpoint inspection in the live gallery. These samples establish the reviewed poses; they do not replace the full timeline or the shared lifecycle checks in [VALIDATION.md](../VALIDATION.md).

**Visual reference:** icon 3 from the left in this family.

![send: action pose at 40%, position 3](../motion-evidence/rollout/communication.png)

[Preparation image](../motion-evidence/rollout/communication-prepare.png) · [Recovery image](../motion-evidence/rollout/communication-recover.png)
