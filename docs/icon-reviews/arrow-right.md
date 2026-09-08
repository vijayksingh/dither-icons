# arrow-right: Interface Craft refinement 01

## Context
**Meaning:** continue forward. A navigation affordance, not a completion badge. This review supersedes the broad-rollout version. Scope is one of the four icons in Refinement / 01.

## First Impressions
The previous arrow translated as one rigid piece; a detached line at its tail faded away. Direction was clear, but neither the shaft nor the finish contributed much. The user's later critique identified the missing climax, using Download's impact as the reference.

## Visual Design
The tail stays registered at x=3. The rigid head pulls a continuous shaft from that anchor. Its maximum reach is 1.9 units; the recognizable arrowhead never disappears. Two fine rays open beside the tip at the crest. They sit outside the primary silhouette and decay before the head resolves.

The initial split-contour outline showed dark pinholes at the neck. Round caps now close the open contour joins without adding an internal crossbar. Dither is attached to each physical part; there is no randomized grain animation.

## Interface Design
The shared trigger gives one complete performance. A 115ms draw-back loads the gesture, a quick extension leads, and a short hold makes the direction legible. The tiny undershoot belongs to the return, rather than a repeated bounce. The tip rays peak at 340ms, just after maximum extension at 310ms.

## Consistency & Conventions
MOT-01–13, MOT-14, MOT-15, MOT-16. The stable tail and localized tip response follow the foundation's cause-and-response principle. React and inline SVG use these same tracks. CSS hover export still resets on departure; React finishes its gesture.

## User Context
At a routine control size, the arrow must read immediately. The effect adds a moment of punctuation; it must not become a destination wall or block onward movement. Solid was inspected at 24px; dither is primarily intended for 48px and larger.

## Top Opportunities addressed
1. Replace a whole-object nudge with a head pulling a joined shaft.
2. Put the payoff at the leading tip, with a separate decay.
3. Keep all three textures continuous through the motion.

## Encoded storyboard
Source: [arrowRight.ts](../../src/motions/arrowRight.ts). `TIMING`, `RIGHT_SHAFT`, `HEAD`, `SPARK`, and `EASING` expose the decisions. Shared frame times and easing keep the two neck endpoints coincident even between keyframes.

| Time | Action |
| --- | --- |
| 0–115ms | Draw the head back 0.85 units; tail stays fixed. |
| 115–310ms | Extend the shaft; head leads 1.9 units. |
| 255–340ms | Tip rays appear and crest after extension. |
| 340–580ms | Rays separate slightly and disappear. |
| 415–900ms | Resolve through a 0.16-unit undershoot to exact rest. |

## Rendered review
First icon from the left. Checked at 0%, 10%, 35%, 70%, and 100%; actual and half-speed replay; dither, solid, and outline. The rays are visible beside the tip at the crest, and both rays are hidden at rest. Outline neck pinholes were corrected during review. See [batch validation](../VALIDATION.md#focused-refinement-01--2026-09-09) for interaction and stillness checks.

![Four-icon crest; arrow-right is first](../motion-evidence/refinement-01/crest.png)

[Rest](../motion-evidence/refinement-01/rest.png) · [Preparation](../motion-evidence/refinement-01/prepare.png) · [Recovery](../motion-evidence/refinement-01/recover.png) · [Outline](../motion-evidence/refinement-01/outline.png)
