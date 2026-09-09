# Code Run: Interface Craft review

## Context

**Launch written code into execution.** `lab.$slug.tsx:656` names the Run code action. This is a Run affordance, distinct from Submission and its authoritative result.

## First Impressions

A source window plus a play wedge communicates executable code without depending on an animation.

## Visual Design

The window stays fixed. Three source lines precede a bounded triangle. Its knockout shares the exact launch transform, preserving clearance in all materials.

**Identity boundary:** The play wedge remains readable; the fixed source frame and all three lines remain present.

## Interface Design

Each source line lights independently at 130, 250, and 350ms. The wedge gathers at 410ms, launches at 600ms, then its leading edge and two forward witnesses crest at 680ms. It returns by 1180ms.

## Consistency & Conventions

MOT-01/02/03/05 preserve meaning, identity, and physical relationships. MOT-07/08/16 bind grain and light to the cause. MOT-09–15 require completed playback, exact rest, reduced-motion support, shared export timing, individual review, and no invented app result. Platform handoff: UI-2/4, COLOR-2/5, A11Y-2/4, MOTION-1/4/6/7.

## User Context

Use a native labeled control for keyboard and touch. Prefer still solid/outline at 24px for repeated actions, and dither at 48px or larger. Motion remains optional; disabled/reduced-motion controls retain their meaning. The library gesture does not change platform state.

## Top Opportunities

Source receipts have independent onset times; the attached edge light inherits the wedge frame, while the exterior witnesses remain in the surrounding frame.

## Encoded storyboard and review

**Read / Launch / Coast · 1360ms.** [code-run.ts](../../src/motions/code-run.ts) contains the timestamp storyboard, named actors and clock. [LearningWorkflowArtwork.tsx](../../src/LearningWorkflowArtwork.tsx) owns their original contours and instance-scoped masks.

1360ms total; source receipts 130/250/350; gather 410; launch 600; response 680; clear 880; home 1180. Pivot: 12.6,15.5.

Actual and half-speed playback reviewed. Eight reference poses return exactly; dither/outline/solid retain the same 52% transforms, origins and opacity. Keyboard departure, reduced motion, motion-off, 390px layout, 24px solid and 64px dither were inspected. Semantic name and use-case search verified. See [batch validation](../VALIDATION.md).

**Reference position: 1 of four.**

![Code Run motion reference](../motion-evidence/platform-05/pose-48.png)

[Rest](../motion-evidence/platform-05/pose-0.png) · [Outline](../motion-evidence/platform-05/outline-52.png) · [Light solid](../motion-evidence/platform-05/light-solid-52.png) · [Compact silhouettes](../motion-evidence/platform-05/collection-24-solid.png)
