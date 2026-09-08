# pause: Interface Craft review

## Context

A reusable SVG action icon. Its semantic meaning is **arrest motion and hold position**. This is one of the four icons in Refinement / 04; the report supersedes its initial broad-rollout review.

## First Impressions

The earlier pair squeezed toward the center and shortened without a convincing stop. Its single bottom light did not distinguish arrival from the held state.

## Visual Design

Two narrower, rounded bars retain a generous central gap. Both use the same base plane at y=21. Each base gets one brief seat light and a smaller outward tick, rather than a permanent extra underline. The face grain remains attached through the restrained compression.

**Identity boundary:** Two distinct vertical bars remain visible. Their feet never pass below the stop plane during compression; no inward collapse and no play-symbol morph.

## Interface Design

The first bar takes up a short vertical travel, then meets its stop at 320ms. The second follows 45ms later. Each compresses only after its foot reaches the base plane, and gives a small local response. A tiny recovery ends in more than 300ms of stillness: stopping, rather than bouncing, is the conclusion.

## Consistency & Conventions

The shared gallery typography, palette, framing, inspector, and playback controls remain intact. Color is inherited. Dither, solid, and outline share named tracks. MOT-01–08 govern identity, geometry, material, and the causal response; MOT-09–13 govern completion, exact rest, accessibility, shared timing, and rendered verification; MOT-14–16 require truthful preview semantics, this individual review, and a legible climax.

## User Context

The gesture suggests braking and holding without changing an application’s playback state. The tiny stagger rewards attention but the pair must still read immediately as pause. No repeating bounce or ongoing activity indicator.

## Top Opportunities

1. Replace lateral squeezing with two arrested vertical contacts.
2. Let each contact cause its own short base response.
3. Finish with enough stillness for the semantic meaning to register.

## Encoded storyboard

**Duration:** 1040ms. **Sequence:** Take up / Seat / Hold.

```text
0ms    Two neutral bars, separate and aligned
110ms  First bar reaches its short preload
155ms  Second bar follows
320ms  First foot returns to its stop
365ms  Second foot arrives; first bar has compressed
370ms  First seat light peaks
385ms  Smaller first exterior tick
410ms  Second compression completes
415ms  Second seat light peaks
430ms  Smaller second exterior tick
665ms  Both bars have settled
695ms  All base effects have dissipated
1040ms Exact held rest
```

One named `TIMING` object and per-actor configuration live in [pause.ts](../../src/motions/pause.ts). Named SVG groups and local effect attachment live in [ControlArtwork.tsx](../../src/ControlArtwork.tsx). Native playback, inspection, and standalone CSS use the same tracks.

| Named part | Keyframe times (ms) |
| --- | --- |
| `bar-left` | 0, 110, 320, 365, 470, 620, 1040 |
| `seat-left` | 0, 320, 370, 650, 1040 |
| `stop-left` | 0, 320, 385, 650, 1040 |
| `bar-right` | 0, 45, 155, 365, 410, 515, 665, 1040 |
| `seat-right` | 0, 365, 415, 695, 1040 |
| `stop-right` | 0, 365, 430, 695, 1040 |

## Rendered review

At 30% the first bar approaches contact; at 40% the two short seat responses register at the feet. The central gap stays open and no bar overshoots below its stop. At actual speed the 45ms lag reads as a soft paired arrest, followed by stillness. The 24px solid pair remains clear without its accents.

Reviewed in the live browser at actual and half speed, plus 0%, 10%, 30%, 40%, 50%, 62%, 82%, and 100%. All four icons have identical computed poses at the two neutral endpoints. Paused dither-to-outline switching at 40% preserves every named transform. Keyboard departure finishes the gesture. Reduced motion clears transforms and hides accents; motion-off disables study playback. See [VALIDATION.md](../VALIDATION.md) for the complete batch evidence and limits.

**Visual reference:** icon 2 from the left, in the new four-icon study group.

![pause, icon 2 of four, browser pose at 40%](../motion-evidence/refinement-04/pose-40.png)

[Rest](../motion-evidence/refinement-04/pose-0.png) · [Preparation](../motion-evidence/refinement-04/pose-10.png) · [Recovery](../motion-evidence/refinement-04/pose-82.png) · [Outline](../motion-evidence/refinement-04/outline-40.png) · [Light solid](../motion-evidence/refinement-04/light-solid-62.png)
