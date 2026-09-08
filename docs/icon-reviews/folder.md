# folder: Interface Craft refinement 02

## Context
**Meaning:** contain and reveal grouped documents. A routine navigation icon with a short moment of discovery. The tab, back panel, and hinged front must remain a folder throughout.

## First Impressions
The previous version opened the cover but drew the papers through its dither. Overlapping grain accumulated into a bright horizontal band. The reveal had no distinct climax. During this pass, an outlined back also read too much like a briefcase; the final back is a quieter filled plane.

## Visual Design
Three layers now separate cleanly: a shaded back, two staggered sheets, and the front cover. Each foreground plane occludes the material behind it before its own grain is drawn. A 0.32-unit transparent seam preserves the edges in solid, outline, and dither. The back uses 45% opacity, the rear paper 58%, and front paper 85%, establishing depth without adding a color.

Two small rays appear above the exposed paper edges. They remain outside the primary silhouette and disappear before the folder closes.

## Interface Design
The cover opens first. The rear sheet rises next, then the front sheet fans in the opposite direction. The reveal rays peak after both paper edges emerge. On return, the rear sheet tucks first, the front clears next, and the cover finishes closing. The cover's lower edge remains the hinge.

## Consistency & Conventions
MOT-01, MOT-03–13, MOT-14–16 apply. The folder retains the accepted grain, restrained displacement, and finite playback contract. Its payoff is discovery, not impact. The moving occlusion shapes share the exact visible-plane tracks, including their origin and easing; inline SVG export receives the same definitions.

## User Context
A folder should invite inspection without looking empty, launching a document, or pretending the containing app has navigated. The complete icon stays useful with motion disabled. Solid was inspected at 24px; the detailed dither reveal was inspected at 112px and the collection at 64px.

## Top Opportunities addressed
1. Remove overlapping grain and show distinct physical layers.
2. Let the sheets follow the opening cover with staggered, opposite fan angles.
3. Add a localized reveal climax, then tuck contents before closing.

## Encoded storyboard
Source: [folder.ts](../../src/motions/folder.ts). Named `TIMING`, `FOLDER_ART`, `COVER`, `REAR`, `FRONT`, `REVEAL`, and `EASE` expose the complete performance.

| Time | Action |
| --- | --- |
| 0–120ms | Cover takes up its hinge with a 2% preparation. |
| 120–360ms | Cover opens from y=20 to 59% vertical projection. |
| 180–440ms | Rear sheet rises 2.25 units and fans −4 degrees. |
| 245–525ms | Front sheet follows 2.65 units upward, fanning 3.5 degrees. |
| 455–570ms | Two rays appear above the revealed contents. |
| 570–830ms | Rays dissipate; papers begin returning. |
| 850 / 965ms | Rear sheet, then front sheet, finish tucking. |
| 1120–1320ms | Cover seats and resolves to exact rest. |

## Rendered review
First icon in Refinement / 02. Reviewed at rest, preparation, 42% reveal, later return, and exact rest; actual and half-speed playback. The final shaded back restores the folder silhouette; the mask layers remove the former luminous band. Material switching preserved the paused transforms. [Batch validation](../VALIDATION.md#focused-refinement-02--2026-09-09) records lifecycle and responsive checks.

![Folder reveal, first icon](../motion-evidence/refinement-02/reveal.png)

[Rest](../motion-evidence/refinement-02/rest.png) · [Preparation](../motion-evidence/refinement-02/prepare.png) · [Recovery](../motion-evidence/refinement-02/recover.png) · [Solid](../motion-evidence/refinement-02/solid-light.png) · [Outline](../motion-evidence/refinement-02/outline.png)
