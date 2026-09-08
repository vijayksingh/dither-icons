# checkpoint: Interface Craft review

## Context

**Retain an exact Workspace state.** CraftingAttention keeps source files from completed Units in durable Checkpoints. Its Workspace history currently uses History; the dashboard also uses GitCommitVertical. This icon represents that retained version, not the separate Restore action.

## First Impressions

A square state inside a circular retainer sits on a vertical version rail. It reads as a registered point in history. The localized response around the captured square gives the gesture a finish without turning it into a success checkmark.

## Visual Design

The version rail stays still. The ring's interior remains open around the central square, even at maximum compression. An occluder follows the retainer to stop the rail at its moving boundary. Two corner marks align to the state; smaller side marks answer from outside.

**Identity boundary:** The rail, enclosing ring, and square persist. Once seated, the state stays exactly centered through the rest of the performance. No bounce ejects what was just retained.

## Interface Design

The state takes up slight vertical travel while a signal comes down the upper rail. It seats at 440ms. Only then does the retainer yield, the corners register, and the exterior marks respond. The ring relaxes around the now-stationary state. A library replay never asserts that a Checkpoint was saved.

## Consistency & Conventions

MOT-01/03/05 establish retention and fixed history. MOT-06/08/16 localize the capture response. MOT-09–15 retain the common lifecycle, stillness, single clock, and truthful state semantics. Platform handoff follows UI-2/4, COLOR-2/5, A11Y-2/4, MOTION-1/4/6/7. Actual save/restore status must come from the platform and remain readable without animation.

## User Context

Checkpoint rows are likely to be viewed repeatedly. Prefer a static 24px solid/outline icon there. Reserve the full gesture for an intentional preview or a real, confirmed state transition with accompanying text. The library itself performs no persistence operation.

## Top Opportunities

1. Express retention through sustained stillness after contact.
2. Keep the rail attached while the retainer yields.
3. Use registration at the square as the climax, distinct from Retry's rewind.

## Encoded storyboard and review

**Receive / Register / Hold · 1320ms**. Source: [checkpoint.ts](../../src/motions/checkpoint.ts).

| Actor / origin | Key times (ms) |
| --- | --- |
| `saved-state` / 12,12 | 130 gather; 440 seat; hold through 1320 |
| `retaining-ring`, `retainer-occlusion` / 12,12 | wait 440; 495 compress; 625 relax; 900 neutral |
| `capture-signal` / 12,2.5 | 150 start; 300 light; 440 contact; 465 clear |
| `state-registration` / 12,12 | 440 start; 540 peak; 800 clear |
| `capture-marks` / 12,12 | 495 start; 570 peak; 800 clear |

All tracks start at 0 and finish at 1320ms. Actual/half-speed playback and eight poses show the state stays seated while registration dissipates. The 45% frame exposes the two side marks; the later frames are deliberately still. Dither/solid/outline transitions preserve the inspected pose, including rail occlusion. Checked compact sizes, exact endpoints, keyboard completion, reduced motion, motion-off, and 390px layout. See [validation](../VALIDATION.md).

**Reference position: 3 of four.**

![Checkpoint capture response, position 3, at 45%](../motion-evidence/platform-02/pose-45.png)

[Preparation](../motion-evidence/platform-02/pose-10.png) · [Held state](../motion-evidence/platform-02/pose-65.png) · [Compact solid](../motion-evidence/platform-02/compact-solid-24.png)
