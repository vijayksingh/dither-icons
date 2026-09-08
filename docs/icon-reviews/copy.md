# copy: Interface Craft refinement 02

## Context
**Meaning:** duplicate while retaining the original. The fixed rear sheet is the source, and the front sheet is its twin. Both remain recognizable throughout.

## First Impressions
The previous source and duplicate both drifted, and the registration accent sat near the rear sheet with little connection to the new position. The animation showed separation but lacked a clear moment where the duplicate settled into its own place.

## Visual Design
The source is now absolutely still. The duplicate draws toward it with a slight tilt, peels diagonally free, and squares itself again. Its inset silhouette leaves room for motion and exterior marks within the 24-unit viewBox. Rounded corners match the material family.

A smaller source-corner glint appears first. Two short registration ticks answer beside the duplicate's lower and right edges once it becomes parallel. This gives the source and result a visible relationship without producing a third sheet or replacing the icon with a check.

## Interface Design
The duplicate gathers for 145ms, reaches its tilted separation at 345ms, and becomes square at 450ms. Registration ticks peak just afterward at 480ms. The two sheets hold briefly, then nest with a single small correction. The climax belongs to the new position, rather than the initial pull.

## Consistency & Conventions
MOT-01–13 and MOT-14–16 apply. The reference frame stays fixed; the secondary response follows the primary event. Like the accepted directional batch, the accents have an independent decay. This is an icon gesture, not evidence that clipboard content changed.

## User Context
Copy controls are used repeatedly. The front sheet moves only a little, keeps its identity, and finishes after pointer or focus departure. Mid-play triggers do not pile up. Motion-off leaves the familiar overlapping-sheet glyph.

## Top Opportunities addressed
1. Fix the source so the duplicate's movement has a stable reference.
2. Introduce a brief peel and then a precise parallel registration.
3. Hand light from the source to the twin, with the stronger payoff at the destination.

## Encoded storyboard
Source: [copy.ts](../../src/motions/copy.ts). `TIMING`, `COPY_ART`, `DUPLICATE`, `SOURCE`, `TARGET`, and `EASE` expose the sequence and geometry.

| Time | Action |
| --- | --- |
| 0–145ms | Duplicate draws inward 0.55/0.65 units and tips −2.5 degrees. |
| 100–210ms | Source glint appears, then clears by 360ms. |
| 145–345ms | Duplicate peels away with 1.8 degrees of trailing rotation. |
| 345–450ms | Duplicate squares at a 1.35-unit diagonal offset. |
| 370–480ms | Exterior ticks crest at the new registration. |
| 640–790ms | Twin starts nesting; ticks dissipate. |
| 980–1180ms | A 0.1-unit correction resolves to exact rest. |

## Rendered review
Third icon in Refinement / 02. Actual and half-speed replay showed the smaller source glint before the stronger destination ticks. Both sheets remain visible at the 42% climax and return independently of the accents. Solid 24px collection and 112px studies across all materials were inspected. [Batch validation](../VALIDATION.md#focused-refinement-02--2026-09-09) records shared checks.

![Copy registration, third icon](../motion-evidence/refinement-02/reveal.png)

[Rest](../motion-evidence/refinement-02/rest.png) · [Preparation](../motion-evidence/refinement-02/prepare.png) · [Recovery](../motion-evidence/refinement-02/recover.png) · [Solid](../motion-evidence/refinement-02/solid-light.png) · [Outline](../motion-evidence/refinement-02/outline.png)
