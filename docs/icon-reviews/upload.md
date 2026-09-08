# upload: Interface Craft review

## Context
An SVG action icon in a reusable developer library. Its semantic meaning is **transfer from a local container toward another destination**. It appears in routine controls where recognition matters more than spectacle.

## First Impressions
A mirrored download bounce does not describe release.

## Visual Design
**Identity boundary** — Upward arrow and receiving-source tray stay visible. Stable dither follows the contour. Color inherits the selected palette; accents use the same ink and stay below the primary silhouette in visual weight. Typography and card framing belong to the shared inspector, not the glyph.

## Interface Design
The missed opportunity is to express **transfer from a local container toward another destination** through a causal gesture. Tray braces first; the arrow lifts away; a brief upward wake follows, then the arrow returns. The inspector exposes replay and timing only when requested; the icon itself adds no controls or labels.

## Consistency & Conventions
Retain the conventional glyph. Use the shared hover, focus, click, reduced-motion, and completion contracts. MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-08, MOT-09, MOT-10, MOT-11, MOT-12, MOT-14, MOT-15 apply.

## User Context
Release should feel lighter than download impact. Recognizability must survive a brief glance and the still-motion variant.

## Top Opportunities
1. Tray braces first; the arrow lifts away; a brief upward wake follows, then the arrow returns.
2. Upward arrow and receiving-source tray stay visible.
3. Release should feel lighter than download impact.

## Encoded storyboard and review

**Duration:** 1000ms. **Sequence:** Brace / Release / Return.

Timing source: [files.ts](../../src/motions/files.ts). Geometry binds each named track in `CraftedArtwork.tsx` or `ExtendedArtwork.tsx`. Times below are milliseconds from the same clock; transform values, pivots and easing live in that source.

| Named part | Keyframe times (ms) |
| --- | --- |
| `arrow` | 0, 130, 370, 580, 830, 1000 |
| `tray` | 0, 140, 330, 680, 1000 |
| `wake` | 0, 230, 430, 720, 1000 |

**Rendered review:** The tray braces before the arrow rises. The shaft remains above the tray throughout; the rising wake clears without implying a completed transfer.

Reviewed at preparation (20%), action (40%), recovery (70%) and neutral endpoint (100%), with actual playback and per-part endpoint inspection in the live gallery. These samples establish the reviewed poses; they do not replace the full timeline or the shared lifecycle checks in [VALIDATION.md](../VALIDATION.md).

**Visual reference:** icon 1 from the left in this family.

![upload: action pose at 40%, position 1](../motion-evidence/rollout/files-transfer.png)

[Preparation image](../motion-evidence/rollout/files-transfer-prepare.png) · [Recovery image](../motion-evidence/rollout/files-transfer-recover.png)
