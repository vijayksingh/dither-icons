# external-link: Interface Craft refinement 01

## Context
**Meaning:** open another destination while retaining the source context. The frame is the source; the diagonal arrow points beyond it. This replaces the previous rollout review.

## First Impressions
The old arrow moved outward, but the frame also drifted slightly. Its small corner highlight did not make the destination feel distinct. The source had no reason to move.

## Visual Design
The frame is now completely static. The outer corner leads a connected diagonal shaft; the tail follows later through the opening. This produces a reach and then a follow-through, rather than one rigid diagonal nudge. A finer outer corner briefly echoes the destination at the crest. It remains separate from the main corner and never becomes a second full window.

The shaft is drawn in a fixed diagonal coordinate frame with positive local coordinates, preserving its entire grain mask. Open outline contours meet with round caps, avoiding an artificial diagonal crossbar.

## Interface Design
The head reaches outward at 340ms. The destination echo crests at 430ms. The tail follows by 520ms while the outer corner holds its position. A brief reading interval precedes the return. The source remains available visually throughout; there is no success badge or navigation side effect.

## Consistency & Conventions
MOT-01–13, MOT-14, MOT-15, MOT-16. The stable frame follows Download's stable-reference principle, while its climax expresses opening elsewhere rather than impact. Runtime and inline SVG share the same clock and named actors.

## User Context
This glyph is often small and appears beside a text link. Both the open frame and upper-right corner must remain recognizable without the echo. The effect adds spatial punctuation rather than changing the conventional meaning.

## Top Opportunities addressed
1. Hold the source frame still.
2. Let the corner lead before the tail leaves the source.
3. Echo the destination exactly at that reach, then clear the extra line.

## Encoded storyboard
Source: [externalLink.ts](../../src/motions/externalLink.ts). `TIMING`, `LINK_SHAFT`, `CORNER`, `TAIL`, `ECHO`, and `EASING` expose its independent choreography. The diagonal joint is checked in both axes between keyframes.

| Time | Action |
| --- | --- |
| 0–125ms | Corner draws inward 0.35 units. |
| 125–340ms | Corner reaches 1.25 units diagonally outward; tail lags. |
| 280–430ms | A finer corner appears just beyond the destination. |
| 340–520ms | Tail follows 1.55 units through the source opening. |
| 430–730ms | Echo dissipates outward. |
| 660–1120ms | Continuous arrow returns; frame remains fixed. |

## Rendered review
Third icon from the left. Checked at 0%, 10%, 35%, 70%, and 100%; actual and half-speed replay; dither, outline, and light-theme solid. The frame stays registered and the echo clears before rest. The arrow remains continuous as its tail catches up. Shared checks are in [batch validation](../VALIDATION.md#focused-refinement-01--2026-09-09).

![Four-icon crest; external-link is third](../motion-evidence/refinement-01/crest.png)

[Rest](../motion-evidence/refinement-01/rest.png) · [Preparation](../motion-evidence/refinement-01/prepare.png) · [Recovery](../motion-evidence/refinement-01/recover.png) · [Outline](../motion-evidence/refinement-01/outline.png)
