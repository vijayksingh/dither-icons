# Test Suite: Interface Craft review

## Context

**Observe independent test cases in one collection.** `lab.$slug.tsx:657` names Run tests. `problem.$slug.tsx:2913–2925` runs visible tests. Under ADR-0005, these browser results do not replace server grading.

## First Impressions

Three tubes in a stable rack show multiple observations. Dots remain specimens, with no pass/fail checkmarks or state colors.

## Visual Design

Each .7-radius dot seats at y=15.9, touching its chamber floor at y=16.6. Clips follow the real chambers; rack occlusion avoids rails through glass.

**Identity boundary:** Three separate chambers and samples remain visible; a sample never crosses its chamber wall or passes through the floor.

## Interface Design

The cases prepare and contact 140ms apart. Each contact has its own seat light; the fixture datum answers only after all cases have seated. Hold, then restore all three specimens.

## Consistency & Conventions

MOT-01/02/03/05 preserve meaning, identity, and physical relationships. MOT-07/08/16 bind grain and light to the cause. MOT-09–15 require completed playback, exact rest, reduced-motion support, shared export timing, individual review, and no invented app result. Platform handoff: UI-2/4, COLOR-2/5, A11Y-2/4, MOTION-1/4/6/7.

## User Context

Use a native labeled control for keyboard and touch. Prefer still solid/outline at 24px for repeated actions, and dither at 48px or larger. Motion remains optional; disabled/reduced-motion controls retain their meaning. The library gesture does not change platform state.

## Top Opportunities

Seat reactions follow actual contact, and the collection response waits for the final case rather than implying success after the first.

## Encoded storyboard and review

**Sample / Seat / Compare · 1460ms.** [test-suite.ts](../../src/motions/test-suite.ts) contains the timestamp storyboard, named actors and clock. [LearningWorkflowArtwork.tsx](../../src/LearningWorkflowArtwork.tsx) owns their original contours and instance-scoped masks.

1460ms total; contacts 370/510/650; final seats 500/640/780; datum 860; clear 1010; return begins 1050; home 1260.

Actual and half-speed playback reviewed. Eight reference poses return exactly; dither/outline/solid retain the same 52% transforms, origins and opacity. Keyboard departure, reduced motion, motion-off, 390px layout, 24px solid and 64px dither were inspected. Semantic name and use-case search verified. See [batch validation](../VALIDATION.md).

**Reference position: 2 of four.**

![Test Suite motion reference](../motion-evidence/platform-05/pose-58.png)

[Rest](../motion-evidence/platform-05/pose-0.png) · [Outline](../motion-evidence/platform-05/outline-52.png) · [Light solid](../motion-evidence/platform-05/light-solid-52.png) · [Compact silhouettes](../motion-evidence/platform-05/collection-24-solid.png)


## Outline material correction — 2026-10-02

**Invariant and critique:** Three independent specimen chambers remain seated in one rack. Give the glass and rack transparent cores; outline the falling specimens while keeping their independent contacts visible.

**Material rule:** Reuse the reader's 0.5-unit Outline edges and transparent cores. Fine text and small semantic dots stay readable. Applicable: MOT-01, MOT-03, MOT-07, MOT-10, MOT-11, MOT-12, MOT-13 and MOT-15.

**Storyboard retained:** Sample / Seat / Compare, 1460ms. Authored tracks remain: `case-0`, `seat-light-0`, `case-1`, `seat-light-1`, `case-2`, `seat-light-2`, `suite-datum`. This correction changes material, not the semantic action or timing.

**Rendered review:** [Before/after and compact review](../outline-audit/README.md#correction-evidence) plus [actual 50% browser pose](../outline-audit/browser/pose-50.png). The six inspected poses are 0%, 10%, 35%, 50%, 75% and 100%; actor binding, material-switch pose preservation, keyboard completion and stillness checks are recorded with that evidence. User visual approval remains pending. Standalone SVG retains the authored CSS tracks; CSS hover still ends on departure while React finishes its gesture.
