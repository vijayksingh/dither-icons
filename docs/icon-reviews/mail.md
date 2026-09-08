# mail: Interface Craft refinement 03

## Context
**Meaning:** an envelope containing correspondence. **Invariant:** a wide envelope, its V-shaped pocket, and an attached horizontal flap hinge. The action reveals a letter locally; outgoing flight belongs to Send.

## First Impressions
The previous opening still resembled a house: its raised triangular flap supplied a roof above a nearly square body. The letter was faint and poorly separated from the envelope. It lacked a clear reveal payoff.

## Visual Design
Use a wider envelope with rounded lower corners, visible pocket seams, a quieter flap, and a real rounded letter containing two short lines. The letter rises above the shallow opened flap, giving the silhouette a flat paper top instead of a roof.

Material masks separate pocket, back, flap, and letter. Two fixed half-planes meet at y=7.1: below the hinge, the flap occludes the letter; above it, the letter occludes the opened flap. Both moving masks follow their physical planes, so there is no abrupt layer-order switch at the crossing. Text and pocket seams are negative cuts in filled materials and fine strokes in outline.

## Interface Design
The flap opens before the letter emerges. An attached paper-edge glint leads two exterior reveal marks. The letter starts tucking first, clears the pocket, and the flap then seats with a smaller crease response. The reveal is the primary climax; closure is quieter.

## Consistency & Conventions
MOT-01–16 apply. The full horizontal hinge stays fixed; the flap and letter never dissolve during their motion. Occlusion supplies visibility naturally. React and standalone SVG share the same transforms, including the front/rear mask choreography. No mail-read, delivered, or sent state is asserted.

## User Context
An envelope must remain recognizable when the user glances at it. The corrected open pose reads as correspondence in all three materials. Solid was inspected at 24px; dark dither and outline at 112px. Stillness retains the complete closed envelope.

## Top Opportunities addressed
1. Keep envelope identity through opening by revealing a clear letter above the flap.
2. Give the hinge correct front/back occlusion without a visual layer jump.
3. Connect the letter edge, reveal marks, tuck, and quiet closure.

## Encoded storyboard
Source: [mail.ts](../../src/motions/mail.ts). `TIMING`, `MAIL_ART`, `MAIL_HINGE`, `FLAP`, `LETTER`, `EDGE`, `RAYS`, `SEAM`, and `EASE` define the performance.

| Time | Action |
| --- | --- |
| 0–115ms | Small flap preparation. |
| 115–325ms | Flap rolls behind the horizontal hinge. |
| 240–505ms | Letter rises 5.25 units from the pocket. |
| 505 / 560ms | Paper edge then exterior reveal marks crest. |
| 650–945ms | Letter tucks back inside. |
| 880–1090ms | Flap returns as the paper clears, then seats. |
| 1125–1240ms | Smaller closure glint appears and clears. |
| 1360ms | Exact closed envelope. |

## Rendered review
The 40% and 52% frames preserve a flat-topped letter above the envelope; the house-like open silhouette is gone. Grain remains separated across the layer handoff. Normal and half-speed review includes the complete tuck and closing seam. Paused switching into outline preserved all visible and mask transforms.

![Mail reveal, second icon](../motion-evidence/refinement-03/reveal.png)

[Rest](../motion-evidence/refinement-03/rest.png) · [Recovery](../motion-evidence/refinement-03/recover.png) · [Outline](../motion-evidence/refinement-03/outline.png) · [24px solid](../motion-evidence/refinement-03/compact-communication.png) · [Batch validation](../VALIDATION.md#focused-refinement-03--2026-09-09)
