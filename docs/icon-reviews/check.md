# check: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **affirm a valid or completed state**. It appears in routine controls where recognition matters more than spectacle.

## First Impressions
A falling checkmark treats confirmation as an object dropped from above.

## Visual Design
**Identity boundary** — Entire check remains visible throughout. Stable dither follows the contour. Color inherits the selected palette; accents use the same ink and stay below the primary silhouette in visual weight. Typography and card framing belong to the shared inspector, not the glyph.

## Interface Design
The missed opportunity is to express **affirm a valid or completed state** through a causal gesture. Seat the vertex briefly, then run a small highlight up the long ascending arm. The inspector exposes replay and timing only when requested; the icon itself adds no controls or labels.

## Consistency & Conventions
Retain the conventional glyph. Use the shared hover, focus, click, reduced-motion, and completion contracts. MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply.

## User Context
The icon preview is not evidence of app-level success. Recognizability must survive a brief glance and the still-motion variant.

## Top Opportunities
1. Seat the vertex briefly, then run a small highlight up the long ascending arm.
2. Entire check remains visible throughout.
3. The icon preview is not evidence of app-level success.

## Encoded storyboard and review

**Duration:** 900ms. **Sequence:** Seat / Affirm / Rest.

Timing source: [controls.ts](../../src/motions/controls.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `check` | 0, 130, 340, 530, 740, 900 |
| `affirm-light` | 0, 180, 360, 620, 900 |

**Rendered review:** The whole check stays visible as the vertex seats. The small emphasis travels along the ascending arm and vanishes without substituting another state.

Reviewed at preparation (20%), action (40%), recovery (70%) and neutral endpoint (100%), with actual playback and per-part endpoint inspection in the live gallery. These samples establish the reviewed poses; they do not replace the full timeline or the shared lifecycle checks in [VALIDATION.md](../VALIDATION.md).

**Visual reference:** icon 1 from the left in this family.

![check: action pose at 40%, position 1](../motion-evidence/rollout/actions.png)

[Preparation image](../motion-evidence/rollout/actions-prepare.png) · [Recovery image](../motion-evidence/rollout/actions-recover.png)
