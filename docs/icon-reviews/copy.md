# copy: Interface Craft polish

## Context
**Meaning:** produce a duplicate while retaining the source. **Invariant:** two equivalent sheets remain present; the source stays fixed. This is a preview gesture, not confirmation that clipboard access succeeded.

## First Impressions
The former source was an incomplete bracket with a different footprint from the duplicate. Separation was readable, but the objects did not look like twins. A registration tick at the destination felt added on instead of responding to the new sheet.

## Visual Design
Use the identical rounded 12.5-unit sheet silhouette twice. The fixed source sits 5.25 units up and left, shaded to 50%. The front sheet occludes it with a 0.38-unit transparent seam. Dither no longer piles up in the overlap, and the rear reads as a complete physical sheet.

A source-corner glint precedes separation. An attached lower-right edge light catches as the duplicate squares itself. Two exterior registration strokes then grow along the new edges and disperse outward independently along x and y.

## Interface Design
The front gathers toward the source with a slight counter-rotation. Translation leads the peel; rotation catches up as the sheet becomes parallel. The intermediate easing carries movement through that handoff instead of stopping at the tilted waypoint. A tiny drift replaces a rigid hold; nesting begins while the exterior marks dissolve.

## Consistency & Conventions
MOT-01–13 and MOT-14–16 apply. Source and duplicate share geometry, while their roles determine different treatment. The occluder and duplicate share their complete track, and the edge accent is nested inside the moving sheet. No checkmark, replacement glyph, or clipboard-success claim.

## User Context
The paired silhouette works at 24px solid without the highlights. Larger dither reveals the material separation. Hover-capable controls, keyboard, and tap use the existing finite playback contract; reduced motion presents the same pair at rest.

## Top Opportunities addressed
1. Make source and duplicate visibly the same kind of object.
2. Carry velocity through peel and squaring.
3. Hand light from source to sheet edge to exterior registration.

## Encoded storyboard
Source: [copy.ts](../../src/motions/copy.ts). `TIMING`, `COPY_ART`, `DUPLICATE`, `SOURCE`, `EDGE`, `TARGET`, and `EASE` define the performance.

| Time | Action |
| --- | --- |
| 0–135ms | Front gathers −0.5 / −0.6 units and rotates −2.2°. |
| 195ms | Source-corner glint crests. |
| 320ms | Duplicate has peeled diagonally, trailing +1.45° rotation. |
| 435ms | It squares at +1.35 / +1.35 units. |
| 460 / 505ms | Attached edge then exterior registration strokes crest. |
| 610–825ms | Nesting begins while the marks dissipate. |
| 985–1190ms | A 0.08-unit correction resolves to exact rest. |

## Rendered review
The new source reads as a full sheet in dither, solid, and outline. At 44%, the squared duplicate and registration strokes share a clear corner. Normal and half-speed replay show the shorter, continuous peel handoff. Paused material switching preserved the visible plane and mask transforms. [Current validation](../VALIDATION.md#refinement-02-polish--2026-09-09).

![Copy registration, third icon](../motion-evidence/refinement-02-polish/reveal.png)

[Rest](../motion-evidence/refinement-02-polish/rest.png) · [Preparation](../motion-evidence/refinement-02-polish/prepare.png) · [Light solid](../motion-evidence/refinement-02-polish/solid-light.png) · [24px solid](../motion-evidence/refinement-02-polish/compact-solid.png)
