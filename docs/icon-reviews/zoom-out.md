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
