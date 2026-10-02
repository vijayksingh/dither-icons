# Zoom Out: Interface Craft review

## Context
The curriculum atlas has a real Zoom out control, currently Minus, dispatching `ca-map-zoom` with detail 0.86 (`app/src/routes/paths.universe.tsx:448`). A minus lens is a conventional, more specific affordance for the same operation.

## First Impressions
The minus sign identifies reduction; the gesture should demonstrate a broader view. Moving or bouncing the entire magnifier would communicate Search rather than a change in magnification.

## Visual Design
The fixed lens reuses the accepted Search contour, including its continuous handle junction. The minus stays fixed. Four light corners identify a viewed region inside the aperture. They shrink toward the lens center, leaving room for four surrounding context points. All corners and points fit within the true inner radius, including their strokes.

## Interface Design
First identify the viewed region, then reduce it to 58% scale. Only after this reduction do the new surrounding points appear, with a small stagger. Hold the region and context together; clear them before resetting the scale. The lens does not tilt or drift.

## Consistency & Conventions
MOT-01/03/05/07/08/15/16 guide identity, relationships, material and the semantic finish. MOT-09/10/11/12 preserve complete finite playback, exact rest, stillness and shared export timing. MOT-14 leaves application state to the host. Future platform use follows UI-2/4, COLOR-2/5, A11Y-2/4 and MOTION-1/4/6/7.

## User Context
The host map owns magnification and pointer behavior. At 24px the minus lens remains the primary symbol; the larger study reveals the contextual story. No map change is performed by the library preview.

## Top Opportunities
Keep orientation fixed; demonstrate reduction inside the lens; let new context follow the space made by that reduction.

## Encoded storyboard and review
[Timing source](../../src/motions/zoom-out.ts). 1380ms. Field identified at 140ms; receded by 510ms; surrounding points arrive from 610ms with 22ms stagger; hold through 780ms; clear by 1040ms; scale restores by 1380ms. Actors: zoom-field-position, zoom-field and four zoom-context actors.

The viewed region visibly recedes while the minus and tool stay still. The new points appear around it afterward. The 24px solid/outline forms preserve the minus-lens identity; fine contextual details belong to the larger presentation. Reviewed seven poses, actual-speed keyboard completion, native half-speed playback, three materials, light Cobalt/dark Iris, reduced motion, motion off, narrow layout and compact standalone SVGs. [Evidence and limits](../motion-evidence/platform-09/README.md). Implementation and rendered review are complete; user acceptance is pending.

![Browser sequence: Back, History, Collapse Panel and Zoom Out](../motion-evidence/platform-09/native-filmstrip.png)


## Outline material correction — 2026-10-02

**Invariant and critique:** A minus lens keeps its handle and optical opening. Outline the joined magnifier body and minus bar; the shrinking context remains inside the lens.

**Material rule:** Reuse the reader's 0.5-unit Outline edges and transparent cores. Fine text and small semantic dots stay readable. Applicable: MOT-01, MOT-03, MOT-07, MOT-10, MOT-11, MOT-12, MOT-13 and MOT-15.

**Storyboard retained:** Frame / Recede / Reveal, 1380ms. Authored tracks remain: `zoom-field-position`, `zoom-field`, `zoom-context-0`, `zoom-context-1`, `zoom-context-2`, `zoom-context-3`. This correction changes material, not the semantic action or timing.

**Rendered review:** [Before/after and compact review](../outline-audit/README.md#correction-evidence) plus [actual 50% browser pose](../outline-audit/browser/pose-50.png). The six inspected poses are 0%, 10%, 35%, 50%, 75% and 100%; actor binding, material-switch pose preservation, keyboard completion and stillness checks are recorded with that evidence. User visual approval remains pending. Standalone SVG retains the authored CSS tracks; CSS hover still ends on departure while React finishes its gesture.
