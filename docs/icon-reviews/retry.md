# retry: Interface Craft review

## Context

New platform icon: **restart an experiment or make another attempt**. Selected from observed CraftingAttention flows; see [PLATFORM-ICONS.md](../PLATFORM-ICONS.md).

## First Impressions

RotateCcw appears in 39 TSX imports across the platform, including experiment resets and workspaces. SheetIcon also has a reset glyph. This is a practical missing action, not a need for another spinner.

## Visual Design

A complete open circular arrow carries a curved glint toward its attached head. A static occluder inside the rotating group makes the head/arc overlap a clean union. The first browser review caught an even-odd notch here; the joint mask corrected it.

## Interface Design

A short clockwise take-up precedes a counterclockwise rewind. The traveling glint reaches the head, which catches with a small edge response and two local marks. The arrow then releases tension and returns to its reference pose.

**Identity boundary:** The open return arrow stays visible and connected. There is no full rotation, loading loop, or actual reset caused by the library preview.

## Consistency & Conventions

MOT-01–08 preserve identity, parts, stable references, and attached grain. MOT-09–13 bind completion, exact rest, reduced motion, common timing, and rendered verification. MOT-14–16 require truthful preview semantics, an individual review, and a perceptible causal climax. Platform handoff rules: UI-2, A11Y-2/4, COLOR-2, MOTION-1/6/7. The native parent supplies its real action and accessible name.

## User Context

The Learner may be concentrating on difficult work. Keep the glyph useful while still. Prefer solid or outline at 24px; use dither at 48px and larger. In high-frequency platform controls, use a still icon or short state feedback under MOTION-6; this full gesture is an optional invitation, never the sole state cue.

## Top Opportunities

1. Express **restart an experiment or make another attempt** through the causal sequence above.
2. Preserve the listed identity boundary during every intermediate pose.
3. Keep the climax localized, then finish completely instead of looping.

## Encoded storyboard

**Rewind / Catch / Ready · 1280ms**

115ms take-up; 410ms rewind; 565ms catch; 610ms head light; 655ms catch marks; 1000ms home; 1280ms rest.

The timestamp storyboard and single `TIMING` object are in [retry.ts](../../src/motions/retry.ts). Geometry binds in [LearningArtwork.tsx](../../src/LearningArtwork.tsx). Native React, CSS export, and the inspector share these tracks.

| Named part | Keyframe times (ms) |
| --- | --- |
| `return-arrow` | 0, 115, 410, 565, 735, 1000, 1280 |
| `rewind-trace` | 0, 150, 255, 565, 685, 1280 |
| `catch-edge` | 0, 565, 610, 920, 1280 |
| `catch-marks` | 0, 565, 655, 920, 1280 |

## Rendered review

Reviewed at actual and half speed and at 0%, 10%, 28%, 36%, 45%, 65%, 82%, and 100%. Dark Iris dither/outline and light Cobalt solid preserve the silhouette and causal response. All computed parts match at 0% and 100%; paused material changes preserve the 45% pose. All four were inspected together at 24px solid and 64px dither. Keyboard departure completes, reduced motion is static, and motion-off disables playback. See [VALIDATION.md](../VALIDATION.md) for recorded evidence and limits.

**Reference position: 4 of four.**

![retry, position 4, browser pose at 45%](../motion-evidence/platform-01/pose-45.png)

[Rest](../motion-evidence/platform-01/pose-0.png) · [Preparation](../motion-evidence/platform-01/pose-10.png) · [Recovery](../motion-evidence/platform-01/pose-82.png) · [Outline](../motion-evidence/platform-01/outline-45.png) · [Light solid](../motion-evidence/platform-01/light-solid-45.png)
